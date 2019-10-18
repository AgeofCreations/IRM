import { Form, Icon, Button, Tabs, Modal, Spin } from 'antd';
import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import WrappedGroupsManagement from '../../components/auth/groups_management'
import WrappedUserVerification from '../../components/auth/user_verification'
import CategoriesUpdateForm from '../../components/auth/categoies_list'


const { TabPane } = Tabs;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



class Management extends React.Component {


    managementInfo() {
        Modal.info({
          title: 'Панель управления пользователями и данными.',
          content: (<div>
            <p>Панель позволяет (де)активировать пользователей, добавить их в группы, добавить/удалить категории для отслеживания и пр.</p>
            <p>Для получения доступа требуется быть членом группы admin</p>
          </div>),
          onOk() {},
        });
      }

  render() {
    return (  
        <div>
        {
            this.props.user_loading ?
            <Spin indicator={antIcon} /> :
            this.props.token && (this.props.user_groups[0] === '2' || this.props.user_groups[1] === 2 || this.props.user_groups[3] === 2 || this.props.user_groups[4] === 2) ?
        <div>
        <h1>Панель управления пользователями и данными</h1>
        <Button icon="question-circle" style={{'position': 'absolute', 'right': '10.2%', 'top': '7%', marginBottom: '20px'}} onClick={this.managementInfo}></Button>
        <div>

        <Tabs defaultActiveKey="1" >
        <TabPane tab="Активация пользователя" key="1">
        <WrappedUserVerification />

        </TabPane>
        <TabPane tab="Назначение групп пользователям" key="2">
            <WrappedGroupsManagement />

        </TabPane>
        <TabPane tab="Управление списком категорий" key="3">
          <CategoriesUpdateForm />
        </TabPane>
      </Tabs>
      </div>
      </div> 
      :
                <div>Только для авторизованных пользователей</div>}
      </div>
      
    );
  }
}

const WrappedNormalManagement = Form.create({ name: 'normal_login' })(Management);

const mapStateToProps = (state) => {
    return {
        user_error: state.authReducer.user_error,
        user_groups: state.authReducer.user_groups,
        token : state.authReducer.token,
        user_loading: state.authReducer.user_loading,
    }
}


export default connect(mapStateToProps, null)(WrappedNormalManagement);