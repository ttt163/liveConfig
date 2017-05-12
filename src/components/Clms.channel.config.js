import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { URL,CHANNNEL,ORIGIN,HTTP,FLV,HLS,HTTPTS,MP4,IPLIST,HTTPHOOKS,HTTPHOOKS2,PRINT,REFER,IPCONFIGINFO,CONFIGDEFAULTDATA,PANURL,PANURLLIST} from '../config.js';
import {ShowDiag} from  "../public/js/f.js"
//import {getForm,getFields,getFormFields,validateField,validateAllFields} from "../public/js/validate/validateRform.js"
import ValidateItem from "./Validate.item.js"
import { Select  } from 'antd';
const Option = Select.Option;
import {addConfigChannData,editConfigData,delChannelData,addChannelData,editChannel,changeLevel,
    addConfigData,addConfigOriginData,addConfigHttpServiceData,addConfigFlvData,addConfigHlsData,
    addConfigHttpTsData,addConfigMp4Data,addConfigIpListData,addConfigPrintData,addConfigReferData,addConfigHttpHookData} from "../actions/clmsConfigActions.js"
import EffectLevel from "./Clms.config.effectLevel.js"
import ConfigTab from "./Clms.config.tab.js"
import {getTopoDatas,formatGetTopoData} from "../containers/DeviceGroup.js"
import {geteLeves} from "./Clms.config.js"
import {formatHttpHookFields} from "./Clms.httpHook.content.config.js"
import ChannelContent from "./Clms.channel.content.config.js"
import {getForm,getFields,getFormFields,clearFormData,delFormsFn,clearArrFormFn,getKeyField,getArrForm,getArrFormFields,validateArrformField,getArrformArrField } from "../public/js/validate/validateRform.js"
class ChannelConfig extends Component {
    componentDidMount() {
        const {params,dispatch,clmsConfig,channelConfig,clmsOriginConfig,clmsHttpServiceConfig}=this.props;
        var ctype = clmsConfig.configType;
        //给当前显示页添加校验
        //console.log(clmsConfig[ctype]);
        getFormFields(ctype + "_config", {
            "channel_name": {
                "value": clmsConfig[ctype].channel_name,
                "rule": {"required":true,"regexp": PANURL},
                //"rule": { "required": true,"regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                "msg": {
                    "required": `${ctype == "pull" ? "分发地址" : "推流地址"}不能为空！`,
                    "regexp": `${ctype == "pull" ? "分发地址" : "推流地址"}格式错误`
                }
            },
            "cluster": {
                "value": clmsConfig[ctype].cluster_id,
                "rule": {"required": true},
                "msg": {"required": `集群不能为空！`}
            }
        });
        if (clmsConfig[ctype].source_station_type == "1") {
            getFields(ctype + "_config", "topology", {
                "value": clmsConfig[ctype].topology_id,
                "rule": {"required": true},
                "msg": {"required": `拓扑结构不能为空！`}
            });
            getFields(ctype + "_config", "devs_group", {
                "value": clmsConfig[ctype].devs_group_id,
                "rule": {"required": true},
                "msg": {"required": `设备组不能为空！`}
            });
        }
        else {
            //getKeyField(form,name,key ,opt)
            for (var i = 0; i < clmsConfig[ctype].topology_info.default.Ipinfo.length; i++) {
                getKeyField(ctype + "_config", "defIp", i, {
                    "value": clmsConfig[ctype].topology_info.default.Ipinfo[i].ip,
                    "rule": {
                        "required": true
                    },
                    "msg": {"required": "默认IP不能为空！"}
                });
            }

        }
        //频道校验
        /* var _thisChannelData=channelConfig[ctype].channel;
         for(var i=0;i<_thisChannelData.length;i++){
         getArrForm(ctype+"_channelConfig",i);
         getArrFormFields(ctype+"_channelConfig",i,{
         "queue_length": {
         "value": _thisChannelData[i].queue_length,
         "rule": {"required": true,"regexp": /^[0-9]*$/},
         "msg": {"required": "queue_length不能为空","regexp": "只能是整数"}
         },
         "chunk_size": {
         "value": _thisChannelData[i].chunk_size,
         "rule": {"required": true,"regexp": /^[0-9]*$/},
         "msg": {"required": "chunk_size不能为空！","regexp": "只能是整数"}
         },
         "stream_timeout": {
         "value": _thisChannelData[i].stream_timeout,
         "rule": {"required": true,"regexp": /^[0-9]*$/},
         "msg": {"required": "stream_timeout不能为空！","regexp": "只能是整数"}
         },
         "custom_setting": {
         "value": _thisChannelData[i].custom_setting,
         "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
         "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
         },
         "take_effect_level": {
         "value": _thisChannelData[i].take_effect_level.length,
         "rule": {"required":true},
         "msg": {"required": "请填写生效层级！"}
         }

         });
         }*/


