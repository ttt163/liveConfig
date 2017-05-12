import React, {Component,PropTypes} from 'react'
import UserEditForm from './User.editForm.js'
export default class EditPersonInfo extends Component {
    render() {
        return (
            <div className="modal fade f-modal" id='f-editInfo-modal'>
                <div className="modal-dialog" style={{minWidth:'800px'}}>
                    <div className="modal-content">
                        <div className="f-modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title"><span className='glyphicon glyphicon-edit'></span> 账户资料</h4>
                        </div>
                        <div className="f-modal-body" id="editPerson">
                            <form className="form-horizontal f-form-horizontal" id="personEdit">
                                <input type="hidden" name="_token" value="" />
                                <input type="hidden" name="id" value="" />
                                <UserEditForm />
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