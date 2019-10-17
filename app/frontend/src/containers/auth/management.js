import { Form, Icon, Input, Button, Tabs, Modal, Radio, Alert } from 'antd';
import React from 'react';
import axios from 'axios';

const backendUrl = 'http://0.0.0.0:8000/api/admin/verificate_user/'
const token = localStorage.getItem('token');
const { TabPane } = Tabs;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: 'Token ' + token}



class Management extends React.Component {
    state = {
        verificationRadio: 'verificate',
        success: '',
        error: ''
    }
  handleVerification = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(backendUrl, {
          verificating_user: values.username,
          action: this.state.verificationRadio
        })
            .then(res => {
            this.setState({
                success: res.data
            })
        
            .catch(error => {
            this.setState({
                error: error.data
            })
        })
        })
        
      }
    });
  };

  verificationRadioChanger = e => {
    console.log('radio checked', e.target.value);
    this.setState({
        verificationRadio: e.target.value,
    });
  };

  managementInfo() {
    Modal.info({
      title: 'Панель управления пользователями и данными.',
      content: (<div>
        <p>Панель позволяет (де)активировать пользователей, добавить их в группы, создать группы, добавить/удалить категории для отслеживания и пр.</p>
        <p>Для получения доступа требуется быть членом группы admin</p>
      </div>),
      onOk() {},
    });
  }
  verificationInfo() {
    Modal.info({
      title: 'Активация пользователя',
      content: (<div>
        <p>При регистрации пользователя он должен быть активирован администратором. Только после активации он может авторизовываться и пользоваться сервисом.</p>
        <p>Для (де)активации пользователя введите его username в поле "Имя пользователя", выберите действие и нажмите кнопку "Подтвердить"</p>
        <p>Деактивация нужна для того, чтобы пользователь, утративший доверие (например, его данные были скомпрометированы) не получил доступа к данным.</p>
        <p>Активировать пользователя могут только члены группы admin. Например, руководители.</p>
      </div>),
      onOk() {},
    });
  }

  render() {
    let errorMessage = null;
    let successMessage = null;

    if (this.state.error) {
        errorMessage =(
            <Alert style={{marginBottom: '25px'}} message={this.state.error} type="error" />
        );
    }
    if (this.state.success) {
        successMessage =(
            <Alert style={{marginBottom: '25px'}} message={this.state.success} type="success" />
        );
    }
    const { getFieldDecorator } = this.props.form;
    return (
        <div>
        <h1>Панель управления пользователями и данными</h1>
        <Button icon="question-circle" style={{'position': 'absolute', 'right': '10.2%', 'top': '7%', marginBottom: '20px'}} onClick={this.managementInfo}></Button>
        <div>
        {errorMessage}
        {successMessage}
        <Tabs defaultActiveKey="1" >
        <TabPane tab="Активация пользователя" key="1">
        <h1>Активация пользователя</h1>
        <Button icon="question-circle" style={{'position': 'absolute', 'right': '10%', 'top': '25%', marginBottom: '20px'}} onClick={this.verificationInfo}></Button>

        <Form onSubmit={this.handleVerification} className="login-form">
        <Form.Item style={{marginTop: '20px'}}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Введите имя пользователя, которого хотите активировать' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Имя пользователя"
            />,
          )}
        </Form.Item>

        <Radio.Group onChange={this.verificationRadioChanger} value={this.state.verificationRadio}>
            <Radio value={'verificate'}>Активировать</Radio>
            <Radio value={'deactivate'}>Деактивировать</Radio>
        </Radio.Group>

        <Form.Item>
          <Button style={{marginTop: '20px'}}type="primary" htmlType="submit" className="login-form-button">
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
        </TabPane>
        <TabPane tab="Назначение групп пользователям" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Управление списком категорий" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      </div>
      <div>
      </div>
      </div>
    );
  }
}

const WrappedNormalManagement = Form.create({ name: 'normal_login' })(Management);

export default WrappedNormalManagement;