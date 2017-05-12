/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { URL } from '../config.js';
export default class UserInfo extends Component {
    constructor(state) {
        super(state);
        this.state={
            data:{
                name:'',
                email:'',
                telephone:'',
                linkman:'',
                remarks:'',
                qq:'',
                role:''
            }
        }
    }
    componentDidUpdate(){
        console.log(this.state.data);
    }
    componentDidMount(){
        var _data={};_data.query={};
        var user=JSON.parse(localStorage.loginInfo);
        _data.query._id=user.userId;
        var _this=this;
        $.ajax({
            url:URL+'/GetUser',
            data:JSON.stringify(_data),
            type:'post',
            success:function(result){
                var userdata=JSON.parse(result);
                if(userdata.info.status='success'){
                    var userinfo=userdata.info.data[0];
                    _this.setState({
                        data:{
                                name:userinfo.name,
                                email:userinfo.email,
                                telephone:userinfo.telephone,
                                linkman:userinfo.linkman,
                                remarks:userinfo.remarks,
                                qq:userinfo.qq,
                                role:userinfo.role
                        }
                    });
                    $('#f-edit-info').attr('data-id',userinfo._id);
                }
            }
        })
    }
    render() {
        return (
            <dl className="dl-horizontal f-userInfo">
                <dt><span className='red'>*</span> 账户名：</dt>
                <dd>{this.state.data.name}</dd>
                <dt><span className='red'>*</span> 角色：</dt>
                <dd>{this.state.data.role}</dd>
                <dt><span className='red'>*</span> 联系人：</dt>
                <dd>{this.state.data.linkman}</dd>
                <dt><span className='red'>*</span> 邮箱：</dt>
                <dd>{this.state.data.email}</dd>
                <dt><span className='red'>*</span> 手机：</dt>
                <dd>{this.state.data.telephone}</dd>
                <dt>QQ：</dt>
                <dd>{this.state.data.qq}</dd>
                <dt>备注：</dt>
                <dd>{this.state.data.remarks}</dd>
            </dl>
        )
    }
}