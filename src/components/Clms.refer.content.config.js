import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import { Select ,Tooltip } from 'antd';
const Option = Select.Option;
import {editRefer} from "../actions/clmsConfigActions.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn} from "../public/js/validate/validateRform.js"
class ReferContent extends Component {
    componentDidMount() {
       /// console.log("频道cont");
        //console.log(this.props);
        const {dispatch,index,clmsConfig,channelConfig}=this.props;
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisData=channelConfig[ctype].refer;
       /* getArrForm(ctype+"_referConfig",index);
        getArrFormFields(ctype+"_referConfig",index,{
            "take_effect_level": {
                "value": _thisData[index].take_effect_level.length,
                "rule": {"required":true},
                "msg": {"required": "请填写生效层级！"}
            }
        })*/
        //给当前显示页添加校验
    }

    componentWillUnmount() {
       // console.log("频道cont清除");
        const {index,clmsConfig,validator }=this.props;
        var ctype=clmsConfig.configType;
       // console.log(validator[`${ctype}_channelConfig`]);
        //console.log(`${ctype}_channelConfig`);
        if(!validator||!validator[`${ctype}_referConfig`]||!validator[`${ctype}_referConfig`].length){
            return;
        }
        delArrFormFn(ctype+"_referConfig",index);

    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.refer,
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
                            <Tooltip placement="top" title="refer检测"><span>refer</span></Tooltip>
                            </td>
                        <td>
                            <input  className="form-control"
                                    onChange={(e)=>{dispatch(editRefer({"refer":e.target.value},index,configType))}}
                                    value={item.refer}
                                />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="推流refer检测"><span>refer_publish</span></Tooltip>
                            </td>
                        <td>
                            <input  className="form-control"
                                    onChange={(e)=>{dispatch(editRefer({"refer_publish":e.target.value},index,configType))}}
                                    value={item.refer_publish}
                                />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="播放refer检测"><span>refer_play</span></Tooltip>
                            </td>
                        <td>
                            <input  className="form-control"
                                    onChange={(e)=>{dispatch(editRefer({"refer_play":e.target.value},index,configType))}}
                                    value={item.refer_play}
                                />
                        </td>
                    </tr>
                    {/*<tr>
                        <td className="text-center">自定义配置</td>
                        <td>
                            <textarea onChange={(e)=>{dispatch(editRefer({"custom_setting":e.target.value},index,configType))}} value={item.custom_setting} className="form-control" rows="3"></textarea>
                        </td>
                    </tr>*/}
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
        "channelConfig": state.clmsReferConfig,
        validator: state.validator_1}
}
export default connect(sel)(ReferContent)
