import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
import {validateArrformField} from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {addConfigPrintData,delPrintData,addPrintData,editPrint,changePrintLevel} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import PrintContent from "./Clms.printcontent.config.js"
class PrintConfig extends Component {
    choseConfig(index){
        //console.log(index);
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        dispatch(addConfigPrintData({"currIndex":index},configType));

    }
    delConfig(index){
        const {dispatch,clmsConfig,channelConfig}=this.props;
        var configType=clmsConfig.configType;
      //  console.log(!(index>channelConfig[configType].currIndex));
        if(index<channelConfig[configType].currIndex){
            dispatch(addConfigPrintData({"currIndex":index},configType));
        }else if(index==channelConfig[configType].currIndex){
            if(index==0){
                dispatch(addConfigPrintData({"currIndex": 0}, configType));
            }else{
                dispatch(addConfigPrintData({"currIndex":index-1},configType));
            }
        }
        /*if(index==channelConfig[configType].currIndex){
            dispatch(addConfigMp4Data({"currIndex":0},configType));
        }else{
            dispatch(addConfigMp4Data({"currIndex":index},configType));
        }*/
        dispatch(delPrintData(index,configType));
    }
    addChannel(){
        const {dispatch,channelConfig,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        if(channelConfig[configType].pithy_print.length==4){
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
        var data= {
            "enabled":"off",
            "publish":"60000",
            "play":"60000",
            "hdl":"60000",
            "custom_setting":"",
            "take_effect_level":[]
        };
        //console.log(configType);
        dispatch(addPrintData(data,configType));
    }
    //生效层级
    addLevel(e,curr){
        const {dispatch,clmsConfig}=this.props;
        var configType=clmsConfig.configType;
        var val=e.target.value,isCheck=e.target.checked;
        //console.log(configType);
        dispatch(changePrintLevel(val,isCheck,curr,configType));
    }
    render() {
        const {clmsConfig,channelConfig,dispatch,validator}=this.props;
       // console.log(channelConfig[clmsConfig.configType].currIndex);
       // console.log(channelConfig[clmsConfig.configType]);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.pithy_print,
            currConfig=channelData[channelConfigType.currIndex];
        //console.log(currConfig);
        //console.log(currConfig.take_effect_level);
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>打印日志配置</h4></div>
                    <div className="col-xs-9 clms-cbtns">
                        <i onClick={()=>dispatch(addConfigPrintData({"show":!channelConfigType.show},configType))} className="iconfont more-dot">&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":channelConfigType.show?"block":"none"}}>
                    <EffectLevel leves={currConfig.take_effect_level}
                                 existLevel={channelConfigType.exist_level}
                                 changeLevel={(e)=>{this.addLevel(e,channelConfigType.currIndex);
                                 currConfig.enabled=="off"?"":validateArrformField(configType+"_printConfig","take_effect_level",currConfig.take_effect_level.length,channelConfigType.currIndex)}}
                                    add={()=>this.addChannel()}
                                 thisForm={configType+"_printConfig"}
                                 formIndex={channelConfigType.currIndex}/>
                    <div>
                        <ConfigTab curr={channelConfigType.currIndex}
                                   data={channelData}
                                   label="配置"
                                   choseTab={(index)=>this.choseConfig(index)}
                                   delTab={(index)=>this.delConfig(index)}  />
                        {channelData.map((item ,index)=>
                                <PrintContent key={index} {...item} index={index} />
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
        "channelConfig": state.clmsPrintConfig,
        //"channelData":state.clmsChannelConfig.channel ,
        validator: state.validator_1}
}
export default connect(sel)(PrintConfig)