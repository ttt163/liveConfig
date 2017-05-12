import React, {
  Component,
  PropTypes
} from 'react'
export default class Btns extends Component {
  render() {
    return (
      <div>
               <button className="f-btn" type="button" id='f-add'><span className='f-addInfo'></span> 添加</button>
               <button className="f-btn changeStatus" type="button" data-status="1" data-url="/user/ifStart/" data-id="all"><span className='f-openInfo'></span> 启用
               </button>
               <button className="f-btn changeStatus" type="button" data-status="0" data-url="/user/ifStart/" data-id="all"><span className='f-stopInfo'></span> 禁用
               </button>
               <button className="f-btn changeStatus" type="button" data-status="-2" data-url="/user/destroy/" data-id="all"><span className='f-delInfo'></span> 删除
               </button>
           </div>
    )
  }
}