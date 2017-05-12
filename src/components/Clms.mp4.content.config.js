import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import { Select ,Tooltip } from 'antd';
const Option = Select.Option;
import {editMp4} from "../actions/clmsConfigActions.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,clearFromMsg} from "../public/js/validate/validateRform.js"
class Mp4Content extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisData=channelConfig[ctype].mp4;
        getArrForm(ctype+"_mp4Config",index);
        getArrFormFields(ctype+"_mp4Config",index,{
            "mp4_path": {
                "value": _thisData[index].mp4_path,
                "rule": {"required":true,"regexp":/^([\/]([\w-][\/]{0,1})+)*$/},
                "msg": {"required":"mp4_path不能为空","regexp": "不符合符合linux路径"}
            },
            "mp4_duration": {
                "value":  _thisData[index].mp4_duration,
                "rule": {"required":true,"regexp": /^[0-9]*$/},
                "msg": {"required":"mp4_duration不能为空","regexp": "只能是整数！"}
            },
            "mp4_copy_path": {
                "value": _thisData[index].mp4_copy_path,
                "rule": {"regexp":/^([\/][\w-]+)*$/},
                "msg": {"regexp": "不符合符合linux路径"}
            },
            "mp4_file_expired": {
                "value":  _thisData[index].mp4_file_expired,
                "rule": {"required":true,"regexp": /^[0-9a-zA-Z]*$/},
                "msg": {"required":"mp4_copy_path不能为空","regexp": "只能是数字、大小写字母组成！"}
            },
           /* "custom_setting": {
                "value": _thisData[index].custom_setting,
                "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
            },*/
            "take_effect_level": {
                "value":  _thisData[index].take_effect_level.length,
                "rule": {"required":true},
                "msg": {"required": "请填写生效层级！"}
            }
        })
        //给当前显示页添加校验
    }

    componentWillUnmount() {
       // console.log("频道cont清除");
        const {index,clmsConfig,validator }=this.props;
        var ctype=clmsConfig.configType;
       // console.log(validator[`${ctype}_channelConfig`]);
        //console.log(`${ctype}_channelConfig`);
        if(!validator||!validator[`${ctype}_mp4Config`]||!validator[`${ctype}_mp4Config`].length){
            return
        }
        delArrFormFn(ctype+"_mp4Config",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.mp4,
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
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editMp4({"enabled":val},index,configType))
                            val=="off"?clearFromMsg(configType+"_mp4Config",index):""}} value={item.enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="录制保存路径"><span>mp4_path</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_mp4Config"} field="mp4_path" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onBlur={(e)=>item.enabled=="off"?"":validateArrformField(configType+"_mp4Config","mp4_path",e.target.value,index)}
                                        onChange={(e)=>{dispatch(editMp4({"mp4_path":e.target.value},index,configType));
                                        item.enabled=="off"?"":validateArrformField(configType+"_mp4Config","mp4_path",e.target.value,index)}} value={item.mp4_path}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="录制方式"><span>mp4_plan</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editMp4({"mp4_plan":val},index,configType))}} value={item.mp4_plan} >
                                <Option value="session">session</Option>
                                <Option value="segment">segment</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="录制切片时长"><span>mp4_duration</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_mp4Config"} field="mp4_duration" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onBlur={(e)=>item.enabled=="off"?"":validateArrformField(configType+"_mp4Config","mp4_duration",e.target.value,index)}
                                        onChange={(e)=>{dispatch(editMp4({"mp4_duration":e.target.value},index,configType));
                                   item.enabled=="off"?"":validateArrformField(configType+"_mp4Config","mp4_duration",e.target.value,index)}} value={item.mp4_duration}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="等待关键帧生成片"><span>mp4_wait_keyframe</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editMp4({"mp4_wait_keyframe":val},index,configType))}}
                                    value={item.mp4_wait_keyframe} >
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
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editMp4({"time_jitter":val},index,configType))}} value={item.time_jitter} >
                                <Option value="off">off</Option>
                                <Option value="zero">zero</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="文件过期时间"><span>mp4_file_expired</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_mp4Config"} field="mp4_file_expired" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onBlur={(e)=>item.enabled=="off"?"":validateArrformField(configType+"_mp4Config","mp4_file_expired",e.target.value,index)}
                                        onChange={(e)=>{dispatch(editMp4({"mp4_file_expired":e.target.value},index,configType));
                                    item.enabled=="off"?"":validateArrformField(configType+"_mp4Config","mp4_file_expired",e.target.value,index)}} value={item.mp4_file_expired}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="文件多点存储开关"><span>mp4_copy_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editMp4({"mp4_copy_enabled":val},index,configType))}} value={item.mp4_copy_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="文件多点存储路径"><span>mp4_copy_path</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_mp4Config"} field="mp4_copy_path" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onBlur={(e)=>item.enabled=="off"?"":validateArrformField(configType+"_mp4Config","mp4_copy_path",e.target.value,index)}
                                        onChange={(e)=>{dispatch(editMp4({"mp4_copy_path":e.target.value},index,configType));
                                     item.enabled=="off"?"":validateArrformField(configType+"_mp4Config","mp4_copy_path",e.target.value,index)}} value={item.mp4_copy_path}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>

                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            {/*<ValidateItem validator={validator} thisForm={configType+"_mp4Config"} field="custom_setting" formType="arr" formIndex={index}>
                               <textarea onChange={(e)=>{dispatch(editMp4({"custom_setting":e.target.value},index,configType));
                            validateArrformField(configType+"_mp4Config","custom_setting",e.target.value,index)}}
                                         value={item.custom_setting} className="form-control" rows="3"></textarea>
                            </ValidateItem>*/}
                            <textarea onChange={(e)=>{dispatch(editMp4({"custom_setting":e.target.value},index,configType))}}
                                      value={item.custom_setting} className="form-control" rows="3"></textarea>

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
        "channelConfig": state.clmsMp4Config,
        validator: state.validator_1}
}
export default connect(sel)(Mp4Content)
