import React from 'react';
import { DatePicker, Button, BackTop, Breadcrumb, Table, Modal, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'
import backendURL from '../../consts';


const {MonthPicker} = DatePicker;
const token = localStorage.getItem('token');

class MetricsMain extends React.Component {
    state = {
        month: '',
        first_week: 'Первая неделя',
        second_week: 'Вторая неделя',
        third_weeek: 'Третья неделя',
        fourth_week: 'Четвёртая неделя',
        fifth_week: 'Пятая неделя',
        data: []
    }
    onChangeMonth = (date, dateString) => {
        this.setState({
            month: dateString,
        })
        console.log(this.state.month)
      }
    
    componentDidUpdate (prevProps) {
        if (this.props.user_id !== prevProps.user_id) {
        this.fetchcat()
  
        }
    }
    info() {
      Modal.info({
        title: 'Прочитанные уведомления',
        content: (<div>
          <p>Это - прочитанные уведомления. Склад уведомлений, которые вы отложили на потом.</p>
          <p>Все элементы навигации и функци те же, что и в непрочитанных за малыми изменениями</p>
          <p>Доступно только действие "Удалить". Оно удаляет уведомление без возможности прочтения в будущем.</p>
          <p>Справа от этой кнопки находится кнопка "Удалить всё". Она удаляет все уведомления без возможности их прочтения в дальнейшем. Это может занять некоторое время.</p>
        </div>),
        onOk() {},
      });
    }

    fetchit = () => {
        axios.post(`${backendURL}/metrics/month/`, {
            month: this.state.month,
        })
    }

    //////////////////////////
    test = () => {
        axios.post(`${backendURL}/metrics/test_tasks/`)
        .then(res => {
            this.setState({
                month: '2019-10',
            })
        })
    }
    //////////////////////////


    columns = [
        {
          title: 'Категория',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <span>{text}</span>,
        },
        {
          title: this.state.first_week,
          dataIndex: 'weeks_data[0].weekly_traffic',
          key: 'first_week_col',
          render: (text) => <span>{text}</span>,
        },
        {
            title: 'Действие',
            dataIndex: 'action_is',
            key: 'action_is',
            render: (text, record) => <span>{text === 'created'? <div>Создано</div> : <div><Link rel="noopener noreferrer" target='_blank' to={record.filterpage_id ? `/crowler/changes/filter-pages/${record.action_id}`: `/crowler/changes/categories/${record.action_id}`}>Изменено</Link></div>}</span>,
    
          },
          {
            title: 'Изменённые поля',
            dataIndex: 'action_subjects',
            key: 'action_subjects',
            render: (text) => <span>{text}</span>,
    
          },
          { 
            title: 'Действия',
            dataIndex: 'id',
            key: 'actions',
            render: (text, row) => (
            <span>
            <span style={{'color': 'red', 'cursor': 'pointer'}} onClick={() => this.delete(row.id)}>Удалить</span>
            </span>
            )
    
          },
      ];
  
      delete = (id) => {
        this.setState({ loading: true });
        axios.post(`${backendURL}crowler/notify/delete/`, {notification_id: id})
        message
        .loading('Удаляем из базы. Это может занять некоторое время.', 2.5)
        var filters = this.state.filters
        this.handleTableChange(filters)
        this.setState({ loading: false });
      }
  
      handleTableChange = () => {
        this.fetchcats({
        });
      };
  
      fetchcats = (params = {}) => {
        this.setState({ loading: true });
        axios.post(`${backendURL}/metrics/month/`, {
          month: this.state.month,
      })
          .then(res => {
          const pagination = { ...this.state.pagination };
          pagination.total = res.data.count;
          pagination.pageSize = 25
          pagination.position = 'both'
          this.setState({
            loading: false,
            data: res.data.categories,
            // first_week: res.data.categories.weeks_data[0].first_day + '-' + res.data.categories.weeks_data[0].last_day,
          });
        });
      };
    
      render() {
        return (
          <div>
          {token ?
          <div>
          <div>
            <MonthPicker onChange={this.onChangeMonth} placeholder="Выберите месяц" />
            <Button type="primary" style={{'marginLeft': '20px'}} onClick={this.fetchit}>OK</Button>
            <Button type="default" style={{'marginLeft': '20px'}} onClick={this.test}>Test</Button>
          </div>
          <BackTop />
          <Button type="default" size="small" style={{'position': 'absolute', 'right': '20%'}}><Link to="/notifications/subscriptions/">Управление подписками</Link></Button>
          <Button type="danger" size="small" style={{'position': 'absolute', 'right': '2%'}} onClick={() => this.delete('all')}>Удалить всё</Button>
          <Button icon="question-circle" style={{'position': 'absolute', 'right': '10%'}} onClick={this.info}></Button>
          <Breadcrumb style={{marginBottom: '10px'}}>
              <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
              <Breadcrumb.Item>
              Уведомления
              </Breadcrumb.Item>
          </Breadcrumb>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            rowKey="id"
          />
          </div>
          :
          <div>Только для авторизованных пользователей</div>
          }
          </div>
          )
      }
  }

export default MetricsMain;