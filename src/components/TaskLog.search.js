/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
//import { Link,IndexLink,browserHistory } from 'react-router';
export default class SearchTaskLog extends Component {
    render() {
        return (
            <form id="TaskLogForm">
                <div className="searBox">
                    <div className="col-xs-6">
                        <div className="resgrid">
                            <label style={{width:'120px'}}>设备/设备组/集群:</label>
                            <div className="inpt"><input type="text" className="form-control" name="resName" defaultValue={''} /></div>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="resgrid">
                            <label>开始时间:</label>
                            <div className="inpt input-group date start_form_date"><input type="text" className="form-control " name="startTime" readOnly /><span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span></div>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="resgrid">
                            <label>结束时间:</label>
                            <div className="inpt input-group date end_form_date"><input type="text" className="form-control " name="endTime" readOnly /><span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span></div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="resgrid">
                            <label  style={{width:'120px'}}>下发状态:</label>
                            <div className="inpt resChosen">
                                <select name="sendStatus" className="form-control searchdrop">
                                    <option value="">请选择</option>
                                    <option value="0">失败</option>
                                    <option value="1">成功</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="resgrid">
                            <label>任务类型:</label>
                            <div className="inpt resChosen">
                                <select name="taskType" className="form-control searchdrop" defaultValue={''}>
                                    <option value="">请选择</option>
                                    <option value="1">设备</option>
                                    <option value="2">设备组</option>
                                    <option value="3">集群</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 text-center">
                        <a  className="btn btn-submit" id="TaskSearch">查询</a>
                        <a  className="btn btn-reset mleft" id="TaskReset">重置</a>
                    </div>
                </div>
            </form>
        )
    }
}