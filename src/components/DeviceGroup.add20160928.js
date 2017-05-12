/**
 * Created by Administrator on 2016/9/8.
 */
import React, {
    Component,
    PropTypes
} from 'react'
import { connect } from 'react-redux'
import { addTopo} from '../actions/actions'
import Topology from './DeviceGroup.Topology.js'
class AddDeviceGroup extends Component {
    constructor(state) {
        super(state);
        /*this.state = {
            topoItem:[]
        }*/
    }
    addTopoFn(){
        var topId=new Date()
        this.props.dispatch(addTopo(topId.getTime()));
        //var topoItem=this.state.topoItem;
       // this.setState({topoItem:[...topoItem,{active:false}]})
        //console.log(this.state);
    }
    render() {
        const { dispatch} = this.props
        return (
            <div className="modal fade f-modal" id='f-addGropu-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 新增设备组</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="d_add" >
                                <input type="hidden" name="_token" />
                                <div className="form-group">
                                    <label className="col-xs-3 control-label"><span className='red'>*</span> 设备组名：</label>

                                    <div className="col-xs-8">
                                        <input type="text" className="form-control deviceGroupName"  name="name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 设备组角色：</label>
                                    <div className="col-xs-8 resChosen">
                                        <select name="role" className="f-deviceType f-chosenDrop">
                                            <option value="">请选择</option>
                                            <option value="1">源站设备组</option>
                                            <option value="2">非源站设备组</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group f-sourceDevType">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 源站设备组类型：</label>
                                    <div className="col-xs-8 resChosen">
                                        <select name="source_type" className="f-deviceType" id="sourcetype">
                                            <option value="">请选择</option>
                                            <option value="1">高升源站设备组</option>
                                            <option value="2">第三方源站设备组</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-xs-3 control-label"><span className='red'>*</span> 设备选择：</label>

                                    <div className="col-xs-8 authorityPost f-usePlug">
                                        <input type="text" className="form-control f-authorityInpt" />
                                        <div className="f-authority">
                                            <div className="f-authority-head">
                                                <button type='button' className='f-btn f-checkAll'>全选</button>
                                                <button type='button' className='f-btn ml15 f-checkRev'>反选</button>
                                                <button type='button' className='f-btn ml15 f-checkClear'>清除</button>
                                                <button type="button" className="close"><span aria-hidden="true">&times;</span></button>
                                            </div>
                                            <div className="f-authority-body d_device">
                                            </div>
                                            <div className="f-authority-footer">
                                                <button type='button' className="f-btn fbtn-ok authoritySure"><span
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
                                    <div className="col-xs-10 f-customerBox">
                                        <label className="control-label textLeft f-cusNum">
                                            已选择<i>0</i>台设备：
                                        </label>

                                        <div className="clearfix f-seltCustomer">
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-xs-11">
                                    <button onClick={this.addTopoFn.bind(this)}  type='button' className="btn blue-btn">添加拓扑</button>
                                    </div>
                                </div>
                                <Topology />
                                {/*<Topology topoItem={this.state.topoItem} />*/}
                                <input name="isUse" type="hidden" />
                                <div className="form-group text-center">
                                    <div className="error"></div>
                                    <button type='submit' className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span className='fbtn-miss-svg'></span> 取消
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
function sel(state) {
    console.log(state);
    //console.log(state.todos1);
    return {item:state.topos}

}
export default connect(sel)(AddDeviceGroup)