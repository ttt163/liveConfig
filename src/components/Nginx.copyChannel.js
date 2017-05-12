import React, {Component,PropTypes} from 'react'
//import { Link,IndexLink,browserHistory } from 'react-router';
export default class NginxCopy extends Component {
    render() {
        return (
            <div className="modal fade f-modal resChosen" id='f-copyChannel-modal' data-id="0">
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-lock'></span> 编辑拷贝</h4>
                        </div>
                        <div className="f-modal-body">
                            <form className="form-horizontal f-form-horizontal" id="Channel_copy">
                                <table className="table f-table stepTable pf">
                                    <thead>
                                    <tr>
                                        <th>频道</th>
                                        <th>客户名称</th>   
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <input className="form-control" name="channel"/>
                                        </td>
                                        <td>
                                            <input className="form-control" name="customer" />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="form-group text-center">
                                    <div className="error"></div>
                                    <input type="hidden" id="copy_id"/>
                                    <button type="submit" className="f-btn fbtn-ok"><span className='fbtn-ok-svg'></span> 确认</button>
                                    <button type='button' className="f-btn fbtn-miss ml15" data-dismiss="modal"><span className='fbtn-miss-svg'></span> 取消</button>
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