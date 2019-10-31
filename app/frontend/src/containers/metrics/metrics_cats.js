import React from 'react';
import { Form, Icon, Input, Button, Modal, Radio, Alert, Select, Breadcrumb } from 'antd';
import axios from 'axios';
import backendURL from '../../consts';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
const { Option } = Select;

if (token != null) {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: 'Token ' + token}
    }

class MetricsThirdLeveCategories extends React.Component {
    constructor(props){
        super(props);
        this.handleCategoriesUpdate = this.handleCategoriesUpdate.bind(this);
     }

    state = {
        categoriesRadio: 'add',
        success: '',
        error: '',
        head_category: '',
        head_category_list: [],
    }
    componentDidMount() {
        axios.get(`${backendURL}/metrics/categories/list/`)
            .then(res => {
                this.setState({
                    head_category_list: res.data
                })
            })
    }

    handleCategoriesUpdate = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            axios
                .post(`${backendURL}/metrics/categories/third_level/update/`, {
                    category: values.username,
                    action: this.state.categoriesRadio,
                    head_category: this.state.head_category,
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

      handleHeadCategoryChange = item => {
        this.setState({head_category: item});
    };
      handeRadioChanger = e => {
        this.setState({
            categoriesRadio: e.target.value,
        });
      };
    
      verificationInfo() {
        Modal.info({
          title: 'Управление категориями',
          content: (<div>
            <p>Панель отвечает за управление списком вложенных категорий для метрики, по которым будет сниматься статистика.</p>
            <p>Для добавления или удаления категории, выберите родительскую категорию из выпадающего списка, затем введите её относительный URL(без крайнего левого и крайнего правого слешей) в поле, выберите действие и нажмите "Подтвердить"</p>
            <p>Например: "kanctovary/shkolnye-tovary" или "kanctovary/shkolnye-tovary/globusy" (без кавычек)</p>
            <p>Изменять список категорий могут только пользователи, состоящие в группе admin.</p>
            <p>Новые категории появятся в отчёте в следующем месяце. Если вам они нужны прямо сейчас - нажмите кнопку "Принудительно обновить список категорий..."</p>
            <p>Если вам нужна статистика на текущий час, нажмите кнопку: "Принудительно снять статистику по категорям".</p>
          </div>),
          onOk() {},
        });
      }

    forcedates = () => {
        axios.post(`${backendURL}/metrics/run-tasks/create-dates/`, {
            force: 'True',
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

    forcedata = () => {
        axios.post(`${backendURL}/metrics/run-tasks/collect-data/`)
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
    

    render() {
        let errorMessage = null
        let successMessage = null

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
    const { head_category_list } = this.state;
        return(
            <div>
            {errorMessage}
            {successMessage}
                        {
            token ?
            <div>
            <Breadcrumb style={{marginBottom: '10px'}}>
            <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
            <Breadcrumb.Item>
            <Link to='/metrics/'>Метрика</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
            {this.state.head_category}
            </Breadcrumb.Item>
        </Breadcrumb>
            <h1>Управление вложенными категориями для метрики</h1>
                <Select
                    placeholder="Выберите родительскую категорию"
                    onChange={this.handleHeadCategoryChange}
                    style={{ width: '30%'}}
                >
                    {head_category_list.map(head_category => (
                        <Option key={head_category}>
                            {head_category}
                        </Option>

                    ))}
                </Select>
                <Button icon="question-circle" style={{'position': 'absolute', 'right': '10%', 'top': '10%', marginBottom: '20px'}} onClick={this.verificationInfo}></Button>

                <Form onSubmit={this.handleCategoriesUpdate} className="login-form">
                    <Form.Item style={{marginTop: '20px'}}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Введите относительную ссылку на категорию, к которой хотите применить действие' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Относительная ссылка на категорию(включая родительскую)"
                        />,
                    )}
                    </Form.Item>

                <Radio.Group onChange={this.handeRadioChanger} value={this.state.categoriesRadio}>
                    <Radio value={'add'}>Добавить</Radio>
                    <Radio value={'remove'}>Удалить</Radio>
                </Radio.Group>

                <Form.Item>
                    <Button style={{marginTop: '20px'}}type="primary" htmlType="submit" className="login-form-button">
                        Подтвердить
                    </Button>
                </Form.Item>
        </Form>
        <Button style={{marginTop: '50px'}}type="primary" className="login-form-button" onClick={this.forcedates}>Принудительно обновить список категорий в отчёте и снять по ним статистику</Button>
        <Button style={{marginTop: '10px', marginLeft: '30px'}} type="primary"  className="login-form-button" onClick={this.forcedata}>Принудительно снять статистику по категорям, которые сейчас в списке</Button>
        </div>
                :
                <div>Только для авторизованных пользователей</div>
                }
                </div>
        )
    }
}
const MetricsThirdLeveCategoriesForm = Form.create({ name: 'normal_login' })(MetricsThirdLeveCategories);

export default MetricsThirdLeveCategoriesForm