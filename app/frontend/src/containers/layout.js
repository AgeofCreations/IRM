import React, { Component } from 'react';
import * as actions from '../store/actions/auth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Popconfirm, Badge, } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;



class CustomLayout extends Component {
    state = {
      collapsed: false,
      visible: false
    };

    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
    closeDrawer = () => {
      this.setState({
        visible: false,
      });
    };
  

    onCollapse = collapsed => {
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
              <Menu.Item key="3"><Link to="/profile/"><div>Профиль</div></Link></Menu.Item>
            }
              <Menu.Item key="4"><Link to="/management/">Управление</Link></Menu.Item>
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
                <Menu.Item key="6"><Link to="/combinator/">Пересекатор</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/metrics/">Метрика</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="interaction" />
                    <span>Краулер</span>
                  </span>
                }
              >
                <Menu.Item key="10"><Link to="/crowler/categories/">Категории</Link></Menu.Item>
                <Menu.Item key="11"><Link to="/crowler/filter-pages/">ПФС</Link></Menu.Item>
                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      <Icon type="fork" />
                      <span>Изменения</span>
                    </span>
                  }
              >
                  <Menu.Item key="15"><Link to="/crowler/changes/categories/">Категории</Link></Menu.Item>
                  <Menu.Item key="16"><Link to="/crowler/changes/filter-pages/">ПФС</Link></Menu.Item>
              </SubMenu>
                <Menu.Item key="13">Метрики</Menu.Item>
              </SubMenu>
              <Menu.Item key="14">
                <Link to="/feedback/">
                  <Icon type="file" />
                  <span>Обратная связь</span>
                </Link>
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
              <Menu.Item key="1"><Link to="/combinator/">Пересекатор</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/notifications/"><Badge count={this.props.notificationsCount} dot>Уведомления</Badge></Link></Menu.Item>
            </Menu>
          </Header>
            <Content id="selectable" style={{ margin: '30px 30px' }}>
              <div>{this.props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Олег Котов. 2019</Footer>
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