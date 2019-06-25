import React from 'react'
import { connect } from 'react-redux'
import { emailConfirmationAction } from '../store/actions/auth'
import EmailConfirmationComponent from '../components/email_confirmed_component'

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
        const { dispatch} = this.props
        if (key) {
            dispatch(emailConfirmationAction(key))
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
        confirmation_error: state.confirmation_error
    }
}

export default connect(mapStateToProps)(EmailConfirmationContainer)