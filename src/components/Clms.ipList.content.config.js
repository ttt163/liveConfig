import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import { Select ,Tooltip } from 'antd';
const Option = Select.Option;
import {editIpList} from "../actions/clmsConfigActions.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,editArrformFieldMsg} from "../public/js/validate/validateRform.js"
class IpListContent extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var isIp = /^(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))([\r\n]((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))+))$/;
        var _thisData=channelConfig[ctype].ip_list;
        getArrForm(ctype+"_ipListConfig",index);
        getArrFormFields(ctype+"_ipListConfig",index,{
            "white_list_ip": {
                "value":  _thisData[index].white_list_ip,
                "rule": {"regexp": isIp},
                "msg": {"regexp": "不符合IP地址规则，多个IP请回车换行进行分隔2！"}
            },
            "black_list_ip": {
                "value":  _thisData[index].black_list_ip,
                "rule": {"regexp": isIp},
                "msg": {"regexp": "不符合IP地址规则，多个IP请回车换行进行分隔！"}
            },
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
        if(!validator||!validator[`${ctype}_ipListConfig`]||!validator[`${ctype}_ipListConfig`].length){
            return
        }
        delArrFormFn(ctype+"_ipListConfig",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.ip_list,
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
                            <Tooltip placement="top" title="白名单-功能开关"><span> white_list-enabled</span></Tooltip>
                           </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editIpList({"white_list_enabled":val},index,configType))
                                    val=="off"?editArrformFieldMsg(configType+"_ipListConfig","white_list_ip",index,{"isValider":true, "error":""}):""
                                    val=="off"&&item.black_list_enabled=="off"?editArrformFieldMsg(configType+"_ipListConfig","take_effect_level",index,{"isValider":true, "error":""}):""
                                    }}
                                    value={item.white_list_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="白名单-IP列表"><span>white_list-ip</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_ipListConfig"} field="white_list_ip" formType="arr" formIndex={index}>
                                <textarea onChange={(e)=>{dispatch(editIpList({"white_list_ip":e.target.value},index,configType));
                                 validateArrformField(configType+"_ipListConfig","white_list_ip",e.target.value,index)
                                }}
                                          value={item.white_list_ip} className="form-control" rows="3"></textarea>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            <textarea onChange={(e)=>{dispatch(editIpList({"white_custom_setting":e.target.value},index,configType))}} value={item.white_custom_setting} className="form-control" rows="3"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="黑名单-功能开关"><span>black_list-enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editIpList({"black_list_enabled":val},index,configType))
                                    val=="off"?editArrformFieldMsg(configType+"_ipListConfig","black_list_ip",index,{"isValider":true, "error":""}):""
                                    val=="off"&&item.white_list_enabled=="off"?editArrformFieldMsg(configType+"_ipListConfig","take_effect_level",index,{"isValider":true, "error":""}):""}}
                                    value={item.black_list_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="黑名单-IP列表"><span>black_list-ip</span></Tooltip>
                        </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_ipListConfig"} field="black_list_ip" formType="arr" formIndex={index}>
                                <textarea onChange={(e)=>{dispatch(editIpList({"black_list_ip":e.target.value},index,configType));
                                                 validateArrformField(configType+"_ipListConfig","black_list_ip",e.target.value,index)}}
                                          value={item.black_list_ip} className="form-control" rows="3"></textarea>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            <textarea onChange={(e)=>{dispatch(editIpList({"black_custom_setting":e.target.value},index,configType))}} value={item.black_custom_setting} className="form-control" rows="3"></textarea>
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
        "channelConfig": state.clmsIpListConfig,
        validator: state.validator_1}
}
export default connect(sel)(IpListContent)
