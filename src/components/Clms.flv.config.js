import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
import {validateArrformField} from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {addConfigFlvData,delFlvData,addFlvData,editFlv,changeFlvLevel} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import FlvContent from "./Clms.flv.content.config.js"
class FlvConfig extends Component {
    choseConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        dispatch(addConfigFlvData({"currIndex":index},configType));

    }
    delConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig,channelConfig}=this.props;
        var configType=clmsConfig.configType;
        if(index<channelConfig[configType].currIndex){
            dispatch(addConfigFlvData({"currIndex":index},configType));
        }else if(index==channelConfig[configType].currIndex){
            if(index==0){
                dispatch(addConfigFlvData({"currIndex": 0}, configType));
            }else{
                dispatch(addConfigFlvData({"currIndex":index-1},configType));
            }
        }
        dispatch(delFlvData(index,configType));
    }
    addChannel(){
        const {dispatch,channelConfig,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        if(channelConfig[configType].flv.length==4){
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
            "dvr_path":!md5Url?"":"/tmp/flv/"+md5Url,
            "dvr_plan":"segment",
            "dvr_duration":"30",
            "dvr_wait_keyframe":"on",
            "time_jitter":"zero",
            "custom_setting":"",
            "take_effect_level":[]
        };
        //console.log(configType);
        dispatch(addFlvData(data,configType));
    }
    //生效层级
    addLevel(e,curr){
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        var val=e.target.value,isCheck=e.target.checked;
        //console.log(configType);
        dispatch(changeFlvLevel(val,isCheck,curr,configType));
    }
    render() {
        const {clmsConfig,channelConfig,dispatch,validator}=this.props;
      //  console.log(clmsConfig.configType);
       // console.log(channelConfig[clmsConfig.configType]);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.flv,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(channelData);
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>flv文件录制</h4></div>
                    <div className="col-xs-9 clms-cbtns">
                        <i onClick={()=>dispatch(addConfigFlvData({"show":!channelConfigType.show},configType))} className="iconfont more-dot">&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":channelConfigType.show?"block":"none"}}>
                    <EffectLevel leves={currConfig.take_effect_level}
                                 existLevel={channelConfigType.exist_level}
                                 changeLevel={(e)=>{this.addLevel(e,channelConfigType.currIndex);
                                   currConfig.enabled=="off"?"":validateArrformField(configType+"_flvConfig","take_effect_level",currConfig.take_effect_level.length,channelConfigType.currIndex)}}
                                 add={()=>this.addChannel()}
                                 thisForm={configType+"_flvConfig"}
                                 formIndex={channelConfigType.currIndex}/>
                    <div>
                        <ConfigTab curr={channelConfigType.currIndex}
                                   data={channelData}
                                   label="配置"
                                   choseTab={(index)=>this.choseConfig(index)}
                                   delTab={(index)=>this.delConfig(index)}  />
                        {channelData.map((item ,index)=>
                              <FlvContent key={index} {...item} index={index} />
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
        "channelConfig": state.clmsFlvConfig,
        //"channelData":state.clmsChannelConfig.channel ,
        validator: state.validator_1}
}
export default connect(sel)(FlvConfig)