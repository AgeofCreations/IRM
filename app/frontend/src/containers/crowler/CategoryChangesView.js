import React from 'react';
import axios from 'axios';
import { Descriptions, Alert, Breadcrumb, Menu, Icon, BackTop } from 'antd';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: 'Token ' + token}
const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/crowler/changes/categories/'>Категории</Link>   
      </Menu.Item>
      <Menu.Item>
        <Link to='/crowler/changes/filter-pages/'>ПФС</Link>
      </Menu.Item>
    </Menu>)

class CategoryChangesView extends React.Component {
    state = {
        data: {}
    }
    componentDidUpdate (prevProps) {
        if (this.props.match.params.categoryID !== prevProps.match.params.categoryID) {
        const categoryID = this.props.match.params.categoryID; 
        axios.get(`http://0.0.0.0:8000/crowler/changes/category/${categoryID}/`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
    }
    componentDidMount() {
        const categoryID = this.props.match.params.categoryID; 
        axios.get(`http://0.0.0.0:8000/crowler/changes/category/${categoryID}/`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }
    render() {
        let response = this.state.data
        return(
            <div>
                <BackTop />
                <Breadcrumb style={{marginBottom: '20px'}}>
                    <Breadcrumb.Item><Link to="/"><Icon type="home"></Icon></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Краулер 
                    </Breadcrumb.Item>
                    <Breadcrumb.Item overlay={menu}>
                        <Link to='/crowler/changes/filter-pages/'>Изменения</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{response.category_id}</Breadcrumb.Item>
                </Breadcrumb>
                <Descriptions title={response.category_id} bordered layout='vertical'>
                    <Descriptions.Item label="Дата и время проверки"span={1}>
                        {response.category_data_changed ? response.category_data_changed.replace('T', ' ') : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Поля изменены" span ={2}>{response.changed_fields}</Descriptions.Item>

                    <Descriptions.Item label="Старое название"span={1}>
                        {response.old_category_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Новое название"span={2}>
                        {response.new_category_name !== response.old_category_name ? 
                        <Alert message={response.new_category_name} type='error'></Alert> : 
                        response.new_category_name}
                    </Descriptions.Item>

                    
                    <Descriptions.Item label="Старое 'Категория активна'" span={1}>{response.old_category_is_active === 1 ? 'Да' : 'Нет'}</Descriptions.Item>
                    <Descriptions.Item label="Новое 'Категория активна'" span={2}>
                        {response.new_category_is_active !== response.old_category_is_active ? 
                        <Alert message={response.new_category_is_active === 1 ? 'Да' : 'Нет'} type='error'></Alert> : 
                        response.new_category_is_active === 1 ? 'Да' : 'Нет'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Старый URL" span={1}>
                        {response.old_category_url !== undefined ? 
                        <a href={`https://sima-land.ru/${response.old_category_url}/` } rel="noopener noreferrer" target='_blank'>
                        {response.old_category_url}
                        </a>
                        :
                        'Отсутствует'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Новый URL" span={2}>
                        {response.new_category_url !== undefined ?
                        <a href={`https://sima-land.ru/${response.new_category_url}/` } rel="noopener noreferrer" target='_blank'>
                            {response.new_category_url !== response.old_category_url ? 
                            <Alert message={response.new_category_url} type='error'></Alert> : 
                            response.new_category_url}
                        </a>
                        :
                        'Удалён'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Старый Full_name" span={1}>
                        {response.old_category_full_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Новый Full_name" span={2}>
                        {response.new_category_full_name !== response.old_category_full_name ? 
                        <Alert message={response.new_category_full_name} type='error'></Alert> : 
                        response.new_category_full_name}
                    </Descriptions.Item>

                    <Descriptions.Item label="Старый Title" span={1}>{response.old_category_title}</Descriptions.Item>
                    <Descriptions.Item label="Новый Title" span={2}>
                        {response.new_category_title !== response.old_category_title ? 
                        <Alert message={response.new_category_title} type='error'></Alert> : 
                        response.new_category_title}
                    </Descriptions.Item>

                    <Descriptions.Item label="Старый Description" span={1}>{response.old_category_description}</Descriptions.Item>
                    <Descriptions.Item label="Новый Description" span={2}>
                        {response.new_category_description !== response.old_category_description ? 
                        <Alert message={response.new_category_description} type='error'></Alert> : 
                        response.new_category_description}
                    </Descriptions.Item>

                    <Descriptions.Item label="Старый SEO текст" span={3}>{response.old_category_seo_text}</Descriptions.Item>
                    <Descriptions.Item label="Новый SEO текст" span={3}>
                        {response.new_category_seo_text !== response.old_category_text ? 
                        <Alert message={response.new_category_seo_text} type='error'></Alert> : 
                        response.new_category_seo_text}
                    </Descriptions.Item>

                    <Descriptions.Item label="Старый Canonical URL" span ={1}>
                        {<a href={`https://sima-land.ru/${response.old_category_canonical_url}/` } rel="noopener noreferrer" target='_blank'>
                            {response.old_category_canonical_url}
                        </a>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Новый Canonical URL" span ={2}>
                        {<a href={`https://sima-land.ru/${response.new_category_canonical_url}/` } rel="noopener noreferrer" target='_blank'>
                            {response.new_category_canonical_url !== response.old_category_canonical_url ? 
                            <Alert message={response.new_category_canonical_url} type='error'></Alert> : response.new_category_canonical_url}
                        </a>}
                    </Descriptions.Item>

                    <Descriptions.Item label="Старая родительская категория" span ={1}>
                    {response.old_category_parent_id !== 0 ? <Link to={`/crowler/categories/${response.old_category_parent_id}/`}>
                        {response.old_category_parent_id}
                        </Link> : 'Не имеет'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Новая родительская категория" span ={2}>
                        {response.new_category_parent_id !== response.old_category_parent_id ? 
                        <Alert message={response.new_category_parent_id !== 0 ? <Link to={`/crowler/categories/${response.new_category_parent_id}/`}>
                        {response.new_category_parent_id}
                        </Link> : 'Не имеет'} type='error'></Alert> : response.new_category_parent_id}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}

export default CategoryChangesView;