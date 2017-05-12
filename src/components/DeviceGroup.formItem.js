//import '../public/plugs/bootstrap/css/bootstrap.css';
//import "../public/css/f.css"
//import  '../css/main.css';
//
import React,{PropTypes,Component} from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { loginIn,initUser} from '../actions/devGoupActions.js'
//import {selectie,validateChosen,formCheck,ShowDiag,alertMsg} from  "../public/js/f.js"
//import UserInfo from '../components/User.Info.js'
//import EditPersonInfo from '../components/User.person.edit.js'
class AddFormItem extends Component {
//let Test = React.createClass({
    constructor(state) {
        super(state);
    }


    componentDidMount(){}
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

AddFormItem = Form.create({})(AddFormItem);
/*function sel(state) {
    console.log(state);
    return {user:state.isLogin}
}
export default connect(sel)(AddFormItem)*/
export default AddFormItem
//export default Test = Form.create()(Test);


