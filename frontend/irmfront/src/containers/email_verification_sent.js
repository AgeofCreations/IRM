import React, { Component } from 'react';
import * as actions from '../store/actions/auth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Steps, Icon } from 'antd';

const { Step } = Steps;
class VerificationSent extends React.Component {
    render() {
        return (
            <Steps size="small" style={{width: '70%', marginLeft: '10%'}}>
                <Step status="finish" title="Регистрация" description="
                Вы успешно предоставили данные и прошли регистрацию." icon={<Icon type="user" />} />
                <Step status="progress" title="Подтверждение E-Mail" description="
                Теперь вам необходимо подтвердить ваш адрес электронной почты. Ссылка для подтверждения выслана на указанный email." icon={<Icon type="loading" />} />
                <Step status="wait" title="Успех!" description="
                Подтвердив адрес электронной почты, вы станете полноправным пользователем и сможете осуществить вход." icon={<Icon type="smile" />} />
            </Steps>
        )
    }
}

export default VerificationSent;