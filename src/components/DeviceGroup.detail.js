/**
 * Created by Administrator on 2016/9/8.
 */
import React, {Component,PropTypes} from 'react'
import { selectTopo} from '../actions/devGoupActions.js'
import { connect } from 'react-redux'
import { PROVICES,OPERATORS,ROLE} from '../config.js';
class DeviceGroupDetail extends Component {
    render() {
        const {currIndex,dispatch,topoItems,devicesGroup,devDatas}=this.props;
        //console.log(topoItems);
        return (
            <div className="modal fade f-modal resChosen" id='f-detailDevGro-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span>设备组详情</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="detaildev">
                                <div className="form-group">
                                    <div className="col-xs-offset-1 col-xs-10">
                                        <div className="lit-title"><span>基本详情</span></div>
                                        {/* <div style={{width:'100%',fontWeight:'600',borderLeft:'1px solid #0099cb'}}>
                                         <p style={{marginLeft: '12px'}}>基本详情</p>
                                         </div>*/}
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">设备组名：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                {devicesGroup.name}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">设备组角色：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                {ROLE[devicesGroup.role]?ROLE[devicesGroup.role]:devicesGroup.role}
                                            </div>
                                        </div>
                                        <div className="form-group" style={{"padding":"15px 0px"}}>
                                            <label className="col-xs-3 control-label">设备：</label>
                                            <div className="col-xs-9">
                                                <div style={{padding:'7px',border:'1px solid #e2e3ea'}}>
                                                    <div style={{marginBottom:'12px'}}>共{devDatas ? devDatas.length : 0}台设备</div>
                                                    <div style={{marginBottom:'12px'}}>
                                                        {devDatas ? devDatas.map((item, index)=>
                                                                <span key={index}>{item.name}{index == devDatas.length - 1 ? "" : ","}</span>
                                                        ) : ""}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {/*拓扑*/}
                                        <div style={{'marginLeft': '2%',"display":!topoItems.length?"none":"block"}}>
                                            <div className="topology">
                                                <div className="topo-left">
                                                    {topoItems.map((item, index)=>(
                                                            <div key={index} style={{'padding': '6px 20px'}}
                                                                 onClick={(e) =>{e.nativeEvent.stopImmediatePropagation();e.stopPropagation(); dispatch(selectTopo(index))}} key={index} className={currIndex==index?'active':""}>
                                                                拓扑结构{index+1}</div>
                                                        )
                                                    )}
                                                </div>
                                                <div className="topo-main">
                                                    {topoItems.map((item, index)=>(
                                                            <div key={index} style={{display:index==currIndex?"block":"none"}}>
                                                                <div className="form-group">
                                                                    <label className="col-xs-3 ">拓扑名称：</label>
                                                                    <div className="col-xs-5">{item.name}</div>
                                                                </div>
                                                                {item.topology_info.default.Ipinfo.map((item1,index1)=>
                                                                        (<div key={index1} className="form-group">
                                                                            <label className="col-xs-3">{index1==0?"默认：":""}</label>
                                                                            <div className="col-xs-5">{item1.ip}</div>
                                                                            <div className="col-xs-2">{item1.type=="ip_main"?"主":"备"}</div>
                                                                        </div>)
                                                                )}

                                                                {/*配置*/}
                                                                <div className="form-group" style={{"display":item.topology_info.ipConfig.length==0||item.topology_info.ipConfig.length==1&&!item.topology_info.ipConfig[0].operators?"none":"block"}} >
                                                                    <div className="colo-xs-12 g-title">
                                                                        <i className="iconfont dian">&#xe601;</i>
                                                                        <h4>配置</h4>
                                                                    </div>
                                                                </div>
                                                                {/*配置内容-com*/}
                                                                {item.topology_info.ipConfig.map((item1,index1)=>
                                                                        <div key={index1} className="g-config" style={{"display":!item1.operators?"none":"block"}}>
                                                                            <div className="form-group">
                                                                                <label className="col-xs-3">运营商：</label>
                                                                                <div className="col-xs-5">{ OPERATORS[item1.operators]?OPERATORS[item1.operators]:item1.operators}</div>
                                                                            </div>
                                                                            {item1.default.map((item2,index2)=>
                                                                                    <div key={index2} className="form-group">
                                                                                        <label className="col-xs-3">{index2==0?"默认：":""}</label>
                                                                                        <div className="col-xs-5">{item2.ip}</div>
                                                                                        <div className="col-xs-2">{item2.type=="ip_main"?"主":"备"}</div>
                                                                                    </div>
                                                                            )}

                                                                            {/*省份-运营商*/}
                                                                            {item1.provinces.map((item2,index2)=>
                                                                                    <div key={index2} className="g-prov" style={{"display":!item2.province?"none":"block"}}>
                                                                                        <div className="form-group">
                                                                                            <label className="col-xs-3">省份：</label>
                                                                                            <div className="col-xs-5"> {PROVICES[item2.province]?PROVICES[item2.province]:item2.province}</div>
                                                                                        </div>
                                                                                        {item2.Ipinfo.map((item3,index3)=>
                                                                                                <div key={index3} className="form-group">
                                                                                                    <label className="col-xs-3">{index3==0?"IP地址：":""}</label>
                                                                                                    <div className="col-xs-5">{item3.ip}</div>
                                                                                                    <div className="col-xs-2">{item3.type=="ip_main"?"主":"备"}</div>
                                                                                                </div>
                                                                                        )}
                                                                                    </div>
                                                                            )}
                                                                        </div>
                                                                )}


                                                                <div className="form-group">
                                                                    <label className="col-xs-3">备注：</label>
                                                                    <div className="col-xs-9">
                                                                        <div className="mh100">{item.topoRemarks}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="lit-title" style={{marginBottom:'20px'}}><span>服务现状</span></div>
                                        {/*  <div style={{width:'100%',fontWeight:'600',borderLeft:'1px solid #0099cb'}}>
                                         <p style={{marginLeft:'12px'}}>服务现状</p>
                                         </div>*/}
                                        {!devicesGroup || !devicesGroup.belongTo ? "" :
                                            <div className="form-group">
                                                <div className="col-xs-12">
                                                    <table className="table f-table one-td f-resStyle">
                                                        <thead>
                                                        <tr>
                                                            <th style={{width:'20%'}}>
                                                                应用
                                                            </th>
                                                            <th style={{width:'26.66%'}}>
                                                                所属集群
                                                            </th>
                                                            <th style={{width:'26.67%'}}>
                                                                服务频道
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td className="text-center">clms</td>
                                                            <td colSpan="2" className="text-center"
                                                                style={{"padding": "0px"}}>
                                                                {!devicesGroup.belongTo.clms.arr1 || !devicesGroup.belongTo.clms.arr1.length ? "暂无数据！" :
                                                                    <table className="table in-table">
                                                                        <tbody>
                                                                        {devicesGroup.belongTo.clms.arr1.map((item1, index1)=>
                                                                                <tr key={index1}>
                                                                                    <td className="text-center"
                                                                                        style={{"width": "50%","borderRight":"1px solid #ddd","borderBottom":devicesGroup.belongTo.clms.arr1.length-1!=index1?"1px solid #ddd":"0px"}}>{item1.name}</td>
                                                                                    <td
                                                                                        className="text-center"
                                                                                        style={{"padding": "0px","borderBottom":devicesGroup.belongTo.clms.arr1.length-1!=index1?"1px solid #ddd":"0px"}}>
                                                                                        {!item1.arr2 ? "暂无数据!" :
                                                                                            <table
                                                                                                className="table in-table">
                                                                                                <tbody>
                                                                                                {item1.arr2.map((item2, index2)=>
                                                                                                        <tr key={index2}>
                                                                                                            <td style={{"borderBottom":item1.arr2.length-1!=index2?"1px solid #ddd":"0px"}}
                                                                                                                className="text-center">{item2.name}</td>
                                                                                                        </tr>
                                                                                                )
                                                                                                }
                                                                                                </tbody>
                                                                                            </table>

                                                                                        }

                                                                                    </td>
                                                                                </tr>
                                                                        )}
                                                                        </tbody>
                                                                    </table>

                                                                }


                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center">nginx</td>
                                                            <td colSpan="2" className="text-center"
                                                                style={{"padding": "0px"}}>
                                                                {!devicesGroup.belongTo.nginx.arr1 || !devicesGroup.belongTo.nginx.arr1.length ? "暂无数据！" :
                                                                    <table className="table in-table">
                                                                        <tbody>
                                                                        {devicesGroup.belongTo.nginx.arr1.map((item1, index1)=>
                                                                                <tr key={index1}>
                                                                                    <td className="text-center"
                                                                                        style={{"width": "50%","borderRight":"1px solid #ddd","borderBottom":devicesGroup.belongTo.nginx.arr1.length-1!=index1?"1px solid #ddd":"0px"}}>{item1.name}</td>
                                                                                    <td
                                                                                        className="text-center"
                                                                                        style={{"padding": "0px","borderBottom":devicesGroup.belongTo.nginx.arr1.length-1!=index1?"1px solid #ddd":"0px"}}>
                                                                                        {!item1.arr2 ? "暂无数据!" :
                                                                                            <table
                                                                                                className="table in-table">
                                                                                                <tbody>
                                                                                                {item1.arr2.map((item2, index2)=>
                                                                                                        <tr key={index2}>
                                                                                                            <td style={{"borderBottom":item1.arr2.length-1!=index2?"1px solid #ddd":"0px"}}
                                                                                                                className="text-center">{item2.name}</td>
                                                                                                        </tr>
                                                                                                )
                                                                                                }
                                                                                                </tbody>
                                                                                            </table>

                                                                                        }

                                                                                    </td>
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
    return {
        topoItems: state.topos.topoItems,
        devicesGroup: state.devicesGroup,
        currIndex: state.topos.currIndex,
        devDatas: state.devicesGroup.devDatas
    }
}
export default connect(sel)(DeviceGroupDetail)