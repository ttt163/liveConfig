import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import { Select,Tooltip  } from 'antd';
const Option = Select.Option;
import {editHttpTs} from "../actions/clmsConfigActions.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,clearFromMsg} from "../public/js/validate/validateRform.js"
class HttpTsContent extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisData=channelConfig[ctype].http_ts;
        getArrForm(ctype+"_httpTsConfig",index);
        getArrFormFields(ctype+"_httpTsConfig",index,{
            "take_effect_level": {
                "value":  _thisData[index].take_effect_level.length,
                "rule": {"required":true},
                "msg": {"required": "请填写生效层级！"}
            }/*,
            "custom_setting": {
                "value":_thisData[index].custom_setting,
                "rule": {"required":true},
                "msg": {"required": "自定义配置不能为空"}
            }*/
        })
        //给当前显示页添加校验
    }

    componentWillUnmount() {
       // console.log("频道cont清除");
        const {index,clmsConfig,validator }=this.props;
        var ctype=clmsConfig.configType;
       // console.log(validator[`${ctype}_channelConfig`]);
        //console.log(`${ctype}_channelConfig`);
        if(!validator||!validator[`${ctype}_httpTsConfig`]||!validator[`${ctype}_httpTsConfig`].length){
            return
        }
        delArrFormFn(ctype+"_httpTsConfig",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.http_ts,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(item);
        var item=this.props;
        return (
            <div key={index} style={{"display":index!=channelConfigType.currIndex?"none":"block"}} className="b-cont">
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
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHttpTs({"enabled":val},index,configType))
                            val=="off"?clearFromMsg(configType+"_httpTsConfig",index):""}} value={item.enabled} >
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
                                    onChange={(val)=>{dispatch(editHttpTs({"acodec":val},index,configType))}}
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
                            <Select style={{ width: "100%" }} onChange={(val)=>{dispatch(editHttpTs({"vcodec":val},index,configType))}}
                                    value={item.vcodec} >
                                <Option value="avc">avc</Option>
                                <Option value="hevc">hevc</Option>
                                <Option value="vn">vn</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                             <textarea onChange={(e)=>{dispatch(editHttpTs({"custom_setting":e.target.value},index,configType))}}
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
        "channelConfig": state.clmsHttpTsConfig,
        validator: state.validator_1}
}
export default connect(sel)(HttpTsContent)
