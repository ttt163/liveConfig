import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import { Select,Tooltip  } from 'antd';
const Option = Select.Option;
import {editHls} from "../actions/clmsConfigActions.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,clearFromMsg } from "../public/js/validate/validateRform.js"
class HlsContent extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisData=channelConfig[ctype].hls;
        getArrForm(ctype+"_hlsConfig",index);
        getArrFormFields(ctype+"_hlsConfig",index,{
            "hls_path": {
                "value":_thisData[index].hls_path,
                "rule": {"required":true,"regexp":/^([\/]([\w-][\/]{0,1})+)*$/},
                "msg": {"required":"hls_path不能为空！","regexp": "不符合符合linux路径"}
            },
            "hls_fragment": {
                "value":  _thisData[index].hls_fragment,
                "rule": {"required":true,"regexp": /^[0-9]*$/},
                "msg": {"required":"hls_fragment不能为空！","regexp": "只能是整数！"}
            },
            "hls_window": {
                "value":  _thisData[index].hls_window,
                "rule": {"required":true,"regexp": /^[0-9]*$/},
                "msg": {"required":"hls_window不能为空！","regexp": "只能是整数！"}
            },
            "hls_index": {
                "value": _thisData[index].hls_index,
                "rule": {"required":true},
                "msg": {"required": "hls_index不能为空！"}
            },
            /*"custom_setting": {
                "value":_thisData[index].custom_setting,
                "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
            },*/
            "take_effect_level": {
                "value": _thisData[index].take_effect_level.length,
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
        if(!validator||!validator[`${ctype}_hlsConfig`]||!validator[`${ctype}_hlsConfig`].length){
            return
        }
        delArrFormFn(ctype+"_hlsConfig",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig[configType]);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.hls,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(item);
        var item=this.props;
        return (
            <div  style={{"display":index!=channelConfigType.currIndex?"none":"block"}} className="b-cont">
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
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHls({"enabled":val},index,configType));
                            val=="off"?clearFromMsg(configType+"_hlsConfig",index):""}} value={item.enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="支持多码率"><span>multi_bitrate</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHls({"multi_bitrate":val},index,configType))}} value={item.multi_bitrate} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="生成文件目录"><span>hls_path</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_hlsConfig"} field="hls_path" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editHls({"hls_path":e.target.value},index,configType));
                                        item.enabled=="on"?validateArrformField(configType+"_hlsConfig","hls_path",e.target.value,index):""}}
                                        onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_hlsConfig","hls_path",e.target.value,index):""}
                                        value={item.hls_path}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="切片时长"><span>hls_fragment</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_hlsConfig"} field="hls_fragment" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editHls({"hls_fragment":e.target.value},index,configType));
                                    item.enabled=="on"?validateArrformField(configType+"_hlsConfig","hls_fragment",e.target.value,index):""}} value={item.hls_fragment}
                                        onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_hlsConfig","hls_fragment",e.target.value,index):""}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="切片个数"><span>hls_window</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_hlsConfig"} field="hls_window" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editHls({"hls_window":e.target.value},index,configType));
                                    item.enabled=="on"?validateArrformField(configType+"_hlsConfig","hls_window",e.target.value,index):""}} value={item.hls_window}
                                        onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_hlsConfig","hls_window",e.target.value,index):""}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="m3u8生成位置"><span>hls_index</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_hlsConfig"} field="hls_index" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editHls({"hls_index":e.target.value},index,configType))
                                    item.enabled=="on"?validateArrformField(configType+"_hlsConfig","hls_index",e.target.value,index):""}} value={item.hls_index}
                                        onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_hlsConfig","hls_index",e.target.value,index):""}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="等待关键帧"><span>wait_key</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHls({"wait_key":val},index,configType))}}
                                    value={item.wait_key} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="音频编码格式"><span>acodec</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editHls({"acodec":val},index,configType))}}
                                    value={item.acodec} >
                                <Option value="aac">aac</Option>
                                <Option value="mp3">mp3</Option>
                                <Option value="an">an</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="视频编码格式"><span>vcodec</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHls({"vcodec":val},index,configType))}}
                                    value={item.vcodec} >
                                <Option value="avc">avc</Option>
                                <Option value="hevc">hevc</Option>
                                <Option value="vn">vn</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="ts文件名称"><span>ts_ms_name_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHls({"ts_ms_name_enabled":val},index,configType))}} value={item.ts_ms_name_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="切片引擎"><span>hls_engine</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHls({"hls_engine":val},index,configType))}}
                                    value={item.hls_engine} >
                                <Option value="old">old</Option>
                                <Option value="new">new</Option>
                                <Option value="auto">auto</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="切片时间戳矫正"><span>time_jitter</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHls({"time_jitter":val},index,configType))}} value={item.time_jitter} >
                                <Option value="off">off</Option>
                                <Option value="zero">zero</Option>
                            </Select>
                        </td>
                    </tr>

                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            <textarea onChange={(e)=>{dispatch(editHls({"custom_setting":e.target.value},index,configType));
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
        "channelConfig": state.clmsHlsConfig,
        validator: state.validator_1}
}
export default connect(sel)(HlsContent)
