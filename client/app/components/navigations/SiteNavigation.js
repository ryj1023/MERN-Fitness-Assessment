import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './navigation.css';
import Link from 'next/link';

export default class Navigation extends Component{
    state = {
            loggedIn: false,
            showMenu: false,
            //userName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
            userName: null
        }
        
        // this.showDropdownMenu = this.showDropdownMenu.bind(this);
        // this.closeMenu = this.closeMenu.bind(this);
        componentDidMount() {
            this.setState({
                userName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
            })
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
            document.removeEventListener('click', this.closeMenu.bind(this));
        });
    }

    showDropdownMenu(e) {
        e.preventDefault();
        this.setState({
            showMenu: true
        } , () => {
            document.addEventListener('click', this.closeMenu.bind(this));
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
                        <div> <Link href='/'><a className="logo">Let's Get Fit</a></Link></div>
                            <Link href='./profile'><a className='nav-item'>Profile</a></Link>
                            <Link href='./assessment'><a className='nav-item'>Fitness Assessment</a></Link>
                            <Link href='./nutrition-center'><a className='nav-item'>Nutrition Center</a></Link>
                            <Link href='/' onClick={(e) => this.logout(e)}className='login'>Logout</Link>
                            <Link href='./profile'><a className='login'>{this.state.userName}</a></Link>
                                <ul className='dropdown-ul'>
                                    <li><a onClick={(e) => this.showDropdownMenu(e)} href="#" className='dropdown-list'>Menu</a>
                                    {
                                        this.state.showMenu ? 
                                (
                                        <div className="nav-sub">
                                            <ul>
                                                <Link href='./profile'><a className='dropdown-link'>Profile</a></Link>
                                                <Link href='./assessment'><a className='dropdown-link'>Fitness Assessment</a></Link>
                                                <Link href='./food-search'><a className='dropdown-link'>Food Search</a></Link>
                                                <Link href='/' onClick={(e) => this.logout(e)}><a className='dropdown-link'>Logout</a></Link>
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
                    <div><Link href={{ pathname: '/'}}><a className="logo">Lets Get Fit</a></Link></div>
                        <Link href={{ pathname: './assessment'}}><a className='nav-item'>Fitness Assessment</a></Link>
                        <Link href='./food-search'><a className='nav-item'>Food Search</a></Link>
                        <Link href={{ pathname: './login'}} href="./login"><a className='login'>Login</a></Link>
                        <Link href={{ pathname: './sign-up'}}><a className='login'>Sign Up</a></Link>     
                        <ul className='dropdown-ul'>
                            <li ><a  onClick={(e) => this.showDropdownMenu(e)} href="#" className='dropdown-list'>Menu</a>
                            { 
                                this.state.showMenu ? 
                                (
                                    <div className="nav-sub">
                                        <ul>
                                            <Link href={{ pathname: './assessment'}}><a className='dropdown-link'>Fitness Assessment</a></Link>
                                            <Link href={{ pathname: './food-search'}}><a className='dropdown-link'>Food Search</a></Link>
                                            <Link href={{ pathname: './login'}} href="./login"><a className='dropdown-link'>Login</a></Link>
                                            <Link href={{ pathname: './sign-up'}}><a className='dropdown-link'>Sign Up</a></Link> 
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
