import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Icon, Input, Button, Spin, Alert } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.username, values.password)
      }
    });
    
  }

  render() {

    let errorMessage = null;
    if (this.props.error) {
        errorMessage =(
            <Alert style={{marginBottom: '25px'}} message={this.props.error.non_field_errors} type="error" />
        );
    }
    const { getFieldDecorator } = this.props.form;
    return (
        <div>
            {errorMessage}
            { 

                this.props.loading ?

                <Spin indicator={antIcon} />

                : this.props.token !== null ?    
                this.props.history.push('/')
                :                          


                <Form onSubmit={this.handleSubmit} className="login-form">
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
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Введите пароль!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Пароль"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Войти</Button>
                        или
                        <NavLink style={{marginRight: '10px'}} to='/signup/'>  Загеристрироваться</NavLink>

                    </Form.Item>

                </Form>

                
            }
            </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        token: state.token,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);