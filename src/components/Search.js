import React, {Component,PropTypes} from 'react'
export default class Search extends Component {
    render() {
        return (
            <div>
                <input type="text" className="form-control" id="user_search_text" placeholder="请输入账户名" name="name" />
                    <button id="SearchBtn" type="button">
                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
            </div>
        )
    }
}