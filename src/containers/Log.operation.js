/**
 * Created by Liang on 2016/10/10.
 */
import React from 'react'
import { render } from 'react-dom'
import SearchOperationLog from '../components/Operation.search.js'
import SearchTableOperation from '../components/Operation.list.js'
import {Datetimepicker_Start_End, button_all,validateChosen,channel,selectie,getNextTr,equalName} from  "../public/js/f.js"
export default class TaskLog extends React.Component {
    componentDidMount(){
        Datetimepicker_Start_End('#OperationLogForm','.start_form_date','.end_form_date');
        $('.ant-pagination-options').addClass('antd_pageSize');
        selectie($('select '));
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
    render(){
        return(
            <div>
                <SearchOperationLog/>
                <div className="table-box" style={{height:'auto', minHeight:'0px'}}>
                    <div className="clearfix f-gradient">
                        <div className="f-caption pull-left">
                            <ul className="list-inline">
                                <li><h4>操作记录</h4></li>
                                <li>每页显示
                                    <div className="numSelect _pagesizeReset">

                                    </div>
                                    个
                                </li>
                                <li className="f-count">共<i>2</i>条</li>
                            </ul>
                        </div>
                    </div>
                    <SearchTableOperation/>
                </div>
            </div>
        )
    }
}