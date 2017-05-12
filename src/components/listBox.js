import React, {
  Component,
  PropTypes
} from 'react'
import { connect } from 'react-redux'
import { Checkbox } from 'antd';
import { listAction,changeChk,changeAllChk} from '../actions/listBoxactions'
import {getDevData} from '../containers/Device.js'
import { URL } from '../config.js';
import {isTopoIp} from "./DeviceGroup.edit.js"
import {ShowDiag} from  "../public/js/f.js"
class LisatBox extends Component {
    choseItem(index,e) {
        //console.log(this.props);
        const {dispatch,ListBox,devicesList,devGroup,topos}=this.props;
        if(topos&&topos.length){
            if(!e.target.checked){
                var data={"devs_group_id":devGroup._id,"dev_id":e.target.value};
                var topoArr=isTopoIp(data),sName="";
               // console.log(this.props);
                if(!topoArr){
                    return;
                }
                if(topoArr.length){
                    for(var i=0;i<topoArr.length;i++){
                        sName+=topoArr[i].name+"，";
                    }
                    sName=sName.substring(0,sName.lastIndexOf("，"));
                    new ShowDiag({
                        msg: '请先删除拓扑'+sName+'中该台设备的IP！',
                        closetime: 2
                    });
                    return;
                }
            }
        }

        this.props.dispatch(changeChk({"isChk":e.target.checked},index));
        //改变 isChk
    }
   /* closeBox(){
        this.props.dispatch(listAction({"isChose":false}));
    }*/
    //清空选中设备
   clearDevs(){
        const { devGroup,dispatch,topos} = this.props;
        var falg=false;
        //console.log(devGroup.devDatas);
       if(topos&&topos.length){
           if(!devGroup.devDatas){
               return;
           }
           for(var i=0;i<devGroup.devDatas.length;i++){
               var data={"devs_group_id":devGroup._id,"dev_id":devGroup.devDatas[i]._id};
               var topoArr=isTopoIp(data);
               if(!topoArr){
                   falg=true;
                   break;
               }
               if(topoArr.length){
                   new ShowDiag({
                       msg: '请先删除所有拓扑中该台设备的IP！',
                       closetime: 2
                   });
                   falg=true;
                   break;
               }
           }
       }

        if(falg){
            return;
        }
        //console.log(111);
       dispatch(changeAllChk({"chkAll":"clear"}));
       //return falg;
    }
    //反选
    cancleDevs(){
        const { devGroup,dispatch,topos} = this.props;
        var falg=false;
        //console.log(devGroup.devDatas);
        if(topos&&topos.length){
            if(!devGroup.devDatas){
                return;
            }
            for(var i=0;i<devGroup.devDatas.length;i++){
                var data={"devs_group_id":devGroup._id,"dev_id":devGroup.devDatas[i]._id};
                var topoArr=isTopoIp(data);
                if(!topoArr){
                    falg=true;
                    break;
                }
                if(topoArr.length){
                    new ShowDiag({
                        msg: '请先删除所有拓扑中该台设备的IP！',
                        closetime: 2
                    });
                    falg=true;
                    break;
                }
            }
        }

        if(falg){
            return;
        }
        //console.log(111);
        dispatch(changeAllChk({"chkAll":false}));
        //return falg;
    }
  render() {
     // console.log(this.props);
      const {dispatch,ListBox,devicesList}=this.props;
     // console.log(devicesList);

    return (
        <div className="f-authority" style={{display:ListBox.isChose?"block":"none"}}>
            <div className="f-authority-head">
                <button onClick={()=>dispatch(changeAllChk({"chkAll":true}))} type='button' className='f-btn f-checkAll'>{ListBox.selectAll}</button>
                <button onClick={()=>this.cancleDevs()} type='button' className='f-btn ml15 f-checkRev'>{ListBox.cancelAll}</button>
                {ListBox.clear?<button onClick={()=>{this.clearDevs()}}  type='button' className='f-btn ml15 f-checkClear'>{ListBox.clear}</button>:""}
                <button type="button" className="close" onClick={()=>{dispatch(listAction({"isChose":false}))}}><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="f-authority-body d_device">
                {/*<div className='col-xs-12'><div className='chkbox'><label style={{textAlign:'left'}}><input type='checkbox' className='f-chk' value='' name='device_ids' />设备111</label></div></div>
                 checked={this.ListBox.chkAll} onChan   ge={this.choseItem.bind(index,this)}
                */}
                {
                    ListBox.dataList&&ListBox.dataList.length?ListBox.dataList.map((item,index)=>
                        <div key={index} className='col-xs-12'><div className='chkbox'>
                            <Checkbox  value={item._id}  checked={item.isChk}    onChange={(e)=>this.choseItem(index,e)}>{item.name}</Checkbox>
                        </div></div>):"暂无设备！"
                   /* devicesList?devicesList.map((item,index)=>
                        <div key={index} className='col-xs-12'><div className='chkbox'>
                            <Checkbox  value={item._id}  checked={item.isChk}    onChange={(e)=>this.choseItem(index,e)}>{item.name}</Checkbox>
                        </div></div>):"暂无设备！"*/
                }

            </div>
            <div className="f-authority-footer">
                <button type='button' onClick={this.props.confirmChk} className="f-btn fbtn-ok authoritySure"><span
                    className='fbtn-ok-svg'></span> {ListBox.confirm}
                </button>
                {ListBox.cancel?<button onClick={()=>dispatch(listAction({"isChose":false}))} type='button' className="f-btn fbtn-miss ml15 authorityClose"><span
                    className='fbtn-miss-svg'></span> {ListBox.cancel}
                </button>:""}

            </div>
        </div>
    )
  }
}
function sel(state) {
     //console.log(state);
    return {ListBox:state.ListBox,devicesList:state.devicesList.list,devGroup:state.devicesGroup}

}
export default connect(sel)(LisatBox)