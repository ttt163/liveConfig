//import '../public/plugs/bootstrap/css/bootstrap.css';
//import "../public/css/f.css"
//import  '../css/main.css';
import React from 'react'
import { render } from 'react-dom'
//import '../public/plugs/selectize/js/selectize.js'
import {ShowDiag,addOperation} from  "../public/js/f.js"
import SearchClms from '../components/Clms.search.js'
import SearchClmsTable from '../components/Clms.searchTable.js'
import ClmsAdd from "../components/Clms.addChannel.js"
import ClmsEdit from "../components/Clms.editChannel.js"
import ClmsCopy from "../components/Clms.copyChannel.js"
import ClmsSendDev from "../components/Clms.sendDev.js"
import { connect } from 'react-redux'
import {addClmsChannel,searchClmsTask,showClmsTask,editClmsTask} from "../actions/clmsActions.js"
import { URL,PANURL } from '../config.js';
import { Pagination,Select } from 'antd';
import {store} from "../allStore"
const Option = Select.Option;
import {getForm,getFields,getFormFields,clearFormData,delFormsFn,clearArrFormFn} from "../public/js/validate/validateRform.js"
//import {getForm,getFields,getFormFields,clearFormData} from "../public/js/validate/validateRform.js"
export function getClmsChannel(data) {
    var channelName=store.getState().clmsTaskList.channel_name;
    var resData = [], count = 0;
    $.ajax({
        url: `${URL}/GetClmsTask`,
        type: 'post',
        data: JSON.stringify(data),
        async: false,  //默认为true 异步
        dataType: "json",
        error: function () {
            console.log("操作失败");
        },
        success: function (data) {
            //console.log(data);
            if (data.info.status == "success") {
                if (!data.info.data) {
                    //resData=[];
                    return;
                }
                if(!channelName||!channelName.length){
                    resData = data.info.data;
                }else{
                    if(data.info.data.length){
                        data.info.data.map((item,index)=>{
                            if(channelName.indexOf(item.channel_name)!=-1){
                                resData.push({...item,"isChk":true});
                            }else{
                                resData.push({...item,"isChk":false});
                            }
                        })
                    }

                }
                count = !data.info.all_row ? 0 : data.info.all_row;

            }
        }
    })
    return {"data": resData, "count": count}
}
//获取客户名和频道
export function getClientAndChannel(){
    var allChannel=[],clientAndChannel=[],allData=[];
    $.ajax({
        url:`${URL}/GetAllClientAndChannel`,
        type:'post',
        data:JSON.stringify({}),
        async: false,  //默认为true 异步
        dataType: "json",
        success: function (data) {
            if (data.info.status == "success") {
                var data=data.info.data;
                if(!data||!data[0]){
                    allChannel=[];
                    clientAndChannel=[];
                }else{
                    allData=data;
                    for(var i=0;i<data.length;i++){
                        var isrep=false;
                        if(data[i].client_name){
                            for(var j=0;j<clientAndChannel.length;j++){
                                if(data[i].client_name==clientAndChannel[j].client_name){
                                    //客户名存在
                                    if(!data[i].channel_name){
                                        isrep=true;
                                        break;
                                    }else{
                                        clientAndChannel[j].channel_name.push(data[i].channel_name);
                                        isrep=true;
                                        break;
                                    }

                                }
                            }
                            if(data[i].channel_name){
                                if(!isrep){
                                    var channel_name=[];
                                    channel_name.push(data[i].channel_name);
                                    clientAndChannel.push({"client_name":data[i].client_name,"channel_name":[...channel_name]});
                                }
                                allChannel=[...allChannel,data[i].channel_name];
                            }

                        }
                    }
                }

            }
        }
    });
    return {"allChannel":allChannel,"clientAndChannel":clientAndChannel,"allData":allData}
}
class Clms extends React.Component {
    constructor(state) {
        super(state);
    }

    componentDidMount() {
        //console.log(this.props.location.pathname);
        if(this.props.location.pathname=="/"||this.props.location.pathname=="/clms"){
            $("#clmsConfig").addClass("f-curr");
        }

        //清空校验
        $("#f-clms-modal").on("hidden.bs.modal", function () {
            clearArrFormFn("addChannel");
        });
        $("#f-editclms-modal").on("hidden.bs.modal", function () {
            clearArrFormFn("addChannel");
        });
        $("#f-clmsCopy-modal").on("hidden.bs.modal", function () {
            clearArrFormFn("addChannel");
        });
    }
    componentWillMount(){
        if(localStorage.loginInfo==undefined){
            localStorage.loginInfo=JSON.stringify({'loginStatus':false});
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }else{
            var data=JSON.parse(localStorage.loginInfo);
            if(data.firstlogin){
                $('body').css('display','none');
                data.firstlogin=false;
                localStorage.loginInfo=JSON.stringify(data);
                window.location.reload(true);
            }
            if(!data.loginStatus){
                window.location.href='#/login'
            }else if(data.role=='设备运维'){
                window.location.href='#/device'
            }
        }
        const {dispatch}=this.props;
        var data = {
            "query": {},
            "page": "1",
            "row": "10",
            "all_row": "1"
        }
        var rsData = getClmsChannel(data);
        //  console.log(rsData);
        dispatch(showClmsTask(rsData.data));
        dispatch(searchClmsTask({...data, "count": rsData.count}));
    }
    componentWillUnmount() {
        //console.log($("#clmsConfig"));
        $("#clmsConfig").removeClass("f-curr");
       // console.log("j结束");
        /*const {dispatch}=this.props;
         dispatch(showCluster({"list":[],"search":{}}));
         clearFormData("cluster");
         clearFormData("searchClus");*/
        //dispatch(showCluster({"list":list.data,"search":{...data,"count":list.count}}));
        // clearFormData("searchDevGroup");
    }

