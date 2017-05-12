import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import { Select,Tooltip  } from 'antd';
const Option = Select.Option;
import {editHttpService} from "../actions/clmsConfigActions.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,clearFromMsg } from "../public/js/validate/validateRform.js"
class HttpServiceContent extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisData=channelConfig[ctype].http;
        getArrForm(ctype+"_httpConfig",index);
        getArrFormFields(ctype+"_httpConfig",index,{
            "dir": {
                "value": _thisData[index].dir,
                "rule": {"required":true,"regexp":/^([\/]([\w-][\/]{0,1})+)*$/},
                "msg": {"required":"dir不能为空","regexp": "不符合符合linux路径"}
            },
            "hdl_buffer_length": {
                "value":  _thisData[index].hdl_buffer_length,
                "rule": {"required":true,"regexp": /^[0-9]*$/},
                "msg": {"required":"hdl_buffer_length不能为空！","regexp": "只能是整数！"}
            },
            "hdl_error_code": {
                "value":  _thisData[index].hdl_error_code,
                "rule": {"required":true,"regexp": /^[0-9]*$/},
                "msg": {"required":"hdl_error_code不能为空！","regexp": "只能是整数！"}
            },
            "hdl_error_info": {
                "value": _thisData[index].hdl_error_info,
                "rule": {"required":true},
                "msg": {"required":"hdl_error_info不能为空！"}
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
        //给当前显示页添加校验
    }

    componentWillUnmount() {
       // console.log("频道cont清除");
        const {index,clmsConfig,validator }=this.props;
        var ctype=clmsConfig.configType;
       // console.log(validator[`${ctype}_channelConfig`]);
        //console.log(`${ctype}_channelConfig`);
        if(!validator||!validator[`${ctype}_httpConfig`]||!validator[`${ctype}_httpConfig`].length){
            return
        }
        delArrFormFn(ctype+"_httpConfig",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.http,
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
                            <Tooltip placement="top" title="服务开关"><span>enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHttpService({"enabled":val},index,configType))
                            val=="off"?clearFromMsg(configType+"_httpConfig",index):""}}  value={item.enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="虚拟目录"><span>dir</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_httpConfig"} field="dir" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editHttpService({"dir":e.target.value},index,configType));
                                   item.enabled=="on"?validateArrformField(configType+"_httpConfig","dir",e.target.value,index):""
                                    }}
                                     onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_httpConfig","dir",e.target.value,index):""}
                                        value={item.dir}/>
                            </ValidateItem>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="http+ts流输入开关"><span>http_ts_push_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHttpService({"http_ts_push_enabled":val},index,configType))}} value={item.http_ts_push_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="chunked编码方式"><span>chunked_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHttpService({"chunked_enabled":val},index,configType))}} value={item.chunked_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="hdl的buffer时长"><span>hdl_buffer_length</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_httpConfig"} field="hdl_buffer_length" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editHttpService({"hdl_buffer_length":e.target.value},index,configType));
                                    item.enabled=="on"?validateArrformField(configType+"_httpConfig","hdl_buffer_length",e.target.value,index):""
                                    }}
                                 onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_httpConfig","hdl_buffer_length",e.target.value,index):""}
                                        value={item.hdl_buffer_length}/>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="错误码返回"><span>hdl_error_code</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_httpConfig"} field="hdl_error_code" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editHttpService({"hdl_error_code":e.target.value},index,configType));
                                    item.enabled=="on"?validateArrformField(configType+"_httpConfig","hdl_error_code",e.target.value,index):""
                                    }}
                                  onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_httpConfig","hdl_error_code",e.target.value,index):""}
                                        value={item.hdl_error_code}/>
                            </ValidateItem>
                           </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="错误码原因"><span>hdl_error_info</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_httpConfig"} field="hdl_error_info" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editHttpService({"hdl_error_info":e.target.value},index,configType))
                                    item.enabled=="on"?validateArrformField(configType+"_httpConfig","hdl_error_info",e.target.value,index):""}}
                                        onBlur={(e)=>item.enabled=="on"?validateArrformField(configType+"_httpConfig","hdl_error_info",e.target.value,index):""}
                                        value={item.hdl_error_info}/>
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            <textarea onChange={(e)=>{dispatch(editHttpService({"custom_setting":e.target.value},index,configType));
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
        "channelConfig": state.clmsHttpServiceConfig,
        validator: state.validator_1}
}
export default connect(sel)(HttpServiceContent)
