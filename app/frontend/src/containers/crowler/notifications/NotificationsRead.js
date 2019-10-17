import React from 'react'
import { BackTop, Menu, Table, Breadcrumb, Icon, Button, message, Modal, Input } from 'antd';
import axios from 'axios'
import { Link }  from 'react-router-dom'
import { connect } from 'react-redux';


const DataUrl = `http://0.0.0.0:8000/crowler/notify`;
const token = localStorage.getItem('token');

const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/notifications/'>Непрочитанные</Link>   
    </Menu.Item>
  </Menu>)




class NotificationsRead extends React.Component {
    state = {
      data: [],
      pagination: {},
      loading: false,
      searchPFSID: '',
      searchCatID: '',
      filters: {},
    };
    componentDidUpdate (prevProps) {
      if (this.props.user_id !== prevProps.user_id) {
      this.fetch()

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

    componentDidMount() {
      if (this.props.user_id){ 
        this.fetch()
      }
    }

//---------------------ПОИСК----------------------
getColumnSearchProps = dataIndex => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          this.searchInput = node;
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        icon="search"
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  filterIcon: filtered => (
    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  render: text => (text
  ),
});

handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm(); 
  if (dataIndex === 'filterpage_id') {
    this.setState({ searchPFSID: selectedKeys[0] });
  } else if (dataIndex === 'category_id'){
    this.setState({ searchCatID: selectedKeys[0] });
  }
  var pagination = this.state.pagination
  var filters = this.state.filters
  this.handleTableChange(pagination,filters)
};

handleReset = clearFilters => {
  clearFilters();
  this.setState({ searchPFSID: '',
                  searchCatID: '',
});
};
/////////////////////////////////////////ПОИСК/////////////////////////

    columns = [
      {
        title: 'ID категории',
        dataIndex: 'category_id',
        key: 'category_id',
        ...this.getColumnSearchProps('category_id'),
      },
      {
        title: 'ID ПФС',
        dataIndex: 'filterpage_id',
        key: 'filterpage_id',
        ...this.getColumnSearchProps('filterpage_id'),
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
      axios.post(`${DataUrl}/delete/`, {notification_id: id})
      message
      .loading('Удаляем из базы. Это может занять некоторое время.', 2.5)
      var pagination = this.state.pagination
      var filters = this.state.filters
      this.handleTableChange(pagination,filters)
      this.setState({ loading: false });
    }

    handleTableChange = (pagination, filters) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        page: pagination.current,
        action_is: filters.action_is ? filters.action_is.toString() : '',
        action_subjects: filters.action_subjects ? filters.action_subjects.toString() : '',
        filterpage_id: this.state.searchPFSID,
        category_id: this.state.searchCatID
      });
    };

    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: 'Token ' + token}
      axios.get(`${DataUrl}/?is_actual=${this.props.user_id}`,{
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
        <Button type="default" size="small" style={{'position': 'absolute', 'right': '20%'}}><Link to="/notifications/subscriptions/">Управление подписками</Link></Button>
        <Button type="danger" size="small" style={{'position': 'absolute', 'right': '2%'}} onClick={() => this.delete('all')}>Удалить всё</Button>
        <Button icon="question-circle" style={{'position': 'absolute', 'right': '10%'}} onClick={this.info}></Button>
        <Breadcrumb style={{marginBottom: '10px'}}>
            <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
            <Breadcrumb.Item>
            Уведомления
            </Breadcrumb.Item>
            <Breadcrumb.Item overlay={menu}>
            <Link to='/notifications/is-read/'>Прочитанные</Link>
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

export default connect(mapStateToProps)(NotificationsRead);