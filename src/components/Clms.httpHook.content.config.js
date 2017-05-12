import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
//import { URL } from '../config.js';
//import {ShowDiag} from  "../public/js/f.js"
import {getArrForm,getArrFormFields,validateArrformField,delArrFormFn,clearFromMsg,editArrformFieldMsg,editArrformArrFieldsMsg} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import { Select,Tooltip  } from 'antd';
const Option = Select.Option;
import {editHttpHook,editHttpHookData,editHookEvent} from "../actions/clmsConfigActions.js"
//import EffectLevel from "./Clms.config.effectLevel.js"
import HookContent from "./Clms.hook.content.config.js"
export function formatHttpHookFields(data){
    var optData={};
    for(var i=0;i<data.length;i++) {
        var _thisDatas = {
            [data[i].http_hook_name + "-conn_timeout"]: {
                "value": data[i].conn_timeout,
                "rule": {"required": true,"regexp": /^[0-9]*$/},
                "msg": {"required": "conn_timeout不能为空","regexp": "只能是整数"}
            },
            [data[i].http_hook_name + "-recv_timeout"]: {
                "value": data[i].recv_timeout,
                "rule": {"required": true,"regexp": /^[0-9]*$/},
                "msg": {"required": "recv_timeout不能为空","regexp": "只能是整数"}
            },
            [data[i].http_hook_name + "-send_timeout"]: {
                "value": data[i].send_timeout,
                "rule": {"required": true,"regexp": /^[0-9]*$/},
                "msg": {"required": "send_timeout不能为空","regexp": "只能是整数"}
            }
        }
        optData={...optData,..._thisDatas};
    }

    return optData;
}
class HttpHookContent extends Component {
    componentDidMount() {
        //console.log("进入1");
        const {clmsConfig,dispatch,validator,index,hook_event,channelConfig}=this.props;
        //hook_event[i].conn_timeout recv_timeout send_timeout http_hook_name
        var ctype=clmsConfig.configType;
        //给当前显示页添加校验
        //频道校验
        var _thisChannelData=channelConfig[ctype].http_hook;
        getArrForm(ctype+"_httpHookConfig",index);
        var opt=formatHttpHookFields(hook_event);
        //console.log(opt);
        getArrFormFields(ctype+"_httpHookConfig",index,{...opt,
            "take_effect_level": {
                "value": _thisChannelData[index].take_effect_level.length,
                "rule": {"required":true},
                "msg": {"required": "请填写生效层级！"}
            }} );
        //console.log(validator[ctype+"_httpHookConfig"]);
    }
    editMsg(thisForm,index,fildeArr){
        const {validator}=this.props;
        var vThisForm=validator[thisForm][index];
        var data={ "isValider":true,"error":""};
        for(var i=0;i<fildeArr.length;i++){
            //console.log(`${vThisForm.fields[fildeArr[i]] instanceof Array}"=="${fildeArr[i]}`);
            if(vThisForm.fields[fildeArr[i]] instanceof Array){
                for(var j=0;j<vThisForm.fields[fildeArr[i]].length;j++){
                    editArrformArrFieldsMsg(thisForm,index,fildeArr[i],j,data);
                }

            }else{
                editArrformFieldMsg(thisForm,fildeArr[i],index,data);
            }

        }

        //editArrformArrFieldsMsg(thisForm,index,`${currHook}-url`,fildeIndex,{ "isValider":true,"error":""})

    }
    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index,hook_event}=this.props;
       // console.log(channelConfig[clmsConfig.configType].currIndex);
       // console.log(channelConfig[clmsConfig.configType]);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.http_hook,
            currConfig=channelData[channelConfigType.currIndex],
            currHook=currConfig.currHook;
        var item=this.props;

        //console.log(currHook);
        //console.log(currConfig.take_effect_level);
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
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editHttpHook({"enabled":val},index,configType))
                                    val=="off"?clearFromMsg(configType+"_httpHookConfig",index):""}}
                                    value={item.hook_global.enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="是否发送当前vhost在线人数开关"><span>on_consumers_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editHttpHook({"on_consumers_enabled":val},index,configType))}}
                                    value={item.hook_global.on_consumers_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="是否发送统计的vhost的推流信息开关"><span>on_publish_stream_info_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editHttpHook({"on_publish_stream_info_enabled":val},index,configType))}}
                                    value={item.hook_global.on_publish_stream_info_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="是否发送边缘统计的vhost推流信息开关"><span>on_edge_publish_stream_info_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editHttpHook({"on_edge_publish_stream_info_enabled":val},index,configType))}}
                                    value={item.hook_global.on_edge_publish_stream_info_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Tooltip placement="top" title="是否发送vhost的告警信息开关"><span>on_warn_info_enabled</span></Tooltip>
                            </td>
                        <td>
                            <Select style={{ width: "100%" }}
                                    onChange={(val)=>{dispatch(editHttpHook({"on_warn_info_enabled":val},index,configType))}}
                                    value={item.hook_global.on_warn_info_enabled} >
                                <Option value="on">on</Option>
                                <Option value="off">off</Option>
                            </Select>
                        </td>
                    </tr>
                    {/*<tr>
                     <td className="text-center">自定义配置</td>
                     <td>
                     <textarea className="form-control" rows="3"></textarea>
                     </td>
                     </tr>*/}
                    </tbody>
                </table>
                {/*功能开关*/}
                <div className="form-group mt20">
                    <div className="col-xs-4">功能开关：</div>
                </div>
                <div>
                    <ul className="tab-nav clearfix">
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_connect"},index,configType))}  className={currHook=="on_connect"?"active":""}>
                            <Tooltip placement="top" title="rtmp客户端connect时执行动作"><span>on_connect</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_close"},index,configType))} className={currHook=="on_close"?"active":""}>
                            <Tooltip placement="top" title="连接断开时执行动作"><span>on_close</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_publish"},index,configType))} className={currHook=="on_publish"?"active":""}>
                            <Tooltip placement="top" title="确认为publish时执行动作"><span>on_publish</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_unpublish"},index,configType))} className={currHook=="on_unpublish"?"active":""}>
                            <Tooltip placement="top" title="publish结束后执行动作"><span>on_unpublish</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_play"},index,configType))} className={currHook=="on_play"?"active":""}>
                            <Tooltip placement="top" title="确认为play时执行动作"><span>on_play</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_stop"},index,configType))} className={currHook=="on_stop"?"active":""}>
                            <Tooltip placement="top" title="play结束后执行动作"><span>on_stop</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_warn_back_source_connect"},index,configType))} className={currHook=="on_warn_back_source_connect"?"active":""}>
                            <Tooltip placement="top" title="回源切换ip执行动作"><span>on_warn_back_source_connect</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_edge_play_start"},index,configType))} className={currHook=="on_edge_play_start"?"active":""}>
                            <Tooltip placement="top" title="回源（rtmp publish/play ,http flv）开始时执行动作"><span>on_edge_play_start</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_edge_play_stop"},index,configType))} className={currHook=="on_edge_play_stop"?"active":""}>
                            <Tooltip placement="top" title="回源（rtmp publish/play ,http flv）结束后执行动作"><span>on_edge_play_stop</span></Tooltip>
                            </li>
                        <li onClick={()=>dispatch(editHttpHookData({"currHook":"on_record_file"},index,configType))} className={currHook=="on_record_file"?"active":""}>
                            <Tooltip placement="top" title="录制（dvr或者mp4）生成一个新的flv/mp4文件后执行的动作"><span>on_record_file</span></Tooltip>
                            </li>
                    </ul>
                    {item.hook_event.map((data,i)=>
                            <div key={i} className="b-cont" style={{"display":data.http_hook_name==currHook?"block":"none"}}>
                                <table className="table table-bordered config-table">
                                    <thead >
                                    <tr>
                                        <th style={{"width":"30%"}} colSpan="2">配置项</th>
                                        <th>配置内容</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            <Tooltip placement="top" title="动作开关"><span>enabled</span></Tooltip>
                                        </td>
                                        <td>
                                            <Select style={{ width: "100%" }}
                                                    onChange={(val)=>{dispatch(editHookEvent({"enabled":val},i,index,configType));
                                                    val=="off"?this.editMsg(configType+"_httpHookConfig",index,[`${currHook}-conn_timeout`,`${currHook}-recv_timeout`,`${currHook}-send_timeout`,`${currHook}-name`,`${currHook}-url`]):""}}
                                                    value={data.enabled} >
                                                <Option value="on">on</Option>
                                                <Option value="off">off</Option>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"  className="text-center">
                                            <Tooltip placement="top" title="vhost下面的on_connect失败报警开关"><span>on_hook_warn_info_enabled</span></Tooltip>
                                            </td>
                                        <td>
                                            <Select style={{ width: "100%" }}
                                                    onChange={(val)=>{dispatch(editHookEvent({"on_hook_warn_info_enabled":val},i,index,configType))}}
                                                    value={data.on_hook_warn_info_enabled} >
                                                <Option value="on">on</Option>
                                                <Option value="off">off</Option>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            <Tooltip placement="top" title="连接超时"><span>conn_timeout</span></Tooltip>
                                            </td>
                                        <td>
                                            <ValidateItem validator={validator} thisForm={configType+"_httpHookConfig"} field={`${currHook}-conn_timeout`} formType="arr" formIndex={index}>
                                                <input value={data.conn_timeout}
                                                       onBlur={(e)=>item.hook_global.enabled=="off"||data.enabled=="off"?"":validateArrformField(configType+"_httpHookConfig",`${currHook}-conn_timeout` ,e.target.value,index)}
                                                       onChange={(e)=>{
                                                      item.hook_global.enabled=="off"||data.enabled=="off"?"":
                                                      validateArrformField(configType+"_httpHookConfig",`${currHook}-conn_timeout` ,e.target.value,index)
                                                       dispatch(editHookEvent({"conn_timeout":e.target.value},i,index,configType))
                                                    }}
                                                       className="form-control"/>
                                            </ValidateItem>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            <Tooltip placement="top" title="接收超时"><span>recv_timeout</span></Tooltip>
                                            </td>
                                        <td>
                                            <ValidateItem validator={validator} thisForm={configType+"_httpHookConfig"} field={`${currHook}-recv_timeout`} formType="arr" formIndex={index}>
                                                <input value={data.recv_timeout}
                                                       onBlur={(e)=>item.hook_global.enabled=="off"||data.enabled=="off"?"":
                                                   validateArrformField(configType+"_httpHookConfig",`${currHook}-recv_timeout` ,e.target.value,index)}
                                                       onChange={(e)=>{
                                                   item.hook_global.enabled=="off"||data.enabled=="off"?"":
                                                   validateArrformField(configType+"_httpHookConfig",`${currHook}-recv_timeout` ,e.target.value,index)
                                                   dispatch(editHookEvent({"recv_timeout":e.target.value},i,index,configType))}}
                                                       className="form-control"/>
                                            </ValidateItem>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            <Tooltip placement="top" title="发送超时"><span>send_timeout</span></Tooltip>
                                            </td>
                                        <td>
                                            <ValidateItem validator={validator} thisForm={configType+"_httpHookConfig"} field={`${currHook}-send_timeout`} formType="arr" formIndex={index}>
                                                <input value={data.send_timeout}
                                                       onBlur={(e)=>item.hook_global.enabled=="off"||data.enabled=="off"?"":
                                                   validateArrformField(configType+"_httpHookConfig",`${currHook}-send_timeout` ,e.target.value,index)}
                                                       onChange={(e)=>{
                                                   item.hook_global.enabled=="off"||data.enabled=="off"?"":
                                                   validateArrformField(configType+"_httpHookConfig",`${currHook}-send_timeout` ,e.target.value,index)
                                                   dispatch(editHookEvent({"send_timeout":e.target.value},i,index,configType))}}
                                                       className="form-control"/>
                                            </ValidateItem>

                                        </td>
                                    </tr>
                                    <tr style={{"display":currHook=="on_record_file"?"":"none"}}>
                                        <td colSpan="2" className="text-center">
                                            <Tooltip placement="top" title="录制通报"><span>type</span></Tooltip>
                                            </td>
                                        <td>
                                            <Select style={{ width: "100%" }}
                                                    onChange={(val)=>{dispatch(editHookEvent({"type":val},i,index,configType))}}
                                                    value={data.type} >
                                                <Option value="both">both</Option>
                                                <Option value="mp4">mp4</Option>
                                                <Option value="dvr">dvr</Option>
                                            </Select>
                                        </td>
                                    </tr>
                                    {data.hook.map((hook,h)=>
                                           <HookContent key={h} index={index} {...hook} h={h} i={i}
                                                        gEnabled={item.hook_global.enabled}
                                                        hEnabled={data.enabled}
                                                        hook_event={hook_event}
                                                        thisForm={configType+"_httpHookConfig"}
                                                        currHook={currHook}
                                               />
                                    )}


                                    </tbody>
                                </table>
                            </div>
                    )}


                </div>
            </div>
        )
    }
}
function sel(state) {
   // console.log(state);
    return {
        "clmsConfig": state.clmsConfig,
        "channelConfig": state.clmsHookConfig,
        //"channelData":state.clmsChannelConfig.channel ,
        validator: state.validator_1}
}
export default connect(sel)(HttpHookContent)