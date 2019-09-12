import React from 'react';
import { Route } from 'react-router-dom';

import Combinator from './containers/combinator/combinator-infields';
import Login from './containers/auth/Login';
import Signup from './containers/auth/signup';
import Mainpage from './components/mainpage';
import VerificationSent from './containers/auth/email_verification_sent';
import EmailConfirmationContainer from './containers/auth/email_confirmed';
import UserProfile from './containers/auth/user_profile';
import CategoryListView from './containers/crowler/CategoryListView';
import FilterpageListView from './containers/crowler/FilterpageListView';
import CategoryRetrieveView from './containers/crowler/CategoryRetrieveView';
import FilterpageRetrieveView from './containers/crowler/FilterpageRetrieveView';
import FilterpageChangesList from './containers/crowler/FilterpageChangesList'
import CategoryChangesList from './containers/crowler/CategoryChangesList'
import FilterpageChangesView from './containers/crowler/FilterpageChangesView'
import CategoryChangesView from './containers/crowler/CategoryChangesView'
import NotifyPopip from './containers/crowler/notifications/NotifyPopup'





const BaseRouter = () => (
    <div>
        <Route exact path='/combinator/' component={Combinator} /> {""}
        <Route exact path='/login/' component={Login} /> {""}
        <Route exact path="/signup/" component={Signup} />{" "}
        <Route exact path='/' component={Mainpage} /> {""}
        <Route exact path='/signup/verification_sent/' component={VerificationSent} /> {""}
        <Route exact path='/signup/confirm-email/' component={EmailConfirmationContainer} /> {""}
        <Route exact path='/profile/' component={UserProfile} /> {""}
        <Route exact path='/crowler/categories/' component = {CategoryListView} /> {""}
        <Route exact path='/crowler/filter-pages/' component = {FilterpageListView} /> {""}
        <Route exact path='/crowler/categories/:categoryID' component = {CategoryRetrieveView} /> {""}
        <Route exact path='/crowler/filter-pages/:filterpageID' component = {FilterpageRetrieveView} /> {""}
        <Route exact path='/crowler/changes/filter-pages/' component = {FilterpageChangesList} /> {""}
        <Route exact path='/crowler/changes/categories/' component = {CategoryChangesList} /> {""}
        <Route exact path='/crowler/changes/filter-pages/:filterpageID' component = {FilterpageChangesView} /> {""}
        <Route exact path='/crowler/changes/categories/:categoryID' component = {CategoryChangesView} /> {""}
        <Route exact path='/notifications/' component = {NotifyPopip} /> {""}


    </div>
);


export default BaseRouter;