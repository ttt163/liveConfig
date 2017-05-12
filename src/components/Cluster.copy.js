
import React, {Component,PropTypes} from 'react'
import {devsOpction} from "./Device.searchList.js"
import { connect } from 'react-redux'
//import { Link,IndexLink,browserHistory } from 'react-router';
import { addDevice} from '../actions/actions'
import { Select } from 'antd';
import {ShowDiag,addOperation} from  "../public/js/f.js";
import {addCluster,editLevel} from "../actions/clusterActions.js"
import {reverseBykey} from "./Cluster.add.level.js"
import { URL} from '../config.js';
const Option = Select.Option;
import ValidateItem from "./Validate.item.js"
import {getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
class ClusterCopy extends Component {
    conformCopy(){
        const {dispatch,cluster}=this.props;
        //console.log(!validateAllFields("clusterCopy"));
        if(!validateAllFields("clusterCopy")){
            //console.log("gggg");
            return;
        }
        $("#f-copy-modal").removeClass("fade");
        $("#f-copy-modal").modal("hide");
        addOperation(`拷贝集群${cluster.name}`);
        //var thisClu=cluster,leves=reverseBykey(thisClu.level_devs_group,"level");
        var thisClu=cluster,leves=thisClu.level_devs_group;
        thisClu.level_devs_group=leves;
        dispatch(addCluster({...thisClu,"name":cluster.copyName,"_id":""}));
        $('#d-editCluster-modal').modal();
        //加验证
        getFormFields("cluster", {
            "name": {
                "value": cluster.copyName,
                "rule": {"required": true,"regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/,"maxLen":200},
                "msg": {"required": "集群名称不能为空！","regexp": "集群名称只能由中文，数字，英文字母，下划线和“-”组成！","maxLen":"集群名称不能超过200个字符"}
            },
            "levels_amount": {
                "value": thisClu.levels_amount,
                "rule": {"required": true,"regexp": /^[2-9]+$|^([1-9][0-9])*$/},
                "msg": {"required": "层级不能为空！","regexp": "层级必须是2以上的整数！"}
            }
        });

        for(var j=0;j<leves.length;j++){
            $.ajax({
                url:`${URL}/GetTopologyConfig`,
                type:'post',
                data:JSON.stringify({"query":{"devs_group_id":leves[j].devs_group_id}}),
                async: false,  //默认为true 异步
                dataType: "json",
                error:function(){
                    console.log("操作失败");
                },
                success:function(data){
                    //console.log(data);
                    if(data.info.status=="success"){
                        var data=data.info.data;
                        var _topoOpc=[];
                        if(!data){
                            return;
                        }
                        for(var i=0;i<data.length;i++){
                            _topoOpc.push(<Option key={data[i]._id+"&devG&"+data[i].name+"&devGTopo&"+data[i].topoRemarks}>{data[i].name}</Option>);

                        }
                        var thiLev=leves[j];
                        //thisData.level_devs_group={...thiLev,"topoArr":_topoOpc};
                        dispatch(editLevel({ "topoArr":_topoOpc},j));
                    }
                }
            })
        }
        /*const {devices,search,getDevData}=this.props;
        var reData={
            "src_dev_id": devices._id,
            "dst_dev_id": devices.reptDev.reptId,
        }
        $.ajax({
            url: `${URL}/ReplaceDevConfig`,
            type: 'post',
            data: JSON.stringify(reData),
            //data: JSON.stringify({"devs_group_id": '58008b3d421aa91b18000009'}),
            async: true,  //默认为true 异步
            dataType: "json",
            error: function () {
                console.log("操作失败");
                new ShowDiag({
                    msg: '替换失败！',
                    closetime: 1
                });
            },
            success: function (data) {
                //console.log(data);
                if (data.info.status == "success") {
                    new ShowDiag({
                        msg: '替换成功！',
                        closetime: 1
                    });
                    getDevData(search);
                }else{
                    new ShowDiag({
                        msg: '替换失败！',
                        closetime: 1
                    });
                }
            }
        });*/
    }
    render() {
        const {cluster,dispatch,validator}=this.props;
        //console.log(this.props);
        return (
            <div className="modal fade f-modal resChosen" id='f-copy-modal'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 拷贝集群</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal">
                                <div className="form-group">
                                    <div className="col-xs-offset-1 col-xs-10">
                                        <table className="table f-table">
                                            <thead>
                                            <tr>
                                                <th style={{width:'50%'}}>当前集群</th>
                                                <th style={{width:'50%'}}>拷贝为</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{cluster.name}</td>
                                                <td style={{textAlign:"left"}}>
                                                    <ValidateItem validator={validator} thisForm="clusterCopy" field="copyName">
                                                        <input type="text" value={!cluster.copyName?"":cluster.copyName} onChange={(e)=>{dispatch(addCluster({"copyName":e.target.value}));validateField("clusterCopy","copyName",e.target.value);}} className="form-control" />
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
    //console.log(state);
    //console.log(state.todos1);
    return {"cluster":state.cluster,"clusterList":state.clusterList,validator:state.validator_1}
}
export default connect(sel)(ClusterCopy)