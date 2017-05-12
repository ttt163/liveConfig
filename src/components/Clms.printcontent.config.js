import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import { Select ,Tooltip } from 'antd';
const Option = Select.Option;
import {editPrint} from "../actions/clmsConfigActions.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,clearFromMsg} from "../public/js/validate/validateRform.js"
class PrintContent extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisData=channelConfig[ctype].pithy_print;
        getArrForm(ctype+"_printConfig",index);
        getArrFormFields(ctype+"_printConfig",index,{
            "publish": {
                "value": _thisData[index].publish,
                "rule": {"regexp": /^[0-9]*$/},
                "msg": {"regexp": "只能是整数！"}
            },
            "play": {
                "value":  _thisData[index].play,
                "rule": {"regexp": /^[0-9]*$/},
                "msg": {"regexp": "只能是整数！"}
            },
            "hdl": {
                "value":  _thisData[index].hdl,
                "rule": {"regexp": /^[0-9]*$/},
                "msg": {"regexp": "只能是整数！"}
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
        if(!validator||!validator[`${ctype}_printConfig`]||!validator[`${ctype}_printConfig`].length){
            return
        }
        delArrFormFn(ctype+"_printConfig",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.pithy_print,
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
                            <Tooltip placement="top" title="服务开关"><span>enabled</span></Tooltip>
                        </td>
                        <td>
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editPrint({"enabled":val},index,configType))
                            val=="off"?clearFromMsg(configType+"_printConfig",index):""}} value={item.enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="推流输出频率"><span>publish</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_printConfig"} field="publish" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onBlur={(e)=>item.enabled=="off"?"":validateArrformField(configType+"_printConfig","publish",e.target.value,index)}
                                        onChange={(e)=>{dispatch(editPrint({"publish":e.target.value},index,configType));
                                    item.enabled=="off"?"":validateArrformField(configType+"_printConfig","publish",e.target.value,index)}}
                                        value={item.publish}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="rtmp播放输出频率"><span>play</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_printConfig"} field="play" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editPrint({"play":e.target.value},index,configType));
                                    item.enabled=="off"?"":validateArrformField(configType+"_printConfig","play",e.target.value,index)}}
                                        onBlur={(e)=>item.enabled=="off"?"":validateArrformField(configType+"_printConfig","play",e.target.value,index)}
                                        value={item.play}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="HDL播放输出频率"><span>hdl</span></Tooltip>
                            </td>
                        <td>
                            <ValidateItem validator={validator} thisForm={configType+"_printConfig"} field="hdl" formType="arr" formIndex={index}>
                                <input  className="form-control"
                                        onChange={(e)=>{dispatch(editPrint({"hdl":e.target.value},index,configType));
                                    item.enabled=="off"?"":validateArrformField(configType+"_printConfig","hdl",e.target.value,index)}}
                                        onBlur={(e)=>item.enabled=="off"?"":validateArrformField(configType+"_printConfig","hdl",e.target.value,index)}
                                        value={item.hdl}
                                    />
                            </ValidateItem>

                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            <textarea onChange={(e)=>{dispatch(editPrint({"custom_setting":e.target.value},index,configType))}} value={item.custom_setting} className="form-control" rows="3"></textarea>
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
        "channelConfig": state.clmsPrintConfig,
        validator: state.validator_1}
}
export default connect(sel)(PrintContent)
