import React, {Component} from 'react';
import { Button } from 'reactstrap'
import './navigation.css';
import Link from 'next/link';


export default class Navigation extends Component{
    state = {
            loggedIn: false,
            showMenu: false,
            //userName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
            userName: null
        }
        
        componentDidMount() {
            this.setState({
                userName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
            })
        }

    logout(e) {
        e.preventDefault();
        console.log('cleared')
        localStorage.clear('user')
        window.location = "/";
    }

    toggleDropdown() {
        this.setState({ 
            showMenu: !this.state.showMenu
        });
    }

    componentDidMount() {
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
                        <div> <Link href={{pathname: '/'}}><a className="logo">Let's Get Fit</a></Link></div>
                            <Link href={{pathname: '/profile'}}><a className='nav-item'>Profile</a></Link>
                            <Link href={{pathname: '/fitness-assessment'}}><a className='nav-item'>Fitness Assessment</a></Link>
                            <Link href={{pathname: '/nutrition-center'}}><a className='nav-item'>Nutrition Center</a></Link>
                            <Button onClick={(e) => this.logout(e)} className='login'>Logout</Button>
                            {/* <Link href={{pathname: 'profile'}}><a className='login'>{this.state.userName}</a></Link> */}
                                <ul className='dropdown-ul'>
                                    {/* <li><a onClick={(e) => this.showDropdownMenu(e)} href="#" className='dropdown-list'>Menu</a> */}
                                    <li><a onClick={() => this.toggleDropdown()} href="#" className='dropdown-list'>
                                            <div className='icon'></div>
                                            <div className='icon'></div>
                                            <div className='icon'></div>
                                        </a>
                                    {
                                        this.state.showMenu ? 
                                (
                                        <div className="nav-sub" onClick={() => this.toggleDropdown()}>
                                            <ul>
                                                <Link href={{ pathname: '/profile'}}><a className='dropdown-link'>Profile</a></Link>
                                                <Link href={{pathname: '/fitness-assessment'}}><a className='dropdown-link'>Fitness Assessment</a></Link>
                                                <Link href={{pathname: '/nutrition-center'}}><a className='dropdown-link'>Food Search</a></Link>
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
                    <div><Link href={{ pathname: '/'}}><a className="logo">Lets Get Fit!</a></Link></div>
                        <Link href={{ pathname: '/fitness-assessment'}}><a className='nav-item'>Fitness Assessment</a></Link>
                        <Link href={{ pathname: '/nutrition-center'}}><a className='nav-item'>Nutrition Center</a></Link>
                        <Link href={{ pathname: '/login'}} href="./login"><a className='login'>Login</a></Link>
                        <Link href={{ pathname: '/sign-up'}}><a className='login'>Sign Up</a></Link>     
                        <ul className='dropdown-ul'>
                            <li ><a  onClick={(e) => this.showDropdownMenu(e)} href="#" className='dropdown-list'>Menu</a>
                            { 
                                this.state.showMenu ? 
                                (
                                    <div className="nav-sub">
                                        <ul>
                                            <Link href={{ pathname: '/fitness-assessment'}}><a className='dropdown-link'>Fitness Assessment</a></Link>
                                            <Link href={{ pathname: '/nutrition-center'}}><a className='dropdown-link'>Nutrition Center</a></Link>
                                            <Link href={{ pathname: '/login'}} href="./login"><a className='dropdown-link'>Login</a></Link>
                                            <Link href={{ pathname: '/sign-up'}}><a className='dropdown-link'>Sign Up</a></Link> 
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
