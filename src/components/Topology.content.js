import React, {
  Component,
  PropTypes
} from 'react'
import { editTopData,addTopoDefultIp,editTopoDefultIp,removeTopoDefultIp,addIpConfig,addTopoId,clearTopoData,editConfigDefultIp,editProvIp} from '../actions/devGoupActions.js'
import { connect } from 'react-redux'
import Ipcomp from "./Topology.ipcomp.js"
import Province from "./Topology.Province.js"
import TopoConfig from "./Topology.config.js"
import InputComp from "./Input.item.js"
import {formatSubmitTopoData} from '../containers/DeviceGroup.js'
import { URL } from '../config.js';
import {ShowDiag,addOperation} from  "../public/js/f.js"
import {getArrForm,getArrFormFields,getArrFormField,validateField,validateAllFields,validateArrformField,validateArrformAllFields,validateArrformArrField,clearArrFormFn} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
class TopoContent extends Component {
    constructor(state) {
        super(state);
    }
    setChange(e){
        const {validator,index}=this.props;
        //console.log(validator.toposForm[index]);
        var item={};
        if(e.target.name=="toponame"){
            //item={key:"name",value:e.target.value};
            item={"name":e.target.value};
            validateArrformField("toposForm","name",e.target.value,index);
        }else{
            //item={key:e.target.name,value:e.target.value};
            item={[e.target.name]:e.target.value};
            validateArrformField("toposForm",e.target.name,e.target.value,index);
        }
        this.props.dispatch(editTopData(item,this.props.index));
    }
    addDefault(){
        var data={ip:"",type:""};
        //console.log(this.props);
        this.props.dispatch(addTopoDefultIp(data,this.props.index))
    }
    removeDefault(index){
       // console.log(index);
        this.props.dispatch(removeTopoDefultIp(this.props.index,index));
    }
    selectTopoIp(index,e){
        //ipIndex=this.refs.topoIpcomp.props.ipIndex;
        var name=$(e.target).data("name"), val=e.target.value,topoIndex=this.props.index,ipIndex=index;
        this.props.dispatch(editTopoDefultIp({[name]:val},topoIndex,ipIndex));
        if(name=="ip"){
            validateArrformArrField("toposForm",topoIndex,"ip",e.target.value,ipIndex);
        }

    }

