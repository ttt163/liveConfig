import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import {PANURL} from '../config.js';
//import {ShowDiag} from  "../public/js/f.js"
//import {getForm,getFields,getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import { Select,Tooltip  } from 'antd';
const Option = Select.Option;
import {editOrigin} from "../actions/clmsConfigActions.js"
//import EffectLevel from "./Clms.config.effectLevel.js"
//import ConfigTab from "./Clms.config.tab.js"
//import {getTopoDatas,formatGetTopoData} from "../containers/DeviceGroup.js"
//import {geteLeves} from "./Clms.config.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,editArrformFieldMsg} from "../public/js/validate/validateRform.js"
class OriginContent extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisData=channelConfig[ctype].origin;
       // for(var i=0;i<_thisChannelData.length;i++){
        getArrForm(ctype+"_orginConfig",index);
        getArrFormFields(ctype+"_orginConfig",index,{
            "listen": {
                "value": _thisData[index].listen,
                "rule": {"required":true,"regexp": /^[0-9]*$/},
                "msg": {"required":"listen不能为空！","regexp": "只能是整数"}
            },
            "interface": {
                "value": _thisData[index].interface,
                "rule": {"required":true,"regexp": PANURL},
                //"rule": {"required":true,"regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                "msg": {"required":"interface不能为空","regexp": "格式错误，不符合url规则！"}
            },
            "server_key": {
                "value": _thisData[index].server_key,
                "rule": {"regexp": /^(\-|\+)?\d+(\.\d+)?$/},
                "msg": {"regexp": "格式错误，只能是数字！"}
            },
            "hash_str": {
                "value": _thisData[index].hash_str,
                "rule": {"regexp": /^[A-Za-z\$]+$/},
                "msg": {"regexp": "格式错误，只能由英文字母以及“$”组成！"}
            },
            "upnode_vhost": {
                "value": _thisData[index].upnode_vhost,
                "rule": {"regexp": PANURL},
        // "rule": {"regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                "msg": {"regexp": "格式错误，不符合url规则！"}
            },
            "backsource_timeout": {
                "value": _thisData[index].backsource_timeout,
                "rule": {"required":true,"regexp": /^[0-9]*$/},
                "msg": {"required":"backsource_timeout不能为空！","regexp": "格式错误，只能是整数！"}
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

        });
        //}
        //给当前显示页添加校验
    }

    componentWillUnmount() {
        const {index,clmsConfig,validator }=this.props;
        var ctype=clmsConfig.configType;
       // console.log(validator[`${ctype}_channelConfig`]);
        //console.log(`${ctype}_channelConfig`);
        if(!validator||!validator[`${ctype}_orginConfig`]||!validator[`${ctype}_orginConfig`].length){
            return
        }
        delArrFormFn(ctype+"_orginConfig",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.origin,
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
                            <Tooltip placement="top" title="回源端口"><span>listen</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_orginConfig"} field="listen" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editOrigin({"listen":e.target.value},index,configType));
                                        validateArrformField(configType+"_orginConfig","listen",e.target.value,index)}} value={item.listen}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="mode"><span>mode</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editOrigin({"mode":val},index,configType));
                             val=="local"?editArrformFieldMsg(configType+"_orginConfig","interface",index,{"isValider":true,"error":""}):""}} value={item.mode} >
                                <Option value="local">local</Option>
                                <Option value="server">server</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="回源信息获取接口"><span>interface</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_orginConfig"} field="interface" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onBlur={(e)=>item.mode=="server"? validateArrformField(configType+"_orginConfig","interface",e.target.value,index):
                                        ""}
                                        onChange={(e)=>{dispatch(editOrigin({"interface":e.target.value},index,configType));
                                        item.mode=="server"? validateArrformField(configType+"_orginConfig","interface",e.target.value,index):""
                                    }}
                                        value={item.interface}/>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="回源信息更改标记位"><span>server_key</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_orginConfig"} field="server_key" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editOrigin({"server_key":e.target.value},index,configType));
                                    validateArrformField(configType+"_orginConfig","server_key",e.target.value,index)
                                    }}
                                        value={item.server_key}/>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="回源方式"><span>type</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editOrigin({"type":val},index,configType))}} value={item.type} >
                                <Option value="rtpm">rtpm</Option>
                                <Option value="flv">flv</Option>
                                <Option value="ts">ts</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="转换域名"><span>upnode_vhost</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_orginConfig"} field="upnode_vhost" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editOrigin({"upnode_vhost":e.target.value},index,configType));
                                    validateArrformField(configType+"_orginConfig","upnode_vhost",e.target.value,index)
                                    }}
                                        value={item.upnode_vhost}/>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="Token回源认证配置"><span>token_traverse</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editOrigin({"token_traverse":val},index,configType))}} value={item.token_traverse} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="回源获取数据超时"><span>backsource_timeout</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_orginConfig"} field="backsource_timeout" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onBlur={(e)=>validateArrformField(configType+"_orginConfig","backsource_timeout",e.target.value,index)}
                                        onChange={(e)=>{dispatch(editOrigin({"backsource_timeout":e.target.value},index,configType));
                                    validateArrformField(configType+"_orginConfig","backsource_timeout",e.target.value,index)
                                    }}
                                        value={item.backsource_timeout}/>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="回源哈希规则"><span>hash_str</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_orginConfig"} field="hash_str" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editOrigin({"hash_str":e.target.value},index,configType));
                                    validateArrformField(configType+"_orginConfig","hash_str",e.target.value,index)
                                    }}
                                        value={item.hash_str}/>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td><textarea
                                     onChange={(e)=>{dispatch(editOrigin({"custom_setting":e.target.value},index,configType));
                                }}
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
        "channelConfig": state.clmsOriginConfig,
        validator: state.validator_1}
}
export default connect(sel)(OriginContent)
