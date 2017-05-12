import React, {Component,PropTypes} from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux'
import {ShowDiag,addOperation,getMyDate} from  "../public/js/f.js"
import { URL,TASKSTATUS,PANURL } from '../config.js';
import { Select,Checkbox,Tooltip } from 'antd';
const Option = Select.Option;
import {getFormFields} from "../public/js/validate/validateRform.js"
//import {getForm,getFields,getFormFields,clearFormData,delFormsFn,clearArrFormFn} from "../public/js/validate/validateRform.js"
import { listAction} from '../actions/listBoxactions'
import {addClmsChannel,addSendData,editClmsTask,changeClmsChk,channelChk,editAllList,delClmsTaskList,editClmsTaskList,showClmsTask} from "../actions/clmsActions.js"
import {getClmsChannel} from "../containers/Clms.js"
//var bdevGroupOption=[],zdevGroupOption=[];
class SearchClmsTable extends Component {
    //编辑
    editChannel(id){
        const {dispatch}=this.props;
        var data={"query":{"_id":id}};
        // var data={"query":{"_id":"582a85abe1382309b3000001"}};
        $.ajax({
            url: `${URL}/GetChannelConfig`,
            type: 'post',
            data: JSON.stringify(data),
            async: false,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'操作失败！':data.info.warning,
                    closetime: 2
                });
            },
            success: function (data) {
                //console.log(data);
                var info=data.info;
                if (info.status == "success") {
                    if(!info.data){
                        return;
                    }
                    dispatch(addClmsChannel(info.data[0]));
                    $("#f-editclms-modal").modal();
                    getFormFields("addChannel", {
                        "client_name": {
                            "value": info.data[0].client_name,
                            "rule": {"required": true, "regexp":/^[\u4E00-\uFA29a-zA-Z0-9]+$/},
                            "msg": {"required": "客户名称不能为空", "regexp": "客户名称只能由中文、数字、英文字母组成"}
                        }
                    });
                }else{
                    new ShowDiag({
                        msg: !data.info.warning?'操作失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        })

    }
    //拷贝
    copyChannel(id,channelName){
        const {dispatch}=this.props;
        if(!id){
            new ShowDiag({
                msg: '配置不存在！',
                closetime: 2
            });
            return;
        }
        dispatch(addClmsChannel({"config_id":id,"copy_client_name":"","copy_channel_name":"","channel_name":channelName}));
        $("#f-clmsCopy-modal").modal();
        getFormFields("addChannel", {
            "copy_client_name": {
                "value": "",
                "rule": {"required": true, "regexp":/^[\u4E00-\uFA29a-zA-Z0-9]+$/},
                "msg": {"required": "客户名称不能为空", "regexp": "客户名称只能由中文、数字、英文字母组成"}
            },
            "copy_channel_name": {
                "value": "",
                "rule": {"required":true,"regexp": PANURL},
               // "rule": {"required": true,"regexp":/^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                "msg": {"required": "频道名不能为空！","regexp": "频道名格式错误"}
            }
        });
      /*  var data={"query":{"_id":id}};
        $.ajax({
            url: `${URL}/GetClmsConfig`,
            type: 'post',
            data: JSON.stringify(data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'操作失败！':data.info.warning,
                    closetime: 2
                });
            },
            success: function (data) {
                console.log(data);
                var info=data.info;
                if (info.status == "success") {
                    if(!info.data){
                        return;
                    }
                    //  dispatch(addClmsChannel(info.data[0]));
                    $("#f-clmsCopy-modal").modal();
                }else{
                    new ShowDiag({
                        msg: !data.info.warning?'操作失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        })*/
    }
    //删除
    delChannel(id,index,channelName){
        const {list,search,dispatch}=this.props;
        $.ajax({
            url:`${URL}/CheckChannel`,
            type:'post',
            data:JSON.stringify({"channel_name":channelName}),
            async: false,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'操作失败！':data.info.warning,
                    closetime: 2
                });
            },
            success:function(data){
                //console.log(data);
                if(data.info.status=="success"){
                    //dispatch(addClmsChannel({"_id":data.info._id}))
                    var _data=data.info.data;
                    if(!_data){
                        Modal.confirm({
                            msg: '确认要删除频道'+channelName+'吗？',
                            title: "删除",
                            btnok: "确定",
                            btncl: "取消"
                        }).on(function(e) {
                            if (e) {
                                var _data={"query":{"_id":id}};
                                //var _data={"query":{"_id":"582a85abe1382309b3000001"}};
                                $.ajax({
                                    url: `${URL}/DeleteClmsConfig`,
                                    type: 'post',
                                    data: JSON.stringify(_data),
                                    async: false,  //默认为true 异步
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
                                                msg: '正在执行删除，请稍后更新状态！',
                                                closetime: 1
                                            });
                                            //dispatch(delClmsTaskList(index));
                                            addOperation(`删除${channelName}频道`);
                                            //更新列表
                                            var rsData = getClmsChannel(search);
                                            //  console.log(rsData);
                                            dispatch(showClmsTask(rsData.data));
                                            /* var data ={...search,"all_row": "1"};
                                             var rsData = getClmsChannel(data);
                                             //console.log(rsData);
                                             dispatch(showClmsTask(rsData.data));
                                             dispatch(searchClmsTask(data));*/
                                        }else{
                                            new ShowDiag({
                                                msg: !data.info.warning?'删除失败！':data.info.warning,
                                                closetime: 2
                                            });
                                        }
                                    }
                                })
                            }
                        });
                        return;
                    };
                    Modal.confirm({
                        msg: `${channelName}还关联了${_data},确认要删除${channelName}和${_data}吗？`,
                        title: "删除",
                        btnok: "确定",
                        btncl: "取消"
                    }).on(function(e) {
                        if (e) {
                            var _data={"query":{"_id":id}};
                            //var _data={"query":{"_id":"582a85abe1382309b3000001"}};
                            $.ajax({
                                url: `${URL}/DeleteClmsConfig`,
                                type: 'post',
                                data: JSON.stringify(_data),
                                async: false,  //默认为true 异步
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
                                            msg: '正在执行删除，请稍后更新状态！',
                                            closetime: 1
                                        });
                                        //dispatch(delClmsTaskList(index));
                                        addOperation(`删除${channelName}频道`);
                                        //更新列表
                                        var rsData = getClmsChannel(search);
                                        //  console.log(rsData);
                                        dispatch(showClmsTask(rsData.data));
                                        /* var data ={...search,"all_row": "1"};
                                         var rsData = getClmsChannel(data);
                                         //console.log(rsData);
                                         dispatch(showClmsTask(rsData.data));
                                         dispatch(searchClmsTask(data));*/
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

                }else{
                    //alert('添加失败');
                    new ShowDiag({
                        msg: !data.info.warning?'修改失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        });



    }
    //Reload生效
    reloadChannel(channelName){
        const {dispatch,search}=this.props;
        Modal.confirm({
            msg: '确定Reload生效频道'+channelName+'吗？',
            title: "Reload生效",
            btnok: "确定",
            btncl: "取消"
        }).on(function(e) {
            if (e) {
                var _data = {
                        "channel_name": channelName,
                        "type": "clms"
                };
                $.ajax({
                    url: `${URL}/ReloadConfig`,
                    type: 'post',
                    data: JSON.stringify(_data),
                    async: true,  //默认为true 异步
                    dataType: "json",
                    error: function (error) {
                        var data = $.parseJSON(error.responseText);
                        new ShowDiag({
                            msg: !data.info.warning ? 'Reload失败！' : data.info.warning,
                            closetime: 2
                        });
                    },
                    success: function (data) {
                        //console.log(data);
                        if (data.info.status == "success") {
                            new ShowDiag({
                                msg: 'Reload成功，请稍后刷新状态！',
                                closetime: 1
                            });
                            addOperation(`Reload频道${channelName}`);
                           /* var upData = clusterList.search;
                            var list = getClusterDatas({...upData, "all_row": "1"});
                            dispatch(showCluster({"list": list.data, "search": {...upData, "count": list.count}}));*/
                            //更新列表
                            var rsData = getClmsChannel(search);
                            //  console.log(rsData);
                            dispatch(showClmsTask(rsData.data));
                        } else {
                            new ShowDiag({
                                msg: !data.info.warning ? 'Reload失败！' : data.info.warning,
                                closetime: 2
                            });
                        }
                    }
                })
            }
        })

    }
    //设备重新下发
    sendevFn(data){
       // console.log(type);
        const {dispatch} =this.props;
       /* dispatch(listAction({"dataList":[],"chkData":[]}));
        var _data=[];
        // dispatch(listAction({"isChose":false,"dataList":[],"chkData":[]}));
        for(var i=0;i<data.length;i++){
            _data.push({"_id":data[i].dev_id,"name":data[i].dev_name,"isChk":false});
        }
        //console.log(_data);
        dispatch(addSendData({"allData":_data,"sName":"","selectDatas":[], "dev_id":[],"channelName": channel_name,"_id":configId}));
        dispatch(listAction({"isChose":false,"dataList":_data,"chkData":[]}));*/
        dispatch(addSendData({"allData":data}));
        $("#f-sendDev-modal").modal();
    }
    //单选
    changeThisList(e,index){
        const {dispatch}=this.props;
        var _isChk=e.target.checked,val=e.target.value;
        dispatch(changeClmsChk({"isChk":_isChk},index));
        dispatch(channelChk(_isChk,val));
    }
    //全选
    changeAllList(e){
        const {dispatch}=this.props;
        var _isChk=e.target.checked;
        dispatch(editAllList({"allChk": _isChk}));
        //console.log(e);
    }
    // sendevFn(){}
//刷新单条数据
    upDateStatus(id,index){
        const {dispatch}=this.props;
        var thisState=$(".reState").eq(index);
        thisState.attr('disabled',true);
        var i=0;
        var t=setInterval(()=>{
            i=i+10;
            thisState.find("i").css('transform','rotate('+i+'deg)');
        },100);
        var st= setTimeout(()=>{
            thisState.attr('disabled',false);
            thisState.find("i").css('transform','rotate(0deg)');
            clearInterval(t);
            clearTimeout(st);
            $.ajax({
                url: `${URL}/GetClmsTask`,
                type: 'post',
                data: JSON.stringify({"query":{"_id":id}}),
                async: true,  //默认为true 异步
                dataType: "json",
                error: function (error) {
                    var data = $.parseJSON(error.responseText);
                    new ShowDiag({
                        msg: !data.info.warning ? '刷新失败！' : data.info.warning,
                        closetime: 2
                    });
                },
                success: function (data) {
                    //console.log(data);
                    if (data.info.status == "success") {
                        new ShowDiag({
                            msg: '刷新成功！',
                            closetime: 1
                        });
                        if(!data.info.data||!data.info.data[0]){
                            dispatch(delClmsTaskList(index));
                            return;
                        }
                        dispatch(editClmsTaskList(data.info.data[0],index));
                    } else {
                        new ShowDiag({
                            msg: !data.info.warning ? '刷新失败！' : data.info.warning,
                            closetime: 2
                        });
                    }
                }
            });
        },5000);

    }
    //错误下发
    errorDevSend(id,name,data,type){
       // e.preventDefault();
        const {search,dispatch}=this.props;
        var devId=[];
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[i].data.length;j++){
                devId.push(data[i].data[j].dev_id);
            }
        }
        var _data={
            "opt_type":type,
            "_id":id,
            "name":name,
            "dev_id":devId
        }
        var thisText="";
            if(type=="send"){
                thisText="设备重新下发"
            }else if(type=="reload"){
                thisText="设备reload"
            }else{
                thisText="设备删除"
            }
        $.ajax({
            url:`${URL}/SendConfigByDevInfoClms`,
            type:'post',
            //data:JSON.stringify({"query":_data,"page":"1","row":"10"}),
            data:JSON.stringify(_data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?`${thisText}失败！`:data.info.warning,
                    closetime: 2
                });
            },
            success:function(data){
                //console.log(data);
                if(data.info.status=="success"){
                    //$("#f-sendDev-modal").modal("hide");
                    new ShowDiag({
                        msg: `${thisText}成功,请稍后刷新状态！`,
                        closetime: 2
                    });
                    addOperation(`下发${name}的设备`);
                    //dispatch(listAction({"dataList":[],"chkData":[]}));
                    //dispatch(showDeviceList(data));
                    //更新列表
                    var rsData = getClmsChannel(search);
                    //  console.log(rsData);
                    dispatch(showClmsTask(rsData.data));
                }else{
                    new ShowDiag({
                        msg: !data.info.warning?`${thisText}失败！`:data.info.warning,
                        closetime: 2
                    });
                }
            }
        });
    }
    render() {
        const {list,allChk}=this.props;
        let login=JSON.parse(localStorage.loginInfo);
        return (
            <table className="table f-table pf">
                <thead>
                <tr>
                    <th style={{"width":"4%"}}>
                        <Checkbox onChange={(e)=>this.changeAllList(e)} checked={allChk}></Checkbox>
                    </th>
                    <th>频道</th>
                    <th>客户名称</th>
                    <th>服务集群</th>
                    <th>日期</th>
                    <th>delete状态</th>
                    <th>下发状态</th>
                    <th>Reload状态</th>
                    <th style={{"width":"15%"}}>失败原因
                        {/*<div style={{"width":"60%","display":"inline-block"}}>失败原因</div><div style={{"width":"40%","display":"inline-block"}}>设备</div>*/}
                    </th>
                    <th style={{"width":"5%"}}>设备</th>
                    <th style={{"width":"22%"}}>操作</th>
                </tr>
                </thead>
                <tbody>
                {!list||!list.length?
                    <tr><td colSpan="11">暂无数据！</td></tr>
                    :
                    list.map((item,index)=>
                            <tr key={index}>
                                <td><Checkbox onChange={(e)=>this.changeThisList(e,index)} checked={item.isChk} value={item.channel_name}></Checkbox></td>
                                <td>{item.channel_name}</td>
                                <td>{item.client_name}</td>
                                <td>{item.cluster_name}</td>
                                <td>{getMyDate(item.time)}</td>
                                <td>{item.delete_state!="0"?TASKSTATUS[item.delete_state]:`失败${!item.dev_fail?0:item.dev_fail.length}台`}</td>
                                <td>{item.send_state!="0"?TASKSTATUS[item.send_state]:`失败${!item.dev_fail?0:item.dev_fail.length}台`}</td>
                                <td>{item.reload_state!="0"?TASKSTATUS[item.reload_state]:`失败${!item.dev_fail?0:item.dev_fail.length}台`/*item.send_state=="1"?item.reload_state=="1"?"成功":`失败${!item.dev_fail?0:item.dev_fail.length}台`:""*/}</td>
                                <td colSpan="2">
                                    {!item.dev_fail_list?
                                        <div>
                                        <div  style={{"borderRight":"1px solid #e9e9e9","height":"30px" ,"paddingRight":"5px","width":"76.5%","display":"inline-block"}}></div>
                                        <div  style={{"width":"23.5%","display":"inline-block","height":"30px"}} ></div>
                                    </div>
                                        :item.dev_fail_list.map((data,i)=>
                                            <div key={i} style={{"borderBottom":i==item.dev_fail_list.length-1?"0px": "1px solid #e9e9e9"}}>
                                                <div  style={{"borderRight":"1px solid #e9e9e9","lineHeight":"30px" ,"paddingRight":"5px","width":"76.5%","display":"inline-block"}}>{data.reason}</div>
                                                <div  style={{"width": "23.5%","display":"inline-block"}} >{data.dev_name}
                                                    <i className="iconfont page-list"  onClick={()=>this.sendevFn(!data.data?[]:data.data)}>&#xe61d;</i>
                                                </div>
                                            </div>
                                    )}
                                    {/*<div style={{"borderBottom": "1px solid #d8d8d8","lineHeight":"30px"}}>sssssssssssssssss</div>
                                     <div style={{"lineHeight":"30px"}}>sssssssssssssssss</div>*/}
                                </td>
                                {/* <td>
                                 <div style={{"borderBottom": "1px solid #d8d8d8","lineHeight":"30px"}}><i className="iconfont page-list">&#xe61d;</i> </div>
                                 <div style={{"lineHeight":"30px"}}><i className="iconfont page-list">&#xe61d;</i> </div>
                                 </td>*/}
                                <td className="f-table-oper">
                                    {!item.pull_id?
                                        <a href="javascript:void(0);" onClick={()=>this.copyChannel(item._id,item.channel_name)} >拷贝</a>
                                        :""
                                    }
                                    {!item.pull_id?"|":""}
                                    <a href="javascript:void(0);" onClick={()=>this.editChannel(item.channel_id)} >编辑</a>|
                                    {/*<a href="javascript:void(0);" onClick={()=>this.delChannel(item._id,index,item.channel_name)}  >删除</a>|*/}
                                    {login.role!='管理员'||(item.send_state=="3"||item.delete_state=="3"||item.reload_state=="3") ?"": <a href="javascript:void(0);" onClick={()=>this.delChannel(item._id,index,item.channel_name)}  >删除</a> }
                                     {login.role!='管理员'||(item.send_state=="3"||item.delete_state=="3"||item.reload_state=="3") ? '' : '|'}
                                    <Link to={{ pathname: `/clms/clmsConfig/${item._id }`}}>配置</Link>|
                                    {/*<a href="javascript:void(0);" >配置</a>|*/}
                                    {item.send_state=="1"||item.send_state=="2"?
                                    <a href="javascript:void(0);" onClick={()=>this.reloadChannel(item.channel_name)} >reload生效</a>
                                        :""
                                    }
                                    {item.send_state=="1"||item.send_state=="2"?"|":""}
                                    {item.send_state=="0"||item.delete_state=="0"||item.reload_state=="0"?
                                    <a href="javascript:void(0);" onClick={()=>this.errorDevSend(item._id,item.channel_name,!item.dev_fail_list?[]:item.dev_fail_list,item.delete_state=="0"?"delete":item.send_state=="0"?"send":"reload")} >错误下发</a>
                                        :""}
                                    {item.send_state=="0"||item.delete_state=="0"||item.reload_state=="0"?"|":""}
                                    <a style={{"textDecoration":"none","fontSize":"18px"}} className="reState" onClick={()=>this.upDateStatus(item._id,index)}>
                                        <Tooltip placement="top" title="状态刷新">
                                            <i className="iconfont" style={{"display":"inline-block"}}
                                                >&#xe653;</i></Tooltip>

                                    </a>
                                </td>

                            </tr>
                    )
                }
                { /*<tr>
                 <td><Checkbox></Checkbox></td>
                 <td>xxx.xxx.xxx.xxx</td>
                 <td>熊猫TV</td>
                 <td>集群a</td>
                 <td>2016-08-3012:34:32</td>
                 <td>失败xx台</td>
                 <td>失败xx台</td>
                 <td>
                 <div style={{"borderBottom": "1px solid #d8d8d8","lineHeight":"30px"}}>sssssssssssssssss</div>
                 <div style={{"lineHeight":"30px"}}>sssssssssssssssss</div>
                 </td>
                 <td>
                 <div style={{"borderBottom": "1px solid #d8d8d8","lineHeight":"30px"}}><i className="iconfont page-list">&#xe61d;</i> </div>
                 <div style={{"lineHeight":"30px"}}><i className="iconfont page-list">&#xe61d;</i> </div>
                 </td>
                 <td className="f-table-oper">
                 <a href="javascript:void(0);" onClick={()=>this.copyChannel("1")} >拷贝</a>|
                 <a href="javascript:void(0);" onClick={()=>this.editChannel("1")} >编辑</a>|
                 <a href="javascript:void(0);" onClick={()=>this.delChannel("1")}  >删除</a>|
                 <a href="javascript:void(0);" >配置</a>|
                 <a href="javascript:void(0);" onClick={()=>this.reloadChannel("1")} >reload生效</a>

                 </td>

                 </tr>*/}
                </tbody>
            </table>
        )
    }
}
function sel(state) {
    //console.log(state);
    return {"clmsTask":state.clmsTask,"allChk":state.clmsTaskList.allChk,"channel_name":state.clmsTaskList.channel_name,"search":state.clmsTaskList.search,"list":state.clmsTaskList.list}
}
export default connect(sel)(SearchClmsTable)