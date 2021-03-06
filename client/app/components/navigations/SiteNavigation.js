import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import './navigation.css';
import { Link } from 'react-router-dom';

export default class Navigation extends Component{
    constructor(props){
		super(props);
		this.state = {
            loggedIn: false,
            showMenu: false,
            userName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
        }
        
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    logout(e) {
        e.preventDefault();
        localStorage.clear('user')
        window.location = "/";
    }

    closeMenu() {
        this.setState({ 
            showMenu: false 
        }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    showDropdownMenu(e) {
        e.preventDefault();
        this.setState({
            showMenu: true
        } , () => {
            document.addEventListener('click', this.closeMenu);
        })
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
                        <div> <Link to='/' className="logo">Let's Get Fit </Link></div>
                            <Link to='./profile' className='nav-item'>Profile</Link>
                            <Link to='./assessment' className='nav-item'>Fitness Assessment</Link>
                            <Link to='./nutrition-center' className='nav-item'>Nutrition Center</Link>
                            <Link to='/' onClick={(e) => this.logout(e)}className='login'>Logout</Link>
                            <Link className='login' to='./profile'>{this.state.userName}</Link>
                                <ul className='dropdown-ul'>
                                    <li><a onClick={(e) => this.showDropdownMenu(e)} href="#" className='dropdown-list'>Menu</a>
                                    {
                                        this.state.showMenu ? 
                                (
                                        <div className="nav-sub">
                                            <ul>
                                                <Link className='dropdown-link' to='./profile'>Profile</Link>
                                                <Link className='dropdown-link' to='./assessment'>Fitness Assessment</Link>
                                                <Link className='dropdown-link' to='./food-search'>Food Search</Link>
                                                <Link className='dropdown-link' to='/' onClick={(e) => this.logout(e)}>Logout</Link>
                                            </ul>
                                        </div>
                                ) : ( null )
                                    }
                                    </li>
                                </ul>
                    </nav>
                </div>
            ) 
        } 
		return(
            <div>
                <nav className='nav-main'>
                    <div><Link to='/' className="logo">Lets Get Fit </Link></div>
                        <Link to='./assessment' className='nav-item'>Fitness Assessment</Link>
                        <Link className='dropdown-link' className='nav-item' to='./food-search'>Food Search</Link>
                        <Link to='./login' href="./login" className='login'>Login</Link>
                        <Link to='./sign-up' href="./sign-up" className='login'>Sign Up</Link>     
                        <ul className='dropdown-ul'>
                            <li ><a  onClick={(e) => this.showDropdownMenu(e)} href="#" className='dropdown-list'>Menu</a>
                            { 
                                this.state.showMenu ? 
                                (
                                    <div className="nav-sub">
                                        <ul>
                                            <Link className='dropdown-link' to='./assessment'>Fitness Assessment</Link>
                                            <Link className='dropdown-link' to='./food-search'>Food Search</Link>
                                            <Link className='dropdown-link' to='./login' href="./login">Login</Link>
                                            <Link className='dropdown-link' to='./sign-up' href="./sign-up">Sign Up</Link> 
                                        </ul>
                                    </div>
                                ) : ( null )
                            }
                            </li>
                        </ul>
                </nav>
            </div>
        ) 
	}
}
