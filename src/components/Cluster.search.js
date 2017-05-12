import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {getClusterDatas} from "../containers/Cluster.js"
import {editClusSearch,showCluster} from "../actions/clusterActions.js"
import {getForm,getFields,getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
class SearchCluster extends Component {
    componentDidMount() {
        getForm("searchClus");
        getFormFields("searchClus", {
            "name": {
                "value": "",
                "rule": {"regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/,"maxLen":200},
                "msg": {"regexp": "集群名称只能由中文，数字，英文字母，下划线和“-”组成！","maxLen":"集群名称不能超过200个字符"}
            },
            "levels_amount": {
                "value": "",
                "rule": {"regexp": /^[2-9]+$|^([1-9][0-9])*$/},
                "msg": {"regexp": "层级必须是2以上的整数！"}
            }
        });
    }
    submitSearch(e){
        e.preventDefault();
        const {clusterList,dispatch}=this.props;
        if(!validateAllFields("searchClus")){
            return;
        }
        var search=clusterList.search;
        var data={...search,"all_row":"1","page":"1"};
        var list=getClusterDatas(data);
        //console.log(list);
        dispatch(showCluster({"list":list.data,"search":{...data,"count":list.count}}));
    }
    render() {
        const {clusterList,dispatch,validator}=this.props;
        return (
            <form >
                <div className="searBox">
                    <div className="col-xs-6">
                        <div className="resgrid">
                            <label>集群名:</label>
                            <div className="inpt">
                                <ValidateItem validator={validator} thisForm="searchClus" field="name">
                                    <input value={!clusterList.search||!clusterList.search.query?"":clusterList.search.query.name}
                                           onChange={(e)=>{dispatch(editClusSearch({"name":e.target.value}));validateField("searchClus","name",e.target.value);}}
                                           className="form-control"/>
                                </ValidateItem>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="resgrid">
                            <label>层级数:</label>
                            <div className="inpt">
                                <ValidateItem validator={validator} thisForm="searchClus" field="levels_amount">
                                    <input value={!clusterList.search||!clusterList.search.query?"":clusterList.search.query.levels_amount}
                                           onChange={(e)=>{dispatch(editClusSearch({"levels_amount":e.target.value}));validateField("searchClus","levels_amount",e.target.value);}}
                                           className="form-control" name="level"/>
                            </ValidateItem>
                               </div>
                        </div>
                    </div>
                    <div className="col-xs-12 text-center">
                        <button type="submit" onClick={(e)=>this.submitSearch(e)} className="btn btn-submit">查询</button>
                        <button type="reset"
                                onClick={(e)=>{e.preventDefault();dispatch(editClusSearch({"name":"","levels_amount":""}))}}
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
    return {"clusterList": state.clusterList,validator:state.validator_1}
}
export default connect(sel)(SearchCluster)