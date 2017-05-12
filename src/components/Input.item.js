/**
 * Created by Administrator on 2016/9/28.
 */
import React, {Component} from 'react'
export default class InputComp extends Component {
    constructor(state) {
        super(state);
        /*this.state = {
         topoItem:[]
         }*/
       // console.log(this.props);
    }
    render() {
        return <input  {...this.props} onChange={this.props.onChange} />
    }
}
