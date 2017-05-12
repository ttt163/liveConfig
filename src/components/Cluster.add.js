import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
//import { Tooltip } from 'antd';
import AddLevel from "./Cluster.add.level.js"
import { URL } from '../config.js';
import {ShowDiag,addOperation} from  "../public/js/f.js"
import {addCluster,addLevel,delLevel,showCluster} from "../actions/clusterActions.js"
import {getClusterDatas} from "../containers/Cluster.js"
import ValidateItem from "./Validate.item.js"
import {validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import {delField} from "../public/js/validate/action.js"
class AddCluster extends Component {
    //修改层级数
    editLevelAmount(e) {
        const {dispatch,cluster}=this.props;
        var val = !e.target.value ? 0 : parseInt(e.target.value), amount = parseInt(cluster.levels_amount);
       // console.log(val);

        //validateField("cluster","levels_amount",e.target.value);
       // console.log(val);
        var rg=/^[2-9]+$|^([1-9][0-9])*$/;
        if (!rg.test(val)) {
            new ShowDiag({
                msg: '层级数最小为2！',
                closetime: 1
            });
            return;
        }
        if (val > amount) {
            //添加
            var data = [], len = val - amount;
            for (var i = 0; i < len; i++) {
                var item = {
                    "level": "",
                    "devs_group_id": "",
                    "devs_group_name": "",
                    "topology_id": "",
                    "topology_name": ""
                }
                data.push(item);
            }
            dispatch(addLevel(data, 0));

        } else {
            //删除
            var len = amount - val;
            dispatch(delLevel(0, len));
        }
        dispatch(addCluster({"levels_amount": val.toString()}));
        //删除校验
        dispatch(delField("cluster","devs_group"));
        dispatch(delField("cluster","topology"));
    }

    //提交
    submitCluster(e) {
        e.preventDefault();
        const {cluster,dispatch,clusterList}=this.props;
       // console.log(this.props);
        if(!validateAllFields("cluster")){
            //console.log("gggg");
            return;
        }
        var _data = cluster;
        for (var i = 0; i < _data.level_devs_group.length; i++) {
            delete(_data.level_devs_group[i].topoArr)
        }
        //console.log(_data);
        $.ajax({
            url: `${URL}/SendClusterConfig`,
            type: 'post',
            data: JSON.stringify(_data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'添加失败！':data.info.warning,
                    closetime: 2
                });
            },
            success: function (data) {
                //console.log(data);
                if (data.info.status == "success") {
                    $("#f-addCluster-modal").modal('hide');
                    new ShowDiag({
                        msg: '添加成功！',
                        closetime: 2
                    });
                    //更新列表数据
                    var upData=clusterList.search;
                    //console.log(upData);
                    var list=getClusterDatas({...upData,"all_row":"1"});
                    dispatch(showCluster({"list":list.data,"search":{...upData,"count":list.count}}));
                    addOperation(`添加集群${_data.name}`);
                } else {
                    //alert('添加失败');
                    new ShowDiag({
                        msg: !data.info.warning?'添加失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        })
    }

    render() {
        const {cluster,dispatch,validator,levels}=this.props;
        //console.log(validator);
        return (
            <div className="modal fade f-modal" id='f-addCluster-modal'>
                <div className="modal-dialog" style={{minWidth:'1000px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 新增集群</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="d_add">
                                <div className="form-group">
                                    <label className="col-xs-2 control-label"><span className='red'>*</span>
                                        集群名：</label>

                                    <div className="col-xs-9">
                                        <ValidateItem validator={validator} thisForm="cluster" field="name">
                                            <input type="text" value={cluster.name}
                                                   onChange={(e)=>{dispatch(addCluster({"name":e.target.value}));validateField("cluster","name",e.target.value);}}
                                                   className="form-control clusterName"/>
                                        </ValidateItem>

                                    </div>
                                </div>
                                {/*<div className="form-group">
                                 <label  className="col-xs-2 control-label"><span className='red'>*</span> 集群功能：</label>
                                 <div className="col-xs-9 resChosen">
                                 <select name="affect" className="f-deviceType">
                                 <option value="">请选择</option>

                                 </select>
                                 </div>
                                 </div>*/}
                                <div className="form-group">
                                    <label className="col-xs-2 control-label"><span className='red'>*</span>
                                        层级数：</label>

                                    <div className="col-xs-9">
                                        <ValidateItem validator={validator} thisForm="cluster" field="levels_amount">
                                            <input className="form-control" value={cluster.levels_amount}
                                                   onChange={(e)=>this.editLevelAmount(e)} defaultValue="2"/>
                                        </ValidateItem>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-offset-1 col-xs-10">
                                        <table className="table f-table">
                                            <thead>
                                            <tr>
                                                <th rowSpan="2" style={{width:'15%'}}>层级</th>
                                                <th colSpan="2" style={{width:'70%'}}>设备组配置</th>
                                                <th rowSpan="2" style={{width:'15%'}}>操作</th>
                                            </tr>
                                            <tr>
                                                <th style={{width:'30%'}}>设备组</th>
                                                <th style={{width:'30%'}}>拓扑</th>
                                            </tr>
                                            </thead>

                                            { /*<tr>
                                             <td className="f-leveln">
                                             <span className="f-numerator">2</span>/<span
                                             className="f-denominator">2</span>
                                             </td>
                                             <td>
                                             <div className="">
                                             <select className="form-control">
                                             <option>请选择</option>
                                             <option>设备组a</option>
                                             </select>
                                             </div>
                                             </td>
                                             <td>
                                             <div className="">
                                             <select className="form-control">
                                             <option value="0">无</option>
                                             <option>拓扑1</option>
                                             </select>
                                             </div>
                                             </td>
                                             <td className="text-left f-operLevel">
                                             <Tooltip placement="top" title="添加上层">
                                             <i className="upLevel"></i>
                                             </Tooltip>
                                             <Tooltip placement="top" title="添加下层">
                                             <i className="downLevel"></i>
                                             </Tooltip>
                                             <Tooltip placement="top" title="删除">
                                             <i className="iconfont level-icon">&#xe606;</i>
                                             </Tooltip>
                                             <Tooltip placement="top" title="清空">
                                             <i className="iconfont level-icon">&#xe603;</i>
                                             </Tooltip>
                                             </td>
                                             </tr>*/}
                                            {/*添加层级 <AddLevel thisForm="cluster" />*/}
                                            <tbody>
                                            {
                                                !levels?"":
                                                    levels.map((item,index)=>(
                                                        <AddLevel key={index} {...item} index={index} thisForm="cluster" />
                                                    ))
                                            }
                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                                <div className="form-group text-center">
                                    <div className="error"></div>
                                    <button type='submit' onClick={(e)=>this.submitCluster(e)}
                                            className="f-btn fbtn-ok ml15"><span
                                        className='fbtn-ok-svg'></span> 确认
                                    </button>
                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span
                                        className='fbtn-miss-svg'></span> 取消
                                    </button>
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
    //console.log(state.validator_1);
    return {cluster: state.cluster,clusterList:state.clusterList,levels:state.cluster.level_devs_group,validator:state.validator_1}
}
export default connect(sel)(AddCluster)