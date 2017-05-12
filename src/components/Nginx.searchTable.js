/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { Table } from 'antd';
import { Link,IndexLink,browserHistory } from 'react-router';
import {getMyDate,getStatus,channel,addChannel,formCheck,ShowDiag,addOperation} from "../public/js/f.js"
import {URL} from '../config.js'
let columns = [{
    title: '频道',
    dataIndex: 'channel',
}, {
    title: '客户名称',
    dataIndex: 'customerName',
}, {
    title: '服务集群',
    dataIndex: 'cluster',
}, {
    title: '日期',
    dataIndex: 'date',
}, {
    title: '下发状态',
    dataIndex: 'issuedStatus'
}, {
    title: 'Reload状态',
    dataIndex: 'reloadStatus'
}, {
    title: 'Delete状态',
    dataIndex: 'DeleteStatus'
}, {
    title: '失败原因',
    dataIndex: 'failReason',
    className:'device_btn_div',
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
    dataIndex:'dev',
    className:'device_btn_div',
    render(data) {
        var cou=data[0];
        return <div>{
             cou ? cou.map((item,index)=> index==(cou.length-1) ? <div  key={index}><a  data-data={JSON.stringify(data[0][index]['data'])} className="f-assginDev iconfont page-list">&#xe61d;</a></div>
                 :<div className="device_btn_box" key={index} ><a  data-data={JSON.stringify(data[0][index]['data'])} className="f-assginDev iconfont page-list">&#xe61d;</a></div>
             )
                :''}
        </div>
    }
},{
    title: '操作',
    dataIndex:'operate',
    render(data) {
        var devs=JSON.stringify(data[6]);
        return (
            <span>
                <a data-id={data[0]} className="f-copyChannel">拷贝</a>
                <span className="ant-divider" />
                <a data-id={data[4]} data-channel={data[2]} data-client={data[3]} className="f-EditChannel">编辑</a>
                <span className="ant-divider" />
                {data[5]=='管理员' ? data[10]  ? <a data-id={data[0]} className="f-DelChannel">删除</a>  : ''  : ''}
                {data[5]=='管理员' ? <span className="ant-divider" /> : ''}
                <a data-id={data[0]}  className="f-configChannel" >配置</a>
                { data[7]==0||data[8]==0||data[9]==0 ?
                <span>
                    <span className="ant-divider" />
                    <a data-data={devs} data-send={data[7]} data-reload={data[8]} data-delete={data[9]}  className="f-errorSend">错误下发</a>
                </span>
                    :
                ''
                }
                <span style={{'display':data[1]}} className="ant-divider"/>
                <a data-id={data[2]} style={{'display':data[1]}} className="f-ReloadChannel" >Reload</a>
                  <span  className="ant-divider" />
                <a data-id={data[0]}  className="f-updateStatus iconfont" >&#xe653;</a>
            </span>
        );
    }
}];
function getData(_data){
    var data=[],flag='none',is_ing;
    if(_data){
        for (let i = 0; i < _data.length; i++) {
            is_ing=true
            if(_data[i]['send_state']=='1'||_data[i]['send_state']=='2'){
                flag=''
            }
            if(_data[i]['send_state']=='3'||_data[i]['reload_state']=='3'||_data[i]['delete_state']=='3'){
                is_ing=false;
            }
            var login=JSON.parse(localStorage.loginInfo);
            data.push({
                key: _data[i]['channel_name'],
                channel: _data[i]['channel_name'],
                customerName: _data[i]['client_name'],
                cluster:_data[i]['cluster_name'],
                date:getMyDate(_data[i]['time']),
                issuedStatus:getStatus(_data[i]['send_state'],_data[i]['dev_fail']),
                reloadStatus:getStatus(_data[i]['reload_state'],_data[i]['dev_fail']),
                DeleteStatus:getStatus(_data[i]['delete_state'],_data[i]['dev_fail']),
                failReason: _data[i]['dev_fail_list'],
                dev:[_data[i]['dev_fail_list']],
                operate:[_data[i]['_id'],flag,_data[i]['channel_name'],_data[i]['client_name'],_data[i]['channel_id'],login.role,_data[i]['dev_fail_list'],_data[i]['send_state'],_data[i]['reload_state'],_data[i]['delete_state'],is_ing]
            });
        }
    }

    return data;
}


