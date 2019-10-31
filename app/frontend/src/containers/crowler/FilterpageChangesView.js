import React from 'react';
import axios from 'axios';
import { Descriptions, Alert, Breadcrumb, Menu, Icon, BackTop } from 'antd';
import { Link } from 'react-router-dom';
import backendURL from '../../consts'


const token = localStorage.getItem('token');
if (token != null) {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: 'Token ' + token}
    }
const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/crowler/changes/categories/'>Категории</Link>   
      </Menu.Item>
      <Menu.Item>
        <Link to='/crowler/changes/filter-pages/'>ПФС</Link>
      </Menu.Item>
    </Menu>)

class FilterpageChangesView extends React.Component {
    state = {
        data: {}
    }
    componentDidUpdate (prevProps) {
        if (this.props.match.params.categoryID !== prevProps.match.params.categoryID) {
        const filterpageID = this.props.match.params.filterpageID; 
        axios.get(`${backendURL}/crowler/changes/filterpage/${filterpageID}/`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
    }
    componentDidMount() {
        const filterpageID = this.props.match.params.filterpageID; 
        axios.get(`${backendURL}/crowler/changes/filterpage/${filterpageID}/`)
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
                    <Link to='/crowler/changes/filter-pages/'>Изменения</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{response.filterpage_id}</Breadcrumb.Item>
                </Breadcrumb>
                <Descriptions title={response.filterpage_id} bordered layout='vertical'>
                    <Descriptions.Item className="selectable" label="Дата и время проверки"span={1}>
                        {response.filterpage_data_changed ? response.filterpage_data_changed.replace('T', ' ') : ''}
                    </Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Поля изменены" span ={2}>{response.changed_fields}</Descriptions.Item>

                    <Descriptions.Item label="Старое название"span={1}>
                        {response.old_filterpage_name}
                    </Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новое название"span={2}>
                        {response.new_filterpage_name !== response.old_filterpage_name ? 
                        <Alert message={response.new_filterpage_name} type='error'></Alert> : 
                        response.new_filterpage_name}
                    </Descriptions.Item>

                    
                    <Descriptions.Item className="selectable" label="Старое 'ПФС активна'" span={1}>{response.old_filterpage_is_active === 1 ? 'Да' : 'Нет'}</Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новое 'ПФС активна'" span={2}>
                        {response.new_filterpage_is_active !== response.old_filterpage_is_active ? 
                        <Alert message={response.new_filterpage_is_active === 1 ? 'Да' : 'Нет'} type='error'></Alert> : 
                        response.new_filterpage_is_active === 1 ? 'Да' : 'Нет'}
                    </Descriptions.Item>
                    
                    <Descriptions.Item className="selectable" label="Старая причина отключения"span={1}>
                        {response.old_filterpage_disabling_reason !== undefined ? response.old_filterpage_disabling_reason :
                        'Отсутствует'}
                        </Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новая причина отключения"span={2}>
                        {response.new_filterpage_url !== undefined ?
                            response.new_filterpage_disabling_reason !== response.old_filterpage_disabling_reason ? 
                            <Alert message={response.new_filterpage_disabling_reason} type='error'></Alert> : 
                            response.new_filterpage_disabling_reason :
                        'Отсутствует'}
                    </Descriptions.Item>

                    <Descriptions.Item className="selectable" label="Старое 'Выводится под листингом'"span={1}>
                        {response.old_filterpage_is_top === true ? 'Да' : 'Нет'}
                    </Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новое 'Выводится под листингом'"span={2}>
                        {response.new_filterpage_is_top !== response.old_filterpage_is_top ? 
                        <Alert message={response.new_filterpage_is_top === true ? 'Да' : 'Нет'} type='error'></Alert> : 
                        response.new_filterpage_is_top === true ? 'Да' : 'Нет'}
                    </Descriptions.Item>

                    <Descriptions.Item className="selectable" label="Старый URL" span={1}>
                        {response.old_filterpage_url !== undefined ? 
                        <a href={`https://sima-land.ru/${response.old_filterpage_url}/` } rel="noopener noreferrer" target='_blank'>
                        {response.old_filterpage_url}
                        </a>
                        :
                        'Отсутствует'}
                    </Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новый URL" span={2}>
                        {response.new_filterpage_url !== undefined ?
                        <a href={`https://sima-land.ru/${response.new_filterpage_url}/` } rel="noopener noreferrer" target='_blank'>
                            {response.new_filterpage_url !== response.old_filterpage_url ? 
                            <Alert message={response.new_filterpage_url} type='error'></Alert> : 
                            response.new_filterpage_url}
                        </a>
                        :
                        'Удалён'}
                    </Descriptions.Item>

                    <Descriptions.Item className="selectable" label="Старый Full_name" span={1}>
                        {response.old_filterpage_full_name}
                    </Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новый Full_name" span={2}>
                        {response.new_filterpage_full_name !== response.old_filterpage_full_name ? 
                        <Alert message={response.new_filterpage_full_name} type='error'></Alert> : 
                        response.new_filterpage_full_name}
                    </Descriptions.Item>

                    <Descriptions.Item className="selectable" label="Старый Title" span={1}>{response.old_filterpage_title}</Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новый Title" span={2}>
                        {response.new_filterpage_title !== response.old_filterpage_title ? 
                        <Alert message={response.new_filterpage_title} type='error'></Alert> : 
                        response.new_filterpage_title}
                    </Descriptions.Item>

                    <Descriptions.Item className="selectable" label="Старый Description" span={1}>{response.old_filterpage_description}</Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новый Description" span={2}>
                        {response.new_filterpage_description !== response.old_filterpage_description ? 
                        <Alert message={response.new_filterpage_description} type='error'></Alert> : 
                        response.new_filterpage_description}
                    </Descriptions.Item>

                    <Descriptions.Item className="selectable" label="Старый SEO текст" span={3}>{response.old_filterpage_text}</Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новый SEO текст" span={3}>
                        {response.new_filterpage_text !== response.old_filterpage_text ? 
                        <Alert message={response.new_filterpage_text} type='error'></Alert> : 
                        response.new_filterpage_text}
                    </Descriptions.Item>

                    <Descriptions.Item className="selectable" label="Старый Canonical URL" span ={1}>
                        {<a href={`https://sima-land.ru/${response.old_filterpage_canonical_url}/` } rel="noopener noreferrer" target='_blank'>
                            {response.old_filterpage_canonical_url}
                        </a>}
                    </Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новый Canonical URL" span ={2}>
                        {<a href={`https://sima-land.ru/${response.new_filterpage_canonical_url}/` } rel="noopener noreferrer" target='_blank'>
                            {response.new_filterpage_canonical_url !== response.old_filterpage_canonical_url ? 
                            <Alert message={response.new_filterpage_canonical_url} type='error'></Alert> : response.new_filterpage_canonical_url}
                        </a>}
                    </Descriptions.Item>

                    <Descriptions.Item className="selectable" label="Старое 'Впервые появилась'" span ={1}>
                        {response.old_filterpage_created_at}
                    </Descriptions.Item>
                    <Descriptions.Item className="selectable" label="Новое 'Впервые появилась'" span ={2}>
                        {response.new_filterpage_created_at !== response.old_filterpage_created_at ? 
                        <Alert message={response.new_filterpage_created_at} type='error'></Alert> : response.new_filterpage_created_at}
                    </Descriptions.Item>
                </Descriptions>
            </div>
            :
            <div>Только для авторизованных пользователей</div>
            }
            </div>
        )
    }
}

export default FilterpageChangesView;