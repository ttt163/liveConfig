import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL,CHANNNEL,ORIGIN,HTTP,FLV,HLS,HTTPTS,MP4,IPLIST,HTTPHOOKS,PRINT,REFER,IPCONFIGINFO,CONFIGDEFAULTDATA } from '../config.js';
import {ShowDiag,addOperation} from  "../public/js/f.js"
import {getClmsChannel} from "../containers/Clms.js"
//import {getForm,getFields,getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import { Select,Button ,BackTop   } from 'antd';
const Option = Select.Option;
import {searchClmsTask,showClmsTask} from "../actions/clmsActions.js"
import {addConfigData,editConfigData,addConfigChannData,editIpConfigData,addIpConfigData,delIpConfigData,addConfigOriginData,addConfigHttpServiceData,addConfigFlvData,addConfigHlsData,
    addConfigHttpTsData,addConfigMp4Data,addConfigIpListData,addConfigPrintData,addConfigReferData,addConfigHttpHookData,editOprIpConfigData,editConfigProvIp,
    clearConfigData,editOrigin} from "../actions/clmsConfigActions.js"
import ChannelConfig from "./Clms.channel.config.js"
import OriginConfig from "./Clms.origin.config.js"
import FlvConfig from "./Clms.flv.config.js"
import HlsConfig from "./Clms.hls.config.js"
import HttpTsConfig from "./Clms.httpTsconfig.js"
import OperatConfig from "./Clms.config.operat.js"
import HttpServiceConfig from "./Clms.httpService.config.js"
import Mp4Config from "./Clms.Mp4.config.js"
import IpListConfig from "./Clms.ipList.config.js"
import ReferConfig from "./Clms.refer.config.js"
import PrintConfig from "./Clms.print.config.js"
import HttpHookConfig from "./Clms.httpHook.config.js"
import IpConfig from "./Clms.config.ipConfig.js"
import {formatGetTopoData,formatSubmitTopoData,getDevGroupDatas,getTopoDatas} from "../containers/DeviceGroup.js"
import {getClusterDatas} from "../containers/Cluster.js"
import {getClientAndChannel} from "../containers/Clms.js"
import {formatHttpHookFields} from "./Clms.httpHook.content.config.js"
import {getForm,getFields,getFormFields,clearFormData,delFormsFn,clearArrFormFn,getKeyField,delFieldFn,validateAllFields,validateField,validateArrField,
    validateArrformAllFields,validateArrformArrField,validateArrformField,getArrformArrField,getArrForm ,getArrFormFields,clearFromMsg } from "../public/js/validate/validateRform.js"
export var devGroupOpt=[],clusterOpt=[],topoOpt=[];


//import { browserHistory,History  } from 'react-router'
//获取生效层级
export function geteLeves(data){
    var _leves=[];
    for(var i=0;i<data.length;i++){
        var _thisLeves=data[i].take_effect_level;
        //console.log(_thisLeves);
        _leves=[..._leves,..._thisLeves];
    }
    return _leves;
}
export function channelIsExist(channel){
    var flag=true,msg="";
    $.ajax({
        url:`${URL}/Detection`,
        type:'post',
        data:JSON.stringify({"channel_name":channel}),
        async: false,  //默认为true 异步
        dataType: "json",
        error:function(error){
            var data=$.parseJSON(error.responseText);
            /*new ShowDiag({
                msg: !data.info.warning?'操作失败！':data.info.warning,
                closetime: 2
            });*/
            flag=false;
            msg=!data.info.warning?'检测失败！':data.info.warning;
        },
        success:function(data){
            //console.log(data);
            if(data.info.status=="success"){
                flag=true;
                msg="频道可用！";
            }else{
                flag=false;
                msg=!data.info.warning?'频道已经存在！':data.info.warning;
                //alert('添加失败');
                /*new ShowDiag({
                    msg: !data.info.warning?'修改失败！':data.info.warning,
                    closetime: 2
                });*/
            }
        }
    })
    return {isExist:flag,msg:msg};
}
class ClmsConfig extends Component {
    componentWillMount() {
        if(localStorage.loginInfo==undefined){
            localStorage.loginInfo=JSON.stringify({'loginStatus':false});
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }else{
            var data=JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }else if(data.role=='设备运维'){
                window.location.href='#/device'
            }
        }
        const {params,dispatch,clmsChannel}=this.props;
        var _thisCont= this.context;
        var channelInfo=Object.assign({},clmsChannel,{"channel_id":!clmsChannel._id?"":clmsChannel._id,"_id":""});

        /*const oprDefConfig={ "topology_info": {
            "ipConfig":[{"operators": "","default": [{ip: "", type: ""}],"provinces": [{"province": "","Ipinfo": [{ip: "", type: ""}]}]}],
            "default": {"Ipinfo":[{ip:"",type:""}]}
        }}*/
        var defConfig=Object.assign({},CONFIGDEFAULTDATA);
    //,defaultOprData=Object.assign({},oprDefConfig),pulDefOpr=Object.assign({},oprDefConfig);
       // console.log(this.props);
         //console.log(params.id);
       // console.log(params.type);
       // console.log(channelInfo);

