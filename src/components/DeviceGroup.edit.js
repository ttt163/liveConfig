
import React, {
    Component,
    PropTypes
    } from 'react'
import { connect } from 'react-redux'
import { addTopo,addDevGroup,changeDevChk,clearDevs} from '../actions/devGoupActions'
import { showDeviceList} from '../actions/actions'
//import { listAction} from '../actions/listBoxactions'
import { listAction,changeChk,changeAllChk} from '../actions/listBoxactions'
import Topology from './DeviceGroup.Topology.js'
import LisatBox from './listBox.js'
import { Checkbox } from 'antd';
import {getDevData,roleOption} from '../containers/Device.js'
import { URL } from '../config.js';
import {ShowDiag,addOperation} from  "../public/js/f.js"
import {getDevGroupData} from "../containers/DeviceGroup.js";
import { Select } from 'antd';
const Option = Select.Option;
import ValidateItem from "./Validate.item.js"
import {validateField,validateAllFields} from "../public/js/validate/validateRform.js"
//import { roleOption } from '../containers/Device.js';
//校验拓扑中是否有删除设备的ip
export function isTopoIp(data){
    var topoArr=[];
    $.ajax({
        url:`${URL}/GetTopologyIp`,
        type:'post',
        data:JSON.stringify(data),
        async: false,  //默认为true 异步
        dataType: "json",
        error:function(error){
            var data=$.parseJSON(error.responseText);
            new ShowDiag({
                msg: !data.info.warning?'操作失败！':data.info.warning,
                closetime: 2
            });
            topoArr=false;
        },
        success:function(data){
            //console.log(data);
            if(data.info.status=="success"){
                if(!data.info.data){
                    return;
                }
                topoArr=data.info.data;
                //return topoArr;
            }else{
                new ShowDiag({
                    msg: !data.info.warning?'操作失败！':data.info.warning,
                    closetime: 2
                });
                topoArr=false;
                //return false;
            }
        }
    });
    return topoArr;
    //console.log(topoArr);

}
class AddDeviceGroup extends Component {
    constructor(state) {
        super(state);
    }
    editdevGroup(e){
        var name=e.target.name.substring(e.target.name.lastIndexOf("devGroup-")+9);
        var _data={[name]:e.target.value};
        this.props.dispatch(addDevGroup(_data));
    }
    getDevByThis(val,name){
        const {devicesList,devGroup,dispatch}=this.props;
       // var name=e.target.name.substring(e.target.name.lastIndexOf("devGroup-")+9);
        var _data={[name]:val};
        this.props.dispatch(addDevGroup(_data));
        $.ajax({
            url:`${URL}/GetDevLike`,
            type:'post',
            data:JSON.stringify({"name":devGroup.searchDev,"role":val,"ifuse":"1"}),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(){
                console.log("操作失败");
            },
            success:function(data){
                //console.log(data);
                if(data.info.status=="success"){
                    var data=data.info.data;
                    //console.log(data);
                    dispatch(showDeviceList(data));
                    dispatch(listAction({"dataList":data}));
                }
            }
        });

    }
    //选择设备box  addr ips  role
    choseDev(){
        const {devicesList,dispatch}=this.props;
        //console.log(devicesList);
        var devList=[];
        for(var i=0;i<devicesList.list.length;i++){
            var item={"_id":devicesList.list[i]._id,"name":devicesList.list[i].name,"addr":devicesList.list[i].addr,"ips":[...devicesList.list[i].ips],"isChk":false};
            devList.push(item);
        }
        var _data={
            "dataList":devList,
            "chkData":this.props.chkData?this.props.chkData:[],
            "chkAll":true,
            "isChose":true,
            "confirm":"确定",
            "cancel":"取消",
            "selectAll":"全选",
            "cancelAll":"反选",
            "clear":"清除"
        };
        this.props.dispatch(listAction(_data));
    }
    searhDevList(e){
        const {devGroup,dispatch}=this.props;
        var val=e.target.value,_data={"name":val,"role":devGroup.role,"ifuse":"1"};
        this.props.dispatch(addDevGroup({"searchDev":val}));
        $.ajax({
            url:`${URL}/GetDevLike`,
            type:'post',
            //data:JSON.stringify({"query":_data,"page":"1","row":"10"}),
            data:JSON.stringify(_data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(){
                console.log("操作失败");
            },
            success:function(data){
                //console.log(data);
                if(data.info.status=="success"){
                    var data=data.info.data;
                    dispatch(listAction({"dataList":data}));
                    dispatch(showDeviceList(data));
                }
            }
        });

    }
    confirmChk(){
        const {devGroup,chkData}=this.props;
        var _ckData=chkData.slice(0),devId=Object.assign({}, devGroup),devs={};
        for(var i=0;i<_ckData.length;i++){
            devs={...devs,[_ckData[i]._id]:_ckData[i].name}
        }
        var _data={"devDatas":_ckData,"device_ids":devs};
        this.props.dispatch(addDevGroup(_data));
        this.props.dispatch(listAction({"isChose":false}));
        validateField("DevGroup","dev",_ckData.length);
    }
//新增拓扑
    addTopoFn(){
        const {devGroup}=this.props;
        var topoData={
            "_id": "",
            "name": "",
            "devs_group_id": devGroup._id,
            "topology_info": {
                "ipConfig":[
                    {
                        "operators": "",
                        "default": [{ip: "", type: ""}],
                        "provinces": [
                            {
                                "province": "",
                                "Ipinfo": [{ip: "", type: ""}]
                            }
                        ]
                    }
                ],
                "default": {
                    "Ipinfo":[{ip:"",type:""}],
                }
            }
        }
        this.props.dispatch(addTopo(topoData));
        //$(this.refs.topo).show();
    }
    //提交新增设备组
    subDevGroup(e){
        e.preventDefault();
        const {dispatch,devGroupList,topos}=this.props;
        if(!validateAllFields("DevGroup")){
            //console.log("gggg");
            return;
        }
        var flag=true;
        if(topos.topoItems&&topos.topoItems.length){
            for(var i=0;i<topos.topoItems.length;i++){
                if(!topos.topoItems[i]._id){
                    flag=false;
                    new ShowDiag({
                        msg: "拓扑结构"+(i+1)+"没保存，请先保存拓扑"+(i+1)+"再提交",
                        closetime: 2
                    });
                    break;
                }
            }
        }
        if(!flag){
            return;
        }
        var _data=this.props.devGroup;
        delete(_data["devDatas"]);
        $.ajax({
            url:`${URL}/SendDevGroupConfig`,
            type:'post',
            data:JSON.stringify(_data),
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
                // console.log(data.info);
                if(data.info.status=="success"){
                    var $addModel = $('#f-editGropu-modal'); //添加模态框
                    $addModel.modal('hide');
                    new ShowDiag({
                        msg: '修改成功！',
                        closetime: 2
                    });
                    // var _data=this.props.devGroupList.search;
                    getDevGroupData(dispatch,devGroupList.search);
                    addOperation(`修改设备组${_data.name}`)

                }else{
                    //alert('添加失败');
                    new ShowDiag({
                        msg: !data.info.warning?'修改失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        })
    }
    //清空选中设备
    clearDevs(){
        const { devGroup,dispatch} = this.props;
        var falg=false;
        //console.log(devGroup.devDatas);
        if(!devGroup.devDatas){
            return;
        }
        for(var i=0;i<devGroup.devDatas.length;i++){
            var data={"devs_group_id":devGroup._id,"dev_id":devGroup.devDatas[i]._id};
            var topoArr=isTopoIp(data);
            if(!topoArr){
                falg=true;
                break;
            }
            if(topoArr.length){
                new ShowDiag({
                    msg: '请先删除所有拓扑中的IP！',
                    closetime: 2
                });
                falg=true;
                break;
            }
        }
        if(falg){
            return;
        }
        //console.log(111);
        dispatch(clearDevs({"isChk":false}));
        dispatch(changeAllChk({"chkAll":"clear"}));
    }
    //取消选中设备
    changeDevChk(index,e){
        const { devGroup,dispatch,topos,ListBox} = this.props;
       // const {dispatch,ListBox,devGroup}=this.props;
        var dataList=ListBox.dataList,val=e.target.value;
        //dispatch(changeDevChk({"isChk":e.target.checked},index));
        //if(topos&&topos.length){
            if(!e.target.checked){
                var data={"devs_group_id":devGroup._id,"dev_id":e.target.value};
                var topoArr=isTopoIp(data),sName="";
                //console.log(topoArr);
                if(!topoArr){
                    return;
                }
                if(topoArr.length){
                    for(var i=0;i<topoArr.length;i++){
                        sName+=topoArr[i].name+"，";
                    }
                    sName=sName.substring(0,sName.lastIndexOf("，"));
                    new ShowDiag({
                        msg: '请先删除拓扑'+sName+'中该台设备的IP！',
                        closetime: 2
                    });
                    return;
                }
            }
        //}
        dispatch(changeDevChk({"isChk":e.target.checked},index));
        //dispatch(changeChk({"isChk":e.target.checked},index));
        for(var i=0;i<dataList.length;i++){
            if(dataList[i]._id==val){
                dispatch(changeChk({"isChk":e.target.checked},i));
                break;
            }
        }
    }

    render() {
       // console.log(this.props.topos);
        const { dispatch,topos,devGroup,ListBox,validator} = this.props;
        return (
            <div className="modal fade f-modal" id='f-editGropu-modal'>
                <div className="modal-dialog" style={{minWidth:'870px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 修改设备组</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="d_add" >
                                <div className="form-group">
                                    <label className="col-xs-3 control-label"><span className='red'>*</span> 设备组名：</label>

                                    <div className="col-xs-8">
                                        <ValidateItem validator={validator} thisForm="DevGroup" field="name">
                                            <input value={devGroup.name} onBlur={(e)=>validateField("DevGroup","name",e.target.value)} onChange={(e)=>{this.editdevGroup(e);validateField("DevGroup","name",e.target.value);}} type="text" className="form-control deviceGroupName"  name="devGroup-name" />
                                        </ValidateItem>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 设备组角色：</label>
                                    <div className="col-xs-8 resChosen">
                                        <ValidateItem validator={validator} thisForm="DevGroup" field="role">
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="请选择"
                                                optionFilterProp="children"
                                                onChange={(val)=>{this.getDevByThis(val,"role");validateField("DevGroup","role",val);}}
                                                notFoundContent="无搜索结果！"
                                                value={devGroup.role}
                                                disabled
                                                >
                                                {roleOption}
                                            </Select>
                                        </ValidateItem>
                                        {/* <select value={devGroup.role} onChange={this.getDevByThis.bind(this)} name="devGroup-role" className="form-control">
                                            <option value="">请选择</option>
                                            <option value="1">源站设备组</option>
                                            <option value="2">中转设备组</option>
                                            <option value="3">边缘设备组</option>
                                        </select>*/}
                                    </div>
                                </div>
                                {/*<div className="form-group f-sourceDevType">
                                 <label  className="col-xs-3 control-label"><span className='red'>*</span> 源站设备组类型：</label>
                                 <div className="col-xs-8 resChosen">
                                 <select name="source_type" className="f-deviceType" id="sourcetype">
                                 <option value="">请选择</option>
                                 <option value="1">高升源站设备组</option>
                                 <option value="2">第三方源站设备组</option>
                                 </select>
                                 </div>
                                 </div>*/}

                                <div className="form-group">
                                    <label className="col-xs-3 control-label"><span className='red'>*</span> 设备选择：</label>

                                    <div className="col-xs-8 authorityPost f-usePlug">
                                        <ValidateItem validator={validator} thisForm="DevGroup" field="dev">
                                            <input  value={devGroup.searchDev} onChange={(e)=>this.searhDevList(e)} onFocus={this.choseDev.bind(this)} type="text" className="form-control f-authorityInpt" />
                                            <LisatBox isChose={ListBox.isChose} topos={!this.props.topos||!this.props.topos.topoItems?[]:this.props.topos.topoItems}  confirmChk={()=>this.confirmChk()} />
                                        </ValidateItem>
                                        {/*<div className="f-authority">
                                         <div className="f-authority-head">
                                         <button type='button' className='f-btn f-checkAll'>全选</button>
                                         <button type='button' className='f-btn ml15 f-checkRev'>反选</button>
                                         <button type='button' className='f-btn ml15 f-checkClear'>清除</button>
                                         <button type="button" className="close"><span aria-hidden="true">&times;</span></button>
                                         </div>
                                         <div className="f-authority-body d_device">
                                         </div>
                                         <div className="f-authority-footer">
                                         <button type='button' className="f-btn fbtn-ok authoritySure"><span
                                         className='fbtn-ok-svg'></span> 确定
                                         </button>
                                         <button type='button' className="f-btn fbtn-miss ml15 authorityClose"><span
                                         className='fbtn-miss-svg'></span> 取消
                                         </button>
                                         </div>
                                         </div>*/}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-10 f-customerBox">
                                        <label className="control-label textLeft f-cusNum">
                                            已选择<i>{devGroup.devDatas?devGroup.devDatas.filter(function(chk){return chk.isChk==true}).length:0}</i>台设备：
                                            <button onClick={()=>{this.clearDevs();validateField("DevGroup","dev",devGroup.devDatas.filter(function(chk){return chk.isChk==true}).length)}} type="button" className="f-btn ml15 f-checkClear">清除</button>
                                        </label>

                                        <div className="clearfix f-seltCustomer">
                                            {devGroup.devDatas?
                                                devGroup.devDatas.map((item,index)=>
                                                        <div key={index} className="col-xs-6">
                                                            <Checkbox onChange={(e)=>{this.changeDevChk(index,e);validateField("DevGroup","dev",devGroup.devDatas.filter(function(chk){return chk.isChk==true}).length)}} value={item._id} checked={item.isChk} index={index}>{item.name}</Checkbox>
                                                        </div>
                                                )
                                                :""}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-xs-11" style={{"display":devGroup.role!="3"?"block":"none"}} >
                                        <button style={{'marginLeft': '5%'}} onClick={this.addTopoFn.bind(this)}  type='button' className="btn blue-btn">添加拓扑</button>
                                    </div>
                                </div>
                                <div ref="topo" style={{'marginLeft': '2%',"display":topos.topoItems.length?"block":'none'}}>
                                    <Topology  />
                                </div>

                                {/*<Topology topoItem={this.state.topoItem} />*/}
                                <input name="isUse" type="hidden" />
                                <div className="form-group text-center">
                                    <div className="error"></div>
                                    <button type='submit' onClick={(e)=>this.subDevGroup(e)} className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span className='fbtn-miss-svg'></span> 取消
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="f-modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function sel(state) {
   // console.log(state);
    return {topos:state.topos,devGroup:state.devicesGroup,ListBox:state.ListBox,devicesList:state.devicesList,chkData:state.ListBox.chkData,
        devGroupList:state.devGroupList,validator:state.validator_1
    }

}
export default connect(sel)(AddDeviceGroup)