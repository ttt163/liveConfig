/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { Link,IndexLink,browserHistory } from 'react-router';
export default class Left extends Component {
    render() {
        return (
            <div className="f-nav">
                <ul className='list-unstyled'>
                    <li className="f-unfold"></li>
                    <li className="f-sub">
                        <a className='f-channel-manage' href="#">频道管理<i className='glyphicon glyphicon-menu-down'></i></a>
                        <ul className='list-unstyled f-placehold'>
                            <li><Link id="clmsConfig"  activeClassName="f-curr" to="/clms"><span>- </span>Clms配置</Link></li>
                            <li><Link  activeClassName="f-curr" to="/nginx"><span>- </span>Nginx配置</Link></li>
                        </ul>
                    </li>
                    <li className="f-sub">
                        <a className='f-device-manage ' href='#'>设备管理 <i className='glyphicon glyphicon-menu-down'></i></a>
                        <ul className='list-unstyled f-placehold'>
                            {/* <li><a href="#"><span>- </span>设备管理</a></li>
                             <li><a href="#"><span>- </span>设备组管理</a></li>
                             <li><a href="#"><span>- </span>集群管理</a></li>
                            */}
                            <li><Link  activeClassName="f-curr" to="/device"><span>- </span>设备管理</Link></li>
                            <li><Link  activeClassName="f-curr" to="/proxy"><span>- </span>代理设备</Link></li>
                            <li><Link  activeClassName="f-curr" to="/deviceGroup"><span>- </span>设备组管理</Link></li>
                            <li><Link  activeClassName="f-curr" to="/cluster"><span>- </span>集群管理</Link></li>

                        </ul>
                    </li>
                    <li className="f-sub">
                        <a className='f-user-manage ' href='#'>账户管理 <i className='glyphicon glyphicon-menu-down'></i></a>
                        <ul className='list-unstyled f-placehold'>
                            {/*<li><a href="#"><span>- </span>账户管理</a></li>
                            <li><a href="#"><span>- </span>个人用户</a></li>*/}
                            <li><Link  activeClassName="f-curr" to="/userManagement"><span>- </span>账户管理</Link></li>
                            <li><Link  activeClassName="f-curr" to="/userPerson"><span>- </span>个人用户</Link></li>
                        </ul>
                    </li>
                    <li className="f-sub"><Link activeClassName="f-curr" className='f-oper-record' to="/operLog">操作记录</Link></li>
                    <li className="f-sub"><Link activeClassName="f-curr" className='f-task-record' to="/TaskLog">任务记录</Link></li>
                </ul>
            </div>
        )
    }
}