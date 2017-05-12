import React, {Component} from 'react'
import { connect } from 'react-redux'
import IpConfig from "./Clms.config.ipConfig.js"
import ProvinceConfig from "./Clms.config.province.js"
//import { removeIpConfig,editConfigData,addConfigDefultIp,removeConfigDefultIp,editConfigDefultIp,addProvince} from '../actions/devGoupActions.js'
import {addOperatConfigData,delOperatConfigData,editOperatConfigData,editOprIpConfigData,addIpOprConfigData,delIpOprConfigData} from "../actions/clmsConfigActions.js"
import { Select } from 'antd';
const Option = Select.Option;
//import { ispOption } from '../containers/Device.js';
import {OPERATORS } from '../config.js';
export var ispOpt=[],ispArr={};
class OperatConfig extends Component {
    /*componentDidMount() {
        //console.log("3333");
        const {provinces,dispatch,topoIndex,configIndex,topoItems,operators}=this.props;
        if(!provinces||!provinces.length){
            var data={
                "province": "",
                "Ipinfo": [{ip: "", type: ""}]
            };
            dispatch(addProvince(data,topoIndex,configIndex));
        }
    }*/
    componentWillMount(){
        const {ipConfig,operators}=this.props;
        ispArr=Object.assign({}, OPERATORS);
        for(var i=0;i<ipConfig.length;i++){
            for (var [k,v] of Object.entries(ispArr)) {
                //if(k==ipConfig[i].operators&&i!=configIndex){
                if(k==ipConfig[i].operators&&k!=operators){
                    delete ispArr[k];
                    break;
                }
            }
        }
        ispOpt=[];
        for (var [k,v] of Object.entries(ispArr)) {
            ispOpt.push(<Option key={k}>{v}</Option>);
        }
    }
    /*componentWillReceiveProps(nextProps){
        const {provinces,dispatch,topoIndex,configIndex}=nextProps;
        if(!provinces||!provinces.length){
            var data={
                "province": "",
                "Ipinfo": [{ip: "", type: ""}]
            };
            dispatch(addProvince(data,topoIndex,configIndex));
        }

    }*/
    shouldComponentUpdate(nextProps){
        const {ipConfig,operators}=this.props;
        ispArr=Object.assign({}, OPERATORS);
        for(var i=0;i<ipConfig.length;i++){
            for (var [k,v] of Object.entries(ispArr)) {
                if(k==ipConfig[i].operators&&k!=operators){
                    delete ispArr[k];
                    break;
                }
            }
        }
        ispOpt=[];
        for (var [k,v] of Object.entries(ispArr)) {
            ispOpt.push(<Option key={k}>{v}</Option>);
        }
        return true;
    }
    //运营商
    addOperatConfig(){
        const {clmsConfig,dispatch}=this.props;
        var configType=clmsConfig.configType;
        var data={
            "operators": "",
            "default": [{ip: "", type: ""}],
            "provinces": [
                {
                    "province": "",
                    "Ipinfo": [{ip: "", type: ""}]
                }
            ]
        };
        dispatch(addOperatConfigData(data,configType));
    }
    removeOperatConfig(index){
        const {clmsConfig,dispatch}=this.props;
        var configType=clmsConfig.configType;
        dispatch(delOperatConfigData(index,configType));
    }
    editOperatConfig(val,name,index,ctype){
        const {dispatch,operators}=this.props;
       // dispatch(editOperatConfigData({[name]:val},index,ctype));
        dispatch(editOperatConfigData({[name]:val},index,ctype));
    }

    //ip
    editOprIpData(name,value,index,configIndex,configType){
        const {dispatch,operators}=this.props;
        if(name=="ip"){
            //var ipRg=/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if(!operators){
                dispatch(editOprIpConfigData({[name]:value,"iserror":false},index,configIndex,configType));
            }else{
                if(!value){
                    dispatch(editOprIpConfigData({[name]:value,"iserror":true},index,configIndex,configType));
                }else{
                    dispatch(editOprIpConfigData({[name]:value,"iserror":false},index,configIndex,configType));
                }
            }
            return;

        }
        dispatch(editOprIpConfigData({[name]:value},index,configIndex,configType));
    }
    addOprDefault(configIndex,configType){
        const {dispatch}=this.props;
        var data={"ip":"","type":""};
        dispatch(addIpOprConfigData(data,configIndex,configType));
    }
    removeOprDefault(index,configIndex,configType){
        const {dispatch}=this.props;
       dispatch(delIpOprConfigData(index,configIndex,configType));
    }
  render() {
      const {clmsConfig,operators,provinces,configIndex,ipConfig,dispatch,validator}=this.props;
      var ipData=this.props.default;
      var configType=clmsConfig.configType,_thisConfigData=clmsConfig[configType];
    return (
      <div className="g-config" style={{"marginBottom":configIndex!=ipConfig.length-1?"30px":"0px"}}>
          <div className="form-group">
              <label className="col-xs-2 control-label">运营商：</label>
              <div className="col-xs-5">
                  <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="请选择"
                      optionFilterProp="children"
                      onChange={(val)=>this.editOperatConfig(val,"operators",configIndex,configType)}
                      notFoundContent="无搜索结果！"
                      value={operators}
                      >
                      {/*ispOption*/}
                      <Option value="">请选择</Option>
                      {ispOpt}
                  </Select>
              </div>
              <div  className="col-xs-2 g-posAbs">
                  <i className="glyphicon glyphicon-plus green mr10" onClick={()=>this.addOperatConfig()}></i>
                  {configIndex!=0?
                      <i className="glyphicon glyphicon-remove red" onClick={()=>this.removeOperatConfig(configIndex)}></i>
                      :""}
              </div>
          </div>
          {/*默认ip-comp*/}
          {!ipData?"":
              ipData.map((item,index)=>
                      <IpConfig lableName="默认" key={index} ipIndex={index} {...item}
                                selectIpFn={(name,value)=>this.editOprIpData(name,value,index,configIndex,configType)}
                                addDefaultFn={()=>this.addOprDefault(configIndex,configType)}
                                removeDefaultFn={()=>this.removeOprDefault(index,configIndex,configType)}
                          />
              )
          }
          {/*省份*/}
          {
              !provinces?"":
              provinces.map((item,index)=>
                      <ProvinceConfig  {...item} key={index }
                                                 provinces={provinces}
                                                 operators={operators} porvIndex={index} configIndex={configIndex}  />
              )
          }

      </div>
    )
  }
}
function sel(state) {
   // console.log(state);
    return {"clmsConfig": state.clmsConfig, validator: state.validator_1}
}
export default connect(sel)(OperatConfig)