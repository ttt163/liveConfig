import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
import {validateArrformField} from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {addConfigOriginData,delOriginData,addOriginData,editOrigin,changeOriginLevel} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import OriginContent from "./Clms.origin.content.config.js"
class OriginConfig extends Component {
    /*componentDidMount() {
        const {dispatch,clmsConfig}=this.props;
        //console.log("666");
        //console.log(this.props);
    }*/
    choseConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        dispatch(addConfigOriginData({"currIndex":index},configType));

    }
    delConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig,channelConfig}=this.props;
        var configType=clmsConfig.configType;
        if(index<channelConfig[configType].currIndex){
            dispatch(addConfigOriginData({"currIndex":index},configType));
        }else if(index==channelConfig[configType].currIndex){
            if(index==0){
                dispatch(addConfigOriginData({"currIndex": 0}, configType));
            }else{
                dispatch(addConfigOriginData({"currIndex":index-1},configType));
            }
        }
        dispatch(delOriginData(index,configType));
    }
    addChannel(){
        const {dispatch,channelConfig,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        if(channelConfig[configType].origin.length==3){
            new ShowDiag({
                msg: "最多只能添加3个配置！",
                closetime: 2
            });
            return;
        }
        if(channelConfig[configType].exist_level.length>=3){
            new ShowDiag({
                msg: "生效层级已经全部被选，不能再添加配置！",
                closetime:2
            });
            return;
        }
        var data={
            "listen":"1935",
            "mode":"local",
            "interface":"",
            "server_key":"1.0",
            "type":"rtmp",
            "upnode_vhost":"",
            "token_traverse":"off",
            "backsource_timeout":"10",
            "hash_str":"$vhost$app$stream",
            "custom_setting":"",
            "take_effect_level":[]
        };
        //console.log(configType);
        dispatch(addOriginData(data,configType));
    }
    //生效层级
    addLevel(e,curr){
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        var val=e.target.value,isCheck=e.target.checked;
        //console.log(configType);
        dispatch(changeOriginLevel(val,isCheck,curr,configType));
    }
    render() {
        const {clmsConfig,channelConfig,dispatch,validator}=this.props;
        //console.log(clmsConfig);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.origin,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(channelData);
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>回源配置</h4></div>
                    <div className="col-xs-9 clms-cbtns">
                        <i onClick={()=>dispatch(addConfigOriginData({"show":!channelConfigType.show},configType))} className="iconfont more-dot">&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":channelConfigType.show?"block":"none"}}>
                    <EffectLevel leves={currConfig.take_effect_level}
                                 existLevel={channelConfigType.exist_level}
                                 changeLevel={(e)=>{this.addLevel(e,channelConfigType.currIndex);
                                 validateArrformField(configType+"_orginConfig","take_effect_level",currConfig.take_effect_level.length,channelConfigType.currIndex)}}
                                 add={()=>this.addChannel()}
                                 thisForm={configType+"_orginConfig"}
                                 formIndex={channelConfigType.currIndex}
                                 isOrigin={true}
                        />
                    <div>
                        <ConfigTab curr={channelConfigType.currIndex}
                                   data={channelData}
                                   label="配置"
                                   choseTab={(index)=>this.choseConfig(index)}
                                   delTab={(index)=>this.delConfig(index)}  />
                        {channelData.map((item ,index)=>
                          <OriginContent {...item} key={index} index={index} />
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
        "channelConfig": state.clmsOriginConfig,
        //"channelData":state.clmsChannelConfig.channel ,
        validator: state.validator_1}
}
export default connect(sel)(OriginConfig)