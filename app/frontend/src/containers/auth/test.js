import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import axios from 'axios';

const backendUrl = 'http://0.0.0.0:8000/api/admin/verificate_user/'
const token = localStorage.getItem('token');
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: 'Token ' + token}
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(backendUrl, {
          verificating_user: values.username
        })
        
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Введите имя пользователя, которого хотите активировать' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Имя пользователя"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;