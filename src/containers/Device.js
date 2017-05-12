import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { addDevice,searchDevice,addDevPage,showDeviceList} from '../actions/actions'
import {ShowDiag,addOperation} from  "../public/js/f.js"
import SearchDevice from '../components/Device.search.js'
import SearchTableDevice from '../components/Device.searchTable.js'
import DeviceAdd from '../components/Device.add.js'
import DeviceEdit from '../components/Device.edit.js'
import DeviceDetail from '../components/Device.detail.js'
import DeviceRepeat from '../components/Device.repeat.js'
import DeviceSync from '../components/Device.sync.js'
import { URL,PROVICES,OPERATORS,ROLE,IFUSE,TYPE } from '../config.js';
import {addValidate} from "../public/js/validate/action.js"
import {getForm,getFields,getFormFields,clearFormData,delFormsFn} from "../public/js/validate/validateRform.js"
import { Pagination,Select  } from 'antd';
const Option = Select.Option;
//更新列表数据
export function getDevData(dispatch, data) {
    //const  {dispatch}=this.props;
    var query = data.query;
    $.ajax({
        url: `${URL}/GetDevConfig`,
        type: 'post',
        data: JSON.stringify(data),
        async: false,  //默认为true 异步
        dataType: "json",
        error: function () {
            console.log("更新失败");
        },
        success: function (data) {
            // console.log(data.info.all_row);
            if (data.info.all_row) {
                var count = data.info.all_row;
                dispatch(searchDevice({"count": count}));
            }
            dispatch(showDeviceList(data.info.data));
            /*if($.isEmptyObject(query)){

             }*/
        }
    })
}
export const roleOption = [], proviceOption = [], ispOption = [], ifuseOption = [], typeOption = [];
//设备角色
for (var [k,v] of Object.entries(ROLE)) {
    roleOption.push(<Option key={k}>{v}</Option>);
}
//设备状态
for (var [k,v] of Object.entries(IFUSE)) {
    ifuseOption.push(<Option key={k}>{v}</Option>);
}
//省份
for (var [k,v] of Object.entries(PROVICES)) {
    proviceOption.push(<Option key={k}>{v}</Option>);
}
//运营商
for (var [k,v] of Object.entries(OPERATORS)) {
    ispOption.push(<Option key={k}>{v}</Option>);
}
//设备类型
for (var [k,v] of Object.entries(TYPE)) {
    typeOption.push(<Option key={k}>{v}</Option>);
}
class Device extends React.Component {
    constructor(state) {
        super(state);
    }
    componentWillMount(){
        //是否登录
        if(localStorage.loginInfo==undefined){
            localStorage.loginInfo=JSON.stringify({'loginStatus':false});
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }else{
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }else if(data.role=='业务运维'){
                window.location.href='#/'
            }
        }
    }
    componentDidMount() {
        const {dispatch}=this.props;
        var _data = {
            "query": {},
            "page": "1",
            "row": "10",
            "all_row": "1"
        };
        dispatch(searchDevice(_data));
        this.getDevData(_data);
        $('#f-addDevice-modal').on("hidden.bs.modal", function () {
            dispatch(addValidate("addDevice", {"valideMsg": {}, "fields": {}}));
            //clearFormData("addDevice");
           // var data = {"ips": []}
           dispatch(addDevice({"ips": []}));
        });
        $('#f-editDevice-modal').on("hidden.bs.modal", function () {
            dispatch(addValidate("editDevice", {"valideMsg": {}, "fields": {}}));
        });
        $("#f-repeatDevice-modal").on("hidden.bs.modal", function () {
            dispatch(addValidate("repDevice", {"valideMsg": {}, "fields": {}}));
        });
    }
    componentWillUnmount() {
        //console.log("j结束");
        const {dispatch}=this.props;
        //dispatch(showCluster({"list":[],"search":{}}));
        /*clearFormData("searchDevice");
        clearFormData("addDevice");
        clearFormData("editDevice");
        clearFormData("repDevice");*/
        delFormsFn(["searchDevice","addDevice","editDevice","repDevice"]);
        var _data = {
            "query": {},
            "page": "1",
            "row": "10",
            "all_row": "1"
        };
        dispatch(searchDevice(_data));
       // clearFormData("searchClus");
        //dispatch(showCluster({"list":list.data,"search":{...data,"count":list.count}}));
        // clearFormData("searchDevGroup");
    }
    //添加设备
    addDevice() {
        //this.props.dispatch(clearValidate());
        // console.log("qiii");
        const { dev} = this.props;
        var data = {
            "_id": "",
            "name": "",
            "type": "1",
            "role": "",
            "addr": "",
            "ifuse": "",
            "status": "1",
            "ips": [
                {
                    "ip": "",
                    "isp": ""
                }
            ]
        }
        this.props.dispatch(addDevice(data));
        var $addModel = $('#f-addDevice-modal'); //添加模态框
        $addModel.modal('show');
        // const { dev} = this.props;
        //console.log();
        getForm("addDevice");
        /*getFields("addDevice", "name", {
            "value": "",
            "rule": {"required": true, "regexp": /[0-9]+$/, "maxLen": 5, "minLen": 3},
            "msg": {"required": "设备名不能为空", "regexp": "设备名格式错误！", "maxLen": "设备名不能超过5个字符", "minLen": "设备名最小长度为2"}
        });
        getFields("addDevice", "role", {
            "value": "",
            "rule": {"required": true},
            "msg": {"required": "角色不能为空"}
        });*/
        getFormFields("addDevice", {
            "name": {
                "value": "",
                "rule": {"required": true, "regexp": /^[\.a-zA-Z0-9-]+$/, "maxLen": 200},
                "msg": {"required": "设备名不能为空", "regexp": "设备名只能由字母，数字，“.”，“-”组成！", "maxLen": "设备名不能超过200个字符"}
            },
            "role": {
                "value": "",
                "rule": {"required": true},
                "msg": {"required": "角色不能为空"}
            },
            "addr": {
                "value": "",
                "rule": {"required": true},
                "msg": {"required": "省份不能为空"}
            },
            "ifuse": {
                "value": "",
                "rule": {"required": true},
                "msg": {"required": "设备状态不能为空"}
            }
        });
        //console.log(this.props);

        /* var selectId = ['.f-deviceType', '.f-isp'];
         selectie(selectId);*/
    }

    //删除设备
    delThisDevice(id,name) {
        var sData = this.props.search, _this = this;
        // console.log(id);
        if (id) {
            Modal.confirm({
                msg: '确认要删除吗？',
                title: "删除",
                btnok: "确定",
                btncl: "取消"
            }).on(function (e) {
                if (e) {
                    //console.log(this.props);
                    //return;
                    var _data = {"_id": id};
                    $.ajax({
                        url: `${URL}/DeleteDevConfig`,
                        type: 'post',
                        data: JSON.stringify({"query": _data, "page": "1", "row": "10"}),
                        async: true,  //默认为true 异步
                        dataType: "json",
                        error:function(error){
                            var data=$.parseJSON(error.responseText);
                            new ShowDiag({
                                msg: !data.info.warning?'操作失败！':data.info.warning,
                                closetime: 2
                            });
                        },
                        success: function (data) {
                            if (data.info.status == "success") {
                                new ShowDiag({
                                    msg: '删除成功！',
                                    closetime: 1
                                });
                                _this.getDevData(sData);
                                addOperation(`删除设备${name}`);
                            } else {
                                new ShowDiag({
                                    msg: !data.info.warning?'删除失败！':data.info.warning,
                                    closetime: 2
                                });
                            }
                        }
                    })
                }
            })
        }


    }

    //更新列表数据
    getDevData(data) {
        const {dispatch}=this.props;
        $.ajax({
            url: `${URL}/GetDevConfig`,
            type: 'post',
            data: JSON.stringify(data),
            async: true,  //默认为true 异步
            dataType: "json",
            error: function () {
                console.log("更新数据失败");
            },
            success: function (data) {
                //console.log(data.info.all_row);
                if (data.info.all_row) {
                    var count = data.info.all_row;
                    dispatch(searchDevice({"count": count}));
                }
                dispatch(showDeviceList(data.info.data));
            }
        })
    }

    //同步设备
    /*devSync(){
     // console.log(URL);
     /!*var _data={
     "query":{
     "_id":"57fb3c92e13823507700000a",
     "name":"",
     "ip":"",
     "role":"",
     "addr":"",
     "ifuse":"",
     "type":"",
     "status":""
     },
     "page":"1",
     "row":"10",
     "all_row":"1"
     };
     //console.log(`${URL}/GetDevConfig`);
     $.ajax({
     url:`${URL}/GetDevConfig`,
     type:'post',
     data:JSON.stringify(_data),
     async: true,  //默认为true 异步
     dataType: "json",
     error:function(){
     alert('error');
     },
     success:function(data){
     console.log(data);
     }
     })*!/

     $("#f-syncDevice-modal").modal();
     }*/
    //分页
    /*onShowSizeChange(current, pageSize) {
     console.log(current, pageSize);
     }*/
    /*ｐａｇｅ　页数
     ｒｏｗ　每页　几条
     ａｌｌ＿ｒｏｗ　是＂１＂　就是要总数的意思*/
    changePage(page) {
        var sear = this.props.search;
        getDevData(this.props.dispatch, {...sear, "page": page + "", "all_row": "0"});
        this.props.dispatch(searchDevice({"page": page + ""}));
    }

    changeSize(size) {
        //console.log(`selected ${size}`);
        var sear = this.props.search;
        getDevData(this.props.dispatch, {...sear, "row": size + "", "page": "1", "all_row": "0"});
        this.props.dispatch(searchDevice({"row": size, "page": "1"}));
    }

    render() {
        const {devicesList}=this.props;
        return <div>
            <SearchDevice roleOption={roleOption} proviceOption={proviceOption} ispOption={ispOption}
                          ifuseOption={ifuseOption}/>

            <div className="table-box">
                <div className="clearfix f-gradient">
                    <div className="f-caption pull-left">
                        <ul className="list-inline">
                            <li><h4>设备列表</h4></li>
                            <li className="f-count">共<i>{devicesList.search ? devicesList.search.count : 0}</i>条</li>
                            <li>每页显示
                                <div className="numSelect">
                                    {/*<select name="pageSize" id="pageSize">
                                     <option value="10">10</option>
                                     <option value="20">20</option>
                                     </select>onChange={this.changeSize.bind(this)}*/}
                                    <Select name="size" defaultValue="10" style={{ width: 80 }}
                                            onChange={(v)=>this.changeSize(v)}>
                                        <Option value="10">10</Option>
                                        <Option value="20">20</Option>
                                        <Option value="30">30</Option>
                                        <Option value="50">50</Option>
                                        <Option value="100">100</Option>
                                    </Select>
                                </div>
                                个
                            </li>
                        </ul>
                    </div>
                    <div className="pull-right">
                        <button type="button" className="btn  btn-small" onClick={this.addDevice.bind(this)} id='f-add'>
                            新增
                        </button>
                        {/*
                         <button type="button" className="btn  btn-small" onClick={this.devSync.bind(this)}>同步设备</button>
                         <button type="button" className="btn  btn-small changeStatus" data-status="-2" data-url="/device/destroy/" data-id="all">删除</button>
                         <button type="button" className="btn  btn-small changeStatus" data-status="0" data-url="/device/ifStart/" data-id="all">禁用</button>
                         <button type="button" className="btn  btn-small changeStatus" data-status="1" data-url="/device/ifStart/" data-id="all">启用</button>
                         */}
                    </div>
                </div>
                <SearchTableDevice delThisDevice={(id,name)=>this.delThisDevice(id,name)}/>
            </div>
            {devicesList.search && devicesList.search.count ?
                <Pagination onChange={this.changePage.bind(this)}
                            pageSize={devicesList.search?parseInt(devicesList.search.row):10}
                            current={devicesList.search?parseInt(devicesList.search.page):1}
                            total={devicesList.search?parseInt(devicesList.search.count):0}/>
                : ""}
            {/*设备同步
             <DeviceSync  />
             */}

            {/*设备添加*/}
            <DeviceAdd roleOption={roleOption} proviceOption={proviceOption} ispOption={ispOption}
                       ifuseOption={ifuseOption} getDevData={data=>this.getDevData(data)}/>
            {/*设备编辑*/}
            <DeviceEdit roleOption={roleOption} proviceOption={proviceOption} ispOption={ispOption}
                        ifuseOption={ifuseOption} getDevData={data=>this.getDevData(data)}/>
            {/*设备详情*/}
            <DeviceDetail />
            {/*设备替换*/}
            <DeviceRepeat getDevData={data=>this.getDevData(data)}/>
            {/*转吗配置状态*/}
            <div className="modal fade f-modal" id='f-confState'></div>
        </div>
    }


}
function sel(state) {
     //console.log(state);
    //console.log(state.todos1);
    return {dev: state.devices, "devicesList": state.devicesList, "search": state.devicesList.search}

}
export default connect(sel)(Device)
//})
