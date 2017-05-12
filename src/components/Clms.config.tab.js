import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
export default class ConfigTab extends Component {
    render() {
        const {data,curr,delTab,choseTab,label}=this.props;
        return (
            <ul className="tab-nav clearfix">
                {data.map((item,index)=>
                        <li key={index} style={{"height":"39px"}} onClick={()=>{choseTab(index)}} className={curr==index?"active":""}>{label}{index+1}
                            <i style={{"display":data.length==1?"none":""}}   onClick={(e)=>{e.nativeEvent.stopImmediatePropagation();e.stopPropagation();delTab(index)}} className="iconfont">&#xe600;</i>
                        </li>
                )}
            </ul>
        )
    }
}
/*
function sel(state) {
    //console.log(state);
    return {"search": state.clmsTaskList.search, validator: state.validator_1}
}
export default connect(sel)(ConfigTab)*/
