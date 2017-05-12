/**
 * Created by Administrator on 2016/9/7.
 */
import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory,IndexRoute,browserHistory } from 'react-router';
import App from './containers/App'
import Device from './containers/Device.js'
import Cluster from './containers/Cluster.js'
import DeviceGroup from './containers/DeviceGroup.js'
import UserManagement from './containers/User.management.js'
import UserPerson from './containers/User.person.js'
import Login from './containers/Login.js'
import OperLog from './containers/Log.operation.js'
import Clms from './containers/Clms.js'
import Nginx from './containers/Nginx.js'
import NginxConfig from './containers/Nginx.Configure.js'
import TaskLog from './containers/TaskLog.js'
import ClmsConfig from "./components/Clms.config.js"
import Proxy from "./containers/Proxy.js"
import {store} from './allStore.js'
let rootElement = document.getElementById('app')

render(
    <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Clms}/>
            <Route path="/device" component={Device}/>
            <Route path="/proxy" component={Proxy}/>
            <Route path="/cluster" component={Cluster}/>
            <Route path="/deviceGroup" component={DeviceGroup}/>
            <Route path="/userManagement" component={UserManagement}/>
            <Route path="/userPerson" component={UserPerson}/>
            <Route path="/operLog" component={OperLog}/>
            <Route path="/clms" components={Clms}></Route>
            <Route path="/nginx" components={Nginx}/>
            <Route path="/nginxConfig" components={NginxConfig}/>
            <Route path="/TaskLog" components={TaskLog}/>
            <Route path="/clms/clmsConfig(/:id)(/:type)" components={ClmsConfig}/>
        </Route>
        <Route path="/login" component={Login}/>
    </Router>
    </Provider>,
    rootElement
)
