import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { PROVICES,OPERATORS,ROLE,IFUSE } from '../config.js';
//import { Link,IndexLink,browserHistory } from 'react-router';
class DeviceDetail extends Component {
    render() {
        const {devices}=this.props;
        //console.log(devices.belongTo);
        return (
            <div className="modal fade f-modal resChosen" id='f-detailDevice-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span>设备详情</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="detaildev">
                                <div className="form-group">
                                    <div className="col-xs-offset-1 col-xs-10">
                                        <div style={{marginBottom:'20px'}} className="lit-title"><span>基本详情</span></div>
                                        {/* <div style={{width:'100%',fontWeight:'600',borderLeft:'1px solid #0099cb'}}>
                                         <p style={{marginLeft:'12px'}} >基本详情</p>
                                         </div>*/}
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">设备名：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                {devices && devices.name ? devices.name : ""}
                                                <div
                                                    className={devices&&devices.status=="1"?'status-bg green-bg':'status-bg red-bg'}></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">设备角色：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                {devices && devices.role ?
                                                    ROLE[devices.role] ? ROLE[devices.role] : devices.role
                                                    : ""}

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">省份：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                {devices && devices.addr ?
                                                    PROVICES[devices.addr] ? PROVICES[devices.addr] : devices.addr
                                                    : ""}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">ip信息：</label>

