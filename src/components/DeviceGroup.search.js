/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { searchDevGroup,editSearchDevGroup} from '../actions/devGoupActions.js'
import { URL } from '../config.js';
import {getDevGroupData} from "../containers/DeviceGroup.js";
import { Select } from 'antd';
const Option = Select.Option;
import { roleOption } from '../containers/Device.js';
import {getForm,getFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
class SearchDeviceGroup extends Component {
    componentDidMount() {
        getForm("searchDevGroup");
        getFields("searchDevGroup","name",{
            "value":"",
            "rule": {"regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/,"maxLen":200},
            "msg": {"regexp": "设备组名由中文，数字，英文字母，下划线和“-”！","maxLen":"设备名不能超过200个字符"}
        });
    }
    subDevSearch(e){
        e.preventDefault();
        const {dispatch}=this.props;
        if(!validateAllFields("searchDevGroup")){
            return;
        }
        var search=this.props.devGroupList.search;
        var _data={...search,"all_row":"1","page":"1"};
        dispatch(searchDevGroup(_data));
        getDevGroupData(dispatch,_data);
    }
    resetDevSearch(e){
        e.preventDefault();
        const {dispatch}=this.props;
        dispatch(searchDevGroup({"query":{"name":"","role":""}}));
        validateField("searchDevGroup","name","");
        //var _data=this.props.devGroupList.search;
       // getDevGroupData(dispatch,_data);
    }
    render() {
        const {devGroupList,dispatch,validator}=this.props;
        return (
            <form method="get" id="devgForm">
                <div className="searBox">
                    <div className="col-xs-5 col-xs-offset-1">
                        <div className="resgrid">
                            <label >设备组名:</label>
                            <div className="inpt">
                                <ValidateItem validator={validator} thisForm="searchDevGroup" field="name">
                                    <input type="text" onChange={(e)=>{dispatch(editSearchDevGroup({"name":e.target.value}));validateField("searchDevGroup","name",e.target.value);}} className="form-control" name="name" value={devGroupList.search?devGroupList.search.query.name:""}  />
                                </ValidateItem>
                            </div>
                            </div>
                        </div>
                        <div className="col-xs-5">
                            <div className="resgrid">
                                <label >设备组角色:</label>
                                <div className="inpt resChosen">
                                    {/*<select onChange={(e)=>dispatch(editSearchDevGroup({"role":e.target.value}))} value={devGroupList.search?devGroupList.search.query.role:""} className="form-control" name="role">
                                        <option value="">请选择</option>
                                        <option value="1">源站设备</option>
                                        <option value="2">中转设备</option>
                                        <option value="3">边缘设备</option>

                                    </select>*/}
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择"
                                        optionFilterProp="children"
                                        onChange={(val)=>dispatch(editSearchDevGroup({"role":val}))}
                                        notFoundContent="无搜索结果！"
                                        value={devGroupList.search?devGroupList.search.query.role:""}
                                        >
                                        {roleOption}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-10 col-xs-offset-1 text-center">
                            <button onClick={(e)=>this.subDevSearch(e)} type="submit" className="btn btn-submit">查询</button>
                            <button onClick={(e)=>this.resetDevSearch(e)} type="reset" className="btn btn-reset mleft">重置</button>
                        </div>
                    </div>
                </form>
        )
    }
}
function sel(state) {
    //console.log(state.devicesList.search);
    return {devGroupList:state.devGroupList,validator:state.validator_1}

}
export default connect(sel)(SearchDeviceGroup)