export default class SearchTableNginx extends Component {
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
                "query":{
                    "client_name":"",
                    "channel_name":"",
                    "send_state":"",
                    "reload_state":""
                },
                "page":"1",
                "row":"10",
                "all_row":"1"
            }

        }
    }
    componentDidMount(){
        this.fetch(this.state.getdata);
        var _this=this;
        //搜索按钮
        $('#SearchBtn').on('click',function(){
            _this.setState({
                getdata:{
                    "query":{
                        "channel_name":$('#nginxForm').find('select[name="channel_name"]').val(),
                        "client_name":$('#nginxForm').find('select[name="client_name"]').val(),
                        "send_state": $('#nginxForm').find('select[name="send_state"]').val(),
                        "reload_state": $('#nginxForm').find('select[name="reload_state"]').val(),
                        "delete_state": $('#nginxForm').find('select[name="delete_state"]').val()
                    },
                    "page":"1",
                    "row":"10",
                    "all_row":"1"
                }
            });
            _this.fetch(_this.state.getdata);
        });
        //重新下发（批量）
        $('#SendAllNginx').on('click',function () {
            if(_this.state.selectedRowKeys.length>0){
                var data={};
                data.channel_name=_this.state.selectedRowKeys;
                data.type='nginx';
                window.Modal.confirm({
                    msg: '确认要重新下发吗？',
                    title: '重新下发',
                    btnok: "确定",
                    btncl: "取消"
                }).on(function(e) {
                    if(e){
                        $.ajax({
                        url: URL + '/SendConfigByChannel',
                        data: JSON.stringify(data),
                        type: 'post',
                        success: function (data) {
                            var _data = JSON.parse(data);
                            if(_data.info.status=='success'){
                                //操作记录
                                addOperation('批量下发Nginx配置');
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
    handleTableChange(pagination) {
        const getdata = this.state.getdata;
        getdata.page = String(pagination.current);
        getdata.row=String(pagination.pageSize);
        this.setState({
            getdata: getdata,
        });
        this.fetch(this.state.getdata);
    }
    fetch(data,current) {
        this.setState({ loading: true });
        var _this=this;
        $.ajax({
            //通信处理
            url: `${URL}/GetNginxTask`,
            data:JSON.stringify(data),
            type:'post',
            success:function(data){
                var obj=JSON.parse(data),_data;
                if(obj.info['status']=='success'){
                    const pagination = _this.state.pagination;
                    _data=obj.info['data'];
                    if(current){
                        pagination.defaultCurrent=current;
                    }
                    //console.log(obj);
                    //console.log(_data);
                    pagination.total =parseInt(obj.info['all_row']);
                    $('.f-count').find('i').text(pagination.total);
                    _this.setState({
                        loading: false,
                        data: getData(_data),
                        pagination,
                    });
                    $('.ant-pagination-options').addClass('antd_pageSize');
                    //频道编辑
                    $('.f-EditChannel').on('click',function(){
                        var $editModel = $('#f-editChannel-modal');
                        //模态框消失刷新
                        $editModel.on('hide.bs.modal', function () {
                            window.location.reload(true);
                        });
                        //显示编辑模态框
                        $editModel.modal('show');
                        $('#Channel_edit').find('input[name="customer"]').val($(this).attr('data-client'));
                        $('#Channel_edit').find('span[name="channel"]').text($(this).attr('data-channel'));
                        $('#Channel_edit').find('input[name="channel_id"]').val($(this).attr('data-id'));
                        var rules={
                                'customer':{
                                    required:true,
                                    customer:true
                                },
                                'channel':{
                                    required:true,
                                    geturl:true
                                }
                            },
                            msg={
                                'customer':{
                                    required:'请填写客户名称'
                                },
                                'channel':{
                                    required:'请填写频道名称'
                                }
                            }
                        formCheck('#Channel_edit',rules,msg,'/SendChannelConfig','editChannel');

                    });
                    //频道复制
                    $('.f-copyChannel').on('click',function(){
                        var $copyModal = $('#f-copyChannel-modal');
                        //模态框消失刷新
                        $copyModal.on('hide.bs.modal', function () {
                            window.location.reload(true);
                        });
                        $('#copy_id').val($(this).attr('data-id'));
                        $copyModal.modal('show');
                        var rules={
                                'customer':{
                                    required:true,
                                    customer:true
                                },
                                'channel':{
                                    required:true,
                                    geturl:true
                                }
                            },
                            msg={
                                'customer':{
                                    required:'请填写客户名称'
                                },
                                'channel':{
                                    required:'请填写频道名称'
                                }
                            }
                        formCheck('#Channel_copy',rules,msg,'/SendChannelConfig','copyChannel');
                    });
                    //频道删除
                    $('.f-DelChannel').on('click',function(){
                        var _this=this;
                        window.Modal.confirm({
                            msg: '确认要删除吗？',
                            title: '删除',
                            btnok: "确定",
                            btncl: "取消"
                        }).on(function(e) {
                            var data={};
                            data.query={};
                            data.query._id=$(_this).attr('data-id');
                            if (e) {
                                $.ajax({
                                    url:URL+'/DeleteNginxConfig',
                                    data:JSON.stringify(data),
                                    type:'post',
                                    success:function (res) {
                                        var result=JSON.parse(res);
                                        if(result.info.status=='success'){
                                            //操作记录
                                            addOperation("删除"+$(_this).closest('span').find('.f-EditChannel').attr('data-channel')+"频道Nginx配置");
                                            new ShowDiag({msg:'操作成功...',closetime:1,refresh:false});
                                        }else{
                                            new ShowDiag({msg:'操作失败...',closetime:1,refresh:false});
                                        }
                                    }
                                })
                            }
                        });
                    });
                    //频道reload
                    $('.f-ReloadChannel').on('click',function(){
                        var _this=this;
                        window.Modal.confirm({
                            msg: '确认要Reload吗？',
                            title: '删除',
                            btnok: "确定",
                            btncl: "取消"
                        }).on(function(e) {
                            var data={};
                            data.channel_name=$(_this).attr('data-id');
                            data.type='nginx';
                            if (e) {
                                $.ajax({
                                    url:URL+'/ReloadConfig',
                                    data:JSON.stringify(data),
                                    type:'post',
                                    success:function (res) {
                                        var result=JSON.parse(res);
                                        if(result.info.status=='success'){
                                            addOperation('频道'+data.channel_name+' Reload Nginx配置');
                                            new ShowDiag({msg:'操作成功...',closetime:1,refresh:false});
                                        }else{
                                            new ShowDiag({msg:'操作失败...',closetime:1,refresh:false});
                                        }
                                    }
                                })
                            }
                        });
                    });
                    //查看设备
                    $('.f-assginDev').on('click',function(){
                        $('#f-assignDev-modal').find('.text-center').remove();
                        $('#f-assignDev-modal').modal('show');
                        var devs=JSON.parse($(this).attr('data-data')),_devs='';
                        for(var i=0;i<devs.length;i++){
                            _devs+='<div class="col-xs-6"><span data-id='+devs[i]["dev_id"]+'>'+devs[i]["dev_name"]+'</span></div>';
                        }
                        $('#f-assignDev-modal').find('.f-cusNum').html('共<i>'+devs.length+'</i>台设备:');
                        $('#f-assignDev-modal').find('.d_device').html(_devs);
                    });
                    //频道配置
                    $('.f-configChannel').on('click',function(){
                        $('#channel_info').attr('data-id',$(this).attr('data-id'));
                        window.location.href='#/nginxConfig?channel_id='+$(this).attr('data-id');
                    });
                    //更新状态
                    $('.f-updateStatus').on('click',function () {
                        if( $(this).attr('data-state')!='disabled'){
                            var data={
                                "query":{
                                    "_id":$(this).attr('data-id'),
                                }
                            },_thiss=this,i=1;
                            $(this).attr('data-state','disabled');
                            var t=setInterval(function(){
                                i=i+10;
                                $(_thiss).css('transform','rotate('+i+'deg)');
                            },100);
                            var st= setTimeout(function(){
                                $(_thiss).removeAttr('data-state');
                                $(_thiss).css('transform','rotate(0deg)');
                                clearInterval(t);
                                clearTimeout(st);
                                $.ajax({
                                    url:URL+'/GetNginxTask',
                                    data:JSON.stringify(data),
                                    type:'post',
                                    success:function (result) {
                                        var data=JSON.parse(result);
                                        //console.log(data);
                                        var _data=data.info.data[0];
                                        if(_data['send_state']=='0'||_data['send_state']=='3'){
                                            $($(_thiss).closest('tr').find('.f-ReloadChannel')).prev().css('display','none');
                                            $($(_thiss).closest('tr').find('.f-ReloadChannel')).css('display','none');
                                        }
                                        var reload=getStatus(_data['reload_state'],data.info.data[0]['dev_fail']);
                                        var send=getStatus(_data['send_state'],data.info.data[0]['dev_fail']);
                                        var _delete=getStatus(_data['delete_state'],data.info.data[0]['dev_fail']);
                                        $($(_thiss).closest('tr').find('td')[5]).text(send);
                                        $($(_thiss).closest('tr').find('td')[6]).text(reload);
                                        $($(_thiss).closest('tr').find('td')[7]).text(_delete);
                                        if(_data['send_state']==0||_data['reload_state']==0||_data['delete_state']==0){
                                            $($(_thiss).closest('tr').find('.f-errorSend')).css('display','');
                                            $($(_thiss).closest('tr').find('.f-errorSend')).prev().css('display','');
                                            $($(_thiss).closest('tr').find('.f-errorSend')).attr('data-send',_data['send_state']);
                                            $($(_thiss).closest('tr').find('.f-errorSend')).attr('data-reload',_data['reload_state']);
                                            $($(_thiss).closest('tr').find('.f-errorSend')).attr('data-delete',_data['delete_state']);
                                            $($(_thiss).closest('tr').find('.f-errorSend')).attr('data-data',JSON.stringify(_data['dev_fail_list']));
                                        }else{
                                            $($(_thiss).closest('tr').find('.f-errorSend')).css('display','none');
                                            $($(_thiss).closest('tr').find('.f-errorSend')).prev().css('display','none');
                                        }
                                        var fail_reason='',fail_devs='';
                                        if(_data['dev_fail_list']){
                                            for(var i=0;i<_data['dev_fail_list'].length;i++){
                                                if(_data['dev_fail_list'].length>1){
                                                    if(_data['dev_fail_list'].length-1==i){
                                                        fail_reason+='<div><span>'+_data['dev_fail_list'][i]['reason']+'</span></div>';
                                                        fail_devs+='<div><a data-send="'+_data['send_state']+'" data-reload="'+_data['reload_state']+'" data-delete="'+_data['delete_state']+'" data-data='+JSON.stringify(_data['dev_fail_list'][i]['data'])+' class="f-assginDev iconfont page-list">&#xe61d;</a></div>';
                                                    }else{
                                                        fail_reason+='<div class="device_btn_box" ><span>'+_data['dev_fail_list'][i]['reason']+'</span></div>';
                                                        fail_devs+='<div class="device_btn_box"><a data-send="'+_data['send_state']+'" data-reload="'+_data['reload_state']+'" data-delete="'+_data['delete_state']+'" data-data='+JSON.stringify(_data['dev_fail_list'][i]['data'])+' class="f-assginDev iconfont page-list">&#xe61d;</a></div>';
                                                    }
                                                }else{
                                                    fail_reason='<div><span>'+_data['dev_fail_list'][i]['reason']+'</span></div>';
                                                    fail_devs+='<div><a data-send="'+_data['send_state']+'" data-reload="'+_data['reload_state']+'" data-delete="'+_data['delete_state']+'" data-data='+JSON.stringify(_data['dev_fail_list'][i]['data'])+' class="f-assginDev iconfont page-list">&#xe61d;</a></div>';
                                                }
                                            }
                                            $($(_thiss).closest('tr').find('.device_btn_div')[0]).html(fail_reason);
                                            $($(_thiss).closest('tr').find('.device_btn_div')[1]).html(fail_devs);
                                            //查看设备
                                            $($(_thiss).closest('tr').find('.f-assginDev')).on('click',function(){
                                                $('#f-assignDev-modal').find('.text-center').remove();
                                                $('#f-assignDev-modal').modal('show');
                                                var devs=JSON.parse($(this).attr('data-data')),_devs='';
                                                for(var i=0;i<devs.length;i++){
                                                    _devs+='<div class="col-xs-6"><span data-id='+devs[i]["dev_id"]+'>'+devs[i]["dev_name"]+'</span></div>';
                                                }
                                                $('#f-assignDev-modal').find('.f-cusNum').html('共<i>'+devs.length+'</i>台设备:');
                                                $('#f-assignDev-modal').find('.d_device').html(_devs);
                                            });
                                        }else{
                                            $($(_thiss).closest('tr').find('.device_btn_div')[0]).html('');
                                            $($(_thiss).closest('tr').find('.device_btn_div')[1]).html('');
                                        }
                                        new ShowDiag({msg:'更新成功...',closetime:1,refresh:false});
                                    },
                                    error:function(result){
                                        var result = JSON.parse(result.responseText);
                                        if ('failed' == result.info.status) {
                                            new ShowDiag({msg:'删除成功...',closetime:1,refresh:false});
                                            $(_thiss).closest('tr').remove();
                                        }
                                    }
                                });
                            },5000);
                        }
                    });
                    //错误下发
                    $('.f-errorSend').off('click');
                    $('.f-errorSend').on('click',function(){
                        var data={};
                        data.dev_id=[];
                        var td1=$(this).closest('tr').find('td').last().find('a')[0];
                        var _id=$(td1).attr('data-id');
                        var td2=$(this).closest('tr').find('td')[1];
                        data.name=$(td2).text();
                        data._id=_id;
                        if($(this).data('delete')==0){
                            data.opt_type='delete';
                        }else{
                            if($(this).data('send')==0){
                                data.opt_type='send';
                            }else if($(this).data('reload')==0){
                                data.opt_type='reload';
                            }
                        }
                        var dev_obj=JSON.parse($(this).attr('data-data'));
                        for(var i=0;i<dev_obj.length;i++){
                            var _data=dev_obj[i]['data'];
                            for(var j=0;j<_data.length;j++) {
                                if(data.dev_id.indexOf(_data[j]['dev_id'])==-1){
                                    data.dev_id.push(_data[j]['dev_id']);
                                }
                            }
                        }
                        $.ajax({
                            url:URL+'/SendConfigByDevInfoNginx',
                            data:JSON.stringify(data),
                            type:'post',
                            success:function(data){
                                var result=JSON.parse(data);
                                if(result.info.status=='success'){
                                    addOperation('Nginx任务下发设备');
                                    new ShowDiag({msg:'设备重新下发成功，请稍后更新状态',closetime:1,refresh:false});
                                }else{
                                    new ShowDiag({msg:'操作失败',closetime:1,refresh:false});
                                }
                            }
                        });
                    });
                }else{
                    _this.setState({
                        loading:false,
                        data:[],
                        pagination: {
                            showSizeChanger: true,
                            pageSizeOptions:['10 ','20 ','30 ','40 ','50 ','100 '],
                            total:10
                        }
                    });
                }
            },
            error:function(){
            _this.state.loading=false;
        }
        });
    }
    onSelectChange(selectedRowKeys) {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
            getCheckboxProps: record => ({
                disabled: record.issuedStatus === '成功',    // Column configuration not to be checked
            })
        };
        return(
            <Table
                className='Nginx_table'
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