        var _thisIdType = ctype == "pull" ? "push_id" : "pull_id",
            otherType = ctype == "pull" ? "push" : "pull",
            otherIdType = ctype == "pull" ? "pull_id" : "push_id",
            otherId = clmsConfig[ctype][_thisIdType];
        // console.log(otherId);
        /*if(!params.id){
         return;
         }*/
        //console.log(otherId);
        if (!otherId || otherId == "default") {
            //console.log("mm");
            //没有配置过
            var oprInfo = {
                "topology_info": {
                    "ipConfig": [
                        {
                            "operators": "",
                            "default": [{ip: "", type: ""}],
                            "provinces": [
                                {
                                    "province": "",
                                    "Ipinfo": [{ip: "", type: ""}]
                                }
                            ]
                        }
                    ],
                    "default": {
                        "Ipinfo": [{ip: "", type: ""}]
                    }
                }
            };
            var defaultCdata = Object.assign({}, CONFIGDEFAULTDATA),
                defaultOprData = Object.assign({}, oprInfo),
                cData = {
                    ...defaultCdata, ...defaultOprData,
                    [otherIdType]: !clmsConfig[ctype]._id ? "default" : clmsConfig[ctype]._id,
                    "client_name": clmsConfig[ctype].client_name
                },
                channelData = {
                    "show": false,
                    "currIndex": 0,
                    "channel": [
                        Object.assign({}, CHANNNEL, {
                            "take_effect_level": ["3"],
                            "queue_length": "10",
                            "stream_timeout": "30"
                        }),
                        Object.assign({}, CHANNNEL, {
                            "take_effect_level": ["1", "2"],
                            "queue_length": "10",
                            "stream_timeout": "30"
                        }),
                        Object.assign({}, CHANNNEL, {
                            "take_effect_level": ["4"],
                            "queue_length": "10",
                            "stream_timeout": "30",
                            "chunk_size": "",
                            "gop_cache": "off",
                            "time_jitter": "off"
                        })
                    ],
                    "exist_level": ["1", "2", "3", "4"]
                },
                originData = {
                    "show": false,
                    "currIndex": 0,
                    "origin": [Object.assign({}, ORIGIN, {"take_effect_level": ["1", "2", "3"]})],
                    "exist_level": ["1", "2", "3"]
                },
                httpData = {
                    "show": false,
                    "currIndex": 0,
                    "http": [Object.assign({}, HTTP, {"enabled": "off"})],
                    "exist_level": []
                },
                flvData = {
                    "show": false,
                    "currIndex": 0,
                    "flv": [Object.assign({}, FLV)],
                    "exist_level": []
                },
                hlsData = {
                    "exist_level": [],
                    "show": false,
                    "currIndex": 0,
                    "hls": [Object.assign({}, HLS)]
                },
                httpTsData = {
                    "show": false,
                    "currIndex": 0,
                    "http_ts": [Object.assign({}, HTTPTS, {"enabled": "off"})],
                    "exist_level": []
                },
                mp4Data = {
                    "show": false,
                    "currIndex": 0,
                    "mp4": [Object.assign({}, MP4, {"enabled": "off"})],
                    "exist_level": []
                },
                ipListData = {
                    "show": false,
                    "currIndex": 0,
                    "ip_list": [Object.assign({}, IPLIST)],
                    "exist_level": []
                },
                httpHookData = {
                    "show": false,
                    "currIndex": 0,
                    "currHook": "on_connect",
                    "http_hook": [Object.assign({}, HTTPHOOKS2)],
                    "exist_level": []
                },
                printData = {
                    "show": false,
                    "currIndex": 0,
                    "pithy_print": [Object.assign({}, PRINT)],
                    "exist_level": []
                },
                referData = {
                    "show": false,
                    "currIndex": 0,
                    "refer": [Object.assign({}, REFER)],
                    "exist_level": []
                };
            dispatch(addConfigData({[otherType]: cData}));
            dispatch(addConfigChannData(channelData, otherType));
            dispatch(addConfigOriginData(originData, otherType));
            dispatch(addConfigHttpServiceData(httpData, otherType));
            dispatch(addConfigFlvData(flvData, otherType));
            dispatch(addConfigHttpTsData(httpTsData, otherType));
            dispatch(addConfigMp4Data(mp4Data, otherType));
            dispatch(addConfigIpListData(ipListData, otherType));
            dispatch(addConfigHttpHookData(httpHookData, otherType));
            dispatch(addConfigPrintData(printData, otherType));
            dispatch(addConfigReferData(referData, otherType));
            dispatch(addConfigHlsData(hlsData, otherType));
            //添加校验
            getFormFields(otherType + "_config", {
                "channel_name": {
                    "value": "",
                    "rule": {"required":true,"regexp": PANURL},
                   /* "rule": {
                        "required": true,
                        "regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
                    },*/
                    "msg": {
                        "required": `${otherType == "pull" ? "分发地址" : "推流地址"}不能为空！`,
                        "regexp": `${otherType == "pull" ? "分发地址" : "推流地址"}格式错误`
                    }
                },
                "cluster": {
                    "value": "",
                    "rule": {"required": true},
                    "msg": {"required": `集群不能为空！`}
                },
                "topology": {
                    "value": "",
                    "rule": {"required": true},
                    "msg": {"required": `拓扑结构不能为空！`}
                },
                "devs_group": {
                    "value": "",
                    "rule": {"required": true},
                    "msg": {"required": `设备组不能为空！`}
                }

            });
            //频道校验
            // var _thisChannelData=channelConfig[otherType].channel;
            for (var i = 0; i < channelData.channel.length; i++) {
                getArrForm(otherType + "_channelConfig", i);
                getArrFormFields(otherType + "_channelConfig", i, {
                    "listen": {
                        "value": channelData.channel[i].listen,
                        "rule": {"required": true, "regexp": /^[0-9]*$/},
                        "msg": {"required": "listen不能为空！", "regexp": "只能是整数"}
                    },
                    "queue_length": {
                        "value": channelData.channel[i].queue_length,
                        "rule": {"required": true, "regexp": /^[0-9]*$/},
                        "msg": {"required": "queue_length不能为空", "regexp": "只能是整数"}
                    },
                    "chunk_size": {
                        "value": channelData.channel[i].chunk_size,
                        "rule": {"regexp": /^[0-9]*$/},
                        "msg": {"regexp": "只能是整数"}
                    },
                    "stream_timeout": {
                        "value": channelData.channel[i].stream_timeout,
                        "rule": {"required": true, "regexp": /^[0-9]*$/},
                        "msg": {"required": "stream_timeout不能为空！", "regexp": "只能是整数"}
                    },
                    /*"custom_setting": {
                        "value": channelData.channel[i].custom_setting,
                        "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                        "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                    },*/
                    "take_effect_level": {
                        "value": channelData.channel[i].take_effect_level.length,
                        "rule": {"required": true},
                        "msg": {"required": "请填写生效层级！"}
                    }

                });
            }
            //回源校验
            // var _thisChannelData=channelConfig[otherType].channel;
            // for(var i=0;i<_thisChannelData.length;i++){
            getArrForm(otherType + "_orginConfig", 0);
            getArrFormFields(otherType + "_orginConfig", 0, {
                "listen": {
                    "value": originData.origin[0].listen,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "listen不能为空！", "regexp": "只能是整数"}
                },
                "interface": {
                    "value": originData.origin[0].interface,
                    "rule": {"required":true,"regexp": PANURL},
                    /*"rule": {
                        "required": true,
                        "regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
                    },*/
                    "msg": {"required": "interface不能为空", "regexp": "格式错误，不符合url规则！"}
                },
                "server_key": {
                    "value": originData.origin[0].server_key,
                    "rule": {"regexp": /^(\-|\+)?\d+(\.\d+)?$/},
                    "msg": {"regexp": "格式错误，只能是数字！"}
                },
                "hash_str": {
                    "value": originData.origin[0].hash_str,
                    "rule": {"regexp": /^[A-Za-z\$]+$/},
                    "msg": {"regexp": "格式错误，只能由英文字母以及“$”组成！"}
                },
                "upnode_vhost": {
                    "value": originData.origin[0].upnode_vhost,
                    "rule": {"regexp": PANURL},
                    //"rule": {"regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                    "msg": {"regexp": "格式错误，不符合url规则！"}
                },
                "backsource_timeout": {
                    "value": originData.origin[0].backsource_timeout,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "backsource_timeout不能为空！", "regexp": "格式错误，只能是整数！"}
                },
               /* "custom_setting": {
                    "value": originData.origin[0].custom_setting,
                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                },*/
                "take_effect_level": {
                    "value": originData.origin[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }

            });
            //http校验
            getArrForm(otherType + "_httpConfig", 0);
            getArrFormFields(otherType + "_httpConfig", 0, {
                "dir": {
                    "value": httpData.http[0].dir,
                    "rule": {"required": true, "regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                    "msg": {"required": "dir不能为空", "regexp": "不符合符合linux路径"}
                },
                "hdl_buffer_length": {
                    "value": httpData.http[0].hdl_buffer_length,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "hdl_buffer_length不能为空！", "regexp": "只能是整数！"}
                },
                "hdl_error_code": {
                    "value": httpData.http[0].hdl_error_code,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "hdl_error_code不能为空！", "regexp": "只能是整数！"}
                },
                "hdl_error_info": {
                    "value": httpData.http[0].hdl_error_info,
                    "rule": {"required": true},
                    "msg": {"required": "hdl_error_info不能为空！"}
                },
                /*"custom_setting": {
                    "value": httpData.http[0].custom_setting,
                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                },*/
                "take_effect_level": {
                    "value": httpData.http[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }

            });
            //flv校验
            getArrForm(otherType + "_flvConfig", 0);
            getArrFormFields(otherType + "_flvConfig", 0, {
                "dvr_path": {
                    "value": flvData.flv[0].dvr_path,
                    "rule": {"required": true, "regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                    "msg": {"required": "dvr_path不能为空！", "regexp": "不符合符合linux路径"}
                },
                "dvr_duration": {
                    "value": flvData.flv[0].dvr_duration,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "dvr_duration不能为空", "regexp": "只能是整数！"}
                },
                /*"custom_setting": {
                    "value": flvData.flv[0].custom_setting,
                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                },*/
                "take_effect_level": {
                    "value": flvData.flv[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }
            })
            //hls校验
            getArrForm(otherType + "_hlsConfig", 0);
            getArrFormFields(otherType + "_hlsConfig", 0, {
                "hls_path": {
                    "value": hlsData.hls[0].hls_path,
                    "rule": {"required": true, "regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                    "msg": {"required": "hls_path不能为空！", "regexp": "不符合符合linux路径"}
                },
                "hls_fragment": {
                    "value": hlsData.hls[0].hls_fragment,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "hls_fragment不能为空！", "regexp": "只能是整数！"}
                },
                "hls_window": {
                    "value": hlsData.hls[0].hls_window,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "hls_window不能为空！", "regexp": "只能是整数！"}
                },
                "hls_index": {
                    "value": hlsData.hls[0].hls_index,
                    "rule": {"required": true},
                    "msg": {"required": "hls_index不能为空！"}
                },
                /*"custom_setting": {
                    "value": hlsData.hls[0].custom_setting,
                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                },*/
                "take_effect_level": {
                    "value": hlsData.hls[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }
            })
            //mp4校验
            getArrForm(otherType + "_mp4Config", 0);
            getArrFormFields(otherType + "_mp4Config", 0, {
                "mp4_path": {
                    "value": mp4Data.mp4[0].mp4_path,
                    "rule": {"required": true, "regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                    "msg": {"required": "mp4_path不能为空", "regexp": "不符合符合linux路径"}
                },
                "mp4_duration": {
                    "value": mp4Data.mp4[0].mp4_duration,
                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                    "msg": {"required": "mp4_duration不能为空", "regexp": "只能是整数！"}
                },
                "mp4_copy_path": {
                    "value": mp4Data.mp4[0].mp4_copy_path,
                    "rule": {"regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                    "msg": {"regexp": "不符合符合linux路径"}
                },
                "mp4_file_expired": {
                    "value": mp4Data.mp4[0].mp4_file_expired,
                    "rule": {"required": true, "regexp": /^[0-9a-zA-Z]*$/},
                    "msg": {"required": "mp4_copy_path不能为空", "regexp": "只能是数字、大小写字母组成！"}
                },
                /*"custom_setting": {
                    "value": mp4Data.mp4[0].custom_setting,
                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                },*/
                "take_effect_level": {
                    "value": mp4Data.mp4[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }
            })
            //print校验
            getArrForm(otherType + "_printConfig", 0);
            getArrFormFields(otherType + "_printConfig", 0, {
                "publish": {
                    "value": printData.pithy_print[0].publish,
                    "rule": {"regexp": /^[0-9]*$/},
                    "msg": {"regexp": "只能是整数！"}
                },
                "play": {
                    "value": printData.pithy_print[0].play,
                    "rule": {"regexp": /^[0-9]*$/},
                    "msg": {"regexp": "只能是整数！"}
                },
                "hdl": {
                    "value": printData.pithy_print[0].hdl,
                    "rule": {"regexp": /^[0-9]*$/},
                    "msg": {"regexp": "只能是整数！"}
                },
                "take_effect_level": {
                    "value": printData.pithy_print[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }
            })
            //http-ts校验
            getArrForm(otherType + "_httpTsConfig", 0);
            getArrFormFields(otherType + "_httpTsConfig", 0, {
                "take_effect_level": {
                    "value": httpTsData.http_ts[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }/*,
                "custom_setting": {
                    "value": httpTsData.http_ts[0].custom_setting,
                    "rule": {"required": true},
                    "msg": {"required": "自定义配置不能为空"}
                }*/
            })
            //ip_list校验
            var isIp = /^(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))([\n\r]((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))+))$/;
            getArrForm(otherType + "_ipListConfig", 0);
            getArrFormFields(otherType + "_ipListConfig", 0, {
                "white_list_ip": {
                    "value": ipListData.ip_list[0].white_list_ip,
                    "rule": {"regexp": isIp},
                    "msg": {"regexp": "不符合IP地址规则，多个IP请回车换行进行分隔！"}
                },
                "black_list_ip": {
                    "value": ipListData.ip_list[0].black_list_ip,
                    "rule": {"regexp": isIp},
                    "msg": {"regexp": "不符合IP地址规则，多个IP请回车换行进行分隔！"}
                },
                "take_effect_level": {
                    "value": ipListData.ip_list[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }
            })
            //refer校验
            /* getArrForm(otherType+"_referConfig",0);
             getArrFormFields(otherType+"_referConfig",0,{
             "take_effect_level": {
             "value":  referData.refer[0].take_effect_level.length,
             "rule": {"required":true},
             "msg": {"required": "请填写生效层级！"}
             }
             })*/
            //http-hook
            getArrForm(otherType + "_httpHookConfig", 0);
            var opt = formatHttpHookFields(httpHookData.http_hook[0].hook_event);
            //console.log(opt);
            getArrFormFields(otherType + "_httpHookConfig", 0, {
                ...opt,
                "take_effect_level": {
                    "value": httpHookData.http_hook[0].take_effect_level.length,
                    "rule": {"required": true},
                    "msg": {"required": "请填写生效层级！"}
                }
            });
           // var urlList = /^(((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)|((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)([\r\n]((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?))+)$/i;
            var urlList =PANURLLIST;
            var hook_event = httpHookData.http_hook[0].hook_event;
            for (var i = 0; i < hook_event.length; i++) {
                getArrformArrField(otherType + "_httpHookConfig", 0, hook_event[i].http_hook_name + "-name", 0, {
                    "value": "",
                    "rule": {"required": true, "regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`]*$/},
                    "msg": {"required": "name不能为空", "regexp": "格式错误，只能由英文字母、数字、特殊符号组成"}
                });
                getArrformArrField(otherType + "_httpHookConfig", 0, hook_event[i].http_hook_name + "-url", 0, {
                    "value": "",
                    "rule": {"required": true, "regexp": urlList},
                    "msg": {"required": "url不能为空", "regexp": "不符合url规则，多个请回车换行进行分隔"}
                });
            }

        } else {
            //console.log("yyy");
            //已经配置过
            var data = {
                "query": {
                    "_id": otherId
                }
            }
            $.ajax({
                url: `${URL}/GetClmsConfig`,
                type: 'post',
                data: JSON.stringify(data),
                async: false,  //默认为true 异步
                dataType: "json",
                error: function (error) {
                    var data = $.parseJSON(error.responseText);
                    new ShowDiag({
                        msg: !data.info.warning ? '操作失败！' : data.info.warning,
                        closetime: 2
                    });
                },
                success: function (data) {
                    //console.log(data);
                    var info = data.info;
                    if (info.status == "success") {
                        if (!info.data) {
                            new ShowDiag({
                                msg: "配置数据不存在！",
                                closetime: 2
                            });
                            /* var path = `/clms`;
                             // this.props.history.push (null, path);
                             _thisCont.router.push(path);*/
                            return;
                        }
                        var dataInfo = info.data[0],
                            configData = Object.assign({}, dataInfo),
                            setData = dataInfo.set_data;
                        //ctype=dataInfo.hasOwnProperty("push_id")?"pull":"push";
                        //client_devs_group=!dataInfo.client_devs_group?{}:dataInfo.client_devs_group;
                        delete configData.set_data;
                        delete configData.client_devs_group;
                        //var defaultOprData = Object.assign({}, IPCONFIGINFO);
                        //var defaultOprData=Object.create(IPCONFIGINFO);
                        var defaultOprData= JSON.parse(JSON.stringify(IPCONFIGINFO));
                        var ipData = !dataInfo.client_devs_group ? defaultOprData : formatGetTopoData({"topology_info": dataInfo.client_devs_group});

                        var topoDatas = [];
                        if (!dataInfo.devs_group_id || dataInfo.source_station_type == "2") {
                            topoDatas = []
                        } else {
                            topoDatas = getTopoDatas({"query": {"devs_group_id": dataInfo.devs_group_id}}).data;
                        }
                        // var topoDatas=dataInfo.source_station_type=="2"?[]:getTopoDatas({"query":{"devs_group_id":dataInfo.devs_group_id}}).data;
                        /* for(var i=0;i<topoDatas.length;i++){
                         topoOpt.push(<Option key={topoDatas[i]._id}>{topoDatas[i].name}</Option>);
                         }*/
                        configData = {...configData, ...ipData, "topoDatas": topoDatas};
                        configData = otherType == "push" ? {
                            ...configData,
                            "oldChannel": dataInfo.channel_name,
                            "oldConfigId":dataInfo._id,
                            "oldChannelId":dataInfo.channel_id
                        } : {...configData};
                        // configData={...configData,"topology_info":ipData};
                        /*if(dataInfo.client_devs_group){
                         var ipData=formatGetTopoData({"topology_info":dataInfo.client_devs_group});
                         configData={...configData,"topology_info":ipData};
                         }*/
                        /* var defultConfigData=Object.assign({},CONFIGDEFAULTDATA),clmsConfigData={
                         ...defultConfigData,
                         ...defaultOprData
                         };*/
                        var cdata = {[otherType]: configData}, defShowData = {
                                "exist_level": [],
                                "show": false,
                                "currIndex": 0
                            },
                            getChannalData = setData.channel,
                            getOriginData = setData.origin,
                            getHttpData = setData.http,
                            getFlvData = setData.flv,
                            getHlsData = setData.hls,
                            getHttpTsData = setData.http_ts,
                            getMp4Data = setData.mp4,
                            getIpListData = setData.ip_list,
                            getHttpHookData = setData.http_hook,
                            getPrintData = setData.pithy_print,
                            getReferData = setData.refer;
                        for (var i = 0; i < getHttpHookData.length; i++) {
                            var thisHookData = getHttpHookData[i];
                            getHttpHookData[i] = {...thisHookData, "currHook": "on_connect"}
                        }
                        /*if(ctype=="pull"){
                         //otherConfigData={"push":Object.assign({},clmsConfigData)}
                         cdata = {
                         "configType": "pull",
                         "pull":configData,
                         "push":Object.assign({},clmsConfigData)
                         }
                         }else{
                         //otherConfigData={"push":Object.assign({},clmsConfigData)}
                         cdata = {
                         "configType": "push",
                         "push":configData,
                         "pull":Object.assign({},clmsConfigData)
                         }
                         }*/
                        //cdata = {[ctype]:configData};
                        dispatch(addConfigData(cdata));
                        dispatch(addConfigChannData({
                            ...defShowData,
                            "channel": getChannalData,
                            "exist_level": geteLeves(getChannalData)
                        }, otherType));
                        dispatch(addConfigOriginData({
                            ...defShowData,
                            "origin": getOriginData,
                            "exist_level": geteLeves(getOriginData)
                        }, otherType));
                        dispatch(addConfigHttpServiceData({
                            ...defShowData,
                            "http": getHttpData,
                            "exist_level": geteLeves(getHttpData)
                        }, otherType));
                        dispatch(addConfigFlvData({
                            ...defShowData,
                            "flv": getFlvData,
                            "exist_level": geteLeves(getFlvData)
                        }, otherType));
                        dispatch(addConfigHlsData({
                            ...defShowData,
                            "hls": getHlsData,
                            "exist_level": geteLeves(getHlsData)
                        }, otherType));
                        dispatch(addConfigHttpTsData({
                            ...defShowData,
                            "http_ts": getHttpTsData,
                            "exist_level": geteLeves(getHttpTsData)
                        }, otherType));
                        dispatch(addConfigMp4Data({
                            ...defShowData,
                            "mp4": getMp4Data,
                            "exist_level": geteLeves(getMp4Data)
                        }, otherType));
                        dispatch(addConfigIpListData({
                            ...defShowData,
                            "ip_list": getIpListData,
                            "exist_level": geteLeves(getIpListData)
                        }, otherType));
                        dispatch(addConfigPrintData({
                            ...defShowData,
                            "pithy_print": getPrintData,
                            "exist_level": geteLeves(getPrintData)
                        }, otherType));
                        dispatch(addConfigReferData({
                            ...defShowData,
                            "refer": getReferData,
                            "exist_level": geteLeves(getReferData)
                        }, otherType));
                        dispatch(addConfigHttpHookData({
                            ...defShowData,
                            "http_hook": getHttpHookData,
                            "exist_level": geteLeves(getHttpHookData)
                        }, otherType));
                        //添加校验
                        getFormFields(otherType + "_config", {
                            "channel_name": {
                                "value": configData.channel_name,
                                "rule": {"required":true,"regexp": PANURL},
                                /*"rule": {
                                    "required": true,
                                    "regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
                                },*/
                                "msg": {
                                    "required": `${otherType == "pull" ? "分发地址" : "推流地址"}不能为空！`,
                                    "regexp": `${otherType == "pull" ? "分发地址" : "推流地址"}格式错误`
                                }
                            },
                            "cluster": {
                                "value": configData.cluster_id,
                                "rule": {"required": true},
                                "msg": {"required": `集群不能为空！`}
                            }
                        });
                        // console.log(configData);
                        if (configData.source_station_type == "1") {
                            getFields(otherType + "_config", "topology", {
                                "value": configData.topology_id,
                                "rule": {"required": true},
                                "msg": {"required": `拓扑结构不能为空！`}
                            });
                            getFields(otherType + "_config", "devs_group", {
                                "value": configData.devs_group_id,
                                "rule": {"required": true},
                                "msg": {"required": `设备组不能为空！`}
                            });
                        }
                        else {
                            //getKeyField(form,name,key ,opt)
                            for (var i = 0; i < configData.topology_info.default.Ipinfo.length; i++) {
                                getKeyField(otherType + "_config", "defIp", i, {
                                    "value": configData.topology_info.default.Ipinfo[i].ip,
                                    "rule": {
                                        "required": true
                                    },
                                    "msg": {"required": "默认IP不能为空！"}
                                });
                            }

                        }
                        //频道校验
                        // var _thisChannelData=channelConfig[otherType].channel;
                        for (var i = 0; i < getChannalData.length; i++) {
                            getArrForm(otherType + "_channelConfig", i);
                            getArrFormFields(otherType + "_channelConfig", i, {
                                "listen": {
                                    "value": getChannalData[i].listen,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "listen不能为空！", "regexp": "只能是整数"}
                                },
                                "queue_length": {
                                    "value": getChannalData[i].queue_length,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "queue_length不能为空", "regexp": "只能是整数"}
                                },
                                "chunk_size": {
                                    "value": getChannalData[i].chunk_size,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "chunk_size不能为空！", "regexp": "只能是整数"}
                                },
                                "stream_timeout": {
                                    "value": getChannalData[i].stream_timeout,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "stream_timeout不能为空！", "regexp": "只能是整数"}
                                },
                                /*"custom_setting": {
                                    "value": getChannalData[i].custom_setting,
                                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                                },*/
                                "take_effect_level": {
                                    "value": getChannalData[i].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }
                            });
                        }
                        //回源校验
                        for (var i = 0; i < getOriginData.length; i++) {
                            getArrForm(otherType + "_orginConfig", i);
                            getArrFormFields(otherType + "_orginConfig", i, {
                                "listen": {
                                    "value": getOriginData[i].listen,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "listen不能为空！", "regexp": "只能是整数"}
                                },
                                "interface": {
                                    "value": getOriginData[i].interface,
                                    "rule": {"required":true,"regexp": PANURL},
                                   /* "rule": {
                                        "required": true,
                                        "regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
                                    },*/
                                    "msg": {"required": "interface不能为空", "regexp": "格式错误，不符合url规则！"}
                                },
                                "server_key": {
                                    "value": getOriginData[i].server_key,
                                    "rule": {"regexp": /^(\-|\+)?\d+(\.\d+)?$/},
                                    "msg": {"regexp": "格式错误，只能是数字！"}
                                },
                                "hash_str": {
                                    "value": getOriginData[i].hash_str,
                                    "rule": {"regexp": /^[A-Za-z\$]+$/},
                                    "msg": {"regexp": "格式错误，只能由英文字母以及“$”组成！"}
                                },
                                "upnode_vhost": {
                                    "value": getOriginData[i].upnode_vhost,
                                    "rule": {"regexp": PANURL},
                                    //"rule": {"regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                                    "msg": {"regexp": "格式错误，不符合url规则！"}
                                },
                                "backsource_timeout": {
                                    "value": getOriginData[i].backsource_timeout,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "backsource_timeout不能为空！", "regexp": "格式错误，只能是整数！"}
                                },
                                /*"custom_setting": {
                                    "value": getOriginData[i].custom_setting,
                                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                                },*/
                                "take_effect_level": {
                                    "value": getOriginData[i].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }

                            });
                        }
                        //http校验
                        for (var index = 0; index < getHttpData.length; index++) {
                            getArrForm(otherType + "_httpConfig", index);
                            getArrFormFields(otherType + "_httpConfig", index, {
                                "dir": {
                                    "value": getHttpData[index].dir,
                                    "rule": {"required": true, "regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                                    "msg": {"required": "dir不能为空", "regexp": "不符合符合linux路径"}
                                },
                                "hdl_buffer_length": {
                                    "value": getHttpData[index].hdl_buffer_length,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "hdl_buffer_length不能为空！", "regexp": "只能是整数！"}
                                },
                                "hdl_error_code": {
                                    "value": getHttpData[index].hdl_error_code,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "hdl_error_code不能为空！", "regexp": "只能是整数！"}
                                },
                                "hdl_error_info": {
                                    "value": getHttpData[index].hdl_error_info,
                                    "rule": {"required": true},
                                    "msg": {"required": "hdl_error_info不能为空！"}
                                },
                               /* "custom_setting": {
                                    "value": getHttpData[index].custom_setting,
                                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                                },*/
                                "take_effect_level": {
                                    "value": getHttpData[index].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }

                            });
                        }
                        //flv校验
                        for (var index = 0; index < getFlvData.length; index++) {
                            getArrForm(otherType + "_flvConfig", index);
                            getArrFormFields(otherType + "_flvConfig", index, {
                                "dvr_path": {
                                    "value": getFlvData[index].dvr_path,
                                    "rule": {"required": true, "regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                                    "msg": {"required": "dvr_path不能为空！", "regexp": "不符合符合linux路径"}
                                },
                                "dvr_duration": {
                                    "value": getFlvData[index].dvr_duration,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "dvr_duration不能为空", "regexp": "只能是整数！"}
                                },
                                /*"custom_setting": {
                                    "value": getFlvData[index].custom_setting,
                                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                                },*/
                                "take_effect_level": {
                                    "value": getFlvData[index].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }

                            });
                        }
                        //hls校验
                        for (var index = 0; index < getHlsData.length; index++) {
                            getArrForm(otherType + "_hlsConfig", index);
                            getArrFormFields(otherType + "_hlsConfig", index, {
                                "hls_path": {
                                    "value": getHlsData[index].hls_path,
                                    "rule": {"required": true, "regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                                    "msg": {"required": "hls_path不能为空！", "regexp": "不符合符合linux路径"}
                                },
                                "hls_fragment": {
                                    "value": getHlsData[index].hls_fragment,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "hls_fragment不能为空！", "regexp": "只能是整数！"}
                                },
                                "hls_window": {
                                    "value": getHlsData[index].hls_window,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "hls_window不能为空！", "regexp": "只能是整数！"}
                                },
                                "hls_index": {
                                    "value": getHlsData[index].hls_index,
                                    "rule": {"required": true},
                                    "msg": {"required": "hls_index不能为空！"}
                                },
                               /* "custom_setting": {
                                    "value": getHlsData[index].custom_setting,
                                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                                },*/
                                "take_effect_level": {
                                    "value": getHlsData[index].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }
                            })
                        }
                        //mp4校验
                        for (var index = 0; index < getMp4Data.length; index++) {
                            getArrForm(otherType + "_mp4Config", index);
                            getArrFormFields(otherType + "_mp4Config", index, {
                                "mp4_path": {
                                    "value": getMp4Data[index].mp4_path,
                                    "rule": {"required": true, "regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                                    "msg": {"required": "mp4_path不能为空", "regexp": "不符合符合linux路径"}
                                },
                                "mp4_duration": {
                                    "value": getMp4Data[index].mp4_duration,
                                    "rule": {"required": true, "regexp": /^[0-9]*$/},
                                    "msg": {"required": "mp4_duration不能为空", "regexp": "只能是整数！"}
                                },
                                "mp4_copy_path": {
                                    "value": getMp4Data[index].mp4_copy_path,
                                    "rule": {"regexp": /^([\/]([\w-][\/]{0,1})+)*$/},
                                    "msg": {"regexp": "不符合符合linux路径"}
                                },
                                "mp4_file_expired": {
                                    "value": getMp4Data[index].mp4_file_expired,
                                    "rule": {"required": true, "regexp": /^[0-9a-zA-Z]*$/},
                                    "msg": {"required": "mp4_copy_path不能为空", "regexp": "只能是数字、大小写字母组成！"}
                                },
                               /* "custom_setting": {
                                    "value": getMp4Data[index].custom_setting,
                                    "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                                    "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                                },*/
                                "take_effect_level": {
                                    "value": getMp4Data[index].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }
                            })
                        }
                        //print校验
                        for (var index = 0; index < getPrintData.length; index++) {
                            getArrForm(otherType + "_printConfig", index);
                            getArrFormFields(otherType + "_printConfig", index, {
                                "publish": {
                                    "value": getPrintData[index].publish,
                                    "rule": {"regexp": /^[0-9]*$/},
                                    "msg": {"regexp": "只能是整数！"}
                                },
                                "play": {
                                    "value": getPrintData[index].play,
                                    "rule": {"regexp": /^[0-9]*$/},
                                    "msg": {"regexp": "只能是整数！"}
                                },
                                "hdl": {
                                    "value": getPrintData[index].hdl,
                                    "rule": {"regexp": /^[0-9]*$/},
                                    "msg": {"regexp": "只能是整数！"}
                                },
                                "take_effect_level": {
                                    "value": getPrintData[index].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }
                            })
                        }
                        //http-ts校验
                        for (var index = 0; index < getHttpTsData.length; index++) {
                            getArrForm(otherType + "_httpTsConfig", index);
                            getArrFormFields(otherType + "_httpTsConfig", index, {
                                "take_effect_level": {
                                    "value": getHttpTsData[index].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }/*,
                                "custom_setting": {
                                    "value": getHttpTsData[index].custom_setting,
                                    "rule": {"required": true},
                                    "msg": {"required": "自定义配置不能为空"}
                                },*/
                            })
                        }

                        //ip_list校验
                        var isIp = /^(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))([\n\r]((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))+))$/;
                        for (var index = 0; index < getIpListData.length; index++) {
                            getArrForm(otherType + "_ipListConfig", index);
                            getArrFormFields(otherType + "_ipListConfig", index, {
                                "white_list_ip": {
                                    "value": getIpListData[index].white_list_ip,
                                    "rule": {"regexp": isIp},
                                    "msg": {"regexp": "不符合IP地址规则，多个IP请回车换行进行分隔！"}
                                },
                                "black_list_ip": {
                                    "value": getIpListData[index].black_list_ip,
                                    "rule": {"regexp": isIp},
                                    "msg": {"regexp": "不符合IP地址规则，多个IP请回车换行进行分隔！"}
                                },
                                "take_effect_level": {
                                    "value": getIpListData[index].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }
                            })
                        }

                        //refer校验
                        /*for(var index=0;index<getReferData.length;index++){
                         getArrForm(otherType+"_referConfig",index);
                         getArrFormFields(ctype+"_referConfig",index,{
                         "take_effect_level": {
                         "value": getReferData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }
                         })
                         }*/
                        //http-hook
                        for (var index = 0; index < getHttpHookData.length; index++) {
                            getArrForm(otherType + "_httpHookConfig", index);
                            var opt = formatHttpHookFields(getHttpHookData[index].hook_event);
                            //console.log(opt);
                            getArrFormFields(otherType + "_httpHookConfig", index, {
                                ...opt,
                                "take_effect_level": {
                                    "value": getHttpHookData[index].take_effect_level.length,
                                    "rule": {"required": true},
                                    "msg": {"required": "请填写生效层级！"}
                                }
                            });
                            //var urlList = /^(((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)|((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)([\r\n]((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?))+)$/i;
                            var urlList =PANURLLIST;
                            var hook_event = getHttpHookData[index].hook_event;
                            for (var i = 0; i < hook_event.length; i++) {
                                getArrformArrField(otherType + "_httpHookConfig", 0, hook_event[i].http_hook_name + "-name", 0, {
                                    "value": "",
                                    "rule": {"required": true, "regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`]*$/},
                                    "msg": {"required": "name不能为空", "regexp": "格式错误，只能由英文字母、数字、特殊符号组成"}
                                });
                                getArrformArrField(otherType + "_httpHookConfig", 0, hook_event[i].http_hook_name + "-url", 0, {
                                    "value": "",
                                    "rule": {"required": true, "regexp": urlList},
                                    "msg": {"required": "url不能为空", "regexp": "不符合url规则，多个请回车换行进行分隔"}
                                });
                            }
                        }

                        /* //给other添加校验
                         getFormFields(otherType+"_config", {
                         "channel_name": {
                         "value": configData.channel_name,
                         "rule": {"required": true,"regexp":/^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                         "msg": {"required": `${otherType=="pull"?"分发地址":"推流地址"}不能为空！`,"regexp": `${otherType=="pull"?"分发地址":"推流地址"}格式错误`}
                         },
                         "cluster": {
                         "value": configData.cluster_id,
                         "rule": {"required": true},
                         "msg": {"required": `集群不能为空！`}
                         }
                         });
                         // console.log(configData);
                         if(configData.source_station_type=="1"){
                         getFields(otherType+"_config","topology",{
                         "value":configData.topology_id,
                         "rule": {"required": true},
                         "msg": {"required": `拓扑结构不能为空！`}
                         });
                         getFields(otherType+"_config","devs_group",{
                         "value": configData.devs_group_id,
                         "rule": {"required": true},
                         "msg": {"required": `设备组不能为空！`}
                         });
                         }
                         else{
                         //getKeyField(form,name,key ,opt)
                         for(var i=0;i<configData.topology_info.default.Ipinfo.length;i++){
                         getKeyField(otherType+"_config","defIp",i,{
                         "value":configData.topology_info.default.Ipinfo[i].ip,
                         "rule": {"required": true,"regexp":/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/},
                         "msg": {"required": "默认IP不能为空！","regexp":"IP格式错误！"}
                         });
                         }

                         }
                         //频道校验
                         // var _thisChannelData=channelConfig[otherType].channel;
                         for(var i=0;i<getChannalData.length;i++){
                         getArrForm(otherType+"_channelConfig",i);
                         getArrFormFields(otherType+"_channelConfig",i,{
                         "queue_length": {
                         "value": getChannalData[i].queue_length,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数"}
                         },
                         "chunk_size": {
                         "value": getChannalData[i].chunk_size,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数"}
                         },
                         "stream_timeout": {
                         "value": getChannalData[i].stream_timeout,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数"}
                         },
                         "custom_setting": {
                         "value":getChannalData[i].custom_setting,
                         "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                         "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                         },
                         "take_effect_level": {
                         "value": getChannalData[i].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }
                         });
                         }
                         //回源校验
                         for(var i=0;i<getOriginData.length;i++){
                         getArrForm(otherType+"_orginConfig",i);
                         getArrFormFields(otherType+"_orginConfig",i,{
                         "listen": {
                         "value": getOriginData[i].listen,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数"}
                         },
                         "interface": {
                         "value": getOriginData[i].interface,
                         "rule": {"regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                         "msg": {"regexp": "格式错误，不符合url规则！"}
                         },
                         "server_key": {
                         "value": getOriginData[i].server_key,
                         "rule": {"regexp": /^(\-|\+)?\d+(\.\d+)?$/},
                         "msg": {"regexp": "格式错误，只能是数字！"}
                         },
                         "hash_str": {
                         "value": getOriginData[i].hash_str,
                         "rule": {"regexp": /^[A-Za-z\$]+$/},
                         "msg": {"regexp": "格式错误，只能由英文字母以及“$”组成！"}
                         },
                         "upnode_vhost": {
                         "value": getOriginData[i].upnode_vhost,
                         "rule": {"regexp": /^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i},
                         "msg": {"regexp": "格式错误，不符合url规则！"}
                         },
                         "backsource_timeout": {
                         "value": getOriginData[i].backsource_timeout,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "格式错误，只能是整数！"}
                         },
                         "custom_setting": {
                         "value":getOriginData[i].custom_setting,
                         "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                         "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                         },
                         "take_effect_level": {
                         "value": getOriginData[i].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }

                         });
                         }
                         //http校验
                         for(var index=0;index<getHttpData.length;index++){
                         getArrForm(otherType+"_httpConfig",index);
                         getArrFormFields(otherType+"_httpConfig",index,{
                         "dir": {
                         "value": getHttpData[index].dir,
                         "rule": {"regexp":/^([\/][\w-]+)*$/},
                         "msg": {"regexp": "不符合符合linux路径"}
                         },
                         "hdl_buffer_length": {
                         "value":  getHttpData[index].hdl_buffer_length,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "hdl_error_code": {
                         "value":  getHttpData[index].hdl_error_code,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "custom_setting": {
                         "value":getHttpData[index].custom_setting,
                         "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                         "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                         },
                         "take_effect_level": {
                         "value": getHttpData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }

                         });
                         }
                         //flv校验
                         for(var index=0;index<getFlvData.length;index++){
                         getArrForm(otherType+"_flvConfig",index);
                         getArrFormFields(otherType+"_flvConfig",index,{
                         "dvr_path": {
                         "value": getFlvData[index].dvr_path,
                         "rule": {"regexp":/^([\/][\w-]+)*$/},
                         "msg": {"regexp": "不符合符合linux路径"}
                         },
                         "dvr_duration": {
                         "value":  getFlvData[index].dvr_duration,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "custom_setting": {
                         "value":getFlvData[index].custom_setting,
                         "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                         "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                         },
                         "take_effect_level": {
                         "value": getFlvData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }

                         });
                         }
                         //hls校验
                         for(var index=0;index<getHlsData.length;index++){
                         getArrForm(otherType+"_hlsConfig",index);
                         getArrFormFields(otherType+"_hlsConfig",index,{
                         "hls_path": {
                         "value":getHlsData[index].hls_path,
                         "rule": {"regexp":/^([\/][\w-]+)*$/},
                         "msg": {"regexp": "不符合符合linux路径"}
                         },
                         "hls_fragment": {
                         "value":  getHlsData[index].hls_fragment,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "hls_window": {
                         "value":  getHlsData[index].hls_window,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "custom_setting": {
                         "value":getHlsData[index].custom_setting,
                         "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                         "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                         },
                         "take_effect_level": {
                         "value": getHlsData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }
                         })
                         }
                         //mp4校验
                         for(var index=0;index<getMp4Data.length;index++){
                         getArrForm(otherType+"_mp4Config",index);
                         getArrFormFields(otherType+"_mp4Config",index,{
                         "mp4_path": {
                         "value": getMp4Data[index].mp4_path,
                         "rule": {"regexp":/^([\/][\w-]+)*$/},
                         "msg": {"regexp": "不符合符合linux路径"}
                         },
                         "mp4_duration": {
                         "value":  getMp4Data[index].mp4_duration,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "mp4_copy_path": {
                         "value": getMp4Data[index].mp4_copy_path,
                         "rule": {"regexp":/^([\/][\w-]+)*$/},
                         "msg": {"regexp": "不符合符合linux路径"}
                         },
                         "mp4_file_expired": {
                         "value":  getMp4Data[index].mp4_file_expired,
                         "rule": {"regexp": /^[0-9a-zA-Z]*$/},
                         "msg": {"regexp": "只能是数字、大小写字母组成！"}
                         },
                         "custom_setting": {
                         "value": getMp4Data[index].custom_setting,
                         "rule": {"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:\r\n]*$/},
                         "msg": {"regexp": "自定义配置由英文字母、数字、特殊符号组成，不同配置请回车换行进行分隔"}
                         },
                         "take_effect_level": {
                         "value":  getMp4Data[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }
                         })
                         }
                         //print校验
                         for(var index=0;index<getPrintData.length;index++){
                         getArrForm(otherType+"_printConfig",index);
                         getArrFormFields(otherType+"_printConfig",index,{
                         "publish": {
                         "value": getPrintData[index].publish,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "play": {
                         "value":  getPrintData[index].play,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "hdl": {
                         "value":  getPrintData[index].hdl,
                         "rule": {"regexp": /^[0-9]*$/},
                         "msg": {"regexp": "只能是整数！"}
                         },
                         "take_effect_level": {
                         "value":  getPrintData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }
                         })
                         }
                         //http-ts校验
                         for(var index=0;index<getHttpTsData.length;index++){
                         getArrForm(otherType+"_httpTsConfig",index);
                         getArrFormFields(otherType+"_httpTsConfig",index,{
                         "take_effect_level": {
                         "value":  getHttpTsData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }
                         })
                         }

                         //ip_list校验
                         var isIp = /^(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))([\n\r]((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))+))$/;
                         for(var index=0;index<getIpListData.length;index++){
                         getArrForm(otherType+"_ipListConfig",index);
                         getArrFormFields(otherType+"_ipListConfig",index,{
                         "white_list_ip": {
                         "value":  getIpListData[index].white_list_ip,
                         "rule": {"regexp": isIp},
                         "msg": {"regexp": "不符合IP地址规则，多个IP请回车换行进行分隔！"}
                         },
                         "black_list_ip": {
                         "value":  getIpListData[index].black_list_ip,
                         "rule": {"regexp": isIp},
                         "msg": {"regexp": "不符合IP地址规则，多个IP请回车换行进行分隔！"}
                         },
                         "take_effect_level": {
                         "value":  getIpListData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }
                         })
                         }

                         //refer校验
                         for(var index=0;index<getReferData.length;index++){
                         getArrForm(otherType+"_referConfig",index);
                         getArrFormFields(otherType+"_referConfig",index,{
                         "take_effect_level": {
                         "value": getReferData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }
                         })
                         }
                         //http-hook
                         for(var index=0;index<getHttpHookData.length;index++){
                         getArrForm(otherType+"_httpHookConfig",index);
                         var opt=formatHttpHookFields(getHttpHookData[index].hook_event);
                         //console.log(opt);
                         getArrFormFields(otherType+"_httpHookConfig",index,{...opt,
                         "take_effect_level": {
                         "value": getHttpHookData[index].take_effect_level.length,
                         "rule": {"required":true},
                         "msg": {"required": "请填写生效层级！"}
                         }} );
                         var urlList=/^(((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)|((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)([\r\n]((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?))+)$/i;
                         var hook_event=getHttpHookData[index].hook_event;
                         for(var i=0;i<hook_event.length;i++){
                         getArrformArrField(otherType+"_httpHookConfig",0,hook_event[i].http_hook_name+"-name",0,{
                         "value": "",
                         "rule": {"required":true,"regexp": /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`]*$/},
                         "msg": {"required": "name不能为空","regexp":"格式错误，只能由英文字母、数字、特殊符号组成"}
                         });
                         getArrformArrField(otherType+"_httpHookConfig",0,hook_event[i].http_hook_name+"-url",0,{
                         "value": "",
                         "rule": {"required": true,"regexp":urlList},
                         "msg": {"required": "url不能为空","regexp":"不符合url规则，多个请回车换行进行分隔"}
                         });
                         }
                         }
                         */


                    } else {
                        new ShowDiag({
                            msg: !data.info.warning ? '操作失败！' : data.info.warning,
                            closetime: 2
                        });
                    }
                }
            });
            //拷贝清空关联配置id
            if(params.type=="copy"&&ctype=="pull"){
                dispatch(editConfigData({[_thisIdType]:"default"},ctype));
            }

        }
        //console.log(clmsConfig);
        //console.log(clmsConfig[ctype][otherId]);
        //console.log(this.props.clmsConfig);
    }

    choseConfig(index) {
        //console.log(index);
        const {dispatch,clmsConfig}=this.props;
        var configType = clmsConfig.configType;
        dispatch(addConfigChannData({"currIndex": index}, configType));

    }

    delConfig(index) {
        //console.log(index);
        const {dispatch,clmsConfig,channelConfig}=this.props;
        var configType = clmsConfig.configType;
        if (index < channelConfig[configType].currIndex) {
            dispatch(addConfigChannData({"currIndex": index}, configType));
        } else if (index == channelConfig[configType].currIndex) {
            if(index==0){
                dispatch(addConfigChannData({"currIndex": 0}, configType));
            }else{
                dispatch(addConfigChannData({"currIndex": index - 1}, configType));
            }

        }
        dispatch(delChannelData(index, configType));
    }

    addChannel() {
        const {dispatch,channelConfig,clmsConfig}=this.props;
        var configType = clmsConfig.configType;
        if(channelConfig[configType].channel.length==4){
            new ShowDiag({
                msg: "最多只能添加4个配置！",
                closetime: 2
            });
            return;
        }
        if (channelConfig[configType].exist_level.length >= 4) {
            new ShowDiag({
                msg: "生效层级已经全部被选，不能再添加配置！",
                closetime: 2
            });
            return;
        }
        var data = {
            "listen":"1935",
            "queue_wait_key": "on",
            "queue_length": "30",
            "fast_gop": "off",
            "chunk_size": "60000",
            "hdl": "on",
            "gop_cache": "on",
            "time_jitter": "zero",
            "stream_timeout": "60",
            "player_buffer_enabled": "off ",
            "check_stream_timestamp": "off ",
            "custom_setting": "",
            "take_effect_level": []
        };
        dispatch(addChannelData(data, configType));
    }

    //生效层级
    addLevel(e, curr) {
        const {dispatch,clmsConfig}=this.props;
        var configType = clmsConfig.configType;
        var val = e.target.value, isCheck = e.target.checked;
        //console.log(e);
        dispatch(changeLevel(val, isCheck, curr, configType));
        //validateArrformField(configType+"_channelConfig","take_effect_level",e.target.value,curr)
    }

    render() {
        const {clmsConfig,channelConfig,dispatch,validator}=this.props;
        //console.log(clmsConfig);
        var configType = clmsConfig.configType,
            channelConfigType = channelConfig[configType],
            channelData = channelConfigType.channel,
            currConfig = channelData[channelConfigType.currIndex];
        //console.log(channelData);
        return (
            <div className="config-box">
                <div className="clearfix f-gradient">
                    <div className="col-xs-3"><h4>频道配置</h4></div>
                    <div className="col-xs-9 clms-cbtns">
                        <i onClick={()=>dispatch(addConfigChannData({"show":!channelConfigType.show},configType))}
                           className="iconfont more-dot">&#xe65e;</i>
                    </div>
                </div>
                <div className="b-main" style={{"display":channelConfigType.show?"block":"none"}}>
                    {/* <div className="form-group">
                     <label className="col-xs-1 control-label">生效层级：</label>
                     <div className="col-xs-2">
                     <input type="checkbox"/><label className="mr10">源</label>
                     <input type="checkbox"/><label className="mr10">上层</label>
                     <input type="checkbox"/><label className="mr10">中转</label>
                     <input type="checkbox"/><label className="mr10">边缘</label>
                     </div>
                     <div className="col-xs-2">
                     <i className="glyphicon glyphicon-plus green mr10"></i>
                     </div>
                     </div>*/}
                    <EffectLevel leves={currConfig.take_effect_level}
                                 existLevel={channelConfigType.exist_level}
                                 changeLevel={(e)=>{this.addLevel(e,channelConfigType.currIndex);
                                 validateArrformField(configType+"_channelConfig","take_effect_level",currConfig.take_effect_level.length,channelConfigType.currIndex)}}
                                 add={()=>this.addChannel()}
                                 thisForm={configType+"_channelConfig"}
                                 formIndex={channelConfigType.currIndex}
                        />

                    <div>
                        {/* <ul className="tab-nav clearfix">
                         <li className="active">配置1<i className="iconfont">&#xe600;</i></li>
                         <li>配置2<i className="iconfont">&#xe600;</i></li>
                         <li>配置3<i className="iconfont">&#xe600;</i></li>
                         </ul>*/}
                        <ConfigTab curr={channelConfigType.currIndex}
                                   data={channelData}
                                   label="配置"
                                   choseTab={(index)=>this.choseConfig(index)}
                                   delTab={(index)=>this.delConfig(index)}/>
                        {channelData.map((item, index)=>
                                <ChannelContent {...item} key={index} index={index}/>
                        )}


                    </div>
                </div>
            </div>
        )
    }
}
function sel(state) {
    // console.log(state);
    return {
        "clmsConfig": state.clmsConfig,
        "channelConfig": state.clmsChannelConfig,
        "clmsOriginConfig": state.clmsOriginConfig,
        "clmsHttpServiceConfig": state.clmsHttpServiceConfig,
        "clmsFlvConfig": state.clmsFlvConfig,
        "clmsHlsConfig": state.clmsHlsConfig,
        "clmsHttpTsConfig": state.clmsHttpTsConfig,
        "clmsMp4Config": state.clmsMp4Config,
        "clmsIpListConfig": state.clmsIpListConfig,
        "clmsPrintConfig": state.clmsPrintConfig,
        "clmsReferConfig": state.clmsReferConfig,
        "clmsHookConfig": state.clmsHookConfig,
        //"channelData":state.clmsChannelConfig.channel ,
        validator: state.validator_1
    }
}
export default connect(sel)(ChannelConfig)
ChannelConfig.contextTypes = {
    router: PropTypes.object
}