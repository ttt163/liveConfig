import { List_Act,List_CHK,ALL_CHK,FILTER_DATA_NAME} from '../actions/listBoxactions.js'
import { URL } from '../config.js';
export default function ListBox(state = {}, action) {
    switch (action.type) {
        case List_Act:
            //console.log(state);
            var _data = action.data;
            //console.log(_data);
            if (_data.dataList) {
                //console.log(state);
                for (var i = 0; i < _data.dataList.length; i++) {
                    if (state.chkData && state.chkData.length) {
                        for (var j = 0; j < state.chkData.length; j++) {
                            if (_data.dataList[i]._id == state.chkData[j]._id) {
                                _data.dataList[i].isChk = state.chkData[j].isChk;
                                break;
                            }
                        }
                    }
                }
            }
            //console.log(_data.dataList);
            return {...state, ..._data}
        case List_CHK:
            //单选
            //console.log(action.data);
            var _data = action.data, list = state.dataList, thisChk = list[action.index], chksData = state.chkData;
            state.dataList=[...list.slice(0,action.index),{...thisChk,..._data},...list.slice(action.index+1)];
            if(_data.isChk){
                var isRep=false;
                for(var i=0;i<chksData.length;i++){
                    if(thisChk._id==chksData[i]._id){
                        state.chkData[i]={...thisChk,..._data};
                        isRep=true;
                        break;
                    }
                }
                if(!isRep){
                    state.chkData.push({...thisChk,..._data});
                }
                //state.chkData=[...chksData,{...thisChk,..._data}];
                /*if(!chksData.length){
                    console.log(1111);
                    console.log({...thisChk,..._data});
                    state.chkData.push({...thisChk,..._data});
                    //state.chkData=[...chksData,{...thisChk,..._data}];
                }else{
                    console.log(chksData.length);
                    for(var i=0;i<chksData.length;i++){
                        if(thisChk._id==chksData[i]._id){
                            state.chkData[i]={...thisChk,..._data};
                        }
                    }
                }*/


                //state.chkData=[...chksData,_data];
                //console.log(state.chkData);
            }else{
                for(var i=0;i<chksData.length;i++){
                    if(thisChk._id==chksData[i]._id){
                        state.chkData=[...chksData.slice(0,i),...chksData.slice(i+1)];
                        break;
                    }
                }
            }
            return {...state}
        case ALL_CHK:
            //全选
            var _data=action.data,list = state.dataList,chksData = state.chkData;
            if(_data.chkAll==true){
                for(var i=0;i<list.length;i++){
                    state.dataList[i].isChk=true;
                }
                state.chkData=state.dataList;
            }else if(_data.chkAll=="clear"){
                state.chkData=[];
                for(var i=0;i<list.length;i++){
                    state.dataList[i].isChk=false;
                }
            }else{
                //反选
                state.chkData=[];
                for(var i=0;i<list.length;i++){
                    if(list[i].isChk){
                        state.dataList[i].isChk=false;
                    }else{
                        state.dataList[i].isChk=true;
                        state.chkData=[...state.chkData,state.dataList[i]];
                    }

                }

            }
            return {...state, ..._data};
        //过滤数据
            case FILTER_DATA_NAME:
                var data=action.data,dataList=action.data.allData,sData=[];
               // console.log(data.sName);
                if(!data.sName){
                    sData=dataList;
                }else{
                    sData=[];
                    for(var i=0;i<dataList.length;i++){
                        if(dataList[i].name.indexOf(data.sName)!=-1){
                            sData.push(dataList[i]);
                        }
                    }
                }

                return {...state,"dataList":sData};
        default:
            return state
    }
}