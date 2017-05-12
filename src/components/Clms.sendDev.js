import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import { listAction,changeChk,filterDataByName} from '../actions/listBoxactions'
import LisatBox from './listBox.js'
import { URL } from '../config.js';
import {ShowDiag,addOperation} from  "../public/js/f.js"
import {addSendData,changeDataChk} from "../actions/clmsActions.js"
import { Checkbox } from 'antd';
class ClmsSendDev extends Component {
    /*choseDev(){
        //console.log(this.props);
        const {dataList}=this.props;
        /!*var devList=[];
        if(devicesList.list&&devicesList.list.length){
            for(var i=0;i<devicesList.list.length;i++){
                var item={"_id":devicesList.list[i]._id,"name":devicesList.list[i].name,"addr":devicesList.list[i].addr,"ips":[...devicesList.list[i].ips],"isChk":false};
                devList.push(item);
            }
        }*!/
        // console.log(this.props.chkData);
        var _data={
            "dataList":dataList,
            "chkData":this.props.chkData?this.props.chkData:[],
            "chkAll":true,
            "isChose":true,
            "confirm":"确定",
            "cancel":"取消",
            "selectAll":"全选",
            "cancelAll":"反选",
            "clear":"清除"
        };
        this.props.dispatch(listAction(_data));
    }
    searhDevList(e){
        const {dispatch,dataList,clmsTask}=this.props;
        var val=e.target.value,_data={"sName":val,"allData":clmsTask.allData};
        dispatch(addSendData({"sName":val}));
        //刷选设备
        dispatch(filterDataByName(_data));

    }
    changeDevChk(index,e){
        const {dispatch,ListBox}=this.props;
        var dataList=ListBox.dataList,val=e.target.value;
        dispatch(changeDataChk({"isChk":e.target.checked},index));
        for(var i=0;i<dataList.length;i++){
            if(dataList[i]._id==val){
                dispatch(changeChk({"isChk":e.target.checked},i));
                break;
            }
        }

    }*/
   /* confirmChk(){
        const {chkData,dispatch}=this.props;
        var devs={},_ckData=chkData.slice(0);
        var devId=[];
        for(var i=0;i<_ckData.length;i++){
            devId.push(_ckData[i]._id);
        }
        //console.log(devId);
        var _data={"selectDatas":_ckData,"dev_id":devId};
        dispatch(addSendData(_data));
        dispatch(listAction({"isChose":false}));
    }*/
    /*confirmSend(e){
        e.preventDefault();
        const {clmsTask,dispatch}=this.props;
        //var _data={"task_list":[{"dev_id":clmsTask["dev_id"],"vhost_list":clmsTask["vhost_list"]}]};
        var devDatas=clmsTask.allData,devId=[];
        for(var i=0;i<devDatas.length;i++){
            devId.push(devDatas[i].dev_id);
        }
        var _data={
            "opt_type":clmsTask.opt_type,
            "_id":clmsTask._id,
            "name":clmsTask.channelName,
            "dev_id":devId
        }
        $.ajax({
            url:`${URL}/SendConfigByDevInfoClms`,
            type:'post',
            //data:JSON.stringify({"query":_data,"page":"1","row":"10"}),
            data:JSON.stringify(_data),
            async: true,  //默认为true 异步
            dataType: "json",
            error:function(error){
                var data=$.parseJSON(error.responseText);
                new ShowDiag({
                    msg: !data.info.warning?'设备重新下发失败！':data.info.warning,
                    closetime: 2
                });
            },
            success:function(data){
                //console.log(data);
                if(data.info.status=="success"){
                    $("#f-sendDev-modal").modal("hide");
                    new ShowDiag({
                        msg: '设备重新下发成功,请稍后刷新状态！',
                        closetime: 1
                    });
                    addOperation(`下发${clmsTask.channelName}的设备`);
                    //dispatch(listAction({"dataList":[],"chkData":[]}));
                    //dispatch(showDeviceList(data));
                }else{
                    new ShowDiag({
                        msg: !data.info.warning?'设备重新下发失败！':data.info.warning,
                        closetime: 2
                    });
                }
            }
        });
    }*/
    render() {
        const { dispatch,clmsTask} = this.props;
       // console.log(clmsTask.sName);style={{'minWidth':'800px'}} style={{'minHeight':'300px'}}
        return (
            <div className="modal fade f-modal" id='f-sendDev-modal'>
                <div className="modal-dialog" >
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 错误设备</h4>
                        </div>
                        <div className="f-modal-body" >
                            <form className="form-horizontal f-form-horizontal" id="d_add" >
                                {/* <div className="form-group">
                                        <label className="col-xs-3 control-label"><span className='red'>*</span> 设备：</label>
                                        <div className="col-xs-8 authorityPost f-usePlug">
                                            <input value={clmsTask.sName} onChange={(e)=>this.searhDevList(e)} onFocus={this.choseDev.bind(this)} type="text" className="form-control f-authorityInpt" />
                                            <LisatBox isChose={ListBox.isChose} topos={[]}  confirmChk={()=>{this.confirmChk()}} />
                                        </div>
                                    </div>*/}
                                <div className="form-group">
                                    <div className="col-xs-10 f-customerBox" style={{'minHeight':'100px'}}  >
                                        <label className="control-label textLeft f-cusNum">
                                            共<i>{!clmsTask.allData?0:clmsTask.allData.length}</i>台设备：
                                        </label>

                                        <div className="clearfix f-seltCustomer d_device">
                                            {!clmsTask.allData?"":
                                                clmsTask.allData.map((item,index)=>
                                                        <div key={index} className="col-xs-6">
                                                            {item.dev_name}
                                                        </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                { /* <div className="form-group">
                                        <div className="col-xs-10 f-customerBox" style={{'minHeight':'100px'}}  >
                                            <label className="control-label textLeft f-cusNum">
                                                已选择<i>{!clmsTask.selectDatas?0:clmsTask.selectDatas.filter(function(chk){return chk.isChk==true}).length}</i>台设备：
                                            </label>

                                            <div className="clearfix f-seltCustomer d_device">
                                                {!clmsTask.selectDatas?"":
                                                    clmsTask.selectDatas.map((item,index)=>
                                                            <div key={index} className="col-xs-6">
                                                                <Checkbox onChange={(e)=>{this.changeDevChk(index,e);}} value={item._id} checked={item.isChk} index={index}>{item.name}</Checkbox>
                                                            </div>
                                                    )
                                                    }
                                            </div>
                                        </div>
                                    </div>*/}
                                        <div className="form-group text-center" style={{'marginTop':'37px'}}>
                                            <div className="error"></div>
                                            { /* <button onClick={(e)=>this.confirmSend(e)} type='submit' className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                             <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span className='fbtn-miss-svg'></span> 取消</button>

                                             */}
                                        </div>
                            </form>
                        </div>
                        <div className="f-modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function sel(state) {
    // console.log(state);
    //console.log(state.topos.topoItems);
    //return {ListBox:state.ListBox,dataList:state.ListBox.dataList,chkData:state.ListBox.chkData,clmsTask:state.clmsTask,validator:state.validator_1}
     return {"clmsTask":state.clmsTask}
}
export default connect(sel)(ClmsSendDev)