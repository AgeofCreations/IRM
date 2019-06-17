import React from 'react';
import { Route } from 'react-router-dom';

import Combinator from './components/combinator-infields';
import Login from './containers/Login';
import Signup from './containers/signup';
import Mainpage from './components/mainpage';




const BaseRouter = () => (
    <div>
        <Route exact path='/combinator' component={Combinator} /> {""}
        <Route exact path='/login/' component={Login} /> {""}
        <Route exact path="/signup/" component={Signup} />{" "}
        <Route exact path='/' component={Mainpage} /> {""}
    </div>
);


export default BaseRouter;