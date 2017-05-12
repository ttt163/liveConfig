import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
import {getForm,getFields,getFormFields,validateField,validateAllFields,validateArrformField} from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {addConfigHttpHookData,delHttpHookData,addHttpHookData,editHttpHook,editHttpHookData,changeHttpHookLevel,delHook,addHook,editHook,editHookEvent} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import HttpHookContent from "./Clms.httpHook.content.config.js"
class HttpHookConfig extends Component {
    choseConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        dispatch(addConfigHttpHookData({"currIndex":index},configType));

    }
    delConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig,channelConfig}=this.props;
        var configType=clmsConfig.configType;
        if(index<channelConfig[configType].currIndex){
            dispatch(addConfigHttpHookData({"currIndex":index},configType));
        }else if(index==channelConfig[configType].currIndex){
            if(index==0){
                dispatch(addConfigHttpHookData({"currIndex": 0}, configType));
            }else{
                dispatch(addConfigHttpHookData({"currIndex":index-1},configType));
            }
        }
        dispatch(delHttpHookData(index,configType));
    }
    addChannel(){
        const {dispatch,channelConfig,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        if(channelConfig[configType].http_hook.length==4){
            new ShowDiag({
                msg: "最多只能添加4个配置！",
                closetime: 2
            });
            return;
        }
        if(channelConfig[configType].exist_level.length>=4){
            new ShowDiag({
                msg: "生效层级已经全部被选，不能再添加配置！",
                closetime:2
            });
            return;
        }
        var data={
            "currHook":"on_connect",
            "hook_global":{
                "enabled":"off",
                "on_consumers_enabled":"on",
                "on_publish_stream_info_enabled":"off",
                "on_edge_publish_stream_info_enabled":"off",
                "on_warn_info_enabled":"off"
            },
            "hook_event":[
                {
                    "http_hook_name":"on_connect",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"3000",
                    "recv_timeout":"3000",
                    "send_timeout":"3000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_close",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"3000",
                    "recv_timeout":"3000",
                    "send_timeout":"3000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_publish",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"3000",
                    "recv_timeout":"3000",
                    "send_timeout":"3000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_unpublish",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"3000",
                    "recv_timeout":"3000",
                    "send_timeout":"3000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_play",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"3000",
                    "recv_timeout":"3000",
                    "send_timeout":"3000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_stop",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"3000",
                    "recv_timeout":"3000",
                    "send_timeout":"3000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_warn_back_source_connect",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"1000",
                    "recv_timeout":"1000",
                    "send_timeout":"1000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_edge_play_start",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"1000",
                    "recv_timeout":"1000",
                    "send_timeout":"1000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_edge_play_stop",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"1000",
                    "recv_timeout":"1000",
                    "send_timeout":"1000",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                },
                {
                    "http_hook_name":"on_record_file",
                    "enabled":"off",
                    "on_hook_warn_info_enabled":"off",
                    "conn_timeout":"1000",
                    "recv_timeout":"1000",
                    "send_timeout":"1000",
                    "type":"both",
                    "hook":[
                        {
                            "name":"",
                            "enabled":"on",
                            "sync":"off",
                            "url":""
                        }
                    ]
                }
            ],
            "take_effect_level":[]
        };
        //console.log(configType);
        dispatch(addHttpHookData(data,configType));
    }
    //生效层级
    addLevel(e,curr){
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        var val=e.target.value,isCheck=e.target.checked;
        //console.log(configType);
        dispatch(changeHttpHookLevel(val,isCheck,curr,configType));
    }
    //新增hook
    /*addHookFn(currHook,curr,cType){
        const {dispatch}=this.props;
        var data={
            "name":"",
            "enabled":"on",
            "sync":"off",
            "url":""
        };
        dispatch(addHook(data,currHook,curr,cType));
    }*/
    render() {
        const {clmsConfig,channelConfig,dispatch,validator}=this.props;
       // console.log(channelConfig[clmsConfig.configType].currIndex);
       // console.log(channelConfig[clmsConfig.configType]);
        if(!channelConfig[clmsConfig.configType]){
            return;
        }
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.http_hook,
            currConfig=channelData[channelConfigType.currIndex],
            currHook=currConfig.currHook;


        //console.log(currConfig.hook_global.enabled);
        //console.log(currConfig.take_effect_level);
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>HttpHooks</h4></div>
                    <div className="col-xs-9 clms-cbtns">
                        <i onClick={()=>dispatch(addConfigHttpHookData({"show":!channelConfigType.show},configType))} className="iconfont more-dot">&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":channelConfigType.show?"block":"none"}}>
                    <EffectLevel leves={currConfig.take_effect_level}
                                 existLevel={channelConfigType.exist_level}
                                 changeLevel={(e)=>{
                                 this.addLevel(e,channelConfigType.currIndex)
                                 currConfig.hook_global.enabled=="off"?"":
                                  validateArrformField(configType+"_httpHookConfig","take_effect_level",currConfig.take_effect_level.length,channelConfigType.currIndex)
                                 }}
                                 add={()=>this.addChannel()}
                                 thisForm={configType+"_httpHookConfig"}
                                 formIndex={channelConfigType.currIndex} />
                    <div>
                        <ConfigTab curr={channelConfigType.currIndex}
                                   data={channelData}
                                   label="配置"
                                   choseTab={(index)=>this.choseConfig(index)}
                                   delTab={(index)=>this.delConfig(index)}  />
                        {channelData.map((item ,index)=>
                               <HttpHookContent index={index} key={index} {...item} />
                        )}

                    </div>
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
export default connect(sel)(HttpHookConfig)