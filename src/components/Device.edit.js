
import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { addIsp,delIsp,editDev,editIps,showDeviceList} from '../actions/actions'
import AddIsp from "./Device.add.isp.js"
import {ShowDiag,addOperation} from  "../public/js/f.js"
import { URL } from '../config.js';
import { Select } from 'antd';
const Option = Select.Option;
import {validateField,getFields,validateAllFields,getForm,validateArrField} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import {delField,delArrField} from "../public/js/validate/action.js"

class DeviceEdit extends Component {
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
        validateField("editDevice",name,e.target.value);
    }
    editSelectDevData(value,name){
        //var name=e.target.name.substring(e.target.name.lastIndexOf("dev-")+4), data={[name]:e.target.value};

        const {dev,dispatch}=this.props;
        //console.log(dev);
        if(name=="ifuse"&&value!="1"){
            $.ajax({
                url:`${URL}/GetDevGroupByDev`,
                type:'post',
                data:JSON.stringify({"_id":dev._id}),
                async: true,  //默认为true 异步
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
                        //alert('添加成功！');
                        if(data.info.data){
                            var s="";
                            for(var i=0;i<data.info.data.length;i++){
                                s+=data.info.data[i].name+",";
                            }
                            s=s.substring(0, s.lastIndexOf(","));
                            //console.log(s);
                            new ShowDiag({
                                msg: !s?'修改失败！':"请先删除设备组"+s,
                                closetime: 2
                            });
                            return;
                        }
                        var data={[name]:value};
                        //console.log(data);
                        dispatch(editDev(data));
                        validateField("editDevice",name,value);
                    }else{
                        //alert('添加失败');
                        new ShowDiag({
                            msg: !data.info.warning?'修改失败！':data.info.warning,
                            closetime: 2
                        });
                    }
                }
            })
        }else{
            var data={[name]:value};
            //console.log(data);
            this.props.dispatch(editDev(data));
            validateField("editDevice",name,value);
        }

    }
    editSelectIsp(val,name,index){
        this.props.dispatch(editIps({[name]:val},index));
        validateArrField("editDevice",name,val,index);
    }
    editIpsData(index,e){
        var name=e.target.name.substring(e.target.name.lastIndexOf("dev-")+4,e.target.name.lastIndexOf("-")), data={[name]:e.target.value};
        this.props.dispatch(editIps(data,index));
        validateArrField("editDevice",name,e.target.value,index);
        //console.log(this)
    }
    submitDev(e){
        e.preventDefault();
        const {dev,search,dispatch,getDevData}=this.props;
        var _data=dev;
       // console.log(validateAllFields("editDevice"));
        if(!validateAllFields("editDevice")){
            //console.log("gggg");
            return;
        }
        $.ajax({
           // url:'http://192.168.100.161:9010/SendDevConfig',
            url:`${URL}/SendDevConfig`,
            type:'post',
            data:JSON.stringify(_data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);

                new ShowDiag({
                    msg: !data.info.warning?'修改失败！':data.info.warning,
                    closetime: 2
                });
            },
            success:function(data){
                //console.log(data);
                if(data.info.status=="success"){
                    //alert('添加成功！');
                    new ShowDiag({
                        msg: '修改成功！',
                        closetime: 2
                    });
                    var $editModel = $('#f-editDevice-modal'); //添加模态框
                    $editModel.modal('hide');
                    getDevData(search);
                    addOperation(`修改设备${_data.name}`);
                }else{
                    //alert('添加失败');
                    new ShowDiag({
                        msg: !data.info.warning?'修改失败！':data.info.warning,
                        closetime: 1
                    });
                }
            }
        })
    }
    render() {
        const { dev,dispatch,validator} = this.props
        return (
            <div className="modal fade f-modal resChosen" id='f-editDevice-modal'  data-id="1">
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 修改设备</h4>
                        </div>
                        <div className="f-modal-body d_show">
                            <form className="form-horizontal f-form-horizontal" id="d_edit">
                                <div className="form-group">
                                    <label  className="col-xs-2 control-label"><span className='red'>*</span> 设备名：</label>
                                    <div className="col-xs-9">
                                        {/*
                                        <input value={dev.name}  onChange={this.editDevData.bind(this)} type="text" className="form-control deviceName" name="dev-name" />
                                   */}
                                        <ValidateItem validator={validator} thisForm="editDevice" field="name">
                                            <input value={dev.name} disabled onBlur={(e)=>validateField("editDevice","name",e.target.value)}  onChange={this.editDevData.bind(this)} type="text" className="form-control deviceName" name="dev-name" />

                                        </ValidateItem>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-2 control-label"><span className='red'>*</span> 设备角色：</label>
                                    <div className="col-xs-9">
                                        <ValidateItem validator={validator} thisForm="editDevice" field="role">
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="请选择"
                                                optionFilterProp="children"
                                                onChange={(val)=>this.editSelectDevData(val,"role")}
                                                notFoundContent="无搜索结果！"
                                                value={dev.role}
                                                disabled={!dev.belongTo||(!dev.belongTo.clms.arr1&&!dev.belongTo.nginx.arr1)||(!dev.belongTo.clms.arr1.length&&!dev.belongTo.nginx.arr1.length)?false:true}
                                                >
                                                {this.props.roleOption}
                                            </Select>
                                        </ValidateItem>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-2 control-label"><span className='red'>*</span> 省份：</label>
                                    <div className="col-xs-9">
                                        <ValidateItem validator={validator} thisForm="editDevice" field="addr">
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
                                                        delIspFn={()=>dispatch(delIsp(index))}
                                                        editIpsDataFn={this.editIpsData.bind(this,index)}
                                                        editSelectIspFn={(val,name)=>this.editSelectIsp(val,name,index)}
                                                        ispOption={this.props.ispOption}
                                                        thisForm="editDevice"
                                                        />
                                                )
                                                :<tr><td>"暂无数据！"</td></tr>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-2 control-label"><span className='red'>*</span> 设备状态：</label>
                                    <div className="col-xs-9">
                                        <ValidateItem validator={validator} thisForm="editDevice" field="ifuse">
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

                                    </div>
                                </div>
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
export default connect(sel)(DeviceEdit)