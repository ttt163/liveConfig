/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { Table } from 'antd';
import {URL} from '../config.js'
import {getMyDate,getStatus,ShowDiag,addOperation} from "../public/js/f.js"
const columns = [
{
    title: '资源名称',
    dataIndex: 'ResNmae'
}, {
    title: '任务时间',
    dataIndex: 'time'
}, {
    title: '任务描述',
    dataIndex: 'desc'
}, {
    title: '下发状态',
    dataIndex: 'status'
}, {
    title: '失败原因',
    dataIndex: 'reason',
    render(data){
            var cou=data;
            return <div>{
                cou ? cou.map((item,index)=> index==(cou.length-1) ? <div  key={index}><span>{data[index]['reason']}</span></div>
                    :<div className="device_btn_box" key={index}><span>{data[index]['reason']}</span></div>
                )
                    :''}
            </div>
    }
}, {
    title: '设备',
    dataIndex: 'device',
    className:'device_btn_div',
    render(data) {
        var datas=data[0],_data=data[1],_id=data[2];
        return <div>{
            datas ? datas.map((item,index)=> index==(datas.length-1) ? <div  key={index}><a  data-data={JSON.stringify(datas[index]['dev'])} data-channel={JSON.stringify(_data)} data-id={_id} className="f-assginDev iconfont page-list">&#xe61d;</a></div>
                :<div className="device_btn_box" key={index}><a data-data={JSON.stringify(datas[index]['dev'])} data-channel={JSON.stringify(_data)} data-id={_id} className="f-assginDev iconfont page-list">&#xe61d;</a></div>
            )
                :''}
        </div>
    }
}, {
    title: '涉及频道',
    dataIndex: 'channel',
    render(data){
            return data?<a  data-data={JSON.stringify(data)}  className="f-channelList iconfont page-list">&#xe61d;</a>:''
        }
}, {
    title: '操作',
    dataIndex: 'operate',
    render(data) {
        return <a data-id={data} className="resend">重新下发</a> ;
    }
}];
function getData(_data){
    var data=[];
    if(_data){
        for (let i = 0; i < _data.length; i++) {
            data.push({
                key: _data[i]['_id'],
                ResNmae:_data[i]['resources_name'],
                time:getMyDate(_data[i]['time']),
                desc:_data[i]['description'],
                status:getStatus(_data[i]['state']),
                reason: _data[i]['dev_fail'],
                device:[_data[i]['dev_fail'],_data[i]['channel_info'],_data[i]['_id']],
                channel:_data[i]['channel_info'],
                operate: _data[i]['_id']
            });
        }
    }

    return data;
}
export default class SearchTableTaskLog extends Component {
    componentDidMount(){
        this.fetch(this.state.getdata);
        var _this=this;
        //搜索
        $('#TaskSearch').on('click',function(){
            var resName=$('#TaskLogForm').find('input[name="resName"]').val();
            var startTime=$('#TaskLogForm').find('input[name="startTime"]').val();
            var endTime=$('#TaskLogForm').find('input[name="endTime"]').val();
            var sendStatus=$('#TaskLogForm').find('select[name="sendStatus"]').val();
            var taskType=$('#TaskLogForm').find('select[name="taskType"]').val();
            _this.setState({
                getdata:{
                    query:{
                        resources_name:resName,
                        resources_type:taskType,
                        state:sendStatus,
                        start_time:startTime,
                        end_time:endTime
                    },
                    page:"1",
                    row:"10",
                    all_row:"1"
                }
            });
            _this.fetch(_this.state.getdata);
        });
        //批量重新下发
        $('#ReSend').on('click',function(){
            if(_this.state.selectedRowKeys.length>0){
                window.Modal.confirm({
                    msg: '确认要重新下发吗？',
                    title: '重新下发',
                    btnok: "确定",
                    btncl: "取消"
                }).on(function(e) {
                    if(e){
                        var data=_this.state.selectedRowKeys;
                        $.ajax({
                            url:URL+'/SendConfigByDevInfoResourceABatch',
                            data:JSON.stringify(data),
                            type:'post',
                            success:function(result){
                                var res = JSON.parse(result);
                                if(res.info.status=='success'){
                                    //操作记录
                                    addOperation('批量下发任务');
                                    new ShowDiag({msg:'操作成功...',closetime:1,refresh:true});
                                }else{
                                    new ShowDiag({msg:'操作失败...',closetime:1,refresh:false});
                                }
                            }
                        });
                    }
                });
            }else{
                new ShowDiag({msg:'您没有勾选',closetime:1,refresh:false});
            }
        });
    }
    constructor(state){
        super (state);
        this.state={
            data: [],
            pagination: {
                showSizeChanger: true,
                pageSizeOptions:['10 ','20 ','30 ','40 ','50 ','100 ']
            },
            loading: false,
            selectedRowKeys: [],
            getdata:{
                query:{
                    resources_name:"",
                    resources_type:"",
                    state:"",
                    start_time:"",
                    end_time:""
                },
            page:"1",
            row:"10",
            all_row:"1"
         }

        }
    }
    handleTableChange(pagination) {
        const getdata = this.state.getdata;
        getdata.page = String(pagination.current);
        getdata.row=String(pagination.pageSize);
        this.setState({
            getdata: getdata,
        });
        this.fetch(this.state.getdata);
    }

