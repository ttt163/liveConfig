/**
 * Created by Administrator on 2016/9/8.
 */
import React, {
    Component,
    PropTypes
} from 'react'
//import UserEditForm from './User.editForm.js'
export default class serAdd extends Component {
    render() {
        return (
            <div className="modal fade f-modal" id='f-addUser-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 新增用户</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="user_add">
                                <input type="password" style={{display:'none'}} />
                                <input type="hidden" name="_token" value="" />
                                <div className="form-group">
                                    <label className="col-xs-2 control-label"><span className='red'>*</span> 账户名：</label>

                                    <div className="col-xs-9">
                                        <input type="text" className="form-control addUsername"  name="username" defaultValue={''} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-xs-2 control-label"><span className='red'>*</span> 密码：</label>

                                    <div className="col-xs-9">
                                        <input type="password" className="form-control"  name="password" id="psw" defaultValue={''} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label"><span className='red'>*</span> 重复密码：</label>

                                    <div className="col-xs-9">
                                        <input type="password" className="form-control "  name="repwd" defaultValue={''} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-xs-2 control-label-res"><span className='red'>*</span> 角色：</label>

                                    <div className="col-xs-9 f-roles f-usePlug">
                                        <div className="col-xs-3">
                                            <label>
                                                <input type="radio" className="f-chk"  name="role" defaultValue="管理员" /> 管理员
                                            </label>
                                        </div>
                                        <div className="col-xs-3">
                                            <label>
                                                <input type="radio" className="f-chk"  name="role" defaultValue="设备运维" /> 设备运维
                                            </label>
                                        </div>
                                        <div className="col-xs-3">
                                            <label>
                                                <input type="radio" className="f-chk"  name="role" defaultValue="业务运维" /> 业务运维
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label"><span className='red'>*</span> 联系人：</label>

                                    <div className="col-xs-9">
                                        <input type="text" className="form-control" name="contacter" defaultValue={""}  />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label"><span className='red'>*</span> 邮箱：</label>

                                    <div className="col-xs-9">
                                        <input type="text" className="form-control" name="email" defaultValue={""}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label"> 手机：</label>

                                    <div className="col-xs-9">
                                        <input type="text" className="form-control" name="phone" defaultValue={""} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label">QQ：</label>

                                    <div className="col-xs-9">
                                        <input type="text" className="form-control" name="qq" defaultValue={""} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label">备注：</label>

                                    <div className="col-xs-9">
                                        <textarea className='form-control' rows="3"  defaultValue={""} name="description"></textarea>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <div className="error f-pb30"></div>
                                    <button type='submit' className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span
                                        className='fbtn-miss-svg'></span> 取消
                                    </button>
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