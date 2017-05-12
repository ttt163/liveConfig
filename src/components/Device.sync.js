/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
//import { Link,IndexLink,browserHistory } from 'react-router';
export default class DeviceSync extends Component {
    render() {
        return (
            <div className="modal fade f-modal resChosen" id='f-syncDevice-modal' data-id="0">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 同步设备</h4>
                        </div>
                        <div className="f-modal-body">
                            <div className="row">
                                <div className="col-xs-10 ">新添加X台设备，设备列表如下:</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-10 col-xs-offset-1 ">
                                    <ul className="dev-list">
                                        <li>设备a</li>
                                        <li>设备aa</li>
                                        <li>设备b</li>
                                        <li>设备c</li>
                                        <li>设备d</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="f-modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}