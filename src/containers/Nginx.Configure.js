import React from 'react'
import { render } from 'react-dom'
import {BackTop,Switch} from 'antd'
import {Nginx_Add_Model,Nginx_Add_baseConfig,getJsonLength,getParam,getdevGroup,CacheRender,ServerRender,formCheck,cuntom_source_station_Render,addOperation} from "../public/js/f.js"
import { Link,IndexLink,browserHistory } from 'react-router';
import LocationRenderConfig from '../components/Nginx.Config.Renderlocation.js'
import {URL,PROVICES,OPERATORS} from '../config.js'
export default class NginxConfig extends React.Component {
    constructor(state){
        super (state);
        this.state=({
            location:[],
            RenderLocation:[],
            data:{},
            count:0,
            _index:0,
            Status302:false,
            take_effect:'on'
        });
    }
    SubmitClickHandler(){
        $('#Nginx_Configure_Form').submit();
    }
    BackClickHandler(){
        var _this=this;
        window.Modal.confirm({
            msg: '确认要回退此配置吗？',
            title: '回退',
            btnok: "确定",
            btncl: "取消"
        }).on(function(e) {
            var data={};
            data.channel_name=$('#channel_name').text();
            data.type='nginx';
            if(e){
                $.ajax({
                url:URL+'/BackConfig',
                data:JSON.stringify(data),
                type:'post',
                success:function(data){
                    var data= JSON.parse(data),ids={};
                    //console.log(data);
                    if(data.info['data']){
                        _this.state.take_effect='off';
                        var datas=data.info['data'];
                        ids.devs_group_id=datas['devs_group_id'];
                        ids.cluster_id=datas['cluster_id'];
                        ids.topology_id=datas['topology_id'];
                        //获取源站设备组，拓扑结构，集群列表
                        getdevGroup('#dev_group','#topology','#cluster',ids);
                        $('#channel_name').html(datas['channel_name']);
                        $('#client_name').val(datas['client_name']);
                        $('#channel_id').val(datas['channel_id']);
                        $('#source_station_type').val(datas['source_station_type']);
                        /*if(datas['source_station_type']==2){
                            $('.custom').removeClass('f-hide');
                            $('#gosun').addClass('f-hide');

                        }
                        if(datas['client_devs_group']&&getJsonLength(datas['client_devs_group'])>0){
                            $('.custom').find('.Isp_Box').remove();
                            cuntom_source_station_Render(datas['client_devs_group']);
                        }*/
                        if(datas['source_station_type']==2){
                            $('.custom').removeClass('f-hide');
                            $('#gosun').addClass('f-hide');
                        }else{
                            $('.custom').find('input[name^="defaultIp"]').addClass('ignore');
                            $('.custom').find('input[name^="defaultIpd"]').addClass('ignore');
                            $('.custom').find('input[name^="defaultIpP"]').addClass('ignore');
                        }
                        if(datas['client_devs_group']&&getJsonLength(datas['client_devs_group'])>0){
                            $('.custom').find('.Isp_Box').remove();
                            cuntom_source_station_Render(datas['client_devs_group']);
                        }
                        for(var i=0;i<$('select[name="isp"]').length;i++){
                            var isp=$('select[name="isp"]')[i];
                            if($(isp).val()!='0'){
                                var ip=$(isp).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                            }
                        }
                        for(var i=0;i<$('select[name="area"]').length;i++){
                            var area=$('select[name="area"]')[i];
                            if($(area).val()!='0'){
                                var ip=$(area).closest('.province_Box').find('input[name^="defaultIpP"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                            }
                        }
                        //运营商监听
                        $('select[name="isp"]').on('change',function(){
                            if($(this).val()!='0'){
                                var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                                $(ip).removeClass('ignore');
                            }else{
                                var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).addClass('ignore');
                            }
                        });
                        //省份监听
                        $('select[name="area"]').on('change',function(){
                            if($(this).val()!='0'){
                                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                                $(ip).removeClass('ignore');
                            }else{
                                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                                $(ip).addClass('ignore');
                            }
                        });

                        //Location渲染
                        var location=_this.state.RenderLocation;
                        var _datas=datas['set_data']['location'];
                        $('.LocationGroup').html('');
                        for(var i=0;i<_datas.length;i++){
                            location.push(1);
                            _this.setState({
                                RenderLocation:location,
                                data:_datas[i],
                                count:_datas.length,
                                _index:i
                            });
                        }
                        //302渲染
                        if(datas['set_data']['302use']=='on'){
                            _this.setState({
                                Status302:true
                            })
                        }
                        //Cache渲染
                        CacheRender(datas['set_data']['cache']);
                        //Server渲染
                        ServerRender(datas['set_data']['server']);
                        //初始化动态加载
                        new Nginx_Add_Model($('.CacheConfig').find('.highPlusBtn'),$('.CacheConfig'));
                        new Nginx_Add_Model($('.UpstreamConfig').find('.highPlusBtn'),$('.UpstreamConfig'));
                        for(var i=0;i<$('.LocationConfig').length;i++){
                            new Nginx_Add_Model($($('.LocationConfig')[i]).find('.highPlusBtn'),$($('.LocationConfig')[i]));
                        }
                        //操作记录
                        addOperation('回退'+$('#channel_name').text()+'的上一次配置');
                    }else{
                        window.location.href='#/nginx'
                    }
                }
            })
            }
        });
    }
    LastestClickHandler(){
        var _this=this;
        window.Modal.confirm({
            msg: '确认要加载此配置的最新配置吗？',
            title: '最新',
            btnok: "确定",
            btncl: "取消"
        }).on(function(e) {
            var data={};
            data.channel_name=$('#channel_name').text();
            data.type='nginx';
            if(e){
                $.ajax({
                url:URL+'/NewestSet',
                data:JSON.stringify(data),
                type:'post',
                success:function(data){
                    var data= JSON.parse(data),ids={};
                   // console.log(data);
                    if(data.info['data']){
                        _this.state.take_effect='off';
                        var datas=data.info['data'];
                        ids.devs_group_id=datas['devs_group_id'];
                        ids.cluster_id=datas['cluster_id'];
                        ids.topology_id=datas['topology_id'];
                        //获取源站设备组，拓扑结构，集群列表
                        getdevGroup('#dev_group','#topology','#cluster',ids);
                        $('#channel_name').html(datas['channel_name']);
                        $('#client_name').val(datas['client_name']);
                        $('#channel_id').val(datas['channel_id']);
                        $('#source_station_type').val(datas['source_station_type']);/*
                        if(datas['source_station_type']==2){
                            $('.custom').removeClass('f-hide');
                            $('#gosun').addClass('f-hide');
                        }
                        if(datas['client_devs_group']&&getJsonLength(datas['client_devs_group'])>0){
                            $('.custom').find('.Isp_Box').remove();
                            cuntom_source_station_Render(datas['client_devs_group']);
                        }*/

                        if(datas['source_station_type']==2){
                            $('.custom').removeClass('f-hide');
                            $('#gosun').addClass('f-hide');
                        }else{
                            $('.custom').find('input[name^="defaultIp"]').addClass('ignore');
                            $('.custom').find('input[name^="defaultIpd"]').addClass('ignore');
                            $('.custom').find('input[name^="defaultIpP"]').addClass('ignore');
                        }
                        if(datas['client_devs_group']&&getJsonLength(datas['client_devs_group'])>0){
                            $('.custom').find('.Isp_Box').remove();
                            cuntom_source_station_Render(datas['client_devs_group']);
                        }
                        for(var i=0;i<$('select[name="isp"]').length;i++){
                            var isp=$('select[name="isp"]')[i];
                            if($(isp).val()!='0'){
                                var ip=$(isp).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                            }
                        }
                        for(var i=0;i<$('select[name="area"]').length;i++){
                            var area=$('select[name="area"]')[i];
                            if($(area).val()!='0'){
                                var ip=$(area).closest('.province_Box').find('input[name^="defaultIpP"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                            }
                        }
                        //运营商监听
                        $('select[name="isp"]').on('change',function(){
                            if($(this).val()!='0'){
                                var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                                $(ip).removeClass('ignore');
                            }else{
                                var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).addClass('ignore');
                            }
                        });
                        //省份监听
                        $('select[name="area"]').on('change',function(){
                            if($(this).val()!='0'){
                                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                                $(ip).removeClass('ignore');
                            }else{
                                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                                $(ip).addClass('ignore');
                            }
                        });

                        //Location渲染
                        var location=_this.state.RenderLocation;
                        var _datas=datas['set_data']['location'];
                        $('.LocationGroup').html('');
                        for(var i=0;i<_datas.length;i++){
                            location.push(1);
                            _this.setState({
                                RenderLocation:location,
                                data:_datas[i],
                                count:_datas.length,
                                _index:i
                            });
                        }
                        //302渲染
                        if(datas['set_data']['302use']=='on'){
                            _this.setState({
                                Status302:true
                            })
                        }
                        //Cache渲染
                        CacheRender(datas['set_data']['cache']);
                        //Server渲染
                        ServerRender(datas['set_data']['server']);
                        //初始化动态加载
                        new Nginx_Add_Model($('.CacheConfig').find('.highPlusBtn'),$('.CacheConfig'));
                        new Nginx_Add_Model($('.UpstreamConfig').find('.highPlusBtn'),$('.UpstreamConfig'));
                        for(var i=0;i<$('.LocationConfig').length;i++){
                            new Nginx_Add_Model($($('.LocationConfig')[i]).find('.highPlusBtn'),$($('.LocationConfig')[i]));
                        }
                        //操作记录
                        addOperation('获取'+$('#channel_name').text()+'的最新配置');
                    }else{
                        window.location.href='#/nginx'
                    }
                }
            })
            }
        });
    }
    componentWillMount(){
        //是否登录
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
    componentDidUpdate(){
        $('.configTrigger').off('click');
        $('.configTrigger').on('click',function(){
            if($(this).closest('.configNginx').find('.Config_Content').hasClass('f-hide')){
                $(this).closest('.configNginx').find('.Config_Content').removeClass('f-hide');
            }else{
                $(this).closest('.configNginx').find('.Config_Content').addClass('f-hide');
            }
        });
        /*
             控制Location代理模式开关
         */
        var grades=$('.LocationGroup').find('.workGrade');
        for(var i=0;i<grades.length;i++){
            var chk=$(grades[i]).find('.chk')[0];
            var table= $(grades[i]).closest('.LocationConfig').find('table[name="'+$(chk).attr('data-name')+'"]');
            //初始化代理模式状态
            $(table).find('.Switch_tr').addClass('ant-switch-disabled');
        }

        $('.chk').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
        });
        $($('.topRemoveBtn').last()).on('click',function(){
            var _this=this;
            window.Modal.confirm({
                msg: '确认要删除此配置吗？',
                title: '删除',
                btnok: "确定",
                btncl: "取消"
            }).on(function(e) {
                if (e) {
                    if($('form').find('.LocationConfig').length==2){
                        $('.topRemoveBtn').css('display','none');
                    }
                    $(_this).closest('.configNginx').remove();
                }
            });

        });
        $($('.Switch_tr').last()).on('click',function(e){
            if(!($(this).hasClass('ant-switch-disabled'))){
                if($(this).hasClass('ant-switch-checked')){
                    $(this).removeClass('ant-switch-checked');
                    var tr_triggers=$(this).closest('table').find('.tr_trigger');
                    $(tr_triggers).addClass('f-hide');
                    for(var i=0;i<tr_triggers.length;i++){
                        $(tr_triggers[i]).find('input').addClass('ignore');
                    }
                    $(this).closest('table').find('textarea').removeClass('ignore');
                }else{
                    $(this).addClass('ant-switch-checked');
                    var tr_triggers=$(this).closest('table').find('.tr_trigger');
                    $(tr_triggers).removeClass('f-hide');
                    for(var i=0;i<tr_triggers.length;i++){
                        $(tr_triggers[i]).find('input').removeClass('ignore');
                    }
                    $(this).closest('table').find('textarea').addClass('ignore');

                }
            }
            e.stopPropagation();
            e.preventDefault();
        });
        if($('.LocationConfig').length>1){
            new Nginx_Add_Model($($('.LocationConfig').last()).find('.highPlusBtn'),$($('.LocationConfig').last()));
        }
    }
    componentDidMount(){
        $('.chk').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
        });
       new Nginx_Add_baseConfig('.custom');
        //原站设备组监听
        $('#source_station_type').on('change',function(){
           if($(this).val()=='1'){
               $('#gosun').removeClass('f-hide');
               $('.custom').addClass('f-hide');
               $('.custom').find('input[name^="defaultIp"]').addClass('ignore');
               $('.custom').find('input[name^="defaultIpd"]').addClass('ignore');
               $('.custom').find('input[name^="defaultIpP"]').addClass('ignore');
               $('#gosun').find('select[name="dev_group"]').removeClass('ignore');
               $('#gosun').find('select[name="topology"]').removeClass('ignore');
           } else {
               $('.custom').removeClass('f-hide');
               $('#gosun').addClass('f-hide');
               $('.custom').find('input[name^="defaultIp"]').removeClass('ignore');
               $('#gosun').find('select[name="dev_group"]').addClass('ignore');
               $('#gosun').find('select[name="topology"]').addClass('ignore');
           }
        });
        //运营商监听
        $('select[name="isp"]').on('change',function(){
            if($(this).val()!='0'){
                var ip=$(this).closest('.Isp_Box').find('input[name="defaultIpd"]')[0];
                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                $(ip).removeClass('ignore');
            }else{
                var ip=$(this).closest('.Isp_Box').find('input[name="defaultIpd"]')[0];
                $(ip).addClass('ignore');
            }
        });
        //省份监听
        $('select[name="area"]').on('change',function(){
            if($(this).val()!='0'){
                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                $(ip).removeClass('ignore');
            }else{
                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                $(ip).addClass('ignore');
            }
        });
        var $area=$('.custom').find('select[name="area"]'),$isp=$('.custom').find('select[name="isp"]'),provs=['<option value="0">请选择</option>'],isps=['<option value="0">请选择</option>'];
        for(var x in PROVICES) {
            provs.push('<option value="'+x+'">'+PROVICES[x]+'</option>');
        }
        for(var x in OPERATORS) {
            isps.push('<option value="'+x+'">'+OPERATORS[x]+'</option>');
        }
        for(var i=0;i<$area.length;i++){
            $($area[i]).html(provs);
        }
        for(var i=0;i<$isp.length;i++){
            $($isp[i]).html(isps);
        }
        //获取频道配置信息
        var sendChanneldata={};
        sendChanneldata.query={};
        var _this=this;
        if(window.location.href.indexOf('_id')>0){
            sendChanneldata.query._id=getParam(window.location.href,'channel_id');
            $('#config_id').val(sendChanneldata.query._id);
            sendChanneldata=JSON.stringify(sendChanneldata);
            $.ajax({
                url: `${URL}/GetNginxConfig`,
                data:sendChanneldata,
                type:'post',
                success:function (data) {
                    var data= JSON.parse(data),ids={};
                   // console.log(data);
                    if(data.info['data']){
                        _this.state.take_effect='off';
                        var datas=data.info['data'];
                        ids.devs_group_id=datas[0]['devs_group_id'];
                        ids.cluster_id=datas[0]['cluster_id'];
                        ids.topology_id=datas[0]['topology_id'];
                        //获取源站设备组，拓扑结构，集群列表
                        getdevGroup('#dev_group','#topology','#cluster',ids);
                        $('#channel_name').html(datas[0]['channel_name']);
                        $('#client_name').val(datas[0]['client_name']);
                        $('#channel_id').val(datas[0]['channel_id']);
                        $('#source_station_type').val(datas[0]['source_station_type']);
                        if(datas[0]['source_station_type']==2){
                            $('.custom').removeClass('f-hide');
                            $('#gosun').addClass('f-hide');
                            $('#gosun').find('select[name="dev_group"]').addClass('ignore');
                            $('#gosun').find('select[name="topology"]').addClass('ignore');
                        }else{
                            $('.custom').find('input[name^="defaultIp"]').addClass('ignore');
                            $('.custom').find('input[name^="defaultIpd"]').addClass('ignore');
                            $('.custom').find('input[name^="defaultIpP"]').addClass('ignore');
                        }
                        if(datas[0]['client_devs_group']&&getJsonLength(datas[0]['client_devs_group'])>0){
                            $('.custom').find('.Isp_Box').remove();
                            cuntom_source_station_Render(datas[0]['client_devs_group']);
                        }
                        for(var i=0;i<$('select[name="isp"]').length;i++){
                            var isp=$('select[name="isp"]')[i];
                            if($(isp).val()!='0'){
                                var ip=$(isp).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                            }
                        }
                        for(var i=0;i<$('select[name="area"]').length;i++){
                            var area=$('select[name="area"]')[i];
                            if($(area).val()!='0'){
                                var ip=$(area).closest('.province_Box').find('input[name^="defaultIpP"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                            }
                        }
                        //运营商监听
                        $('select[name="isp"]').on('change',function(){
                            if($(this).val()!='0'){
                                var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                                $(ip).removeClass('ignore');
                            }else{
                                var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).addClass('ignore');
                            }
                        });
                        //省份监听
                        $('select[name="area"]').on('change',function(){
                            if($(this).val()!='0'){
                                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                                $(ip).removeClass('ignore');
                            }else{
                                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                                $(ip).addClass('ignore');
                            }
                        });
                        //Location渲染
                        var location=_this.state.RenderLocation;
                        var _datas=datas[0]['set_data']['location'];
                        $('.LocationGroup').html('');
                        for(var i=0;i<_datas.length;i++){
                            location.push(1);
                            _this.setState({
                                RenderLocation:location,
                                data:_datas[i],
                                count:_datas.length,
                                _index:i
                            });
                        }
                        //302渲染
                        if(datas[0]['set_data']['302use']=='on'){
                            _this.setState({
                                Status302:true
                            })
                        }
                        //Cache渲染
                        CacheRender(datas[0]['set_data']['cache']);
                        //Server渲染
                        ServerRender(datas[0]['set_data']['server']);
                        //初始化动态加载
                        new Nginx_Add_Model($('.CacheConfig').find('.highPlusBtn'),$('.CacheConfig'));
                        new Nginx_Add_Model($('.UpstreamConfig').find('.highPlusBtn'),$('.UpstreamConfig'));
                        for(var i=0;i<$('.LocationConfig').length;i++){
                            new Nginx_Add_Model($($('.LocationConfig')[i]).find('.highPlusBtn'),$($('.LocationConfig')[i]));
                        }
                        var chks=$('.LocationGroup').find('.workGrade').find('.chk');
                        for(var i=0;i<chks.length;i++){
                            if($(chks[i]).attr('name')=='disabled'){
                                $(chks[i]).iCheck('disable');
                            }
                        }
                        //tooltip初始化
                        $("[data-toggle='tooltip']").tooltip();
                    }else{
                        window.location.href='#/nginx'
                    }
                }
            });
        }else if(window.location.href.indexOf('_copy')>0){
            sendChanneldata.query._id=getParam(window.location.href,'channelId');
            sendChanneldata=JSON.stringify(sendChanneldata);
            $.ajax({
                url: `${URL}/GetNginxConfig`,
                data:sendChanneldata,
                type:'post',
                success:function (data) {
                    var data= JSON.parse(data),ids={};
                    //console.log(data);
                    if(data.info['data']){
                        var datas=data.info['data'];
                        ids.devs_group_id=datas[0]['devs_group_id'];
                        ids.cluster_id=datas[0]['cluster_id'];
                        ids.topology_id=datas[0]['topology_id'];
                        //获取源站设备组，拓扑结构，集群列表
                        getdevGroup('#dev_group','#topology','#cluster',ids);
                        $('#channel_name').html(getParam(window.location.href,'_copy_channel_name'));
                        $("#channel_id").val(getParam(window.location.href,'newchannelId'));
                        $('#source_station_type').val(datas[0]['source_station_type']);
                        if(datas[0]['source_station_type']==2){
                            $('.custom').removeClass('f-hide');
                            $('#gosun').addClass('f-hide');
                            $('#gosun').find('select[name="dev_group"]').addClass('ignore');
                            $('#gosun').find('select[name="topology"]').addClass('ignore');
                        }else{
                            $('.custom').find('input[name^="defaultIp"]').addClass('ignore');
                            $('.custom').find('input[name^="defaultIpd"]').addClass('ignore');
                            $('.custom').find('input[name^="defaultIpP"]').addClass('ignore');
                        }
                        if(datas[0]['client_devs_group']&&getJsonLength(datas[0]['client_devs_group'])>0){
                            $('.custom').find('.Isp_Box').remove();
                            cuntom_source_station_Render(datas[0]['client_devs_group']);
                        }
                        for(var i=0;i<$('select[name="isp"]').length;i++){
                            var isp=$('select[name="isp"]')[i];
                            if($(isp).val()!='0'){
                                var ip=$(isp).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                            }
                        }
                        for(var i=0;i<$('select[name="area"]').length;i++){
                            var area=$('select[name="area"]')[i];
                            if($(area).val()!='0'){
                                var ip=$(area).closest('.province_Box').find('input[name^="defaultIpP"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                            }
                        }
                        //运营商监听
                        $('select[name="isp"]').on('change',function(){
                            if($(this).val()!='0'){
                                var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                                $(ip).removeClass('ignore');
                            }else{
                                var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
                                $(ip).addClass('ignore');
                            }
                        });
                        //省份监听
                        $('select[name="area"]').on('change',function(){
                            if($(this).val()!='0'){
                                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                                $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                                $(ip).removeClass('ignore');
                            }else{
                                var ip=$(this).closest('.province_Box').find('input[name="defaultIpP"]')[0];
                                $(ip).addClass('ignore');
                            }
                        });
                        //更改md5值
                        let original_md5=$.md5(data.info.data[0]['channel_name']);
                        let d=data.info.data[0]['set_data'];
                        for(var x in d){
                            if(x=='cache'){
                                (d[x]).map(function(v){
                                    v.cache_son.map(function(i){
                                        for(var e in i ){
                                            if(i[e]&&(i[e]).indexOf(original_md5)>-1){
                                                i[e] = (i[e]).replace(original_md5,$.md5($('#channel_name').text()));
                                            }
                                        }
                                    })
                                });
                            }
                            if(x=='location'){
                                (d[x]).map(function(v){
                                    if(v.name.indexOf(original_md5)>-1){
                                        v.name = v.name.replace(original_md5,$.md5($('#channel_name').text()));
                                    }
                                    v.info.map(function(val){
                                        for(var x in val){
                                            if((val[x])&&(val[x]).indexOf(original_md5)>-1){
                                                val[x]=(val[x]).replace(original_md5,$.md5($('#channel_name').text()));
                                            }
                                        }
                                    })
                                })
                            }
                            if(x=='server'){
                                d[x].map(function(v){
                                    for( var e in v){
                                       if(v[e]&&(v[e]).indexOf(original_md5)>-1){
                                           v[e] = (v[e]).replace(original_md5,$.md5($('#channel_name').text()));
                                       }
                                    }
                                })
                            }
                        }
                        //Location渲染
                        var location=_this.state.RenderLocation;
                        var _datas=datas[0]['set_data']['location'];
                        $('.LocationGroup').html('');
                        for(var i=0;i<_datas.length;i++){
                            location.push(1);
                            _this.setState({
                                RenderLocation:location,
                                data:_datas[i],
                                count:_datas.length,
                                _index:i
                            });
                        }
                        //Cache渲染
                        CacheRender(datas[0]['set_data']['cache']);
                        //Server渲染
                        ServerRender(datas[0]['set_data']['server']);
                        //302渲染
                        if(datas[0]['set_data']['302use']=='on'){
                            _this.setState({
                                Status302:true
                            })
                        }
                        //初始化动态加载
                        new Nginx_Add_Model($('.CacheConfig').find('.highPlusBtn'),$('.CacheConfig'));
                        new Nginx_Add_Model($('.UpstreamConfig').find('.highPlusBtn'),$('.UpstreamConfig'));
                        for(var i=0;i<$('.LocationConfig').length;i++){
                            new Nginx_Add_Model($($('.LocationConfig')[i]).find('.highPlusBtn'),$($('.LocationConfig')[i]));
                        }
                        var chks=$('.LocationGroup').find('.workGrade').find('.chk');
                        for(var i=0;i<chks.length;i++){
                            if($(chks[i]).attr('name')=='disabled'){
                                $(chks[i]).iCheck('disable');
                            }
                        }
                        //tooltip初始化
                        $("[data-toggle='tooltip']").tooltip();
                    }else{
                        window.location.href='#/nginx'
                    }
                }
            });
        }else {
            if($('.f-page').attr('data-new')=='1'){
                $('.f-page').attr('data-new','0');
                window.location.reload(true);
            }
            $('#channel_name').html(getParam(window.location.href,'channel_name'));
            $("#channel_id").val(getParam(window.location.href,'newchannelId'));
            var ids={};
            ids.devs_group_id='';
            ids.cluster_id='';
            ids.topology_id='';
            getdevGroup('#dev_group','#topology','#cluster',ids);
            var proxy_cache_path=$('.CacheConfig').find('input[name^="Cache\[proxy_cache_path\]"]');
            var keys_zone_befor=$('.CacheConfig').find('input[name^="Cache\[keys_zone_befor\]"]');
            $(proxy_cache_path[0]).val('/tmp/cdn/scache/'+$.md5($('#channel_name').text())+'_ts');
            $(keys_zone_befor[0]).val($.md5($('#channel_name').text())+'_ts');
            $(proxy_cache_path[1]).val('/tmp/cdn/scache/'+$.md5($('#channel_name').text())+'_m3u8');
            $(keys_zone_befor[1]).val($.md5($('#channel_name').text())+'_m3u8');
            var upstreams=$('.UpstreamConfig').find('span[name^="Server\[upstream\]"]');
            for(var i=0;i<upstreams.length;i++){
                $(upstreams[i]).html($.md5($('#channel_name').text()));
                $($('.UpstreamConfig').find('span[name^="Server\[server\]"]')[i]).html($('#channel_name').text())
            }
            var check=$('.UpstreamConfig').find('.workGrade').find('input')[0];
            $('.UpstreamConfig').find('table[name="'+$(check).attr('data-name')+'"]').find('span[name^="Server\[upstream\]"]').text('');
            var $location_table=$($($('.LocationConfig')[1]).find('table')[0]),
                $location2_table1=$($($('.LocationConfig')[2]).find('table')[0]),
                $location2_table2=$($($('.LocationConfig')[2]).find('table')[1]);
            $location_table.find('input[name^="location\[proxy_pass\]"]').val('http://'+$.md5($('#channel_name').text()));
            $location_table.find('input[name^="location\[proxy_cache\]"]').val($.md5($('#channel_name').text())+'_ts');
            $($location_table.find('input[name^="location\[proxy_set_header\]"]')[0]).val('Host '+$('#channel_name').text());
            $location2_table1.find('input[name^="location\[proxy_pass\]"]').val('http://'+$.md5($('#channel_name').text()));
            $location2_table1.find('input[name^="location\[proxy_cache\]"]').val($.md5($('#channel_name').text())+'_m3u8');
            $($location2_table1.find('input[name^="location\[proxy_set_header\]"]')[0]).val('Host '+$('#channel_name').text());
            $location2_table2.find('input[name^="location\[proxy_pass\]"]').val('http://'+$.md5($('#channel_name').text()));
            $($location2_table2.find('input[name^="location\[proxy_set_header\]"]')[0]).val('Host '+$('#channel_name').text());
            //初始化动态加载
            new Nginx_Add_Model($('.CacheConfig').find('.highPlusBtn'),$('.CacheConfig'));
            new Nginx_Add_Model($('.UpstreamConfig').find('.highPlusBtn'),$('.UpstreamConfig'));
            for(var i=0;i<$('.LocationConfig').length;i++){
                new Nginx_Add_Model($($('.LocationConfig')[i]).find('.highPlusBtn'),$($('.LocationConfig')[i]));
            }
            //tooltip初始化
            $("[data-toggle='tooltip']").tooltip();
        }

        //proxy_pass 默认值
        var proxy_pass=$('input[name^="location\[proxy_pass\]"]');
        for(var i=0;i<proxy_pass.length;i++){
            $(proxy_pass[i]).val('http://'+$.md5($('#channel_name').text()));
        }
        //页面滚动事件
        $(document).on('scroll',function () {
            var top_height = document.documentElement.scrollTop || document.body.scrollTop;
            if (top_height>40){
                $('#top_guide').addClass('Config_fixed');
            }else{
                $('#top_guide').removeClass('Config_fixed');
            }
        });
        //模块Trigger
        $('.configTrigger').on('click',function(){
            if($(this).closest('.configNginx').find('.Config_Content').hasClass('f-hide')){
                $(this).closest('.configNginx').find('.Config_Content').removeClass('f-hide');
            }else{
                $(this).closest('.configNginx').find('.Config_Content').addClass('f-hide');
            }
        });
        $('.topRemoveBtn').on('click',function(){
            var _this=this;
            window.Modal.confirm({
                msg: '确认要删除此配置吗？',
                title: '删除',
                btnok: "确定",
                btncl: "取消"
            }).on(function(e) {
                if (e) {
                    $(_this).closest('.configNginx').remove();
                   /* $('form').find('.topPlusBtn').css('display','none');
                    $($('form').find('.topPlusBtn')[$('form').find('.topPlusBtn').length-1]).css('display','');*/
                }
            });
        });
        /*
         控制Location代理模式开关
         */
        var grades=$('.LocationGroup').find('.workGrade');
        for(var i=0;i<grades.length;i++){
            var chk=$(grades[i]).find('.chk')[0];
            var table= $(grades[i]).closest('.LocationConfig').find('table[name="'+$(chk).attr('data-name')+'"]');
            //初始化代理模式状态
            $(table).find('.Switch_tr').addClass('ant-switch-disabled');
        }
        /*$('.Switch_tr').on('click',function(e){
            if(!($(this).hasClass('ant-switch-disabled'))){
                if($(this).hasClass('ant-switch-checked')){
                    $(this).closest('table').find('.tr_trigger').addClass('f-hide');
                }else{
                    $(this).closest('table').find('.tr_trigger').removeClass('f-hide');
                }
            }
            e.stopPropagation();
            e.preventDefault();
        });*/
        var rules={
                defaultIp:{
                    required:true
                },
                defaultIp_class:{
                    required:true
                },
                topology:{
                    required:true
                },
                dev_group:{
                    required:true
                },
                cluster:{
                    required:true
                }
            },
            msg={
                defaultIp:{
                    required:"请填写默认IP"
                },
                defaultIp_class:{
                    required:'请选择类型'
                },
                topology:{
                    required:'请选择拓扑结构'
                },
                dev_group:{
                    required:'请选择设备组'
                },
                cluster:{
                    required:'请选择集群'
                }
            };
        //formcheck init
       formCheck('#Nginx_Configure_Form',rules,msg,'/SendNginxConfig','nginxConfig',true);
    }
    CancelClickHandler(){
        window.location.href='#/nginx'
    }
    /*topAddClick(){
        if($('form').find('.LocationConfig').length==1){
            $($('form').find('.topRemoveBtn')[0]).css('display','');
        }
        var location=this.state.location;
        location.push(1);
        this.setState({
            location:location,
            count:2,
            _index:2
        });
        //模块Trigger
        $('.configTrigger').on('click',function(){
            if($(this).closest('.configNginx').find('.Config_Content').hasClass('f-hide')){
                $(this).closest('.configNginx').find('.Config_Content').removeClass('f-hide');
            }else{
                $(this).closest('.configNginx').find('.Config_Content').addClass('f-hide');
            }
        });
    }*/
    UsehandleChange(checked){
        if(checked){
            console.log('true');
        }else{
            console.log('false');
        }
    }
    handleChange302(){
        this.setState({
            Status302:!this.state.Status302
        })
    }
    render(){
        return(
            <form  className="configNginx-box form-horizontal" id="Nginx_Configure_Form">
                <input type="hidden" name="config_id" id="config_id"/>
                <input type="hidden" name="channel_id" id="channel_id"/>
                <input type="hidden" name="client_name" id="client_name"/>
                <div className="clearfix f-gradient" id="top_guide">
                    <div className="f-caption pull-left">
                        <ul className="list-inline">
                            <li><h4>Nginx配置</h4></li>
                        </ul>
                    </div>
                    <div className="pull-right">
                        <button type="button" className="btn  btn-small" onClick={this.SubmitClickHandler} >确认</button>
                        <button type="button" className="btn  btn-small " onClick={this.CancelClickHandler}>取消</button>
                        <button type="button" className="btn  btn-small" onClick={this.BackClickHandler.bind(this)}>回退</button>
                        <button type="button" className="btn  btn-small" onClick={this.LastestClickHandler.bind(this)}>最新</button>
                    </div>
                </div>
                <div className="configChannel">
                        <div className="form-group">
                            <label className="col-xs-2 text-right control-label">分发地址:</label>
                            <div className="col-xs-4">
                                <span id="channel_name" name="channel_name" style={{lineHeight:'35px'}}></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 text-right control-label">源站设备组:</label>
                            <div className="col-xs-4">
                                <select id="source_station_type" name="source_station_type" className="form-control">
                                    <option value="1">高升设备组</option>
                                    <option value="2">第三方设备组</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 text-right control-label">具体配置:</label>
                            <div id="gosun" className="col-xs-4">
                                <div className="form-group">
                                    <label className="col-xs-4 text-right control-label">源站设备组:</label>
                                    <div className="col-xs-8">
                                        <select id="dev_group" name="dev_group" className="form-control">
                                            <option value="">请选择</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 text-right control-label">拓扑结构:</label>
                                    <div className="col-xs-8">
                                        <select id="topology" name="topology"   className=" form-control" >
                                            <option value="">请选择</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div  className="col-xs-4 custom f-hide">
                                <div className="form-group base_default" style={{'minWidth':'500px'}}>
                                    <label className="col-xs-4 text-right control-label">默认:</label>
                                    <div className="col-xs-8 defaultIp">
                                        <input   name="defaultIp" type="text" className="form-control ignore"/>
                                        <span><input type="radio" className="ip_main"  defaultChecked={"checked"} name="defaultIp_class"/>主</span>
                                        <span><input type="radio" className="ip_back" name="defaultIp_class" />备</span>
                                        <a className="glyphicon glyphicon-plus green f-ml5 defaultAdd"></a>
                                    </div>
                                </div>
                                <div className="form-group Isp_Box">
                                    <div className="form-group">
                                        <label className="col-xs-4 text-right control-label">运营商:</label>
                                        <div className="col-xs-8">
                                            <select name="isp" className="form-control">
                                                <option value="0">请选择</option>
                                            </select>
                                            <div className="plus_remove">
                                                <a className="glyphicon glyphicon-plus green f-ml5 ispAdd"></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-xs-4 text-right control-label">默认:</label>
                                        <div className="col-xs-8 defaultIp">
                                            <input type="text" name="defaultIpd" className="form-control"/>
                                            <span><input type="radio" className="ip_main" defaultChecked={"checked"}  name="defaultIp1_class"/>主</span>
                                            <span><input type="radio" className="ip_back" name="defaultIp1_class" />备</span>
                                            <a className="glyphicon glyphicon-plus green f-ml5 isp_defaultAdd"></a>
                                        </div>
                                    </div>
                                    <div className="province_Box">
                                        <div className="prov_box">
                                            <div className="form-group">
                                                <label className="col-xs-4 text-right control-label">省份:</label>
                                                <div className="col-xs-8">
                                                    <select  name="area" className="form-control">
                                                        <option value="0">请选择</option>
                                                    </select>
                                                    <div className="plus_remove">
                                                        <a className="glyphicon glyphicon-plus green f-ml5 prov_Add"></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-xs-4 text-right control-label">IP配置:</label>
                                                <div className="col-xs-8 defaultIp">
                                                    <input type="text" name="defaultIpP" className="form-control" defaultValue={''}/>
                                                    <span><input type="radio" defaultChecked={"checked"} className="ip_main"  name="provIp1_class"/>主</span>
                                                    <span><input type="radio" className="ip_back" name="provIp1_class" />备</span>
                                                    <a className="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4" style={{'width':'83%'}}>
                                <div className="form-group">
                                    <label className="col-xs-4 text-right control-label">集群:</label>
                                    <div className="col-xs-8">
                                        <select id="cluster" name="cluster" style={{'width':'38%'}} className="form-control">
                                            <option value="">请选择</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            </div>
                    </div>
                    <div className="configNginx CacheConfig f-mt40">
                        <div className="clearfix f-gradient">
                            <div className="f-caption pull-left">
                                <ul className="list-inline">
                                    <li><h4>缓存配置</h4></li>
                                </ul>
                            </div>
                            <div className="pull-right">
                                <span className="configTrigger" data-id="all">···</span>
                            </div>
                        </div>
                        <div className="Config_Content f-hide">
                            <div className="form-group">
                                <ul className="workGrade">
                                    <li><label className="text-right">生效层级:</label></li>
                                    <li><input className="chk"  name="enable" defaultChecked="checked" data-val="1"  defaultValue={this.state.take_effect} data-name="config1"  type="checkbox"/><span>上层</span></li>
                                    <li><input className="chk"  name="enable" defaultChecked="checked" data-val="2"  defaultValue={this.state.take_effect} data-name="config1" type="checkbox"/><span>中转</span></li>
                                    <li><input className="chk"  name="enable" defaultChecked="checked" data-val="3"  defaultValue={this.state.take_effect} data-name="config1"  type="checkbox"/><span>边缘</span></li>
                                    <li><a className="glyphicon glyphicon-plus green highPlusBtn"></a></li>
                                </ul>
                            </div>
                            <div className="form-group Config_Box">
                                <ul className="Config_Tab_Box">
                                    <li name="config1" className="Config_Tab_Active">配置1</li>
                                </ul>
                                <div className="Config_Content_Box">
                                    <table name="config1" className="table f-table nginxTable">
                                        <thead>
                                        <tr>
                                            <th style={{width:'140px'}}>配置项</th>
                                            <th colSpan="7" >配置内容</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><label  data-toggle="tooltip" title="缓存目录" >proxy_cache_path</label></td>
                                            <td><input name="Cache[proxy_cache_path]" data-rule-path="true" data-rule-required="true" data-msg-required="请填写proxy_cache_path"  type="text"/></td>
                                            <td><label  data-toggle="tooltip" title="缓存层级设置">levels=</label><input name="Cache[levels]" data-rule-nochinese1="true" data-rule-required="true" data-msg-required="请填写levels" className="Cache_input" defaultValue={'1:2'} type="text"/></td>
                                            <td style={{width:"155px",borderRight:"0",paddingLeft:"7px",paddingRight:"0"}}><label data-toggle="tooltip"  title="缓存名称 ： 缓存索引文件大小">keys_zone=</label><input name="Cache[keys_zone_befor]"  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_befor" defaultValue={""} className="Cache_input" type="text"/><label className="f-ml5">:</label></td><td style={{width: "120px",borderLeft:"0",paddingLeft:"0",paddingTop:"4px"}}><input name="Cache[keys_zone_behind]" style={{marginLeft:"-51px"}}  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_behind" defaultValue={'10m'} className="Cache_input" type="text"/></td>
                                            <td><label  data-toggle="tooltip" title="更新时间">inactive=</label><input name="Cache[inactive]" data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写inactive" className="Cache_input" defaultValue={'5m'} type="text"/></td>
                                            <td><label  data-toggle="tooltip" title="缓存目录大小">max_size=</label><input name="Cache[max_size]"  data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写max_size"  className="Cache_input" defaultValue={'50g'} type="text"/></td>
                                            <td style={{width:'70px'}}><a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a></td>
                                        </tr>
                                        <tr>
                                            <td><label  data-toggle="tooltip" title="缓存目录" >proxy_cache_path</label></td>
                                            <td><input name="Cache[proxy_cache_path]" data-rule-path="true"  data-rule-required="true" data-msg-required="请填写proxy_cache_path" type="text"/></td>
                                            <td><label  data-toggle="tooltip" title="缓存层级设置">levels=</label><input name="Cache[levels]asdf" data-rule-nochinese1="true" data-rule-required="true" data-msg-required="请填写levels" className="Cache_input"  defaultValue={'1:2'} type="text"/></td>
                                            <td style={{width:"155px",borderRight:"0",paddingLeft:"7px",paddingRight:"0"}}><label data-toggle="tooltip"  title="缓存名称 ： 缓存索引文件大小">keys_zone=</label><input name="Cache[keys_zone_befor]asdf"  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_befor" defaultValue={""} className="Cache_input" type="text"/><label className="f-ml5">:</label></td><td style={{width: "120px",borderLeft:"0",paddingLeft:"0",paddingTop:"4px"}}><input name="Cache[keys_zone_behind]asdf" style={{marginLeft:"-51px"}}  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_behind" defaultValue={"1m"} className="Cache_input" type="text"/></td>
                                            <td><label  data-toggle="tooltip" title="更新时间">inactive=</label><input name="Cache[inactive]asdf"  data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写inactive" className="Cache_input" defaultValue={'1s'} type="text"/></td>
                                            <td><label  data-toggle="tooltip" title="缓存目录大小">max_size=</label><input name="Cache[max_size]asdf"  data-rule-nochinese5="true"  data-rule-required="true" data-msg-required="请填写max_size" className="Cache_input" defaultValue={'1g'} type="text"/></td>
                                            <td style={{width:'70px'}}><a className="glyphicon glyphicon-plus green innerPlus"></a><a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="configNginx UpstreamConfig f-mt40">
                        <div className="clearfix f-gradient">
                            <div className="f-caption pull-left">
                                <ul className="list-inline">
                                    <li><h4>upstream&server配置</h4></li>
                                </ul>
                            </div>
                            <div className="pull-right">
                                <span className="configTrigger" data-id="all">···</span>
                            </div>
                        </div>
                        <div className="Config_Content f-hide">
                            <div className="form-group">
                                <ul className="workGrade">
                                    <li><label className="text-right">生效层级:</label></li>
                                    <li><input className="chk" name="disabled" defaultChecked="checked" data-val="4" defaultValue={this.state.take_effect}  disabled="disabled" type="checkbox" data-name="config2"/><span>源站</span></li>
                                    <li><input className="chk" name="enable" defaultChecked="checked" data-val="1" defaultValue={this.state.take_effect}  type="checkbox" data-name="config1"/><span>上层</span></li>
                                    <li><input className="chk" name="enable" defaultChecked="checked" data-val="2"  defaultValue={this.state.take_effect}  type="checkbox" data-name="config1"/><span>中转</span></li>
                                    <li><input className="chk" name="enable" defaultChecked="checked" data-val="3"  defaultValue={this.state.take_effect}   type="checkbox" data-name="config1"/><span>边缘</span></li>
                                    <li> <a className="glyphicon glyphicon-plus green highPlusBtn"></a></li>
                                </ul>
                            </div>
                            <div className="form-group Config_Box">
                                <ul className="Config_Tab_Box">
                                    <li name="config1" className="Config_Tab_Active">配置1 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                    <li name="config2" >配置2 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                </ul>
                                <div  className="Config_Content_Box">
                                    <table name="config1" className="table f-table nginxTable">
                                        <thead>
                                        <tr>
                                            <th style={{width:'140px'}}>配置项</th>
                                            <th >配置内容</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr><td><span data-toggle="tooltip"  title="回源策略名称">upstream</span></td><td className="text-left"><span name="Server[upstream]89484" style={{width:'100%'}}></span></td></tr>
                                        <tr><td><span data-toggle="tooltip"  title="服务名称">server_name</span></td><td className="text-left"><span name="Server[server]89484" style={{width:'100%'}}></span></td></tr>
                                        <tr><td><span data-toggle="tooltip"  title="服务监听设备端口">listen</span></td><td className="text-left"><input name="Server[listen]89484" data-rule-posInteger="true" data-rule-required="true" data-msg-required="请填写listen" style={{width:'100%'}} type="text" defaultValue={80}/></td></tr>
                                        <tr><td>回源端口</td><td className="text-left"><input name="Server[upstream_port]89484" data-rule-posInteger="true" data-rule-required="true" data-msg-required="请填写回源端口" style={{width:'100%'}} type="text" defaultValue={80}/></td></tr>
                                        <tr><td>自定义配置</td><td className="text-left"><textarea  name="Server[custom_setting]89484" style={{width:'100%'}} rows="6"></textarea></td></tr>
                                        </tbody>
                                    </table>
                                    <table name="config2" className="table f-table nginxTable" style={{'display':'none'}}>
                                        <thead>
                                        <tr>
                                            <th style={{width:'140px'}}>配置项</th>
                                            <th >配置内容</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr><td><span data-toggle="tooltip"  title="回源策略名称">upstream</span></td><td className="text-left"><span name="Server[upstream]9841651" style={{width:'100%'}}></span></td></tr>
                                        <tr><td><span data-toggle="tooltip"  title="服务名称">server_name</span></td><td className="text-left"><span name="Server[server]9841651" style={{width:'100%'}}></span></td></tr>
                                        <tr><td><span data-toggle="tooltip"  title="服务监听设备端口">listen</span></td><td className="text-left"><input name="Server[listen]9841651" data-rule-posInteger="true" style={{width:'100%'}} type="text" defaultValue={80}/></td></tr>
                                        <tr><td><span>回源端口</span></td><td className="text-left"><input name="Server[upstream_port]9841651" data-rule-posInteger="true" style={{width:'100%'}} type="text" defaultValue={80}/></td></tr>
                                        <tr><td><span>自定义配置</span></td><td className="text-left"><textarea defaultValue={""} name="Server[custom_setting]9841651" style={{width:'100%'}} rows="6"></textarea></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="LocationGroup">
                        <div data-index="0" className="configNginx LocationConfig f-mt40">
                            <div className="clearfix f-gradient">
                                <div className="f-caption pull-left">
                                    <ul className="list-inline">
                                        <li><h4>Location配置 <span className="mr10" style={{display:'inline-block',width:150,overflow:'hidden'}}>-/</span> <a  className="glyphicon glyphicon-chevron-up green upAddBtn f-ml10"></a><a  className="glyphicon glyphicon-chevron-down green downAddBtn f-ml10"></a><a className="glyphicon glyphicon-remove red topRemoveBtn f-ml10"></a></h4></li>
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
                                        <li><input name="location[name]sdf123sa" defaultValue={'/'} data-rule-required="true" data-msg-required="请填写location名称"   type="text"/></li>
                                        <li><Switch defaultChecked={true} onChange={this.UsehandleChange} /></li>
                                    </ul>
                                </div>
                                <div className="form-group">
                                    <ul className="workGrade">
                                        <li><label className="text-right">生效层级:</label></li>
                                        <li><input className="chk" data-name="config1" name="enable" data-val="4" defaultValue={this.state.take_effect} defaultChecked="checked"  type="checkbox"/><span>源站</span></li>
                                        <li><input className="chk" data-name="config1" name="enable" data-val="1" defaultValue={this.state.take_effect} defaultChecked="checked" type="checkbox"/><span>上层</span></li>
                                        <li><input className="chk" data-name="config1" name="enable" data-val="2" defaultValue={this.state.take_effect} defaultChecked="checked" type="checkbox"/><span>中转</span></li>
                                        <li><input className="chk" data-name="config1" name="enable" data-val="3" defaultValue={this.state.take_effect} defaultChecked="checked" type="checkbox"/><span>边缘</span></li>
                                        <li> <a className="glyphicon glyphicon-plus green highPlusBtn"></a></li>
                                    </ul>
                                </div>
                                <div className="form-group Config_Box">
                                    <ul className="Config_Tab_Box">
                                        <li name="config1" className="Config_Tab_Active">配置1</li>
                                    </ul>
                                    <div  className="Config_Content_Box">
                                        <table name="config1" className="table f-table nginxTable">
                                            <thead>
                                            <tr>
                                                <th style={{width:'140px'}}>配置项</th>
                                                <th >配置内容</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr><td>代理模式</td><td className="text-left"><Switch defaultChecked={false} className="Switch_tr"/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_pass]" data-rule-required="true" data-msg-required="请填写proxy_pass" className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache]" className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_key]"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_valid]"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger  f-hide proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger f-hide add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}}  name="location[add_header]"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr><td>自定义配置</td><td className="text-left"><textarea name="location[custom_setting]" data-rule-required="true" data-msg-required="请填自定义配置" defaultValue={'return 403;'}  style={{width:'100%'}} rows="6"></textarea></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-index="1" className="configNginx LocationConfig f-mt40">
                            <div className="clearfix f-gradient">
                                <div className="f-caption pull-left">
                                    <ul className="list-inline">
                                        <li><h4>Location配置 <span className="mr10" style={{display:'inline-block',width:150,overflow:'hidden'}}>~*\.ts$</span> <a  className="glyphicon glyphicon-chevron-up green upAddBtn f-ml10"></a><a  className="glyphicon glyphicon-chevron-down green downAddBtn f-ml10"></a><a className="glyphicon glyphicon-remove red topRemoveBtn f-ml10"></a></h4></li>
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
                                        <li><input name="location[name]9mzxdiu" defaultValue={'~*\.ts$'} data-rule-required="true" data-msg-required="请填写location名称" type="text"/></li>
                                        <li><Switch defaultChecked={true} onChange={this.UsehandleChange} /></li>
                                    </ul>
                                </div>
                                <div className="form-group">
                                    <ul className="workGrade">
                                        <li><label className="text-right">生效层级:</label></li>
                                        <li><input className="chk" data-name="config2" name="disabled" data-val="4" disabled="disabled" defaultChecked="checked" defaultValue={this.state.take_effect}  type="checkbox"/><span>源站</span></li>
                                        <li><input className="chk" data-name="config1" name="enable"  data-val="1" defaultChecked="checked" defaultValue={this.state.take_effect}  type="checkbox"/><span>上层</span></li>
                                        <li><input className="chk" data-name="config1" name="enable" data-val="2" defaultChecked="checked" defaultValue={this.state.take_effect}  type="checkbox"/><span>中转</span></li>
                                        <li><input className="chk" data-name="config1" name="enable" data-val="3" defaultChecked="checked" defaultValue={this.state.take_effect}   type="checkbox"/><span>边缘</span></li>
                                        <li> <a className="glyphicon glyphicon-plus green highPlusBtn"></a></li>
                                    </ul>
                                </div>
                                <div className="form-group Config_Box">
                                    <ul className="Config_Tab_Box">
                                        <li name="config1" className="Config_Tab_Active">配置1 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                        <li name="config2" >配置2 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                    </ul>
                                    <div  className="Config_Content_Box">
                                        <table name="config1" className="table f-table nginxTable">
                                            <thead>
                                            <tr>
                                                <th style={{width:'140px'}}>配置项</th>
                                                <th >配置内容</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr><td>代理模式</td><td className="text-left"><Switch className="Switch_tr" defaultChecked={true} /></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_pass]13213" data-rule-required="true" data-msg-required="请填写proxy_pass"  type="text" defaultValue={'http://upstream值'}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache]13213"   type="text" defaultValue={'upstream值+_ts'}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_key]13213"   type="text" defaultValue={'$Host$uri'}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_valid]13213"   type="text" defaultValue={'200 304 206 5m'}/></td></tr>
                                            <tr className="tr_trigger proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]asdf"  type="text" defaultValue={'Host 频道名称'}/>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]13213"  type="text" defaultValue={'X-Forwarded-For $remote_addr'}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}}  name="location[add_header]"   type="text" defaultValue={'C4H-Cache "$upstream_cache_status $hostname"'}/>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}}  name="location[add_header]asddf"  type="text" defaultValue={'Access-Control-Allow-Origin *'}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr><td>自定义配置</td><td className="text-left"><textarea  style={{width:'100%'}} name="location[custom_setting]123123" data-rule-required="true" data-msg-required="请填写自定义配置" className="ignore" rows="6"></textarea></td></tr>
                                            </tbody>
                                        </table>
                                        <table name="config2" className="table f-table nginxTable" style={{'display':'none'}}>
                                            <thead>
                                            <tr>
                                                <th style={{width:'140px'}}>配置项</th>
                                                <th >配置内容</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr><td>代理模式</td><td className="text-left"><Switch defaultChecked={false} className="Switch_tr" /></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_pass]06856" data-rule-required="true" data-msg-required="请填写proxy_pass" className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache]06856"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_key]06856"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_valid]06856"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger  f-hide proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]06856" data-rule-required="true"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger f-hide add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}}  name="location[add_header]06856"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr><td>自定义配置</td><td className="text-left"><textarea name="location[custom_setting]06856" data-rule-required="true" data-msg-required="请填写自定义配置"   defaultValue={'root /tmp/srs_hls/;'} style={{width:'100%'}} rows="6"></textarea></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-index="2" className="configNginx LocationConfig f-mt40">
                            <div className="clearfix f-gradient">
                                <div className="f-caption pull-left">
                                    <ul className="list-inline">
                                        <li><h4>Location配置 <span className="mr10" style={{display:'inline-block',width:150,overflow:'hidden'}}>~*\.m3u8$</span> <a  className="glyphicon glyphicon-chevron-up green upAddBtn f-ml10"></a><a  className="glyphicon glyphicon-chevron-down green downAddBtn f-ml10"></a><a className="glyphicon glyphicon-remove red topRemoveBtn f-ml10"></a></h4></li>
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
                                        <li><input name="location[name]sdf" defaultValue={'~*\.m3u8$'} data-rule-required="true" data-msg-required="请填写location名称"  type="text"/></li>
                                        <li><Switch defaultChecked={true} onChange={this.UsehandleChange} /></li>
                                    </ul>
                                </div>
                                <div className="form-group">
                                    <ul className="workGrade">
                                        <li><label className="text-right">生效层级:</label></li>
                                        <li><input className="chk" data-name="config3" name="disabled" disabled="disabled" data-val="4" defaultChecked="checked" defaultValue={this.state.take_effect}  type="checkbox"/><span>源站</span></li>
                                        <li><input className="chk" data-name="config2" name="disabled" disabled="disabled" data-val="1" defaultChecked="checked" defaultValue={this.state.take_effect}  type="checkbox"/><span>上层</span></li>
                                        <li><input className="chk" data-name="config2" name="disabled" disabled="disabled" data-val="2" defaultChecked="checked" defaultValue={this.state.take_effect}  type="checkbox"/><span>中转</span></li>
                                        <li><input className="chk" data-name="config1" name="enable"  defaultChecked="checked" data-val="3" defaultValue={this.state.take_effect}   type="checkbox"/><span>边缘</span></li>
                                        <li> <a className="glyphicon glyphicon-plus green highPlusBtn"></a></li>
                                    </ul>
                                </div>
                                <div className="form-group Config_Box">
                                    <ul className="Config_Tab_Box">
                                        <li name="config1" className="Config_Tab_Active">配置1 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                        <li name="config2" >配置2 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                        <li name="config3" >配置3 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                    </ul>
                                    <div  className="Config_Content_Box">
                                        <table name="config1" className="table f-table nginxTable">
                                            <thead>
                                            <tr>
                                                <th style={{width:'140px'}}>配置项</th>
                                                <th >配置内容</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr><td>代理模式</td><td className="text-left"><Switch defaultChecked={true} className="Switch_tr" /></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td><td className="text-left"><input name="location[proxy_pass]zfwef" data-rule-required="true" data-msg-required="请填写proxy_pass" style={{width:'100%'}} type="text" defaultValue={'http://upstream值'}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td><td className="text-left"><input name="location[proxy_cache]zfwef"  style={{width:'100%'}} type="text" defaultValue={'MD5(频道名称)_m3u8'}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td><td className="text-left"><input name="location[proxy_cache_key]zfwef"  style={{width:'100%'}} type="text" defaultValue={'$Host$uri'}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td><td className="text-left"><input name="location[proxy_cache_valid]zfwef"  style={{width:'100%'}} type="text" defaultValue={'200 304 1s'}/></td></tr>
                                            <tr className="tr_trigger proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]zfwefs"  type="text" defaultValue={'Host 频道名称'}/>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]zfwef"  type="text" defaultValue={'X-Forwarded-For $remote_addr'}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[add_header]zfwef"  type="text" defaultValue={'C4H-Cache "$upstream_cache_status $hostname"'}/>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[add_header]zfwef1"  type="text" defaultValue={'Access-Control-Allow-Origin *'}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr><td>自定义配置</td><td className="text-left"><textarea name="location[custom_setting]zfwef" data-rule-required="true" data-msg-required="请填写自定义配置" className="ignore"  style={{width:'100%'}} rows="6"></textarea></td></tr>
                                            </tbody>
                                        </table>
                                        <table name="config2" className="table f-table nginxTable" style={{'display':'none'}}>
                                            <thead>
                                            <tr>
                                                <th style={{width:'140px'}}>配置项</th>
                                                <th >配置内容</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr><td>代理模式</td><td className="text-left"><Switch defaultChecked={true} className="Switch_tr" /></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td><td className="text-left"><input name="location[proxy_pass]hasdfsdf"  data-rule-required="true" data-msg-required="请填写proxy_pass" style={{width:'100%'}} type="text" defaultValue={'http://upstream值'}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td><td className="text-left"><input name="location[proxy_cache]hasdfsdf"  style={{width:'100%'}} type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td><td className="text-left"><input name="location[proxy_cache_key]hasdfsdf"  style={{width:'100%'}} type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger"><td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td><td className="text-left"><input name="location[proxy_cache_valid]hasdfsdf"  style={{width:'100%'}} type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]hasdfsdf"  type="text" defaultValue={'Host 频道名称'}/>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]hasfsdfq"  type="text" defaultValue={'X-Forwarded-For $remote_addr'}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[add_header]hasdfsdf"  type="text" defaultValue={'C4H-Cache "$upstream_cache_status $hostname"'}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                    <a className="glyphicon glyphicon-remove red f-ml10 innerDel"></a>
                                                </td>
                                            </tr>
                                            <tr><td>自定义配置</td><td className="text-left"><textarea  name="location[custom_setting]hasfsdfq" data-rule-required="true" data-msg-required="请填写自定义配置" className="ignore" style={{width:'100%'}} rows="6"></textarea></td></tr>
                                            </tbody>
                                        </table>
                                        <table name="config3" className="table f-table nginxTable" style={{'display':'none'}}>
                                            <thead>
                                            <tr>
                                                <th style={{width:'140px'}}>配置项</th>
                                                <th >配置内容</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr><td>代理模式</td><td className="text-left"><Switch defaultChecked={false} className="Switch_tr" /></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_pass]miiqwn" data-rule-required="true" data-msg-required="请填写proxy_pass" className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache]miiqwn"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_key]miiqwn"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_valid]miiqwn"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger  f-hide proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]miiqwn"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger f-hide add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}}  name="location[add_header]miiqwn"  className="ignore" type="text" defaultValue={""}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr><td>自定义配置</td><td className="text-left"><textarea  name="location[custom_setting]miiqwn" data-rule-required="true" data-msg-required="请填写自定义配置" defaultValue={"root /tmp/srs_hls/;"} style={{width:"100%"}} rows="6"></textarea></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-index="3" className="configNginx LocationConfig f-mt40">
                            <div className="clearfix f-gradient">
                                <div className="f-caption pull-left">
                                    <ul className="list-inline">
                                        <li><h4>Location配置 <span className="mr10" style={{display:'inline-block',width:150,overflow:'hidden'}}>/crossdomain.xml</span> <a  className="glyphicon glyphicon-chevron-up green upAddBtn f-ml10"></a><a  className="glyphicon glyphicon-chevron-down green downAddBtn f-ml10"></a><a className="glyphicon glyphicon-remove red topRemoveBtn f-ml10"></a></h4></li>
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
                                        <li><input name="location[name]sdgasef" defaultValue={'/crossdomain.xml'} data-rule-required="true" data-msg-required="请填写location名称"  type="text"/></li>
                                        <li><Switch defaultChecked={true} onChange={this.UsehandleChange} /></li>
                                    </ul>
                                </div>
                                <div className="form-group">
                                    <ul className="workGrade">
                                        <li><label className="text-right">生效层级:</label></li>
                                        <li><input className="chk" data-name="config1" name="enable" defaultValue={this.state.take_effect} data-val="4" defaultChecked="checked" type="checkbox"/><span>源站</span></li>
                                        <li><input className="chk" data-name="config2" name="disabled" disabled="disabled" data-val="1" defaultChecked="checked" defaultValue={this.state.take_effect}  type="checkbox"/><span>上层</span></li>
                                        <li><input className="chk" data-name="config2" name="disabled" disabled="disabled" data-val="2"defaultChecked="checked" defaultValue={this.state.take_effect}  type="checkbox"/><span>中转</span></li>
                                        <li><input className="chk" data-name="config1" name="enable" defaultValue={this.state.take_effect}  data-val="3" defaultChecked="checked"  type="checkbox"/><span>边缘</span></li>
                                        <li> <a className="glyphicon glyphicon-plus green highPlusBtn"></a></li>
                                    </ul>
                                </div>
                                <div className="form-group Config_Box">
                                    <ul className="Config_Tab_Box">
                                        <li name="config1" className="Config_Tab_Active">配置1 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                        <li name="config2" >配置2 <i className="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>
                                    </ul>
                                    <div  className="Config_Content_Box">
                                        <table name="config1" className="table f-table nginxTable">
                                            <thead>
                                            <tr>
                                                <th style={{width:'140px'}}>配置项</th>
                                                <th >配置内容</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr><td>代理模式</td><td className="text-left"><Switch defaultChecked={false} className="Switch_tr" /></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td><td  className="text-left"><input style={{width:'100%'}} name="location[proxy_pass]liuad" data-rule-required="true" data-msg-required="请填写proxy_pass" className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache]liuad"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_key]liuad"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_valid]liuad"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger  f-hide proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]liuad"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger f-hide add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}}  name="location[add_header]liuad"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr><td>自定义配置</td><td className="text-left"><textarea name="location[custom_setting]liuad" data-rule-required="true" data-msg-required="请填写自定义配置" defaultValue={'root /usr/local/srs/objs/nginx/html/;\nadd_header Access-Control-Allow-Origin *;'}  style={{width:'100%'}} rows="6"></textarea></td></tr>
                                            </tbody>
                                        </table>
                                        <table name="config2" className="table f-table nginxTable" style={{"display":'none'}}>
                                            <thead>
                                            <tr>
                                                <th style={{width:'140px'}}>配置项</th>
                                                <th >配置内容</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr><td>代理模式</td><td className="text-left"><Switch defaultChecked={false} className="Switch_tr" /></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="回源信息">proxy_pass</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_pass]usdfs"  data-rule-required="true" data-msg-required="请填写proxy_pass"  className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存名称">proxy_cache</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache]usdfs"   className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存存放策略">proxy_cache_key</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_key]usdfs"   className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger f-hide"><td><span data-toggle="tooltip"  title="缓存信息设置">proxy_cache_valid</span></td><td className="text-left"><input style={{width:'100%'}} name="location[proxy_cache_valid]usdfs"   className="ignore" type="text" defaultValue={''}/></td></tr>
                                            <tr className="tr_trigger  f-hide proxy_set_header">
                                                <td><span data-toggle="tooltip"  title="代理头信息设置">proxy_set_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}} name="location[proxy_set_header]usdfs"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr className="tr_trigger f-hide add_header">
                                                <td><span data-toggle="tooltip"  title="代理回源头信息">add_header</span></td>
                                                <td className="text-left">
                                                    <input style={{width:'94%'}}  name="location[add_header]usdfs"  className="ignore" type="text" defaultValue={''}/>
                                                    <a className="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>
                                                </td>
                                            </tr>
                                            <tr><td>自定义配置</td><td className="text-left"><textarea name="location[custom_setting]usdfs" data-rule-required="true" data-msg-required="请填写自定义配置" defaultValue={'root /usr/local/srs/objs/nginx/html/;'}  style={{width:'100%'}} rows="6"></textarea></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.RenderLocation?
                                this.state.RenderLocation.map((item,index)=> <LocationRenderConfig key={index} _index={this.state._index} count={this.state.count} data={this.state.data} UsehandleChange={this.UsehandleChange.bind(this)}   />)
                                :''
                        }
                    </div>
                    <div className="configNginx TZTConfig f-mt40">
                        <div className="clearfix f-gradient">
                            <div className="f-caption pull-left">
                                <ul className="list-inline">
                                    <li><h4>302服务</h4></li>
                                </ul>
                            </div>
                            <div className="pull-right">
                                <span className="configTrigger" data-id="all">···</span>
                            </div>
                        </div>
                        <div className="Config_Content f-hide">
                            <div className="form-group Config_Box f-pb30">
                                <ul className="workGrade">
                                    <li>
                                        <label className="text-right f-mr15">302服务开关:</label>
                                        <Switch
                                            checked={this.state.Status302}
                                            onChange={this.handleChange302.bind(this)}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                <BackTop />
                </form>
        )
    }
}
