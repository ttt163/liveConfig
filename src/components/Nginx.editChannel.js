import React, {Component,PropTypes} from 'react'
//import { Link,IndexLink,browserHistory } from 'react-router';
export default class NginxEdit extends Component {
    render() {
        return (
            <div className="modal fade f-modal resChosen" id='f-editChannel-modal' data-id="0">
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 编辑频道</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="Channel_edit">
                                <input type="hidden" name="channel_id" value="" />
                                <div className="form-group">
                                    <label  className="col-xs-2 control-label"><span className='red'>*</span> 客户名称：</label>
                                    <div className="col-xs-9">
                                        <input className="form-control"  type="text"  name="customer"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-2 control-label"> 频道：</label>
                                    <div className="col-xs-9">
                                      {/*  <input className="form-control" name="channel" type="text"/>*/}
                                        <span name="channel" style={{lineHeight:'32px'}}></span>
                                    </div>
                                    {/*<label className="control-label textLeft f-cnladd ">
                                        <span className="glyphicon glyphicon-plus f-cnladdBtn"></span>
                                    </label>*/}
                                </div>

                                <div className="form-group text-center">
                                    <div className="error"></div>
                                    <button type='submit' className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
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