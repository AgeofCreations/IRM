import React from 'react';
import axios from 'axios';
import { Table, Breadcrumb, BackTop, Menu, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
if (token != null) {
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: 'Token ' + token}
  }
const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/crowler/filter-pages/'>ПФС</Link>
    </Menu.Item>
  </Menu>)


class categoryListView extends React.Component {
    state = {
      data: [],
      pagination: {},
      loading: false,
      searchText: '',
      filters: {},
    };
  
    componentDidMount() {
      this.fetch();
    }
    componentDidUpdate (prevProps) {
      if (this.props.user_id !== prevProps.user_id) {
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

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        page: pagination.current,
        category_url: filters.category_url ? filters.category_url.toString() : '',
        category_is_active: filters.category_is_active ? filters.category_is_active.toString() : '',
        category_id: this.state.searchText
      });
    };
  
    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios.get('http://0.0.0.0:8000/crowler/category/',{
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
    columns = [
      {
        title: 'Название',
        dataIndex: 'category_name',
        key: 'name',
        render: (text, record) => <Link to={`/crowler/categories/${record.category_id}`}>{text}</Link>,
      },
      {
        title: 'ID',
        dataIndex: 'category_id',
        key: 'id',
        ...this.getColumnSearchProps('category_id'),
      },
      {
          title: 'URL',
          dataIndex: 'category_url',
          key: 'category_url',
          render: text => <a href={`https://sima-land.ru/${text}`} rel="noopener noreferrer" target='_blank' >{text}</a>,
          filters: [
            { text: 'Праздники', value: 'prazdniki' },
            { text: 'Канцтовары', value: 'kanctovary' },
            { text: 'Товары для взрослых', value: 'ehroticheskie-tovary-dlya-vzroslyh'}
          ],
          filterMultiple: false
  
        },
        {
          title: 'Активна',
          dataIndex: 'category_is_active',
          key: 'category_is_active',
          filters: [{ text: 'Да', value: '1' }, { text: 'Нет', value: '0' }],
          filterMultiple: false
  
        },
    ];
    render() {
      return (
        <div>
        {
          token ?
        <div>
        <BackTop />
        <Breadcrumb>
          <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
          <Breadcrumb.Item>
            Краулер
          </Breadcrumb.Item>
          <Breadcrumb.Item overlay={menu}>
            <Link to='/crowler/changes/filter-pages/'>Категории</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
        </div> 
        :
        <div>Только для авторизованных пользователей</div>
        }
        </div>
        )
    }
}

export default categoryListView;