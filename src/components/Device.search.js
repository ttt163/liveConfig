
import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { searchDevice,showDeviceList,editSearchDevice} from '../actions/actions'
import { URL } from '../config.js';
import {getDevData} from "../containers/Device.js";
import { Pagination,Select  } from 'antd';
const Option = Select.Option;
import {getForm,getFields,getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
//import { Link,IndexLink,browserHistory } from 'react-router';


class SearchDevice extends Component {
    componentDidMount() {
        getForm("searchDevice");
        getFormFields("searchDevice", {
            "name": {
                "value": "",
                "rule": {"regexp": /^[\.a-zA-Z0-9-]+$/,"maxLen":200},
                "msg": {"regexp": "设备名只能由字母，数字，“.”，“-”组成！","maxLen":"设备名不能超过200个字符"}
            },
            "ip": {
                "value": "",
                "rule": {"regexp": /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/},
                "msg": {"regexp": "ip格式错误！"}
            }
        });
    }
    editSearch(e){
        var _data={[e.target.name]:e.target.value};
        this.props.dispatch(editSearchDevice(_data));
        validateField("searchDevice",e.target.name,e.target.value);
    }
    editSelectSearch(val,name){
        var _data={[name]:val};
        this.props.dispatch(editSearchDevice(_data));
    }
    subDevSearch(e){
        e.preventDefault();
        const {dispatch}=this.props;
        if(!validateAllFields("searchDevice")){
            return;
        }
        var search=this.props.devicesList.search;
        var _data={...search,"all_row":"1","page":"1"};
       // var _data=this.props.devicesList.search;
        dispatch(searchDevice(_data));
        getDevData(dispatch,_data);

    }
    //重置
    resetSearch(e){
        e.preventDefault();
        var _data={"name":"","ip":"","role":"","type":"","ifuse":"","addr":"","isp":""};
        this.props.dispatch(editSearchDevice(_data));
        validateField("searchDevice","name","");
        validateField("searchDevice","ip","");
    }

    render() {
        const {devicesList,validator}=this.props;
        return (
            <form method="get" id="devForm">
                <div className="searBox">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>设备名:</label>
                                <div className="inpt">
                                    <ValidateItem validator={validator} thisForm="searchDevice" field="name">
                                        <input onChange={this.editSearch.bind(this)} type="text" className="form-control" name="name" value={devicesList.search?devicesList.search.query.name:""} />
                                    </ValidateItem>

                                </div>

                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>IP地址:</label>
                                <div className="inpt">
                                    <ValidateItem validator={validator} thisForm="searchDevice" field="ip">
                                        <input  onChange={(e)=>{this.editSearch(e)}} value={devicesList.search?devicesList.search.query.ip:""} type="text" className="form-control" name="ip" />
                                    </ValidateItem>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>设备角色:</label>
                                <div className="inpt resChosen">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                        onChange={(val)=>this.editSelectSearch(val,"role")}
                                        notFoundContent="无搜索结果！"
                                        value={!devicesList.search||!devicesList.search.query||!devicesList.search.query.role?"":devicesList.search.query.role}
                                        >
                                        <Option value="" >请选择</Option>
                                        {this.props.roleOption}
                                    </Select>
                                    {/* <select name="role" onChange={this.editSearch.bind(this)} value={devicesList.search?devicesList.search.query.role:""} className="form-control">
                                     <option value="">请选择</option>
                                     <option value="1">源站设备</option>
                                     <option value="2">中转设备</option>
                                     <option value="3">边缘设备</option>
                                     </select>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>运营商:</label>
                                <div className="inpt resChosen">
                                    {/* <Select
                                     showSearch
                                     style={{ width: '100%' }}
                                     placeholder="请选择"
                                     optionFilterProp="children"
                                     onChange={(val)=>this.editSelectSearch(val,"type")}
                                     notFoundContent="无搜索结果！"
                                     value={devicesList.search?devicesList.search.query.type:""}
                                     >
                                     {this.props.typeOption}
                                     </Select>*/}
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                        onChange={(val)=>this.editSelectSearch(val,"isp")}
                                        notFoundContent="无搜索结果！"
                                        value={!devicesList.search||!devicesList.search.query||!devicesList.search.query.isp?"":devicesList.search.query.isp}
                                        >
                                        <Option value="" >请选择</Option>
                                        {this.props.ispOption}
                                    </Select>
                                    {/*<select name="type" onChange={this.editSearch.bind(this)} value={devicesList.search?devicesList.search.query.type:""}   className="form-control">
                                     <option value="">请选择</option>
                                     <option value='1'>自有设备</option>
                                     <option value='2'>第三方设备</option>
                                     </select>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>设备状态:</label>
                                <div className="inpt resChosen">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                        onChange={(val)=>this.editSelectSearch(val,"ifuse")}
                                        notFoundContent="无搜索结果！"
                                        value={!devicesList.search||!devicesList.search.query||!devicesList.search.query.ifuse?"":devicesList.search.query.ifuse}
                                        >
                                        <Option value="" >请选择</Option>
                                        {this.props.ifuseOption}
                                    </Select>
                                    {/* <select name="ifuse" onChange={this.editSearch.bind(this)} value={devicesList.search?devicesList.search.query.ifuse:""} className="form-control">
                                     <option value="">请选择</option>
                                     <option value="1">可用</option>
                                     <option value="2">禁用</option>
                                     <option value="3">报修</option>
                                     </select>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>省份:</label>
                                <div className="inpt resChosen">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                        onChange={(val)=>this.editSelectSearch(val,"addr")}
                                        notFoundContent="无搜索结果！"
                                        value={!devicesList.search||!devicesList.search.query||!devicesList.search.query.addr?"":devicesList.search.query.addr}
                                        >
                                        <Option value="" >请选择</Option>
                                        {this.props.proviceOption}
                                    </Select>
                                    { /* <select name="addr" onChange={this.editSearch.bind(this)} value={devicesList.search?devicesList.search.query.addr:""} className="form-control">
                                     <option value="">请选择</option>
                                     <option value="1">北京</option>
                                     <option value="2">杭州</option>
                                     <option value="3">广州</option>
                                     </select>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                            <div className="col-xs-12 text-center">
                                <button type="submit" onClick={this.subDevSearch.bind(this)} className="btn btn-submit">查询</button>
                                <button type="reset" onClick={(e)=>this.resetSearch(e)} className="btn btn-reset mleft" id="devreset">重置</button>
                            </div>
                        </div>
                    </form>
        )
    }
}
function sel(state) {
    //console.log(state.devicesList.search);
    return {devicesList:state.devicesList,validator:state.validator_1}

}
export default connect(sel)(SearchDevice)