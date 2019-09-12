import React from 'react';
import axios from 'axios';
import { Table, Breadcrumb, BackTop, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';


const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/crowler/filter-pages/'>ПФС</Link>
    </Menu.Item>
  </Menu>)

const columns = [
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
class categoryListView extends React.Component {
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
        category_url: filters.category_url ? filters.category_url.toString() : '',
        category_is_active: filters.category_is_active ? filters.category_is_active.toString() : ''
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
            <Link to='/crowler/changes/filter-pages/'>Категории</Link>
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

export default categoryListView;