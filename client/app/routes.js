import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './App';
import Profile from './pages/user-profile/Profile';
import Login from './pages/login/UserLogin';
import signUp from './pages/sign-up/UserSignup';
import dietSearch from './pages/nutrition-center/DietSearchContainer';
import Home from './pages/home-page/Home';
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