import React, {Component} from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';

export default class Navigation extends Component{
	render(){
		return(
            <div>
                <nav className='nav-main'>
                    <div> <Link to='/' className="logo">Lets Get Fit </Link></div>
                        <ul>
                        <li><Link to='./profile' className='nav-item'>Profile</Link></li>
                        <li><a href="#" className='nav-item'>Foods</a></li>
                        <li><a href="#" className='nav-item'>Workouts</a></li>
                        </ul>
                </nav>
            </div>
        ) 
	}
}