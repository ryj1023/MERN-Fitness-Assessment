import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import './navigation.css';
import { Link } from 'react-router-dom';

export default class Navigation extends Component{
    constructor(props){
		super(props);
		this.state = {
            loggedIn: false,
		}
    }

    logout(e) {
        e.preventDefault();
        localStorage.clear('user')
        window.location = "/";
    }

    async componentDidMount() {
		if (localStorage.getItem('user')!== null) {
				this.setState({
					loggedIn: true
            })
        }
    }       
	render(){
        if (this.state.loggedIn) {
            return(
                <div>
                    <nav className='nav-main'>
                        <div> <Link to='/' className="logo">Lets Get Fit </Link></div>
                            <ul>
                            <li><Link to='./profile' className='nav-item'>Profile</Link></li>
                            <li><Link to='./assessment' className='nav-item'>Fitness Assessment</Link></li>
                            <li><Link to='./food-search' href="#" className='nav-item'>Food Search</Link></li>
                            </ul>
                            <Link to='/' onClick={(e) => this.logout(e)}className='login'>Logout</Link>
                    </nav>
                </div>
            ) 
        } 
		return(
            <div>
                <nav className='nav-main'>
                    <div> <Link to='/' className="logo">Lets Get Fit </Link></div>
                        <ul>
                        <li><Link to='./assessment' href="#" className='nav-item'>Fitness Assessment</Link></li>
                        <li><Link to='./food-search' href="#" className='nav-item'>Food Search</Link></li>
                        </ul>
                        <Link to='./login' href="./login" className='login'>Login</Link>
                        <Link to='./sign-up' href="./sign-up" className='login'>Sign Up</Link>
                </nav>
            </div>
        ) 
	}
}