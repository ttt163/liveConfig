import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { editIspData,delIsp,clearIspData} from '../actions/proxyActions.js'
//import { addDevice,searchDevice,addDevPage,showDeviceList} from '../actions/actions'
import {ShowDiag,addOperation} from  "../public/js/f.js"
import { URL,PROVICES,OPERATORS,ROLE,IFUSE,TYPE } from '../config.js';
//import {addValidate} from "../public/js/validate/action.js"
//import {getForm,getFields,getFormFields,clearFormData,delFormsFn} from "../public/js/validate/validateRform.js"
import {getArrForm,getArrFormFields,getArrformArrField ,validateArrformAllFields,clearArrFormFn,delArrFormFn,
    validateArrformField,validateArrformArrField} from "../public/js/validate/validateRform.js"
import { Select  } from 'antd';
import ProvConfig from "./Proxy.prov.js"
const Option = Select.Option;
export var ispOpt=[],ispArr={};
import ValidateItem from "./Validate.item.js"
class IspConfig extends React.Component {
    componentWillMount(){
        const {proxyDev,isp}=this.props;
        ispArr=Object.assign({}, OPERATORS);
        for(var i=0;i<proxyDev.length;i++){
            for (var [k,v] of Object.entries(ispArr)) {
                //if(k==ipConfig[i].operators&&i!=configIndex){
                if(k==proxyDev[i].isp&&k!=isp){
                    delete ispArr[k];
                    break;
                }
            }
        }
        ispOpt=[];
        for (var [k,v] of Object.entries(ispArr)) {
            ispOpt.push(<Option key={k}>{v}</Option>);
        }
    }
    shouldComponentUpdate(nextProps){
        const {proxyDev,isp}=nextProps;
        ispArr=Object.assign({}, OPERATORS);
        for(var i=0;i<proxyDev.length;i++){
            for (var [k,v] of Object.entries(ispArr)) {
                if(k==proxyDev[i].isp&&k!=isp){
                    delete ispArr[k];
                    break;
                }
            }
        }
        ispOpt=[];
        for (var [k,v] of Object.entries(ispArr)) {
            ispOpt.push(<Option key={k}>{v}</Option>);
        }
        return true;
    }

    componentDidMount() {
        const {isShow,isp,provinces,dispatch,index,addIspFn,_id}=this.props;
        getArrForm("porxyform", index);
        getArrFormFields("porxyform", index, {
            "isp": {
                "value": isp,
                "rule": {"required": true},
                "msg": {"required": "运营商不能为空！"}
            }
            }
        )
    }
    //保存
    submitIsp(){
        const {proxyDev,index,dispatch}=this.props;
        const thisData=proxyDev[index];
        var data= Object.assign({},thisData);
        delete data.isShow;
        //delete data.provinces;
        var isValidate=validateArrformAllFields("porxyform",index);
        var isProvValidate=true;
        //console.log(isValidate);
        for(var i=0;i<data.provinces.length;i++){
            const Ipinfo=thisData.provinces[i].Ipinfo;
            //delete data.provinces[i].Ipinfo;
            var ips=[],dataProv=data.provinces[i];
            for(var j=0;j<Ipinfo.length;j++){
                ips.push(Ipinfo[j].ip);
            }
            data.provinces[i]={...dataProv,"ip":ips};
            var flag=validateArrformAllFields("porxy"+index+"-proviceform",i);
            if(!flag){
                isProvValidate=false;
            }
        }
        //console.log(!isValidate||!isProvValidate);
        if(!isValidate||!isProvValidate){
            return;
        }
        $.ajax({
            url: `${URL}/SendAgentConfig`,
            type: 'post',
            data: JSON.stringify(data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'保存失败！':data.info.warning,
                    closetime: 2
                });
            },
            success: function (data) {
                if (data.info.status == "success") {
                    new ShowDiag({
                        msg: "保存成功！",
                        closetime: 2
                    });
                    dispatch(editIspData({"_id": data.info._id},index));
                    return;
                }
                new ShowDiag({
                    msg: !data.info.warning?'保存失败！':data.info.warning,
                    closetime: 2
                });
            }
        })
    }
    reVaildate(){
        const {proxyDev,index,dispatch}=this.props;
        var _thisPrv=proxyDev[index].provinces;
        for(var i=0;i<_thisPrv.length;i++){
            validateArrformField("porxy"+index+"-proviceform","province","",i);
            for(var j=0;j<_thisPrv[i].Ipinfo.length;j++){
                validateArrformArrField("porxy"+index+"-proviceform",i,"ip","",j);
            }
        }
        validateArrformField("porxyform","isp","",index);

    }

    componentWillUnmount() {
        const {proxyDev,index,dispatch}=this.props;
        clearArrFormFn("porxy"+index+"-proviceform");
        delArrFormFn("porxyform",index);

    }
    //删除
    delIspData(id){
        const {proxyDev,index,dispatch}=this.props;
        if(!id){
            dispatch(delIsp(index));
            return;
        }
        var data={
            "query":{
                "_id":id
            }
        }
        $.ajax({
            url: `${URL}/DeleteAgentConfig`,
            type: 'post',
            data: JSON.stringify(data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'删除失败！':data.info.warning,
                    closetime: 2
                });
            },
            success: function (data) {
                if (data.info.status == "success") {
                    new ShowDiag({
                        msg: "删除成功！",
                        closetime: 2
                    });

                    dispatch(delIsp(index));
                }else{
                    new ShowDiag({
                        msg: !data.info.warning?'删除失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        })

    }
    render() {
        const {isShow,isp,provinces,dispatch,index,addIspFn,_id,validator}=this.props;
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>{!OPERATORS[isp]?isp:OPERATORS[isp]}</h4></div>
                    <div className="col-xs-9 text-right p-act">
                        <i className="glyphicon glyphicon-plus green mr10" onClick={addIspFn}></i>
                        <i className="glyphicon glyphicon-remove red mr10" onClick={()=>this.delIspData(_id)}></i>
                        <i className="iconfont more-dot" onClick={()=>dispatch(editIspData({"isShow": !isShow},index))}>&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":!isShow?"none":"block"}}>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-xs-12 text-right">
                                <button type="button" className="btn mr10 btn-gradient" onClick={()=>this.submitIsp()}>保存</button>
                                <button type="button" className="btn btn-gradient" onClick={()=>{dispatch(clearIspData(index));this.reVaildate()}}>清空</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-1 control-label">运营商：</label>
                            <div className="col-xs-4">
                                <ValidateItem validator={validator} thisForm={"porxyform"} field="isp" formType="arr" formIndex={index}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                        notFoundContent="无搜索结果！"
                                        value={isp}
                                        onChange={(val)=>{dispatch(editIspData({"isp": val},index)); validateArrformField("porxyform","isp",val,index)}}
                                        >
                                        <Option value="">请选择</Option>
                                        {ispOpt}
                                    </Select>
                                </ValidateItem>
                            </div>
                        </div>
                        {provinces.map((item,i)=>
                                <ProvConfig {...item}
                                    key={i}
                                    index={index}
                                    provIndex={i}
                                    isp={isp}
                                    provinces={provinces}
                                    />
                        )}

                    </form>
                </div>
            </div>
        )
    }


}
function sel(state) {
    //console.log(state);
    //console.log(state.todos1);
    return {proxyDev: state.proxyDev,validator:state.validator_1}

}
export default connect(sel)(IspConfig)
//})
