import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Radio,Select  } from 'antd';
import ValidateItem from "./Validate.item.js"
const RadioGroup = Radio.Group;
const Option = Select.Option;
//import $ from 'jquery';
import {getArrformArrField,delArrformArrField,getKeyField,delArrFieldFn} from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
class IpConfig extends Component {
   componentDidMount(){
        //console.log("ippp开始");
       // const {validator,topoItems,ipIndex,topoIndex,ip,operators,configIndex,ipType}=this.props;
       const {ipIndex,ip,ipType,thisForm}=this.props;
        // console.log(thisForm);
        if(ipType=="ipNeed"){
           // console.log(ipIndex+"ipIndex");
            getKeyField(thisForm,"defIp",ipIndex,{
                "value":ip,
                "rule": {"required": true},
                "msg": {"required": "默认IP不能为空！"}
            });
        }
    }
    /*  shouldComponentUpdate(nextProps){
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
     */
    componentWillUnmount() {
        //console.log(this.props.ipIndex);
        const {ipIndex,ip,ipType,thisForm,validator}=this.props;
        //console.log("ipp结束");
        if(ipType=="ipNeed"){
           // delArrformArrField("toposForm", this.props.topoIndex, "ip", this.props.ipIndex);
            if(!validator[thisForm]||!validator[thisForm].fields.defIp){
                return;
            }
            delArrFieldFn(thisForm,"defIp",ipIndex);
        }
        /*if(this.props.topoIndex!=undefined) {
            const {validator,topoIndex,ipIndex}=this.props;
            // console.log(validator.toposForm);
            if(!validator||!validator.toposForm||!validator.toposForm[topoIndex]||!validator.toposForm[topoIndex].fields||!validator.toposForm[topoIndex].fields["ip"]||!validator.toposForm[topoIndex].fields["ip"][ipIndex]){
                return;
            }
            delArrformArrField("toposForm", this.props.topoIndex, "ip", this.props.ipIndex);
        }*/
    }

    render() {
        const {ipIndex,lableName,ip,selectIpFn,type,thisForm,validator,ipType,iserror}=this.props;
        //console.log(iserror);
        return (
            <div className="form-group">
                {ipIndex==0?<label className="col-xs-2 control-label">{lableName}：</label>:""}
                <div className={ipIndex==0?"col-xs-5":"col-xs-5 col-xs-offset-2"}>
                        <div>
                            { /*<select data-name="ip" value={this.props.ip} onChange={this.props.selectTopoIpFn} className="form-control">
                                <option value="">请选择</option>
                                {this.props.ips?this.props.ips.map((item,index)=>
                                        <option key={index} value={item.ip}>{item.ip}</option>
                                ):""}
                            </select>*/}
                            {ipType=="ipNeed"?
                                <ValidateItem validator={validator} thisForm={thisForm} index={ipIndex}  itemType="1" field="defIp">
                                    <input  value={ip} className="form-control" onChange={(e)=>selectIpFn("ip",e.target.value)} />
                                </ValidateItem>
                                :
                                <div className={!iserror?"":"has-error"}>
                                    <input  value={ip} className="form-control" onChange={(e)=>selectIpFn("ip",e.target.value)} />
                                    {!iserror?"":<div>{"IP不能为空！"
                                    }</div>}
                                </div>
                            }

                            {/*<Select value={ip} style={{ width: "100%" }} onChange={(val)=>selectIpFn("ip",val)}>
                                <Option value="127.0.0.1">127.0.0.1</Option>
                                <Option value="127.0.0.2">127.0.0.2</Option>
                            </Select>*/}
                        </div>
                </div>
                <div className="col-xs-3" style={{"paddingRight":"0px","lineHeight":"32px"}}>
                    <RadioGroup size="large" onChange={(e)=>selectIpFn("type",e.target.value)} value={!type?"ip_back":type}>
                        <Radio key="a" value="ip_main">主</Radio>
                        <Radio key="b" value="ip_back">备</Radio>
                    </RadioGroup>
                    {/*<input checked={this.props.type=="ip_main"?true:false}   onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name} value="ip_main" type="radio"/>
                    <label className="mr10">主</label>
                    <input checked={this.props.type!="ip_main"?true:false}   onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name} value="ip_back" type="radio"/>
                    <label>备</label>*/}

                    {/* validateArrformArrField("toposForm",topoIndex,name,e.target.value,ipIndex);  <RadioGroup onChange={this.props.selectTopoIpFn} data-name="type" name={this.props.name}>
                     <Radio key="main" value="ip_main">主</Radio>
                     <Radio key="back" value="ip_back">备</Radio>
                     </RadioGroup>*/}
                </div>
                <div className="col-xs-2 g-posAbs">
                    <i className="glyphicon glyphicon-plus green mr10" onClick={this.props.addDefaultFn}></i>
                    {
                        this.props.ipIndex != "0" ?
                            <i className="glyphicon glyphicon-remove red"
                               onClick={this.props.removeDefaultFn}></i> : ""
                    }

                </div>
            </div>
        )
    }
}
function sel(state) {
    //console.log(state);
    return {
        validator:state.validator_1
    }
}
export default connect(sel)(IpConfig)