    fetch(data) {
        var _this=this;
        this.setState({ loading: true });
        $.ajax({
            url: URL+'/GetResourcesTask',
            type: 'post',
            data:JSON.stringify(data),
            success:function (data) {
                var obj=JSON.parse(data),_data;
                if(obj.info['status']=='success'){
                    const pagination = _this.state.pagination;
                    _data=obj.info['data'];
                    console.log(obj);
                    console.log(_data);
                    pagination.total =parseInt(obj.info['all_row']);
                    $('.f-count').find('i').text(pagination.total);
                    _this.setState({
                        loading: false,
                        data: getData(_data),
                        pagination,
                    });
                    $('.ant-pagination-options').addClass('antd_pageSize');
                    //查看设备
                    $('.f-assginDev').on('click',function(){
                        var _this=this;
                        var td=$(this).closest('tr').find('td')[1];
                        $('#dev_channel').val($(this).attr('data-id'));
                        $('#f-assignDev-modal').on('hide.bs.modal', function () {
                            window.location.reload(true);
                        });
                        $('#f-assignDev-modal').modal('show');
                        var devs=JSON.parse($(this).attr('data-data')),_devs='';
                        for(var i=0;i<devs.length;i++){
                            _devs+='<div class="col-xs-6"><span data-id='+devs[i]["dev_id"]+'>'+devs[i]["dev_name"]+'</span></div>';
                        }
                        $('#f-assignDev-modal').find('.f-cusNum').html('共<i>'+devs.length+'</i>台设备:');
                        $('#f-assignDev-modal').find('.d_device').html(_devs);
                        $('#f-assignDev-modal').find('.dev_submit').on('click',function(){
                            var data={};
                            var devs=$('#f-assignDev-modal').find('.f-seltCustomer').find('span');
                                data._id= $('#dev_channel').val();
                                data.info=[];
                                for(var i=0;i<devs.length;i++){
                                    data.info.push({_id:$(devs[i]).attr('data-id'),task:JSON.parse($(_this).attr('data-channel'))});
                                }
                                $.ajax({
                                    url:URL+'/SendConfigByDevInfoResource',
                                    data:JSON.stringify(data),
                                    type:'post',
                                    success:function(data){
                                        var result=JSON.parse(data);
                                        if(result.info.status=='success'){
                                            addOperation('下发任务设备');
                                            new ShowDiag({msg:'操作成功...',closetime:1,refresh:true});
                                        }else{
                                            new ShowDiag({msg:'操作失败...',closetime:1,refresh:false});
                                        }
                                    }
                                });
                        });
                    });
                    //查看频道列表
                    $('.f-channelList').on('click',function(){
                        var channelList=JSON.parse($(this).attr('data-data')),_channelList='';
                        for(var i=0;i<channelList.length;i++){
                            _channelList+='<div class="col-xs-6"><span >'+channelList[i]["channel_name"]+'</span></div>';
                        }
                        $('#f-channelList-modal').find('.f-cusNum').html('共<i>'+channelList.length+'</i>个频道:');
                        $('#f-channelList-modal').find('.d_device').html(_channelList);
                        $('#f-channelList-modal').modal('show');
                    });
                    //重新下发
                    $('.resend').on('click',function(){
                        var data={};
                        data._id=$(this).attr('data-id');
                        $.ajax({
                            url:URL+'/SendConfigByDevInfoResourceA',
                            data:JSON.stringify(data),
                            type:'post',
                            success:function(result){
                                var res=JSON.parse(result);
                                if(res.info.status=='success'){
                                    addOperation('下发任务');
                                    new ShowDiag({msg:'操作成功...',closetime:1,refresh:true});
                                }else{
                                    new ShowDiag({msg:'操作失败...',closetime:1,refresh:false});
                                }
                            }
                        })
                    });
                }
            },
            error:function(){
            _this.state.loading=false;
        }
        });
    }
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){
        const {selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        return(
            <Table
                className="taskLog_table"
                columns={columns}
                rowSelection={rowSelection}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange.bind(this)}
                bordered
            />
        )
    }
}