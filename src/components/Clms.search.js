import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL ,TASKSTATUS} from '../config.js';
import {getClmsChannel,getClientAndChannel} from "../containers/Clms.js"
//import {editClusSearch,showCluster} from "../actions/clusterActions.js"
//import {getForm,getFields,getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {searchClmsTask,showClmsTask,editClmsTask} from "../actions/clmsActions.js"
var channelOpt=[],statusOpt=[];
class SearchClms extends Component {
    componentDidMount() {
        const {dispatch}=this.props;
        statusOpt=[];
        for(var [key,item] of Object.entries (TASKSTATUS)){
            statusOpt.push(<Option key={key}>{item}</Option>);
        }
        //获取客户和频道
        var ccdata=getClientAndChannel();
        dispatch(editClmsTask({"clientArr":ccdata.clientAndChannel,"channelArr":ccdata.allChannel,"channelAndclientArr":ccdata.allData}));
       /* for(var i=0;i<ccdata.allChannel.length;i++){
         channelOpt.push(<Option key={i} value={ccdata.allChannel[i]}>{ccdata.allChannel[i]}</Option>);
         }*/
    }

    componentWillReceiveProps(nextProps) {
        const {search,clmsTaskList}=nextProps;
        var query=search.query;
        if(!query.client_name){
            channelOpt=[];
            var channelData=clmsTaskList.channelArr;
            for(var i=0;i<channelData.length;i++){
                channelOpt.push(<Option key={i} value={channelData[i]}>{channelData[i]}</Option>);
            }
        }

    }
    submitSearch(e){
        e.preventDefault();
        const {dispatch,search}=this.props;
       /* if(!validateAllFields("searchClus")){
            return;
        }*/
        var data={...search,"all_row":"1","page":"1"};
        var list=getClmsChannel(data);
        //console.log(list);
        dispatch(showClmsTask(list.data));
        dispatch(searchClmsTask({...data,"count":list.count}));
    }
    editSearch(val,name){
        const {dispatch,search,clmsTaskList}=this.props;
       // console.log(val);
        var query=search.query;
        if(name=="client_name"){
            dispatch(searchClmsTask({"query":{...query,[name]:val,"channel_name":""}}));
            //for(var i=0;i<clmsTaskList.clientArr.length;i++){}
            if(!val){
               /* channelOpt=[];
                var channelData=clmsTaskList.channelArr;
                for(var i=0;i<channelData.length;i++){
                    channelOpt.push(<Option key={i} value={channelData[i]}>{channelData[i]}</Option>);
                }*/
                return;
            }
            var index=clmsTaskList.clientArr.findIndex((value,index,arr)=>value.client_name==val);
            var channArr=clmsTaskList.clientArr[index].channel_name;
            channelOpt=[];
            for(var i=0;i<channArr.length;i++){
                channelOpt.push(<Option key={i} value={channArr[i]}>{channArr[i]}</Option>);
            }
            //console.log(index);
           //
        }else if(name=="channel_name"){
            var channelAndeClientData=clmsTaskList.channelAndclientArr,client_name="";
            for(var i=0;i<channelAndeClientData.length;i++){
                if(val==channelAndeClientData[i].channel_name){
                    client_name=channelAndeClientData[i].client_name;
                    break;
                }

            }
            dispatch(searchClmsTask({"query":{...query,[name]:val,"client_name":client_name}}));
        }else{
            dispatch(searchClmsTask({"query":{...query,[name]:val}}));
        }

    }
    render() {
       // console.log("233");
        const {search,dispatch,validator,clmsTaskList}=this.props;
        //console.log(clientArr);
        return (
            <form >
                <div className="searBox">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>客户名称:</label>
                                <div className="inpt">
                                    <ValidateItem validator={validator} thisForm="searchClus" field="name">
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            notFoundContent="无搜索结果！"
                                            onChange={(val)=>this.editSearch(val,"client_name")}
                                            value={!search||!search.query||!search.query.client_name?"":search.query.client_name}
                                            >
                                            <Option value="" >请选择</Option>
                                            {!clmsTaskList||!clmsTaskList.clientArr?[]:
                                                clmsTaskList.clientArr.map((item,i)=>
                                                <Option key={item.client_name}>{item.client_name}</Option>)
                                            }

                                        </Select>
                                    </ValidateItem>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>下发状态:</label>
                                <div className="inpt">
                                    <ValidateItem validator={validator} thisForm="searchClus" field="levels_amount">
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            notFoundContent="无搜索结果！"
                                            onChange={(val)=>this.editSearch(val,"send_state")}
                                            value={!search||!search.query||!search.query.send_state?"":search.query.send_state}
                                            >
                                            <Option value="" >请选择</Option>
                                            {statusOpt}
                                            {/* <Option value="0">失败</Option>
                                            <Option value="1">成功</Option>*/}
                                        </Select>
                                    </ValidateItem>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>频道名称:</label>
                                <div className="inpt">
                                    <ValidateItem validator={validator} thisForm="searchClus" field="name">
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            notFoundContent="无搜索结果！"
                                            onChange={(val)=>this.editSearch(val,"channel_name")}
                                            value={!search||!search.query||!search.query.channel_name?"":search.query.channel_name}

                                            >
                                            <Option value="" >请选择</Option>
                                            {channelOpt}
                                        </Select>
                                    </ValidateItem>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>Reload状态:</label>
                                <div className="inpt">
                                    <ValidateItem validator={validator} thisForm="searchClus" field="levels_amount">
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            notFoundContent="无搜索结果！"
                                            onChange={(val)=>this.editSearch(val,"reload_state")}
                                            value={!search||!search.query||!search.query.reload_state?"":search.query.reload_state}
                                            >
                                            <Option value="" >请选择</Option>
                                            {statusOpt}
                                        </Select>
                                    </ValidateItem>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>delete状态:</label>
                                <div className="inpt">
                                    <ValidateItem validator={validator} thisForm="searchClus" field="levels_amount">
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            notFoundContent="无搜索结果！"
                                            onChange={(val)=>this.editSearch(val,"delete_state")}
                                            value={!search||!search.query||!search.query.delete_state?"":search.query.delete_state}
                                            >
                                            <Option value="" >请选择</Option>
                                            {statusOpt}
                                        </Select>
                                    </ValidateItem>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-12 text-center">
                        <button type="submit" onClick={(e)=>this.submitSearch(e)} className="btn btn-submit">查询</button>
                        <button type="reset"
                                onClick={(e)=>{e.preventDefault();dispatch(searchClmsTask({"query":{"client_name":"","channel_name":"","send_state":"","reload_state":"","delete_state":""}}));}}
                                className="btn btn-reset mleft">重置
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}
function sel(state) {
    //console.log(state);
    return {"search": state.clmsTaskList.search,validator:state.validator_1,"clmsTaskList":state.clmsTaskList}
}
export default connect(sel)(SearchClms)