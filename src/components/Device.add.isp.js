import React, {Component,PropTypes} from 'react'
import { OPERATORS } from '../config.js';
import {validateField,getFields,getKeyField,validateArrField} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import { Select } from 'antd';
const Option = Select.Option;
//const ispOption=[];
export default class AddIsp extends Component {
    componentDidMount() {
        const {validator,thisForm,index}=this.props;
        //console.log(this.props.ip);
        getKeyField(thisForm,"ip",index,{
            "value":this.props.ip,
            "rule": {"required": true,"repeatd":true,"regexp":/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/},
            "msg": {"required": "ip不能为空","repeatd":"IP地址重复","regexp": "ip格式错误！"}
        });
        getKeyField(thisForm,"isp",index,{
            "value":this.props.isp,
            "rule": {"required": true},
            "msg": {"required": "运营商不能为空"}
        });

    }
    componentWillReceiveProps(){
        //console.log("qqqqq");
        const {validator,thisForm,index}=this.props;
        //console.log(this.props.index);
        /*if(!this.props.ip){
            getKeyField(thisForm,"ip",index,{
                "value":this.props.ip,
                "rule": {"required": true,"regexp":/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/},
                "msg": {"required": "ip不能为空","regexp": "ip格式错误！"}
            });
        }else{
            getKeyField(thisForm,"ip",index,{
                "value":this.props.ip,
                "rule": {"disable": true},
                "msg": {"disable": ""}
            });
        }*/
        //console.log(this.props.ip);
        getKeyField(thisForm,"ip",index,{
            "value":this.props.ip,
            "rule": {"required": true,"repeatd":true,"regexp":/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/},
            "msg": {"required": "ip不能为空","repeatd":"IP地址重复","regexp": "ip格式错误！"}
        });

        getKeyField(thisForm,"isp",index,{
            "value":this.props.isp,
            "rule": {"required": true},
            "msg": {"required": "运营商不能为空"}
        });
    }
    componentWillUnmount() {
       // console.log("xxxx");
    }
    render() {
        const {validator,thisForm,index}=this.props;
        //console.log(this.props.index);
       /* getKeyField(thisForm,"ip",index,{
            "value":this.props.ip,
            "rule": {"required": true,"regexp": /[0-9]+$/},
            "msg": {"required": "ip不能为空","regexp": "ip格式错误！"}
        });
        getKeyField(thisForm,"isp",index,{
            "value":this.props.isp,
            "rule": {"required": true},
            "msg": {"required": "运营商不能为空"}
        });*/
        return (
            <tr>
                <td className="form-res">
                    <div className="f-resValidate">
                        <ValidateItem validator={validator} thisForm={thisForm} field="ip" index={index} itemType="1">
                            <input type="text" disabled={thisForm=="editDevice"?true:false}  onBlur={()=>validateArrField(thisForm,"ip",this.props.ip,index)} value={this.props.ip} onChange={this.props.editIpsDataFn}  className="form-control devip-item" name={"dev-ip-"+this.props.index}/>
                        </ValidateItem>
                        {/*<div className={!validator||!validator[thisForm]||!validator[thisForm].valideMsg||!validator[thisForm].valideMsg["ip"]||!validator[thisForm].valideMsg["ip"][this.props.index]||validator[thisForm].valideMsg["ip"][this.props.index].isValider?"":"has-error"}>
                            <input type="text" value={this.props.ip} onChange={this.props.editIpsDataFn}  className="form-control devip-item" name={"dev-ip-"+this.props.index}/>
                            <div style={{"textAlign":"left"}}>{!validator||!validator[thisForm]||!validator[thisForm].valideMsg||!validator[thisForm].valideMsg["ip"]||!validator[thisForm].valideMsg["ip"][this.props.index]||validator[thisForm].valideMsg["ip"][this.props.index].isValider?"":validator[thisForm].valideMsg["ip"][this.props.index].error}</div>
                        </div>*/}

                    </div>
                </td>
                <td className="form-res"  style={{ "textAlign": 'left' }}>
                    <div className="posRelative f-resValidate">
                        <ValidateItem validator={validator} thisForm={thisForm} field="isp" index={index} itemType="1">
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={(val)=>this.props.editSelectIspFn(val,"isp")}
                                notFoundContent="无搜索结果！"
                                value={this.props.isp}
                                >
                                {this.props.ispOption}
                            </Select>
                        </ValidateItem>
                        { /*<Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            onChange={(val)=>this.props.editSelectIspFn(val,"isp")}
                            notFoundContent="无搜索结果！"
                            value={this.props.isp}
                            >
                            {this.props.ispOption}
                        </Select>*/}
                        {/* <select value={this.props.isp} onChange={this.props.editIpsDataFn} name={"dev-isp-"+this.props.index} className="f-isp form-control" data-rule-required="true"  data-msg-required="请选择运营商">
                            <option value=''>请选择</option>
                            <option value='1'>中国移动</option>
                            <option value='2'>中国联通</option>
                            <option value='3'>中国电信</option>
                        </select>*/}
                        <label className="control-label textLeft f-cnladd posAbs" style={{"display":thisForm=="editDevice"?"none":"block"}}>
                            <span onClick={this.props.addIspFn} className="glyphicon glyphicon-plus f-cnladdBtn" style={{'display':'inline-block',"marginRight":"6px"}}></span>
                            {this.props.index==0?"": <span onClick={this.props.delIspFn} className="glyphicon glyphicon-remove f-cnldelBtn"></span>}
                        </label>
                    </div>
                </td>
            </tr>
        )
    }
}
