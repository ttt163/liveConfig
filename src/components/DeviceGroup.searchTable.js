/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { showEditTopo,addDevGroup} from '../actions/devGoupActions';
import { listAction} from '../actions/listBoxactions'
import {ShowDiag,addOperation} from  "../public/js/f.js"
//import { URL } from '../config.js';
import { URL,ROLE } from '../config.js';
import { Checkbox,Tooltip } from 'antd';
import {getDevData} from '../containers/Device.js'
import {formatGetTopoData} from '../containers/DeviceGroup.js'
import { selectTopo,editTopData} from '../actions/devGoupActions.js'
import {getDevGroupData} from "../containers/DeviceGroup.js";
//import {getDevGroupData} from "../containers/DeviceGroup.js"
import {getFormFields} from "../public/js/validate/validateRform.js"
import {clearArrFormFn} from "../public/js/validate/validateRform.js"
import {formatBelongToData} from "./Device.searchList.js"
class SearchDeviceGroupTable extends Component {
    showTopoInfo(id,e){
        e.preventDefault();
        const {dispatch}= this.props;
        var topoArr=[], sTopo={
            "query":{
                "_id":id,
            },
            "page":"1",
            "row":"1",
        };
        $.ajax({
            url: `${URL}/GetTopologyConfig`,
            type: 'post',
            data: JSON.stringify(sTopo),
            async: false,  //默认为true 异步
            dataType: "json",
            error: function () {
                console.log("操作失败");
            },
            success: function (data) {
                //console.log(data);
                var info =data.info;
                if(info.status=="success"){
                    if(!info.data||!info.data.length){
                        new ShowDiag({
                            msg: '拓扑不存在！',
                            closetime: 1
                        });
                        return;
                    }
                    topoArr.push(formatGetTopoData(info.data[0]));
                    dispatch(showEditTopo(topoArr));
                }else{
                    new ShowDiag({
                        msg: '拓扑不存在！',
                        closetime: 1
                    });
                    return;
                }
                $("#f-topo-info").modal();
            }
        });
        //拓扑所在集群
        $.ajax({
            url: `${URL}/GetClusterByTo`,
            type: 'post',
            data: JSON.stringify({"topology_id":id}),
            async: false,  //默认为true 异步
            dataType: "json",
            error: function () {
                console.log("操作失败");
            },
            success: function (data) {
                //console.log(data);
                var info =data.info;
                if(info.status=="success"){
                   // console.log(info);
                    var _data=info.data||[];
                    dispatch(editTopData({belongToCluster:_data},0));
                }
            }
        });

    }
    editDevGroup(id,ev){
        //console.log("105");
        clearArrFormFn("toposForm");
        const {dispatch}= this.props;
        dispatch(selectTopo(0));
       // var id=$(ev.target).closest("tr").data("id"),_data={"_id":id};
        $.ajax({
            url:`${URL}/GetDevGroupConfig`,
            type:'post',
            data:JSON.stringify({"query":{"_id":id},"page":"1","row":"10"}),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(){
                console.log("操作失败");
            },
            success:function(data){
               // console.log(data);
                //devDatas
                if(data.info.status=="success"){
                    var devGroupInfo=data.info.data[0];
                    var devId=devGroupInfo.device_ids,topoId=devGroupInfo.topology_ids;
                    devGroupInfo={...devGroupInfo,"devDatas":[],"searchDev":""};
                    //console.log(topoId);
                    if(!$.isEmptyObject(devId)) {
                        for (var [k,v] of Object.entries(devId)) {
                            var data = {
                                "query": {"_id": k},
                                "page": "1",
                                "row": "100"
                            };
                            $.ajax({
                                url: `${URL}/GetDevConfig`,
                                type: 'post',
                                data: JSON.stringify(data),
                                async: false,  //默认为true 异步
                                dataType: "json",
                                error: function () {
                                    console.log("操作失败");
                                },
                                success: function (data) {
                                    if (data.info.status == "success") {
                                        if(!data.info.data){
                                            return;
                                        }
                                        var data = data.info.data[0];
                                        //console.log(data);
                                        // dispatch(changeChk({"_id":e.target.value,"name":data.name,"isChk":e.target.checked,"ips":data.ips,"addr":data.addr},index));
                                        devGroupInfo.devDatas.push({...data, "isChk": true});
                                        //dispatch(showDeviceList(data));
                                        //dispatch(listAction({"dataList":data}));

                                    }
                                }
                            });
                            //devGroupInfo.devDatas.push({"_id":k,"name":v,"isChk":true});
                        }
                    }
                   // console.log(devGroupInfo.devDatas);
                    var _ckData=devGroupInfo.devDatas.slice(0);
                    dispatch(listAction({"chkData":_ckData,"isChose":false}));
                    dispatch(addDevGroup(devGroupInfo));
                    //更新设备
                    //console.log(devGroupInfo.role);
                    var data={
                        "query":{"role":devGroupInfo.role,"ifuse":"1"},
                        "page":"1",
                        "row":"100"
                    };
                    getDevData (dispatch,data);
                    //拓扑
                    var topoArr=[];
                    if(topoId&&topoId.length){

                        var sTopo={
                            "query":{
                                "devs_group_id":id,
                            },
                            "page":"1",
                            "row":"100",
                        };
                        $.ajax({
                            url: `${URL}/GetTopologyConfig`,
                            type: 'post',
                            data: JSON.stringify(sTopo),
                            async: false,  //默认为true 异步
                            dataType: "json",
                            error: function () {
                                console.log("操作失败");
                            },
                            success: function (data) {
                              //  console.log(data);
                                var info =data.info;
                                if(info.status=="success"){
                                    for(var i=0;i<info.data.length;i++){
                                        topoArr.push(formatGetTopoData(info.data[i]));
                                    }
                                   // console.log(topoArr);
                                    dispatch(showEditTopo(topoArr));
                                }
                                //console.log(data);
                            }
                        });
                    }else{
                        //console.log(topoArr);
                        dispatch(showEditTopo([]));
                        dispatch(addDevGroup({"topology_ids":[]}));
                       // dispatch(showEditTopo([]));
                    }
                    //dispatch(selectTopo(0));
                    var $editModal = $('#f-editGropu-modal');
                    $editModal.modal('show');
                    //加验证
                   getFormFields("DevGroup", {
                        "name": {
                            "value": devGroupInfo.name,
                            "rule": {"required": true, "regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/, "maxLen": 200},
                            "msg": {"required": "设备组名不能为空", "regexp": "设备组名由中文，数字，英文字母，下划线和“-”组成！", "maxLen": "设备组名不能超过200个字符"}
                        },
                        "role": {
                            "value": devGroupInfo.role,
                            "rule": {"required": true},
                            "msg": {"required": "设备组角色不能为空"}
                        },
                        "dev": {
                            "value": _ckData.length,
                            "rule": {"required": true},
                            "msg": {"required": "请选择设备"}
                        }
                    });
                    /*new ShowDiag({
                        msg: '操作成功！',
                        closetime: 1
                    });*/
                }else{
                    new ShowDiag({
                        msg: '操作失败！',
                        closetime: 1
                    });
                }
            }
        })


    }
    //删除设备组
    delThisDeviceGroup(id,ev,name){
        const {dispatch,devGroupList}=this.props;
        var val=$(ev.target).text();
       // var id=$(ev.target).closest("tr").data("id");
        if(id){
            Modal.confirm({
                msg: '确认要' + val + '吗？',
                title: val,
                btnok: "确定",
                btncl: "取消"
            }).on(function(e) {
                if (e) {
                    var _data={
                        "query":{
                            "_id":id
                        }
                    }
                    $.ajax({
                        url:`${URL}/DeleteDevGroupConfig`,
                        type:'post',
                        data:JSON.stringify(_data),
                        async: true,  //默认为true 异步
                        dataType: "json",
                        error:function(error){
                            var data=$.parseJSON(error.responseText);
                            new ShowDiag({
                                msg: !data.info.warning?'删除失败！':data.info.warning,
                                closetime: 2
                            });
                        },
                        success:function(data){
                            //console.log(data);
                            if(data.info.status=="success"){
                                new ShowDiag({
                                    msg: '删除成功！',
                                    closetime: 1
                                });
                                //更新设备组列表
                                getDevGroupData(dispatch,devGroupList.search);
                                addOperation(`删除频道组${name}`);
                            }else{
                                new ShowDiag({
                                    msg: !data.info.warning?'删除失败！':data.info.warning,
                                    closetime: 2
                                });
                            }
                        }
                    })
                }
            })
        }


    }
    /*changeCheck(e){
        console.log(e.target.value);
    }*/
    //设备组详情
    showDevGroupInfo(id){
        const {dispatch}= this.props;
        var _data={"_id":id};
        $.ajax({
            url:`${URL}/GetDevGroupConfig`,
            type:'post',
            data:JSON.stringify({"query":_data,"page":"1","row":"10"}),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(){
                console.log("操作失败");
            },
            success:function(data){
               // console.log(data);
                if(data.info.status=="success"){
                    var devGroupInfo=data.info.data[0];
                    var devId=devGroupInfo.device_ids,topoId=devGroupInfo.topology_ids;
                    devGroupInfo={...devGroupInfo,"devDatas":[]};
                    if(!$.isEmptyObject(devId)) {
                        for (var [k,v] of Object.entries(devId)) {
                            devGroupInfo.devDatas.push({"_id": k,"name":v});
                        }
                    }
                    dispatch(addDevGroup(devGroupInfo));
                    //拓扑
                    var topoArr=[];
                    if(!$.isEmptyObject(topoId)){
                        dispatch(selectTopo(0));
                        var sTopo={
                            "query":{
                                "devs_group_id":id,
                            },
                            "page":"1",
                            "row":"100",
                        };
                        $.ajax({
                            url: `${URL}/GetTopologyConfig`,
                            type: 'post',
                            data: JSON.stringify(sTopo),
                            async: false,  //默认为true 异步
                            dataType: "json",
                            error: function () {
                                console.log("操作失败");
                            },
                            success: function (data) {
                                 // console.log(data);
                                var info =data.info;
                                if(info.status=="success"){
                                    for(var i=0;i<info.data.length;i++){
                                        topoArr.push(formatGetTopoData(info.data[i]));
                                    }
                                     //console.log(topoArr);
                                    dispatch(showEditTopo(topoArr));
                                }
                            }
                        });
                    }else{
                        dispatch(showEditTopo(topoArr));
                    }
                    //所属设备

                    dispatch(addDevGroup({"belongTo":{"clms":"","nginx":""}}));
                    $.ajax({
                        url: `${URL}/GetBelongTo`,
                        type: 'post',
                        data: JSON.stringify({"devs_group_id": id}),
                        //data: JSON.stringify({"devs_group_id": '58008b3d421aa91b18000009'}),
                        async: false,  //默认为true 异步
                        dataType: "json",
                        error: function () {
                            console.log("操作失败");
                        },
                        success: function (data) {
                            //console.log(data);
                            if (data.info.status == "success") {
                                var _data=data.info.data;
                                dispatch(addDevGroup({"belongTo":formatBelongToData(_data)}));
                            }
                        }
                    });
                    $('#f-detailDevGro-modal').modal('show');
                }else{
                    new ShowDiag({
                        msg: '操作失败！',
                        closetime: 1
                    });
                }
            }
        });



    }
    render() {
        const {devGroupList}=this.props;
        return (
            <table className="table f-table pf">
                <thead>
                <tr>
                    {/*<th style={{width:'40px'}}>
                        <Checkbox></Checkbox>
                    </th>*/}
                    <th style={{width:'200px'}}>设备组名</th>
                    <th style={{width:'100px'}}>设备组角色</th>
                    <th >设备</th>
                    <th style={{width:'200px'}}>拓扑结构</th>
                    <th style={{width:'140px'}}>操作</th>
                </tr>
                </thead>
                <tbody>
                {devGroupList&&devGroupList.list?devGroupList.list.map((item,index)=>(
                    <tr key={index} data-id={item._id}>
                       {/* <td> <Checkbox value={item._id} onChange={(e)=>this.changeCheck(e)} ></Checkbox></td>*/}
                        <td>{item.name}</td>
                        <td>{ROLE[item.role]?ROLE[item.role]+"组":item.role}</td>
                        <td>{item.devItem.map((dev,i)=><span key={i}>{dev.name}{i!=item.devItem.length-1?"，":""}</span>)}</td>
                        <td>{item.topoItem.map((topo,i)=>(

                        <div style={{"lineHeight":"30px"}} key={i}>
                            <Tooltip placement="top" title={!topo.topoRemarks?"暂无备注信息！":topo.topoRemarks}>
                                <a onClick={(e)=>this.showTopoInfo(topo._id,e)}  href="javascript:;">{topo.name}</a>

                            </Tooltip>
                        </div>

                        ))}</td>
                       {/* <td>
                            <div><a onClick={this.showTopoInfo.bind(this)}  href="#">拓扑1</a></div>
                            <div><a href="#">拓扑2</a></div>
                        </td>*/}
                        <td><a href='javascript:;' className="f-edit" onClick={(e)=>this.editDevGroup(item._id,e)} >编辑</a>
                            | <a href='javascript:;' onClick={(e)=>this.delThisDeviceGroup(item._id,e,item.name)} >删除</a>
                            | <a href='javascript:' onClick={()=>this.showDevGroupInfo(item._id)} className="f-detail">详情</a></td>
                    </tr>
                )):<tr><td colSpan="5">暂无数据！</td></tr>}


                </tbody>
            </table>
        )
    }
}
function sel(state) {
    return {topos:state.topos,devGroup:state.devicesGroup,devGroupList:state.devGroupList}

}
export default connect(sel)(SearchDeviceGroupTable)