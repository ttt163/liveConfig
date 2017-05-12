/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { addIsp,delIsp,editDev,editIps,showDeviceList} from '../actions/actions'
import AddIsp from "./Device.add.isp.js"
import {ShowDiag,addOperation} from  "../public/js/f.js"
import { URL } from '../config.js';
import {validateField,getFields,validateAllFields,getForm,validateArrField} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import {delField,delArrField} from "../public/js/validate/action.js"
import { Select } from 'antd';
const Option = Select.Option;
//import {selectie,validateChosen,getIpStr1,addIpInfo11,formCheck,getNextTr,getIpStr,equalName,alertMsg,ShowDiag} from  "../public/js/f.js"
//import { Link,IndexLink,browserHistory } from 'react-router'
// ;

class DeviceAdd extends Component {
    componentDidMount() {
        //console.log("qingkong");
        //this.props.dispatch(clearValidate());
    }

    addIsp(){
        var data={
            "ip": "",
            "isp": ""
        };
        this.props.dispatch(addIsp(data))
    }
    editDevData(e){
        var name=e.target.name.substring(e.target.name.lastIndexOf("dev-")+4), data={[name]:e.target.value};
        //console.log(data);
        this.props.dispatch(editDev(data));
        validateField("addDevice",name,e.target.value);
    }
    editSelectDevData(value,name){
        //var name=e.target.name.substring(e.target.name.lastIndexOf("dev-")+4), data={[name]:e.target.value};
        //console.log(data);
        var data={[name]:value};
        //console.log(data);
        this.props.dispatch(editDev(data));
        validateField("addDevice",name,value);
    }
    /*handleChange(value,name) {
        console.log(`selected ${name}`);
    }*/
    editIpsData(index,e){
       var name=e.target.name.substring(e.target.name.lastIndexOf("dev-")+4,e.target.name.lastIndexOf("-")), data={[name]:e.target.value};
        this.props.dispatch(editIps(data,index));
        //console.log(name+index)
        //validateField("addDevice",name+index,e.target.value);
        validateArrField("addDevice",name,e.target.value,index);
    }
    editSelectIsp(val,name,index){
        this.props.dispatch(editIps({[name]:val},index));
        validateArrField("addDevice",name,val,index);
    }
    submitDev(e){
        e.preventDefault();
        const {dev,search,dispatch,getDevData}=this.props;
        var _data=dev;
       // validateAllFields();
        if(!validateAllFields("addDevice")){
            //console.log("gggg");
            return;
        }
        //console.log("通过");
        //return;
        $.ajax({
            //url:'http://192.168.100.161:9010/SendDevConfig',
            url:`${URL}/SendDevConfig`,
            type:'post',
            data:JSON.stringify(_data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                //console.log(error.responseText.info);
                //alert('error');responseText
                //alertMsg("添加失败",2,false);
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'添加失败！':data.info.warning,
                    closetime: 1
                });
            },
            success:function(data){
                //console.log(data);
                if(data.info.status=="success"){
                    //alert('添加成功！');
                    var $addModel = $('#f-addDevice-modal'); //添加模态框
                    $addModel.modal('hide');
                    getDevData(search);
                    addOperation(`添加设备${_data.name}`);
                    /*$.ajax({
                        url:'http://192.168.100.161:9010/GetDevConfig',
                        type:'post',
                        data:JSON.stringify(search),
                        async: true,  //默认为true 异步
                        dataType: "json",
                        error:function(){
                            alert('error');
                        },
                        success:function(data){
                            console.log(data.info);
                            dispatch(showDeviceList(data.info.data));
                        }
                    });*/
                    new ShowDiag({
                        msg: '添加成功！',
                        closetime: 2
                    });
                }else{
                    //alert('添加失败');
                   // console.log(data.info.warning);
                    new ShowDiag({
                        msg: !data.info.warning?'添加失败！':data.info.warning,
                        closetime: 1
                    });
                }
            }
        })
    }

    /////
    /*getFields(name, opt,dispatch) {
        console.log(999);
        var data={
            [name]:opt
        }
        dispatch(addField(data));
    }*/
    render() {
        //console.log(this.props);
        const { dev,dispatch,validator} = this.props;
        return (
            <div className="modal fade f-modal resChosen" id='f-addDevice-modal' data-id="0">
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 新增设备</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="device_add">
                                <input type="hidden" name="_token" value="" />
                                    <div className="form-group">
                                        <label  className="col-xs-2 control-label"><span className='red'>*</span> 设备名：</label>
                                        <div className="col-xs-9">
                                            <ValidateItem validator={validator} thisForm="addDevice" field="name">
                                                <input  value={dev.name} onBlur={(e)=>validateField("addDevice","name",e.target.value)}  onChange={this.editDevData.bind(this)} type="text" className="form-control deviceName" name="dev-name"/>
                                            </ValidateItem>
                                            {/* <div className={!validator["addDevice"]||!validator["addDevice"].valideMsg||!validator["addDevice"].valideMsg["name"]||validator["addDevice"].valideMsg["name"].isValider?"":"has-error"}>
                                            <input  value={dev.name}  onChange={this.editDevData.bind(this)} type="text" className="form-control deviceName" name="dev-name"/>

                                                <div>{!validator["addDevice"]||!validator["addDevice"].valideMsg||!validator["addDevice"].valideMsg["name"]||validator["addDevice"].valideMsg["name"].isValider?"":validator["addDevice"].valideMsg["name"].error}</div>

                                            </div>*/}

                                            </div>
                                        </div>
                                <div className="form-group">
                                    <label  className="col-xs-2 control-label"><span className='red'>*</span> 设备角色：</label>
                                    <div className="col-xs-9">
                                        <ValidateItem validator={validator} thisForm="addDevice" field="role">
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="请选择"
                                                optionFilterProp="children"
                                                onChange={(val)=>this.editSelectDevData(val,"role")}
                                                notFoundContent="无搜索结果！"
                                                value={dev.role}
                                                >
                                                {this.props.roleOption}
                                                <Option value="4">代理设备</Option>
                                            </Select>
                                        </ValidateItem>
                                        {/* <div className={!validator["addDevice"]||!validator["addDevice"].valideMsg||!validator["addDevice"].valideMsg["role"]||validator["addDevice"].valideMsg["role"].isValider?"":"has-error"}>

                                            <div>{!validator["addDevice"]||!validator["addDevice"].valideMsg||!validator["addDevice"].valideMsg["role"]||validator["addDevice"].valideMsg["role"].isValider?"":validator["addDevice"].valideMsg["role"].error}</div>

                                        </div>*/}

                                        { /* <select name="dev-role" autoComplete="off"  value={dev.role} onChange={this.editDevData.bind(this)}  className="form-control">
                                            <option value="">请选择</option>
                                            <option value="1">源站设备</option>
                                            <option value="2">中转设备</option>
                                            <option value="3">边缘设备</option>
                                        </select>*/}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-2 control-label"><span className='red'>*</span> 省份：</label>
                                    <div className="col-xs-9">
                                        <ValidateItem validator={validator} thisForm="addDevice" field="addr">
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="请选择"
                                                optionFilterProp="children"
                                                onChange={(val)=>this.editSelectDevData(val,"addr")}
                                                notFoundContent="无搜索结果！"
                                                value={dev.addr}
                                                >
                                                {this.props.proviceOption}
                                            </Select>
                                        </ValidateItem>
                                        {/* <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            onChange={(val)=>this.editSelectDevData(val,"addr")}
                                            notFoundContent="无搜索结果！"
                                            value={dev.addr}
                                            >
                                            {this.props.proviceOption}
                                        </Select>*/}
                                        {/* <select name="dev-addr" value={dev.addr} onChange={this.editDevData.bind(this)}  className="form-control" >
                                             <option value="">请选择</option>
                                            <option value="北京">北京</option>
                                            <option value="杭州">杭州</option>
                                            <option value="广州">广州</option>
                                             <option value="BJ">北京</option>
                                             <option value="HB">河北</option>
                                             <option value="TJ">天津</option>
                                             <option value="LN">辽宁</option>
                                             <option value="HL">黑龙江</option>
                                             <option value="JL">吉林</option>
                                        </select>*/}
                                    </div>
                                </div>
                                        <div className="form-group">
                                            <label  className="col-xs-2 control-label"><span className='red'>*</span> IP信息：</label>
                                            <div className="col-xs-9 ">
                                                <table className="table f-table">
                                                    <thead>
                                                    <tr>
                                                        <th style={{width:'50%'}}>IP地址</th>
                                                        <th style={{width:'50%'}} >运营商</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {dev.ips?
                                                        dev.ips.map((item, index) =><AddIsp
                                                                validator={validator}
                                                                index={index} {...item} key={index}
                                                                addIspFn={this.addIsp.bind(this)}
                                                                delIspFn={()=>{dispatch(delArrField("addDevice",[{"field":"ip","index":index},{"field":"isp","index":index}]));dispatch(delIsp(index));}}
                                                                editIpsDataFn={this.editIpsData.bind(this,index)}
                                                                editSelectIspFn={(val,name)=>this.editSelectIsp(val,name,index)}
                                                                ispOption={this.props.ispOption}
                                                                thisForm="addDevice"
                                                                />
                                                        )
                                                        :<tr><td>"暂无数据！"</td></tr>
                                                    }
                                                    {/*<tr>
                                                        <td className="form-res">
                                                            <div className="f-resValidate">
                                                                <input type="text"  className="form-control devip-item" name="devip[ip][]" data-rule-required="true" data-rule-ip="true" data-msg-required="请填写IP地址" data-msg-ip="IP地址格式错误" />
                                                                </div>
                                                            </td>
                                                            <td className="form-res">
                                                                <div className="posRelative f-resValidate">
                                                                    <select name="devip[isp][]" className="f-isp" data-rule-required="true"  data-msg-required="请选择运营商">
                                                                        <option value=''>请选择</option>
                                                                        <option value='1'>中国移动</option>
                                                                        <option value='2'>中国联通</option>
                                                                        <option value='3'>中国电信</option>
                                                                    </select>
                                                                    <label className="control-label textLeft f-cnladd posAbs"></label>
                                                                </div>
                                                            </td>
                                                        </tr>*/}
                                                    </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label  className="col-xs-2 control-label"><span className='red'>*</span> 设备状态：</label>
                                                <div className="col-xs-9">
                                                    <ValidateItem validator={validator} thisForm="addDevice" field="ifuse">
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            placeholder="请选择"
                                                            optionFilterProp="children"
                                                            onChange={(val)=>this.editSelectDevData(val,"ifuse")}
                                                            notFoundContent="无搜索结果！"
                                                            value={dev.ifuse}
                                                            >
                                                            {this.props.ifuseOption}
                                                        </Select>
                                                    </ValidateItem>

                                                    {/* <select name="dev-ifuse" value={dev.ifuse} className="form-control"   onChange={this.editDevData.bind(this)}>
                                                        <option  value="">请选择</option>
                                                        <option value="1">可用</option>
                                                        <option value="2">禁用</option>
                                                        <option value="3">报修</option>
                                                    </select>*/}
                                                </div>
                                            </div>
                                {/* <div className="form-group">
                                                <label  className="col-xs-2 control-label"><span className='red'>*</span> 机房信息：</label>
                                                <div className="col-xs-9">
                                                    <input type="text" className="form-control" name="dev[idc]" />
                                                    </div>
                                                </div>*/}
                                                <div className="form-group text-center">
                                                    <div className="error"></div>
                                                    <button type='submit' onClick={this.submitDev.bind(this)} className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span className='fbtn-miss-svg'></span> 取消</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="f-modal-footer">
                                        </div>
                                    </div>
                                </div>
                            </div>
        )
    }
}
function sel(state) {
    //console.log(state);
    //console.log(state.todos1);
    return {dev:state.devices,search:state.devicesList.search,"validator":state.validator_1}

}
export default connect(sel)(DeviceAdd)