import React from 'react';
import axios from 'axios';
import { Descriptions, Breadcrumb, Menu, Icon, BackTop } from 'antd';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: 'Token ' + token}
const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/crowler/categories/'>Категории</Link>   
      </Menu.Item>
    </Menu>)


class FilterpageRetrieveView extends React.Component {
    state = {
        data: {}
    }
    componentDidMount() {
        const filterpageID = this.props.match.params.filterpageID; 
        axios.get(`http://0.0.0.0:8000/crowler/filterpage/${filterpageID}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }
    render() {
        return(
            <div>
                 <BackTop />
                    <Breadcrumb style={{marginBottom: '20px'}}>
                        <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Краулер
                        </Breadcrumb.Item>
                        <Breadcrumb.Item overlay={menu}>
                            <Link to='/crowler/filter-pages/'>ПФС</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.data.filterpage_id}</Breadcrumb.Item>
                    </Breadcrumb>
                <Descriptions title={this.state.data.filterpage_name} bordered layout='vertical'>
                    <Descriptions.Item label="ID">{this.state.data.filterpage_id}</Descriptions.Item>
                    <Descriptions.Item label="ПФС активна">{this.state.data.filterpage_is_active === 1 ? 'Да' : 'Нет'}</Descriptions.Item>
                    <Descriptions.Item label="Причина отключения">{this.state.data.filterpage_disabling_reason}</Descriptions.Item>
                    <Descriptions.Item label="Выводится под листингом">
                    {this.state.data.filterpage_is_top === true ? 'Да' : 'Нет'}</Descriptions.Item>
                    <Descriptions.Item label="URL" span={2}>
                        {<a href={`https://sima-land.ru/${this.state.data.filterpage_url}/` } rel="noopener noreferrer" target='_blank'>
                        {this.state.data.filterpage_url}
                        </a>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Full_name" span={1}>
                        {this.state.data.filterpage_full_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Title">{this.state.data.filterpage_title}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={1}>{this.state.data.filterpage_description}</Descriptions.Item>
                    <Descriptions.Item label="SEO текст" span={3}>{this.state.data.filterpage_text}</Descriptions.Item>
                    <Descriptions.Item label="Дата обновления" span ={1}>{this.state.data.filterpage_data_updated}</Descriptions.Item>
                    <Descriptions.Item label="Canonical URL" span ={1}>{this.state.data.filterpage_canonical_url}</Descriptions.Item>
                    <Descriptions.Item label="Впервые появилась" span ={1}>
                        {this.state.data.filterpage_created_at}
                    </Descriptions.Item>
                    </Descriptions>
                </div>
        )
    }
}

export default FilterpageRetrieveView;