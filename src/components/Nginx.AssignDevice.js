import React, {Component,PropTypes} from 'react'
//import { Link,IndexLink,browserHistory } from 'react-router';
export default class NginxAssignDev extends Component {
    render() {
        return (
            <div className="modal fade f-modal" id='f-assignDev-modal'>
                <div className="modal-dialog" style={{'minWidth':'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 重新下发</h4>
                        </div>
                        <div className="f-modal-body" style={{'minHeight':'300px'}}>
                            <form className="form-horizontal f-form-horizontal" id="d_add" >
                                    <div className="form-group">
                                        <div className="col-xs-10 f-customerBox" style={{'minHeight':'200px'}}  >
                                            <label className="control-label textLeft f-cusNum">
                                                共<i>0</i>台设备：
                                            </label>

                                            <div className="clearfix f-seltCustomer d_device">
                                            </div>
                                        </div>
                                    </div>
                                    <input id="dev_channel" type="hidden"/>
                                    <input id="send_type" type="hidden"/>
                                        <div className="form-group text-center" style={{'marginTop':'37px'}}>
                                            <div className="error"></div>
                                            <button type='button' className="f-btn fbtn-ok dev_submit"><span className='fbtn-ok-svg'></span> 确认</button>
                                            <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span className='fbtn-miss-svg'></span> 取消</button>
                                        </div>
                            </form>
                        </div>
                        <div className="f-modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}