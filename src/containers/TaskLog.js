/**
 * Created by Liang on 2016/10/10.
 */
import React from 'react'
import { render } from 'react-dom'
import SearchTaskLog from '../components/TaskLog.search.js'
import SearchTableTaskLog from '../components/TaskLog.searchTable.js'
import NginxAssignDev from '../components/Nginx.AssignDevice.js'
import NginxChannelList from '../components/Nginx.ChannelList.js'
import {Datetimepicker_Start_End, button_all,validateChosen,channel,selectie,getNextTr,equalName,alertMsg} from  "../public/js/f.js"
export default class TaskLog extends React.Component {
    componentDidMount(){
        Datetimepicker_Start_End('#TaskLogForm','.start_form_date','.end_form_date');
        $('.ant-pagination-options').addClass('antd_pageSize');
        selectie($('select '));
        $('#TaskReset').on('click',function(){
            $('#TaskLogForm').find('select').val('');
            $('#TaskLogForm').find('input').val('');
            $('#TaskLogForm').find('select').trigger('chosen:updated');
        });
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
            }else if(data.role=='业务运维'){
                window.location.href='#/'
            }
        }
    }
    render(){
        return(
            <div>
                <SearchTaskLog/>
                <div className="table-box" style={{height:'auto', minHeight:'0px'}}>
                    <div className="clearfix f-gradient">
                        <div className="f-caption pull-left">
                            <ul className="list-inline">
                                <li><h4>任务记录</h4></li>
                                <li>每页显示
                                    <div className="numSelect _pagesizeReset">

                                    </div>
                                    个
                                </li>
                                <li className="f-count">共<i>2</i>条</li>
                            </ul>
                        </div>
                        <div className="pull-right">
                            <button type="button" className="btn  btn-small" id="ReSend">重新下发</button>
                        </div>
                    </div>
                    <SearchTableTaskLog/>
                    <NginxAssignDev/>
                    <NginxChannelList/>
                </div>
            </div>
        )
    }
}