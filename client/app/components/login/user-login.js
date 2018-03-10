import React, { Component } from 'react';
import Header from '../headers/header';
import Navigation from '../navigations/navigation';
import Container from '../containers/container';
import './user-login.css'

export default class Login extends Component {
    constructor(props){
		super(props);
		this.state = {
            userName: null,
        };
    }
	render(){        
		return(
            <div>
                <Navigation />
                <div className='log-in-container'>
                    <form action="/api/login" method="post">
                    <input type="text" placeholder="Enter Email" name="email" required />
                    <input type="password" placeholder="Enter Password" name="psw" required />
                    <button className="sign-up-button">Sign In</button> 
                    </form>
                </div>
            </div>
        ) 
	}
}
