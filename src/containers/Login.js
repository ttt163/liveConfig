//import '../public/plugs/bootstrap/css/bootstrap.css';
//import "../public/css/f.css"
//import  '../css/main.css';
import React,{PropTypes} from 'react'
import { render } from 'react-dom'
import {URL} from '../config.js'
import { addOperation,getMyDate } from "../public/js/f.js"
//import {selectie,validateChosen,formCheck,ShowDiag,alertMsg} from  "../public/js/f.js"
//import UserInfo from '../components/User.Info.js'
//import EditPersonInfo from '../components/User.person.edit.js'
export default class Login extends React.Component {
    constructor(state) {
        super(state);
    }
    componentWillMount(){
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
            }
        }
    }
    _login(e){
        e.preventDefault();
        if ($('input[name=username]').val() == '' || $('input[name=password]').val() == '') {
            $('.error').html('账号或密码不能为空!');
            return false;
        } else {
            var data={};
            data.name=$('input[name=username]').val();
            data.password= $.md5($('input[name=password]').val());
            $(e.target).attr('disabled','disabled');
            let _target=e.target;
            $.ajax({
             url: URL+'/UserAuth',
             type: 'POST',
             data: JSON.stringify(data),
             success: function (data) {
                 $(_target).removeAttr('disabled');
                 var _data=JSON.parse(data);
                if(_data.info.status=='success'){
                    if(_data.info.data.state=="1"){
                        var login= {};
                        login.loginStatus=true;
                        login.firstlogin=true;
                        login.userId=_data.info.data._id;
                        login.role=_data.info.data.role;
                        login.name=$('input[name=username]').val();
                        localStorage.loginInfo=JSON.stringify(login);
                        $.cookie("login",'true');
                        var updateData={};
                        updateData.time=getMyDate(new Date().getTime());
                        updateData._id= login.userId;
                        $.ajax({
                            url:URL+'/UpdateUser',
                            type:'post',
                            data:JSON.stringify(updateData),
                            success:function(data){
                                console.log(data)
                            }
                        })
                        addOperation('登陆系统');
                        window.location.href='#/clms'
                    }else if(_data.info.data.state=="0"){
                        $('#login').find('.error').text('您的账号已被管理员禁用。');
                    }

                }
             },
              error:function(data){
                  $(_target).removeAttr('disabled');
                var _data=JSON.parse(data.responseText);
                  if(_data.info.status=='failed'){
                        $('#login').find('.error').text('用户名或密码错误，请重试');
                  }
             }
           })
       }
    }
    render() {
        return(
            <div id="f-index">
                <div className="container">
                    <div className="f-iLogo"><a href=""></a></div>
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="f-login-ban"></div>
                        </div>
                        <div className="col-xs-6">
                            <h1>直播配置管理系统
                                <small>beta</small>
                            </h1>
                            <form  id="login">
                                <input type="hidden" name="_token" value="" />

                                <div className="f-iform">
                                    <div className="form-group  has-feedback">
                                        <span className="glyphicon glyphicon-user form-control-feedback"></span>
                                        <input type="text" className="form-control" name="username" placeholder="用户名" />
                                    </div>

                                    <div className="form-group  has-feedback">
                                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                        <input type="password" className="form-control" name="password" placeholder="密码" />
                                    </div>
                                    <div className="form-group">
                                        <div className="error text-center"></div>
                                        <button type="submit" onClick={this._login.bind(this)} className="btn btn-primary col-xs-12 f-mt10">登陆</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Login.contextTypes = {
    router: PropTypes.object
}


