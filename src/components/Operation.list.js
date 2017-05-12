/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { Table } from 'antd';
import {URL} from '../config.js'
import {getMyDate} from "../public/js/f.js"
const columns = [{
    title: '操作时间',
    dataIndex: 'time',
}, {
    title: '操作用户',
    dataIndex: 'user',
}, {
    title: '操作描述',
    dataIndex: 'desc',
    }
];

function getData(_data){
    var data=[];
    if(_data){
        for (let i = 0; i < _data.length; i++) {
            data.push({
                key: _data[i]['_id'],
                time:getMyDate(_data[i]['time']),
                user:_data[i]['name'],
                desc:_data[i]['description']
            });
        }
    }
    return data;
}
export default class SearchTableOperation extends Component {
    componentDidMount(){
        var data=JSON.parse(localStorage.loginInfo);
        if(data.role!='管理员'){
           this.state.getdata.query.name=data.name;
        }
        this.fetch(this.state.getdata);
        var _this=this;
        //查询点击事件
        $('#searchLog').on('click',function(){
            var username='',startName='',endName='';
            if($('#OperationLogForm').find('input[name="name"]').length>0){
                username=$('#OperationLogForm').find('input[name="name"]').val();
            }
            startName=$('#OperationLogForm').find('input[name="start_time"]').val();
            endName=$('#OperationLogForm').find('input[name="end_time"]').val();
            _this.setState({
                getdata:{
                    query:{
                        name:username,
                        start_time:startName,
                        end_time:endName
                    },
                    page:"1",
                    row:"10",
                    all_row:"1"
                }
            });
            _this.fetch(_this.state.getdata);
        });
        //重置点击事件
        $('#resetLog').on('click',function (){
            $('#OperationLogForm').find('input').val('');
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
            getdata:{
                query:{
                    name:"",
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
        this.setState({ loading: true });
        var _this = this;
        $.ajax({
            url:URL+'/GetUserOperation',
            data:JSON.stringify(data),
            type:"post",
            success:function(data){
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
                        pagination
                    });
                    $('.ant-pagination-options').addClass('antd_pageSize');
                }
            },
            error:function(){
                _this.state.loading=false;
            }
        });
    }
    render(){
        return(
            <Table
                className="Operation_table"
                columns={columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange.bind(this)}
                bordered
            />
        )
    }
}