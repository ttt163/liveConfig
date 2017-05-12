/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
export default class EditDeviceGroup extends Component {
    render() {
        return (
            <div className="modal fade f-modal" id='f-editGropu-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 修改设备组</h4>
                        </div>
                        <div className="f-modal-body " id="d_show">
                            <form className="form-horizontal f-form-horizontal" id="d_edit">
                                <input type="hidden" name="_token" />
                                <input type="hidden" name="id" />
                                <div className="form-group">
                                    <label className="col-xs-3 control-label"><span className='red'>*</span> 设备组名：</label>
                                    <div className="col-xs-8">
                                        <input type="text" className="form-control "  name="name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 设备组角色：</label>
                                    <div className="col-xs-8 resChosen">
                                        <select name="role" className="f-deviceType  f-chosenDrop">
                                            <option value="">请选择</option>
                                            <option value="1">源站设备组</option>
                                            <option value="2">非源站设备组</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group f-sourceDevType">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 源站设备组类型：</label>
                                    <div className="col-xs-8 resChosen">
                                        <select name="source_type" className="f-deviceType" id="editsourcetype">
                                            <option value="">请选择</option>
                                            <option value="1">高升源站设备组</option>
                                            <option value="2">第三方源站设备组</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-3 control-label"><span className='red'>*</span> 设备：</label>

                                    <div className="col-xs-8 authorityPost f-usePlug">
                                        <input type="text" className="form-control f-authorityInpt" />

                                        <div className="f-authority">
                                            <div className="f-authority-head">
                                                <button type='button' className='f-btn f-checkAll'>全选</button>
                                                <button type='button' className='f-btn ml15 f-checkRev'>反选</button>
                                                <button type='button' className='f-btn ml15 f-checkClear'>清除</button>
                                                <button type="button" className="close"><span aria-hidden="true">&times;</span></button>
                                            </div>
                                            <div className="f-authority-body">

                                            </div>
                                            <div className="f-authority-footer">
                                                <button type='button' className="f-btn fbtn-okbat authoritySure"><span
                                                    className='fbtn-ok-svg'></span> 确定
                                                </button>
                                                <button type='button' className="f-btn fbtn-miss ml15 authorityClose"><span
                                                    className='fbtn-miss-svg'></span> 取消
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-10 f-customerBox f-inputs">
                                        <label className="control-label textLeft f-cusNum">
                                            已选择<i>0</i>台设备：
                                        </label>

                                        <div className="clearfix f-seltCustomer">

                                        </div>
                                    </div>
                                </div>


                                <div className="form-group text-center">
                                    <input name="isUse" type="hidden" />
                                    <input name="oldUse" type="hidden" />
                                    <div className="error"></div>
                                    <input type="hidden" name="useByChannel" />
                                    <button type='button' className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span className='fbtn-miss-svg'></span> 取消
                                    </button>
                                </div>
                                <div id="d_edit_json" style={{display:'none'}}></div>
                                <input type="hidden" name="add" value="[]"/>
                                <input type="hidden" name="inc" value="[]"/>
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