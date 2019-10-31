import React from 'react';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux'
import { Steps, Icon } from 'antd';

const { Step } = Steps;
class VerificationSent extends React.Component {


    render() {
        return (
            <div>
            {this.props.logout}

            <Steps style={{width: '70%', marginLeft: '10%'}}>
                <Step status="finish" title="Регистрация" description="
                Вы успешно предоставили данные и прошли регистрацию." icon={<Icon type="user" />} />
                <Step status="progress" title="Активация аккаунта" description="
                Теперь пользователь из группы admin должен активировать ваш аккаунт в своём личном кабинете" icon={<Icon type="loading" />} />
                <Step status="wait" title="Успех!" description="
                После активации, вы станете полноправным пользователем и сможете осуществить вход." icon={<Icon type="smile" />} />
            </Steps>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        success: state.authReducer.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)), 
        logout: () => dispatch(actions.authLogout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationSent);