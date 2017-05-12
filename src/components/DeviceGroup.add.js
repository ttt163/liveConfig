
import React, {
    Component,
    PropTypes
} from 'react'
import { connect } from 'react-redux'
import { addTopo,addDevGroup,changeDevChk,clearDevs} from '../actions/devGoupActions'
import { listAction,changeChk,changeAllChk} from '../actions/listBoxactions'
import Topology from './DeviceGroup.Topology.js'
import LisatBox from './listBox.js'
import { Checkbox } from 'antd';
import {ShowDiag,addOperation} from  "../public/js/f.js"
import { URL } from '../config.js';
import {getDevGroupData} from "../containers/DeviceGroup.js";
import {getDevData,roleOption} from '../containers/Device.js'
import { showDeviceList} from '../actions/actions'
import { Select } from 'antd';
const Option = Select.Option;
import ValidateItem from "./Validate.item.js"
import {validateField,validateAllFields} from "../public/js/validate/validateRform.js"
//import { roleOption } from '../containers/Device.js';
class AddDeviceGroup extends Component {
    constructor(state) {
        super(state);
        /*this.state = {
            topoItem:[]
        }*/
        /*
         "CHN": {
         "TJ": {
         "ip_main": [
         "192.168.10.1",
         "192.168.10.3"
         ],
         "ip_back": [
         "192.168.10.2",
         "192.168.10.4"
         ]
         },
         "default": {
         "ip_main": [
         "192.168.10.1",
         "192.168.10.3"
         ],
         "ip_back": [
         "192.168.10.2",
         "192.168.10.4"
         ]
         }
         },
        */
    }

