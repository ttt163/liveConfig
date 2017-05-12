import React from 'react'
import { render } from 'react-dom'
import SearchTableNginx from '../components/Nginx.searchTable.js'
import NginxAdd from '../components/Nginx.addChannel.js'
import NginxEdit from '../components/Nginx.editChannel.js'
import NginxCopy from '../components/Nginx.copyChannel.js'
import NginxAssignDev from '../components/Nginx.AssignDevice.js'
import {selectie,formCheck} from "../public/js/f.js"
import { URL } from '../config.js';

export default class Nginx extends React.Component {
    constructor(state){
        super(state);
        this.state={
            channel_name:'',
            client_name:'',
            send_state:'',
            reload_state:'',
        }
    }
    componentWillMount(){
        if(localStorage.loginInfo==undefined){
            localStorage.loginInfo=JSON.stringify({'loginStatus':false});
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }else{
            var data=JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }else if(data.role=='设备运维'){
                window.location.href='#/device'
            }
        }
    }
    componentDidMount(){
        selectie($('#nginxForm').find('select'));
        $.ajax({
            url:URL+'/GetAllClientAndChannel',
            type:'get',
            success:function (data) {
                var datas=JSON.parse(data);
                if(datas.info.status='success'){
                    var _data=datas.info['data'];
                    //console.log(_data);
                    $('#nginxForm').data('data',JSON.stringify(_data));
                    var $channel=$('#nginxForm').find('select[name="channel_name"]'),
                        $client=$('#nginxForm').find('select[name="client_name"]'),
                        _client=['<option value="">全部</option>'],
                        _channel=['<option value="">全部</option>'],
                        client=[],channel=[];
                    for(var i=0;i<_data.length;i++){
                        client.push(_data[i]['client_name']);
                        channel.push(_data[i]['channel_name'])
                    }
                    var _clients=$.unique(client);
                    for(var i=0;i<_clients.length;i++){
                        _client.push('<option value="'+_clients[i]+'">'+_clients[i]+'</option>');
                    }
                    var _channels=$.unique(channel);
                    for(var i=0;i<_channels.length;i++){
                        _channel.push('<option value="'+_channels[i]+'">'+_channels[i]+'</option>');
                    }
                    $client.html(_client);
                    $channel.html(_channel);
                    $client.trigger('chosen:updated');
                    $channel.trigger('chosen:updated');
                    $client.on('change',function(){
                        var data=JSON.parse($('#nginxForm').data('data')),channels=[],_channels,  _channel=['<option value="">全部</option>'];
                        for(var i=0;i<data.length;i++){
                            if(data[i]['client_name'] == $(this).val()){
                                channels.push(_data[i]['channel_name']);
                            }else if($(this).val()=="全部"){
                                channels.push(_data[i]['channel_name']);
                            }
                        }
                        _channels=$.unique(channels);
                        for(var i=0;i<_channels.length;i++){
                            if(_channels[i]!=undefined){
                                _channel.push('<option value="'+_channels[i]+'">'+_channels[i]+'</option>');
                            }
                        }
                        $channel.html(_channel);
                        $channel.trigger('chosen:updated');
                    });
                    $channel.on('change',function(){
                        var data=JSON.parse($('#nginxForm').data('data')),clients=[],_clients,_client=['<option value="">全部</option>'],flag;
                        for(var i=0;i<data.length;i++){
                            clients.push(_data[i]['client_name']);
                            if(data[i]['channel_name'] == $(this).val()){
                                flag=_data[i]['client_name'];
                            }
                        }
                        _clients=$.unique(clients);
                        for(var i=0;i<_clients.length;i++){
                            if(_clients[i]!=undefined){
                                if(flag==_clients[i]){
                                    _client.push('<option selected value="'+_clients[i]+'">'+_clients[i]+'</option>');
                                }else{
                                    _client.push('<option value="'+_clients[i]+'">'+_clients[i]+'</option>');
                                }
                            }
                        }
                        $client.html(_client);
                        $client.trigger('chosen:updated');
                    });

                }
            }
        });
        $('#devreset').on('click',function(){
                $('#nginxForm').find('select').val('');
                $('#nginxForm').find('select').trigger('chosen:updated');
        });
    }
    AddChannel(e){
            var $addModel = $('#f-addChannel-modal'); //添加模态框
            $addModel.modal('show');
        //模态框消失刷新
        $addModel.on('hide.bs.modal', function () {
            window.location.reload(true);
        });
        var rules={
                'customer':{
                    required:true,
                    customer:true
                },
                'channel':{
                    required:true,
                    geturl:true
                }
            },
            msg={
                'customer':{
                    required:'请填写客户名称'
                },
                'channel':{
                    required:'请填写频道名称'
                }
            }
        formCheck('#Channel_add',rules,msg,'/SendChannelConfig','addChannel');
        e.stopPropagation();
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <form  id="nginxForm">
                    <div className="searBox">
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>客户名称:</label>
                                <div className="inpt resChosen">
                                    <select className="form-control searchdrop" name="client_name" ></select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>下发状态:</label>
                                <div className="inpt resChosen">
                                    <select name="send_state" className="form-control searchdrop">
                                        <option value="">请选择</option>
                                        <option value="2">无状态</option>
                                        <option value="0">失败</option>
                                        <option value="1">成功</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>频道名称:</label>
                                <div className="inpt resChosen">
                                    <select className="form-control searchdrop" name="channel_name" >
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>Reload状态:</label>
                                <div className="inpt resChosen">
                                    <select name="reload_state" className="form-control searchdrop">
                                        <option value="">请选择</option>
                                        <option value="2">无状态</option>
                                        <option value="0">失败</option>
                                        <option value="1">成功</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="resgrid">
                                <label>Delete状态:</label>
                                <div className="inpt resChosen">
                                    <select name="delete_state" className="form-control searchdrop">
                                        <option value="">请选择</option>
                                        <option value="2">无状态</option>
                                        <option value="0">失败</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 text-center">
                            <a id="SearchBtn" className="btn btn-submit">查询</a>
                            <a  className="btn btn-reset mleft" id="devreset">重置</a>
                        </div>
                    </div>
                </form>
                <div className="table-box" style={{height:'auto', minHeight:'0px'}}>
                    <div className="clearfix f-gradient">
                        <div className="f-caption pull-left">
                            <ul className="list-inline">
                                <li><h4>频道列表</h4></li>
                                <li>每页显示
                                    <div className="numSelect _pagesizeReset">

                                    </div>
                                    个
                                </li>
                                <li className="f-count">共<i></i>条</li>
                            </ul>
                        </div>
                        <div className="pull-right">
                            <button type="button" className="btn  btn-small" onClick={this.AddChannel} >添加频道</button>
                            <button type="button" className="btn  btn-small" id="SendAllNginx" data-id="all">重新下发</button>
                        </div>
                    </div>
                    <SearchTableNginx data={this.state.data}/>
                    </div>
                <NginxAdd/>
                <NginxEdit/>
                <NginxCopy/>
                <NginxAssignDev/>
            </div>
        )
    }
}
