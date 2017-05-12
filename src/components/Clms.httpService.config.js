import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
import {validateArrformField} from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {addConfigHttpServiceData,delHttpServiceData,addHttpServiceData,editHttpService,changeHttpServiceevel} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import HttpServiceContent from "./Clms.httpService.content.config.js"
class HttpServiceConfig extends Component {
    choseConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        dispatch(addConfigHttpServiceData({"currIndex":index},configType));

    }
    delConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig,channelConfig}=this.props;
        var configType=clmsConfig.configType;
        if(index<channelConfig[configType].currIndex){
            dispatch(addConfigHttpServiceData({"currIndex":index},configType));
        }else if(index==channelConfig[configType].currIndex){
            if(index==0){
                dispatch(addConfigHttpServiceData({"currIndex": 0}, configType));
            }else{
                dispatch(addConfigHttpServiceData({"currIndex":index-1},configType));
            }
        }
        dispatch(delHttpServiceData(index,configType));
    }
    addChannel(){
        const {dispatch,channelConfig,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        if(channelConfig[configType].http.length==4){
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
        var md5Url=!clmsConfig[configType].channel_name?"":$.md5(clmsConfig[configType].channel_name);
        var data={
            "enabled":"off",
            "dir":!md5Url?"":"/tmp/"+md5Url,
            "http_ts_push_enabled":"on",
            "chunked_enabled":"on",
            "hdl_buffer_length":"3000",
            "hdl_error_code":"400",
            "hdl_error_info":"Bad Request",
            "custom_setting":"",
            "take_effect_level":[]
        };
        //console.log(configType);
        dispatch(addHttpServiceData(data,configType));
    }
    //生效层级
    addLevel(e,curr){
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        var val=e.target.value,isCheck=e.target.checked;
        //console.log(configType);
        dispatch(changeHttpServiceevel(val,isCheck,curr,configType));
    }
    render() {
        const {clmsConfig,channelConfig,dispatch,validator}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.http,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(channelData);
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>http服务器配置</h4></div>
                    <div className="col-xs-9 clms-cbtns">
                        <i onClick={()=>dispatch(addConfigHttpServiceData({"show":!channelConfigType.show},configType))} className="iconfont more-dot">&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":channelConfigType.show?"block":"none"}}>
                    <EffectLevel leves={currConfig.take_effect_level}
                                 existLevel={channelConfigType.exist_level}
                                 changeLevel={(e)=>{this.addLevel(e,channelConfigType.currIndex);
                                currConfig.enabled=="off"?"":validateArrformField(configType+"_httpConfig","take_effect_level",currConfig.take_effect_level.length,channelConfigType.currIndex)}}
                                 add={()=>this.addChannel()}
                                 thisForm={configType+"_httpConfig"}
                                 formIndex={channelConfigType.currIndex}/>
                    <div>
                        <ConfigTab curr={channelConfigType.currIndex}
                                   data={channelData}
                                   label="配置"
                                   choseTab={(index)=>this.choseConfig(index)}
                                   delTab={(index)=>this.delConfig(index)}  />
                        {channelData.map((item ,index)=>
                            <HttpServiceContent key={index} index={index} {...item} />

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
        "channelConfig": state.clmsHttpServiceConfig,
        //"channelData":state.clmsChannelConfig.channel ,
        validator: state.validator_1}
}
export default connect(sel)(HttpServiceConfig)