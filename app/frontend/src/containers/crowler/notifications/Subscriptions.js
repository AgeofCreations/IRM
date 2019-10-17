import React from 'react';
import { Button, Select, Alert } from 'antd'
import axios from 'axios'
const DataUrl = `http://0.0.0.0:8000/crowler/notify/subscriptions/`;
const CategoriesUrl = `http://0.0.0.0:8000/crowler/notify/categories/`;


class NotificationSubsciptions extends React.Component {
    state = {
        selectedItems: [],
        options: [],
        success: undefined,
        error: undefined,
    };
    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: 'Token ' + token}
        axios.get(CategoriesUrl)
            .then(res => {
                this.setState({
                    options: res.data
                })
            })
        axios.get(DataUrl)
            .then(res => {
                this.setState({
                    selectedItems: res.data
                })
            })
    }

    handleChange = selectedItems => {
        this.setState({ selectedItems });
    };

    updateSubscriptions = selectedItems => {
        const token = localStorage.getItem('token');
        if (token != null) {
            axios.defaults.headers = {
              "Content-Type": "application/json",
              Authorization: 'Token ' + token}
            }
        axios.post(`${DataUrl}update/`, {
            responsibilities: this.state.selectedItems
        })
            .then(res => {
                this.setState({
                    success: res.data
                })
            })
            .catch(error => {
                this.setState({
                    error: error.data
                })
            })
            
    }
    render() {
        const { selectedItems } = this.state;
        const filteredOptions = this.state.options.filter(o => !selectedItems.includes(o));
        let errorMessage = null;
        let successMessage = null;

        if (this.state.error) {
            errorMessage =(
                <Alert style={{marginBottom: '25px'}} message={this.state.error} type="error" />
            );
        }
        if (this.state.success) {
            successMessage =(
                <Alert style={{marginBottom: '25px'}} message={this.state.success} type="success" />
            );
        }
        return (
          <div>
          <div>
          {errorMessage}
          {successMessage}
                <Select
                    mode="multiple"
                    placeholder="Выберите категории для получения уведомлений"
                    value={selectedItems}
                    onChange={this.handleChange}
                    style={{ width: '30%'}}
                >
                    {filteredOptions.map(item => (
                    <Select.Option key={item} value={item}>
                        {item}
                    </Select.Option>
                    ))}
                </Select>
                </div>
            <Button type="primary" style={{'marginLeft': '20%', 'marginTop': '2%'}} onClick={this.updateSubscriptions}>Обновить подписки</Button>
            <div>
                <h1>Управление подписками</h1>
                <p>Этот интерфейс отвечает за то, уведомления об изменениях в каких категориях вы будете получать.</p>
                <p>Вы будете получать уведомления только для тех категорий, которые есть в поле.</p>
                <p>При нажатии на поле, откроется список категорий в транслитерированом виде.</p>
                <p>Для упрощения поиска категории в списке вы можете начать вводить транслитерированное название категории</p>
                <p>Для подтверждения и записи изменений в базу, нажмите кнопку "Обновить подписки".</p>
                <p>Этот список можно изменить в любой момент</p>
                <p>Изменения вступят в силу моментально и вы начнёте получать новые уведомления</p>
                <p>Это не влияет на уже полученные изменения. Только на будущие.</p>
                <p>При нажатии на кнопку "Получить все уведомления по подписанным категориям"(если я её запилю) в ваш список непрочитанного будут добавлены АБСОЛЮТНО ВСЕ уведомления
                по выбранным категориям (не забудьте сначала нажать "Обновить подписки").</p>
                <p>Это может занять ОЧЕНЬ длительное время. В зависимости от того, сделает разработчик очистку старых записей в БД или нет.</p>

            </div>
          </div>
        );
      }
}

export default NotificationSubsciptions;