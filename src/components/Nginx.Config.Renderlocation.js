import React from 'react'
import {Switch} from 'antd'
import LocationRenderConfigLi from '../components/Ngnix.Config.Renderlocation.Li.js';
import LocationRenderConfigTable from '../components/Nginx.Config.Renderlocation.Table.js';
export default class LocationRenderConfig extends React.Component{
    constructor(state){
        super(state);
        this.state={
            data:{},
            use:false,
            take_effect_levels:[
                {
                    dataname:'',
                    name:'enable',
                    value:'',
                    check:''
                },
                {
                    dataname:'',
                    name:'enable',
                    value:'',
                    check:''
                },
                {
                    dataname:'',
                    name:'enable',
                    value:'',
                    check:''
                },
                {
                    dataname:'',
                    name:'enable',
                    value:'',
                    check:''
                }
            ],
            config:[],
            table:[],
            agent:[]
        }
    }
    componentDidMount(){
       if($('.LocationGroup').find('.topRemoveBtn').length>1){
           $('.LocationGroup').find('.topRemoveBtn').css('display','');
       }else{
           $('.LocationGroup').find('.topRemoveBtn').css('display','none');
       }
    }
    componentWillMount() {
        this.state.data=this.props.data;
        if (this.state.data['use'] == 'on') {
            this.state.use = true;
        }
        for(var i=0;i<this.state.data['info'].length;i++){
            this.state.config.push(i+1);
            this.state.table.push(this.state.data['info'][i]);
            var take_effect=this.state.take_effect_levels;
            var levels=this.state.data['info'][i]['take_effect_level'];
            if(this.state.data['info'][i]['proxy_pattern']=='on'){
                this.state.agent.push(true);
            }else{
                this.state.agent.push(false);
            }
            if(levels){
                for(var j=0;j<levels.length;j++){
                    take_effect[levels[j]-1]['dataname']='config'+(i+1);
                    if(i==0){
                        take_effect[levels[j]-1]['name']="enable"
                    }else{
                        take_effect[levels[j]-1]['name']="disabled";
                    }
                    take_effect[levels[j]-1]['check']='checked';
                    take_effect[levels[j]-1]['value']="on"
                }
            }
        }
    }
    render(){
        return (
            <div data-index={this.state.data['index']} className="configNginx LocationConfig f-mt40">
                <div className="clearfix f-gradient">
                    <div className="f-caption pull-left">
                        <ul className="list-inline">
                            <li><h4>Location配置 <span className="mr10" style={{display:'inline-block',width:150,overflow:'hidden'}}>{'-'+this.state.data['name']}</span> <a  className="glyphicon glyphicon-chevron-up green upAddBtn f-ml10"></a><a  className="glyphicon glyphicon-chevron-down green downAddBtn f-ml10"></a><a  className="glyphicon glyphicon-remove red topRemoveBtn f-ml10"></a></h4></li>
                        </ul>
                    </div>
                    <div className="pull-right">
                        <span className="configTrigger" data-id="all">···</span>
                    </div>
                </div>
                <div className="Config_Content f-hide">
                    <div style={{marginBottom:'0'}} className="form-group">
                        <ul className="workGradeLoc">
                            <li><label className="text-right">location名称:</label></li>
                            <li><input name={"location[name]"+Math.random()} defaultValue={this.state.data['name']} data-rule-required="true" data-msg-required="请填写location名称"  type="text"/></li>
                            <li><Switch defaultChecked={this.state.use} onChange={this.props.UsehandleChange} /></li>
                        </ul>
                    </div>
                    <div className="form-group">
                        <ul className="workGrade">
                            <li><label className="text-right">生效层级:</label></li>
                            <li><input className="chk" data-name={this.state.take_effect_levels[3]['dataname']}   name={this.state.take_effect_levels[3]['name']} defaultValue={this.state.take_effect_levels[3]['value']} defaultChecked={this.state.take_effect_levels[3]['check']} data-val="4" type="checkbox"/><span>源站</span></li>
                            <li><input className="chk" data-name={this.state.take_effect_levels[0]['dataname']}   name={this.state.take_effect_levels[0]['name']} defaultValue={this.state.take_effect_levels[0]['value']} defaultChecked={this.state.take_effect_levels[0]['check']} data-val="1" type="checkbox"/><span>上层</span></li>
                            <li><input className="chk" data-name={this.state.take_effect_levels[1]['dataname']}   name={this.state.take_effect_levels[1]['name']} defaultValue={this.state.take_effect_levels[1]['value']} defaultChecked={this.state.take_effect_levels[1]['check']} data-val="2" type="checkbox"/><span>中转</span></li>
                            <li><input className="chk" data-name={this.state.take_effect_levels[2]['dataname']}   name={this.state.take_effect_levels[2]['name']} defaultValue={this.state.take_effect_levels[2]['value']} defaultChecked={this.state.take_effect_levels[2]['check']} data-val="3" type="checkbox"/><span>边缘</span></li>
                            <li> <a className="glyphicon glyphicon-plus green highPlusBtn"></a></li>
                        </ul>
                    </div>
                    <div className="form-group Config_Box">
                        <ul className="Config_Tab_Box">
                            {
                                this.state.config?
                                    this.state.config.map((item,index)=> <LocationRenderConfigLi key={index}  count={this.state.config.length} index={this.state.config[index]}/>):''
                            }
                        </ul>
                        <div  className="Config_Content_Box">
                            {
                                this.state.config?
                                this.state.config.map((item,index)=> <LocationRenderConfigTable key={index} agent={this.state.agent} index={this.state.config[index]} table={this.state.table}/>):''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
