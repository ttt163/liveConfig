import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { addDevice,editDeviceList} from '../actions/actions'
import { URL,PROVICES,OPERATORS,ROLE,IFUSE } from '../config.js';
import { Checkbox ,Switch} from 'antd';
import {ShowDiag,addOperation} from  "../public/js/f.js";
import { Select } from 'antd';
const Option = Select.Option;
//import {devsOpction,getAllDevOpt} from "./Device.searchList.js"
import {addValidate} from "../public/js/validate/action.js"
import {getForm,getFields,getFormFields} from "../public/js/validate/validateRform.js"
//import { Link,IndexLink,browserHistory } from 'react-router';
//const {dispatch} = this.props
//设备opction
export var devsOpction = [];

//查询全部设备opt
export function getAllDevOpt(_data) {
    var devsOpct = [];
    $.ajax({
        url: `${URL}/GetDevConfig`,
        type: 'post',
        data: JSON.stringify(_data),
        async: false,  //默认为true 异步
        dataType: "json",
        error: function () {
            console.log("更新数据失败");
        },
        success: function (data) {
            if (data.info.status == "success") {
                //console.log(data.info.data);
                //devsOpction=[];
                for (var i = 0; i < data.info.data.length; i++) {
                    devsOpct.push(<Option
                        key={data.info.data[i]._id+"&dev&"+data.info.data[i].name}>{data.info.data[i].name}</Option>);
                }
                //console.log(devsOpction);
            }

        }
    });
    return devsOpct;
}
//查询全部设备arr
export function getAllDevArr(_data) {
    var devsArr = [];
    $.ajax({
        url: `${URL}/GetDevConfig`,
        type: 'post',
        data: JSON.stringify(_data),
        async: false,  //默认为true 异步
        dataType: "json",
        error: function () {
            console.log("更新数据失败");
        },
        success: function (data) {
            if (data.info.status == "success") {
                if (!data.info.data) {
                    return [];
                }
                devsArr = data.info.data;
                //console.log(devsOpction);
            }

        }
    });
    return devsArr;
}
//格式化所属服务代码
export function formatBelongToData(_data) {
  //  type = !type ? "device" : type;
   // var item={"arr1": [{"name": "","arr2": [{"name": "","arr3": [{"name": "","id": "" }]}]}]};
    var formatData = {"clms":{}, "nginx": {}};
    for (var _ty in _data) {
        var data1=[];
        if( _data[_ty]||_data[_ty]!=null){
            if(_data[_ty] instanceof Array){
                if(_data[_ty].length){
                    for(var i=0;i<_data[_ty].length;i++){
                        data1.push({"name":_data[_ty][i].channel_name,"id": _data[_ty][i].channel_id});
                    }
                }

            }else{
                for(var item1 in _data[_ty] ){
                    //data1.push({"name":item1});
                    var objdata1={"name":item1};
                    var _itemData=_data[_ty][item1];
                    if(_itemData||_itemData!=null){
                        var data2=[];
                        if(_itemData instanceof Array){
                            if(_itemData.length){
                                for(var j=0;j<_itemData.length;j++){
                                    data2.push({"name":_itemData[j].channel_name,"id":_itemData[j].channel_id});
                                }
                            }

                        }else{
                            for(var item2 in _itemData){
                                //data2.pusn({"name":item2});
                                var objdata2={"name":item2};
                                if(_itemData[item2].length){
                                    var data3=[];
                                    if(_itemData[item2].length){
                                        for(var k=0;k<_itemData[item2].length;k++){
                                            data3.push({"name":_itemData[item2][k].channel_name,"id":_itemData[item2][k].channel_id});
                                        }
                                    }

                                    objdata2={...objdata2,"arr3":data3};
                                    data2.push(objdata2);
                                }

                            }
                        }
                        objdata1={...objdata1,"arr2":data2}
                        data1.push(objdata1);
                    }
                }
            }
            formatData={...formatData,[_ty]:{"arr1":data1}}
        }
    }
    //console.log(formatData);
    return formatData;
}
class DeviceList extends Component {
    constructor(state) {
        super(state);
    }