        if(!params.id){
            var curUrlMd5Path=!clmsChannel.channel_name?"":$.md5(clmsChannel.channel_name);
            //defaultOprData=Object.assign({},ipOprConfig);
           // console.log(clmsChannel.channel_name);
            var configData = {
                    "configType": "pull",
                    "pull": {
                        ...defConfig,
                        "push_id":"default",
                        ...channelInfo,
                        "topology_info": {
                            "ipConfig":[{"operators": "","default": [{ip: "", type: ""}],"provinces": [{"province": "","Ipinfo": [{ip: "", type: ""}]}]}],
                            "default": {"Ipinfo":[{ip:"",type:""}]}
                        }
                    }
                    /*, "push": {
                        ...defConfig,
                        "pull_id":"default",
                        "client_name":clmsChannel.client_name,
                        "topology_info": {
                            "ipConfig":[{"operators": "","default": [{ip: "", type: ""}],"provinces": [{"province": "","Ipinfo": [{ip: "", type: ""}]}]}],
                            "default": {"Ipinfo":[{ip:"",type:""}]}
                        }
                    }*/
                },
                pullChannelData ={
                    "show": false,
                    "currIndex": 0,
                    "channel": [
                        Object.assign({},CHANNNEL,{"take_effect_level": ["3"],"queue_length":"10","stream_timeout":"30"}),
                        Object.assign({},CHANNNEL,{"take_effect_level": ["1","2"],"queue_length":"10","stream_timeout":"30"}),
                        Object.assign({},CHANNNEL,{"take_effect_level": ["4"],"queue_length":"10","stream_timeout":"30","chunk_size":"","gop_cache":"off","time_jitter":"off"})
                    ],
                    "exist_level": ["1","2","3","4"]
                };
            //console.log(pullChannelData);
            dispatch(addConfigData(configData));
            //频道配置
            dispatch(addConfigChannData(pullChannelData,"pull"));
            //dispatch(addConfigChannData(pushChannelData,"push"));
            //pushChannelData={};
            //回源配置
            var orginPullData={
                    "show": false,
                    "currIndex": 0,
                    "origin": [Object.assign({},ORIGIN,{"take_effect_level": ["1","2","3"]})],
                    "exist_level": ["1","2","3"]
                }
            dispatch(addConfigOriginData(orginPullData,"pull"));
            //dispatch(addConfigOriginData(orginPushData,"push"));
            //http服务器
            var pullHttpData={
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,
                    "http":[Object.assign({},HTTP,{"dir":"/tmp/"+curUrlMd5Path})]
                };
            dispatch(addConfigHttpServiceData(pullHttpData,"pull"));
            //dispatch(addConfigHttpServiceData(pushHttpData,"push"));
            //hls服务  clmsChannel
            var pullHlsData={
                    "exist_level": ["4"],
                    "show": false,
                    "currIndex": 0,
                    "hls":[Object.assign({},HLS,{"take_effect_level": ["4"],"enabled":"on","hls_fragment":"3","hls_index":"[stream]","hls_path":"/tmp/srs_hls/"+curUrlMd5Path})]
                };
            dispatch(addConfigHlsData(pullHlsData,"pull"));
           // dispatch(addConfigHlsData(pushHlsData,"push"));
            //flv文件录制
            var pullFlvData={
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,
                    "flv":[Object.assign({},FLV,{"dvr_path":"/tmp/flv/"+curUrlMd5Path})]
                };
            dispatch(addConfigFlvData(pullFlvData,"pull"));
            //dispatch(addConfigFlvData(pushFlvData,"push"));
            //http+ts直播
            var pullTsData={
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,
                    "http_ts":[Object.assign({},HTTPTS)]
                };
            dispatch(addConfigHttpTsData(pullTsData,"pull"));
            //dispatch(addConfigHttpTsData(pushTsData,"push"));
            //mp4文件录制
            var pullMp4Data={
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,
                    "mp4":[Object.assign({},MP4,{"mp4_path":"/tmp/mp4/"+curUrlMd5Path})]
                };
            dispatch(addConfigMp4Data(pullMp4Data,"pull"));
            //dispatch(addConfigMp4Data(pushMp4Data,"push"));
            //IP防盗链
            var pullIpListData={
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,
                    "ip_list":[Object.assign({},IPLIST)]
                };
            dispatch(addConfigIpListData(pullIpListData,"pull"));
           // dispatch(addConfigIpListData(pushIpListData,"push"));
            //打印日志配置
            var pullPrintData={
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,
                    "pithy_print":[Object.assign({},PRINT)]
                };
            dispatch(addConfigPrintData(pullPrintData,"pull"));
            //dispatch(addConfigPrintData(pushPrintData,"push"));
            //Refer防盗链
            var pullReferData={
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,
                    "refer":[Object.assign({},REFER)]
                };
            dispatch(addConfigReferData(pullReferData,"pull"));
           // dispatch(addConfigReferData(pushReferData,"push"));
            //http-hook
            var pullHttpHookData={
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,

                    "http_hook":[Object.assign({},HTTPHOOKS)]
                };
            dispatch(addConfigHttpHookData(pullHttpHookData,"pull"));
           // dispatch(addConfigHttpHookData(pushHttpHookData,"push"));
        }
        else {
            var data = {
                "query": {
                    "_id": params.id
                }
            }
            $.ajax({
                url: `${URL}/GetClmsConfig`,
                type: 'post',
                data: JSON.stringify(data),
                async: false,  //默认为true 异步
                dataType: "json",
                error: function (error) {
                    var data = $.parseJSON(error.responseText);
                    new ShowDiag({
                        msg: !data.info.warning ? '操作失败！' : data.info.warning,
                        closetime: 2
                    });
                },
                success: function (data) {
                   // console.log(data);
                    var info = data.info;
                    if (info.status == "success") {
                        //console.log(!info.data[0].set_data);
                        if (!info.data||$.isEmptyObject(info.data[0].set_data)) {
                            new ShowDiag({
                                msg: "配置数据不存在！",
                                closetime: 2
                            });
                            var path = `/clms`;
                            // this.props.history.push (null, path);
                           _thisCont.router.push(path);
                            return;
                        }
                        var dataInfo=info.data[0],
                            configData=Object.assign({},dataInfo),
                            setData=dataInfo.set_data,
                            ctype=dataInfo.hasOwnProperty("push_id")?"pull":"push",
                            _thisIdType=ctype=="pull"?"push_id":"pull_id";
                            //client_devs_group=!dataInfo.client_devs_group?{}:dataInfo.client_devs_group;
                        delete configData.set_data;
                        delete configData.client_devs_group;
                        configData=!params.type||params.type!="copy"?{...configData}:
                        {...configData,"_id":"","channel_id":clmsChannel._id,"channel_name":clmsChannel.copy_channel_name,"client_name":clmsChannel.copy_client_name};
                        //var defaultOprData=Object.assign({},IPCONFIGINFO);
                        //var defaultOprData=Object.create(IPCONFIGINFO);
                        //var defaultOprData=$.extend(true,{...IPCONFIGINFO});
                        var defaultOprData= JSON.parse(JSON.stringify(IPCONFIGINFO));
                        //console.log(defaultOprData);
                        var ipData=dataInfo.client_devs_group?formatGetTopoData({"topology_info":dataInfo.client_devs_group}):defaultOprData;
                        //var prov=ipData.topology_info.
                        //if(!ipDatatopology_info){}
                        //查询设备组对应的拓扑
                        var topoDatas=[];
                        if(!dataInfo.devs_group_id||dataInfo.source_station_type=="2"){
                            topoDatas=[]
                        }else{
                            topoDatas=getTopoDatas({"query":{"devs_group_id":dataInfo.devs_group_id}}).data;
                        }
                       /* for(var i=0;i<topoDatas.length;i++){
                            topoOpt.push(<Option key={topoDatas[i]._id}>{topoDatas[i].name}</Option>);
                        }*/
                       // console.log(ipData);
                        configData={...configData,...ipData,"topoDatas":topoDatas};
                        configData=ctype=="push"?{...configData,"oldChannel":dataInfo.channel_name,"oldConfigId":dataInfo._id,"oldChannelId":dataInfo.channel_id}:{...configData};
                        /*if(dataInfo.client_devs_group){
                            var ipData=formatGetTopoData({"topology_info":dataInfo.client_devs_group});
                            configData={...configData,"topology_info":ipData};
                        }*/
                        /*var otherConfigData={},defultConfigData=Object.assign({},CONFIGDEFAULTDATA),clmsConfigData={
                           ...defultConfigData,
                            ...defaultOprData
                        };*/
                        var cdata={"configType": ctype,[ctype]:configData},defShowData={
                            "exist_level": [],
                            "show": false,
                            "currIndex": 0},
                            getChannalData=setData.channel,
                            getOriginData=setData.origin,
                            getHttpData=setData.http,
                            getFlvData=setData.flv,
                            getHlsData=setData.hls,
                            getHttpTsData=setData.http_ts,
                            getMp4Data=setData.mp4,
                            getIpListData=setData.ip_list,
                            getHttpHookData=setData.http_hook,
                            getPrintData=setData.pithy_print,
                            getReferData=setData.refer;
                        for(var i=0;i<getHttpHookData.length;i++){
                            var thisHookData=getHttpHookData[i];
                            getHttpHookData[i]={...thisHookData,"currHook":"on_connect"}
                        }

                        if(params.type&&params.type=="copy"){
                            var curUrlMd5Path=$.md5(clmsChannel.copy_channel_name);
                            for(var i=0;i<getHttpData.length;i++){
                                var thisData=getHttpData[i];
                                getHttpData[i]={...thisData,"dir":"/tmp/"+curUrlMd5Path}
                            }
                            for(var i=0;i<getFlvData.length;i++){
                                var thisData=getFlvData[i];
                                getFlvData[i]={...thisData,"dvr_path":"/tmp/flv/"+curUrlMd5Path}
                            }
                            for(var i=0;i<getHlsData.length;i++){
                                var thisData=getHlsData[i];
                                getHlsData[i]={...thisData,"hls_path":"/tmp/srs_hls/"+curUrlMd5Path}
                            }
                            for(var i=0;i<getMp4Data.length;i++){
                                var thisData=getMp4Data[i];
                                getMp4Data[i]={...thisData,"mp4_path":"/tmp/mp4/"+curUrlMd5Path}
                            }
                        }
                        //var curUrlMd5Path=!configData.channel_name?"":$.md5(configData.channel_name);

                        /*if(ctype=="pull"){
                            //otherConfigData={"push":Object.assign({},clmsConfigData)}
                            cdata = {
                                "configType": "pull",
                                "pull":configData,
                                "push":Object.assign({},clmsConfigData)
                            }
                        }else{
                            //otherConfigData={"push":Object.assign({},clmsConfigData)}
                            cdata = {
                                "configType": "push",
                                "push":configData,
                                "pull":Object.assign({},clmsConfigData)
                            }
                        }*/
                        //cdata = {"configType": ctype,[ctype]:configData}
                       // console.log(geteLeves(getChannalData));
                        dispatch(addConfigData(cdata));
                        dispatch(addConfigChannData({...defShowData,"channel":getChannalData,"exist_level":geteLeves(getChannalData)},ctype));
                        dispatch(addConfigOriginData({...defShowData,"origin":getOriginData,"exist_level":geteLeves(getOriginData)},ctype));
                        dispatch(addConfigHttpServiceData({...defShowData,"http":getHttpData,"exist_level":geteLeves(getHttpData)},ctype));
                        dispatch(addConfigFlvData({...defShowData,"flv":getFlvData,"exist_level":geteLeves(getFlvData)},ctype));
                        dispatch(addConfigHlsData({...defShowData,"hls":getHlsData,"exist_level":geteLeves(getHlsData)},ctype));
                        dispatch(addConfigHttpTsData({...defShowData,"http_ts":getHttpTsData,"exist_level":geteLeves(getHttpTsData)},ctype));
                        dispatch(addConfigMp4Data({...defShowData,"mp4":getMp4Data,"exist_level":geteLeves(getMp4Data)},ctype));
                        dispatch(addConfigIpListData({...defShowData,"ip_list":getIpListData,"exist_level":geteLeves(getIpListData)},ctype));
                        dispatch(addConfigPrintData({...defShowData,"pithy_print":getPrintData,"exist_level":geteLeves(getPrintData)},ctype));
                        dispatch(addConfigReferData({...defShowData,"refer":getReferData,"exist_level":geteLeves(getReferData)},ctype));
                        dispatch(addConfigHttpHookData({...defShowData,"http_hook":getHttpHookData,"exist_level":geteLeves(getHttpHookData)},ctype));
                    } else {
                        new ShowDiag({
                            msg: !data.info.warning ? '操作失败！' : data.info.warning,
                            closetime: 2
                        });
                    }
                }
            })
        }
        //console.log("qqq");
    }

    componentDidMount() {
        var pathName=this.props.location.pathname;
        if(pathName.indexOf("/clms/")!=-1){
            $("#clmsConfig").addClass("f-curr");
        }
        //源站设备组opt
        devGroupOpt=[];
        var devGroupDatas=getDevGroupDatas({"query":{"role":"1"}}).data;
        for(var i=0;i<devGroupDatas.length;i++){
            devGroupOpt.push(<Option key={devGroupDatas[i]._id}>{devGroupDatas[i].name}</Option>);
        }
        //集群opt
        clusterOpt=[];
        var clusterDatas=getClusterDatas({"query":{}}).data;
        for(var i=0;i<clusterDatas.length;i++){
            clusterOpt.push(<Option key={clusterDatas[i]._id+"&culster&"+clusterDatas[i].name}>{clusterDatas[i].name}</Option>);
        }
    }
    componentWillUnmount() {
        const {params,dispatch,clmsConfig}=this.props;
      //  console.log("清除");
        $("#clmsConfig").removeClass("f-curr");
        dispatch(clearConfigData());
        var ctype=clmsConfig.configType,otherType=ctype=="pull"?"push":"pull";
        clearArrFormFn(ctype+"_config");
        clearArrFormFn(otherType+"_config");
        clearArrFormFn(ctype+"_channelConfig");
        clearArrFormFn(otherType+"_channelConfig");
        clearArrFormFn(ctype+"_flvConfig");
        clearArrFormFn(otherType+"_flvConfig");
        clearArrFormFn(ctype+"_hlsConfig");
        clearArrFormFn(otherType+"_hlsConfig");
        clearArrFormFn(ctype+"_httpConfig");
        clearArrFormFn(otherType+"_httpConfig");
        clearArrFormFn(ctype+"_httpTsConfig");
        clearArrFormFn(otherType+"_httpTsConfig");
        clearArrFormFn(ctype+"_ipListConfig");
        clearArrFormFn(otherType+"_ipListConfig");
        clearArrFormFn(ctype+"_mp4Config");
        clearArrFormFn(otherType+"_mp4Config");
        clearArrFormFn(ctype+"_orginConfig");
        clearArrFormFn(otherType+"_orginConfig");
        clearArrFormFn(ctype+"_printConfig");
        clearArrFormFn(otherType+"_printConfig");
        clearArrFormFn(ctype+"_referConfig");
        clearArrFormFn(otherType+"_referConfig");
        clearArrFormFn(ctype+"_httpHookConfig");
        clearArrFormFn(otherType+"_httpHookConfig");
        /*clearArrFormFn(ctype+"_channelConfig");
        clearArrFormFn(otherType+"_channelConfig");*/

    }
    editIpData(name,value,index,configType){
        const {dispatch}=this.props;
        dispatch(editIpConfigData({[name]:value},index,configType));
        if(name=="ip"){
            validateArrField(configType+"_config","defIp",value,index);
        }

    }
    addDefault(configType){
        const {dispatch}=this.props;
        var data={"ip":"","type":""};
        dispatch(addIpConfigData(data,configType));
    }
    removeDefault(index,configType){
        const {dispatch}=this.props;
        dispatch(delIpConfigData(index,configType));
    }
    //选择设备组
    changeDevGroup(name,val,ctype){
        const {dispatch}=this.props;
        dispatch(editConfigData({[name]:val,"topology_id":""},ctype));
        //查询设备组对应的拓扑
        var topoDatas=getTopoDatas({"query":{"devs_group_id":val}}).data;
        dispatch(editConfigData({"topoDatas":topoDatas},ctype));
        validateField(ctype+"_config","devs_group",val);
        /*for(var i=0;i<topoDatas.length;i++){
            topoOpt.push(<Option key={topoDatas[i]._id}>{topoDatas[i].name}</Option>);
        }*/

    }
    //选择集群
    changeCluster(val,ctype){
        const {dispatch}=this.props;
        var _id=val.substring(0,val.lastIndexOf("&culster&")),name=val.substring(val.lastIndexOf("&culster&")+9);
        dispatch(editConfigData({"cluster_name":name,"cluster_id":_id},ctype));
        validateField(ctype+"_config","cluster",_id);
    }
    //取消
    goBack(e){
        e.preventDefault();
        const {dispatch,search}=this.props;
        var sdata=Object.assign({},search);

        const path = `/clms`;
       // this.props.history.push (null, path);
        this.context.router.push(path);
        //更新列表
       /* console.log(sdata);
        var rsData = getClmsChannel(sdata);
        //  console.log(rsData);
        dispatch(showClmsTask(rsData.data));
        dispatch(searchClmsTask({...sdata, "count": rsData.count}));*/
        //console.log(path);
    }
    //提交配置
    submitConfig(e,ctype){
        e.preventDefault();
        const {params,clmsConfig,dispatch,clmsChannelConfig,clmsOriginConfig,clmsHttpServiceConfig,clmsFlvConfig,clmsHlsConfig,clmsHttpTsConfig,clmsMp4Config,clmsIpListConfig,clmsPrintConfig,clmsReferConfig,clmsHookConfig,validator}=this.props;
        var thisConfig=clmsConfig[ctype] ,
            otherType=ctype=="pull"?"push":"pull",
            otherIdType=ctype=="pull"?"pull_id":"push_id";
        var configData=Object.assign({},thisConfig);
        //console.log(params.type);
        if(ctype=="push"){
            var chanellArr=getClientAndChannel().allChannel,isConfig=false;
           // console.log(chanellArr);
            if(thisConfig.pull_id=="default"){
                new ShowDiag({
                    msg: '请先提交分发域名配置！',
                    closetime: 2
                });
                return;
            }
           // dispatch(editConfigData({"_id":_thisData.oldConfigId,"channel_id":_thisData.oldChannelId},ctype));
            if(thisConfig.channel_name==thisConfig.oldChannel){
                configData={...configData,"_id":thisConfig.oldConfigId,"channel_id":thisConfig.oldChannelId};
                dispatch(editConfigData({"_id":thisConfig.oldConfigId,"channel_id":thisConfig.oldChannelId},ctype));
            }else{
                var checkData=channelIsExist(thisConfig.channel_name);
                if(!checkData.isExist){
                    new ShowDiag({
                        msg: thisConfig.channel_name+checkData.msg,
                        closetime: 2
                    });
                    return;
                }else{
                    configData={...configData,"_id":"","channel_id":""};
                    dispatch(editConfigData({"_id":"","channel_id":""},ctype));
                }
               /* for(var i=0;i<chanellArr.length;i++){
                    if(chanellArr.indexOf(thisConfig.channel_name)!=-1){
                        isConfig=true;
                        new ShowDiag({
                            msg: '推流地址已经配置过,请修改推流地址！',
                            closetime: 2
                        });
                        break;
                    }
                }
                if(isConfig){
                    return;
                }else{
                    configData={...configData,"_id":"","channel_id":""};
                    dispatch(editConfigData({"_id":"","channel_id":""},ctype));
                }*/
            }

        }
        //校验
        //delFieldF
        /*if(thisConfig.source_station_type=="1"){
            delFieldFn(ctype+"_config","devs_group");
            delFieldFn(ctype+"_config","topology");
        }else{
            delFieldFn(ctype+"_config","defIp");
        }*/
       // return;
        //,{"source_station_type":parseInt(thisConfig.source_station_type)}
        var msgStr="";
        var oprInfo=configData.topology_info;
        delete configData.topology_info;
        delete configData.topoDatas;
        validateField(ctype+"_config","channel_name",configData.channel_name);
        validateField(ctype+"_config","cluster",configData.cluster_id);
        if(configData.source_station_type=="2"){
            var defIp=thisConfig.topology_info.default.Ipinfo;
            for(var i=0;i<defIp.length;i++){
                validateArrField(ctype+"_config","defIp",defIp[i].ip,i);
            }
            var subOpr=formatSubmitTopoData({"topology_info":oprInfo});
            delete configData.devs_group_id;
            delete configData.topology_id;
            configData={...configData,"client_devs_group":subOpr.topology_info};
            delFieldFn(ctype+"_config","devs_group");
            delFieldFn(ctype+"_config","topology");

        }else{
            delFieldFn(ctype+"_config","defIp");
            validateField(ctype+"_config","devs_group",configData.devs_group_id);
            validateField(ctype+"_config","topology",configData.topology_id);
        }
        var channel=clmsChannelConfig[ctype].channel,
            origin=clmsOriginConfig[ctype].origin,
            http=clmsHttpServiceConfig[ctype].http,
            flv=clmsFlvConfig[ctype].flv,
            hls=clmsHlsConfig[ctype].hls,
            http_ts=clmsHttpTsConfig[ctype].http_ts,
            mp4=clmsMp4Config[ctype].mp4,
            ip_list=clmsIpListConfig[ctype].ip_list,
            http_hook=clmsHookConfig[ctype].http_hook,
            pithy_print=clmsPrintConfig[ctype].pithy_print,
            refer=clmsReferConfig[ctype].refer;
        //console.log(validateAllFields(ctype+"_config"));
        var channelFlag=true,originFlag=true,httpFlag=true,flvFlag=true,hlsFlag=true,mp4Flag=true,
            printFlag=true,ipListFlag=true,referFlag=true,httpTsFlag=true,hookFlag=true;

        for(var i=0;i<channel.length;i++){
            validateArrformField(ctype+"_channelConfig","listen",channel[i].listen,i);
            validateArrformField(ctype+"_channelConfig","queue_length",channel[i].queue_length,i);
            validateArrformField(ctype+"_channelConfig","chunk_size",channel[i].chunk_size,i);
            validateArrformField(ctype+"_channelConfig","stream_timeout",channel[i].stream_timeout,i);
           // validateArrformField(ctype+"_channelConfig","custom_setting",channel[i].custom_setting,i);
            validateArrformField(ctype+"_channelConfig","take_effect_level",channel[i].take_effect_level,i);
            var vFormMsg=validator[ctype+"_channelConfig"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
               // console.log(item);
                if(!item.isValider){
                    channelFlag=false;
                   // msgStr+="频道配置"+(i+1)+"，";
                    break;
                }
            }
        }
        if(!channelFlag){
            msgStr+="频道配置，";
        }
        if(clmsChannelConfig[ctype].exist_level.length<4){
            new ShowDiag({
                msg: "频道配置的生效层级必需全部被选中！",
                closetime:3
            });
            return;
        }
       // console.log(channelFlag+"channelFlag");
        //console.log(this.props);
       // return;

        for(var i=0;i<origin.length;i++){
            validateArrformField(ctype+"_orginConfig","listen",origin[i].listen,i);
            validateArrformField(ctype+"_orginConfig","server_key",origin[i].server_key,i);
            validateArrformField(ctype+"_orginConfig","hash_str",origin[i].hash_str,i);
            validateArrformField(ctype+"_orginConfig","upnode_vhost",origin[i].upnode_vhost,i);
            validateArrformField(ctype+"_orginConfig","backsource_timeout",origin[i].backsource_timeout,i);
            //validateArrformField(ctype+"_orginConfig","custom_setting",origin[i].custom_setting,i);
            validateArrformField(ctype+"_orginConfig","take_effect_level",origin[i].take_effect_level.length,i);
            if(origin[i].mode=="server"){
                validateArrformField(ctype+"_orginConfig","interface",origin[i].interface,i);
            }
            var vFormMsg=validator[ctype+"_orginConfig"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
                // console.log(item);
                if(!item.isValider){
                    originFlag=false;
                   // msgStr+="回源配置"+(i+1)+"，";
                    break;
                }

            }
        }
        if(!originFlag){
            msgStr+="回源配置，";
        }
        if(clmsOriginConfig[ctype].exist_level.length<3){
            new ShowDiag({
                msg: "回源配置的生效层级必需全部被选中！",
                closetime:2
            });
            return;
        }
      //  console.log(originFlag+"==originFlag");
        for(var i=0;i<http.length;i++){
            if(http[i].enabled=="off"){
                //hookFlag=true;
                break;
            }
            validateArrformField(ctype+"_httpConfig","dir",http[i].dir,i);
            validateArrformField(ctype+"_httpConfig","hdl_buffer_length",http[i].hdl_buffer_length,i);
            validateArrformField(ctype+"_httpConfig","hdl_error_code",http[i].hdl_error_code,i);
            validateArrformField(ctype+"_httpConfig","hdl_error_info",http[i].hdl_error_info,i);
           // validateArrformField(ctype+"_httpConfig","custom_setting",http[i].custom_setting,i);
            validateArrformField(ctype+"_httpConfig","take_effect_level",http[i].take_effect_level.length,i);
            var vFormMsg=validator[ctype+"_httpConfig"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
                // console.log(item);
                if(!item.isValider){
                    httpFlag=false;
                   // msgStr+="http服务器配置"+(i+1)+"，";
                    break;
                }

            }
           /* var flag=validateArrformAllFields(ctype+"_httpConfig",i);
            if(!flag){
                httpFlag=false;
            }*/
        }
        if(!httpFlag){
            msgStr+="http服务器配置，";
        }
      //  console.log(httpFlag+"==httpFlag");
        for(var i=0;i<flv.length;i++){
            if(flv[i].enabled=="off"){
                //hookFlag=true;
                break;
            }
            validateArrformField(ctype+"_flvConfig","dvr_path",flv[i].dvr_path,i);
            validateArrformField(ctype+"_flvConfig","dvr_duration",flv[i].dvr_duration,i);
           // validateArrformField(ctype+"_flvConfig","custom_setting",flv[i].custom_setting,i);
            validateArrformField(ctype+"_flvConfig","take_effect_level",flv[i].take_effect_level.length,i);
            var vFormMsg=validator[ctype+"_flvConfig"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
                // console.log(item);
                if(!item.isValider){
                    flvFlag=false;
                   // msgStr+="flv文件录制"+(i+1)+"，";
                    break;
                }

            }
        }
        if(!flvFlag){
            msgStr+="flv文件录制，";
        }
        //console.log(flvFlag+"==flvFlag");
        for(var i=0;i<hls.length;i++){
            if(hls[i].enabled=="off"){
                //hookFlag=true;
                break;
            }
            validateArrformField(ctype+"_hlsConfig","hls_path",hls[i].hls_path,i);
            validateArrformField(ctype+"_hlsConfig","hls_fragment",hls[i].hls_fragment,i);
            validateArrformField(ctype+"_hlsConfig","hls_window",hls[i].hls_window,i);
            validateArrformField(ctype+"_hlsConfig","hls_index",hls[i].hls_index,i);
           // validateArrformField(ctype+"_hlsConfig","custom_setting",hls[i].custom_setting,i);
            validateArrformField(ctype+"_hlsConfig","take_effect_level",hls[i].take_effect_level.length,i);
            var vFormMsg=validator[ctype+"_hlsConfig"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
                // console.log(item);
                if(!item.isValider){
                    hlsFlag=false;
                    //msgStr+="HLS服务"+(i+1)+"，";
                    break;
                }

            }
        }
        if(!hlsFlag){
            msgStr+="HLS服务，";
        }
       // console.log(hlsFlag+"==hlsFlag");
        for(var i=0;i<mp4.length;i++){
            if(mp4[i].enabled=="off"){
                break;
            }
            validateArrformField(ctype+"_mp4Config","mp4_path",mp4[i].mp4_path,i);
            validateArrformField(ctype+"_mp4Config","mp4_duration",mp4[i].mp4_duration,i);
            validateArrformField(ctype+"_mp4Config","mp4_copy_path",mp4[i].mp4_copy_path,i);
            validateArrformField(ctype+"_mp4Config","mp4_file_expired",mp4[i].mp4_file_expired,i);
            //validateArrformField(ctype+"_hlsConfig","custom_setting",hls[i].custom_setting,i);
            validateArrformField(ctype+"_mp4Config","take_effect_level",mp4[i].take_effect_level.length,i);
            var vFormMsg=validator[ctype+"_mp4Config"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
                // console.log(item);
                if(!item.isValider){
                    mp4Flag=false;
                   // msgStr+="MP4文件录制"+(i+1)+"，";
                    break;
                }

            }
            /*var flag=validateArrformAllFields(ctype+"_mp4Config",i);
            if(!flag){
                mp4Flag=false;
            }*/
        }
        if(!mp4Flag){
            msgStr+="MP4文件录制，";
        }
      //  console.log(mp4Flag+"==mp4Flag");

        for(var i=0;i<pithy_print.length;i++){
            if(pithy_print[i].enabled=="off"){
                break;
            }
            validateArrformField(ctype+"_printConfig","publish",pithy_print[i].publish,i);
            validateArrformField(ctype+"_printConfig","play",pithy_print[i].play,i);
            validateArrformField(ctype+"_printConfig","hdl",pithy_print[i].hdl,i);
            //validateArrformField(ctype+"_hlsConfig","custom_setting",hls[i].custom_setting,i);
            validateArrformField(ctype+"_printConfig","take_effect_level",pithy_print[i].take_effect_level.length,i);
            var vFormMsg=validator[ctype+"_printConfig"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
                // console.log(item);
                if(!item.isValider){
                    printFlag=false;
                   // msgStr+="打印日志配置"+(i+1)+"，";
                    break;
                }

            }
            /*var flag=validateArrformAllFields(ctype+"_printConfig",i);
            if(!flag){
                printFlag=false;
            }*/
        }
        if(!printFlag){
            msgStr+="打印日志配置，";
        }
       // console.log(printFlag+"==printFlag");
        for(var i=0;i<ip_list.length;i++){
            if(ip_list[i].white_list_enabled=="off"&&ip_list[i].black_list_enabled=="off"){
                break;
            }
            validateArrformField(ctype+"_ipListConfig","take_effect_level",ip_list[i].take_effect_level.length,i);
            if(ip_list[i].white_list_enabled=="on"){
                validateArrformField(ctype+"_ipListConfig","white_list_ip",ip_list[i].white_list_ip,i);
            }
            if(ip_list[i].black_list_enabled=="on"){
                validateArrformField(ctype+"_ipListConfig","black_list_ip",ip_list[i].black_list_ip,i);
            }
            var vFormMsg=validator[ctype+"_ipListConfig"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
                // console.log(item);
                if(!item.isValider){
                    ipListFlag=false;
                   // msgStr+="IP防盗链，";
                    break;
                }

            }
            /*ar flag=validateArrformAllFields(ctype+"_ipListConfig",i);
            if(!flag){
                ipListFlag=false;
            }*/
        }
        if(!ipListFlag){
            msgStr+="IP防盗链，";
        }
       // console.log(ipListFlag+"==ipListFlag");
        /*for(var i=0;i<refer.length;i++){
            var flag=validateArrformAllFields(ctype+"_referConfig",i);
            if(!flag){
                referFlag=false;
            }
        }*/
        for(var i=0;i<http_ts.length;i++){
            if(http_ts[i].enabled=="off"){
                //hookFlag=true;
                break;
            }
            //validateArrformField(ctype+"_httpTsConfig","custom_setting",http_ts[i].custom_setting,i);
            validateArrformField(ctype+"_httpTsConfig","take_effect_level",http_ts[i].take_effect_level.length,i);
            var vFormMsg=validator[ctype+"_httpTsConfig"][i].valideMsg;
            for (var [key, item] of Object.entries(vFormMsg)) {
                // console.log(item);
                if(!item.isValider){
                    httpTsFlag=false;
                    //msgStr+="Http+ts直播，";
                    break;
                }

            }
        }
        if(!httpTsFlag){
            msgStr+="Http+ts直播，";
        }
       // console.log(httpTsFlag+"==httpTsFlag");
       // hook严重
        for(var i=0;i<http_hook.length;i++){
            if(http_hook[i].hook_global.enabled=="off"){
                //hookFlag=true;
                break;
            }
            validateArrformField(ctype+"_httpHookConfig","take_effect_level" ,http_hook[i].take_effect_level.length,i);
            var levelIsValider=validator[ctype+"_httpHookConfig"][i].valideMsg["take_effect_level"].isValider;
            if(!levelIsValider){
                hookFlag=false;
            }
            for(var j=0;j<http_hook[i].hook_event.length;j++){
                var thisEvent=http_hook[i].hook_event[j];
                if(thisEvent.enabled=="on"){
                   // flag=validateArrformAllFields(ctype+"_httpHookConfig",i);
                    validateArrformField(ctype+"_httpHookConfig",thisEvent.http_hook_name + "-conn_timeout" ,thisEvent.conn_timeout,i);
                    validateArrformField(ctype+"_httpHookConfig",thisEvent.http_hook_name + "-recv_timeout" ,thisEvent.recv_timeout,i);
                    validateArrformField(ctype+"_httpHookConfig",thisEvent.http_hook_name + "-send_timeout" ,thisEvent.send_timeout,i);
                    var connIsValider=validator[ctype+"_httpHookConfig"][i].valideMsg[thisEvent.http_hook_name + "-conn_timeout"].isValider,
                        recvIsValider=validator[ctype+"_httpHookConfig"][i].valideMsg[thisEvent.http_hook_name + "-recv_timeout"].isValider,
                        sendIsValider=validator[ctype+"_httpHookConfig"][i].valideMsg[thisEvent.http_hook_name + "-send_timeout"].isValider;
                    if(!connIsValider||!recvIsValider||!sendIsValider){
                        hookFlag=false;
                    }
                    for(var k=0;k<thisEvent.hook.length;k++){
                        if(thisEvent.hook[k].enabled=="on"){
                            validateArrformArrField(ctype+"_httpHookConfig",i,thisEvent.http_hook_name + "-name",thisEvent.hook[k].name,k);
                            validateArrformArrField(ctype+"_httpHookConfig",i,thisEvent.http_hook_name + "-url",thisEvent.hook[k].url,k);
                            var urlIsValider=validator[ctype+"_httpHookConfig"][i].valideMsg[thisEvent.http_hook_name + "-url"][k].isValider,
                                nameIsValider=validator[ctype+"_httpHookConfig"][i].valideMsg[thisEvent.http_hook_name + "-name"][k].isValider;
                            if(!urlIsValider||!nameIsValider){
                                hookFlag=false;
                            }
                        }

                    }
                }
            }
        }
        if(!hookFlag){
            msgStr+="HttpHooks，";
        }
       // console.log(hookFlag+"==hookFlag");
        //return;
        //var configFlag=validateAllFields(ctype+"_config");
        var vConfigFormMsg=validator[ctype+"_config"].valideMsg,configFlag=true;
        for (var [key, item] of Object.entries(vConfigFormMsg)) {
            //console.log(key);
            if(Array.isArray(item)){
                for(var j=0;j<item.length;j++){
                    if(!item[j].isValider){
                        configFlag=false;
                        break;
                    }
                }
            }else{
                if(!item.isValider){
                    configFlag=false;
                    break;
                }
            }


        }
       // console.log(mp4Flag+"==mp4Flag");
        //console.log(configFlag+"==configFlag");

        if(!configFlag||!channelFlag||!originFlag||!httpFlag||!flvFlag||!hlsFlag||!mp4Flag||!printFlag||!ipListFlag||!httpTsFlag||!hookFlag){
            //msgStr=msgStr.substring(0,msgStr.lastIndexOf("，"));
            new ShowDiag({
                msg: msgStr+'字段验证有错，请修改后再提交！',
                closetime: 2
            });
            return;
        }
        configData={...configData,"set_data":{
            "channel":channel,
            "origin":origin,
            "http":http,
            "flv":flv,
            "hls":hls,
            "http_ts":http_ts,
            "mp4":mp4,
            "ip_list":ip_list,
            "http_hook":http_hook,
            "pithy_print":pithy_print,
            "refer":refer
        }}

        var isFlag=false,isDefFlag=false;
        if(thisConfig.source_station_type=="2"){
           // var thisTopoData=topoItems[index];
            var ipConfig=thisConfig.topology_info.ipConfig;
            // console.log(ipConfig);
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
                                    url:`${URL}/SendClmsConfig`,
                                    type:'post',
                                    data:JSON.stringify(configData),
                                    async: true,  //默认为true 异步
                                    dataType: "json",
                                    error:function(error){
                                        var data=$.parseJSON(error.responseText);
                                        new ShowDiag({
                                            msg: !data.info.warning?'保存失败！':data.info.warning,
                                            closetime: 2
                                        });
                                    },
                                    success: function (data) {
                                        //console.log(data);
                                        if (data.info.status == "success") {
                                            new ShowDiag({
                                                msg: '保存成功！',
                                                closetime: 2
                                            });
                                            if(ctype=="push"){
                                                dispatch(editConfigData({"oldConfigId":data.info._id,"oldChannel":configData.channel_name,"oldChannelId":configData.channel_id},ctype));
                                            }

                                            if(data.info._id){
                                                dispatch(editConfigData({"_id":data.info._id},ctype));
                                                dispatch(editConfigData({[otherIdType]:data.info._id},otherType));
                                            }
                                            //var str=
                                            addOperation(`保存${configData.channel_name}的${ctype=="pull"?"分发域名配置":"推流域名配置"}`);

                                            //更新列表数据
                                            /*var upData=clusterList.search;
                                             //console.log(upData);
                                             var list=getClusterDatas({...upData,"all_row":"1"});
                                             dispatch(showCluster({"list":list.data,"search":{...upData,"count":list.count}}));*/
                                        } else {
                                            //alert('添加失败');
                                            new ShowDiag({
                                                msg: !data.info.warning?'保存失败！':data.info.warning,
                                                closetime: 2
                                            });
                                        }
                                    }
                                });
                            }
                        });
                        break;
                    }
                }else{
                    //运营商不为空
                   // var ipRg=/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    for(var j=0;j<ipConfig[i].default.length;j++){
                        if(!ipConfig[i].default[j].ip){
                            // dispatch(editConfigDefultIp({"iserror":true},i,j));
                           // dispatch(editConfigDefultIp({"iserror":true},index,i,j));
                            dispatch(editOprIpConfigData({"iserror":true},j,i,ctype));
                            isDefFlag=true;
                        }/*else{
                            //dispatch(editConfigDefultIp({"iserror":false},index,i,j));
                            if(!ipRg.test(ipConfig[i].default[j].ip)){
                                dispatch(editOprIpConfigData({"iserror":true},j,i,ctype));
                                isDefFlag=true;
                            }else{
                                dispatch(editOprIpConfigData({"iserror":false},j,i,ctype));
                            }

                        }*/
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
                                        //dispatch(editProvIp({"iserror":true},index,i,k,c));
                                        dispatch(editConfigProvIp({"iserror":true},c,k,i,ctype));
                                        isDefFlag=true;
                                    }/*else{
                                        //dispatch(editConfigDefultIp({"iserror":false},index,i,j));
                                        //dispatch(editProvIp({"iserror":false},index,i,k,c));
                                        if(!ipRg.test(provinces[k].Ipinfo[c].ip)){
                                            dispatch(editConfigProvIp({"iserror":true},c,k,i,ctype));
                                            isDefFlag=true;
                                        }else{
                                            dispatch(editConfigProvIp({"iserror":false},c,k,i,ctype));
                                        }

                                    }*/
                                }
                            }
                        }
                    }
                }
            }


        }
       // return;
        if(!isDefFlag&&!isFlag){
            $.ajax({
                url:`${URL}/SendClmsConfig`,
                type:'post',
                data:JSON.stringify(configData),
                async: true,  //默认为true 异步
                dataType: "json",
                error:function(error){
                    var data=$.parseJSON(error.responseText);
                    new ShowDiag({
                        msg: !data.info.warning?'保存失败！':data.info.warning,
                        closetime: 2
                    });
                },
                success: function (data) {
                    //console.log(data);
                    if (data.info.status == "success") {
                        new ShowDiag({
                            msg: '保存成功！',
                            closetime: 2
                        });
                        if(ctype=="push"){
                            dispatch(editConfigData({"oldConfigId":data.info._id,"oldChannel":configData.channel_name,"oldChannelId":configData.channel_id},ctype));
                        }
                        if(data.info._id){
                            dispatch(editConfigData({"_id":data.info._id},ctype));
                            dispatch(editConfigData({[otherIdType]:data.info._id},otherType));
                        }
                        if(ctype=="pull"){
                            var  otherOrigin=clmsOriginConfig[otherType].origin;
                            for(var i=0;i<otherOrigin.length;i++){
                                //console.log(otherOrigin[i].upnode_vhost!=configData.channel_name);
                                if(otherOrigin[i].upnode_vhost!=configData.channel_name){
                                    dispatch(editOrigin({"upnode_vhost":configData.channel_name},i,otherType));
                                }
                            }
                        }
                        addOperation(`保存${configData.channel_name}的${ctype=="pull"?"分发域名配置":"推流域名配置"}`);
                        //更新列表数据
                        /*var upData=clusterList.search;
                         //console.log(upData);
                         var list=getClusterDatas({...upData,"all_row":"1"});
                         dispatch(showCluster({"list":list.data,"search":{...upData,"count":list.count}}));*/
                    } else {
                        //alert('添加失败');
                        new ShowDiag({
                            msg: !data.info.warning?'保存失败！':data.info.warning,
                            closetime: 2
                        });
                    }
                }
            });
        }

    }
    //回退
    lastConfig(e,channel,ctype){
        e.preventDefault();
        const {dispatch,clmsConfig}=this.props;
        var _thisConfigData=clmsConfig[ctype];
        var data={
            "channel_name": channel,
            "type": "clms"
        };
        //清除校验规则
        clearFromMsg(ctype+"_config");
        clearFromMsg(ctype+"_channelConfig");
        clearFromMsg(ctype+"_flvConfig");
        clearFromMsg(ctype+"_hlsConfig");
        clearFromMsg(ctype+"_httpConfig");
        clearFromMsg(ctype+"_httpTsConfig");
        clearFromMsg(ctype+"_ipListConfig");
        clearFromMsg(ctype+"_mp4Config");
        clearFromMsg(ctype+"_orginConfig");
        clearFromMsg(ctype+"_printConfig");
       // clearFromMsg(ctype+"_referConfig");
        clearFromMsg(ctype+"_httpHookConfig");
        $.ajax({
            url:`${URL}/BackConfig`,
            type:'post',
            data:JSON.stringify(data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'回退失败！':data.info.warning,
                    closetime: 2
                });
            },
            success: function (data) {
               // console.log(data);
                if (data.info.status == "success") {
                    if(!data.info.data){
                        new ShowDiag({
                            msg: '回退失败！',
                            closetime: 2
                        });
                        return;
                    }
                    var dataInfo=data.info.data,
                        configData=Object.assign({},dataInfo,{"_id":_thisConfigData._id}),
                        setData=dataInfo.set_data;
                    //client_devs_group=!dataInfo.client_devs_group?{}:dataInfo.client_devs_group;
                    delete configData.set_data;
                    delete configData.client_devs_group;
                    //configData=!params.type||params.type!="copy"?{...configData}:
                    //{...configData,"_id":"","channel_id":"","channel_name":clmsChannel.copy_channel_name,"client_name":clmsChannel.copy_client_name,[_thisIdType]:"default"};
                   // var defaultOprData=Object.assign({},IPCONFIGINFO);
                    //var defaultOprData=Object.create(IPCONFIGINFO);
                    var defaultOprData= JSON.parse(JSON.stringify(IPCONFIGINFO));
                    var ipData=dataInfo.client_devs_group?formatGetTopoData({"topology_info":dataInfo.client_devs_group}):defaultOprData;
                    //查询设备组对应的拓扑
                    var topoDatas=[];
                    if(!dataInfo.devs_group_id||dataInfo.source_station_type=="2"){
                        topoDatas=[]
                    }else{
                        topoDatas=getTopoDatas({"query":{"devs_group_id":dataInfo.devs_group_id}}).data;
                    }
                   // var topoDatas=getTopoDatas({"query":{"devs_group_id":dataInfo.devs_group_id}}).data;
                    /* for(var i=0;i<topoDatas.length;i++){
                     topoOpt.push(<Option key={topoDatas[i]._id}>{topoDatas[i].name}</Option>);
                     }*/
                    // console.log(ipData);
                    configData={...configData,...ipData,"topoDatas":topoDatas};
                    configData=ctype=="push"?{...configData,"oldChannel":dataInfo.channel_name,"oldConfigId":_thisConfigData._id,"oldChannelId":dataInfo.channel_id}:{...configData};
                    var cdata={"configType": ctype,[ctype]:configData},defShowData={
                            "exist_level": [],
                            "show": false,
                            "currIndex": 0},
                        getChannalData=setData.channel,
                        getOriginData=setData.origin,
                        getHttpData=setData.http,
                        getFlvData=setData.flv,
                        getHlsData=setData.hls,
                        getHttpTsData=setData.http_ts,
                        getMp4Data=setData.mp4,
                        getIpListData=setData.ip_list,
                        getHttpHookData=setData.http_hook,
                        getPrintData=setData.pithy_print,
                        getReferData=setData.refer;
                    for(var i=0;i<getHttpHookData.length;i++){
                        var thisHookData=getHttpHookData[i];
                        getHttpHookData[i]={...thisHookData,"currHook":"on_connect"}
                    }
                    //console.log(geteLeves(getChannalData));
                    dispatch(addConfigData(cdata));
                    dispatch(addConfigChannData({...defShowData,"channel":getChannalData,"exist_level":geteLeves(getChannalData)},ctype));
                    dispatch(addConfigOriginData({...defShowData,"origin":getOriginData,"exist_level":geteLeves(getOriginData)},ctype));
                    dispatch(addConfigHttpServiceData({...defShowData,"http":getHttpData,"exist_level":geteLeves(getHttpData)},ctype));
                    dispatch(addConfigFlvData({...defShowData,"flv":getFlvData,"exist_level":geteLeves(getFlvData)},ctype));
                    dispatch(addConfigHlsData({...defShowData,"hls":getHlsData,"exist_level":geteLeves(getHlsData)},ctype));
                    dispatch(addConfigHttpTsData({...defShowData,"http_ts":getHttpTsData,"exist_level":geteLeves(getHttpTsData)},ctype));
                    dispatch(addConfigMp4Data({...defShowData,"mp4":getMp4Data,"exist_level":geteLeves(getMp4Data)},ctype));
                    dispatch(addConfigIpListData({...defShowData,"ip_list":getIpListData,"exist_level":geteLeves(getIpListData)},ctype));
                    dispatch(addConfigPrintData({...defShowData,"pithy_print":getPrintData,"exist_level":geteLeves(getPrintData)},ctype));
                    dispatch(addConfigReferData({...defShowData,"refer":getReferData,"exist_level":geteLeves(getReferData)},ctype));
                    dispatch(addConfigHttpHookData({...defShowData,"http_hook":getHttpHookData,"currHook":"on_connect","exist_level":geteLeves(getHttpHookData)},ctype));

                    new ShowDiag({
                        msg: '已回退至上一版本！',
                        closetime: 2
                    });
                    addOperation(`回退${configData.channel_name}配置`);
                } else {
                    //alert('添加失败');
                    new ShowDiag({
                        msg: !data.info.warning?'回退失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        });
    }
    //最新
    NewConfig(e,channel,ctype){
        e.preventDefault();
        const {dispatch}=this.props;
        //清除校验规则
        clearFromMsg(ctype+"_config");
        clearFromMsg(ctype+"_channelConfig");
        clearFromMsg(ctype+"_flvConfig");
        clearFromMsg(ctype+"_hlsConfig");
        clearFromMsg(ctype+"_httpConfig");
        clearFromMsg(ctype+"_httpTsConfig");
        clearFromMsg(ctype+"_ipListConfig");
        clearFromMsg(ctype+"_mp4Config");
        clearFromMsg(ctype+"_orginConfig");
        clearFromMsg(ctype+"_printConfig");
        // clearFromMsg(ctype+"_referConfig");
        clearFromMsg(ctype+"_httpHookConfig");
        var data={
            "channel_name": channel,
            "type": "clms"
        }
        $.ajax({
            url:`${URL}/NewestSet`,
            type:'post',
            data:JSON.stringify(data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'更新失败！':data.info.warning,
                    closetime: 2
                });
            },
            success: function (data) {
                //console.log(data);
                if (data.info.status == "success") {
                    if(!data.info.data){
                        new ShowDiag({
                            msg: '更新失败！',
                            closetime: 2
                        });
                        return;
                    }
                    var dataInfo=data.info.data,
                        configData=Object.assign({},dataInfo),
                        setData=dataInfo.set_data;
                    //client_devs_group=!dataInfo.client_devs_group?{}:dataInfo.client_devs_group;
                    delete configData.set_data;
                    delete configData.client_devs_group;
                    //configData=!params.type||params.type!="copy"?{...configData}:
                    //{...configData,"_id":"","channel_id":"","channel_name":clmsChannel.copy_channel_name,"client_name":clmsChannel.copy_client_name,[_thisIdType]:"default"};
                   //var defaultOprData=Object.assign({},IPCONFIGINFO);
                    //var defaultOprData=Object.create(IPCONFIGINFO);
                    var defaultOprData= JSON.parse(JSON.stringify(IPCONFIGINFO));
                    var ipData=dataInfo.client_devs_group?formatGetTopoData({"topology_info":dataInfo.client_devs_group}):defaultOprData;
                    //查询设备组对应的拓扑
                   // var topoDatas=getTopoDatas({"query":{"devs_group_id":dataInfo.devs_group_id}}).data;
                    var topoDatas=[];
                    if(!dataInfo.devs_group_id||dataInfo.source_station_type=="2"){
                        topoDatas=[]
                    }else{
                        topoDatas=getTopoDatas({"query":{"devs_group_id":dataInfo.devs_group_id}}).data;
                    }
                    configData={...configData,...ipData,"topoDatas":topoDatas};
                    configData=ctype=="push"?{...configData,"oldChannel":dataInfo.channel_name,"oldConfigId":dataInfo._id,"oldChannelId":dataInfo.channel_id}:{...configData};
                    var cdata={"configType": ctype,[ctype]:configData},defShowData={
                            "exist_level": [],
                            "show": false,
                            "currIndex": 0},
                        getChannalData=setData.channel,
                        getOriginData=setData.origin,
                        getHttpData=setData.http,
                        getFlvData=setData.flv,
                        getHlsData=setData.hls,
                        getHttpTsData=setData.http_ts,
                        getMp4Data=setData.mp4,
                        getIpListData=setData.ip_list,
                        getHttpHookData=setData.http_hook,
                        getPrintData=setData.pithy_print,
                        getReferData=setData.refer;
                    for(var i=0;i<getHttpHookData.length;i++){
                        var thisHookData=getHttpHookData[i];
                        getHttpHookData[i]={...thisHookData,"currHook":"on_connect"}
                    }
                    //console.log(geteLeves(getChannalData));
                    dispatch(addConfigData(cdata));
                    dispatch(addConfigChannData({...defShowData,"channel":getChannalData,"exist_level":geteLeves(getChannalData)},ctype));
                    dispatch(addConfigOriginData({...defShowData,"origin":getOriginData,"exist_level":geteLeves(getOriginData)},ctype));
                    dispatch(addConfigHttpServiceData({...defShowData,"http":getHttpData,"exist_level":geteLeves(getHttpData)},ctype));
                    dispatch(addConfigFlvData({...defShowData,"flv":getFlvData,"exist_level":geteLeves(getFlvData)},ctype));
                    dispatch(addConfigHlsData({...defShowData,"hls":getHlsData,"exist_level":geteLeves(getHlsData)},ctype));
                    dispatch(addConfigHttpTsData({...defShowData,"http_ts":getHttpTsData,"exist_level":geteLeves(getHttpTsData)},ctype));
                    dispatch(addConfigMp4Data({...defShowData,"mp4":getMp4Data,"exist_level":geteLeves(getMp4Data)},ctype));
                    dispatch(addConfigIpListData({...defShowData,"ip_list":getIpListData,"exist_level":geteLeves(getIpListData)},ctype));
                    dispatch(addConfigPrintData({...defShowData,"pithy_print":getPrintData,"exist_level":geteLeves(getPrintData)},ctype));
                    dispatch(addConfigReferData({...defShowData,"refer":getReferData,"exist_level":geteLeves(getReferData)},ctype));
                    dispatch(addConfigHttpHookData({...defShowData,"http_hook":getHttpHookData,"currHook":"on_connect","exist_level":geteLeves(getHttpHookData)},ctype));

                    new ShowDiag({
                        msg: '已更新至最新版本！',
                        closetime: 2
                    });
                    addOperation(`获取最新${configData.channel_name}配置`);
                } else {
                    //alert('添加失败');
                    new ShowDiag({
                        msg: !data.info.warning?'更新失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        });

    }
    checkChannel(channel,oldChannel,ctype){
        const {clmsConfig,dispatch}=this.props;
        //console.log(channel);
        //console.log(oldChannel);
        var _thisData=clmsConfig[ctype];
        if(channel==oldChannel){
           // dispatch(editConfigData({"_id":_thisData.oldConfigId,"channel_id":_thisData.oldChannelId},ctype));
            new ShowDiag({
                msg: '推流地址未修改！',
                closetime: 2
            });
        }else{
            var checkData=channelIsExist(channel);
            new ShowDiag({
                msg: channel+checkData.msg,
                closetime: 2
            });
            /*if(!checkData.isExist){
                new ShowDiag({
                    msg: checkData.msg,
                    closetime: 2
                });
            }else{

            }*/
           /* var chanellArr=getClientAndChannel().allChannel,isConfig=false;
            for(var i=0;i<chanellArr.length;i++){
                if(chanellArr.indexOf(channel)!=-1){
                    isConfig=true;
                    new ShowDiag({
                        msg: '推流地址已经配置过！',
                        closetime: 2
                    });
                    break;
                }
            }
            if(!isConfig){
               // dispatch(editConfigData({"_id":""},ctype));
                new ShowDiag({
                    msg: '推流地址没有配置过！',
                    closetime: 2
                });
            }*/

        }


    }
    //修改源站设备组类型
    changeStationType(val,ctype){
        const {clmsConfig,dispatch}=this.props;
        dispatch(editConfigData({"source_station_type":val},ctype));
        if(val=="1"){
            getFields(ctype+"_config","topology",{
                "value": clmsConfig[ctype].topology_id,
                "rule": {"required": true},
                "msg": {"required": `拓扑结构不能为空！`}
            });
            getFields(ctype+"_config","devs_group",{
                "value": clmsConfig[ctype].devs_group_id,
                "rule": {"required": true},
                "msg": {"required": `设备组不能为空！`}
            });
        }
        else{
            //getKeyField(form,name,key ,opt)
            for(var i=0;i<clmsConfig[ctype].topology_info.default.Ipinfo.length;i++){
                getKeyField(ctype+"_config","defIp",i,{
                    "value":clmsConfig[ctype].topology_info.default.Ipinfo[i].ip,
                    "rule": {"required": true},
                    "msg": {"required": "默认IP不能为空！"}
                });
            }

        }
    }
    render() {
       // console.log("444");
        const {clmsConfig,dispatch,validator,params}=this.props;
       // console.log(clmsConfig);
        if(!clmsConfig.configType){
            return <div></div>;
        }
        var configType=clmsConfig.configType,_thisConfigData=clmsConfig[configType],ipData=!_thisConfigData?"":_thisConfigData.topology_info;
        //console.log(_thisConfigData);
        //console.log(ipData);
        return (
            <div className="clms-config">
                <div className="clms-content">
                    <form className="form-horizontal">
                        <div className="clearfix f-gradient">
                            {/* <div className="clearfix f-gradient p-fix">*/}
                            <div className="col-xs-3"><h3>Clms配置</h3></div>
                            <div className="col-xs-9 clms-cbtns">
                                <button className="btn t-btn" onClick={(e)=>this.submitConfig(e,configType)}>确认</button>
                                <button className="btn t-btn" onClick={(e)=>this.goBack(e)}>取消</button>
                                <button className="btn t-btn" onClick={(e)=>this.lastConfig(e,_thisConfigData.channel_name,configType)}>回退</button>
                                <button className="btn t-btn" onClick={(e)=>this.NewConfig(e,_thisConfigData.channel_name,configType)}>最新</button>
                            </div>
                        </div>
                        <div className="c-main">
                            <ul className="tab-nav clearfix">
                                <li onClick={()=>{dispatch(addConfigData({"configType":"pull"}))}}
                                    style={{"borderRight":"0px"}} className={clmsConfig.configType=="pull"?"active":""}>
                                    分发域名配置
                                </li>
                                <li onClick={()=>{dispatch(addConfigData({"configType":"push"}))}}
                                    className={clmsConfig.configType!="pull"?"active":""}>推流域名配置
                                </li>
                            </ul>
                            <div className="c-cont">
                                <div className="form-group">
                                    <label
                                        className="col-xs-2 control-label">{clmsConfig.configType == "pull" ? "分发域名：" : "推流域名："}</label>
                                    <div className="col-xs-5">
                                        {clmsConfig.configType == "pull" ?
                                            <input className="form-control" value={_thisConfigData.channel_name} disabled/>
                                            :
                                            <ValidateItem validator={validator} thisForm={configType+"_config"} field="channel_name">
                                            <input className="form-control" value={!_thisConfigData?"":_thisConfigData.channel_name}
                                                   onBlur={(e)=>validateField(configType+"_config","channel_name",e.target.value)}
                                                   onChange={(e)=>{dispatch(editConfigData({"channel_name":e.target.value},configType));validateField(configType+"_config","channel_name",e.target.value);}}
                                            />
                                            </ValidateItem>
                                        }
                                    </div>
                                    {clmsConfig.configType == "pull" ? "" :
                                        <div className="col-xs-1">
                                            <Button size="large" onClick={()=>this.checkChannel(_thisConfigData.channel_name,!_thisConfigData.oldChannel?"":_thisConfigData.oldChannel,configType)}>检测</Button>
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label">源站设备组类型：</label>

                                    <div className="col-xs-5">
                                        <Select style={{ width: "100%" }}
                                                value={!_thisConfigData?"":_thisConfigData.source_station_type}
                                                onChange={(val)=>{this.changeStationType(val,configType)/*dispatch(editConfigData({"source_station_type":val},configType))*/}}>
                                            <Option value="1">高升源站设备组</Option>
                                            <Option value="2">第三方源站设备组</Option>
                                        </Select>
                                        {/* <select className="form-control">
                                         <option value="1">高升源站设备组</option>
                                         <option value="2">第三方源站设备组</option>
                                         </select>*/}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-2 control-label">具体配置：</label>

                                    <div className="col-xs-5">
                                        <div style={{"display":_thisConfigData&&_thisConfigData.source_station_type=="1"?"block":"none"}}>
                                            <div className="form-group">
                                                <label className="col-xs-2 control-label">源站设备组：</label>

                                                <div className="col-xs-10">
                                                    <ValidateItem validator={validator} thisForm={configType+"_config"} field="devs_group">
                                                    <Select style={{ width: "100%" }}  showSearch onChange={(val)=>this.changeDevGroup("devs_group_id",val,configType)} value={!_thisConfigData?"":_thisConfigData.devs_group_id}>
                                                        {devGroupOpt}
                                                    </Select>
                                                    </ValidateItem>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-xs-2 control-label">拓扑结构：</label>
                                                <div className="col-xs-10">
                                                    <ValidateItem validator={validator} thisForm={configType+"_config"} field="topology">
                                                    <Select style={{ width: "100%" }}
                                                            showSearch
                                                            value={!_thisConfigData?"":_thisConfigData.topology_id}
                                                            onChange={(val)=>{dispatch(editConfigData({"topology_id":val},configType)); validateField(configType+"_config","topology",val);}}>
                                                        {/*topoOpt*/
                                                            !_thisConfigData.topoDatas?[]:
                                                                _thisConfigData.topoDatas.map((topo,t)=>
                                                                        <Option key={topo._id}>{topo.name}</Option>
                                                                )
                                                        }
                                                    </Select>
                                                    </ValidateItem>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{"display":_thisConfigData&&_thisConfigData.source_station_type!="1"?"block":"none"}}>
                                            {!ipData||!ipData.default||!ipData.default.Ipinfo?"":
                                                ipData.default.Ipinfo.map((item,index)=>
                                                        <IpConfig lableName="默认" key={index} ipIndex={index} {...item}
                                                                  selectIpFn={(name,value)=>this.editIpData(name,value,index,configType)}
                                                                  addDefaultFn={()=>this.addDefault(configType)}
                                                                  removeDefaultFn={()=>this.removeDefault(index,configType)}
                                                                  ipType="ipNeed"
                                                                  thisForm={configType+"_config"}
                                                            />
                                                )
                                            }
                                            {!ipData||!ipData.ipConfig||!ipData.ipConfig.length?"":
                                                ipData.ipConfig.map((item,index)=>
                                                    <OperatConfig configIndex={index} key={index} {...item}
                                                                  ipConfig ={ipData.ipConfig}
                                                        />

                                                )
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label className="col-xs-2 control-label">集群：</label>

                                            <div className="col-xs-10">
                                                <ValidateItem validator={validator} thisForm={configType+"_config"} field="cluster">
                                                <Select style={{ width: "100%" }}
                                                        showSearch
                                                        value={!_thisConfigData||!_thisConfigData.cluster_id?"":_thisConfigData.cluster_id+"&culster&"+_thisConfigData.cluster_name}
                                                        onChange={(val)=>this.changeCluster(val,configType)}>
                                                    {clusterOpt}
                                                </Select>
                                                </ValidateItem>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*频道配置*/}
                                <ChannelConfig params={this.props.params} />
                                {/*回源配置*/}
                                <OriginConfig />
                                {/*http服务器配置*/}
                                <HttpServiceConfig />
                                {/*flv文件录制*/}
                                <FlvConfig />
                                {/*HLS服务*/}
                                <HlsConfig />
                                {/*Http+ts直播*/}
                                <HttpTsConfig />
                                {/*MP4文件录制*/}
                                <Mp4Config />
                                {/*IP防盗链*/}
                                <IpListConfig />
                                {/*HttpHooks*/}
                                <HttpHookConfig />
                                {/* <div className="config-box">
                                    <div className="clearfix f-gradient">
                                        <div className="col-xs-3"><h4>HttpHooks</h4></div>
                                        <div className="col-xs-9 clms-cbtns">
                                            <i className="iconfont more-dot">&#xe65e;</i>
                                        </div>
                                    </div>
                                    <div className="b-main">
                                        <div className="form-group">
                                            <label className="col-xs-1 control-label">生效层级：</label>

                                            <div className="col-xs-2">
                                                <input type="checkbox"/><label className="mr10">源</label>
                                                <input type="checkbox"/><label className="mr10">上层</label>
                                                <input type="checkbox"/><label className="mr10">中转</label>
                                                <input type="checkbox"/><label className="mr10">边缘</label>
                                            </div>
                                            <div className="col-xs-2">
                                                <i className="glyphicon glyphicon-plus green mr10"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <ul className="tab-nav clearfix">
                                                <li className="active">配置1<i className="iconfont">&#xe600;</i></li>
                                                <li>配置2<i className="iconfont">&#xe600;</i></li>
                                                <li>配置3<i className="iconfont">&#xe600;</i></li>
                                            </ul>
                                            <div className="b-cont">
                                                <table className="table table-bordered config-table">
                                                    <thead >
                                                    <tr>
                                                        <th style={{"width":"30%"}}>配置项</th>
                                                        <th>配置内容</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="text-center">enabled</td>
                                                        <td>
                                                            <select className="form-control">
                                                                <option value="on">on</option>
                                                                <option value="off">off</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">on_consumers_enabled</td>
                                                        <td>
                                                            <select className="form-control">
                                                                <option value="on">on</option>
                                                                <option value="off">off</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">on_publish_stream_info_enabled</td>
                                                        <td>
                                                            <select className="form-control" value="off">
                                                                <option value="on">on</option>
                                                                <option value="off">off</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">on_edge_publish_stream_info_enabled</td>
                                                        <td>
                                                            <select className="form-control" value="off">
                                                                <option value="on">on</option>
                                                                <option value="off">off</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">on_warn_info_enabled</td>
                                                        <td>
                                                            <select className="form-control" value="off">
                                                                <option value="on">on</option>
                                                                <option value="off">off</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">自定义配置</td>
                                                        <td>
                                                            <textarea className="form-control" rows="3"></textarea>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {/!*功能开关*!/}
                                                <div className="form-group mt20">
                                                    <div className="col-xs-4">功能开关：</div>
                                                </div>
                                                <div>
                                                    <ul className="tab-nav clearfix">
                                                        <li className="active">on_connect</li>
                                                        <li>on_close</li>
                                                        <li>on_publish</li>
                                                        <li>on_unpublish</li>
                                                        <li>on_play</li>
                                                        <li>on_stop</li>
                                                        <li>on_warn_back_source_connect</li>
                                                        <li>on_edge_play_start</li>
                                                        <li>on_edge_play_stop</li>
                                                        <li>on_record_file</li>
                                                    </ul>
                                                    <div className="b-cont">
                                                        <table className="table table-bordered config-table">
                                                            <thead >
                                                            <tr>
                                                                <th style={{"width":"30%"}} colSpan="2">配置项</th>
                                                                <th>配置内容</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td colSpan="2" className="text-center">enabled</td>
                                                                <td>
                                                                    <select className="form-control">
                                                                        <option value="on">on</option>
                                                                        <option value="off">off</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="2"  className="text-center">on_hook_warn_info_enabled</td>
                                                                <td>
                                                                    <select className="form-control">
                                                                        <option value="on">on</option>
                                                                        <option value="off">off</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="2" className="text-center">conn_timeout</td>
                                                                <td><input value="" className="form-control"/></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="2" className="text-center">recv_timeout</td>
                                                                <td><input value="" className="form-control"/></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="2" className="text-center">send_timeout</td>
                                                                <td><input value="" className="form-control"/></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="2" className="text-center">type</td>
                                                                <td>
                                                                    <select className="form-control">
                                                                        <option value="both">both</option>
                                                                        <option value="mp4">mp4</option>
                                                                        <option value="dvr">dvr</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td rowSpan="4" className="text-center" style={{"vertical-align":"middle"}}>
                                                                    hook
                                                                    <div className="hook-btn"><i className="iconfont green">&#xe61f;</i></div>
                                                                    <div  className="hook-btn"><i className="iconfont red">&#xe61e;</i></div>
                                                                </td>
                                                                <td className="text-center">name</td>
                                                                <td><input className="form-control" /></td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">enabled</td>
                                                                <td>
                                                                    <select className="form-control">
                                                                        <option value="on">on</option>
                                                                        <option value="off">off</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">sync</td>
                                                                <td>
                                                                    <select className="form-control">
                                                                        <option value="on">on</option>
                                                                        <option value="off">off</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-center">url</td>
                                                                <td>
                                                                    <textarea  className="form-control" rows="3"></textarea>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>*/}
                                {/*打印日志配置*/}
                                <PrintConfig />
                                {/*Refer防盗链*/}
                                <ReferConfig />

                            </div>
                        </div>
                    </form>
                </div>
                <BackTop />
            </div>
        )
    }
}
function sel(state) {
   //console.log(state);
    return {
        "clmsChannel":state.clmsChannel,
        "clmsConfig": state.clmsConfig,
        "clmsChannelConfig": state.clmsChannelConfig,
        "clmsOriginConfig": state.clmsOriginConfig,
        "clmsHttpServiceConfig": state.clmsHttpServiceConfig,
        "clmsFlvConfig": state.clmsFlvConfig,
        "clmsHlsConfig": state.clmsHlsConfig,
        "clmsHttpTsConfig": state.clmsHttpTsConfig,
        "clmsMp4Config": state.clmsMp4Config,
        "clmsIpListConfig": state.clmsIpListConfig,
        "clmsPrintConfig": state.clmsPrintConfig,
        "clmsReferConfig": state.clmsReferConfig,
        "clmsHookConfig": state.clmsHookConfig,
        "search":state.clmsTaskList.search,
        validator: state.validator_1}
}
export default connect(sel)(ClmsConfig);
ClmsConfig.contextTypes={
    router: PropTypes.object
}