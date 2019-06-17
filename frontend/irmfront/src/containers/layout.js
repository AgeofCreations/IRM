import React, { Component } from 'react';
import * as actions from '../store/actions/auth';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
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
                <span><Link to="/" style={{color: 'white'}}>Mainpage</Link></span>
              </Menu.Item>
              <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Kitty</Menu.Item>
              <Menu.Item key="4">Is</Menu.Item>
              {
                this.props.isAuthenticated ?
                <Menu.Item key="5" onClick={this.props.logout}>
                  Logout
                </Menu.Item>

                :

                <Menu.Item key="5">
                <Link to="/login">Login</Link>
                </Menu.Item>

            }

            </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Team</span>
                  </span>
                }
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
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
              <Menu.Item key="1"><Link to="/combinator">App</Link></Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
            <Content id="selectable" style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>CRM</Breadcrumb.Item>
                <Breadcrumb.Item>Combinator</Breadcrumb.Item>
              </Breadcrumb>
              <div>{this.props.children}</div>
              {/* <div style={{ padding: 24, background: '#ffffff', minHeight: 70, margin: 'auto', textAlign: 'center' }}>Thanks, kitty ♥</div> */}
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