import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/auth'
import EmailConfirmationComponent from '../../components/auth/email_confirmed_component'

class EmailConfirmationContainer extends React.Component {

    componentDidMount() {
        var key = window
        .location
        .search
        .replace('?','')
        .split('&')
        .reduce(
            function(p,e){
                var a = e.split('=');
                p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            
        );
        if (key) {
            this.props.confirm_email(key);
            this.props.logout()
            }
        }
        

    render() {
        return <EmailConfirmationComponent {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        confirmation_await: state.confirmation_await,
        confirmation_success: state.confirmation_success,
        confirmation_error: state.confirmation_error,
        isAuthenticated: state.token !== null,
        auth_sucess: state.success

    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout()),
        confirm_email: (key) => dispatch(actions.emailConfirmationAction(key))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationContainer)