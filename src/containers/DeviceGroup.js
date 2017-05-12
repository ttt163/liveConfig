//import '../public/plugs/bootstrap/css/bootstrap.css';
//import "../public/css/f.css"
//import  '../css/main.css';
import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
//import { addDevGroup} from '../actions/devGoupActions'
//import {selectie,validateChosen,formCheck,alertMsg,selt,ShowDiag} from  "../public/js/f.js"
import {ShowDiag} from  "../public/js/f.js"
import SearchDeviceGroup from '../components/DeviceGroup.search'
import SearchDeviceGroupTable from '../components/DeviceGroup.searchTable'
import AddDeviceGroup from '../components/DeviceGroup.add.js'
import EditDeviceGroup from '../components/DeviceGroup.edit.js'
import DeviceGroupDetail from '../components/DeviceGroup.detail.js'
import TopoInfo from '../components/Topology.info.js'
import { URL } from '../config.js';
import {getDevData} from './Device.js'
import {addDevGroup,searchDevGroup,showDevGroupList,showEditTopo} from '../actions/devGoupActions.js'
import { listAction} from '../actions/listBoxactions'
import { showDeviceList} from '../actions/actions'
import { Pagination,Select  } from 'antd';
const Option = Select.Option;
import {getForm,getFields,getFormFields,clearFormData,clearArrFormFn,delFormsFn} from "../public/js/validate/validateRform.js"
//import { showEditTopo,addDevGroup} from '../actions/devGoupActions';
//格式化拓扑接口数据
export function formatGetTopoData(topoData){
    var nTopo=Object.assign({}, topoData, {
        topology_info: {"ipConfig":[],"default":{"Ipinfo":[]}}
    });
    for(var [k,v] of Object.entries(topoData.topology_info)){
        if(k=="default"){
            for(var [k1,v1] of Object.entries(v.default)){
                for(var d=0;d<v1.length;d++){
                    nTopo.topology_info.default.Ipinfo.push({"ip":v1[d],"type":k1});
                }
            }
        }else{
            //运营商
            var oprItem={
                "operators":"",
                "default":[],
                "provinces": []
            };
            oprItem.operators=k;
            for(var [k1,v1] of Object.entries(v)){
                if(k1=="default"){
                    for(var [k2,v2] of Object.entries(v1)){
                        for(var d=0;d<v2.length;d++){
                            oprItem.default.push({"ip":v2[d],"type":k2});
                        }
                    }
                }else{
                    //省份
                    var priItem={
                        "province": "",
                        "Ipinfo": []
                    };
                    //console.log(k1);
                    priItem.province=k1;
                    for(var [k2,v2] of Object.entries(v1)){
                        for(var d=0;d<v2.length;d++){
                            priItem.Ipinfo.push({"ip":v2[d],"type":k2});
                        }
                    }
                    oprItem.provinces.push(priItem);

                }
                if(!oprItem.provinces[0]){
                    oprItem.provinces.push({"province": "","Ipinfo": [{ip: "", type: ""}]})
                }
                //console.log(oprItem.provinces);
            }
            nTopo.topology_info.ipConfig.push(oprItem);
        }
    }
    //console.log(nTopo.topology_info.ipConfig);
    if(!nTopo.topology_info.ipConfig||!nTopo.topology_info.ipConfig[0]){
        nTopo.topology_info.ipConfig.push({
            "operators": "",
            "default": [{ip: "", type: ""}],
            "provinces": [
                {
                    "province": "",
                    "Ipinfo": [{ip: "", type: ""}]
                }
            ]
        });
    }
    //console.log(nTopo);
    return nTopo;
}
//格式化拓扑提交数据
export function formatSubmitTopoData(topoData){
   // console.log(topoData);
    var nTopo=Object.assign({}, topoData, {
        topology_info: {"default":{"default":{"ip_main":[],"ip_back":[]}}}
    });
    var topoInfo=topoData.topology_info,ipConfig=topoInfo.ipConfig,topoDef=topoInfo.default.Ipinfo;
    var nTopoInfo=nTopo.topology_info;
    var opr={};
    //运营商
    if(ipConfig){
        for(var i=0;i<ipConfig.length;i++){
            //console.log(ipConfig[i].operators);
            var oprName=ipConfig[i].operators;
            if(!oprName){
                //运营商不存在
                break;
            }
            opr={
                [oprName]:{"default":{"ip_main":[],"ip_back":[]}}
            }
            //省份
            for(var j=0;j<ipConfig[i].provinces.length;j++){
                var thisopr=opr[oprName];
                if(!ipConfig[i].provinces[j].province){
                    //省份不存在
                    break;
                }
                var prv={
                    [ipConfig[i].provinces[j].province]:{"ip_main":[],"ip_back":[]}
                }
                //console.log(ipConfig[i].provinces[j].province);
                ///这里
                for(var k=0;k<ipConfig[i].provinces[j].Ipinfo.length;k++){
                    if(ipConfig[i].provinces[j].Ipinfo[k].type=="ip_main"){
                        prv[ipConfig[i].provinces[j].province].ip_main.push(ipConfig[i].provinces[j].Ipinfo[k].ip);
                    }else{
                        prv[ipConfig[i].provinces[j].province].ip_back.push(ipConfig[i].provinces[j].Ipinfo[k].ip);
                    }
                }
                opr[oprName]={...thisopr,...prv};

            }
            if(ipConfig[i].default){
                for(var j=0;j<ipConfig[i].default.length;j++){
                    if(ipConfig[i].default[j].type=="ip_main"){
                        opr[oprName].default.ip_main.push(ipConfig[i].default[j].ip);
                    }else{
                        opr[oprName].default.ip_back.push(ipConfig[i].default[j].ip);
                    }
                }
            }

            nTopoInfo={...nTopoInfo,...opr}
        }
    }

    //默认ip
    //console.log(topoDef);
    if(topoDef){
        for(var i=0;i<topoDef.length;i++){
            if(topoDef[i].type=="ip_main"){
                nTopoInfo.default.default.ip_main.push(topoDef[i].ip);
            }else{
                nTopoInfo.default.default.ip_back.push(topoDef[i].ip);
            }
        }
    }

    //console.log(nTopo);
    nTopo={...nTopo,"topology_info":nTopoInfo};
    //console.log(nTopo);
    return nTopo;
}
//查询设备组
export function getDevGroupDatas(data){
    var resData=[],count=0;
    $.ajax({
        url:`${URL}/GetDevGroupConfig`,
        type:'post',
        data:JSON.stringify(data),
        async: false,  //默认为true 异步
        dataType: "json",
        error:function(){
            console.log("更新失败");
        },
        success:function(data){
            if (data.info.status == "success") {
                if(!data.info.data){
                    //resData=[];
                    return ;
                }
                resData=data.info.data;
                count=!data.info.all_row?0:data.info.all_row;
            }
           /* if(data.info.all_row){
                var count=data.info.all_row;
                dispatch(searchDevGroup({"count":count}));
            }
            var listData=data.info.data;
            //console.log(listData);
            dispatch(showDevGroupList(listData));*/
        }
    })
    return {"data":resData,"count":count};
}
//查询拓扑
export function getTopoDatas(data){
    var resData=[];
    $.ajax({
        url:`${URL}/GetTopologyConfig`,
        type:'post',
        data:JSON.stringify(data),
        async: false,  //默认为true 异步
        dataType: "json",
        error:function(){
            console.log("更新失败");
        },
        success:function(data){
            if (data.info.status == "success") {
                if(!data.info.data){
                    //resData=[];
                    return ;
                }
                resData=data.info.data;
                //count=!data.info.all_row?0:data.info.all_row;
            }
            /* if(data.info.all_row){
             var count=data.info.all_row;
             dispatch(searchDevGroup({"count":count}));
             }
             var listData=data.info.data;
             //console.log(listData);
             dispatch(showDevGroupList(listData));*/
        }
    })
    return {"data":resData};
}
//更新设备组列表数据
export function getDevGroupData(dispatch,data){
    //console.log(data);
    //const  {dispatch}=this.props;
    //console.log(data);
    $.ajax({
        url:`${URL}/GetDevGroupConfig`,
        type:'post',
        data:JSON.stringify(data),
        async: true,  //默认为true 异步
        dataType: "json",
        error:function(){
            console.log("更新失败");
        },
        success:function(data){
            if(data.info.all_row){
                var count=data.info.all_row;
                dispatch(searchDevGroup({"count":count}));
            }
            var listData=data.info.data;
            //console.log(listData);
            dispatch(showDevGroupList(listData));
        }
    })
}
class Device extends React.Component {
    constructor(state) {
        super(state);
    }
    componentDidMount(){
        const  {dispatch}=this.props;
        //查询设备组
        var gData={"query":{},"page":"1","row":"10","all_row":"1"};
        dispatch(searchDevGroup(gData));
        getDevGroupData(dispatch,gData);

        //更新设备
        /*var data={
            "query":{"ifuse":"1"}
        };
        getDevData (dispatch,data);*/
        //----
        $("#f-addGropu-modal").on("hidden.bs.modal", function () {
            //dispatch(addValidate("DevGroup", {"valideMsg": {}, "fields": {}}));
            clearFormData("DevGroup");
        });
        $("#f-editGropu-modal").on("hidden.bs.modal", function () {
            //dispatch(addValidate("DevGroup", {"valideMsg": {}, "fields": {}}));
            clearFormData("DevGroup");
            clearArrFormFn("toposForm");
            dispatch(showEditTopo([]));
            //console.log("111");
            //clearArrFormFn("toposForm");
        });
    }
    componentWillMount(){
        //是否登录
        if(localStorage.loginInfo==undefined){
            localStorage.loginInfo=JSON.stringify({'loginStatus':false});
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }else{
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }else if(data.role=='业务运维'){
                window.location.href='#/'
            }
        }
    }
    componentWillUnmount() {
        //console.log("j结束");
        const {dispatch}=this.props;
        dispatch(searchDevGroup({"query":{"name":"","role":""}}));
       // clearFormData("searchDevGroup");
        delFormsFn(["searchDevGroup","toposForm","DevGroup"]);
    }
    addDevGroup(){
        const {dispatch} =this.props;
        var _data={
            "_id": "",
            "name": "",
            "type": "",
            "role": "",
            "ifuse": "",
            "devDatas":[],
            "topoDatas":[],
            "device_ids": {},
            "topology_ids": [],
            "searchDev":""
        };
        dispatch(addDevGroup(_data));
        dispatch(listAction({"isChose":false}));
        var sdata={
            "query":{"ifuse":"1"}
        };
        /*$.ajax({
            url:`${URL}/GetDevConfig`,
            type:'post',
            data:JSON.stringify(sdata),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(){
                console.log("操作失败");
            },
            success:function(data){
                //console.log(data);
                if(data.info.status=="success"){
                    var data=data.info.data;
                   // console.log(data);
                    dispatch(showDeviceList(data));
                    dispatch(listAction({"dataList":data,"chkData":[]}));
                }
            }
        });*/
        dispatch(listAction({"dataList":[],"chkData":[]}));
        var $addModal = $("#f-addGropu-modal");
        $addModal.modal('show');
        //加验证
        getFormFields("DevGroup", {
            "name": {
                "value": "",
                "rule": {"required": true, "regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/, "maxLen": 200},
                "msg": {"required": "设备组名不能为空", "regexp": "设备组名由中文，数字，英文字母，下划线和“-”组成！", "maxLen": "设备组名不能超过200个字符"}
            },
            "role": {
                "value": "",
                "rule": {"required": true},
                "msg": {"required": "设备组角色不能为空"}
            },
            "dev": {
                "value": "",
                "rule": {"required": true},
                "msg": {"required": "请选择设备"}
            }
        });
    }
    changePage(page){
        var sear=this.props.search;
        getDevGroupData(this.props.dispatch,{...sear,"page":page+"","all_row":"0"});
        this.props.dispatch(searchDevGroup({"page":page+""}));
    }
    changeSize(size) {
        var sear=this.props.search;
        getDevGroupData(this.props.dispatch,{...sear,"row":size+"","page":"1","all_row":"0"});
        this.props.dispatch(searchDevGroup({"row":size,"page":"1"}));
    }
    render() {
        const {devGroupList}=this.props;
        return <div>
            <SearchDeviceGroup />
            <div className="table-box">
                <div className="clearfix f-gradient">
                    <div className="f-caption pull-left">
                        <ul className="list-inline">
                            <li><h4>设备组列表</h4></li>
                            <li className="f-count">共<i>{devGroupList.search&&devGroupList.search.count?devGroupList.search.count:0}</i>条</li>
                            <li>每页显示
                                <div className="numSelect">
                                    <Select name="size" defaultValue="10" style={{ width: 80 }} onChange={(v)=>this.changeSize(v)} >
                                        <Option value="10">10</Option>
                                        <Option value="20">20</Option>
                                        <Option value="30">30</Option>
                                        <Option value="50">50</Option>
                                        <Option value="100">100</Option>
                                    </Select>
                                </div>
                                个
                            </li>
                        </ul>
                    </div>
                    <div className="pull-right">
                        <button type="button" className="btn  btn-small" onClick={this.addDevGroup.bind(this)} id="f-add">新增</button>
                        {/*<button type="button" className="btn  btn-small changeStatus" data-status="-2" data-url="/deviceGroup/destroy/" data-id="all">删除</button>*/}
                    </div>
                </div>
                <SearchDeviceGroupTable />
            </div>
            {!devGroupList.list?"":
                <Pagination onChange={this.changePage.bind(this)} pageSize={devGroupList.search?parseInt(devGroupList.search.row):10} current={devGroupList.search?parseInt(devGroupList.search.page):1}  total={devGroupList.search?parseInt(devGroupList.search.count):0} />
            }


            {/*拓扑详情*/}
            <TopoInfo topos={this.props.topos.topoItems} />
            {/*设备组添加*/}
            <AddDeviceGroup />
            {/*设备组编辑*/}
            <EditDeviceGroup />
            {/*设备组详情*/}
            <DeviceGroupDetail />
            {/*转吗配置状态*/}
            <div className="modal fade f-modal" id='f-confState'></div>
        </div>
    }


}
function sel(state) {
    // console.log(state);
    //console.log(state.topos.topoItems);
    return {topos:state.topos,search:state.devGroupList.search,devGroup:state.devicesGroup,devGroupList:state.devGroupList}

}
export default connect(sel)(Device)

