import React from 'react';
import axios from 'axios';
import { Table, Breadcrumb, BackTop, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';


const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/crowler/categories/'>Категории</Link>   
    </Menu.Item>
  </Menu>)

const columns = [
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
class FilterpageListView extends React.Component {
    state = {
      data: [],
      pagination: {},
      loading: false,
    };
  
    componentDidMount() {
      this.fetch();
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
        filterpage_url: filters.filterpage_url ? filters.filterpage_url.toString() : '',
        filterpage_is_active: filters.filterpage_is_active ? filters.filterpage_is_active.toString() : ''
      });
    };
  
    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios.get('http://0.0.0.0:8000/crowler/filterpage/',{
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
          columns={columns}
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