  //新增运营商配置
    addConfig(){
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
        this.props.dispatch(addIpConfig(data,this.props.index));


    }
    //保存拓扑
    saveData(index){
        //console.log(this.props);
        const {topoItems,dispatch}=this.props;
        //console.log(topoItems);
        //var ff=validateArrformAllFields("toposForm",index);
       // console.log(this.props.validator);
        if(!validateArrformAllFields("toposForm",index)){
            return;
        }
        var thisTopoData=topoItems[index];
        var ipConfig=thisTopoData.topology_info.ipConfig;
       // console.log(ipConfig);
        var isFlag=false,isDefFlag=false;
        var subData=formatSubmitTopoData(thisTopoData);
        if(ipConfig&&ipConfig.length){
            for(var i=0;i<ipConfig.length;i++){
                if(!ipConfig[i].operators){
                    isFlag=true;
                    //console.log(isDefFlag);
                    if(!isDefFlag){
                        Modal.confirm({
                            msg:`第${i+1}个运营商为空，确定要提交吗？`,
                            title: "提示",
                            btnok: "确定",
                            btncl: "取消"
                        }).on(function(e) {

                            if (e) {
                                //console.log(subData);
                                $.ajax({
                                    url:`${URL}/SendTopologyConfig`,
                                    type:'post',
                                    data:JSON.stringify(subData),
                                    async: true,  //默认为true 异步
                                    dataType: "json",
                                    error:function(error){
                                        var data=$.parseJSON(error.responseText);
                                        new ShowDiag({
                                            msg: !data.info.warning?'操作失败！':data.info.warning,
                                            closetime: 2
                                        });
                                    },
                                    success:function(data){
                                        // console.log(data);
                                        if(data.info.status=="success"){
                                            new ShowDiag({
                                                msg: '保存成功！',
                                                closetime: 2
                                            });
                                            if(data.info._id){
                                                //var topoItem={[data.info._id]:thisTopoData.name};
                                                dispatch(editTopData({"_id":data.info._id},index));
                                            }
                                            var topoItem={"_id":!data.info._id?thisTopoData._id:data.info._id,"name":thisTopoData.name,"topoRemarks":thisTopoData.topoRemarks};
                                            // console.log(topoItem);
                                            dispatch(addTopoId(topoItem));
                                        }else{
                                            new ShowDiag({
                                                msg: !data.info.warning?'保存失败！':data.info.warning,
                                                closetime: 2
                                            });
                                            addOperation(`保存拓扑${thisTopoData.name}`);
                                        }
                                    }
                                });
                            }
                        });
                        break;
                    }
                }else{
                    //运营商不为空
                    for(var j=0;j<ipConfig[i].default.length;j++){
                        if(!ipConfig[i].default[j].ip){
                           // dispatch(editConfigDefultIp({"iserror":true},i,j));
                            dispatch(editConfigDefultIp({"iserror":true},index,i,j));
                            isDefFlag=true;
                        }else{
                            dispatch(editConfigDefultIp({"iserror":false},index,i,j));
                        }
                    }
                    //省份IP
                    var provinces=ipConfig[i].provinces;
                    if(!provinces){
                        //去掉省份后内容

                    }else{
                        for(var k=0;k<provinces.length;k++){
                            if(provinces[k].province){
                                //已选择省份
                                for(var c=0;c<provinces[k].Ipinfo.length;c++){
                                    if(!provinces[k].Ipinfo[c].ip){
                                        dispatch(editProvIp({"iserror":true},index,i,k,c));
                                        isDefFlag=true;
                                    }else{
                                        //dispatch(editConfigDefultIp({"iserror":false},index,i,j));
                                        dispatch(editProvIp({"iserror":false},index,i,k,c));
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
       // console.log(isDefFlag+"===="+isFlag);
        if(!isDefFlag&&!isFlag){
            $.ajax({
                url:`${URL}/SendTopologyConfig`,
                type:'post',
                data:JSON.stringify(subData),
                async: true,  //默认为true 异步
                dataType: "json",
                error:function(error){
                    var data=$.parseJSON(error.responseText);
                    new ShowDiag({
                        msg: !data.info.warning?'操作失败！':data.info.warning,
                        closetime: 2
                    });
                },
                success:function(data){
                    // console.log(data);
                    if(data.info.status=="success"){
                        new ShowDiag({
                            msg: '保存成功！',
                            closetime: 2
                        });
                        if(data.info._id){
                            //var topoItem={[data.info._id]:thisTopoData.name};
                            dispatch(editTopData({"_id":data.info._id},index));
                        }
                        var topoItem={"_id":!data.info._id?thisTopoData._id:data.info._id,"name":thisTopoData.name,"topoRemarks":thisTopoData.topoRemarks};
                        // console.log(topoItem);
                        dispatch(addTopoId(topoItem));
                    }else{
                        new ShowDiag({
                            msg: !data.info.warning?'保存失败！':data.info.warning,
                            closetime: 2
                        });
                    }
                }
            });
        }
      /*  if(!isFlag){
            var isDefFlag=false;
            if(ipConfig&&ipConfig.length) {
                for (var i = 0; i < ipConfig.length; i++) {
                    for(var j=0;j<ipConfig[i].default.length;j++){
                        if(ipConfig.operators&&!ipConfig[i].default[j].ip){
                            dispatch(editConfigDefultIp({"iserror":true},i,j));
                            isDefFlag=true;
                        }else{
                            dispatch(editConfigDefultIp({"iserror":false},i,j));
                        }
                    }
                }
            }
            if(!isDefFlag){
                $.ajax({
                    url:`${URL}/SendTopologyConfig`,
                    type:'post',
                    data:JSON.stringify(subData),
                    async: true,  //默认为true 异步
                    dataType: "json",
                    error:function(error){
                        var data=$.parseJSON(error.responseText);
                        new ShowDiag({
                            msg: !data.info.warning?'操作失败！':data.info.warning,
                            closetime: 2
                        });
                    },
                    success:function(data){
                        // console.log(data);
                        if(data.info.status=="success"){
                            new ShowDiag({
                                msg: '保存成功！',
                                closetime: 2
                            });
                            if(data.info._id){
                                //var topoItem={[data.info._id]:thisTopoData.name};
                                dispatch(editTopData({"_id":data.info._id},index));
                            }
                            var topoItem={"_id":!data.info._id?thisTopoData._id:data.info._id,"name":thisTopoData.name,"topoRemarks":thisTopoData.topoRemarks};
                            // console.log(topoItem);
                            dispatch(addTopoId(topoItem));
                        }else{
                            new ShowDiag({
                                msg: !data.info.warning?'保存失败！':data.info.warning,
                                closetime: 2
                            });
                        }
                    }
                });
            }

        }*/
        //console.log(thisTopoData);
        //格式化提交代码

    };
    //清空拓扑
    /*clearTopoData(topoIndex){
        console.log(topoIndex);
        console.log(this.props)
    }*/
  render() {
      const { dispatch,currIndex,topoItems,ips,validator} = this.props;
      let defaultIp=!(topoItems[this.props.index].topology_info.default)?[]:topoItems[this.props.index].topology_info.default;
      let ipConfig=!(topoItems[this.props.index].topology_info.ipConfig)?[]:topoItems[this.props.index].topology_info.ipConfig;
//console.log(this.props);
    return (
        <div style={{display:this.props.index==currIndex?"block":"none"}} >
            <div className="form-group">
                <div  className="col-xs-12 text-right">
                    <button type="button" onClick={()=>this.saveData(this.props.index)} className="btn mr10 btn-gradient">保存</button>
                    <button type="button" onClick={()=>{dispatch(clearTopoData(this.props.index)); clearArrFormFn("toposForm");}} className="btn btn-gradient">清空</button>
                </div>
            </div>
            <div className="form-group">
                <label className="col-xs-3">拓扑名称：</label>
                <div className="col-xs-5">
                    <ValidateItem validator={validator} thisForm="toposForm" field="name" formType="arr" formIndex={this.props.index}>
                        <input name="toponame"  value={topoItems[this.props.index].name} onBlur={(e)=>validateArrformField("toposForm","name",e.target.value,this.props.index)}  onChange={(e)=>this.setChange(e)} className="form-control" type="text" />
                    </ValidateItem>
                    {/* <input className="form-control" type="text" />removeDefaultFn={this.removeDefault.bind(this,index)} removeDefaultFn={index=>removeDefault(index)}*/}
                </div>
            </div>
            {/*   <div className="form-group">
                <label className="col-xs-3">默认：</label>
                <div className="col-xs-5">
                    <select className="form-control">
                        <option value="">请选择</option>
                        <option value="127.0.0.1">127.0.0.1</option>
                        <option value="127.0.0.2">127.0.0.2</option>
                    </select>
                </div>
                <div className="col-xs-2">
                    <input className="chk" value="ip_main" name="d-type"  type="radio" /><label className="mr10">主</label>
                    <input className="chk" value="ip_back" name="d-type" type="radio" /><label>备</label>
                </div>
                <div className="col-xs-2 g-posAbs">
                    <i className="glyphicon glyphicon-plus green" onClick={this.addDefault.bind(this)}></i>
                </div>
            </div>*/}
            {/*IP-com   <Ipcomp />*/}
            {
                defaultIp.Ipinfo.map((item,index)=>
                    <Ipcomp ref="topoIpcomp" {...item} key={index} ips={ips?ips:[]} ipIndex={index} lableName="默认" name={"topo-default"+this.props.index+index}
                                      topo-ipSelectValue={item.ip}
                                      addDefaultFn={this.addDefault.bind(this)}
                                      removeDefaultFn={this.removeDefault.bind(this,index)}
                                      selectTopoIpFn={this.selectTopoIp.bind(this,index)}
                                    topoIndex={this.props.index}
                                    ipType="ipTopo"

                        />)
            }

            {/*配置*/}
            <div className="form-group">
                <div className="colo-xs-12 g-title">
                    <i className="iconfont dian">&#xe601;</i>
                    <h4>配置</h4>
                    <i className="glyphicon glyphicon-plus green" onClick={this.addConfig.bind(this)}></i>
                </div>
            </div>
            {/*配置内容-com*/}
            {/* <div className="g-config">
                <div className="form-group">
                    <label className="col-xs-3">运营商：</label>
                    <div className="col-xs-5">
                        <select className="form-control">
                            <option>请选择</option>
                        </select>
                    </div>
                    <div className="col-xs-2 g-posAbs">
                        <i className="glyphicon glyphicon-remove red"></i>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-xs-3">默认：</label>
                    <div className="col-xs-5">
                        <select className="form-control">
                            <option>请选择</option>
                        </select>
                    </div>
                    <div className="col-xs-2">
                        <input className="chk" name="tdIp" type="radio" /><label className="mr10">主</label>
                        <input className="chk" name="tdIp" type="radio" /><label>备</label>
                    </div>
                    <div className="col-xs-2 g-posAbs">
                        <i className="glyphicon glyphicon-plus green"></i>
                    </div>
                </div>
                {/!*默认ip-comp <Ipcomp />*!/}

                {/!*省份-运营商*!/}
                <div>
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
                    {/!*IP-com <Ipcomp />*!/}

                </div>
                {/!*IP-com   <Province />*!/}

            </div>*/}
            {/*IP-com*/}
            {
                ipConfig.map((item,index)=>
                <TopoConfig ips={ips?ips:[]} {...item} key={index} configIndex={index} topoIndex={this.props.index} />)
            }
            <div className="form-group">
                <label className="col-xs-3">备注：</label>
                <div className="col-xs-9">
                    <textarea rows="5" name="topoRemarks" onBlur={(e)=>validateArrformField("toposForm","topoRemarks",e.target.value,this.props.index)} value={topoItems[this.props.index].topoRemarks}  onChange={(e)=>this.setChange(e)} className="form-control"></textarea>
                </div>
            </div>
        </div>
    )
  }
}
function getdevIpArr(data){
    if(data){
        var ipArr=[];
        for(var i=0;i<data.length;i++){
            if(data[i].ips){
                for(var j=0;j<data[i].ips.length;j++){
                    ipArr.push({"ip":data[i].ips[j].ip});
                }
            }
        }
    }

    //console.log(ipArr);
    return ipArr;
}
function sel(state) {
  // console.log(state);
    return {
        topoItems:state.topos.topoItems,
        //topology_info:state.topos.topoItems.topology_info,
        currIndex:state.topos.currIndex,
        validator:state.validator_1,
        ips:getdevIpArr(state.devicesGroup.devDatas)
    }
}
export default connect(sel)(TopoContent)
