//import '../public/plugs/bootstrap/css/bootstrap.css';
//import "../public/css/f.css"
//import  '../css/main.css';
import React from 'react'
import { render } from 'react-dom'
import {selectie,validateChosen,formCheck,ShowDiag,alertMsg} from  "../public/js/f.js"
import Search from '../components/Search.js'
import UserList from '../components/User.list.js'
import UserAdd from '../components/User.add.js'
import ManagementEdit from '../components/User.manage.edit.js'
import ResetPwd from '../components/User.resetPwd.js'
import { URL } from '../config.js';
export default class UserManagement extends React.Component {
    constructor(state) {
        super(state);
    }
    componentWillMount(){
        //是否登录
        if(localStorage.loginInfo==undefined){
            localStorage.loginInfo=JSON.stringify({'loginStatus':false});
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }else{
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }else if(data.role!='管理员'){
                window.location.href='#/userPerson'
            }
        }
    }
    componentDidMount() {
        var $addUser = $('#f-add'),  //添加按钮
            $chk = $('.f-chk'),     //单选多选按钮
            $addModal = $('#f-addUser-modal'); //添加模态框
        //	添加用户模态框
        $addUser.on('click', function () {
            $addModal.modal('show');
            var rules = {
                'username': {
                    required: true,
                    username:true
                },
                'password':{
                    required: true,
                    psw:true
                },
                'repwd':{
                    required: true,
                    equalTo:"#psw"
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
                'username': {
                    required: "请填写用户名"
                },
                'password':{
                    required: "请填写密码"
                },
                'repwd':{
                    required: "请填写密码",
                    equalTo:"两次密码输入不一致"
                },
                'role':{
                    required: "请选择角色"
                },
                'permissions[]':{
                    required: "请选择客户"
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
            formCheck('#user_add', rules, msg, url,'userAdd');
            //单选、复选框样式
            $chk.iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%'
            });
            $chk.on('ifChecked', function(){
                $(this).closest('.f-usePlug').find('.resError').remove();
                $(this).closest('.form-group').removeClass('has-error');
            });
        });
    }

    render() {
        return (
            <div>
                <div className="clearfix">
                    <div className="col-xs-8 f-pL0 f-operation">
                        <div>
                            <button className="f-btn" id="f-add" type="button"><span className='f-addInfo'></span> 添加</button>
                            <button className="f-btn changeStatus" type="button" id="enable"><span className='f-openInfo'></span> 启用
                            </button>
                            <button className="f-btn changeStatus" type="button" id="unable"><span className='f-stopInfo'></span> 禁用
                            </button>
                            <button className="f-btn changeStatus" type="button" id="deleteuser"><span className='f-delInfo'></span> 删除
                            </button>
                        </div>
                    </div>
                    <div className="col-xs-4 f-pR0">
                        <div className="form-inline" id="f-search">
                            <Search />
                        </div>
                    </div>
                </div>
                <div className="table-box">
                    <div className="clearfix f-gradient">
                        <div className="f-caption pull-left">
                            <ul className="list-inline">
                                <li><h4>用户列表</h4></li>
                                <li>每页显示
                                    <div className="numSelect _pagesizeReset">

                                    </div>
                                    个
                                </li>
                                <li className="f-count">共<i></i>条</li>
                            </ul>
                        </div>
                    </div>
                    <UserList />
                </div>
                {/*添加*/}
                <UserAdd />
                {/*编辑*/}
                <ManagementEdit />
                    {/*重置密码*/}
                <ResetPwd />
            </div>
        )


    }
}

