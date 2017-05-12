import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import { Select,Tooltip  } from 'antd';
const Option = Select.Option;
import {editFlv} from "../actions/clmsConfigActions.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,clearFromMsg} from "../public/js/validate/validateRform.js"
class FlvContent extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisData=channelConfig[ctype].flv;
        getArrForm(ctype+"_flvConfig",index);
        getArrFormFields(ctype+"_flvConfig",index,{
            "dvr_path": {
                "value": _thisData[index].dvr_path,
                "rule": {"required":true,"regexp":/^([\/]([\w-][\/]{0,1})+)*$/},
                "msg": {"required":"dvr_path不能为空！","regexp": "不符合符合linux路径"}
            },
            "dvr_duration": {
                "value":  _thisData[index].dvr_duration,
                "rule": {"required":true,"regexp": /^[0-9]*$/},
                "msg": {"required":"dvr_duration不能为空","regexp": "只能是整数！"}
            },
           /* "custom_setting": {
                "value":_thisData[index].custom_setting,
                "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
            },*/
            "take_effect_level": {
                "value": _thisData[index].take_effect_level.length,
                "rule": {"required":true},
                "msg": {"required": "请填写生效层级！"}
            }

        });
        //给当前显示页添加校验
    }

    componentWillUnmount() {
       // console.log("频道cont清除");
        const {index,clmsConfig,validator }=this.props;
        var ctype=clmsConfig.configType;
       // console.log(validator[`${ctype}_channelConfig`]);
        //console.log(`${ctype}_channelConfig`);
        if(!validator||!validator[`${ctype}_flvConfig`]||!validator[`${ctype}_flvConfig`].length){
            return
        }
        delArrFormFn(ctype+"_flvConfig",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.flv,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(item);
        var item=this.props;
        return (
            <div style={{"display":index!=channelConfigType.currIndex?"none":"block"}} className="b-cont">
                <table className="table table-bordered config-table">
                    <thead >
                    <tr>
                        <th style={{"width":"30%"}}>配置项</th>
                        <th style={{"width":"70%"}}>配置内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="功能开关"><span>enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editFlv({"enabled":val},index,configType))
                            val=="off"?clearFromMsg(configType+"_flvConfig",index):""
                            }} value={item.enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="录制目录"><span>dvr_path</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_flvConfig"} field="dvr_path" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editFlv({"dvr_path":e.target.value},index,configType));
                                    item.enabled=="on"?validateArrformField(configType+"_flvConfig","dvr_path",e.target.value,index):""
                                    }}
                                        onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_flvConfig","dvr_path",e.target.value,index):""}
                                        value={item.dvr_path}
                                    />
                            </ValidateItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="录制方式"><span>dvr_plan</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editFlv({"dvr_plan":val},index,configType))}} value={item.dvr_plan} >
                                <Option value="session">session</Option>
                                <Option value="segment">segment</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="录制切片时长"><span>dvr_duration</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_flvConfig"} field="dvr_duration" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editFlv({"dvr_duration":e.target.value},index,configType));
                                    item.enabled=="on"?validateArrformField(configType+"_flvConfig","dvr_duration",e.target.value,index):""
                                    }}
                                        onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_flvConfig","dvr_duration",e.target.value,index):""}
                                        value={item.dvr_duration}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="等待关键帧录制"><span>dvr_wait_keyframe</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editFlv({"dvr_wait_keyframe":val},index,configType))}} value={item.dvr_wait_keyframe} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="时间戳校验"><span>time_jitter</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editFlv({"time_jitter":val},index,configType))}} value={item.time_jitter} >
                                <Option value="off">off</Option>
                                <Option value="zero">zero</Option>
                            </Select>
                        </td>
                    </tr>

                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            <textarea onChange={(e)=>{dispatch(editFlv({"custom_setting":e.target.value},index,configType));
                            }} value={item.custom_setting} className="form-control" rows="3"></textarea>

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
function sel(state) {
   // console.log(state);
    return {
        "clmsConfig": state.clmsConfig,
        "channelConfig": state.clmsFlvConfig,
        validator: state.validator_1}
}
export default connect(sel)(FlvContent)
