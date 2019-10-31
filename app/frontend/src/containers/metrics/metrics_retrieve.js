import React from 'react'
import { BackTop, Menu, Table, Breadcrumb, Icon, Divider, Button, message, Modal, Input } from 'antd';
import axios from 'axios'
import { Link }  from 'react-router-dom'
import { connect } from 'react-redux';
import backendURL from '../../consts'



const token = localStorage.getItem('token');
if (token != null) {
  axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: 'Token ' + token 
  }
}




class MetricsRetrieve extends React.Component {
    state = {
      data: [],
      head_category: '',
    };

    componentWillMount() {
        const categoryDataID = this.props.match.params.categoryDataID; 
        axios.get(`${backendURL}/metrics/category_data/${categoryDataID}/`)
            .then(res => {
                this.setState({
                    data: res.data.third_level,
                    head_category: res.category_name,
                })
            })
    }


    columns = [
      {
        title: 'Путь категории',
        dataIndex: 'child_category',
        key: 'child_category',
      },
      {
        title: 'Первая неделя',
        dataIndex: 'weeks[0].weekly_traffic',
        key: 'first_week_col',
        render: (text) => <span>{text}</span>,
      },

      {
          title: 'Вторая неделя',
          dataIndex: 'weeks[1].weekly_traffic',
          key: 'second_week',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Третья неделя',
          dataIndex: 'weeks[2].weekly_traffic',
          key: 'third_week',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Четвёртая неделя',
          dataIndex: 'weeks[3].weekly_traffic',
          key: 'fourth_week',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Пятая неделя',
          dataIndex: 'weeks[4].weekly_traffic',
          key: 'fifth_week',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Суммарно за месяц',
          dataIndex: 'child_category_traffic',
          key: 'monthly_sum',
          render: (text) => <span>{text}</span>,
  
        },
    ];
  
    render() {
      return (
        <div>
        {
                    token ?
            <div>
        <BackTop />
        <h1>{this.state.head_category}</h1>
        <Breadcrumb style={{marginBottom: '10px'}}>
            <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
            <Breadcrumb.Item>
            <Link to='/metrics/'>Метрика</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
            {this.state.head_category}
            </Breadcrumb.Item>
        </Breadcrumb>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          rowKey="id"
          style={{marginTop: '20px'}}
        />
        </div>
        :
        <div>Только для авторизованных пользователей</div>
        }
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        count: state.notificationsReducer.count,
        user_id: state.authReducer.user_id,
    }
}

export default connect(mapStateToProps)(MetricsRetrieve);