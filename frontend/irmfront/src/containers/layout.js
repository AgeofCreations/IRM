import React, { Component } from 'react';
import * as actions from '../store/actions/auth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;



class CustomLayout extends Component {
    state = {
      collapsed: false,
    };
  
    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };
  
    render() {

      return (
        <Layout id="unselectable" style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['5']} defaultOpenKeys ={['sub1']}mode="inline">

              <Menu.Item key="1">
                <Icon type="desktop" />
                <span><Link to="/" style={{color: 'white'}}>Главная             </Link></span>
              </Menu.Item>
              <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Пользователь</span>
                </span>
              }
            >
              <Menu.Item key="3">Профиль</Menu.Item>
              <Menu.Item key="4">Команда</Menu.Item>
              {
                this.props.isAuthenticated ?
                <Menu.Item key="5" onClick={this.props.logout}>
                  Выход
                </Menu.Item>

                :

                <Menu.Item key="5">
                <Link to="/login">Вход</Link>
                </Menu.Item>

            }

            </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="appstore" />
                    <span>Приложения</span>
                  </span>
                }
              >
                <Menu.Item key="6">Пересекатор</Menu.Item>
                <Menu.Item key="8">Краулер</Menu.Item>
                <Menu.Item key="9">Метрика</Menu.Item>
                <Menu.Item key="10">E-mail шаблонизатор</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>Заглушка</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
          <Header className="header" style={{height: '46px'}}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '46px' }}
            >
              <Menu.Item key="1"><Link to="/combinator">Приложение</Link></Menu.Item>
              <Menu.Item key="2">Заглушка</Menu.Item>
              <Menu.Item key="3">Заглушка</Menu.Item>
            </Menu>
          </Header>
            <Content id="selectable" style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>CRM</Breadcrumb.Item>
                <Breadcrumb.Item>Приложение</Breadcrumb.Item>
              </Breadcrumb>
              <div>{this.props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>I am footer. You are not so ©</Footer>
          </Layout>
        </Layout>
      );
    }
  }


const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.authLogout()) 
  }
}

export default connect(null, mapDispatchToProps)(CustomLayout);