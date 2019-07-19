/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux'

import { Divider, Col, Row } from 'antd';

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
    state = { visible: false };

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
    render() {
        return(
            <div>
                {
                this.props.isAuthenticated ?
                <div>
                                 <p style={{ ...pStyle, marginBottom: 24 }}>Профиль пользователя</p>
                  <p style={pStyle}>Личные данные</p>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Имя" content={this.props.user_name} />{' '}
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Account" content="AntDesign@example.com" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Город" content="Заглушка для города" />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Страна" content="Заглушка для страны" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Дата рождения" content="Заглушка для ДР" />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Веб-сайт" content="-" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DescriptionItem
                        title="Статус"
                        content="Заглушка для статуса"
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <p style={pStyle}>В компании</p>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Должность" content="Заглушка для должности" />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Зона ответственности" content="Заглушка для зоны ответственности" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Департамент/Отдел" content="Заглушка" />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Руководитель" content={'ФИО руководителя'} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem
                        title="Внутренний номер"
                        content="0000"
                      />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Группа прав в сервисе" content={this.props.user_groups} />
                    </Col>
                  </Row>
                  <Divider />
                  <p style={pStyle}>Контакты</p>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Email" content="Будем парсить мыло пользователя" />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Номер телефона" content="+7 999 666 5555" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DescriptionItem
                        title="Гитхаб"
                        content={
                          <a href="http://127.0.0.1:3000/profile">
                            Линк на гитхаб
                          </a>
                        }
                      />
                    </Col>
                  </Row>
              </div>

                :

                <div>U MAST AUTHISTICATE FORST MURDERFURKER!!11!!</div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user_error: state.authReducer.user_error,
        user_groups: state.authReducer.user_groups,
        isAuthenticated: state.authReducer.token !== null,
        user_loading: state.authReducer.user_loading,
        user_name: state.authReducer.user_name
    }
}
export default connect(mapStateToProps)(UserProfile);
