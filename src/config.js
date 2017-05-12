export const URL="";
//省份
export const PROVICES={
    "BJ":"北京",
    "TJ":"天津",
    "HE":"河北",
    "SX":"山西",
    "LN":"辽宁",
    "NM":"内蒙古",
    "JL":"吉林",
    "HL":"黑龙江",
    "SH":"上海",
    "JS":"江苏",
    "ZJ":"浙江",
    "AH":"安徽",
    "FJ":"福建",
    "JX":"江西",
    "SD":"山东",
    "HA":"河南",
    "HB":"湖北",
    "HN":"湖南",
    "GD":"广东",
    "GX":"广西",
    "HI":"海南",
    "CQ":"重庆",
    "SC":"四川",
    "GZ":"贵州",
    "YN":"云南",
    "XZ":"西藏",
    "SN":"陕西",
    "GS":"甘肃",
    "QH":"青海",
    "NX":"宁夏",
    "XJ":"新疆",
    "HK":"香港",
    "MC":"澳门",
    "TW":"台湾"
};
//运营商
export const OPERATORS ={
    "CHN":"中国电信",
    "UNI":"中国联通",
    "CMN":"中国移动",
    "CTT":"中国铁通",
    "CER":"中国教育",
    "GWB":"长城宽带",
    "BNN":"方正宽带",
    "CST":"中国科技",
    "BGC":"歌华有线",
    "WAS":"华数有线",
    "RFT":"广电网",
    "CNE":"中企通信",
    "ALY":"阿里云",
    "BWN":"京宽网络",
    "FLC":"中电飞华",
    "TPW":"天威视讯",
    "OCN":"东方有线",
    "GDC":"珠江宽频",
    "JSC":"江苏有线",
    "HNC":"湖南有线",
    "GDC":"广东有线",
    "GGL":"谷歌公司",
    "360":"360",
    "GDC":"视讯宽带",
    "EHN":"广州e家宽",
    "HGC":"和记电讯",
    "KJN":"北京宽捷",
    "SXT":"北京三信时代",
    "SNN":"光环新网",
    "CNE":"中信网络",
    "FRG":"国外"
};
//角色
export const ROLE={
    "1":"源站设备",
    "2":"中转设备",
    "3":"边缘设备",
    "4":"代理设备"
}
//设备状态
export const IFUSE ={
    "1":"启用",
    "2":"禁用",
    "3":"报修"
}
//设备类型
export const TYPE ={
    "1":"自有设备",
    "2":"第三方设备"
}
//层级
export const LEVEL={
    "1":"上层",
    "2":"中转",
    "3":"边缘",
    "4":"源站"
}
//状态
export const TASKSTATUS={
    "0":"失败",
    "1":"成功",
    "2":"无状态",
    "3":"进行中"

}
//clms默认配置模板
export const CONFIGDEFAULTDATA={
    "channel_id": "",
    "_id": "",
    "channel_name": "",
    "client_name": "",
    "cluster_name": "",
    "cluster_id": "",
    "source_station_type": "1",
    "devs_group_id": "",
    "topology_id": "",
    "topoDatas":[]
}

