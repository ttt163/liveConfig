import React, {
    Component,
    PropTypes
    } from 'react'
import { connect } from 'react-redux'
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
import $ from 'jquery';
import {getArrformArrField,delArrformArrField} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
class Ipcomp extends Component {
    componentDidMount(){
        //console.log("ippp开始");
        const {validator,topoItems,ipIndex,topoIndex,ip,operators,configIndex,ipType}=this.props;
       // console.log(ipType);
        if(ipType=="ipTopo"){
            getArrformArrField("toposForm",topoIndex,"ip",ipIndex,{
                "value": !ip?"":ip,
                "rule": {"required": true},
                "msg": {"required": "默认IP不能为空"}
            });
        }
    }
    shouldComponentUpdate(nextProps){
        const {validator,topoItems,ipIndex,topoIndex,ip,ipType}=nextProps;
        if(ipType=="ipTopo"){
            getArrformArrField("toposForm",topoIndex,"ip",ipIndex,{
                "value": !ip?"":ip,
                "rule": {"required": true},
                "msg": {"required": "默认IP不能为空"}
            });
        }
        return true;
    }
    componentWillUnmount() {
        //console.log(this.props.ipIndex);
        //console.log("ippppppp");
        if(this.props.topoIndex!=undefined) {
            const {validator,topoIndex,ipIndex}=this.props;
           // console.log(validator.toposForm);
            if(!validator||!validator.toposForm||!validator.toposForm[topoIndex]||!validator.toposForm[topoIndex].fields||!validator.toposForm[topoIndex].fields["ip"]||!validator.toposForm[topoIndex].fields["ip"][ipIndex]){
                return;
            }
            delArrformArrField("toposForm", this.props.topoIndex, "ip", this.props.ipIndex);
        }
    }

    render() {
        //console.log("111");
        //console.log(this.props);
        //const {validator,topoIndex,ipIndex}=this.props;
        const {validator,topoItems,ipIndex,topoIndex,ip,operators,configIndex,ipType,iserror}=this.props;
        return (
            <div className="form-group">
                {ipIndex==0?<label className="col-xs-3">{this.props.lableName}：</label>:""}
                <div className={ipIndex==0?"col-xs-5":"col-xs-5 col-xs-offset-3"}>
                    {ipType=="ipTopo"?
                        <ValidateItem validator={validator} thisForm="toposForm" formType="arr" index={ipIndex} formIndex={topoIndex} itemType="1" field="ip">
                            <select data-name="ip" value={this.props.ip} onChange={this.props.selectTopoIpFn} className="form-control">
                                <option value="">请选择</option>
                                {this.props.ips?this.props.ips.map((item,index)=>
                                        <option key={index} value={item.ip}>{item.ip}</option>
                                ):""}
                            </select>
                        </ValidateItem>
                        :
                        <div className={!iserror?"":"has-error"}>
                            <select data-name="ip" value={this.props.ip} onChange={this.props.selectTopoIpFn} className="form-control">
                                <option value="">请选择</option>
                                {this.props.ips?this.props.ips.map((item,index)=>
                                        <option key={index} value={item.ip}>{item.ip}</option>
                                ):""}
                            </select>
                            {!iserror?"":<div>{ipType=="config"?"默认IP不能为空！":"IP地址不能为空！"}</div>}

                        </div>

                    }


                </div>
                <div className="col-xs-2" style={{"paddingRight":"0px"}}>
                    <input checked={this.props.type=="ip_main"?true:false}   onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name} value="ip_main" type="radio"/>
                    <label className="mr10">主</label>
                    <input checked={this.props.type!="ip_main"?true:false}   onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name} value="ip_back" type="radio"/>
                    <label>备</label>

