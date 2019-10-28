/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux'
import { Divider, Col, Row, Form, Input } from 'antd';
import axios from 'axios'
import backendURL from '../../consts'

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);



class UserProfile extends React.Component {
    state = {
       visible: false,
       token: null
      };

    componentDidMount() {
      this.getMetricsToken()
    }

    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };

    getMetricsToken = () => {
      axios.get(`${backendURL}/metrics/token/`)
           .then(res => {
             this.setState({
               token: res.data
             })
           })
    }
    handleNewToken = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          axios.post(`${backendURL}/metrics/token/`, {
            token: values.token
          })  
          this.getMetricsToken()
        }
      });
    };

    render() {
    const { getFieldDecorator } = this.props.form;

        return(
            <div>
                {
                this.props.token ?
                <div>
                                 <p style={{ ...pStyle, marginBottom: 24 }}>Профиль пользователя</p>
                  <p style={pStyle}>Личные данные</p>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Имя" content={this.props.user_name} />{' '}
                    </Col>
           
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem
                        title="Статус"
                        content="Активен"
                      />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Токен метрики"
                        content={this.state.token}
                      />
                      {
                        this.state.token == null? 
                        <Form onSubmit={this.handleNewToken} className="token-form">
                          <Form.Item style={{marginTop: '20px'}}>
                            {getFieldDecorator('token', {
                                rules: [{ required: true, message: 'Введите новый токен.' }],
                            })(
                                <Input
                                placeholder="Новый токен"
                                />,
                            )}
                          </Form.Item>
                        </Form>
                      :
                      <div></div>
                      }
                    </Col>
                  </Row>
                  <Divider />
                  <p style={pStyle}>В компании</p>
                  <Row>

                    <Col span={12}>
                      <DescriptionItem title="Группа прав в сервисе" content={this.props.user_groups} />
                    </Col>
                  </Row>
                  <Divider />
                  <p style={pStyle}>Контакты</p>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Email" content={this.props.user_email} />
                    </Col>
                  </Row>
              </div>

                :

                <div>Для просмотра этой страницы требуется вход.</div>
                }
            </div>
        )
    }
}

const WrappedUserProfile = Form.create({ name: 'normal_profile' })(UserProfile);



const mapStateToProps = (state) => {
    return {
        user_error: state.authReducer.user_error,
        user_groups: state.authReducer.user_groups,
        token: state.authReducer.token,
        user_loading: state.authReducer.user_loading,
        user_name: state.authReducer.user_name,
        user_email: state.authReducer.user_email
    }
}
export default connect(mapStateToProps)(WrappedUserProfile);