   /* componentWillReceiveProps() {
        const {devGroup}=this.props;
        if(!devGroup.devDatas){
            return;
        }
        var val=devGroup.devDatas.filter(function(chk){return chk.isChk==true}).length
       // validateField("DevGroup","dev",val);
    }*/
    editdevGroup(e){
        var name=e.target.name.substring(e.target.name.lastIndexOf("devGroup-")+9);
        var _data={[name]:e.target.value};
        this.props.dispatch(addDevGroup(_data));
    }
    getDevByThis(val,name){
        const {devicesList,devGroup,dispatch}=this.props;
        //var name=e.target.name.substring(e.target.name.lastIndexOf("devGroup-")+9);
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
                    var data=!data.info.data?[]:data.info.data;
                    //console.log(data);
                    dispatch(showDeviceList(data));
                    dispatch(listAction({"dataList":data}));
                }
            }
        });
        /*var data={
         "query":{..._data},
         "page":"1",
         "row":"100"
         };*/
        // getDevData(this.props.dispatch,data);
        //devicesList延迟
        /* console.log(this.props.devicesList);
         const {devicesList}=this.props;
         var devList=[];
         for(var i=0;i<devicesList.list.length;i++){
         var item={"_id":devicesList.list[i]._id,"name":devicesList.list[i].name,"addr":devicesList.list[i].addr,"ips":[...devicesList.list[i].ips],"isChk":false};
         devList.push(item);
         }
         console.log(devList);
         this.props.dispatch(listAction({"dataList":devList}));*/

    }
    //选择设备box  addr ips  role
    choseDev(){
        //console.log(this.props);
        const {devicesList}=this.props;
        var devList=[];
        if(devicesList.list&&devicesList.list.length){
            for(var i=0;i<devicesList.list.length;i++){
                var item={"_id":devicesList.list[i]._id,"name":devicesList.list[i].name,"addr":devicesList.list[i].addr,"ips":[...devicesList.list[i].ips],"isChk":false};
                devList.push(item);
            }
        }

       // console.log(this.props.chkData);
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
        const {chkData,dispatch}=this.props;
       var devs={},_ckData=chkData.slice(0);
        //console.log(chkData);
        for(var i=0;i<_ckData.length;i++){
            devs={...devs,[_ckData[i]._id]:_ckData[i].name}
        }
        //console.log(chkData);
    var _data={"devDatas":_ckData,"device_ids":devs};
        dispatch(addDevGroup(_data));
        dispatch(listAction({"isChose":false}));
        validateField("DevGroup","dev",_ckData.length);
    }
    //提交新增设备组
    subDevGroup(e){
        e.preventDefault();
        const {dispatch,devGroupList}=this.props;
        if(!validateAllFields("DevGroup")){
            //console.log("gggg");
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
                    var $addModel = $('#f-addGropu-modal'); //添加模态框
                    $addModel.modal('hide');
                    new ShowDiag({
                        msg: '添加成功！',
                        closetime: 2
                    });
                   // var _data=this.props.devGroupList.search;
                    getDevGroupData(dispatch,devGroupList.search);
                    addOperation(`新增设备组${_data.name}`);
                }else{
                    //alert('添加失败');
                    new ShowDiag({
                        msg: !data.info.warning?'添加失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        })
    }
    changeDevChk(index,e){
        const {dispatch,ListBox}=this.props;
        var dataList=ListBox.dataList,val=e.target.value;
        //console.log(val);
        dispatch(changeDevChk({"isChk":e.target.checked},index));
        for(var i=0;i<dataList.length;i++){
            if(dataList[i]._id==val){
                dispatch(changeChk({"isChk":e.target.checked},i));
                break;
            }
        }

    }
//添加拓扑结构
   /* addTopoFn(){
        var topoData={
            "_id": "",
            "name": "",
            "devs_group_id": "",
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
                    "ip_main": [],
                    "ip_back": []
                }
            }
        }
        this.props.dispatch(addTopo(topoData));
        $(this.refs.topo).show();
    }*/
    render() {
        //const { dispatch,topos,devGroup,ListBox} = this.props;
        const { dispatch,devGroup,ListBox,validator} = this.props;
        return (
            <div className="modal fade f-modal" id='f-addGropu-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 新增设备组</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="d_add" >
                                <input type="hidden" name="_token" />
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
                                        {/* <select value={devGroup.role} onChange={this.editdevGroup.bind(this)} name="devGroup-role" className="form-control">*/}
                                        <ValidateItem validator={validator} thisForm="DevGroup" field="role">
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="请选择"
                                                optionFilterProp="children"
                                                onChange={(val)=>{this.getDevByThis(val,"role");validateField("DevGroup","role",val);}}
                                                notFoundContent="无搜索结果！"
                                                value={devGroup.role}
                                                >
                                                {roleOption}
                                            </Select>
                                        </ValidateItem>

                                        {/*<select value={devGroup.role} onChange={this.getDevByThis.bind(this)} name="devGroup-role" className="form-control">
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
                                            <LisatBox isChose={ListBox.isChose} topos={[]}  confirmChk={()=>{this.confirmChk()}} />
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
                                            <button onClick={()=>{dispatch(changeAllChk({"chkAll":"clear"}));dispatch(clearDevs({"isChk":false}));validateField("DevGroup","dev",devGroup.devDatas.filter(function(chk){return chk.isChk==true}).length);}} type="button" className="f-btn ml15 f-checkClear">清除</button>
                                        </label>
                                        <div className="clearfix f-seltCustomer">
                                            {devGroup.devDatas?
                                                devGroup.devDatas.map((item,index)=>
                                                        <div key={index} className="col-xs-6">
                                                            <Checkbox onChange={(e)=>{this.changeDevChk(index,e);validateField("DevGroup","dev",devGroup.devDatas.filter(function(chk){return chk.isChk==true}).length);}} value={item._id} checked={item.isChk} index={index}>{item.name}</Checkbox>
                                                        </div>
                                                )
                                                :""}
                                        </div>
                                    </div>
                                </div>

                                {/*<div className="form-group">
                                    <div className="col-xs-11">
                                    <button style={{'marginLeft': '5%'}} onClick={this.addTopoFn.bind(this)}  type='button' className="btn blue-btn">添加拓扑</button>
                                    </div>
                                </div>
                                <div ref="topo" style={{'marginLeft': '2%',"display":topos.topoItems.length?"block":'none'}}>
                                    <Topology  />
                                </div>*/}

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
    //console.log(state.topos.topoItems);
    return {topos:state.topos,devGroup:state.devicesGroup,ListBox:state.ListBox,devicesList:state.devicesList,chkData:state.ListBox.chkData,devGroupList:state.devGroupList,validator:state.validator_1}
    // return {topos:state.topos,devGroup:state.devicesGroup,ListBox:state.ListBox,devicesList:state.devicesList,chkData:state.ListBox.chkData}
}
export default connect(sel)(AddDeviceGroup)