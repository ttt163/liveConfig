import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
import {validateArrformField } from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {addConfigHlsData,delHlsData,addHlsData,editHls,changeHlsLevel} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import HlsContent from "./Clms.hls.content.config.js"
class HlsConfig extends Component {
    choseConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        dispatch(addConfigHlsData({"currIndex":index},configType));

    }
    delConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig,channelConfig}=this.props;
        var configType=clmsConfig.configType;
        if(index<channelConfig[configType].currIndex){
            dispatch(addConfigHlsData({"currIndex":index},configType));
        }else if(index==channelConfig[configType].currIndex){
            if(index==0){
                dispatch(addConfigHlsData({"currIndex": 0}, configType));
            }else{
                dispatch(addConfigHlsData({"currIndex":index-1},configType));
            }
        }
        dispatch(delHlsData(index,configType));
    }
    addChannel(){
        const {dispatch,channelConfig,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        if(channelConfig[configType].hls.length==4){
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
        var data= {
            "enabled":"on",
            "multi_bitrate":"off",
            "hls_path":!md5Url?"":"/tmp/srs_hls/"+md5Url,
            "hls_fragment":"10",
            "hls_window":"3",
            "hls_index":"[stream]/index.m3u8",
            "wait_key":"off",
            "acodec":"aac",
            "vcodec":"avc",
            "ts_ms_name_enabled":"off",
            "hls_engine":"old",
            "time_jitter":"off",
            "custom_setting":"",
            "take_effect_level":[]
        };
        //console.log(configType);
        dispatch(addHlsData(data,configType));
    }
    //生效层级
    addLevel(e,curr){
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        var val=e.target.value,isCheck=e.target.checked;
        //console.log(configType);
        dispatch(changeHlsLevel(val,isCheck,curr,configType));
    }
    render() {
        const {clmsConfig,channelConfig,dispatch,validator}=this.props;
       // console.log(channelConfig[clmsConfig.configType].currIndex);
       // console.log(channelConfig[clmsConfig.configType]);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.hls,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(currConfig);
        //console.log(currConfig.take_effect_level);
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>HLS服务</h4></div>
                    <div className="col-xs-9 clms-cbtns">
                        <i onClick={()=>dispatch(addConfigHlsData({"show":!channelConfigType.show},configType))} className="iconfont more-dot">&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":channelConfigType.show?"block":"none"}}>
                    <EffectLevel leves={currConfig.take_effect_level}
                                 existLevel={channelConfigType.exist_level}
                                 changeLevel={(e)=>{this.addLevel(e,channelConfigType.currIndex);
                                  currConfig.enabled=="off"?"":validateArrformField(configType+"_hlsConfig","take_effect_level",currConfig.take_effect_level.length,channelConfigType.currIndex)}}
                                    add={()=>this.addChannel()}
                                 thisForm={configType+"_hlsConfig"}
                                 formIndex={channelConfigType.currIndex}/>
                    <div>
                        <ConfigTab curr={channelConfigType.currIndex}
                                   data={channelData}
                                   label="配置"
                                   choseTab={(index)=>this.choseConfig(index)}
                                   delTab={(index)=>this.delConfig(index)}  />
                        {channelData.map((item ,index)=>
                            <HlsContent key={index} {...item} index={index} />
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
        "channelConfig": state.clmsHlsConfig,
        //"channelData":state.clmsChannelConfig.channel ,
        validator: state.validator_1}
}
export default connect(sel)(HlsConfig)