    //添加频道
    addClmsChannel() {
        var data = {
            "_id": "",
            "client_name": "",
            "channel_name": "",
            "nginx_id":"",
            "clms_id":"",
            "clms_back_id":"",
            "nginx_back_id":"",
            "time_stamp":""
        };
        this.props.dispatch(addClmsChannel(data));

        $("#f-clms-modal").modal();
        getFormFields("addChannel", {
            "client_name": {
                "value": "",
                "rule": {"required": true, "regexp":/^[\u4E00-\uFA29a-zA-Z0-9]+$/},
                "msg": {"required": "客户名称不能为空", "regexp": "客户名称只能由中文、数字、英文字母组成"}
            },
            "channel_name": {
                "value": "",
                "rule": {"required":true,"regexp": PANURL},
               // "rule": {"required": true,"regexp":/^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                "msg": {"required": "频道名不能为空！","regexp": "频道名格式错误"}
            }
        });
    }

    //重新下发
    sendChannel() {
         const {dispatch,channel_name,search}=this.props;
        if(!channel_name||!channel_name.length){
            new ShowDiag({
                msg:  '请选择频道！',
                closetime: 1
            });
            return;
        }
        Modal.confirm({
            msg: '确定重新下发选定的频道吗？',
            title: "重新下发",
            btnok: "确定",
            btncl: "取消"
        }).on(function (e) {
            if (e) {
                var _data = {
                    "type":"clms",
                    "channel_name":channel_name
                };
                $.ajax({
                    url: `${URL}/SendConfigByChannel`,
                    type: 'post',
                    data: JSON.stringify(_data),
                    async: true,  //默认为true 异步
                    dataType: "json",
                    error: function (error) {
                        var data = $.parseJSON(error.responseText);
                        new ShowDiag({
                            msg: !data.info.warning ? '频道下发失败！' : data.info.warning,
                            closetime: 2
                        });
                    },
                    success: function (data) {
                        //console.log(data);
                        if (data.info.status == "success") {
                            new ShowDiag({
                                msg: '频道下发成功，请稍后刷新状态！',
                                closetime: 1
                            });
                            //更新列表
                            var rsData = getClmsChannel(search);
                            //  console.log(rsData);
                            dispatch(showClmsTask(rsData.data));

                        } else {
                            new ShowDiag({
                                msg: !data.info.warning ? '频道下发失败！' : data.info.warning,
                                closetime: 2
                            });
                        }
                    }
                });
                addOperation("clms频道重新下发！");
            }
        })

    }

    //分页
    /*ｐａｇｅ　页数
     ｒｏｗ　每页　几条
     ａｌｌ＿ｒｏｗ　是＂１＂　就是要总数的意思*/
    changePage(page) {
        const {list,search,dispatch}=this.props;
        var data ={...search, "page": page + "", "all_row": "0"};
        var rsData = getClmsChannel(data);
        //console.log(rsData);
        dispatch(showClmsTask(rsData.data));
        dispatch(searchClmsTask(data));
        //dispatch(searchClmsTask({...data, "count": rsData.count}));
    }

    changeSize(size) {
        const {list,search,dispatch}=this.props;
        var data = {...search, "row": size.toString(), "all_row": "0"};
        var rsData = getClmsChannel(data);
        //console.log(rsData);
        dispatch(showClmsTask(rsData.data));
        dispatch(searchClmsTask(data));
    }

    render() {
        const {list,search}=this.props;
        return <div>
            <SearchClms />

            <div className="table-box">
                <div className="clearfix f-gradient">
                    <div className="f-caption pull-left">
                        <ul className="list-inline">
                            <li><h4>CLMS频道列表</h4></li>
                            <li className="f-count">共<i>{!search||!search.count ? 0 : search.count}</i>条</li>
                            <li>每页显示
                                <div className="numSelect">
                                    <Select name="size" defaultValue="10" style={{ width: 80 }}
                                            onChange={(v)=>this.changeSize(v)}>
                                        <Option value="10">10&nbsp;条/页</Option>
                                        <Option value="20">20&nbsp;条/页</Option>
                                        <Option value="30">30&nbsp;条/页</Option>
                                        <Option value="50">50&nbsp;条/页</Option>
                                        <Option value="100">100&nbsp;条/页</Option>
                                    </Select>
                                </div>
                                个
                            </li>
                        </ul>
                    </div>
                    <div className="pull-right" style={{"lineHeight":"46px"}}>
                        {/* <button type="button" className="btn  btn-small" >拷贝</button>*/}
                        <button type="button" style={{"marginRight":"10px"}} className="btn  t-btn"
                                onClick={()=>this.addClmsChannel()}>新增频道
                        </button>
                        <button type="button" style={{"marginRight":"10px"}} className="btn  t-btn"
                                onClick={()=>this.sendChannel()}>重新下发
                        </button>
                        {/*<button type="button" className="btn  btn-small changeStatus" data-status="-2" data-url="/cluster/destroy/" data-id="all">删除</button>*/}
                    </div>
                </div>
                <SearchClmsTable />
            </div>
            {/*分页*/}
            {!list?
                "" :
                <Pagination onChange={this.changePage.bind(this)}
                            pageSize={search?parseInt(search.row):10}
                            current={search?parseInt(search.page):1}
                            total={search?parseInt(search.count):0}/>
            }
            {/*频道添加*/}
            <ClmsAdd />
            <ClmsEdit />
            <ClmsCopy />
            <ClmsSendDev />
        </div>
    }


}
function sel(state) {
    //console.log(state);
    return {"channel_name":state.clmsTaskList.channel_name,"list":state.clmsTaskList.list,"search":state.clmsTaskList.search}
}
export default connect(sel)(Clms)