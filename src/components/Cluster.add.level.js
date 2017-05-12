import React, {Component,PropTypes} from 'react'
import { Tooltip } from 'antd';
import { connect } from 'react-redux'
import {addCluster,addLevel,delLevel,editLevel} from "../actions/clusterActions.js"
//import {bdevGroupOption,zdevGroupOption} from "../containers/Cluster.js"
import {getdevGroupByRole} from "../containers/Cluster.js"
import { Select } from 'antd';
import { URL } from '../config.js';
const Option = Select.Option;
export var topoOpction=[];
var bdevGroupOption=[],zdevGroupOption=[];
import {getKeyField,validateArrField,editArrFieldValue,delArrFieldFn} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import {delField,delArrField} from "../public/js/validate/action.js"
export function reverseBykey(arr,_key){
    //console.log(arr);
    var i=0;
    var j=0;
    var temp = 0;
    for(;i<arr.length;i++){
        for(j=i+1;j<arr.length;j++){
            if(parseInt(arr[i][_key])<parseInt(arr[j][_key])){
                //console.log(arr[j]);
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    //console.log(arr);
    return arr;
}
class AddLevel extends Component {
    componentDidMount() {
        bdevGroupOption=getdevGroupByRole("3");
        zdevGroupOption=getdevGroupByRole("2");
        const {levels,dispatch,validator,thisForm,index,devs_group_id,devs_group_name,level,topology_id,topology_name,topoArr}=this.props;
        if(levels==undefined||index==undefined){
            return;
        }
       // console.log(levels[index].level);
        getKeyField(thisForm,"devs_group",index,{
            "value":devs_group_id,
            "rule": {"required": true,"repeatd":true},
            "msg": {"required": "设备组不能为空","repeatd":"设备组不能重复！"}
        });
        //console.log(levels[index].level+"kai");
        if(levels.length-1==index){
           // console.log("222kai");
            getKeyField(thisForm,"topology",index,{
                "value":"禁用1",
                "rule": {"disable": true},
                "msg": {"disable": ""}
            });
            return;
        }//else{
            getKeyField(thisForm,"topology",index,{
                "value":topology_id,
                "rule": {"required": true},
                "msg": {"required": "拓扑不能为空"}
            });
       // }


    }
    componentWillReceiveProps(nextProps){
        //console.log(this.props);
       // console.log(nextProps);
        //const {validator,thisForm,index}=this.props;
       // const {levels,validator,thisForm,index,devs_group_id,topology_id}=this.props;
        const {levels,validator,thisForm,index,devs_group_id,topology_id}=nextProps;
        //console.log(index);
       // console.log(devs_group_id);
        if(levels==undefined||index==undefined){
            return;
        }
        getKeyField(thisForm,"devs_group",index,{
            "value":devs_group_id,
            "rule": {"required": true,"repeatd":true},
            "msg": {"required": "设备组不能为空","repeatd":"设备组不能重复！"}
        });
      //  console.log(levels[index].level+"gen");
        if(levels.length-1==index){
          //  console.log("222gen");
            getKeyField(thisForm,"topology",index,{
                "value":"禁用2",
                "rule": {"disable": true},
                "msg": {"disable": ""}
            });
            return;
        }//else{
            getKeyField(thisForm,"topology",index,{
                "value":topology_id,
                "rule": {"required": true},
                "msg": {"required": "拓扑不能为空"}
            });
        //}

        /*if(!devs_group_id){
            return;
        }*/
        editArrFieldValue(thisForm,"devs_group",devs_group_id,index);
        /*if(!topology_id){
            return;
        }*/
        editArrFieldValue(thisForm,"topology",topology_id,index);
        //校验
      /*  if(!validator[thisForm]||!validator[thisForm].fields||!validator[thisForm].fields["devs_group"]){
            return;
        }
        validateArrField(thisForm,"devs_group",devs_group_id,index);*/

    }
    componentWillUnmount() {
        // console.log("xxtttxx");
        const {dispatch,thisForm,validator}=this.props;
        if(!validator[thisForm]||!validator[thisForm].fields||!validator[thisForm].fields["devs_group"]||!validator[thisForm].fields["topology"]){
            return;
        }
        dispatch(delField(thisForm,"devs_group"));
        dispatch(delField(thisForm,"topology"));
        //delArrFieldFn(form,field,index);;
    }
    addLevel(index){
        const {levels,cluster,dispatch,thisForm}=this.props;
        var levels_amount=cluster.levels_amount;
        var data=[{
            "level": "",
            "devs_group_id": "",
            "devs_group_name": "",
            "topology_id": "",
            "topology_name": "",
            "topoRemarks":""
        }]
        dispatch(addCluster({"levels_amount":(parseInt(levels_amount)+1).toString()}));
        dispatch(addLevel(data,index));
        //删除校验
        dispatch(delField(thisForm,"devs_group"));
        dispatch(delField(thisForm,"topology"));
    }
    delLevel(index){
        const {cluster,dispatch,thisForm}=this.props;
        var levels_amount=cluster.levels_amount;
        dispatch(addCluster({"levels_amount":(parseInt(levels_amount)-1).toString()}));
        dispatch(delLevel(index,1));
        //删除校验
        dispatch(delField(thisForm,"devs_group"));
        dispatch(delField(thisForm,"topology"));
    }
    editThisLevel(val,name,index){
        const {dispatch,thisForm,levels}=this.props;
       /* var data={
            [name]:e.target.value
        }*/
       // console.log(val);
       // console.log(val.substring(val.lastIndexOf("&devG&")+6,val.lastIndexOf("&devGTopo&")));
        var _id=val.substring(0,val.lastIndexOf("&devG&")),
            _name=val.indexOf("&devGTopo&")!=-1?val.substring(val.lastIndexOf("&devG&")+6,val.lastIndexOf("&devGTopo&")):val.substring(val.lastIndexOf("&devG&")+6),
            _rek=""
           if(name=="topology"){
               _name=val.substring(val.lastIndexOf("&devG&")+6,val.lastIndexOf("&devGTopo&"));
               _rek=val.substring(val.lastIndexOf("&devGTopo&")+10);
        }
        //console.log(_name);
        dispatch(editLevel({ [name+"_id"]:_id,[name+"_name"]:_name,"topoRemarks":_rek},index));
        //校验
        //if(name=="topology"&&){}
       // console.log(_id);
        validateArrField(thisForm,name,_id,index);
        if(name=="devs_group"){
            dispatch(editLevel({ "topology_id":"","topology_name":""},index));
            topoOpction=[];
            $.ajax({
                url:`${URL}/GetTopologyConfig`,
                type:'post',
                data:JSON.stringify({"query":{"devs_group_id":_id}}),
                async: true,  //默认为true 异步
                dataType: "json",
                error:function(){
                    console.log("操作失败");
                },
                success:function(data){
                   // console.log(data);
                    if(data.info.status=="success"){
                        var data=data.info.data;
                        var _topoOpc=[];
                        //console.log(!data);
                        if(!data){
                            dispatch(editLevel({ "topoArr":[]},index));
                            return;
                        }
                        for(var i=0;i<data.length;i++){
                            //topoOpction.push(<Option key={data[i]._id}>{data[i].name}</Option>);
                            //_topoOpc.push({"_id":data[i]._id,"name":data[i].name});
                            _topoOpc.push(<Option key={data[i]._id+"&devG&"+data[i].name+"&devGTopo&"+data[i].topoRemarks}>{data[i].name}</Option>);

                        }
                        dispatch(editLevel({ "topoArr":_topoOpc},index));
                    }else{
                        dispatch(editLevel({ "topoArr":[]},index));
                    }
                }
            })
        }
    }
    render() {

        const {validator,thisForm,levels,cluster,dispatch,index,devs_group_id,devs_group_name,level,topology_id,topology_name,topoRemarks,topoArr}=this.props;
        //console.log(topoArr);
        return (
                    <tr>
                        <td className="f-leveln" style={{"width":"5%"}}>
                            <span className="f-numerator">{level}</span>/
                            <span className="f-denominator">{cluster.levels_amount}</span>
                        </td>
                        <td className="text-left" style={{"width":"35%"}}>
                            <div className="">
                                {/*<select className="form-control" value={item.main_devs_group_id} onChange={(e)=>this.editThisLevel(e,"main_devs_group_id",index)}>
                                    <option>请选择</option>
                                    <option value="1">设备组a</option>
                                    <option value="2">设备组b</option>
                                    <option value="3">设备组c</option>
                                </select>*/}
                                <ValidateItem validator={validator} thisForm={thisForm} field="devs_group" index={index} itemType="1">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="请选择"
                                        optionFilterProp="children"
                                        onChange={(val,e)=>this.editThisLevel(val,"devs_group",index,e)}
                                        notFoundContent="无搜索结果！"
                                        value={!devs_group_id?"":devs_group_id+"&devG&"+devs_group_name}
                                        >
                                        {levels.length-1==index?bdevGroupOption:zdevGroupOption}
                                    </Select>
                                </ValidateItem>

                            </div>
                        </td>
                        <td className="text-left" style={{"width":"35%"}}>
                            <div className="">
                                {/*<select className="form-control" value={item.main_topology_id} onChange={(e)=>this.editThisLevel(e,"main_topology_id",index)}>
                                    <option value="0">无</option>
                                    <option value="1">拓扑1</option>
                                    <option value="2">拓扑2</option>
                                    <option value="3">拓扑3</option>
                                </select>*/}
                                <ValidateItem validator={validator} thisForm={thisForm} field="topology" index={index} itemType="1">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="请选择"
                                        optionFilterProp="children"
                                        onChange={(val)=>this.editThisLevel(val,"topology",index)}
                                        notFoundContent="无搜索结果！"
                                        value={!topology_id?"":`${topology_id}&devG&${topology_name}&devGTopo&${!topoRemarks||topoRemarks=="undefined"?"undefined":topoRemarks}`}
                                        disabled={levels.length-1==index?true:false}
                                        >
                                        {
                                            /*topoOpction*/
                                            levels.length-1==index?<Option value="" key="" >禁用</Option>:topoArr


                                            /*item.topoArr.map((topoItem,i)=>
                                             <Option value={topoItem._id} key={i}>{topoItem.name}</Option>
                                             )
                                             */
                                        }
                                    </Select>
                                </ValidateItem>

                            </div>
                        </td>
                        <td className="text-center" style={{"width":"25%"}}>
                            <Tooltip placement="top" title="添加上层">
                                <i className="upLevel" onClick={()=>{index==0?this.addLevel(0):this.addLevel(index);}}></i>
                            </Tooltip>
                           {levels.length-1!=index?
                                <Tooltip placement="top" title="添加下层">
                                    <i className="downLevel" onClick={()=>{this.addLevel(index+1)}}></i>
                                </Tooltip>

                                :""}
                            {levels.length-1!=index?
                            <Tooltip placement="top" title="删除">
                                <i className="iconfont level-icon" onClick={()=>this.delLevel(index)}>&#xe606;</i>
                            </Tooltip>
                                :""}
                            <Tooltip placement="top" title="清空">
                                <i className="iconfont level-icon" onClick={()=>{dispatch(editLevel({ "devs_group_id": "","devs_group_name": "","topology_id": "","topology_name": ""},index)); validateArrField(thisForm,"devs_group","",index);validateArrField(thisForm,"topology","",index);}}>&#xe603;</i>
                            </Tooltip>
                        </td>
                    </tr>

        )
    }
}
function sel(state) {
  // console.log(state);
    return {"cluster":state.cluster,"levels":state.cluster.level_devs_group,"validator":state.validator_1}
}
export default connect(sel)(AddLevel)