//运营商
export const IPCONFIGINFO = {
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
            "Ipinfo": [{ip: "", type: ""}],
        }
    }
}
//频道配置
export const CHANNNEL={
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
//回源配置
export const ORIGIN={
    "listen":"1935",
    "mode":"local",
    "interface":"",
    "server_key":"1.0",
    "type":"rtmp",
    "upnode_vhost":"",
    "token_traverse":"off",
    "backsource_timeout":"10",
    "hash_str":"$vhost$app$stream",
    "custom_setting":"",
    "take_effect_level":[]
};
//http服务器配置
export const HTTP={
    "enabled":"off",
    "dir":"",
    "http_ts_push_enabled":"on",
    "chunked_enabled":"on",
    "hdl_buffer_length":"3000",
    "hdl_error_code":"400",
    "hdl_error_info":"Bad Request",
    "custom_setting":"",
    "take_effect_level":[]
}
//hls
export const HLS ={
    "enabled":"off",
    "multi_bitrate":"off",
    "hls_path":"",
    "hls_fragment":"10",
    "hls_window":"3",
    "hls_index":"[stream]/index.m3u8",
    "wait_key":"off",
    "acodec":"aac",
    "vcodec":"avc",
    "ts_ms_name_enabled":"off",
    "hls_engine":"old",
    "time_jitter":"off",
    "custom_setting":"",
    "take_effect_level":[]
}
//flv服务
export const FLV= {
    "enabled":"off",
    "dvr_path":"",
    "dvr_plan":"segment",
    "dvr_duration":"30",
    "dvr_wait_keyframe":"on",
    "time_jitter":"zero",
    "custom_setting":"",
    "take_effect_level":[]
}
//Http+ts直播
export const HTTPTS= {
    "enabled":"off",
    "vcodec":"avc",
    "acodec":"aac",
    "custom_setting":"",
    "take_effect_level":[]
}
//MP4文件录制
export const MP4={
    "enabled":"off",
    "mp4_path":"",
    "mp4_plan":"session",
    "mp4_duration":"20",
    "mp4_wait_keyframe":"on",
    "time_jitter":"zero",
    "mp4_file_expired":"1day",
    "mp4_copy_enabled":"off",
    "mp4_copy_path":"",
    "custom_setting":"",
    "take_effect_level":[]
}
//IP防盗链
export const IPLIST={
    "white_list_enabled":"off",
    "white_list_ip":"",
    "black_list_ip":"",
    "black_list_enabled":"off",
    "white_custom_setting":"",
    "black_custom_setting":"",
    "take_effect_level":[]
}
//HttpHooks
export const HTTPHOOKS= {
    "currHook":"on_connect",
    "hook_global":{
        "enabled":"off",
        "on_consumers_enabled":"on",
        "on_publish_stream_info_enabled":"off",
        "on_edge_publish_stream_info_enabled":"off",
        "on_warn_info_enabled":"off"
    },
    "hook_event":[
        {
            "http_hook_name":"on_connect",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_close",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_publish",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_unpublish",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_play",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_stop",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_warn_back_source_connect",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"1000",
            "recv_timeout":"1000",
            "send_timeout":"1000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_edge_play_start",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"1000",
            "recv_timeout":"1000",
            "send_timeout":"1000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_edge_play_stop",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"1000",
            "recv_timeout":"1000",
            "send_timeout":"1000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_record_file",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"1000",
            "recv_timeout":"1000",
            "send_timeout":"1000",
            "type":"both",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        }
    ],
    "take_effect_level":[]
}
export const HTTPHOOKS2= {
    "currHook":"on_connect",
    "hook_global":{
        "enabled":"off",
        "on_consumers_enabled":"on",
        "on_publish_stream_info_enabled":"off",
        "on_edge_publish_stream_info_enabled":"off",
        "on_warn_info_enabled":"off"
    },
    "hook_event":[
        {
            "http_hook_name":"on_connect",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_close",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_publish",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_unpublish",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_play",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_stop",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"3000",
            "recv_timeout":"3000",
            "send_timeout":"3000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_warn_back_source_connect",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"1000",
            "recv_timeout":"1000",
            "send_timeout":"1000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_edge_play_start",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"1000",
            "recv_timeout":"1000",
            "send_timeout":"1000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_edge_play_stop",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"1000",
            "recv_timeout":"1000",
            "send_timeout":"1000",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        },
        {
            "http_hook_name":"on_record_file",
            "enabled":"off",
            "on_hook_warn_info_enabled":"off",
            "conn_timeout":"1000",
            "recv_timeout":"1000",
            "send_timeout":"1000",
            "type":"both",
            "hook":[
                {
                    "name":"",
                    "enabled":"on",
                    "sync":"off",
                    "url":""
                }
            ]
        }
    ],
    "take_effect_level":[]
}
//打印日志配置
export const PRINT={
    "enabled":"off",
    "publish":"60000",
    "play":"60000",
    "hdl":"60000",
    "custom_setting":"",
    "take_effect_level":[]
}
//Refer防盗链
export const REFER={
    "refer":"",
    "refer_publish":"",
    "refer_play":"",
    "take_effect_level":[]
}

//校验正则
export const LINUXPATH=/^((((\/)|(\.\/)){0,1}|(\.\.\/)*)([\w-][\/]{0,1})+)*$/;
//泛域名
export const PANURL=/^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10)(?:\.\d{1,3}){3})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(\*{1}|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+))(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/;

export const PANURLLIST = /^(((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10)(?:\.\d{1,3}){3})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(\*{1}|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+))(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)|((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10)(?:\.\d{1,3}){3})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(\*{1}|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+))(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?)([\r\n]((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10)(?:\.\d{1,3}){3})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(\*{1}|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+))(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?))+)$/i;
//export const PANURL=/^(([a-zA-Z0-9]+:)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(\*{1}|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+))(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/;
