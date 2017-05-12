import React from 'react'
import { render } from 'react-dom'
import {validateChosen,formCheck,ShowDiag} from  "../public/js/f.js"
import UserInfo from '../components/User.Info.js'
import EditPersonInfo from '../components/User.person.edit.js'
import ResetPwd from '../components/User.resetPwd.js'
import { URL } from '../config.js';
export default class UserPerson extends React.Component {
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
            var data=JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }
    }
    componentDidMount(){
        var editInfo = $('#f-edit-info'),
            $editInfomodal = $('#f-editInfo-modal'),
            $clearChannel=$('#f-clear-channel'),
            $resetpwd = $('.f-edit-psw'), //重置密码按钮
            $resetpweModal = $('#f-editPsw-modal'); //重置密码模态框

        //清理频道
        $clearChannel.on('click',function(){
            window.Modal.confirm({
                msg: '确认要清空未配置的频道吗？',
                title: '清空',
                btnok: "确定",
                btncl: "取消"
            }).on(function(e) {
                if(e){
                    $.ajax({
                        url:URL+'/RemoveEmptyChannel',
                        type:'get',
                        success:function (result) {
                           if(result){
                               var data=JSON.parse(result);
                               if(data.info.status=='success'){
                                   new ShowDiag({msg: '操作成功...', closetime: 1, refresh: false});
                               }
                           }
                        }
                    });
                }
            });
        });

        //修改资料模态框
        editInfo.on('click',function(){
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
                    console.log(JSON.parse(result));
                    var data=JSON.parse(result)['info']['data'][0];
                    $('#personEdit').find('.account').text(data.name);
                    $('#personEdit').find('.role').text(data.role);
                    if($('#personEdit').find('.concat')[0].tagName=='INPUT'){
                        $('#personEdit').find('.concat').val(data.linkman);
                    }else{
                        $('#personEdit').find('.concat').text(data.linkman);
                    }
                    $('#personEdit').find('input[name="email"]').val(data.email);
                    $('#personEdit').find('input[name="phone"]').val(data.telephone);
                    $('#personEdit').find('input[name="qq"]').val(data.qq);
                    $('#personEdit').find('textarea[name="description"]').val(data.remarks);
                    $editInfomodal.find('input[name="id"]').val(data._id);
                    $editInfomodal.modal('show');
                    var rules = {
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
                        'email':{
                            required: "请填写邮箱",
                            email:"邮箱格式不正确"
                        },
                        'phone':{},
                        'qq':{},
                        'description':{
                            maxlength:"长度不能大于255个字符"
                        }
                    },  url = '/UpdateUser';
                    formCheck('#personEdit', rules, msg, url,'personEdit');
                }
            });
        });
        //重置密码模态框
        $resetpwd.on('click', function () {
            $resetpweModal.find('input[name="id"]').val($('#f-edit-info').attr('data-id'));
            $resetpweModal.modal('show');
            var rules = {
                'oldPwd':{
                    required:true,
                    psw:true
                },
                'password':{
                    required:true,
                    psw:true
                },
                'rpassword':{
                    required:true,
                    equalTo:"#newspwP"
                }
            }, msg = {
                'oldPwd':{
                    required:'请填写原密码'
                },
                'password':{
                    required:"请填写密码"
                },
                'rpassword':{
                    required:"请填写密码",
                    equalTo:"两次密码输入不一致"
                }
            }, url = '/UpdatePassword';
            formCheck('#setPwd', rules, msg, url,'resetPassword');
        });

    }
    render() {
        return(
            <div>
                <div className="table-box f-notable ">
                    <div className="clearfix f-notable-capt f-gradient">
                        <div className="f-caption pull-left">
                            <ul className="list-inline">
                                <li><h4>账户信息</h4></li>
                            </ul>
                        </div>
                        <div className="f-btnAct pull-right">
                            <button className="f-btn" id='f-clear-channel'  type='button'><span className='glyphicon glyphicon-wrench'></span> 清理频道</button>
                            <button className="f-btn ml15" id='f-edit-info'  type='button'><span className='glyphicon glyphicon-edit'></span> 修改资料</button>
                            <button className="f-btn ml15 f-edit-psw" type='button'><span className='glyphicon glyphicon-lock'></span> 修改密码</button>
                        </div>
                    </div>
                    <UserInfo/>
                </div>
                {/*编辑*/}
                <EditPersonInfo />
                {/*重置密码*/}
                <ResetPwd />
            </div>
        )
    }


}

