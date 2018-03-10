import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './App';
import Profile from './components/user-profile/profile';
import Login from './components/login/user-login';
import signUp from './components/sign-up/user-sign-up';
export default () => {
 return (
   <BrowserRouter>
   <Switch>
   <Route exact path='/' component={App}/>
   <Route path='/profile' component={Profile}/>
   <Route path='/login' component={Login}/>
   <Route path='/sign-up' component={signUp}/>
   </Switch>
   </BrowserRouter>
 )
}