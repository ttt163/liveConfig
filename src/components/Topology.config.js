import React, {
  Component,
  PropTypes
} from 'react'
import { connect } from 'react-redux'
import Ipcomp from "./Topology.ipcomp.js"
import Province from "./Topology.Province.js"
import { removeIpConfig,editConfigData,addConfigDefultIp,removeConfigDefultIp,editConfigDefultIp,addProvince} from '../actions/devGoupActions.js'
import { Select } from 'antd';
const Option = Select.Option;
//import { ispOption } from '../containers/Device.js';
import {OPERATORS } from '../config.js';
export var ispOpt=[],ispArr={};
class TopoConfig extends Component {
    componentDidMount() {
        //console.log("3333");
        const {provinces,dispatch,topoIndex,configIndex,topoItems,operators}=this.props;
        if(!provinces||!provinces.length){
            var data={
                "province": "",
                "Ipinfo": [{ip: "", type: ""}]
            };
            dispatch(addProvince(data,topoIndex,configIndex));
        }
    }
    componentWillMount(){
        const {topoIndex,topoItems,operators}=this.props;
        var thisTopo=topoItems[topoIndex],ipConfig=thisTopo.topology_info.ipConfig;
        if(!ipConfig){
            return;
        }
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
    componentWillReceiveProps(nextProps){
        const {provinces,dispatch,topoIndex,configIndex}=nextProps;
        if(!provinces||!provinces.length){
            var data={
                "province": "",
                "Ipinfo": [{ip: "", type: ""}]
            };
            dispatch(addProvince(data,topoIndex,configIndex));
        }

    }
    shouldComponentUpdate(nextProps){
        const {topoIndex,topoItems,operators}=nextProps;
        var thisTopo=topoItems[topoIndex],ipConfig=thisTopo.topology_info.ipConfig;
        if(!ipConfig){
            return;
        }
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

    removeConfig(){
        var topoIndex=this.props.topoIndex,configIndex=this.props.configIndex;
        this.props.dispatch(removeIpConfig(topoIndex,configIndex));
    }
    editConfigData(val,name){
        //var val=e.target.value,name=e.target.getAttribute("data-name");
        var topoIndex=this.props.topoIndex,configIndex=this.props.configIndex;
        this.props.dispatch(editConfigData({[name]:val},topoIndex,configIndex));
        //console.log(e.target.getAttribute("data-name"))
    }
    addDefault(){
        var data={ip:"",type:""};
        this.props.dispatch(addConfigDefultIp(data,this.props.topoIndex,this.props.configIndex))
    }
    removeDefault(index){
        // console.log(index);
        this.props.dispatch(removeConfigDefultIp(this.props.topoIndex,this.props.configIndex,index));
    }
    editDefultIp(index,e){
        //console.log(e.target.getAttribute("data-name"))
        const {operators,topoIndex,configIndex,dispatch}=this.props;
        //console.log(this.props);
        var name=e.target.getAttribute("data-name"), val=e.target.value;
        if(name=="ip"){
            if(operators&&!val){
                dispatch(editConfigDefultIp({[name]:val,"iserror":true},this.props.topoIndex,this.props.configIndex,index))
            }else{
                dispatch(editConfigDefultIp({[name]:val,"iserror":false},this.props.topoIndex,this.props.configIndex,index))

            }
            return;

        }
        this.props.dispatch(editConfigDefultIp({[name]:val},this.props.topoIndex,this.props.configIndex,index));
    }

  render() {
      const { dispatch,topoItems,ips,topoIndex,configIndex} = this.props;
     // console.log("rrrr");
      var thisIpConfig=!topoItems||!topoItems[topoIndex]||!topoItems[topoIndex].topology_info?{}:topoItems[topoIndex].topology_info.ipConfig[configIndex];
      //console.log(this.props);
      //console.log(thisIpConfig.default);
    return (
      <div className="g-config">
          <div className="form-group">
              <label className="col-xs-3">运营商：</label>
              <div className="col-xs-5">
                  {/*<select value={thisIpConfig.operators}  className="form-control" data-name="operators" onChange={this.editConfigData.bind(this)}>
                      <option value="">请选择</option>
                      <option value="CMN">中国移动</option>
                      <option value="UNI">中国联通</option>
                      <option value="CHN">中国电信</option>
                      <option value="CTT">中国铁通</option>
                  </select>*/}
                  <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="请选择"
                      optionFilterProp="children"
                      onChange={(val)=>this.editConfigData(val,"operators")}
                      notFoundContent="无搜索结果！"
                      value={!thisIpConfig?"":thisIpConfig.operators}
                      >
                      {/*ispOption*/}
                      <Option value="">请选择</Option>
                      {ispOpt}
                  </Select>
              </div>
              <div  className="col-xs-2 g-posAbs">
                  {this.props.configIndex!=0?
                      <i className="glyphicon glyphicon-remove red" onClick={this.removeConfig.bind(this)}></i>
                      :""}
              </div>
          </div>

          {/*<div className="form-group">
              <label className="col-xs-3">默认：</label>
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
          {/*默认ip-comp*/}
          {thisIpConfig&&thisIpConfig.default&&thisIpConfig.default.length?
              thisIpConfig.default.map((item,index)=>
                  <Ipcomp ips={ips?ips:[]} lableName="默认" name={"config-default"+topoIndex+configIndex+index} {...item} key={index } ipIndex={index}
                          addDefaultFn={this.addDefault.bind(this)}
                          removeDefaultFn={this.removeDefault.bind(this,index)}
                          selectTopoIpFn={this.editDefultIp.bind(this,index)}
                          ipType="config"

                      />)
              :""
          }

          {/*省份-运营商*/}
          {/*  <div>
              <div className="form-group">
                  <label className="col-xs-3">省份：</label>
                  <div className="col-xs-5">
                      <select className="form-control">
                          <option>请选择</option>
                      </select>
                  </div>
                  <div className="col-xs-2 g-posAbs">
                      <i className="glyphicon glyphicon-plus green"></i>
                  </div>
              </div>
              <div className="form-group">
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
              </div>
              {/!*IP-com*!/}

              <Ipcomp />
          </div>*/}
          {
              !thisIpConfig||!thisIpConfig .provinces?"":
              thisIpConfig .provinces.map((item,index)=>
                      <Province ips={ips?ips:[]} {...item} key={index } operators={thisIpConfig.operators} porvIndex={index} topoIndex={this.props.topoIndex} configIndex={this.props.configIndex}  />
              )
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
export default connect(sel)(TopoConfig)