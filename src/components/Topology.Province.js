import React, {
  Component,
  PropTypes
} from 'react'
import { connect } from 'react-redux'
import Ipcomp from "./Topology.ipcomp.js"
import { addProvince,editProvince,delProvince,addProvIp,removeProvIp,editProvIp} from '../actions/devGoupActions.js'
import { Select } from 'antd';
const Option = Select.Option;
import { proviceOption } from '../containers/Device.js';
import {PROVICES } from '../config.js';
export var proOpt=[],proArr={};
class Province extends Component {
    componentWillMount(){
      //  console.log(this.props);
        const {topoIndex,topoItems,province,configIndex}=this.props;
        var thisTopo=topoItems[topoIndex],thisIpConfig=thisTopo.topology_info.ipConfig[configIndex],provinces=thisIpConfig.provinces;
        if(!provinces){
            return;
        }
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
        const {topoIndex,topoItems,province,configIndex}=nextProps;
        var thisTopo=topoItems[topoIndex],thisIpConfig=thisTopo.topology_info.ipConfig[configIndex],provinces=thisIpConfig.provinces;
        if(!provinces){
            return;
        }
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
    addProvince(){
        var data={
            "province": "",
            "Ipinfo": [{ip: "", type: ""}]
        };
        this.props.dispatch(addProvince(data,this.props.topoIndex,this.props.configIndex));
        //console.log(this.props);
    }
    editProvince(val,name){
        var data={"province":val};
        this.props.dispatch(editProvince(data,this.props.topoIndex,this.props.configIndex,this.props.porvIndex))
    }
    delProvince(){
        this.props.dispatch(delProvince(this.props.topoIndex,this.props.configIndex,this.props.porvIndex))
    }
    //IP地址
    addProvIp(){
        var data={ip:"",type:""};
        this.props.dispatch(addProvIp(data,this.props.topoIndex,this.props.configIndex,this.props.porvIndex))
    }
    removeProvIp(index){
         //console.log(this.props.porvIndex);
        this.props.dispatch(removeProvIp(this.props.topoIndex,this.props.configIndex,this.props.porvIndex,index));
    }
    editProvIp(index,e){
       // console.log(this.props);
        const {operators,province,topoIndex,configIndex,dispatch,porvIndex}=this.props;
        var name=e.target.getAttribute("data-name"), val=e.target.value;
        if(name=="ip"){
            if(operators&&province&&!val){

                this.props.dispatch(editProvIp({[name]:val,"iserror":true},topoIndex,configIndex,porvIndex,index));

            }else{
                this.props.dispatch(editProvIp({[name]:val,"iserror":false},topoIndex,configIndex,porvIndex,index));

            }
            return;

        }
        this.props.dispatch(editProvIp({[name]:val},topoIndex,configIndex,porvIndex,index));
    }
  render() {
      const { ips,topoIndex,configIndex,porvIndex,province} = this.props;
      //console.log(this.props);
    return (
        <div className="g-prov">
            <div className="form-group">
                <label className="col-xs-3">省份：</label>
                <div className="col-xs-5">
                    {/*<select value={province} onChange={(e)=>this.editProvince(e)} className="form-control">
                        <option>请选择</option>
                        <option value="BJ">北京</option>
                        <option value="HB">河北</option>
                        <option value="TJ">天津</option>
                        <option value="LN">辽宁</option>
                        <option value="HL">黑龙江</option>
                        <option value="JL">吉林</option>
                    </select>*/}
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={(val)=>this.editProvince(val,"province")}
                        notFoundContent="无搜索结果！"
                        value={province}
                        >
                        {/*proviceOption*/}
                        <Option value="">请选择</Option>
                        {proOpt}
                    </Select>
                </div>
                <div className="col-xs-2 g-posAbs">
                    <i className="glyphicon glyphicon-plus green" onClick={this.addProvince.bind(this)}></i>
                    {this.props.porvIndex!=0?
                        <i className="glyphicon glyphicon-remove red" onClick={this.delProvince.bind(this)}></i>
                        :""
                    }

                </div>
            </div>
            {/* <div className="form-group">
                <label className="col-xs-3">IP地址：</label>
                <div className="col-xs-5">
                    <select className="form-control">
                        <option>请选择</option>
                    </select>
                </div>
                <div className="col-xs-2">
                    <input className="chk" name="d-type" type="radio" /><label className="mr10">主</label>
                    <input className="chk" name="d-type" type="radio" /><label>备</label>
                </div>
                <div className="col-xs-2 g-posAbs">
                    <i className="glyphicon glyphicon-plus green"></i>
                </div>
            </div>*/}
            {/*IP-com*/}
            {
                this.props.Ipinfo.map((item,index)=>
                    <Ipcomp ips={ips?ips:[]} lableName="IP地址" name={"prov-default"+topoIndex+configIndex+porvIndex+index} {...item} key={index } ipIndex={index}
                            ipIndex={index}
                            addDefaultFn={this.addProvIp.bind(this)}
                            removeDefaultFn={this.removeProvIp.bind(this,index)}
                            selectTopoIpFn={this.editProvIp.bind(this,index)}
                            ipType="provice"
                        />)
            }

        </div>
    )
  }
}
function sel(state) {
    //console.log(state);
    return {
        topoItems:state.topos.topoItems,
        //topology_info:state.topos.topoItems.topology_info,
        currIndex:state.topos.currIndex
    }
}
export default connect(sel)(Province)