                    {/* validateArrformArrField("toposForm",topoIndex,name,e.target.value,ipIndex);  <RadioGroup onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name}>
                     <Radio key="main" value="ip_main">主</Radio>
                     <Radio key="back" value="ip_back">备</Radio>
                     </RadioGroup>*/}
                </div>
                <div className="col-xs-2 g-posAbs">
                    <i className="glyphicon glyphicon-plus green" onClick={this.props.addDefaultFn}></i>
                    {
                        this.props.ipIndex != "0" ?
                            <i className="glyphicon glyphicon-remove red"
                               onClick={this.props.removeDefaultFn}></i> : ""
                    }

                </div>
            </div>
        )
        {/* if(this.props.ipIndex == 0 ) {
            return (
                <div className="form-group">
                    <label className="col-xs-3">{this.props.lableName}：</label>
                    <div className="col-xs-5">

                        <ValidateItem validator={validator} thisForm="toposForm" formType="arr" index={ipIndex} formIndex={topoIndex} itemType="1" field="ip">
                            <select data-name="ip" value={this.props.ip} onChange={this.props.selectTopoIpFn} className="form-control">
                                <option value="">请选择</option>
                                {this.props.ips?this.props.ips.map((item,index)=>
                                        <option key={index} value={item.ip}>{item.ip}</option>
                                ):""}
                            </select>
                        </ValidateItem>

                    </div>
                    <div className="col-xs-2" style={{"paddingRight":"0px"}}>
                        <input checked={this.props.type=="ip_main"?true:false}   onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name} value="ip_main" type="radio"/>
                        <label className="mr10">主</label>
                        <input checked={this.props.type!="ip_main"?true:false}   onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name} value="ip_back" type="radio"/>
                        <label>备</label>

                        {/!* validateArrformArrField("toposForm",topoIndex,name,e.target.value,ipIndex);  <RadioGroup onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name}>
                            <Radio key="main" value="ip_main">主</Radio>
                            <Radio key="back" value="ip_back">备</Radio>
                        </RadioGroup>*!/}
                    </div>
                    <div className="col-xs-2 g-posAbs">
                        <i className="glyphicon glyphicon-plus green" onClick={this.props.addDefaultFn}></i>
                        {
                            this.props.ipIndex != "0" ?
                                <i className="glyphicon glyphicon-remove red"
                                   onClick={this.props.removeDefaultFn}></i> : ""
                        }

                    </div>
                </div>
            )
        }else{
        return (
            <div className="form-group">
                <div className="col-xs-5 col-xs-offset-3">
                    <ValidateItem validator={validator} thisForm="toposForm" index={ipIndex} formType="arr" formIndex={topoIndex} itemType="1" field="ip">
                        <select data-name="ip" value={this.props.ip} onChange={this.props.selectTopoIpFn} className="form-control">
                            <option value="">请选择</option>
                            {this.props.ips?this.props.ips.map((item,index)=>
                                    <option key={index} value={item.ip}>{item.ip}</option>
                            ):""}
                        </select>
                    </ValidateItem>

                </div>
                <div className="col-xs-2">
                    <input checked={this.props.type=="ip_main"?true:false}  onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name}
                           value="ip_main" type="radio"/><label className="mr10">主</label>
                    <input checked={this.props.type!="ip_main"?true:false}  onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name}
                           value="ip_back" type="radio"/><label>备</label>
                </div>
                <div className="col-xs-2 g-posAbs">
                    <i className="glyphicon glyphicon-plus green" onClick={this.props.addDefaultFn}></i>
                    {
                        this.props.ipIndex != "0" ?
                            <i className="glyphicon glyphicon-remove red" onClick={this.props.removeDefaultFn}></i> : ""
                    }

                </div>
            </div>

        )
            }*/}
    }
}
function sel(state) {
     //console.log(state);
    return {
        topoItems: state.topos.topoItems,
        validator:state.validator_1,
        //topology_info:state.topos.topoItems.topology_info,
        currIndex: state.topos.currIndex
    }
}
export default connect(sel)(Ipcomp)