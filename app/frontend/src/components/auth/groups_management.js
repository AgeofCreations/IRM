import React from 'react'
import axios from 'axios'
import { Form, Icon, Input, Button, Modal, Radio, Alert, Select } from 'antd';


const GroupsUrl = `http://0.0.0.0:8000/api/admin/groups/`;

const token = localStorage.getItem('token');

if (token != null) {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: 'Token ' + token}
    }

class GroupsManagement extends React.Component {
    state ={
        groupsRadio: 'add',
        groupsSelected: [],
        groupsOptions: [],
        success: '',
        error: ''
    }

    componentDidMount() {
        axios.get(GroupsUrl)
            .then(res => {
                this.setState({
                    groupsOptions: res.data
                })
            })
    }

    updatingInfo() {
        Modal.info({
          title: 'Управление группами',
          content: (<div>
            <p>При регистрации пользователя, у него нет ни одной группы</p>
            <p>Основная функция сейчас - присвоение или лишение прав администратора другому пользователю, на случай если кто-то уйдёт. </p>
            <p>Права администратора нужны для редактирования списка категорий в базе и для активации пользователей.</p>
            <p>Управлять группами могут только члены группы admin. Например, руководители.</p>
            <p>Это, как и весь раздел "Управление" сделано для обеспечения высокой автономности сервиса без квалифицированного администратора и обеспечения безопасности данных. </p>
            <p></p>
          </div>),
          onOk() {},
        });
      }
    handleGroupsChange = groupsSelected => {
        this.setState({ groupsSelected });
    };

    groupsRadioChanger = e => {
        this.setState({
            groupsRadio: e.target.value,
        });
      };
      
    handleGroupsUpdate = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            axios.post(`${GroupsUrl}update/`, {
              updating_user: values.groupsUsername,
              action: this.state.groupsRadio,
              groups_to_update: this.state.groupsSelected
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

    const { groupsSelected } = this.state;
    const filteredOptions = this.state.groupsOptions.filter(o => !groupsSelected.includes(o));
        return(
            <div>
            {errorMessage}
            {successMessage}
                <Select
                    mode="multiple"
                    placeholder="Выберите группу для назначения пользователю"
                    value={groupsSelected}
                    onChange={this.handleGroupsChange}
                    style={{ width: '30%'}}
                >
                    {filteredOptions.map(item => (
                        <Select.Option key={item} value={item}>
                            {item}
                        </Select.Option>

                    ))}
                </Select>
                <Button icon="question-circle" style={{'position': 'absolute', 'right': '10%', 'top': '25%', marginBottom: '20px'}} onClick={this.updatingInfo}></Button>

                <Form onSubmit={this.handleGroupsUpdate} className="login-form">
                    <Form.Item style={{marginTop: '20px'}}>
                        {getFieldDecorator('groupsUsername', {
                            rules: [{ required: true, message: 'Введите имя пользователя, к которому применить изменения' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Имя пользователя"
                            />,
                        )}
                    </Form.Item>

                    <Radio.Group onChange={this.groupsRadioChanger} value={this.state.groupsRadio}>
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
  const WrappedGroupsManagement = Form.create({ name: 'normal_login' })(GroupsManagement);

  export default WrappedGroupsManagement;