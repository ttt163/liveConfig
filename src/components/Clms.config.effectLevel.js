import React, {Component,PropTypes} from 'react'
import ValidateItem from "./Validate.item.js"
import { connect } from 'react-redux'
//import { URL } from '../config.js';
//import {ShowDiag} from  "../public/js/f.js"
//import {getClmsChannel} from "../containers/Clms.js"
//import {getForm,getFields,getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
//import ValidateItem from "./Validate.item.js"
import { Checkbox   } from 'antd';
//const Option = Select.Option;
//import {searchClmsTask,showClmsTask} from "../actions/clmsActions.js"
class EffectLevel extends Component {
    render() {
        const {dispatch,add,leves,changeLevel,existLevel,validator,thisForm,formIndex,isOrigin}=this.props;
        return (
            <div className="form-group">
                <label className="col-xs-1 control-label">生效层级：</label>
                <div className="col-xs-2" style={{"padding":"0px"}}>
                    {!isOrigin?<Checkbox onChange={(e)=>changeLevel(e)} disabled={existLevel.indexOf("4")!=-1&&leves.indexOf("4")==-1?true:false} checked={leves&&leves.indexOf("4")!=-1?true:false}  value="4">源</Checkbox>
                        :""}
                    <Checkbox onChange={(e)=>changeLevel(e)} disabled={existLevel.indexOf("1")!=-1&&leves.indexOf("1")==-1?true:false}  checked={leves&&leves.indexOf("1")!=-1?true:false} value="1">上层</Checkbox>
                    <Checkbox onChange={(e)=>changeLevel(e)} disabled={existLevel.indexOf("2")!=-1&&leves.indexOf("2")==-1?true:false} checked={leves&&leves.indexOf("2")!=-1?true:false} value="2">中转</Checkbox>
                    <Checkbox onChange={(e)=>changeLevel(e)} disabled={existLevel.indexOf("3")!=-1&&leves.indexOf("3")==-1?true:false} checked={leves&&leves.indexOf("3")!=-1?true:false} value="3">边缘</Checkbox>
                    {/* 1 上层  2 中转 3边缘 4 源站
                    <input type="checkbox"/><label className="mr10">源</label>
                    <input type="checkbox"/><label className="mr10">上层</label>
                    <input type="checkbox"/><label className="mr10">中转</label>
                    <input type="checkbox"/><label className="mr10">边缘</label>*/}
                </div>
                <div className="col-xs-1">
                    <i className="glyphicon glyphicon-plus green mr10" onClick={()=>add()}></i>
                </div>
                <div className="col-xs-2" style={{"color":"#a94442"}}>
                    <ValidateItem validator={validator} thisForm={thisForm} field="take_effect_level" formType="arr" formIndex={formIndex}>
                    </ValidateItem>
                    </div>
            </div>
        )
    }
}
function sel(state) {
    //console.log(state);
    return {"search": state.clmsTaskList.search, validator: state.validator_1}
}
export default connect(sel)(EffectLevel)