import React from 'react'
import { BackTop, Menu, Table, Breadcrumb, Icon, Divider } from 'antd';
import axios from 'axios'
import { Link }  from 'react-router-dom'
import * as actions from '../../../store/actions/notifications'
import { connect } from 'react-redux';


const DataUrl = `http://0.0.0.0:8000/crowler/notify`;
const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/crowler/categories/'>Категории</Link>   
    </Menu.Item>
  </Menu>)




class NotifyPopup extends React.Component {
    state = {
      data: [],
      pagination: {},
      loading: false,
    };
    componentDidUpdate (prevProps) {
      if (this.props.user_id !== prevProps.user_id) {
      this.fetch()

      }
  }
    componentDidMount() {
      if (this.props.user_id){ 
        this.fetch()
      }
    }

    columns = [
      {
        title: 'ID категории',
        dataIndex: 'category_id',
        key: 'category_id',
        render: (text, record) => <Link rel="noopener noreferrer" target='_blank' to={`/crowler/filter-pages/${record.category_id}`}>{text}</Link>,
      },
      {
        title: 'ID ПФС',
        dataIndex: 'filterpage_id',
        key: 'filterpage_id',
        render: (text, record) => <Link rel="noopener noreferrer" target='_blank' to={`/crowler/filter-pages/${record.filterpage_id}`}>{text}</Link>,
      },
      {
          title: 'Действие',
          dataIndex: 'action_is',
          key: 'action_is',
          render: (text, record) => <span>{text === 'created'? <div>Создано</div> : <div><Link rel="noopener noreferrer" target='_blank' to={record.filterpage_id ? `/crowler/changes/filter-pages/${record.action_id}`: `/crowler/changes/categories/${record.action_id}`}>Изменено</Link></div>}</span>,
          filters: [{ text: 'Создано', value: 'created' }, { text: 'Изменено', value: 'changed' }],
          filterMultiple: false
  
        },
        {
          title: 'Изменённые поля',
          dataIndex: 'action_subjects',
          key: 'action_subjects',
          render: (text) => <span>{
            text
            .replace('filterpage_disabling_reason','Причина отключения |')
            .replace('filterpage_is_active_changed_at','Статус изменен (дата) |')
            .replace('filterpage_is_active', 'Статус |')
            .replace('filterpage_url','URL |')
            .replace('filterpage_title','Title |')
            .replace('filterpage_description','Description |')
            .replace('filterpage_full_name','FN  |')
            .replace('filterpage_text','SEO текст |')
            .replace('filterpage_name','Название |')
            .replace('filterpage_canonical_url','Canonical URL |')
            .replace('filterpage_is_top','Под листингом |')
          }</span>,
          filters: [
            { text: 'ПФС | Статус', value: 'is_active' },
            { text: 'ПФС | Причина отключения', value: 'filterpage_disabling_reason' },
            { text: 'ПФС | Статус изменён(дата)', value: 'filterpage_is_active_changed_at' },
            { text: 'ПФС | URL', value: 'filterpage_url' },
            { text: 'ПФС | Title', value: 'filterpage_title' },
            { text: 'ПФС | Description', value: 'filterpage_description' },
            { text: 'ПФС | FN', value: 'filterpage_full_name' },
            { text: 'ПФС | SEO текст', value: 'filterpage_text' },
            { text: 'ПФС | Название', value: 'filterpage_name' },
            { text: 'ПФС | Canonical URL', value: 'filterpage_canonical_url' },
            { text: 'ПФС | Под листингом', value: 'filterpage_is_top' },
  
          ],
          filterMultiple: false
  
        },
        { onClick: (record) => this.read(record.id),
          title: 'Действия',
          key: 'actions',
          render: (text, record) => (
            <div>
              <span>Отметить прочитанным {record.id}</span>
              <Divider type="vertical" />
              <div >Удалить</div>
            </div>
          )
  
        },
    ];
    read = (notification) => {

      axios.post(`${DataUrl}/read/`, {notification_id: notification.id})
      console.log('Test')
    }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        action_is: filters.action_is ? filters.action_is.toString() : '',
        action_subjects: filters.action_subjects ? filters.action_subjects.toString() : ''
      });
    };

    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios.get(`${DataUrl}/?not_read=${this.props.user_id}`,{
        params: {
          ...params,
          
        }})
        .then(res => {
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.count;
        pagination.pageSize = 25
        pagination.position = 'both'
        this.setState({
          loading: false,
          data: res.data.results,
          pagination,
        });
      });
    };
  
    render() {
      return (
        <div>
        {this.props.user_id ?
        <div>
        <BackTop />
        <Breadcrumb style={{marginBottom: '10px'}}>
            <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
            <Breadcrumb.Item>
            Уведомления
            </Breadcrumb.Item>
            <Breadcrumb.Item overlay={menu}>
            <Link to='/notifications/'>Непрочитанные</Link>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          rowKey="id"
        />
        </div>
        :
        <div>Not Logged In</div>
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

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
//     }
// }

export default connect(mapStateToProps)(NotifyPopup);