import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { editProvData,addProv,delProv,editProvIp,addProvIp,delProvIp,clearProvIp} from '../actions/proxyActions.js'
import {ShowDiag,addOperation} from  "../public/js/f.js"
import {PROVICES } from '../config.js';
//import {addValidate} from "../public/js/validate/action.js"
//import {getForm,getFields,getFormFields,clearFormData,delFormsFn} from "../public/js/validate/validateRform.js"
import { Select  } from 'antd';
//import {ipArr,getDevIps} from "../containers/Proxy.js"
import ProvIpConfig from "./Proxy.prov.ip.js"
const Option = Select.Option;
export var proOpt=[],proArr={};
//import {getArrformArrField,getArrForm } from "../public/js/validate/validateRform.js"
import {getArrForm,getArrFormFields,validateArrformField,getArrformArrField ,validateArrformAllFields,delArrFormFn} from "../public/js/validate/validateRform.js"

import ValidateItem from "./Validate.item.js"
class ProvConfig extends React.Component {
    componentDidMount() {
        const {dispatch,province,Ipinfo,index,provIndex,isp,provinces}=this.props;
        getArrForm("porxy"+index+"-proviceform", provIndex);
        getArrFormFields("porxy"+index+"-proviceform", provIndex, {
            "province": {
                "value": province,
                "rule": {"required": true},
                "msg": {"required": "省份不能为空！"}
            }
        })
        /*getArrForm("porxyform", index);
        getArrformArrField("porxyform",index,"province",provIndex ,{
            "value": province,
            "rule": {"required": true},
            "msg": {"required": "省份不能为空！"}
        })*/
    }
    componentWillMount(){
        const {provinces,province}=this.props;
        proArr=Object.assign({}, PROVICES);
        for(var i=0;i<provinces.length;i++){
            for (var [k,v] of Object.entries(proArr)) {
                //if(k==ipConfig[i].operators&&i!=configIndex){
                if(k==provinces[i].province&&k!=province){
                    delete proArr[k];
                    break;
                }
            }
        }
        proOpt=[];
        for (var [k,v] of Object.entries(proArr)) {
            proOpt.push(<Option key={k}>{v}</Option>);
        }
    }
    shouldComponentUpdate(nextProps){
        const {provinces,province,dispatch,isp}=nextProps;
        proArr=Object.assign({}, PROVICES);
        for(var i=0;i<provinces.length;i++){
            for (var [k,v] of Object.entries(proArr)) {
                //if(k==ipConfig[i].operators&&i!=configIndex){
                if(k==provinces[i].province&&k!=province){
                    delete proArr[k];
                    break;
                }
            }
        }
        proOpt=[];
        for (var [k,v] of Object.entries(proArr)) {
            proOpt.push(<Option key={k}>{v}</Option>);
        }
        return true;
    }
    changeProv(val){
        const {dispatch,index,provIndex}=this.props;
        dispatch(editProvData({"province": val},provIndex,index));
    }
    componentWillUnmount() {
        const {dispatch,province,Ipinfo,index,provIndex,isp,provinces}=this.props;
        delArrFormFn("porxy"+index+"-proviceform",provIndex);
    }
    render() {
        const {dispatch,province,Ipinfo,index,provIndex,isp,provinces,validator}=this.props;
        return (
            <div className="prov-box">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label className="col-xs-2 control-label">省份：</label>
                            <div className="col-xs-8">
                                <ValidateItem validator={validator} thisForm={"porxy"+index+"-proviceform"} field="province" formType="arr" formIndex={provIndex}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="请选择"
                                        optionFilterProp="children"
                                        notFoundContent="无搜索结果！"
                                        value={province}
                                        onChange={(val)=>{this.changeProv(val);validateArrformField("porxy"+index+"-proviceform","province",val,provIndex)}}
                                        >
                                        <Option value="">请选择</Option>
                                        {proOpt}
                                    </Select>
                                </ValidateItem>

                            </div>
                            <div className="col-xs-2" style={{"lineHeight":"30px"}}>
                                <i className="glyphicon glyphicon-plus green mr10"
                                   onClick={()=>dispatch(addProv({"province": "","Ipinfo": [{ip: ""}]},index))}></i>
                                {provIndex==0?"":
                                    <i className="glyphicon glyphicon-remove red"
                                       onClick={()=>dispatch(delProv(provIndex,index))}
                                        ></i>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        {Ipinfo.map((item,ipIndex)=>
                            <ProvIpConfig {...item}
                                thisForm={"porxy"+index+"-proviceform"}
                                index={index}
                                provIndex={provIndex}
                                ipIndex={ipIndex}
                                isp={isp}
                                provinces={provinces}
                                Ipinfo={Ipinfo}
                                key={ipIndex}  />
                        )}

                    </div>
                </div>
            </div>
        )
    }


}
function sel(state) {
    //console.log(state);
    //console.log(state.todos1);
    return {proxyDev: state.proxyDev,validator:state.validator_1}

}
export default connect(sel)(ProvConfig)
