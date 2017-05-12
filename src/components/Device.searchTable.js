
import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { addDevice} from '../actions/actions'
import DeviceList  from './Device.searchList.js'
import { Checkbox } from 'antd';
//import { Link,IndexLink,browserHistory } from 'react-router';
//const {dispatch} = this.props
class SearchTableDevice extends Component {
    constructor(state) {
        super(state);
    }

    render() {
        return (
            <table className="table f-table pf">
                <thead>
                <tr>
                    {/*  <th style={{width:'40px'}} rowSpan="2">{/!*<input type="checkbox" id="inputAll" value="0"/>*!/}
                        <Checkbox ></Checkbox>
                    </th>*/}
                    <th rowSpan="2" style={{width:'200px'}}>设备名</th>
                    <th rowSpan="2" style={{width:'200px'}}>设备角色</th>
                    <th colSpan="2">IP信息</th>
                    <th style={{width:'100px'}} rowSpan="2">省份</th>
                    <th style={{width:'100px'}} rowSpan="2">设备状态</th>
                    <th style={{width:'280px'}} rowSpan="2">操作</th>
                </tr>
                <tr>
                    <th style={{width:'200px'}}>IP地址</th>
                    <th style={{width:'200px'}}>运营商</th>
                </tr>
                </thead>
                <DeviceList delThisDevice={this.props.delThisDevice}/>
                {/*<tbody><tr className="step1">
                    <td data-id="" rowSpan="2">
                        <input type="checkbox" className="chk" value="409"/>
                    </td>
                    <td rowSpan="2">设备1 <div className="green-bg status-bg"></div></td>
                    <td rowSpan="2">边缘设备</td>
                    <td>111.11.12.15</td>
                    <td>中国电信</td>
                    <td rowSpan="2">杭州</td>
                    <td rowSpan="2">可用</td>
                    <td rowSpan="2" className="f-table-oper">
                        <a href='javascript:;' className='f-onStatus f-off' data-status='0' data-url='/device/ifStart/'>
                            禁用</a>
                        {/!*<a href='javascript:;' className='f-onStatus f-on' data-status='1' data-url='/device/ifStart/'> 启用</a>*!/}
                        | <span style={{margin:'5px'}}>删除</span>
                        | <span style={{'margin':'5px'}}>编辑</span>
                        | <a href='javascript:;' data-url="/device/showReplace/" className="f-repDevice">替换</a>
                        <a href='javascript:;' className="f-detDevice">详情</a>
                    </td>
                </tr>
                <tr>
                    <td>112.121.10.12</td>
                    <td>中国联通</td>
                </tr>
                <tr data-id="57fb5b6fe138235095000003" className="step1">
                    <td data-id="">
                        <input type="checkbox" className="chk" value="408"/>
                    </td>
                    <td>设备2 <div className="red-bg status-bg"></div></td>
                    <td>边缘设备</td>
                    <td>111.11.12.15</td>
                    <td>中国电信</td>
                    <td>杭州</td>
                    <td>可用</td>
                    <td className="f-table-oper">
                        <a href='javascript:;' className='f-onStatus f-on' data-status='1' data-url='/device/ifStart/'> 启用</a>
                        |<a href="javascript:;"  onClick={this.props.delThisDevice} data-status="-2" data-url="/device/destroy/" data-type="_this" > 删除</a>
                        |<a href="javascript:;"  onClick={this.editDevice.bind(this)} className="f-edit">编辑</a>
                        |  <span style={{margin:'5px'}}>替换</span>
                        <a href='javascript:;' className="f-detDevice">详情</a>
                    </td>
                </tr>
                 </tbody>*/}

            </table>
        )
    }
}
function sel(state) {
    //console.log(state);
    return {devList:state.devicesList.list}
}
export default connect(sel)(SearchTableDevice)