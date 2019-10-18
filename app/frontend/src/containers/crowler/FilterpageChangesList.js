import React from 'react';
import axios from 'axios';
import { Table, Breadcrumb, Menu, Icon, BackTop, Input, Button } from 'antd';
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
      <Link to='/crowler/changes/categories/'>Изменения категорий</Link>   
    </Menu.Item>
  </Menu>)


class FilterpageChangesList extends React.Component {
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
    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        page: pagination.current,
        changed_fields: filters.changed_fields ? filters.changed_fields.toString() : '',
        filterpage_id: this.state.searchText
      });
    };
  
    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios.get('http://0.0.0.0:8000/crowler/changes/filterpage/',{
        params: {
          ...params,
        }})
        .then(res => {
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
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
        title: 'Название до изменения',
        dataIndex: 'old_filterpage_name',
        key: 'name',
        render: (text, record) => <Link to={`/crowler/changes/filter-pages/${record.id}`}>{text}</Link>,
      },
      {
        title: 'ID',
        dataIndex: 'filterpage_id',
        key: 'filterpage_id',
        ...this.getColumnSearchProps('filterpage_id'),
      },
      {
        title: 'Изменённые поля',
        dataIndex: 'changed_fields',
        key: 'changed_fields',
        filters: [{ text: 'Активность', value: 'is_active' }, { text: 'Название', value: 'name' }],
        render: (text) => <p>{text ? text.replace('is_active', 'Активность') : ''}</p>,
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
        <Breadcrumb style={{marginBottom: '20px'}}>
            <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
            <Breadcrumb.Item>
            Краулер
            </Breadcrumb.Item>
            <Breadcrumb.Item overlay={menu}>
            <Link to='/crowler/changes/filter-pages/'>Изменения ПФС</Link>
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

export default FilterpageChangesList;