import React, {
    Component,
    PropTypes
    } from 'react'
import { connect } from 'react-redux'
import { removeTopo,selectTopo,delDevGroupTopo} from '../actions/devGoupActions.js'
import ReactDOM  from 'react-dom'
import Ipcomp from "./Topology.ipcomp.js"
import Province from "./Topology.Province.js"
import { URL } from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
import {getArrForm,getArrFormFields,getArrFormField,clearArrFormFn,delArrFormFn} from "../public/js/validate/validateRform.js"
class TopoNav extends Component {
    constructor(state) {
        super(state);
    }
    componentWillReceiveProps(nextProps){
        //console.log("nav111");
       /* const {validator,topoItems,index}=this.props;
        getArrForm("toposForm",this.props.index);
        getArrFormField("toposForm",this.props.index,"name",{
            "name": {
                "value": !topoItems[index]||!topoItems[index].name?"":topoItems[index].name,
                "rule": {"required": true, "regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/, "maxLen": 200},
                "msg": {"required": "拓扑名不能为空", "regexp": "拓扑名由中文，数字，英文字母，下划线和“-”组成！", "maxLen": "拓扑名不能超过200个字符"}
            }
        });
        getArrFormField("toposForm",this.props.index,"topoRemarks",{
            "topoRemarks": {
                "value": !topoItems[index]||!topoItems[index].topoRemarks?"":topoItems[index].topoRemarks,
                "rule": {"maxLen": 255},
                "msg": {"maxLen": "不能超过255个字符"}
            }
        });*/
    }
    shouldComponentUpdate(nextProps){
        const {validator,topoItems,index,currIndex}=nextProps;
        getArrForm("toposForm",index);
        getArrFormField("toposForm",index,"name",{
            "name": {
                "value": !topoItems[index]||!topoItems[index].name?"":topoItems[index].name,
                "rule": {"required": true, "regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/, "maxLen": 200},
                "msg": {"required": "拓扑名不能为空", "regexp": "拓扑名由中文，数字，英文字母，下划线和“-”组成！", "maxLen": "拓扑名不能超过200个字符"}
            }
        });
        getArrFormField("toposForm",this.props.index,"topoRemarks",{
            "topoRemarks": {
                "value": !topoItems[index]||!topoItems[index].topoRemarks?"":topoItems[index].topoRemarks,
                "rule": {"maxLen": 255},
                "msg": {"maxLen": "不能超过255个字符"}
            }
        });
        //console.log(validator);
        return true;
    }

    componentDidMount(){
        //console.log("拓扑开始123");
        this.props.dispatch(selectTopo(this.props.index));
        const {validator,topoItems,index}=this.props;
            getArrForm("toposForm",this.props.index);

        getArrFormField("toposForm",this.props.index,"name",{
            "name": {
                "value": !topoItems[index]||!topoItems[index].name?"":topoItems[index].name,
                "rule": {"required": true, "regexp": /^[\u4E00-\uFA29a-zA-Z0-9-_]+$/, "maxLen": 200},
                "msg": {"required": "拓扑名不能为空", "regexp": "拓扑名由中文，数字，英文字母，下划线和“-”组成！", "maxLen": "拓扑名不能超过200个字符"}
            }
        });
        getArrFormField("toposForm",this.props.index,"topoRemarks",{
            "topoRemarks": {
                "value": !topoItems[index]||!topoItems[index].topoRemarks?"":topoItems[index].topoRemarks,
                "rule": {"maxLen": 255},
                "msg": {"maxLen": "不能超过255个字符"}
            }
        });

    }
    componentWillUnmount() {
        //console.log("xxxx123");
        clearArrFormFn("toposForm");
        //delArrFormFn("toposForm",this.props.index);
    }
    removeTopo(e){
        e.nativeEvent.stopImmediatePropagation();e.stopPropagation();
        const { dispatch,topoItems,index} = this.props;
       // console.log(topoItems[index]._id);
        var _data={
            "query":{
                "_id":topoItems[index]._id
            }
        };
        if(!topoItems[index]._id){
            dispatch(removeTopo(index));
            return;
        }
        $.ajax({
            url:`${URL}/DeleteTopologyConfig`,
            type:'post',
            data:JSON.stringify(_data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'删除失败！':data.info.warning,
                    closetime: 2
                });
            },
            success:function(data){
                // console.log(data);
                if(data.info.status=="success"){
                    new ShowDiag({
                        msg: '删除成功！',
                        closetime: 2
                    });
                    dispatch(removeTopo(index));
                    dispatch(delDevGroupTopo(index));
                }else{
                    new ShowDiag({
                        msg: !data.info.warning?'删除失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        });
       // dispatch(removeTopo(this.props.index));
    }
    render() {
        //console.log("render");
        const { dispatch,currIndex} = this.props;
        //console.log(this.props.index);
        //console.log(currIndex);
        return <div className={this.props.index==currIndex?'active':""}  onClick={(e) =>{e.nativeEvent.stopImmediatePropagation();e.stopPropagation(); dispatch(selectTopo(this.props.index))}}>拓扑结构{this.props.index+1}
            <i onClick={(e)=>this.removeTopo(e)} className="iconfont">&#xe600;</i></div>
        {/*
        <i onClick={(e)=>{e.nativeEvent.stopImmediatePropagation();e.stopPropagation();dispatch(removeTopo(this.props.index))}} className="iconfont">&#xe600;</i></div>
        */}
}
}
function sel(state) {
    //console.log(state);
    return {currIndex:state.topos.currIndex,topoItems:state.topos.topoItems,validator:state.validator_1}
}
export default connect(sel)(TopoNav)