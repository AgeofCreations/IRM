import React from 'react';
import axios from 'axios';
import { Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import backendURL from '../../consts'

const token = localStorage.getItem('token');
if (token != null) {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: 'Token ' + token}
    }

class CategoryRetrieveView extends React.Component {
    state = {
        data: {}
    }
    componentDidUpdate (prevProps) {
        if (this.props.match.params.categoryID !== prevProps.match.params.categoryID) {
        const categoryID = this.props.match.params.categoryID; 
        axios.get(`${backendURL}/crowler/category/${categoryID}/`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
    }
    componentWillMount() {
        const categoryID = this.props.match.params.categoryID; 
        axios.get(`${backendURL}/crowler/category/${categoryID}/`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }
    render() {
        return(
            <div>
            {
            token ?
            <div>
                <Descriptions title={this.state.data.category_name} bordered layout='vertical'>
                    <Descriptions.Item label="ID">{this.state.data.category_id}</Descriptions.Item>
                    <Descriptions.Item label="Уровень вложенности">{this.state.data.category_lvl}</Descriptions.Item>
                    <Descriptions.Item label="Категория активна">{this.state.data.category_is_active === 1 ? 'Да' : 'Нет'}</Descriptions.Item>
                    <Descriptions.Item label="Путь по ID">{this.state.data.category_path}</Descriptions.Item>
                    <Descriptions.Item label="URL" span={2}>
                        {<a href={`https://sima-land.ru/${this.state.data.category_url}/` } rel="noopener noreferrer" target='_blank'>
                        {this.state.data.category_url}
                        </a>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Full_name" span={1}>
                        {this.state.data.category_full_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Title">{this.state.data.category_title}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={1}>{this.state.data.category_description}</Descriptions.Item>
                    <Descriptions.Item label="SEO текст" span={3}>{this.state.data.category_seo_text}</Descriptions.Item>
                    <Descriptions.Item label="Дата обновления" span ={1}>{this.state.data.category_data_updated}</Descriptions.Item>
                    <Descriptions.Item label="Canonical URL" span ={1}>{this.state.data.category_canonical_url}</Descriptions.Item>
                    <Descriptions.Item label="Родительская категория" span ={1}>{
                        this.state.data.category_parent_id !== 0 ? <Link to={`/crowler/categories/${this.state.data.category_parent_id}/`}>
                        {this.state.data.category_parent_id}
                        </Link> : 'Не имеет'}
                    </Descriptions.Item>
                </Descriptions>
                </div>
                :
                <div>Только для авторизованных пользователей</div>}
            </div>
        )
    }
}

export default CategoryRetrieveView;