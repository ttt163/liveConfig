import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import {getClusterDatas,getdevGroupByRole} from "../containers/Cluster.js"
import {addCluster,editLevel,showCluster} from "../actions/clusterActions.js"
import {reverseBykey} from "./Cluster.add.level.js"
//import {getClusterDatas} from "../containers/Cluster.js"
import {ShowDiag,addOperation} from  "../public/js/f.js"
import { URL } from '../config.js';
import { Select,Tooltip } from 'antd';
const Option = Select.Option;
import {formatGetTopoData} from '../containers/DeviceGroup.js'
import { showEditTopo,editTopData} from '../actions/devGoupActions';
import {getFields,getFormFields} from "../public/js/validate/validateRform.js"
import {formatBelongToData} from "./Device.searchList.js"
//var bdevGroupOption=[],zdevGroupOption=[];
class SearchClusterTable extends Component {
    //编辑
    editCluster(id){
        const {dispatch}=this.props;
        var data={
            "query":{"_id":id}
        }
        var thisData=getClusterDatas(data);
        //console.log(thisData);
        if(!thisData){
            new ShowDiag({
                msg: '数据不存在！',
                closetime: 1
            });
            return;
        }
        //
        //var leves=reverseBykey(thisData.data[0].level_devs_group,"level");
        var leves=thisData.data[0].level_devs_group;
        if(!leves){
            dispatch(addCluster(thisData.data[0]));
            return;
        }
        thisData.data[0].level_devs_group=leves;
        dispatch(addCluster(thisData.data[0]));
        $('#d-editCluster-modal').modal();
        /*bdevGroupOption=getdevGroupByRole("3");
        zdevGroupOption=getdevGroupByRole("2");*/
        for(var j=0;j<leves.length;j++){
            $.ajax({
                url:`${URL}/GetTopologyConfig`,
                type:'post',
                data:JSON.stringify({"query":{"devs_group_id":leves[j].devs_group_id}}),
                async: false,  //默认为true 异步
                dataType: "json",
                error:function(){
                    console.log("操作失败");
                },
                success:function(data){
                    //console.log(data);
                    if(data.info.status=="success"){
                        var data=data.info.data;
                        var _topoOpc=[];
                        if(!data){
                            return;
                        }
                        for(var i=0;i<data.length;i++){
                            var _remk=!data[i].topoRemarks||data[i].topoRemarks=="undefined"?"undefined":data[i].topoRemarks;
                            _topoOpc.push(<Option key={data[i]._id+"&devG&"+data[i].name+"&devGTopo&"+_remk}>{data[i].name}</Option>);

                        }
                        var thiLev=leves[j];
                        //thisData.level_devs_group={...thiLev,"topoArr":_topoOpc};
                        dispatch(editLevel({ "topoArr":_topoOpc},j));
                    }
                }
            })
        }
        //console.log(thisData);

        //加验证
        getFormFields("cluster", {
            "name": {
                "value": thisData.data[0].name,
                "rule": {"required": true,"regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/,"maxLen":200},
                "msg": {"required": "集群名称不能为空！","regexp": "集群名称只能由中文，数字，英文字母，下划线和“-”组成！","maxLen":"集群名称不能超过200个字符"}
            }/*,
            "levels_amount": {
                "value": thisData.data[0].levels_amount,
                "rule": {"required": true,"regexp": /^[2-9]+$|^([1-9][0-9])*$/},
                "msg": {"required": "层级不能为空！","regexp": "层级必须是2以上的整数！"}
            }*/
        });

    }
    //拷贝
    copyCluster(id){
        //console.log(id);
        const {dispatch}=this.props;
        var data={
            "query":{"_id":id}
        }
        var thisData=getClusterDatas(data);
        //console.log(thisData);
        if(!thisData){
            new ShowDiag({
                msg: '数据不存在！',
                closetime: 1
            });
            return;
        }
        var _thisData=thisData.data[0];
        dispatch(addCluster({..._thisData,"copyName":""}));
        $("#f-copy-modal").addClass("fade");
        $("#f-copy-modal").modal();
        //
        getFormFields("clusterCopy",{"copyName": {
            "value": "",
            "rule": {"required": true,"regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/,"maxLen":200},
            "msg": {"required": "拷贝集群名称不能为空！","regexp": "拷贝集群名称只能由中文，数字，英文字母，下划线和“-”组成！","maxLen":"拷贝集群名称不能超过200个字符"}
        }})

    }
    //删除
    delCluster(id,name){
        const {dispatch,clusterList}=this.props;
        Modal.confirm({
            msg: '确认要删除吗？',
            title: "删除",
            btnok: "确定",
            btncl: "取消"
        }).on(function(e) {
            if (e) {
                var _data={
                    "query":{
                        "_id":id
                    }
                };
                $.ajax({
                    url: `${URL}/DeleteClusterConfig`,
                    type: 'post',
                    data: JSON.stringify(_data),
                    async: true,  //默认为true 异步
                    dataType: "json",
                    error:function(error){
                        var data=$.parseJSON(error.responseText);
                        new ShowDiag({
                            msg: !data.info.warning?'删除失败！':data.info.warning,
                            closetime: 2
                        });
                    },
                    success: function (data) {
                        //console.log(data);
                        if (data.info.status == "success") {
                            new ShowDiag({
                                msg: '删除成功！',
                                closetime: 1
                            });
                            var upData=clusterList.search;
                            var list=getClusterDatas({...upData,"all_row":"1"});
                            dispatch(showCluster({"list":list.data,"search":{...upData,"count":list.count}}));
                            addOperation(`删除集群${name}`);
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
    //详情
    showClusterInfo(id){
        const {dispatch,clusterList}=this.props;
        var _data={
            "query":{"_id":id}
        };
        $.ajax({
            url: `${URL}/GetClusterConfig`,
            type: 'post',
            data: JSON.stringify(_data),
            async: true,  //默认为true 异步
            dataType: "json",
            error: function () {
                new ShowDiag({
                    msg: '操作失败！',
                    closetime: 1
                });
            },
            success: function (data) {
                //console.log(data);
                if (data.info.status == "success") {
                    dispatch(addCluster(data.info.data[0]));
                    //所属频道
                    dispatch(addCluster({"belongTo":{"clms":"","nginx":""}}));
                    $.ajax({
                        url: `${URL}/GetBelongTo`,
                        type: 'post',
                        data: JSON.stringify({"cluster_id": id}),
                        //data: JSON.stringify({"devs_group_id": '58008b3d421aa91b18000009'}),
                        async: true,  //默认为true 异步
                        dataType: "json",
                        error: function () {
                            console.log("操作失败");
                        },
                        success: function (data) {
                            //console.log(data);
                            if (data.info.status == "success") {
                                var _data=data.info.data;
                                dispatch(addCluster({"belongTo":formatBelongToData(_data)}));
                                $("#f-detailcluster-modal").modal();
                            }
                        }
                    });

                    /*var upData=clusterList.search;
                    var list=getClusterDatas({...upData,"all_row":"1"});
                    dispatch(showCluster({"list":list.data,"search":{...upData,"count":list.count}}));*/
                }else{
                    new ShowDiag({
                        msg: '操作失败！',
                        closetime: 1
                    });
                }
            }
        });

    }
    //拓扑详情
    showTopoInfo(id,e){
        e.preventDefault();
        const {dispatch}= this.props;
        var topoArr=[], sTopo={
            "query":{
                "_id":id
            }
        };
        $.ajax({
            url: `${URL}/GetTopologyConfig`,
            type: 'post',
            data: JSON.stringify(sTopo),
            async: true,  //默认为true 异步
            dataType: "json",
            error: function () {
                console.log("操作失败");
            },
            success: function (data) {
                //console.log(data);
                var info =data.info;
                if(info.status=="success"){
                    if(!info.data){
                        new ShowDiag({
                            msg: '拓扑不存在！',
                            closetime: 1
                        });
                        return;
                    }
                    topoArr.push(formatGetTopoData(info.data[0]));
                    dispatch(showEditTopo(topoArr));
                    $("#f-topo-info").modal();
                }else{
                    new ShowDiag({
                        msg: '拓扑不存在！',
                        closetime: 1
                    });
                    return;
                }

            }
        });
        //拓扑所在集群
        /*$.ajax({
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
        });*/

    }
    render() {
        const {list}=this.props;
        return (
            <table className="table f-table pf">
                <thead>
                <tr>
                    { /*<th rowSpan="2" style={{width:'40px'}}><input type="checkbox" id="inputAll" value="0"/></th>*/}
                    <th rowSpan="2"  style={{width:'230px'}}>集群名称</th>
                    <th rowSpan="2" style={{width:'80px'}}>层级数</th>
                    <th colSpan="2" >设备组配置</th>
                    <th rowSpan="2" style={{width:'220px'}}>操作</th>
                </tr>
                <tr>
                    <th>设备组</th>
                    <th>拓扑结构</th>
                </tr>
                </thead>
                <tbody>
                {!list||!list.length?
                    <tr><td colSpan="5">暂无数据！</td></tr>
                    :
                    list.map((item,index)=>(
                        <tr key={index}>
                            {/*<td><input type="checkbox" className="chk" value="4"/></td>*/}
                            <td className="cluscName">{item.name}</td>
                            <td>{item.levels_amount}</td>
                            <td>
                                {item.level_devs_group.map((data,i)=>
                                        <div key={i} style={{"borderBottom":i==item.level_devs_group.length-1?"0px": "1px solid #d8d8d8","height":"30px","lineHeight":"30px"}}>{data.devs_group_name}</div>
                                )}
                            </td>
                            <td>{item.level_devs_group.map((data,i)=>
                                    <div key={i} style={{"borderBottom":i==item.level_devs_group.length-1?"0px": "1px solid #d8d8d8","height":"30px","lineHeight":"30px"}}>
                                        <Tooltip placement="top" title={!data.topoRemarks||data.topoRemarks=="undefined"?"暂无备注信息！":data.topoRemarks}>
                                            <a onClick={(e)=>this.showTopoInfo(data.topology_id,e)}  href="javascript:;">{data.topology_name}</a>

                                        </Tooltip>
                                    </div>
                            )}</td>
                            <td className="f-table-oper"><a href='javascript:;' onClick={()=>this.editCluster(item._id)}>编辑</a>
                                | <a href='javascript:;' onClick={()=>this.delCluster(item._id,item.name)} >删除</a>
                                | <a href='javascript:;' onClick={()=>this.copyCluster(item._id)} >拷贝</a>
                                | <a href='javascript:;'  onClick={()=>this.showClusterInfo(item._id)}>详情</a>
                            </td>
                        </tr>

                    ))

                }
                {/* <tr>
                    <td><input type="checkbox" className="chk" value="4"/></td>
                    <td className="cluscName">集群1</td>
                    <td>4</td>
                    <td>设备组1</td>
                    <td>拓扑1</td>
                    <td><a href='javascript:;' data-url="/cluster/show/4" className="d-edit">编辑</a>
                        | <a href='javascript:;' data-status='-2' data-url="/cluster/destroy/" className="changeStatus">删除</a>
                        | <a href='javascript:;'  className="f-detail">详情</a>
                    </td>
                </tr>
                <tr>
                    <td rowSpan="2"><input type="checkbox" className="chk" value="4"/></td>
                    <td rowSpan="2" className="cluscName">集群2</td>
                    <td rowSpan="2">4</td>
                    <td>设备组3</td>
                    <td>拓扑3</td>
                    <td rowSpan="2"><a href='javascript:;' data-url="/cluster/show/4" className="d-edit">编辑</a>
                        | <a href='javascript:;' data-status='-2' data-url="/cluster/destroy/" className="changeStatus">删除</a>
                        | <a href='javascript:;'  className="f-detail">详情</a>
                    </td>
                </tr>
                <tr>
                    <td>设备组2</td>
                    <td>拓扑2</td>
                </tr>*/}
                </tbody>
            </table>
        )
    }
}
function sel(state) {
    //console.log(state);
    return {"clusterList":state.clusterList,"list":state.clusterList.list}
}
export default connect(sel)(SearchClusterTable)