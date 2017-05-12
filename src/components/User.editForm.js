/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
export default class UserEditForm extends Component {

    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="col-xs-2 control-label"> 账户名：</label>
                    <label className="col-xs-9 control-label textLeft account"></label>
                </div>
                <div className="form-group">
                    <label className="col-xs-2 control-label"> 角色：</label>
                    <label className="col-xs-9 control-label textLeft role"></label>
                </div>
                <div className="form-group">
                    <label className="col-xs-2 control-label"><span className='red'>*</span> 联系人：</label>
                    {
                        this.props.role=="manage"?
                            <div className="col-xs-9">
                                <input type="text" className="form-control concat" name="contacter"  />
                            </div>
                            :
                            <label className="col-xs-9 control-label textLeft concat"></label>
                    }
                </div>
                <div className="form-group">
                    <label className="col-xs-2 control-label"><span className='red'>*</span> 邮箱：</label>

                    <div className="col-xs-9">
                        <input type="text" className="form-control" name="email"  />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-2 control-label"> 手机：</label>
                    <div className="col-xs-9">
                        <input type="text" className="form-control" name="phone" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-2 control-label">QQ：</label>

                    <div className="col-xs-9">
                        <input type="text" className="form-control" name="qq" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-2 control-label">备注：</label>

                    <div className="col-xs-9">
                        <textarea className='form-control' rows="3" name="description"></textarea>
                    </div>
                </div>
                <div className="form-group text-center">
                    <div className="error f-pb30"></div>
                    <button type='submit' className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span className='fbtn-miss-svg'></span> 取消
                    </button>
                </div>
            </div>
        )
    }
}