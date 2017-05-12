//import '../public/plugs/bootstrap/css/bootstrap.css';
//import "../public/css/f.css"
//import  '../css/main.css';
//
import React,{PropTypes,Component} from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { loginIn,initUser} from '../actions/actions'
//import {selectie,validateChosen,formCheck,ShowDiag,alertMsg} from  "../public/js/f.js"
//import UserInfo from '../components/User.Info.js'
//import EditPersonInfo from '../components/User.person.edit.js'
class Test extends Component {
//let Test = React.createClass({
    constructor(state) {
        super(state);
        //console.log(state);
        //log(this.props.form.getFieldsValue());
        //console.log(this.props.form.getFieldsValue());
        //this.state = { showText: true };
    }


    componentDidMount(){
          //var user={"user":this.props.form.getFieldsValue()};
      // this.setState({"user": this.props.form.getFieldsValue()})
        //this.state = {"user": this.props.form.getFieldsValue()};
       // this.state.isLogin.push({"user": this.props.form.getFieldsValue()})
        var data=this.props.form.getFieldsValue();
        this.props.dispatch(initUser(data))

    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            console.log(values);
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
        console.log(this.props);
        console.log('收到表单值：', this.props.form.getFieldsValue());
    }

    render() {
        //const { getFieldProps } = this.props.form;
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('username', {
            rules: [
                {required: true, min: 5, message: '用户名至少为 5 个字符'}
            ],
        });
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 12},
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                    help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(', ')}
                    >
                    <Input {...nameProps} placeholder="实时校验，输入 JasonWood 看看"/>
                </FormItem>
                <FormItem
                    label="密码"

                    >
                    <Input type="password" placeholder="请输入密码"
                        {...getFieldProps('password')}
                        />
                </FormItem>
                <FormItem>
                    <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
            </Form>
        );
    }
//});
}
/*onFieldsChange(props, fields){

}*/
Test = Form.create({
    onFieldsChange(props, field) {

        //console.log(props);
       //console.log(field[Object.keys(field).toString()].value);

        if(!field.lenth){console.log(1)
            return;
        }
        console.log(field);
        var _k=Object.keys(field).toString(),v=field[_k].value;

        var item={[_k]:v};
        console.log(item);
        props.dispatch(loginIn(item));
    },
    mapPropsToFields(props) {
        console.log(props);
        return [{"username":"admin","pwd":"123456"}];
    }
})(Test);
function sel(state) {
    console.log(state);
    return {user:state.isLogin}
}
export default connect(sel)(Test)
//export default Test
//export default Test = Form.create()(Test);


