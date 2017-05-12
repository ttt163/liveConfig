
import React, {Component,PropTypes} from 'react'
import {devsOpction} from "./Device.searchList.js"
import { connect } from 'react-redux'
//import { Link,IndexLink,browserHistory } from 'react-router';
import { addDevice} from '../actions/actions'
import { Select } from 'antd';
import {ShowDiag,addOperation} from  "../public/js/f.js";
import { URL} from '../config.js';
const Option = Select.Option;
import ValidateItem from "./Validate.item.js"
import {validateField,validateAllFields} from "../public/js/validate/validateRform.js"
class DeviceRepeat extends Component {
    changeDev(val){
        //&dev&
        var reptId=val.substring(0,val.indexOf("&dev&")),reptName=val.substring(val.lastIndexOf("&dev&")+5),data={"reptId":reptId,"reptName":reptName};
        const {dispatch}=this.props;
        //console.log(data);
        dispatch(addDevice({"reptDev":data}))
    }
    submitReplaceDev(){
        //const {devices}=this.props;
        const {devices,search,getDevData}=this.props;
        if(!validateAllFields("repDevice")){
            return;
        }
       /* var reData={
            "src_dev_id": devices._id,
            "dst_dev_id": devices.reptDev.reptId,
        }*/
        var reData={
            "dst_dev_id": devices._id,
            "src_dev_id": devices.reptDev.reptId
        }
        $.ajax({
            url: `${URL}/ReplaceDevConfig`,
            type: 'post',
            data: JSON.stringify(reData),
            //data: JSON.stringify({"devs_group_id": '58008b3d421aa91b18000009'}),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'操作失败！':data.info.warning,
                    closetime: 2
                });
            },
            success: function (data) {
                //console.log(data);
                if (data.info.status == "success") {
                    new ShowDiag({
                        msg: '替换成功！',
                        closetime: 1
                    });
                    $("#f-repeatDevice-modal").modal('hide');
                    getDevData(search);
                    addOperation(`替换设备${devices.name}`);
                }else{
                    new ShowDiag({
                        msg: !data.info.warning?'替换失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        });
    }
    render() {
        const {devices,dispatch,validator}=this.props;
        //console.log(devsOpction);
        return (
            <div className="modal fade f-modal resChosen" id='f-repeatDevice-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 替换配置</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="replacedev">
                                <div className="form-group">
                                    <div className="col-xs-offset-1 col-xs-10">
                                        <table className="table f-table">
                                            <thead>
                                            <tr>
                                                <th style={{width:'50%'}}>替换前设备</th>
                                                <th style={{width:'50%'}}>替换后设备</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{devices.name}</td>
                                                <td style={{textAlign:"left"}}>
                                                    <ValidateItem validator={validator} thisForm="repDevice" field="reptName">
                                                        <Select
                                                            showSearch
                                                            style={{ width: '300px' }}
                                                            placeholder="请选择"
                                                            optionFilterProp="children"
                                                            notFoundContent="无搜索结果！"
                                                            value={devices.reptDev&&devices.reptDev.reptId&&devices.reptDev.reptName?devices.reptDev.reptId+"&dev&"+devices.reptDev.reptName:""}
                                                            onChange={(val)=>{this.changeDev(val);validateField("repDevice","reptName",val);}}
                                                            >
                                                            {devsOpction}
                                                        </Select>
                                                    </ValidateItem>

                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div style={{display:'none'}} id="use_device"></div>
                                <div className="form-group text-center">
                                    <div className="error"></div>
                                    <input type="hidden" name="useByChannel" />
                                    <button type='button' onClick={()=>this.submitReplaceDev()} className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span
                                        className='fbtn-miss-svg'></span> 取消
                                    </button>
                                </div>
                                <input type="hidden" name="data" />
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
    //console.log(state);
    //console.log(state.todos1);
    return {devices:state.devices,search: state.devicesList.search,validator:state.validator_1}
}
export default connect(sel)(DeviceRepeat)