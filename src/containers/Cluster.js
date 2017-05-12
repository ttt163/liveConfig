//import '../public/plugs/bootstrap/css/bootstrap.css';
//import "../public/css/f.css"
//import  '../css/main.css';
import React from 'react'
import { render } from 'react-dom'
import '../public/plugs/selectize/js/selectize.js'
import {selectie,validateChosen,formCheck,ShowDiag,alertMsg,cluster} from  "../public/js/f.js"
import SearchCluster from '../components/Cluster.search.js'
import SearchClusterTable from '../components/Cluster.searchTable.js'
import AddCluster from '../components/Cluster.add.js'
import EditCluster from '../components/Cluster.edit.js'
import ClusterDetail from '../components/Cluster.detail.js'
import ClusterCopy from "../components/Cluster.copy.js"
import TopoInfo from '../components/Topology.info.js'
import { connect } from 'react-redux'
import {addCluster,showCluster} from "../actions/clusterActions.js"
import { URL } from '../config.js';
import { Pagination,Select } from 'antd';
const Option = Select.Option;
import {getForm,getFields,getFormFields,clearFormData,delFormsFn} from "../public/js/validate/validateRform.js"
//export var bdevGroupOption=[],zdevGroupOption=[];
export function getdevGroupByRole(role){
    var opct=[];
    $.ajax({
        url:`${URL}/GetDevGroupConfig`,
        type:'post',
        data:JSON.stringify({"query":{"role":role}}),
        async: false,  //默认为true 异步
        dataType: "json",
        error:function(){
            console.log("操作失败");
        },
        success:function(data){
            //console.log(data);
            if(data.info.status=="success"){
                var data=data.info.data;
                if(!data){
                    return;
                }
                for(var i=0;i<data.length;i++){
                    opct.push(<Option key={data[i]._id+"&devG&"+data[i].name}>{data[i].name}</Option>);
                }
            }
        }
    })
    return opct;
}
//查询集群
export function getClusterDatas(data){
    var resData=[],count=0;
    $.ajax({
        url: `${URL}/GetClusterConfig`,
        type: 'post',
        data: JSON.stringify(data),
        async: false,  //默认为true 异步
        dataType: "json",
        error: function () {
            console.log("操作失败");
           /* new ShowDiag({
                msg: '添加失败！',
                closetime: 1
            });*/
        },
        success: function (data) {
            //console.log(data);
            if (data.info.status == "success") {
                if(!data.info.data){
                    //resData=[];
                    return ;
                }
                resData=data.info.data;
                count=!data.info.all_row?0:data.info.all_row;
            }
        }
    })
    return {"data":resData,"count":count};
}
class Cluster extends React.Component {
    constructor(state) {
        super(state);
    }
    componentDidMount(){
        const {dispatch}=this.props;
        var data={
            "query":{},
            "page":"1",
            "row":"10",
            "all_row":"1"
        }
        var list=getClusterDatas(data);
        //console.log(list);
        this.props.dispatch(showCluster({"list":list.data,"search":{...data,"count":list.count}}));
        ///====
        $('#f-addCluster-modal').on("hidden.bs.modal", function () {
            clearFormData("cluster");
            dispatch(addCluster({"level_devs_group":[]}));
        });
        $('#d-editCluster-modal').on("hidden.bs.modal", function () {
            clearFormData("cluster");
            dispatch(addCluster({"level_devs_group":[]}));
        });
        $("#f-copy-modal").on("hidden.bs.modal", function () {
            clearFormData("clusterCopy");
        });
        ///-------------------------------
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
        dispatch(showCluster({"list":[],"search":{}}));
       // clearFormData("cluster");
        //clearFormData("searchClus");
        delFormsFn(["cluster","searchClus","clusterCopy"]);
        //dispatch(showCluster({"list":list.data,"search":{...data,"count":list.count}}));
       // clearFormData("searchDevGroup");
    }
    //添加集群
    addCluster(){
        var data={
            "_id": "",
            "name": "",
            "levels_amount": "2",
            "level_devs_group": [
                {
                    "level": "2",
                    "devs_group_id": "",
                    "devs_group_name":"",
                    "topology_id": "",
                    "topology_name":""
                }
            ]
        };
        this.props.dispatch(addCluster(data));
        $('#f-addCluster-modal').modal();
        //加验证
        getFormFields("cluster", {
            "name": {
                "value": "",
                "rule": {"required": true,"regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/,"maxLen":200},
                "msg": {"required": "集群名称不能为空！","regexp": "集群名称只能由中文，数字，英文字母，下划线和“-”组成！","maxLen":"集群名称不能超过200个字符"}
            }/*,
            "levels_amount": {
                "value": 2,
                "rule": {"required": true,"regexp": /^[2-9]+$|^([1-9][0-9])*$/},
                "msg": {"required": "层级不能为空！","regexp": "层级必须是2以上的整数！"}
            }*/
        });
        /*bdevGroupOption=getdevGroupByRole("3");
        zdevGroupOption=getdevGroupByRole("2");*/
    }
    //分页
    /*ｐａｇｅ　页数
     ｒｏｗ　每页　几条
     ａｌｌ＿ｒｏｗ　是＂１＂　就是要总数的意思*/
    changePage(page){
        const {clusterList,dispatch}=this.props;
        var data=clusterList.search;
        data={...data,"page":page+"","all_row":"0"};
        var list=getClusterDatas(data);
        //console.log(list);
        dispatch(showCluster({"list":list.data,"search":{...data}}));
    }
    changeSize(size) {
        const {clusterList,dispatch}=this.props;
        var data=clusterList.search;
        data={...data,"row":size.toString(),"all_row":"0","page":"1"};
        var list=getClusterDatas(data);
        //console.log(list);
        dispatch(showCluster({"list":list.data,"search":{...data}}));
    }
    render() {
        const {clusterList}=this.props;
        return <div>
            <SearchCluster />
            <div className="table-box">
                <div className="clearfix f-gradient">
                    <div className="f-caption pull-left">
                        <ul className="list-inline">
                            <li><h4>集群列表</h4></li>
                            <li className="f-count">共<i>{!clusterList.search?0:clusterList.search.count}</i>条</li>
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
                        {/* <button type="button" className="btn  btn-small" >拷贝</button>*/}
                        <button type="button" className="btn  btn-small" onClick={()=>this.addCluster()} id="f-add">新增</button>
                        {/*<button type="button" className="btn  btn-small changeStatus" data-status="-2" data-url="/cluster/destroy/" data-id="all">删除</button>*/}
                    </div>
                </div>
                <SearchClusterTable />
            </div>
            {/*分页*/}
            {!clusterList.list||!clusterList.search||!clusterList.search.count?
                "":
                <Pagination onChange={this.changePage.bind(this)} pageSize={clusterList.search?parseInt(clusterList.search.row):10} current={clusterList.search?parseInt(clusterList.search.page):1}  total={clusterList.search?parseInt(clusterList.search.count):0} />
                }
            {/*集群添加*/}
            <AddCluster />
            {/*集群编辑*/}
            <EditCluster />
            {/*集群详情*/}
            <ClusterDetail />
            {/*集群拷贝*/}
            <ClusterCopy />
            {/*拓扑详情*/}
            <TopoInfo topos={this.props.topos.topoItems} />
            {/*转吗配置状态*/}
            <div className="modal fade f-modal" id='f-confState'></div>
        </div>
    }


}
function sel(state) {
    //console.log(state);
    return {"topos":state.topos,"cluster":state.cluster,"clusterList":state.clusterList}
}
export default connect(sel)(Cluster)