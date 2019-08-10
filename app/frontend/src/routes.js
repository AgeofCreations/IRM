import React from 'react';
import { Route } from 'react-router-dom';

import Combinator from './containers/combinator/combinator-infields';
import Login from './containers/auth/Login';
import Signup from './containers/auth/signup';
import Mainpage from './components/mainpage';
import VerificationSent from './containers/auth/email_verification_sent';
import EmailConfirmationContainer from './containers/auth/email_confirmed';
import UserProfile from './containers/auth/user_profile';




const BaseRouter = () => (
    <div>
        <Route exact path='/combinator/' component={Combinator} /> {""}
        <Route exact path='/login/' component={Login} /> {""}
        <Route exact path="/signup/" component={Signup} />{" "}
        <Route exact path='/' component={Mainpage} /> {""}
        <Route exact path='/signup/verification_sent/' component={VerificationSent} /> {""}
        <Route exact path='/signup/confirm-email/' component={EmailConfirmationContainer} /> {""}
        <Route exact path='/profile/' component={UserProfile} /> {""}
    </div>
);


export default BaseRouter;