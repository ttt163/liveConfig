import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL } from '../config.js';
import {ShowDiag,addOperation} from  "../public/js/f.js"
import ValidateItem from "./Validate.item.js"
import {addClmsChannel} from "../actions/clmsActions.js"
import {validateField,validateAllFields} from "../public/js/validate/validateRform.js"
class ClmsCopy extends Component {
    conformCopy(){
        const {dispatch,clmsChannel}=this.props;
        if(!validateAllFields("addChannel")){
            //console.log("gggg");
            return;
        }
        const path = `/clms/clmsConfig/${clmsChannel.config_id}/copy`;
        var _thisCont=this.context;
        $.ajax({
            url:`${URL}/SendChannelConfig`,
            type:'post',
            data:JSON.stringify({"channel_name":clmsChannel.copy_channel_name,"client_name":clmsChannel.copy_client_name,"type":"clms"}),
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
                    $("#f-clmsCopy-modal").modal("hide");
                    addOperation(`拷贝${clmsChannel.channel_name}clms频道配置`);
                    // this.props.history.push (null, path);
                    _thisCont.router.push(path);

                }else{
                    //alert('添加失败');
                    new ShowDiag({
                        msg: !data.info.warning?'拷贝失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        })

        //$("#f-clmsCopy-modal").modal("hide");
        // this.props.history.push (null, path);
        //this.context.router.push(path);
        //console.log(clmsChannel);
    }
    editClmsChannel(name,value){
        this.props.dispatch(addClmsChannel({[name]:value}));
        validateField("addChannel",name,value);
    }
    render() {
        const {validator,clmsChannel}=this.props;
        return (
            <div className="modal fade f-modal resChosen" id='f-clmsCopy-modal' data-id="0">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span>拷贝频道配置</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal">
                                <div className="form-group">
                                    <div className="col-xs-offset-1 col-xs-10">
                                        <table className="table f-table">
                                            <thead>
                                            <tr>
                                                <th style={{width:'50%'}}>频道</th>
                                                <th style={{width:'50%'}}>客户名称</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <ValidateItem validator={validator} thisForm="addChannel" field="copy_channel_name">
                                                        <input value={clmsChannel.copy_channel_name} onBlur={(e)=>validateField("addChannel","copy_channel_name",e.target.value)} onChange={(e)=>this.editClmsChannel("copy_channel_name",e.target.value)} className="form-control" />
                                                    </ValidateItem>
                                                </td>
                                                <td style={{textAlign:"left"}}>
                                                    <ValidateItem validator={validator} thisForm="addChannel" field="copy_client_name">
                                                        <input value={clmsChannel.copy_client_name} onBlur={(e)=>validateField("addChannel","copy_client_name",e.target.value)} onChange={(e)=>this.editClmsChannel("copy_client_name",e.target.value)}  className="form-control" />
                                                    </ValidateItem>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <div className="error"></div>
                                    <button type='button' onClick={()=>this.conformCopy()} className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span
                                        className='fbtn-miss-svg'></span> 取消
                                    </button>
                                </div>
                                <input type="hidden" name="data" />
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
   // console.log(state);
    return {"clmsChannel": state.clmsChannel,"validator":state.validator_1}
}
export default connect(sel)(ClmsCopy)
ClmsCopy.contextTypes={
    router: PropTypes.object
}
