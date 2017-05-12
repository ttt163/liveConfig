
import React from 'react'
import { render } from 'react-dom'
//import {selectie,validateChosen,formCheck,ShowDiag,alertMsg} from  "../public/js/f.js"
//import UserInfo from '../components/User.Info.js'
export default class DevLog extends React.Component {
    constructor(state) {
        super(state);
    }
    componentDidMount(){}
    render() {
        return(
            <div>
                <div className="table-box ">
                    <div className="clearfix f-gradient">
                        <div className="f-caption pull-left">
                            <ul className="list-inline">
                                <li><h4>设备记录</h4></li>
                                <li className="f-count">共<i>2</i>条</li>
                                <li>每页显示
                                    <div className="numSelect">
                                        <select name="pageSize" id="pageSize">
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>
                                    </div>
                                    个
                                </li>
                            </ul>
                        </div>
                    </div>
                    <table className="table f-table  pf">
                        <thead>
                        <tr>
                            <th style={{width:'200px'}}>用户名</th>
                            <th >操作记录</th>
                            <th style={{width:'200px'}}>操作时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>admin</td>
                            <td style={{textAlign:'left'}}>登陆</td>
                            <td>2016-09-21 14:12:17</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}

