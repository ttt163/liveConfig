/**
 * Created by Administrator on 2016/11/18.
 */
import React, {Component,PropTypes} from 'react'
import { Table,Switch,Icon } from 'antd';
import {formCheck,getMyDate,ShowDiag,addOperation} from '../public/js/f.js'
import { URL } from '../config.js';
const columns = [{
    title: '账户名',
    dataIndex: 'account',
}, {
    title: '角色',
    dataIndex: 'role',
}, {
    title: '联系人',
    dataIndex: 'contact',
}, {
    title: '最后登录时间',
    dataIndex: 'time',
}, {
    title: '状态',
    dataIndex: 'status',
}, {
    title: '操作',
    dataIndex: 'operate',
    render(data) {
        var _switch=true;
        if(data.state=='1'){
            _switch=true;
        }else{
            _switch=false;
        }
       return  (
            <span>
            <Switch data-id={data['_id']} data-name={data['name']} style={{marginRight:'5px'}} size="small" onChange={UsehandleChange} defaultChecked={_switch}/> |
            <a data-id={data['_id']} className="f-deleteuser">删除</a> |
            <a data-id={data['_id']} className="f-edit">编辑</a> |
            <a data-id={data['_id']} className="f-resetpwd">重置密码</a>
            </span>
                )
       }
}];
function UsehandleChange(checked){
    var _this=this;
    if(checked){
        var data={};
        data._id=$(this).attr('data-id');
        data.state="1";
        $.ajax({
            url:URL+'/UpdateUser',
            data:JSON.stringify(data),
            type:'post',
            success:function(result){
                addOperation('启用用户'+$(_this).attr('data-name'));
                var switchs=$('.User_table').find('.ant-switch');
                for(var i=0;i<switchs.length;i++){
                    if($(switchs[i]).hasClass('ant-switch-checked')){
                        $(switchs[i]).closest('td').prev().text('可用');
                    }
                }
            }
        })
    }else{
        var data={};
        data._id=$(this).attr('data-id');
        data.state="0";
        $.ajax({
            url:URL+'/UpdateUser',
            data:JSON.stringify(data),
            type:'post',
            success:function(result){
                addOperation('禁用用户'+$(_this).attr('data-name'));
                var switchs=$('.User_table').find('.ant-switch');
                for(var i=0;i<switchs.length;i++){
                    if(!$(switchs[i]).hasClass('ant-switch-checked')){
                        $(switchs[i]).closest('td').prev().text('不可用');
                    }
                }
            }
        })
    }
}
function getData(_data){
    var data=[];
    if(_data){
        for (let i = 0; i < _data.length; i++) {
            var status='';
            if(_data[i]['state']=='1'){
                status="可用"
            }else if(_data[i]['state']=='0'){
                status="不可用"
            }else{
                status="无状态"
            }
            data.push({
                key: _data[i]['_id'],
                account: _data[i]['name'],
                role: _data[i]['role'],
                contact: _data[i]['linkman'],
                time: getMyDate(_data[i]['time']),
                status:status,
                operate: _data[i]
            });
        }
    }
    return data;
}
export default class UserList extends Component {
    componentDidMount(){
        this.fetch(this.state.getdata);
        var _this=this;
        $('#user_search_text').on('keyup',function(event){
            if(event.keyCode=='13'){
                _this.setState({
                    getdata:{
                        "query":{
                            "name":$('#user_search_text').val()
                        },
                        "page":"1",
                        "row":"10",
                        "all_row":"1"
                    }
                })
                _this.fetch(_this.state.getdata);
            }
        });
        //搜索按钮
        $('#SearchBtn').on('click',function(){
            _this.setState({
                getdata:{
                    "query":{
                        "name":$('#user_search_text').val()
                    },
                    "page":"1",
                    "row":"10",
                    "all_row":"1"
                }
            })
            _this.fetch(_this.state.getdata);
        });
        //启用（批量）
        $('#enable').on('click',function () {
            if(_this.state.selectedRowKeys.length>0){
                var data=[];
                for(var i=0;i<_this.state.selectedRowKeys.length;i++){
                    data[i]={};
                    data[i]['_id']=_this.state.selectedRowKeys[i];
                    data[i]['state']='1';
                }
                window.Modal.confirm({
                    msg: '确认要启用所选用户吗？',
                    title: '启用',
                    btnok: "确定",
                    btncl: "取消"
                }).on(function(e) {
                    if(e) {
                        $.ajax({
                            url: URL + '/UpdateUserS',
                            data: JSON.stringify(data),
                            type: 'post',
                            success: function (data) {
                                var _data = JSON.parse(data);
                                if (_data.info.status == 'success') {
                                    addOperation('批量启用用户');
                                    new ShowDiag({msg: '操作成功...', closetime: 1, refresh: true});
                                } else {
                                    new ShowDiag({msg: '操作失败...', closetime: 1, refresh: false});
                                }
                            }
                        });
                    }
                });
            }else{
                new ShowDiag({msg:'您没有勾选',closetime:1,refresh:false});
            }
        });
        //禁用
        $('#unable').on('click',function () {
            if(_this.state.selectedRowKeys.length>0){
                var data=[];
                for(var i=0;i<_this.state.selectedRowKeys.length;i++){
                    data[i]={};
                    data[i]['_id']=_this.state.selectedRowKeys[i];
                    data[i]['state']='0';
                }
                window.Modal.confirm({
                    msg: '确认要禁用所选用户吗？',
                    title: '禁用',
                    btnok: "确定",
                    btncl: "取消"
                }).on(function(e) {
                    if(e){
                        $.ajax({
                            url: URL + '/UpdateUserS',
                            data: JSON.stringify(data),
                            type: 'post',
                            success: function (data) {
                                var _data = JSON.parse(data);
                                if(_data.info.status=='success'){
                                    addOperation('批量禁用用户');
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
        //批量删除
        $('#deleteuser').on('click',function () {
            if(_this.state.selectedRowKeys.length>0){
                var data=[];
                for(var i=0;i<_this.state.selectedRowKeys.length;i++){
                    data[i]={};
                    data[i]['_id']=_this.state.selectedRowKeys[i];
                }
                window.Modal.confirm({
                    msg: '确认要删除所选用户吗？',
                    title: '删除用户',
                    btnok: "确定",
                    btncl: "取消"
                }).on(function(e) {
                    if(e){
                        $.ajax({
                        url: URL + '/DeleteUserS',
                        data: JSON.stringify(data),
                        type: 'post',
                        success: function (data) {
                            var _data = JSON.parse(data);
                            if(_data.info.status=='success'){
                                addOperation('批量删除用户');
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
                "query":{
                    "_id":"",
                    "name":"",
                    "role":""
                },
            "page":"1",
            "row":"10",
            "all_row":"1"
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
        var _this=this;
        $.ajax({
            url: URL+'/GetUser',
            data:JSON.stringify(data),
            type: 'post',
            success:function(data){
                var obj=JSON.parse(data),_data;
                if(obj.info['status']=='success'){
                const pagination = _this.state.pagination;
                _data=obj.info['data'];
                pagination.total =parseInt(obj.info['all_row']);
                $('.f-count').find('i').text(pagination.total);
                _this.setState({
                    loading: false,
                    data: getData(_data),
                    pagination
                });
                $('.ant-pagination-options').addClass('antd_pageSize');
                var $edit = $('.f-edit'),    //编辑按钮
                    $resetpwd = $('.f-resetpwd'), //重置密码按钮
                    $editModal = $('#f-editUser-modal'),  //编辑模态框
                    $chk = $('.f-chk'),     //单选多选按钮
                    $resetpweModal = $('#f-resetpwd-modal'); //重置密码模态框
                //编辑用户模态框
                $edit.on('click', function () {
                    var url = $(this).data('url');
                    var data={
                        "query":{
                            "_id":$(this).attr('data-id'),
                            "name":"",
                            "role":""
                        },
                        "page":"1",
                        "row":"10",
                        "all_row":"1"

                    }
                    $.ajax({
                        url:URL+'/GetUser',
                        type:'post',
                        data:JSON.stringify(data),
                        success:function(result){
                            var data=JSON.parse(result)['info']['data'][0];
                            $('#userEdit').find('.account').text(data.name);
                            $('#userEdit').find('.role').text(data.role);
                            if($('#userEdit').find('.concat')[0].tagName=='INPUT'){
                                $('#userEdit').find('.concat').val(data.linkman);
                            }else{
                                $('#userEdit').find('.concat').text(data.linkman);
                            }
                            $('#userEdit').find('input[name="email"]').val(data.email);
                            $('#userEdit').find('input[name="phone"]').val(data.telephone);
                            $('#userEdit').find('input[name="qq"]').val(data.qq);
                            $('#userEdit').find('textarea[name="description"]').val(data.remarks);
                            $editModal.find('input[name="id"]').val(data._id);
                            $editModal.modal('show');
                            $chk = $editModal.find('.f-chk');
                            $chk.iCheck({
                                checkboxClass: 'icheckbox_square-blue',
                                radioClass: 'iradio_square-blue',
                                increaseArea: '20%'
                            });
                            $chk.on('ifChecked', function(){
                                $(this).closest('.f-usePlug').find('.resError').remove();
                                $(this).closest('.form-group').removeClass('has-error');
                            });
                            var rules = {
                                'password':{
                                    psw:true
                                },
                                'repwd':{
                                    equalTo:"#epsw"
                                },
                                'role':{
                                    required: true
                                },
                                'permissions[]':{
                                    required: true
                                },
                                'contacter':{
                                    required: true,
                                    contacts:true
                                },
                                'email':{
                                    required: true,
                                    email:true
                                },
                                'phone':{
                                    mobile:true
                                },
                                'qq':{
                                    qq:true
                                },
                                'description':{
                                    maxlength:255
                                }
                            }, msg = {
                                'password':{
                                },
                                'repwd':{
                                    equalTo:"两次密码输入不一致"
                                },
                                'role':{
                                    required: "请选择角色"
                                },
                                'contacter':{
                                    required: "请填写联系人"
                                },
                                'email':{
                                    required: "请填写邮箱",
                                    email:"邮箱格式不正确"
                                },
                                'phone':{},
                                'qq':{},
                                'description':{
                                    maxlength:"长度不能大于255个字符"
                                }
                            }, url = '/UpdateUser';
                            formCheck('#userEdit', rules, msg, url,'userEdit');
                        }
                    });
                });
                //重置密码模态框
                $resetpwd.on('click', function () {
                    $('#resetP').val($(this).attr('data-id'));
                    $('#uname').val($($(this).closest('tr').find('td')[1]).text());
                    $resetpweModal.modal('show');
                    var rules = {
                        'password':{
                            required:true,
                            psw:true
                        },
                        'rpassword':{
                            required:true,
                            equalTo:"#newpsw"
                        }
                    }, msg = {
                        'password':{
                            required:"请填写密码"
                        },
                        'rpassword':{
                            required:"请填写密码",
                            equalTo:"两次密码输入不一致"
                        }
                    }, url = '/UpdateUser';
                    formCheck('#resetPwd', rules, msg, url,'passwordEdit');
                });
                    //单个删除
                $('.f-deleteuser').on('click',function(){
                        var _this=this;
                        window.Modal.confirm({
                            msg: '确认要删除此用户吗？',
                            title: '删除用户',
                            btnok: "确定",
                            btncl: "取消"
                        }).on(function(e) {
                            if(e){
                                var data={};
                                data.query={};
                                data.query._id=$(_this).attr('data-id');
                                $.ajax({
                                    url: URL + '/DeleteUser',
                                    data: JSON.stringify(data),
                                    type: 'post',
                                    success: function (data) {
                                        var _data = JSON.parse(data);
                                        if(_data.info.status=='success'){
                                            addOperation('删除用户'+$($(_this).closest('tr').find('td')[1]).text());
                                            new ShowDiag({msg:'操作成功...',closetime:1,refresh:true});
                                        }else{
                                            new ShowDiag({msg:'操作失败...',closetime:1,refresh:false});
                                        }
                                    }
                                });
                            }
                        });
                    });
                }
            },
            error:function(){
                _this.state.loading=false;
            }
        });
    }
    onSelectChange(selectedRowKeys) {
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
                className="User_table"
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