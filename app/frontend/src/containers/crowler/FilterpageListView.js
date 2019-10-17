import React from 'react';
import axios from 'axios';
import { Table, Breadcrumb, BackTop, Menu, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';


const token = localStorage.getItem('token');
const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/crowler/categories/'>Категории</Link>   
    </Menu.Item>
  </Menu>)


class FilterpageListView extends React.Component {
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
    handleTableChange = (pagination, filters) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        page: pagination.current,
        filterpage_url: filters.filterpage_url ? filters.filterpage_url.toString() : '',
        filterpage_is_active: filters.filterpage_is_active ? filters.filterpage_is_active.toString() : '',
        filterpage_id: this.state.searchText
      });
    };
  
    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: 'Token ' + token}
      axios.get('http://0.0.0.0:8000/crowler/filterpage/',{
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
        dataIndex: 'filterpage_name',
        key: 'name',
        render: (text, record) => <Link to={`/crowler/filter-pages/${record.filterpage_id}`}>{text}</Link>,
      },
      {
        title: 'ID',
        dataIndex: 'filterpage_id',
        key: 'filterpage_id',
        ...this.getColumnSearchProps('filterpage_id'),
      },
      {
          title: 'URL',
          dataIndex: 'filterpage_url',
          key: 'filterpage_url',
          render: text => <a href={`https://sima-land.ru/${text}`} rel="noopener noreferrer" target='_blank' >{text}</a>,
          filters: [{ text: 'FPC', value: 'fpc' }, { text: 'FPA', value: 'fpa' }],
          filterMultiple: false
  
        },
        {
          title: 'Активна',
          dataIndex: 'filterpage_is_active',
          key: 'filterpage_is_active',
          filters: [{ text: 'Да', value: '1' }, { text: 'Нет', value: '0' }],
          filterMultiple: false
  
        },
    ];

    render() {
      return (
        <div>
        <BackTop />
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
            <Breadcrumb.Item>
            Краулер
            </Breadcrumb.Item>
            <Breadcrumb.Item overlay={menu}>
            <Link to='/crowler/changes/filter-pages/'>ПФС</Link>
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
        )
    }
}

export default FilterpageListView;