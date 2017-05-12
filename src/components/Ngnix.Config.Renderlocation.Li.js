import React from 'react'
export default class LocationRenderConfigLi extends React.Component{
    constructor(state){
        super(state);
        this.state={
            index:'',
            count:'',
            ifactive:'',
            isremove:''
        }
    }
    componentWillMount(){
        this.state.index=this.props.index;
        this.state.count=this.props.count;
        if(this.state.index==1){
            this.state.ifactive='Config_Tab_Active';
        }
        if(this.state.count>1){
            this.state.isremove='glyphicon glyphicon-remove f-fontSize8 highRemoveBtn';
        }
    }
    render(){
        return(
            <li name={'config'+this.state.index} className={this.state.ifactive}>{'配置'+this.state.index} <i className={this.state.isremove}></i></li>
        )
    }
}