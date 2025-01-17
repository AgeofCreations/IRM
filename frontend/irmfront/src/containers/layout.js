import React, { Component } from 'react';
import * as actions from '../store/actions/auth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Popconfirm } from 'antd';
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
        <Layout className="unselectable" style={{ minHeight: '100vh' }}>
          <Sider className="unselectable" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu  className="unselectable" theme="dark" defaultSelectedKeys={['5']} defaultOpenKeys ={['sub1']}mode="inline">

              <Menu.Item className="unselectable" key="1">
                <Link icon={<Icon type="desktop" />} className="unselectable"  to="/" style={{color: 'white'}}><Icon className="unselectable" type="desktop" /><span style={{color: 'white'}}>Главная</span></Link>
              </Menu.Item>
              <SubMenu className="unselectable"
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Пользователь</span>
                </span>
              }
            > {this.props.user_name ?
              <Menu.Item key="3"><Link to="/profile/"><div>{this.props.user_name}</div></Link></Menu.Item>
            :
              <Menu.Item key="3"><div>Профиль</div></Menu.Item>
            }
              <Menu.Item key="4">Команда</Menu.Item>
              {
                this.props.isAuthenticated ?
                
                <Menu.Item key="5">
                <Popconfirm 
                title="Вы действительно хотите выйти?"
                onConfirm={this.props.logout}
                okText="Да"
                cancelText="Нет"
              >
                  <div style={{width: '100%'}}>Выход</div> 
                  {/* Такое расположение. Типа div и ширина, чтобы триггер срабатывал при нажатии в любом месте кнопки */}
                  </Popconfirm>
                </Menu.Item>

                :

                <Menu.Item key="5">
                <Link to="/login/">Вход</Link>
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
                <Menu.Item key="6"><Link to="/combinator">Пересекатор</Link></Menu.Item>
                <Menu.Item key="8">Краулер</Menu.Item>
                <Menu.Item key="9">Метрика</Menu.Item>
                <Menu.Item key="10">E-mail шаблонизатор</Menu.Item>
              </SubMenu>
              <Menu.Item key="11">
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
            <Content id="selectable" style={{ margin: '30px 30px' }}>
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