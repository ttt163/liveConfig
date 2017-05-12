/**
 * Created by Administrator on 2016/9/8.
 */
import React, {
	Component,
	PropTypes
} from 'react'
import { Link} from 'react-router';
import imgFace from '../public/images/face.jpg';

export default class Header extends Component {
	constructor(state){
		super(state);
		this.state={
			name:''
		}
	}
	componentDidMount(){
		$('#log_out').on('click',function(){
			delete localStorage.loginInfo;
			$.cookie('login','false');
			window.location.href='#/login';
		});
	}
	render() {
		if(localStorage.loginInfo!=undefined){
			var user=JSON.parse(localStorage.loginInfo);
		}else{
			window.location.href='#/login'
		}
		return (
			<div className="f-header">
				<h1>直播配置管理系统</h1>
				<ul className='f-login list-inline'>
					<li className='f-face'><img src={imgFace} /></li>
						<li>您好,{user.name}</li>
						<li><a href="javascript:;" className="f-edit-psw">修改密码</a></li>
						<li><span className='glyphicon glyphicon-off'></span>
							<a id="log_out" >退出</a>
						</li>
					</ul>
				</div>
		)
	}
}