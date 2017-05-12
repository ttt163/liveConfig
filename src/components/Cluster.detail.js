import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
class ClusterDetail extends Component {
    render() {
        const {cluster}=this.props;
      //  console.log(cluster);
        return (
            <div className="modal fade f-modal resChosen" id='f-detailcluster-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span>集群详情</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="detaildev">
                                <div className="form-group">
                                    <div className="col-xs-10">
                                        <div className="lit-title"><span>基本详情</span></div>
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">集群名：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                {cluster.name}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">层级数：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                {cluster.levels_amount}
                                            </div>
                                        </div>
                                        <div className="form-group" style={{"display":!cluster.level_devs_group?"none":"block"}}>
                                            <div className="col-xs-offset-3 col-xs-9" style={{paddingTop:'7px'}}>
                                                <table className="table f-table">
                                                    <thead>
                                                    <tr>
                                                        <th rowSpan="2" style={{background:'inherit'}}>
                                                            层级
                                                        </th>
                                                        <th colSpan="2">
                                                            设备组配置
                                                        </th>
                                                    </tr>
                                                    <tr >
                                                        <th style={{width:'40%'}}>设备组</th>
                                                        <th style={{width:'40%'}}>拓扑</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {!cluster.level_devs_group?
                                                        <tr className="text-center">
                                                            <td colSpan="1">暂无设备组配置</td>
                                                            </tr>
                                                        :cluster.level_devs_group.map((item,index)=>(
                                                        <tr key={index} className="text-center">
                                                            <td>{item.level+"/"+cluster.levels_amount}</td>
                                                            <td>{item.devs_group_name}</td>
                                                            <td> {item.topology_name}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="lit-title" style={{marginBottom:'20px'}}><span>服务现状</span></div>
                                        {!cluster || !cluster.belongTo ? "" :
                                            <div className="form-group">
                                                <div className="col-xs-12">
                                                    <table className="table f-table one-td f-resStyle">
                                                        <thead>
                                                        <tr>
                                                            <th style={{width:'40%'}}>
                                                                应用
                                                            </th>
                                                            <th style={{width:'60%'}}>
                                                                服务频道
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td className="text-center">clms</td>
                                                            <td  className="text-center"
                                                                style={{"padding": "0px"}}>
                                                                {!cluster.belongTo.clms.arr1 || !cluster.belongTo.clms.arr1.length ? "" :
                                                                    <table className="table in-table">
                                                                        <tbody>
                                                                        {cluster.belongTo.clms.arr1.map((item1, index1)=>
                                                                                <tr key={index1}>
                                                                                    <td className="text-center"
                                                                                        style={{"borderBottom":cluster.belongTo.clms.arr1.length-1!=index1?"1px solid #ddd":"0px"}}>{item1.name}</td>
                                                                                </tr>
                                                                        )}
                                                                        </tbody>
                                                                    </table>

                                                                }


                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center">nginx</td>
                                                            <td  className="text-center"
                                                                 style={{"padding": "0px"}}>
                                                                {!cluster.belongTo.nginx.arr1 || !cluster.belongTo.nginx.arr1.length ? "" :
                                                                    <table className="table in-table">
                                                                        <tbody>
                                                                        {cluster.belongTo.nginx.arr1.map((item1, index1)=>
                                                                                <tr key={index1}>
                                                                                    <td className="text-center"
                                                                                        style={{"borderBottom":cluster.belongTo.nginx.arr1.length-1!=index1?"1px solid #ddd":"0px"}}>{item1.name}</td>
                                                                                </tr>
                                                                        )}
                                                                        </tbody>
                                                                    </table>

                                                                }


                                                            </td>
                                                        </tr>
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        }
                                        {/*<div className="form-group" style={{marginTop:'30px'}}>
                                            <label className="col-xs-3 control-label">服务频道：</label>

                                            <div className="col-xs-9"
                                                 style={{paddingTop:'7px',border:'1px solid #d8d8d8'}}>
                                                <div style={{marginBottom:'12px'}}>共{!cluster.belongTo||!cluster.belongTo.channel?0:cluster.belongTo.channel.length}个频道</div>
                                                <div style={{marginBottom:'12px'}}>
                                                    {!cluster.belongTo||!cluster.belongTo.channel?"":
                                                        cluster.belongTo.channel.map((clus,i)=><span key={i}>{clus.channel_name}{i!=cluster.belongTo.channel.length-1?"，":""}</span>)}
                                                </div>
                                            </div>
                                        </div>*/}
                                    </div>
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
    return {"cluster": state.cluster}
}
export default connect(sel)(ClusterDetail)