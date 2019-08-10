import React from 'react'
import { notification, Icon, Spin } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NotLoggedIn extends React.Component { 
    loginNotification = () => {
        if (this.props.token === null) {
        notification.error({
            message: 'Вы не авторизованы',
            description:
                'Для просмотра этой страницы вам нужно войти как пользователь с соответствующими правами.',
            style: {
                width: 600,
                marginLeft: 335 - 600,
            },
        });
        this.props.history.push('/login/')
    } else {
        this.props.history.push('/profile/')
    }
    };

    render () {
        return (
            <div>
            <div style={{visibility: 'hidden'}}>{this.loginNotification()}</div>
            <Spin indicator={antIcon} />
            <span>Проверка авторизации</span>
            
            </div>
            )
        }
}

export default NotLoggedIn;