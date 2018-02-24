import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './App';
import Profile from './components/user-profile/profile';
export default () => {
 return (
   <BrowserRouter>
   <Switch>
   <Route exact path='/' component={App}/>
   <Route path='/profile' component={Profile}/>
   </Switch>
   </BrowserRouter>
 )
}