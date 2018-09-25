import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Profile from './pages/Profile';
import Login from './pages/UserSignup';
import signUp from './pages/UserSignup';
import dietSearch from './pages/DietSearchContainer';
import Home from './pages/home';
export default () => {
 return (
   <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/login' component={Login}/>
      <Route path='/sign-up' component={signUp}/>
      <Route path='/nutrition-center' component={dietSearch} />
      <Route  path='/assessment' component={App}/>
    </Switch>
   </BrowserRouter>
 )
}