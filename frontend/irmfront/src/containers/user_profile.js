import React, { Component } from 'react';
import * as actions from '../store/actions/auth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon, Popconfirm } from 'antd';


class UserProfile extends React.Component {
    render() {
        return(
            <div></div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user_name: state.user_name,
        user_email: state.user_email,
        user_error: state.user_error
    }
}