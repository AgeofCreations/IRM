import React from 'react';
import axios from 'axios';
import { Table, Breadcrumb, Menu, Icon, BackTop } from 'antd';
import { Link } from 'react-router-dom';



const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/crowler/changes/filter-pages/'>Изменения ПФС</Link>   
    </Menu.Item>
  </Menu>)

const columns = [
    {
      title: 'Название до изменения',
      dataIndex: 'old_category_name',
      key: 'name',
      render: (text, record) => <Link to={`/crowler/changes/categories/${record.id}`}>{text}</Link>,
    },
    {
      title: 'ID',
      dataIndex: 'category_id',
      key: 'id',
    },
    {
      title: 'Изменённые поля',
      dataIndex: 'changed_fields',
      key: 'changed_fields',
      filters: [
        { text: 'Активность', value: 'is_active' },
        { text: 'Название', value: 'name' },
      ],
      render: (text) => <p>{text ? text.replace('is_active', 'Активность') : ''}</p>,
      filterMultiple: false

    },
  ];
class CategoryChangesList extends React.Component {
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
        changed_fields: filters.changed_fields ? filters.changed_fields.toString() : '',
      });
    };
  
    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios.get('http://0.0.0.0:8000/crowler/changes/category/',{
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
        <Breadcrumb style={{marginBottom: '20px'}}>
            <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
            <Breadcrumb.Item>
            Краулер
            </Breadcrumb.Item>
            <Breadcrumb.Item overlay={menu}>
            <Link to='/crowler/changes/categories/'>Изменения категорий</Link>
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

export default CategoryChangesList;