                                            <div className="col-xs-9" style={{paddingTop:'7px'}}>
                                                <table className="table f-table f-resStyle">
                                                    <thead>
                                                    <tr>
                                                        <th style={{width:'50%'}}>
                                                            ip地址
                                                        </th>
                                                        <th style={{width:'50%'}}>
                                                            运营商
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {devices && devices.ips ?
                                                        devices.ips.map((item, index)=>(
                                                            <tr key={index}>
                                                                <td className="text-center">{item.ip}</td>
                                                                <td className="text-center"> {
                                                                    OPERATORS[item.isp] ? OPERATORS[item.isp] : item.isp
                                                                }</td>
                                                            </tr>
                                                        ))
                                                        : <tr>
                                                        <td colSpan="2" className="text-center">1.1.1.1</td>
                                                    </tr>}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">设备状态：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                {devices && devices.ifuse ?
                                                    IFUSE[devices.ifuse] ? IFUSE[devices.ifuse] : devices.ifuse
                                                    : ""}
                                            </div>
                                        </div>
                                        {/*<div className="form-group">
                                         <label className="col-xs-3 control-label">机房信息：</label>
                                         <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                         北京兆维机房sssssss
                                         </div>
                                         </div>*/}
                                        { /*<div style={{width:'100%',fontWeight:'600',borderLeft:'1px solid #0099cb'}}>
                                         <p style={{marginLeft:'12px'}} >服务现状</p>
                                         </div>*/}
                                        <div style={{marginBottom:'20px'}} className="lit-title"><span>服务现状</span></div>
                                        <div className="form-group">
                                            <label className="col-xs-3 control-label">启/禁用状态：</label>

                                            <div className="col-xs-5" style={{paddingTop:'7px'}}>
                                                已{devices && devices.ifuse ?
                                                IFUSE[devices.ifuse] ? IFUSE[devices.ifuse] : devices.ifuse
                                                : ""}
                                            </div>
                                        </div>
                                        {!devices || !devices.belongTo ? "" :
                                            <div className="form-group">
                                                <div className="col-xs-12">
                                                    <table className="table f-table one-td f-resStyle">
                                                        <thead>
                                                        <tr>
                                                            <th style={{width:'20%'}}>
                                                                应用
                                                            </th>
                                                            <th style={{width:'26.66%'}}>
                                                                所属设备组
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
                                                            <td colSpan="3" className="text-center"
                                                                style={{"padding": "0px"}}>
                                                                {!devices.belongTo.clms.arr1 || !devices.belongTo.clms.arr1.length ? "暂无数据！" :
                                                                    <table className="table in-table">
                                                                        <tbody>
                                                                        {devices.belongTo.clms.arr1.map((item1, index1)=>
                                                                                <tr key={index1}>
                                                                                    <td className="text-center"
                                                                                        style={{"width": "33.33%","borderRight":"1px solid #ddd"}}>{item1.name}</td>
                                                                                    <td colSpan="2"
                                                                                        className="text-center"
                                                                                        style={{"padding": "0px"}}>
                                                                                        {!item1.arr2 ? "暂无数据!" :
                                                                                            <table
                                                                                                className="table in-table">
                                                                                                <tbody>
                                                                                                {item1.arr2.map((item2, index2)=>
                                                                                                        <tr key={index2}>
                                                                                                            <td style={{"width": "50%","borderRight":"1px solid #ddd","borderBottom":item1.arr2.length-1!=index2?"1px solid #ddd":"0px"}}
                                                                                                                className="text-center">{item2.name}</td>
                                                                                                            <td className="text-center"
                                                                                                                style={{"padding": "0px","borderBottom":item1.arr2.length-1!=index2?"1px solid #ddd":"0px"}}>
                                                                                                                {!item2.arr3 ? "" :
                                                                                                                    <table
                                                                                                                        className="table in-table">
                                                                                                                        <tbody>
                                                                                                                        {item2.arr3.map((item3, index3)=>
                                                                                                                                <tr key={index3}>
                                                                                                                                    <td className="text-center" style={{"borderBottom":item2.arr3.length-1!=index3?"1px solid #ddd":"0px"}}>
                                                                                                                                        {item3.name}
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                        )}

                                                                                                                        </tbody>
                                                                                                                    </table>

                                                                                                                }
                                                                                                            </td>
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
                                                            <td colSpan="3" className="text-center"
                                                                style={{"padding": "0px"}}>
                                                                {!devices.belongTo.nginx.arr1 || !devices.belongTo.nginx.arr1.length ? "暂无数据！" :
                                                                    <table className="table in-table">
                                                                        <tbody>
                                                                        {devices.belongTo.nginx.arr1.map((item1, index1)=>
                                                                                <tr key={index1}>
                                                                                    <td className="text-center"
                                                                                        style={{"width": "33.33%","borderRight":"1px solid #ddd","borderBottom":devices.belongTo.nginx.arr1.length-1!=index1?"1px solid #ddd":"0px"}}>{item1.name}</td>
                                                                                    <td colSpan="2"
                                                                                        className="text-center"
                                                                                        style={{"padding": "0px"}}>
                                                                                        {!item1.arr2 ? "暂无数据!" :
                                                                                            <table
                                                                                                className="table in-table">
                                                                                                <tbody>
                                                                                                {item1.arr2.map((item2, index2)=>
                                                                                                        <tr key={index2}>
                                                                                                            <td style={{"width": "50%","borderRight":"1px solid #ddd","borderBottom":item1.arr2.length-1!=index2?"1px solid #ddd":"0px"}}
                                                                                                                className="text-center">{item2.name}</td>
                                                                                                            <td className="text-center"
                                                                                                                style={{"padding": "0px","borderBottom":item1.arr2.length-1!=index2?"1px solid #ddd":"0px"}}>
                                                                                                                {!item2.arr3 ? "" :
                                                                                                                    <table
                                                                                                                        className="table in-table">
                                                                                                                        <tbody>
                                                                                                                        {item2.arr3.map((item3, index3)=>
                                                                                                                                <tr key={index3}>
                                                                                                                                    <td className="text-center" style={{"borderBottom":item2.arr3.length-1!=index3?"1px solid #ddd":"0px"}}>
                                                                                                                                        {item3.name}
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                        )}

                                                                                                                        </tbody>
                                                                                                                    </table>

                                                                                                                }
                                                                                                            </td>
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
    //console.log(state.todos1);
    return {devices: state.devices}
}
export default connect(sel)(DeviceDetail)