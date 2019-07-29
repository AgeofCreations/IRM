import React from 'react'
import { notification } from 'antd';

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
    }
    };
    render () {
        return (
            <div>{setTimeout(this.loginNotification, 1000)}</div>
            )
        }
}

export default NotLoggedIn;