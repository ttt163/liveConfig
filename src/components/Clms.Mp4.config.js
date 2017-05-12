import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
import {validateArrformField} from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {addConfigMp4Data,delMp4Data,addMp4Data,editMp4,changeMp4Level} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import Mp4Content from "./Clms.mp4.content.config.js"
class Mp4Config extends Component {
    choseConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        dispatch(addConfigMp4Data({"currIndex":index},configType));

    }
    delConfig(index){
        const {dispatch,clmsConfig,channelConfig}=this.props;
        var configType=clmsConfig.configType;
      //  console.log(!(index>channelConfig[configType].currIndex));
        if(index<channelConfig[configType].currIndex){
            dispatch(addConfigMp4Data({"currIndex":index},configType));
        }else if(index==channelConfig[configType].currIndex){
            if(index==0){
                dispatch(addConfigMp4Data({"currIndex": 0}, configType));
            }else{
                dispatch(addConfigMp4Data({"currIndex":index-1},configType));
            }
        }
        /*if(index==channelConfig[configType].currIndex){
            dispatch(addConfigMp4Data({"currIndex":0},configType));
        }else{
            dispatch(addConfigMp4Data({"currIndex":index},configType));
        }*/
        dispatch(delMp4Data(index,configType));
    }
    addChannel(){
        const {dispatch,channelConfig,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        if(channelConfig[configType].mp4.length==4){
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
            "enabled":"off",
            "mp4_path":!md5Url?"":"/tmp/mp4/"+md5Url,
            "mp4_plan":"session",
            "mp4_duration":"20",
            "mp4_wait_keyframe":"on",
            "time_jitter":"zero",
            "mp4_file_expired":"1day",
            "mp4_copy_enabled":"off",
            "mp4_copy_path":"",
            "custom_setting":"",
            "take_effect_level":[]
        };
        //console.log(configType);
        dispatch(addMp4Data(data,configType));
    }
    //生效层级
    addLevel(e,curr){
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        var val=e.target.value,isCheck=e.target.checked;
        //console.log(configType);
        dispatch(changeMp4Level(val,isCheck,curr,configType));
    }
    render() {
        const {clmsConfig,channelConfig,dispatch,validator}=this.props;
       // console.log(channelConfig[clmsConfig.configType].currIndex);
       // console.log(channelConfig[clmsConfig.configType]);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.mp4,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(currConfig);
        //console.log(currConfig.take_effect_level);
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>MP4文件录制</h4></div>
                    <div className="col-xs-9 clms-cbtns">
                        <i onClick={()=>dispatch(addConfigMp4Data({"show":!channelConfigType.show},configType))} className="iconfont more-dot">&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":channelConfigType.show?"block":"none"}}>
                    <EffectLevel leves={currConfig.take_effect_level}
                                 existLevel={channelConfigType.exist_level}
                                 changeLevel={(e)=>{this.addLevel(e,channelConfigType.currIndex);
                                  currConfig.enabled=="off"?"":validateArrformField(configType+"_mp4Config","take_effect_level",currConfig.take_effect_level.length,channelConfigType.currIndex)}}
                                 add={()=>this.addChannel()}
                                 thisForm={configType+"_mp4Config"}
                                 formIndex={channelConfigType.currIndex}/>
                    <div>
                        <ConfigTab curr={channelConfigType.currIndex}
                                   data={channelData}
                                   label="配置"
                                   choseTab={(index)=>this.choseConfig(index)}
                                   delTab={(index)=>this.delConfig(index)}  />
                        {channelData.map((item ,index)=>
                                <Mp4Content key={index} {...item} index={index} />
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
        "channelConfig": state.clmsMp4Config,
        //"channelData":state.clmsChannelConfig.channel ,
        validator: state.validator_1}
}
export default connect(sel)(Mp4Config)