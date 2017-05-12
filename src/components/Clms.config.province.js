import React, {
  Component,
  PropTypes
} from 'react'
import { connect } from 'react-redux'
import IpConfig from "./Clms.config.ipConfig.js"
import {editConfigProvince,addConfigProvince,delConfigProvince,addConfigProvIp,delConfigProvIp,editConfigProvIp} from "../actions/clmsConfigActions.js"
import { Select } from 'antd';
const Option = Select.Option;
import { proviceOption } from '../containers/Device.js';
import {PROVICES } from '../config.js';
export var proOpt=[],proArr={};
class ProvinceConfig extends Component {
    componentWillMount(){
      //  console.log(this.props);
       /* const {topoIndex,topoItems,province,configIndex}=this.props;
        var thisTopo=topoItems[topoIndex],thisIpConfig=thisTopo.topology_info.ipConfig[configIndex],provinces=thisIpConfig.provinces;
        if(!provinces){
            return;
        }*/
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
       /* const {topoIndex,topoItems,province,configIndex}=nextProps;
        var thisTopo=topoItems[topoIndex],thisIpConfig=thisTopo.topology_info.ipConfig[configIndex],provinces=thisIpConfig.provinces;
        if(!provinces){
            return;
        }*/
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
        return true;
    }
    //省份添加，删除
    addProvince(configType){
        const {dispatch,porvIndex,configIndex}=this.props;
        var data={
            "province": "",
            "Ipinfo": [{ip: "", type: ""}]
        };
        dispatch(addConfigProvince(data,configIndex,configType));
    }
    editProvince(val,name,configType){
        const {dispatch,porvIndex,configIndex}=this.props;
        var data={[name]:val};
        dispatch(editConfigProvince(data,porvIndex,configIndex,configType));
    }
    delProvince(configType){
        const {dispatch,porvIndex,configIndex}=this.props;
        dispatch(delConfigProvince(porvIndex,configIndex,configType));
    }
    //IP地址
    addProvIp(configType){
        const {dispatch,porvIndex,configIndex}=this.props;
        var data={ip:"",type:""};
        dispatch(addConfigProvIp(data,porvIndex,configIndex,configType))
    }
    removeProvIp(index,configType){
         //console.log(this.props.porvIndex);
        const {dispatch,porvIndex,configIndex}=this.props;
        dispatch(delConfigProvIp(index,porvIndex,configIndex,configType));
    }
    editProvIp(name,value,index,configType){
       // console.log(this.props);
        const {dispatch,porvIndex,configIndex,operators,province}=this.props;
        /*const {operators,province,topoIndex,configIndex,dispatch,porvIndex}=this.props;
        var name=e.target.getAttribute("data-name"), val=e.target.value;
        if(name=="ip"){
            if(operators&&province&&!val){

                this.props.dispatch(editProvIp({[name]:val,"iserror":true},topoIndex,configIndex,porvIndex,index));

            }else{
                this.props.dispatch(editProvIp({[name]:val,"iserror":false},topoIndex,configIndex,porvIndex,index));

            }
            return;

        }*/
        if(name=="ip"){
           // var ipRg=/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if(!operators||!province){
                dispatch(editConfigProvIp({[name]:value,"iserror":false},index,porvIndex,configIndex,configType));

            }else{
                if(!value){
                    dispatch(editConfigProvIp({[name]:value,"iserror":true},index,porvIndex,configIndex,configType))
                }else{
                    dispatch(editConfigProvIp({[name]:value,"iserror":false},index,porvIndex,configIndex,configType));
                }

            }
            return;

        }
        dispatch(editConfigProvIp({[name]:value},index,porvIndex,configIndex,configType));
    }
  render() {
      const { clmsConfig,configIndex,porvIndex,province,Ipinfo} = this.props;
      var ipData=Ipinfo;
      var configType=clmsConfig.configType,_thisConfigData=clmsConfig[configType];
      //console.log(this.props);
    return (
        <div className="g-prov">
            <div className="form-group">
                <label className="col-xs-2 control-label">省份：</label>
                <div className="col-xs-5">
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={(val)=>this.editProvince(val,"province",configType)}
                        notFoundContent="无搜索结果！"
                        value={province}
                        >
                        {/*proviceOption*/}
                        <Option value="">请选择</Option>
                        {proOpt}
                    </Select>
                </div>
                <div className="col-xs-2 g-posAbs">
                    <i className="glyphicon glyphicon-plus green mr10" onClick={()=>this.addProvince(configType)}></i>
                    {porvIndex!=0?
                        <i className="glyphicon glyphicon-remove red" onClick={()=>this.delProvince(configType)}></i>
                        :""
                    }

                </div>
            </div>
            {/*IP-com*/}
            {!ipData?"":
                ipData.map((item,index)=>
                        <IpConfig lableName="IP地址" key={index} ipIndex={index} {...item}
                                  selectIpFn={(name,value)=>this.editProvIp(name,value,index,configType)}
                                  addDefaultFn={()=>this.addProvIp(configType)}
                                  removeDefaultFn={()=>this.removeProvIp(index,configType)}
                            />
                )
            }

        </div>
    )
  }
}
function sel(state) {
    //console.log(state);
    return {"clmsConfig": state.clmsConfig, validator: state.validator_1}
}
export default connect(sel)(ProvinceConfig)