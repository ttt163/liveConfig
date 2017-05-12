import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL,CHANNNEL,ORIGIN,HTTP,FLV,HLS,HTTPTS,MP4,IPLIST,HTTPHOOKS,PRINT,REFER,IPCONFIGINFO,CONFIGDEFAULTDATA } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
//import {getForm,getFields,getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import { Select,Tooltip } from 'antd';
const Option = Select.Option;
import {addConfigChannData,delChannelData,addChannelData,editChannel,changeLevel,
    addConfigData,addConfigOriginData,addConfigHttpServiceData,addConfigFlvData,addConfigHlsData,
    addConfigHttpTsData,addConfigMp4Data,addConfigIpListData,addConfigPrintData,addConfigReferData,addConfigHttpHookData} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import {getTopoDatas,formatGetTopoData} from "../containers/DeviceGroup.js"
import {geteLeves} from "./Clms.config.js"
import {getForm,getFields,getFormFields,clearFormData,delFormsFn,clearArrFormFn,getKeyField,getArrForm,getArrFormFields,validateArrformField,delArrFormFn} from "../public/js/validate/validateRform.js"
class ChannelContent extends Component {
    //componentDidUpdate(){
    //    console.log("更新后渲染");
    //}
    //shouldComponentUpdate(nextProps){
    //    console.log("是否更新");
    //    console.log(nextProps);
    //    console.log(this.props);
    //    return true;
    //}
    componentDidMount() {
        /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype = clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisChannelData = channelConfig[ctype].channel;
        //var _thisChannelData=channelConfig[ctype].channel;
        for (var i = 0; i < _thisChannelData.length; i++) {
            getArrForm(ctype + "_channelConfig", i);
            getArrFormFields(ctype + "_channelConfig", i, {
                "listen": {
                    "value":_thisChannelData[i].listen,
                    "rule": {"required":true,"regexp": /^[0-9]*$/},
                    "msg": {"required":"listen不能为空！","regexp": "只能是整数"}
                },
                "queue_length": {
                    "value": _thisChannelData[i].queue_length,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "queue_length不能为空", "regexp": "只能是整数"}
                },
                "chunk_size": {
                    "value": _thisChannelData[i].chunk_size,
                    "rule": {"regexp": /^[0-9]*$/},
                    "msg": { "regexp": "只能是整数"}
                },
                "stream_timeout": {
                    "value": _thisChannelData[i].stream_timeout,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "stream_timeout不能为空！", "regexp": "只能是整数"}
                },
                /*"custom_setting": {
                    "value": _thisChannelData[i].custom_setting,
                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                },*/
                "take_effect_level": {
                    "value": _thisChannelData[i].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }

            });
        }
        // for(var i=0;i<_thisChannelData.length;i++){
        /*  getArrForm(ctype+"_channelConfig",index);
         getArrFormFields(ctype+"_channelConfig",index,{
         "queue_length": {
         "value": _thisChannelData[index].queue_length,
         "rule": {"regexp": /^[0-9]*$/},
         "msg": {"regexp": "只能是整数"}
         },
         "chunk_size": {
         "value": _thisChannelData[index].chunk_size,
         "rule": {"regexp": /^[0-9]*$/},
         "msg": {"regexp": "只能是整数"}
         },
         "stream_timeout": {
         "value": _thisChannelData[index].stream_timeout,
         "rule": {"regexp": /^[0-9]*$/},
         "msg": {"regexp": "只能是整数"}
         },
         "custom_setting": {
         "value": _thisChannelData[index].custom_setting,
         "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
         "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
         },
         "take_effect_level": {
         "value": _thisChannelData[index].take_effect_level.length,
         "rule": {"required":true},
         "msg": {"required": "请填写生效层级！"}
         }

         });*/
        //}
        //给当前显示页添加校验
    }

    componentWillUnmount() {
        // console.log("频道cont清除");
        const {index,clmsConfig,validator }=this.props;
        var ctype = clmsConfig.configType;
        // console.log(validator[`${ctype}_channelConfig`]);
        //console.log(`${ctype}_channelConfig`);
        if (!validator || !validator[`${ctype}_channelConfig`] || !validator[`${ctype}_channelConfig`].length) {
            return
        }
        delArrFormFn(ctype + "_channelConfig", index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType = clmsConfig.configType,
            channelConfigType = channelConfig[configType],
            channelData = channelConfigType.channel,
            currConfig = channelData[channelConfigType.currIndex];
        //console.log(item);
        var item = this.props;
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
                            <Tooltip placement="top" title="频道端口"><span>listen</span></Tooltip>
                        </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_channelConfig"} field="listen" formType="arr" formIndex={index}>
                                <input className="form-control"
                                       onChange={(e)=>{dispatch(editChannel({"listen":e.target.value},index,configType));
                                    validateArrformField(configType+"_channelConfig","listen",e.target.value,index)
                                    }} value={item.listen}/>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="数据阻塞等待"><span>queue_wait_key</span></Tooltip>
                        </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editChannel({"queue_wait_key":val},index,configType))}}
                                    value={item.queue_wait_key}>
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="保留数据时长"><span>queue_length</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_channelConfig"}
                                          field="queue_length" formType="arr" formIndex={index}>
                                <input className="form-control"
                                       onChange={(e)=>{dispatch(editChannel({"queue_length":e.target.value},index,configType));validateArrformField(configType+"_channelConfig","queue_length",e.target.value,index)}}
                                       value={item.queue_length}
                                    />
                            </ValidateItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="fast_gop"><span>fast_gop</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editChannel({"fast_gop":val},index,configType))}}
                                    value={item.fast_gop}>
                                <Option value="off">off</Option>
                                <Option value="on">on</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="chunk块大小"><span>chunk_size</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_channelConfig"}
                                          field="chunk_size" formType="arr" formIndex={index}>
                                <input className="form-control"
                                       onChange={(e)=>{dispatch(editChannel({"chunk_size":e.target.value},index,configType));
                                    validateArrformField(configType+"_channelConfig","chunk_size",e.target.value,index)
                                    }} value={item.chunk_size}/>
                            </ValidateItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="hdl功能开关"><span>hdl</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editChannel({"hdl":val},index,configType))}}
                                    value={item.hdl}>
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="缓存关键帧间数据"><span>gop_cache</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editChannel({"gop_cache":val},index,configType))}}
                                    value={item.gop_cache}>
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="播放开始时间"><span>time_jitter</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editChannel({"time_jitter":val},index,configType))}}
                                    value={item.time_jitter}>
                                <Option value="off">off</Option>
                                <Option value="zero">zero</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="超时时间（s）"><span>stream_timeout</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_channelConfig"}
                                          field="stream_timeout" formType="arr" formIndex={index}>
                                <input onChange={(e)=>{dispatch(editChannel({"stream_timeout":e.target.value},index,configType));
                            validateArrformField(configType+"_channelConfig","stream_timeout",e.target.value,index)
                            }} value={item.stream_timeout} className="form-control"/>
                            </ValidateItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="播放内部缓存区"><span>player_buffer_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editChannel({"player_buffer_enabled":val},index,configType))}}
                                    value={item.player_buffer_enabled}>
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="时间戳双轴检测"><span>check_stream_timestamp</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editChannel({"check_stream_timestamp":val},index,configType))}}
                                    value={item.check_stream_timestamp}>
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            <textarea onChange={(e)=>{dispatch(editChannel({"custom_setting":e.target.value},index,configType));
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
        "channelConfig": state.clmsChannelConfig,
        validator: state.validator_1
    }
}
export default connect(sel)(ChannelContent)
ChannelContent.contextTypes = {
    router: PropTypes.object
}