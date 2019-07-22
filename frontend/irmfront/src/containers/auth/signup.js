import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/auth';

import { Form, Input, Icon, Button, Alert } from 'antd';
import { NavLink } from 'react-router-dom'
    
  
  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            this.props.onAuth(
                values.username,
                values.email,
                values.password,
                values.confirm
            );
        }
        this.signupSucessRedirect()
      });
    };
  
    handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Пароли не совпадают!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      let errorMessage = null;
      if (this.props.error) {
        if (this.props.error.username) {
        errorMessage =(
            <Alert style={{marginBottom: '25px'}} message={this.props.error.username} type="error" />
        );
      } else if (this.props.error.email) {
        errorMessage =(
          <Alert style={{marginBottom: '25px'}} message={this.props.error.email} type="error" />
        );
      } else if (this.props.error.password) {
        errorMessage =(
          <Alert style={{marginBottom: '25px'}} message={this.props.error.password} type="error" />
        );
      }
    }
  
      return (
        <div>
          {errorMessage}
          {
            this.props.success === true ?
            this.props.history.push('/signup/verification_sent/')
            :
          
          
        <Form onSubmit={this.handleSubmit}>
          
            <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Введите имя пользователя!' }],
            })(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Имя пользователя"
                />,
            )}
        </Form.Item>

          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Введённый адрес не существует',
                },
                {
                  required: true,
                  message: 'Введите адрес электронной почты!',
                },
              ],
            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"/>)}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Введите пароль!',
                }, 
                { min: 8, message: 'Пароль должен содержать минимум 8 символов!'},
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Пароль" />)}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Подтвердите пароль!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Пароль" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Зарегистрироваться</Button>
              или
              <NavLink style={{marginRight: '10px'}} to='/login/'>  войдите под существующим аккаунтом!</NavLink>

          </Form.Item>

        </Form>
          }
        </div>
      );
    }
  }
  


const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);


const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        success: state.authReducer.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);