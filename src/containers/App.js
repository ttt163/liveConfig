import React, {
    Component,
    PropTypes
    } from 'react'
import '../../node_modules/antd/dist/antd.css';
import '../public/plugs/bootstrap/css/bootstrap.css';
import '../public/plugs/chosen/chosen.css'
import '../public/plugs/iCheck/skins/square/blue.css'
import '../public/plugs/chosen/chosen.css'
import '../public/plugs/selectize/css/selectize.css'
import '../public/plugs/bootstrap3-datetimepicker/datetimepicker/css/bootstrap-datetimepicker.min.css'
import "../public/css/f.css"
import Footer from '../components/Footer'
import Header from '../components/Header'
import Left from '../components/Left'
import DelModal from '../components/DelModal.js'
import $ from 'jquery';
import '../public/plugs/jquery/jquery.cookie';
import '../public/plugs/bootstrap/js/bootstrap';
import '../public/plugs/bootstrap3-datetimepicker/datetimepicker/js/bootstrap-datetimepicker.js'
import '../public/plugs/bootstrap3-datetimepicker/datetimepicker/js/bootstrap-datetimepicker.zh-CN.js'
import '../public/plugs/JqueryValidate/jquery.validate.js'
import '../public/plugs/iCheck/icheck.js'
import '../public/plugs/chosen/chosen.jquery.js'
import '../public/plugs/jqueryMd5/jQuery.md5.js'
import "../public/js/f.js"
import {selectie} from  "../public/js/f.js"

//import "../public/js/f.js"
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        if(localStorage.loginInfo==undefined){
            localStorage.loginInfo=JSON.stringify({'loginStatus':false});
            var data= JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }else{
            var data=JSON.parse(localStorage.loginInfo);
            if(!data.loginStatus){
                window.location.href='#/login'
            }
        }
    }
    componentDidMount(){
        var data=JSON.parse(localStorage.loginInfo);
            if(data.role=="设备运维"){
                $($($('.f-sub')[2]).find('li')[0]).remove();
                $($('.f-sub')[0]).remove();
            }else if(data.role=="业务运维"){
                $($($('.f-sub')[2]).find('li')[0]).remove();
                $($('.f-sub')[1]).remove();
                $($('.f-sub')[3]).remove();
            }else if(data.role=="管理员"){

            }else{
                delete localStorage.loginInfo;
                window.location.href='#/login';
            }
    }
    componentDidUpdate(){
        // 多选框
        $('#inputAll').on('ifChecked', function(e) {
            $(this).closest('table').find('.chk').iCheck('check')
        });
        $('#inputAll').on('ifUnchecked', function(e) {
            $(this).closest('table').find('.chk').iCheck('uncheck');
        });
        if ($('.chk,#inputAll').length > 0) {
            $('.chk,#inputAll').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%'
            });
        }
    }
    render() {
        return (
            <div>
                <Header />
                <Left />
                <div className='f-page'>
                    {this.props.children}
                </div>
                <DelModal />
                <Footer />
            </div>
        )
    }
}