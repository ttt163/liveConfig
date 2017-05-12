/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
//import { Link,IndexLink,browserHistory } from 'react-router';
export default class SearchOperationLog extends Component {
    render() {
        var data=JSON.parse(localStorage.loginInfo);
        return (
            <form  id="OperationLogForm">
                <div className="searBox">
                    <div className="col-xs-6">
                        <div className="resgrid">
                            <label style={{width:'120px'}}>操作用户:</label>
                            <div className="inpt">
                                {data.role=='管理员' ? <input type="text" className="form-control" name="name" defaultValue={''} /> : <span style={{'lineHeight':'30px'}}>{data.name}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="resgrid">
                            <label>开始时间:</label>
                            <div className="inpt input-group date start_form_date"><input type="text" className="form-control" name="start_time" readOnly /><span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span></div>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="resgrid">
                            <label>结束时间:</label>
                            <div className="inpt input-group date end_form_date"><input type="text" className="form-control" name="end_time" readOnly /><span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span></div>
                        </div>
                    </div>
                    <div className="col-xs-12 text-center">
                        <a id="searchLog" className="btn btn-submit">查询</a>
                        <a id="resetLog" className="btn btn-reset mleft">重置</a>
                    </div>
                </div>
            </form>
        )
    }
}