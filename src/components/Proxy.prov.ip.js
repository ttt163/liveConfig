import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { editProvIp,addProvIp,delProvIp} from '../actions/proxyActions.js'
//import {ShowDiag,addOperation} from  "../public/js/f.js"
//import {PROVICES } from '../config.js';
//import {addValidate} from "../public/js/validate/action.js"
//import {getForm,getFields,getFormFields,clearFormData,delFormsFn} from "../public/js/validate/validateRform.js"
import { Select  } from 'antd';
import {getDevIps} from "../containers/Proxy.js"
import {getArrformArrField,getArrForm,validateArrformArrField ,delArrformArrField} from "../public/js/validate/validateRform.js";
import ValidateItem from "./Validate.item.js";
const Option = Select.Option;
export var ips = [], ipArr = [];
class ProvIpConfig extends React.Component {
    componentWillMount() {
        const {Ipinfo,ipIndex}=this.props;
        ipArr = getDevIps({"role": "4"});
        for (var i = 0; i < Ipinfo.length; i++) {
            for (var j = 0; j < ipArr.length; j++) {
                if (Ipinfo[i].ip == ipArr[j] && i != ipIndex) {
                    ipArr = [
                        ...ipArr.slice(0, j),
                        ...ipArr.slice(j + 1)
                    ]
                }
            }
        }
        ips = [];
        for (var i = 0; i < ipArr.length; i++) {
            ips.push(<Option key={ipArr[i]}>{ipArr[i]}</Option>);
        }
    }
    componentDidMount() {
        const {dispatch,index,provIndex,ipIndex,ip,thisForm}=this.props;
        getArrForm(thisForm, provIndex);
         getArrformArrField(thisForm,provIndex,"ip",ipIndex ,{
         "value": ip,
         "rule": {"required": true},
         "msg": {"required": "ip不能为空！"}
         })
    }
    shouldComponentUpdate(nextProps) {
        const {Ipinfo,ipIndex,ip}=nextProps;
            ipArr = getDevIps({"role": "4"});
            for (var i = 0; i < Ipinfo.length; i++) {
                for (var j = 0; j < ipArr.length; j++) {
                    //if (Ipinfo[i].ip == ipArr[j] && Ipinfo[i].ip != ip) {
                    if (Ipinfo[i].ip == ipArr[j] && i != ipIndex) {
                        ipArr = [
                            ...ipArr.slice(0, j),
                            ...ipArr.slice(j + 1)
                        ]
                    }
                }
            }
            ips = [];
            for (var i = 0; i < ipArr.length; i++) {
                ips.push(<Option key={ipArr[i]}>{ipArr[i]}</Option>);
            }
        return true
    }
    componentWillUnmount() {
        const {dispatch,index,provIndex,ipIndex,ip,thisForm}=this.props;
        delArrformArrField(thisForm,provIndex,"ip",ipIndex);
    }
    render() {
        const {dispatch,index,provIndex,ipIndex,ip,thisForm,validator}=this.props;
        return (
            <div className="form-group">
                <label className="col-xs-2 control-label">{ipIndex == 0 ? "IP地址：" : ""}</label>

                <div className="col-xs-8">
                    <ValidateItem validator={validator} thisForm={thisForm} field="ip" formType="arr" formIndex={provIndex} itemType="1" index={ipIndex}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            notFoundContent="无搜索结果！"
                            value={ip}
                            onChange={(val)=>{dispatch(editProvIp({"ip":val},ipIndex,provIndex,index));validateArrformArrField(thisForm,provIndex,"ip",val,ipIndex)}}
                            >
                            <Option value="">请选择</Option>
                            {ips}
                        </Select>
                    </ValidateItem>

                </div>
                <div className="col-xs-2" style={{"lineHeight":"30px"}}>
                    <i className="glyphicon glyphicon-plus green mr10"
                       onClick={()=>dispatch(addProvIp({"ip": ""},provIndex,index))}
                        ></i>
                    {ipIndex == 0 ? "" :
                        <i className="glyphicon glyphicon-remove red"
                           onClick={()=>dispatch(delProvIp(ipIndex,provIndex,index))}
                            ></i>
                    }
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
export default connect(sel)(ProvIpConfig)
