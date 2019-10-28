import { Form, Icon, Input, Button, Modal, Radio, Alert } from 'antd';
import React from 'react';
import axios from 'axios';
import backendURL from '../../consts'


const token = localStorage.getItem('token');


if (token != null) {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: 'Token ' + token}
    }

class MetricsCategoriesUpdate extends React.Component {
    constructor(props){
        super(props);
        this.handleVerification = this.handleVerification.bind(this);
     }

    state = {
        categoriesRadio: 'add',
        success: '',
        error: ''
    }

    handleVerification = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            axios
                .post(`${backendURL}/metrics/categories/list/update/`, {
                    category: values.username,
                    action: this.state.categoriesRadio
                    })
                .then(res => {
                    this.setState({
                        success: res.data,
                        error: '',
                    })
                })
            
                .catch(error => {
                    this.setState({
                        error: error.response.data,
                        success: '',
                    })
                
            })
            
          }
        });
      };
    
      verificationRadioChanger = e => {
        this.setState({
            categoriesRadio: e.target.value,
        });
      };
    
      verificationInfo() {
        Modal.info({
          title: 'Управление категориями',
          content: (<div>
            <p>Панель отвечает за управление списком категорий для метрики, по которым будет сниматься статистика.</p>
            <p>Для добавления или удаления категории, введите её относительный URL(без крайнего левого и крайнего правого слешей) в поле, выберите действие и нажмите "Подтвердить"</p>
            <p>Например: "kanctovary" или "kanctovary/shkolnye-tovary" или "kanctovary/shkolnye-tovary/globusy" (без кавычек)</p>
            <p>Изменять список категорий могут только пользователи, состоящие в группе admin.</p>
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
        return(
            <div>
                {errorMessage}
                {successMessage}
            <h1>Управление категориями для метрики</h1>
                <Button icon="question-circle" style={{'position': 'absolute', 'right': '10%', 'top': '25%', marginBottom: '20px'}} onClick={this.verificationInfo}></Button>

                <Form onSubmit={this.handleVerification} className="login-form">
                    <Form.Item style={{marginTop: '20px'}}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Введите относительную ссылку на категорию, к которой хотите применить действие' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Относительная ссылка на категорию"
                        />,
                    )}
                    </Form.Item>

                <Radio.Group onChange={this.verificationRadioChanger} value={this.state.categoriesRadio}>
                    <Radio value={'add'}>Добавить</Radio>
                    <Radio value={'remove'}>Удалить</Radio>
                </Radio.Group>

                <Form.Item>
                    <Button style={{marginTop: '20px'}}type="primary" htmlType="submit" className="login-form-button">
                        Подтвердить
                    </Button>
                </Form.Item>
        </Form>
      </div>
        )
    }
}
const MetricsCategoriesUpdateForm = Form.create({ name: 'normal_login' })(MetricsCategoriesUpdate);

export default MetricsCategoriesUpdateForm