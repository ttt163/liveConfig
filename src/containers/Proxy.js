import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { addIpconfig,clearProxyData} from '../actions/proxyActions.js'
import {ShowDiag,addOperation} from  "../public/js/f.js"
import { URL,PROVICES,OPERATORS,ROLE,IFUSE,TYPE } from '../config.js';
import {addValidate} from "../public/js/validate/action.js"
import {getForm,getFields,getFormFields,clearFormData,delFormsFn,clearArrFormFn} from "../public/js/validate/validateRform.js"
import { Pagination,Select ,BackTop } from 'antd';
import IspConfig from "../components/Proxy.isp.js"
const Option = Select.Option;
//获取IP根据条件
export function getDevIps(query) {
    var ips = [],isp=!query.isp?"":query.isp;
    $.ajax({
        url: `${URL}/GetDevConfig`,
        type: 'post',
        data: JSON.stringify({"query": query}),
        async: false,  //默认为true 异步
        dataType: "json",
        error: function () {
            console.log("更新失败");
        },
        success: function (data) {
            if (data.info.status == "success") {
                var _data = data.info.data;
                //console.log(!_data);
                if (!_data) {
                    return [];
                }
                for (var i = 0; i < _data.length; i++) {
                    if (_data[i].ips.length) {
                        for (var j = 0; j < _data[i].ips.length; j++) {
                            //ips.push(<Option key={_data[i].ips[j].ip}>{_data[i].ips[j].ip}</Option>);
                           /* if(!isp){
                                ips.push(<Option key={_data[i].ips[j].ip}>{_data[i].ips[j].ip}</Option>);
                            }else{
                                if(_data[i].ips[j].isp==isp){
                                    ips.push(<Option key={_data[i].ips[j].ip}>{_data[i].ips[j].ip}</Option>);
                                }
                            }*/
                            ips.push(_data[i].ips[j].ip);
                        }
                    }

                }
            }
        }
    })
    return ips;
}
//export var ipArr=[];
class Proxy extends React.Component {
    componentWillMount() {
        const {dispatch}=this.props;
        $.ajax({
            url: `${URL}/GetAgentConfig`,
            type: 'post',
            data: JSON.stringify({}),
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
                    var data=data.info.data;
                   // console.log(data)
                    if(!data){
                        return;
                    }
                    for(var i=0;i<data.length;i++){
                        var thisData=data[i];
                        thisData={...thisData,"isShow": false};
                        for(var j=0;j<thisData.provinces.length;j++){
                            var thisProv=thisData.provinces[j],ipArr=[];
                            for(var k=0;k<thisProv.ip.length;k++){
                                ipArr.push({"ip":thisProv.ip[k]});
                            }
                            thisProv={...thisProv,"Ipinfo":ipArr};
                            delete thisProv.ip;
                            thisData.provinces[j]=thisProv;
                        }
                        data[i]=thisData;
                    }
                   // console.log(data);
                    dispatch(addIpconfig(data));

                }
            }
        })
    }

    componentWillUnmount() {
        const {dispatch}=this.props;
        //console.log("qingkom");
        dispatch(clearProxyData());
        clearArrFormFn("porxyform");
    }
    addIsp() {
        const {dispatch}=this.props;
        var ispData = [{
            "isShow": true,
            "_id":"",
            "isp":"",
            "provinces": [
                {
                    "province": "",
                    "Ipinfo": [{ip: ""}]
                }
            ]
        }]
        dispatch(addIpconfig(ispData));
    }

    render() {
        const {proxyDev}=this.props;
        return (
            <div className="">
                {!proxyDev[0] ?
                    <div className="clearfix f-gradient" style={{"height":"42px"}}>
                        <div className="col-xs-3"></div>
                        <div className="col-xs-9 text-right p-act" style={{"lineHeight":"42px"}}>
                            <i className="glyphicon glyphicon-plus green mr10" onClick={()=>this.addIsp()}></i>
                        </div>
                    </div>
                    :
                    proxyDev.map((item, index)=>
                            <IspConfig key={index}
                                {...item}
                                       index={index}
                                       addIspFn={()=>this.addIsp()}
                                />
                    )
                }
                <BackTop />
            </div>
        )
    }


}
function sel(state) {
    //console.log(state);
    //console.log(state.todos1);
    return {proxyDev: state.proxyDev}

}
export default connect(sel)(Proxy)
//})
