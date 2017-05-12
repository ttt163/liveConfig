import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import {ShowDiag,addOperation} from  "../public/js/f.js"
import {addClmsChannel,showClmsTask} from "../actions/clmsActions.js"
import { URL } from '../config.js';
import {getClmsChannel} from "../containers/Clms.js"
import {validateField,validateAllFields} from "../public/js/validate/validateRform.js"

class ClmsEdit extends Component {
    editClmsChannel(name,value){
        this.props.dispatch(addClmsChannel({[name]:value}));
        validateField("addChannel",name,value);
    }
    submitChannel(e){
        e.preventDefault();
        const {clmsChannel,dispatch,search}=this.props;
        if(!validateAllFields("addChannel")){
            //console.log("gggg");
            return;
        }
        var subData=Object.assign({},clmsChannel);
        if(subData.type){
            delete subData.type;
        }
        $.ajax({
            url:`${URL}/CheckChannel`,
            type:'post',
            data:JSON.stringify({"channel_name":clmsChannel.channel_name}),
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
                       /* new ShowDiag({
                            msg:'修改失败！',
                            closetime: 1
                        });*/
                        $.ajax({
                            url: `${URL}/SendChannelConfig`,
                            type: 'post',
                            data: JSON.stringify(subData),
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
                                if (data.info.status == "success") {
                                    //dispatch(addClmsChannel({"_id":data.info._id}))
                                    new ShowDiag({
                                        msg: '修改成功！',
                                        closetime: 1
                                    });
                                    $("#f-editclms-modal").modal('hide');
                                    addOperation(`修改${clmsChannel.channel_name}的客户名`);
                                    //更新列表
                                    var rsData = getClmsChannel(search);
                                    //  console.log(rsData);
                                    dispatch(showClmsTask(rsData.data));
                                    //dispatch(searchClmsTask({...data, "count": rsData.count}));
                                } else {
                                    //alert('添加失败');
                                    new ShowDiag({
                                        msg: !data.info.warning ? '修改失败！' : data.info.warning,
                                        closetime: 2
                                    });
                                }
                            }
                        });
                        return;
                    }
                    Modal.confirm({
                        msg: `原客户名还关联了${_data}，是否同步${_data}的客户名？`,
                        title: "提示",
                        btnok: "是",
                        btncl: "否"
                    }).on(function(e) {
                        if (e) {
                           // console.log("222");
                           // console.log(subData);

                            $.ajax({
                                url: `${URL}/SendChannelConfig`,
                                type: 'post',
                                data: JSON.stringify(subData),
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
                                    if (data.info.status == "success") {
                                        //dispatch(addClmsChannel({"_id":data.info._id}))
                                        new ShowDiag({
                                            msg: '修改成功！',
                                            closetime: 1
                                        });
                                        $("#f-editclms-modal").modal('hide');
                                        addOperation(`修改${clmsChannel.channel_name}和${_data}的客户名`);
                                        //更新列表
                                        var rsData = getClmsChannel(search);
                                        //  console.log(rsData);
                                        dispatch(showClmsTask(rsData.data));
                                        //dispatch(searchClmsTask({...data, "count": rsData.count}));
                                    } else {
                                        //alert('添加失败');
                                        new ShowDiag({
                                            msg: !data.info.warning ? '修改失败！' : data.info.warning,
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
        })
    }
    render() {
        const {validator,clmsChannel}=this.props;
        return (
            <div className="modal fade f-modal resChosen" id='f-editclms-modal' data-id="0">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 编辑频道</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal">
                                <div className="form-group">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 客户名称：</label>
                                    <div className="col-xs-8">
                                        <ValidateItem validator={validator} thisForm="addChannel" field="client_name">
                                            <input className="form-control" value={clmsChannel.client_name} onBlur={(e)=>validateField("addChannel","client_name",e.target.value)} onChange={(e)=>this.editClmsChannel("client_name",e.target.value)} type="text"  />
                                        </ValidateItem>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 频道：</label>
                                    <div className="col-xs-8">
                                            <input className="form-control" disabled value={clmsChannel.channel_name} onChange={(e)=>this.editClmsChannel("channel_name",e.target.value)} type="text"   />
                                    </div>
                                </div>

                                <div className="form-group text-center">
                                    <button type='submit' onClick={(e)=>this.submitChannel(e)} className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span>确认</button>
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
    return {"clmsChannel": state.clmsChannel,"search":state.clmsTaskList.search,"list":state.clmsTaskList.list,"validator":state.validator_1}
}
export default connect(sel)(ClmsEdit)