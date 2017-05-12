import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import {getArrformArrField,getArrForm,delArrformArrField,validateArrformArrField,editArrformArrFieldsMsg} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import { Select,Tooltip  } from 'antd';
const Option = Select.Option;
import {delHook,addHook,editHook} from "../actions/clmsConfigActions.js"
import {PANURLLIST} from "../config.js";
class HookContent extends Component {
    componentDidMount() {

        const {index,h,i,thisForm,hook_event,name,url}=this.props;
        //var urlList =/^((([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*|)?|([/r/n]+(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*|)))$/i;
       // var urlList=/^(((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)|((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)([\r\n]((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?))+)$/i;
        var urlList =PANURLLIST;
       // for(var eve=0;eve<hook_event.length;eve++){
        getArrForm(thisForm,index);
            getArrformArrField(thisForm,index,hook_event[i].http_hook_name+"-name",h,{
                "value": name,
                "rule": {"required":true,"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`]*$/},
                "msg": {"required": "name不能为空","regexp":"格式错误，只能由英文字母、数字、特殊符号组成"}
            });
            getArrformArrField(thisForm,index,hook_event[i].http_hook_name+"-url",h,{
                "value": url,
                "rule": {"required": true,"regexp":urlList},
                "msg": {"required": "url不能为空","regexp":"不符合url规则，多个请回车换行进行分隔"}
            });
        //}

    }

    /*componentWillUnmount() {
        console.log("hook==qingchu");
      /!*  const {index,h,i,thisForm,hook_event,url}=this.props;
        console.log(thisForm);
        console.log("qingchu");
        delArrformArrField(thisForm,index,hook_event[i].http_hook_name+"-name",h);
        delArrformArrField(thisForm,index,hook_event[i].http_hook_name+"-url",h);*!/
    }*/
    //新增hook
    addHookFn(currHook,curr,cType){
       // console.log(cType);
        const {dispatch}=this.props;
        var data={
            "name":"",
            "enabled":"on",
            "sync":"off",
            "url":""
        };
        dispatch(addHook(data,currHook,curr,cType));
    }
    editMsg(thisForm,index,fildeArr,filderIndex){
        for(var i=0;i<fildeArr.length;i++){
            editArrformArrFieldsMsg(thisForm,index,fildeArr[i],filderIndex,{ "isValider":true,"error":""});
        }

        //editArrformArrFieldsMsg(thisForm,index,`${currHook}-url`,fildeIndex,{ "isValider":true,"error":""})

    }
    render() {
        const {clmsConfig,channelConfig,dispatch,validator,index,h,i,gEnabled,hEnabled,thisForm,currHook}=this.props;
       // console.log(channelConfig[clmsConfig.configType].currIndex);
       // console.log(channelConfig[clmsConfig.configType]);
        var configType=clmsConfig.configType,
            channelConfigType=channelConfig[configType],
            channelData=channelConfigType.http_hook,
            currConfig=channelData[channelConfigType.currIndex];
        var hook=this.props;
        return (
            <tr>
                <td colSpan="3" style={{"padding":"0px"}}>
                    <table className="table table-bordered" style={{"marginBottom":"0px"}}>
                        <tbody>
                        <tr>
                            <td rowSpan="4" className="text-center" style={{"verticalAlign":"middle"}}>
                                hook
                                <div className="hook-btn">
                                    <i
                                        onClick={()=>this.addHookFn(i,index,configType)}
                                        className="iconfont green">&#xe61f;</i></div>
                                <div style={{"display":h==0?"none":"block"}}  className="hook-btn">
                                    <i
                                        onClick={()=>{
                                        delArrformArrField(thisForm,index,`${currHook}-name`,h);
                                        delArrformArrField(thisForm,index,`${currHook}-url`,h);
                                        dispatch(delHook(h,i,index,configType))}}
                                        className="iconfont red">&#xe61e;</i></div>
                            </td>
                            <td className="text-center">
                                <Tooltip placement="top" title="发送任务名称"><span>name</span></Tooltip>
                                </td>
                            <td style={{"width":"70%"}}>
                                <ValidateItem validator={validator} thisForm={thisForm} field={`${currHook}-name`} formType="arr" itemType="1" formIndex={index} index={h}>
                                    <input value={hook.name}
                                           onBlur={(e)=>hEnabled=="off"||gEnabled=="off"||hook.enabled=="off"?"":validateArrformArrField(thisForm,index,`${currHook}-name` ,e.target.value,h)}
                                           onChange={(e)=>{
                                       hEnabled=="off"||gEnabled=="off"||hook.enabled=="off"?"":
                                       validateArrformArrField(thisForm,index,`${currHook}-name` ,e.target.value,h)
                                       dispatch(editHook({"name":e.target.value},h,i,index,configType))
                                       }} className="form-control" />
                                </ValidateItem>

                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">
                                <Tooltip placement="top" title="开关"><span>enabled</span></Tooltip>
                            </td>
                            <td>
                                <Select style={{ width: "100%" }}
                                        onChange={(val)=>{dispatch(editHook({"enabled":val},h,i,index,configType))
                                        val=="off"?this.editMsg(thisForm,index,[`${currHook}-name`,`${currHook}-url`],h):""}}
                                        value={hook.enabled} >
                                    <Option value="on">on</Option>
                                    <Option value="off">off</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">
                                <Tooltip placement="top" title="同步开关"><span>sync</span></Tooltip>
                                </td>
                            <td>
                                <Select style={{ width: "100%" }}
                                        onChange={(val)=>dispatch(editHook({"sync":val},h,i,index,configType))}
                                        value={hook.sync} >
                                    <Option value="on">on</Option>
                                    <Option value="off">off</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">
                                <Tooltip placement="top" title="目的地址"><span>url</span></Tooltip>
                                </td>
                            <td>
                                <ValidateItem validator={validator} thisForm={thisForm} field={`${currHook}-url`} formType="arr"  itemType="1" formIndex={index} index={h}>
                                   <textarea value={hook.url}
                                             onBlur={(e)=>hEnabled=="off"||gEnabled=="off"||hook.enabled=="off"?"":validateArrformArrField(thisForm,index,`${currHook}-url` ,e.target.value,h)}
                                             onChange={(e)=>{
                                hEnabled=="off"||gEnabled=="off"||hook.enabled=="off"?"":
                                 validateArrformArrField(thisForm,index,`${currHook}-url` ,e.target.value,h)
                                dispatch(editHook({"url":e.target.value},h,i,index,configType))
                                }}  className="form-control" rows="3"></textarea>
                                </ValidateItem>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
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
export default connect(sel)(HookContent)