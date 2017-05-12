import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import ValidateItem from "./Validate.item.js"
import {addClmsChannel} from "../actions/clmsActions.js"
import {validateField,getFields,validateAllFields,getForm,validateArrField} from "../public/js/validate/validateRform.js"
import { URL } from '../config.js';
import {ShowDiag,addOperation} from  "../public/js/f.js"
class ClmsAdd extends Component {
    editClmsChannel(name,value){
        this.props.dispatch(addClmsChannel({[name]:value}));
        validateField("addChannel",name,value);
    }
    submitChannel(e){
        e.preventDefault();
        const {clmsChannel,dispatch}=this.props;
        var _thisCont=this.context;
        if(!validateAllFields("addChannel")){
            //console.log("gggg");
            return;
        }
        $.ajax({
            url:`${URL}/SendChannelConfig`,
            type:'post',
            data:JSON.stringify({...clmsChannel,"type":"clms"}),
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
                    dispatch(addClmsChannel({"_id":data.info._id}));
                    $("#f-clms-modal").modal("hide");
                    var  path = `/clms/clmsConfig`;
                    addOperation(`新增clms频道${clmsChannel.channel_name}`);
                    // this.props.history.push (null, path);
                    _thisCont.router.push(path);
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
            <div className="modal fade f-modal resChosen" id='f-clms-modal' data-id="0">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 新增频道</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal">
                                <div className="form-group">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 客户名称：</label>
                                    <div className="col-xs-8">
                                        <ValidateItem validator={validator} thisForm="addChannel" field="client_name">
                                            <input className="form-control" value={clmsChannel.client_name} onBlur={(e)=>validateField("addChannel","client_name",e.target.value)} onChange={(e)=>this.editClmsChannel("client_name",e.target.value)} type="text" />
                                        </ValidateItem>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label  className="col-xs-3 control-label"><span className='red'>*</span> 频道：</label>
                                    <div className="col-xs-8">
                                        <ValidateItem validator={validator} thisForm="addChannel" field="channel_name">
                                            <input className="form-control" value={clmsChannel.channel_name} onBlur={(e)=>validateField("addChannel","channel_name",e.target.value)} onChange={(e)=>this.editClmsChannel("channel_name",e.target.value)}  type="text"  />
                                        </ValidateItem>
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
    return {"clmsChannel": state.clmsChannel,"validator":state.validator_1}
}
export default connect(sel)(ClmsAdd)
ClmsAdd.contextTypes={
    router: PropTypes.object
}