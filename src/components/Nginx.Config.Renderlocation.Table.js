import React from 'react'
import {Switch} from 'antd'
export default class LocationRenderConfigTable extends React.Component{
    constructor(state){
        super(state);
        this.state={
            ifshow:'tr_trigger f-hide',
            data:{},
            style: {"display":"none"},
            trCou:[],
            _trCou:[],
            addBtn:[],
            removeBtn:[],
            _addBtn:[],
            _removeBtn:[]
        }
    }
    componentWillMount(){
        this.state.data=this.props.table[this.props.index-1];
        if(this.props.index==1){
            this.state.style={"display":""};
        }
        if(this.props.agent[this.props.index-1]){
            this.state.ifshow='tr_trigger'
        }
        if(this.state.data['add_header']){
            for(var i=0;i<this.state.data['add_header'].length;i++){
                this.state.trCou.push(1);
                if(i==0){
                    if(this.state.data['add_header'].length>1){
                        this.state.removeBtn.push('glyphicon glyphicon-remove red f-ml10 innerDel');
                        this.state.addBtn.push('')
                    }else{
                        this.state.addBtn.push('glyphicon glyphicon-plus green f-ml10 innerPlus');
                        this.state.removeBtn.push('')
                    }
                }else if(i!=this.state.data['add_header'].length-1){
                    this.state.removeBtn.push('glyphicon glyphicon-remove red f-ml10 innerDel');
                    this.state.addBtn.push('')
                }else{
                    this.state.addBtn.push('glyphicon glyphicon-plus green f-ml10 innerPlus');
                    this.state.removeBtn.push('glyphicon glyphicon-remove red f-ml10 innerDel');
                }
            }
        }
        if(this.state.data['proxy_set_header']) {
            for (var i = 0; i < this.state.data['proxy_set_header'].length; i++) {
                this.state._trCou.push(1);
                if (i == 0) {
                    if (this.state.data['proxy_set_header'].length > 1) {
                        this.state._removeBtn.push('glyphicon glyphicon-remove red f-ml10 innerDel');
                        this.state._addBtn.push('')
                    } else {
                        this.state._addBtn.push('glyphicon glyphicon-plus green f-ml10 innerPlus');
                        this.state._removeBtn.push('')
                    }
                } else if (i != this.state.data['proxy_set_header'].length - 1) {
                    this.state._removeBtn.push('glyphicon glyphicon-remove red f-ml10 innerDel');
                    this.state._addBtn.push('')
                } else {
                    this.state._addBtn.push('glyphicon glyphicon-plus green f-ml10 innerPlus');
                    this.state._removeBtn.push('glyphicon glyphicon-remove red f-ml10 innerDel');
                }
            }
        }

    }
    render(){
        return(
            <table  name={'config'+this.props.index} className="table f-table nginxTable" style={this.state.style}>
                <thead>
                <tr>
                    <th style={{width: '140px'}}>配置项</th>
                    <th >配置内容</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>代理模式</td>
                    <td className="text-left"><Switch defaultChecked={this.props.agent[this.props.index-1]} className="Switch_tr"/></td>
                </tr>
                <tr className={this.state.ifshow}>
                    <td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td>
                    <td className="text-left">

                        <input style={{width: '100%'}} name={"location[proxy_pass]"+Math.random()} type="text" data-rule-required="true" data-msg-required="请填写proxy_pass"  className={this.state.ifshow.indexOf('f-hide')>-1 ? "ignore" : "" }       defaultValue={this.state.data['proxy_pass']}/></td>
                </tr>
                <tr className={this.state.ifshow}>
                    <td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td>
                    <td className="text-left"><input style={{width: '100%'}} name={"location[proxy_cache]"+Math.random()} type="text"
                                                     className={this.state.ifshow.indexOf('f-hide')>-1 ? "ignore" : "" }                    defaultValue={this.state.data['proxy_cache']}/></td>
                </tr>
                <tr className={this.state.ifshow}>
                    <td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td>
                    <td className="text-left"><input style={{width: '100%'}} name={"location[proxy_cache_key]"+Math.random()}
                                                      className={this.state.ifshow.indexOf('f-hide')>-1 ? "ignore" : "" }        type="text" defaultValue={this.state.data['proxy_cache_key']}/></td>
                </tr>
                <tr className={this.state.ifshow}>
                    <td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td>
                    <td className="text-left"><input style={{width: '100%'}} name={"location[proxy_cache_valid]"+Math.random()}
                                                       className={this.state.ifshow.indexOf('f-hide')>-1 ? "ignore" : "" }        type="text" defaultValue={this.state.data['proxy_cache_valid']}/></td>
                </tr>
                {
                    this.state._trCou.length ? this.state._trCou.map((item,index)=>
                    <tr key={index} className={this.state.ifshow +" proxy_set_header"}>
                        <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                        <td className="text-left">
                            <input style={{width: '94%'}} name={"location[proxy_set_header]"+Math.random()+index}    className={this.state.ifshow.indexOf('f-hide')>-1 ? "ignore" : "" } type="text" defaultValue={this.state.data['proxy_set_header'][index]}/>
                            <a className={this.state._addBtn[index]}></a> <a className={this.state._removeBtn[index]}></a>
                        </td>
                    </tr>)
                        :
                        <tr  className={this.state.ifshow +" proxy_set_header"}>
                        <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                        <td className="text-left">
                            <input style={{width: '94%'}} name={"location[proxy_set_header]"+Math.random()}    className={this.state.ifshow.indexOf('f-hide')>-1 ? "ignore" : "" } type="text" defaultValue={''}/>
                            <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                        </td>
                    </tr>

                }
                {
                    this.state.trCou.length ? this.state.trCou.map((item,index)=>
                        <tr key={index} className={this.state.ifshow + " add_header"}>
                            <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                            <td className="text-left">
                                <input style={{width: '94%'}} name={"location[add_header]"+Math.random()+index}   className={this.state.ifshow.indexOf('f-hide')>-1 ? "ignore" : "" } type="text" defaultValue={this.state.data['add_header'][index]}/>
                                <a className={this.state.addBtn[index]}></a> <a className={this.state.removeBtn[index]}></a>
                            </td>
                        </tr>)
                        :
                        <tr className={this.state.ifshow + " add_header"}>
                            <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                            <td className="text-left">
                                <input style={{width: '94%'}} name={"location[add_header]"+Math.random()}  className={this.state.ifshow.indexOf('f-hide')>-1 ? "ignore" : "" } type="text" defaultValue={''}/>
                                <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                            </td>
                        </tr>
                }

                <tr>
                    <td>自定义配置</td>
                    <td className="text-left"><textarea name={"location[custom_setting]"+Math.random() } data-rule-required="true" data-msg-required="请填写自定义配置"  className={this.state.ifshow.indexOf('f-hide')==-1 ? "ignore" : "" } defaultValue={this.state.data['custom_setting']} style={{width: '100%'}} rows="6"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}