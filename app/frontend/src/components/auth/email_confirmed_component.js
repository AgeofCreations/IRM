import React from 'react'
import { Spin, Icon, Alert, Steps } from 'antd'
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Step } = Steps;

export default class EmailConfirmationComponent extends React.Component {
    render() {
        return (
            
            this.props.confirmation_await ? 
            <Spin indicator={antIcon} />
        : this.props.confirmation_error ?
        
        <Alert style={{marginBottom: '25px'}} message={'Что-то пошло не так. Попробуйте снова. Если ошибка будет повторяться, свяжитесь с администратором сервиса.'} type="error" /> 
        : this.props.confirmation_success === true && this.props.confirmation_await === false ?
        <div>
        <Steps style={{width: '70%', marginLeft: '10%'}}>
        <Step status="finish" title="Регистрация" description="
        Вы успешно предоставили данные и прошли регистрацию." icon={<Icon type="user" />} />
        <Step status="finish" title="Подтверждение E-Mail" description="
        Вы успешно подтвердили ваш адрес электронной почты." icon={<Icon type="solution" />} />
        <Step status="finish" title="Успех!" description="
        Теперь вы полноправный пользователь и можете осуществлять вход. Также вам будут предоставлены права доступа к необходимым приложениям." icon={<Icon type="smile" />} />
        </Steps>
        </div>
        :
        <div>У вас недостаточно прав доступа.</div>
         ) }
}