    changeStatus(val, index, id) {
        const {devList,dispatch}=this.props;
        var ifuse = "", thisListData = devList[index];
        //console.log(devList[index]);
        if (val) {
            //启用
            ifuse = "1";
            thisListData = {...thisListData, "ifuse": ifuse};
            $.ajax({
                // url:'http://192.168.100.161:9010/SendDevConfig',
                url: `${URL}/SendDevConfig`,
                type: 'post',
                data: JSON.stringify(thisListData),
                async: true,  //默认为true 异步
                dataType: "json",
                error: function () {
                    new ShowDiag({
                        msg: '修改失败！',
                        closetime: 1
                    });
                },
                success: function (data) {
                    if (data.info.status == "success") {
                        new ShowDiag({
                            msg: '修改成功！',
                            closetime: 1
                        });
                        dispatch(editDeviceList({"ifuse": ifuse}, index));
                        addOperation(`启用设备${thisListData.name}`);
                    } else {
                        //alert('添加失败');
                        new ShowDiag({
                            msg: '修改失败！',
                            closetime: 1
                        });
                    }
                }
            })
        } else {
            //禁用
            ifuse = "2";
            $.ajax({
                url: `${URL}/GetDevGroupByDev`,
                type: 'post',
                data: JSON.stringify({"_id": id}),
                async: true,  //默认为true 异步
                dataType: "json",
                error: function (error) {
                    var data = $.parseJSON(error.responseText);
                    new ShowDiag({
                        msg: !data.info.warning ? '操作失败！' : data.info.warning,
                        closetime: 2
                    });
                },
                success: function (data) {
                    //console.log(data);
                    if (data.info.status == "success") {
                        //alert('添加成功！');
                        if (data.info.data) {
                            var s = "";
                            for (var i = 0; i < data.info.data.length; i++) {
                                s += data.info.data[i].name + ",";
                            }
                            s = s.substring(0, s.lastIndexOf(","));
                            //console.log(s);
                            new ShowDiag({
                                msg: !s ? '修改失败！' : "请先删除设备组" + s,
                                closetime: 2
                            });
                            return;
                        }
                        thisListData = {...thisListData, "ifuse": ifuse};
                        $.ajax({
                            // url:'http://192.168.100.161:9010/SendDevConfig',
                            url: `${URL}/SendDevConfig`,
                            type: 'post',
                            data: JSON.stringify(thisListData),
                            async: true,  //默认为true 异步
                            dataType: "json",
                            error: function () {
                                new ShowDiag({
                                    msg: '修改失败！',
                                    closetime: 1
                                });
                            },
                            success: function (data) {
                                if (data.info.status == "success") {
                                    new ShowDiag({
                                        msg: '修改成功！',
                                        closetime: 1
                                    });
                                    dispatch(editDeviceList({"ifuse": ifuse}, index));
                                    addOperation(`禁用用设备${thisListData.name}`);
                                } else {
                                    //alert('添加失败');
                                    new ShowDiag({
                                        msg: '修改失败！',
                                        closetime: 1
                                    });
                                }
                            }
                        })

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

    }

    editDevice(id, e) {
        const {dispatch,search} = this.props;
        var $editModel = $("#f-editDevice-modal");  //修改模态框
        // var _data={"_id":$(e.target).closest("tr").data("id")};
        var _data = {"_id": id};
        //console.log({"query":_data,"page":"1","row":"10"});
        $.ajax({
            url: `${URL}/GetDevConfig`,
            type: 'post',
            data: JSON.stringify({"query": _data, "page": "1", "row": "10"}),
            async: true,  //默认为true 异步
            dataType: "json",
            error: function () {
                //alert('操作失败！');
                new ShowDiag({
                    msg: '操作失败！',
                    closetime: 1
                });
            },
            success: function (data) {
                // console.log(data);
                if (data.info.status == "success") {
                    var _data = data.info.data[0];
                    /// console.log(_data);
                    dispatch(addDevice(_data));
                    //所属设备组
                    $.ajax({
                        url: `${URL}/GetBelongTo`,
                        type: 'post',
                        data: JSON.stringify({"dev_id": id}),
                        //data: JSON.stringify({"devs_group_id": '58008b3d421aa91b18000009'}),
                        async: false,  //默认为true 异步
                        dataType: "json",
                        error: function () {
                            console.log("操作失败");
                        },
                        success: function (data) {
                            //console.log(data);
                            if (data.info.status == "success") {
                                var _data = data.info.data;
                                dispatch(addDevice({"belongTo": formatBelongToData(_data)}));
                                $editModel.modal('show');
                            }
                        }
                    });


                    getForm("editDevice");
                    /* getFields("editDevice","name",{
                     "value":_data.name,
                     "rule": {"required": true,"regexp": /[0-9]+$/,"maxLen":5,"minLen":3},
                     "msg": {"required": "设备名不能为空","regexp": "设备名格式错误！","maxLen":"设备名不能超过5个字符","minLen":"设备名最小长度为2"}
                     });
                     getFields("editDevice","role",{
                     "value":_data.role,
                     "rule": {"required": true},
                     "msg": {"required": "角色不能为空"}
                     });*/
                    getFormFields("editDevice", {
                        "name": {
                            "value": _data.name,
                            "rule": {"required": true, "regexp": /^[\.a-zA-Z0-9-]+$/, "maxLen": 200},
                            "msg": {
                                "required": "设备名不能为空",
                                "regexp": "设备名只能由字母，数字，“.”，“-”组成！",
                                "maxLen": "设备名不能超过200个字符"
                            }
                        },
                        "role": {
                            "value": _data.role,
                            "rule": {"required": true},
                            "msg": {"required": "角色不能为空"}
                        },
                        "addr": {
                            "value": _data.addr,
                            "rule": {"required": true},
                            "msg": {"required": "省份不能为空"}
                        },
                        "ifuse": {
                            "value": _data.ifuse,
                            "rule": {"required": true},
                            "msg": {"required": "设备状态不能为空"}
                        }
                    });
                } else {
                    //alert('操作失败！');
                    new ShowDiag({
                        msg: '操作失败！',
                        closetime: 1
                    });
                }

            }
        })

    }

    //设备详情
    showDevInfo(id) {
        const {dispatch}=this.props;
        $.ajax({
            url: `${URL}/GetDevConfig`,
            type: 'post',
            data: JSON.stringify({"query": {"_id": id}, "page": "1", "row": "10"}),
            async: true,  //默认为true 异步
            dataType: "json",
            error: function () {
                new ShowDiag({
                    msg: '操作失败！',
                    closetime: 1
                });
            },
            success: function (data) {
                //console.log(data);
                if (data.info.status == "success") {
                    var _data = data.info.data[0];
                    dispatch(addDevice(_data));
                    //所属设备组
                    dispatch(addDevice({"belongTo":{"clms":"","nginx":""}}));
                    $.ajax({
                        url: `${URL}/GetBelongTo`,
                        type: 'post',
                        data: JSON.stringify({"dev_id": id}),
                        //data: JSON.stringify({"devs_group_id": '58008b3d421aa91b18000009'}),
                        async: true,  //默认为true 异步
                        dataType: "json",
                        error: function () {
                            console.log("操作失败");
                        },
                        success: function (data) {
                            //console.log(data);
                            if (data.info.status == "success") {
                                var _data = data.info.data;
                                dispatch(addDevice({"belongTo": formatBelongToData(_data)}));
                                $('#f-detailDevice-modal').modal('show');
                            }
                        }
                    });

                } else {
                    //alert('操作失败！');
                    new ShowDiag({
                        msg: '操作失败！',
                        closetime: 1
                    });
                }

            }
        });


    }

    //替换设备
    replaceDev(id) {
        const {dispatch}=this.props;
        devsOpction = [];
        $.ajax({
            url: `${URL}/GetDevConfig`,
            type: 'post',
            data: JSON.stringify({"query": {"_id": id}, "page": "1", "row": "10"}),
            async: true,  //默认为true 异步
            dataType: "json",
            error: function () {
                new ShowDiag({
                    msg: '操作失败！',
                    closetime: 1
                });
            },
            success: function (data) {
                //console.log(data);
                if (data.info.status == "success") {
                    if (!data.info.data) {
                        new ShowDiag({
                            msg: '操作失败！',
                            closetime: 1
                        });
                        return;
                    }
                    var _data = data.info.data[0];
                    dispatch(addDevice(_data));
                    var s_data = {
                        "query": {"role": _data.role},
                        "page": "1",
                        "row": "100"
                    };
                    //devsOpction=getAllDevOpt(_data);
                    var devs = getAllDevArr(s_data);
                    $('#f-repeatDevice-modal').modal('show');

                    for (var i = 0; i < devs.length; i++) {
                        if (devs[i]._id != id) {
                            devsOpction.push(<Option key={devs[i]._id+"&dev&"+devs[i].name}>{devs[i].name}</Option>);
                        }

                        /*if(devs[i]._id==id){
                         //console.log(devs[i].name);
                         devs=[
                         ...devs.slice(0,i),
                         ...devs.slice(i+1)
                         ]
                         }
                         console.log(devs[i]._id);
                         devsOpction.push(<Option key={devs[i]._id+"&dev&"+devs[i].name}>{devs[i].name}</Option>);*/

                    }
                    /*for(var i=0;i<devs.length;i++){

                     }*/

                    //校验
                    getForm("repDevice");
                    getFields("repDevice", "reptName", {
                        "value": "",
                        "rule": {"required": true},
                        "msg": {"required": "替换后设备不能为空"}
                    });
                } else {
                    //alert('操作失败！');
                    new ShowDiag({
                        msg: '操作失败！',
                        closetime: 1
                    });
                }

            }
        });
    }

    swidchKeyVal(val, data) {
        var dataVal = "";
        for (var [k,v] of Object.entries(data)) {
            if (k == val) {
                dataVal = v;

                break;
            }
        }
        return dataVal
    }

    /* changeCheck(e){
     console.log(e.target.value);
     }*/
    render() {
        //console.log(PROVICES.BJ);
        const {devList,dispatch}=this.props;
        return (
            <tbody>
            {devList ? devList.map((item, index)=>(
                    <tr key={index} data-id={item._id} className="step1">
                        {/*<td data-id="">
                         {/!*<input type="checkbox" className="chk" value="408"/>*!/}
                         <Checkbox value={item._id} onChange={(e)=>this.changeCheck(e)} ></Checkbox>
                         </td>*/}
                        <td>{item.name}
                            <div className={item.status=="1"?'status-bg green-bg':'status-bg red-bg'}></div>
                        </td>
                        <td>{
                            ROLE[item.role] ? ROLE[item.role] : item.role
                            /* this.swidchKeyVal(item.role,{"1":"源站设备","2":"中转设备","3":"边缘设备"})*/
                        }</td>

                        <td>
                            {item.ips.map((data, index)=>
                                    <div key={index}
                                         style={{"borderBottom":index==item.ips.length-1?"0px": "1px solid #d8d8d8","lineHeight":"30px"}}>{data.ip}</div>
                            )}
                        </td>
                        <td>
                            {item.ips.map((data, index)=>(
                                    <div key={index}
                                         style={{"borderBottom":index==item.ips.length-1?"0px": "1px solid #d8d8d8","lineHeight":"30px"}}>
                                        { OPERATORS[data.isp] ? OPERATORS[data.isp] : data.isp}
                                    </div>
                                )

                                /*
                                 <div key={index} style={{"borderBottom":index==item.ips.length-1?"0px": "1px solid #d8d8d8","lineHeight":"30px"}}>{this.swidchKeyVal(data.isp,{"1":"中国移动","2":"中国联通","3":"中国电信","4":"中国铁通"})}</div>
                                 */
                            )}
                        </td>
                        <td>
                            {PROVICES[item.addr] ? PROVICES[item.addr] : item.addr}
                        </td>
                        <td>
                            {
                                IFUSE[item.ifuse] ? IFUSE[item.ifuse] : item.ifuse
                                /* this.swidchKeyVal(item.ifuse,{"1":"可用","2":"禁用","3":"报修"})*/
                            }
                        </td>
                        <td className="f-table-oper">
                            <Switch onChange={(val)=>this.changeStatus(val,index,item._id)} style={{marginRight:"5px"}}
                                    checkedChildren={'启'} checked={item.ifuse=="1"?true:false} unCheckedChildren={'禁'}/>
                            {/* <a href='javascript:;' className='f-onStatus f-off' data-status='1' data-url='/device/ifStart/'> 启用</a>
                             <a  href='javascript:;' className='f-onStatus f-on' data-status='1' data-url='/device/ifStart/'> 启用</a>*/}
                            |<a href="javascript:;" onClick={()=>this.props.delThisDevice(item._id,item.name)}
                                data-type="_this"> 删除</a>
                            |<a href="javascript:;" onClick={(e)=>this.editDevice(item._id,e)} className="f-edit">编辑</a>
                            | {/*<span style={{margin:'5px'}}>替换</span>*/}
                            {item.role == "4" ? "" :
                                <a href='javascript:;'
                                   onClick={()=>{dispatch(addDevice({"reptDev":{"reptId":"","reptName":""}}));this.replaceDev(item._id)}}
                                   className="f-detDevice">替换</a>
                            }
                            {item.role == "4" ? "" : "|"}
                            <a href='javascript:;' onClick={()=>{this.showDevInfo(item._id)}}
                               className="f-detDevice">详情</a>
                        </td>
                    </tr>
                )
            ) :
                <tr>
                    <td colSpan="7">暂无数据！</td>
                </tr>
            }

            </tbody>
        )
    }
}
function sel(state) {
    //console.log(state);
    //console.log(state.todos1);
    return {devList: state.devicesList.list, search: state.devicesList.search}
}
export default connect(sel)(DeviceList)