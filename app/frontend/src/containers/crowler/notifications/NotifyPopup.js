import React from 'react'
import { BackTop, Menu, Table, Breadcrumb, Icon, Divider, Button, message, Modal, Input } from 'antd';
import axios from 'axios'
import { Link }  from 'react-router-dom'
import { connect } from 'react-redux';


const DataUrl = `http://0.0.0.0:8000/crowler/notify`;
const token = localStorage.getItem('token');
const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/notifications/is-read/'>Прочитанные</Link>
    </Menu.Item>
  </Menu>)




class NotifyPopup extends React.Component {
    state = {
      data: [],
      pagination: {current: 1},
      loading: false,
      searchText: '',
      filters: {},
    };
    componentDidUpdate (prevProps) {
      if (this.props.user_id !== prevProps.user_id) {
      this.fetch()

      }
  }
  info() {
    Modal.info({
      title: 'Уведомления',
      content: (<div>
        <p>Это - уведомления. Они появляются, когда краулер регистриует изменения на сайте</p>
        <p>Нажатие на ID ПФС записи переведёт вас на страницу подфильтровой страницы в общем списке. Полезно, когда действие - "Создано"</p>
        <p>Если "Действие" у записи - "Изменено", значит изменилась страница, ранее зарегестрированная краулером. В этом случае нажатие на текст "Изменено" отправит вас к изменениям страницы</p>
        <p>Вы можете отфильтровать список по действию или по изменённым полям(Это особенно полезно тем, что краулер также регистриует появляние или исчезновение товара на странице)</p>
        <p>Для того, чтобы перенести уведомление в прочитанные - нажмите синюю кнопку "Прочитать"</p>
        <p>Для того, чтобы удалить уведомления без возможности его прочтения в будущем - нажмите кнопку "Удалить"</p>
        <p>К прочитанным уведомлениям можно попасть при помощи хлебных крошек, нажав на "Непрочитанные" --> "Прочитанные"</p>
        <p>Новых уведомлений не появится, если вы не подписаны на разделы сайта. Для управления подписками есть специальная кнопка слева от этой</p>
        <p>Справа от этой кнопки находится кнопка "Прочесть всё". Она переносит все непрочитанные сообщения в "Прочитанные". Это может занять некоторое время.</p>
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
        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={() => this.handleSearch(selectedKeys, confirm)}
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

handleSearch = (selectedKeys, confirm) => {
  confirm(); 
  this.setState({ searchText: selectedKeys[0] });
  var pagination = this.state.pagination
  var filters = this.state.filters
  this.handleTableChange(pagination,filters)
};

handleReset = clearFilters => {
  clearFilters();
  this.setState({ searchText: '' });
};
/////////////////////////////////////////ПОИСК/////////////////////////
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
          <span className="custom-links" onClick={() => this.read(row.id)}>Прочитать</span>
          <Divider type="vertical" />
          <span style={{'color': 'red', 'cursor': 'pointer'}} onClick={() => this.delete(row.id)}>Удалить</span>
          </span>
          )
  
        },
    ];

    read = (id) => {
      this.setState({ loading: true });
      axios.post(`${DataUrl}/read/`, {notification_id: id})
      message
      .loading('Помечаем прочитанным. Это может занять некоторое время.', 2.5)
      this.fetch()
      this.setState({ loading: false });

    }
    delete = (id) => {
      this.setState({ loading: true });
      axios.post(`${DataUrl}/delete/`, {notification_id: id})
      message
      .loading('Удаляем из базы. Это может занять некоторое время.', 2.5)
      this.fetch()
      this.setState({ loading: false });
    }
    test = () => {
    }

    handleTableChange = (pagination, filters) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
        filters: filters,
      });
      this.fetch({
        page: pagination.current,
        action_is: filters.action_is ? filters.action_is.toString() : '',
        action_subjects: filters.action_subjects ? filters.action_subjects.toString() : '',
        filterpage_id: this.state.searchText
      });
    };

    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: 'Token ' + token}
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
        <Button type="default" size="small" style={{'position': 'absolute', 'right': '20%'}}><Link to="/notifications/subscriptions/">Управление подписками</Link></Button>
        <Button type="danger" size="small" style={{'position': 'absolute', 'right': '2%'}} onClick={() => this.read('all')}>Прочесть всё</Button>
        <Button icon="question-circle" style={{'position': 'absolute', 'right': '10%'}} onClick={this.info}></Button>
        
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
          style={{marginTop: '20px'}}
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