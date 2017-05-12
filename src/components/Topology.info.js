import React, {
    Component,
    PropTypes
    } from 'react'
import { PROVICES,OPERATORS} from '../config.js';
export default class TopoInfo extends Component {
    constructor(state) {
        super(state);
    }
    render() {
        const { topos} = this.props;
       // console.log(this.props);
        return (
            <div className="modal fade f-modal" id="f-topo-info">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='iconfont'>&#xe602;</span> 拓扑详情</h4>
                        </div>
                        <div className="f-modal-body">
                            <div>
                                <div className="row">
                                    <label className="col-xs-3">拓扑名称：</label>
                                    <div className="col-xs-8">{topos&&topos.length?topos[0].name:""}</div>
                                </div>
                                {!topos||!topos.length||!(topos[0].topology_info)||!(topos[0].topology_info.default)?"":topos[0].topology_info.default.Ipinfo.map((item2,index2)=>
                                        <div key={index2} className="row">
                                            <label className="col-xs-3">{index2==0?"默认：":""}</label>
                                            <div className="col-xs-5">{item2.ip}</div>
                                            <div className="col-xs-2">{item2.type=="ip_main"?"主":"备"}</div>
                                        </div>
                                )}
                                <div className="lit-title"
                                     style={{"display":topos&&topos.length&&topos[0].topology_info.ipConfig.length==0||topos&&topos.length&&topos[0].topology_info.ipConfig.length==1&&!topos[0].topology_info.ipConfig[0].operators?"none":"block"}} >
                                    <span>配置</span>
                                </div>
                                {topos&&topos.length?topos[0].topology_info.ipConfig.map((item2,index2)=>
                                <div key={index2} style={{"display":!item2.operators?"none":"block"}}>
                                    <div className="row">
                                        <label className="col-xs-3">运营商：</label>
                                        <div className="col-xs-4">{ OPERATORS[item2.operators]?OPERATORS[item2.operators]:item2.operators}</div>
                                    </div>
                                    {item2.default.map((item3,index3)=>
                                            <div key={index3} className="row">
                                                <label className="col-xs-3">{index3==0?"默认：":""}</label>
                                                <div className="col-xs-5">{item3.ip}</div>
                                                <div className="col-xs-2">{item3.type=="ip_main"?"主":"备"}</div>
                                            </div>
                                    )}
                                    {item2.provinces.map((item,index)=>
                                    <div key={index} style={{"display":!item.province?"none":"block"}}>
                                        <div className="row">
                                            <label className="col-xs-3">省份：</label>
                                            <div className="col-xs-4">{PROVICES[item.province]?PROVICES[item.province]:item.province}</div>
                                        </div>
                                        {item.Ipinfo.map((item3,index3)=>
                                                <div key={index3} className="row">
                                                    <label className="col-xs-3">{index3==0?"IP地址：":""}</label>
                                                    <div className="col-xs-5">{item3.ip}</div>
                                                    <div className="col-xs-2">{item3.type=="ip_main"?"主":"备"}</div>
                                                </div>
                                        )}
                                    </div>
                                    )}
                                </div>

                                ):""}
                                <div style={{"display":!topos[0]||!topos[0].belongToCluster?"none":"block"}}>
                                    <div className="lit-title">
                                        <span>服务集群</span>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-8 col-xs-offset-1">
                                            <ul style={{"padding":"5px"}}>
                                                {topos&&topos.length&&topos[0].belongToCluster&&topos[0].belongToCluster.length?
                                                    topos[0].belongToCluster.map((citem,cindex)=>
                                                            <li key={cindex}>{citem.name}</li>
                                                    )
                                                    :"暂无数据！"}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="f-modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
