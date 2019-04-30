import React, {Component} from 'react';
import Drawer from 'react-motion-drawer';
import { Button, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, ListGroup, ListGroupItem } from 'reactstrap'
// import './navigation.css';
import Link from 'next/link';
import { AlignJustify } from 'react-feather';


export default class Navigation extends Component{
    state = {
            loggedIn: false,
            userName: null,
            noTouchOpen: false,
            noTouchClose: false,
            openRight: false,
            isLoading: true,
        }
        
    logout(e) {
        e.preventDefault();
        localStorage.clear('user')
        window.location = "/";
    }

    toggleDropdown() {
        this.setState({ 
            showMenu: !this.state.showMenu
        });
    }

    componentDidMount() {
        console.log('mounted!!')
        // this.setState({
        //     userName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
        // })
		// if (localStorage.getItem('user') !== null) {
		// 		this.setState({
        //             loggedIn: true,
        //             isLoading: false
        //         })
        // } else {
        //     this.setState({
        //         loggedIn: true,
        //         isLoading: false
        //     })
        // } 
        this.setState({ openRight: false })
    }       
	render(){
        const {
            openRight,
            noTouchOpen,
            noTouchClose,
            isLoading
          } = this.state;
          const { loggedIn, loading } = this.props;
        // if (loading) return <nav className='nav-main' style={{ minHeight: '55px', backgroundColor: 'black'}}>LOOOOOAAAAD</nav>
        if (loading) return null;
            return(
                <div>
                    <Drawer 
                        fadeOut
                        open={openRight}
                        onChange={open => {
                            this.setState({ openRight: open })}
                        }
                        // noTouchOpen={noTouchOpen}
                        // noTouchClose={noTouchClose}
                        drawerStyle={{ backgroundColor: 'white'}}
                    >
                         <ListGroup className='w-100'>
                            <ListGroupItem><Link href={{pathname: '/'}}><a onClick={() => this.setState({ openRight: false })} className='w-100 rounded-0 text-dark font-weight-bold'>Dashboard</a></Link></ListGroupItem>
                            <ListGroupItem><Link href={{pathname: '/profile'}}><a onClick={() => this.setState({ openRight: false })} className='w-100 rounded-0 text-dark font-weight-bold'>Profile</a></Link></ListGroupItem>
                            <ListGroupItem><Link href={{pathname: '/fitness-assessment'}}><a onClick={() => this.setState({ openRight: false })} className='w-100 rounded-0 text-dark font-weight-bold'>Fitness Assessment</a></Link></ListGroupItem>
                            <ListGroupItem><Link href={{pathname: '/food-search'}}><a onClick={() => this.setState({ openRight: false })} className='w-100 rounded-0 text-dark font-weight-bold'>Food Search</a></Link></ListGroupItem>
                            <ListGroupItem><Link href={{pathname: '/my-nutrition'}}><a onClick={() => this.setState({ openRight: false })} className='w-100 rounded-0 text-dark font-weight-bold'>My Nutrition</a></Link></ListGroupItem>
                            {loggedIn ? <ListGroupItem onClick={(e) => this.logout(e)} className='w-100 rounded-0 text-dark font-weight-bold'>Log Out</ListGroupItem> : <ListGroupItem><Link href={{pathname: '/login'}}><a onClick={() => this.setState({ openRight: false })} className='w-100 rounded-0 text-dark font-weight-bold'>Log In</a></Link></ListGroupItem>}
                        </ListGroup>
                        </Drawer>
                    <nav className='nav-main'>
                        <div className='d-flex align-items-center'>
                            <Link href={{pathname: '/'}}><a className="logo btn btn-lg rounded-0 text-white nav-item">Let's Get Fit</a></Link>
                            <Link href={{pathname: '/profile'}}><a className='d-none d-sm-flex nav-item btn btn-lg rounded-0 text-white'>Profile</a></Link>
                            <UncontrolledButtonDropdown className='dropdown-container d-none d-sm-flex'>
                                <DropdownToggle className='dropdown-button btn-lg border-0 rounded-0' caret>
                                    Nutrition Center
                                </DropdownToggle>
                                <DropdownMenu className='p-0 w-100'>
                                    <DropdownItem className='p-0'>
                                        <Link href={{pathname: '/my-nutrition'}}><a className='text-white btn w-100 btn-lg rounded-0'>My Nutrition</a></Link>
                                    </DropdownItem>
                                    <DropdownItem className='p-0'>
                                        <Link href={{pathname: '/food-search'}}><a className='text-white btn w-100 btn-lg rounded-0'>Food Search</a></Link>
                                    </DropdownItem>
                                    <DropdownItem className='p-0'>
                                        <Link href={{pathname: '/fitness-assessment'}}><a className='text-white btn w-100 btn-lg rounded-0'>Fitness Assessment</a></Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>                            
                            {loggedIn ? <Button onClick={(e) => this.logout(e)} className='d-none d-sm-flex login ml-auto btn-lg border-0 rounded-0'>Logout</Button> : <Link href={{ pathname: '/login'}} href="./login"><a className='text-white btn btn-lg rounded-0 nav-item'>Login</a></Link>}
                                <div className='w-100 d-flex justify-content-end'>
                                    <a
                                        style={{ padding: 15 }}
                                        className="d-sm-none hamburger-menu btn"
                                        onClick={() =>
                                        this.setState({ openRight: !openRight})}
                                    >
                                        <AlignJustify color='white'/>
                                    </a>
                                </div>
                    </div>
                    </nav>
                    <style jsx>{`
                    .hamburger-menu {
                        cursor: pointer;
                    }
                        .logo {
                            white-space: nowrap;
                        }
                        nav, nav :global(.list-group-item, .btn-lg) {
                            background-color: #454545;
                        }
                        div :global(.dropdown-item) {
                            white-space: normal;
                        }
                        .dropdown-list {
                            height: 70px;
                            padding: 1.1em;
                            background-color: #454545;
                            cursor: pointer;
                            color: white;
                            text-decoration: none;
                            text-align: center;
                          }
                          .dropdown-list:hover, .nav-item:hover, div :global(.dropdown-item a:hover) {
                            background-color: #5a6268 !important;
                            text-decoration: none;
                            color: white;
                          }
                          .icon {
                            width: 45%;
                            height: 5px;
                            background-color: white;
                            margin: 6px auto;
                          }
                    `}</style>
                </div>
            ) 
		// return(
        //     <div>
        //         <nav className='nav-main'>
        //             <div><Link href={{ pathname: '/'}}><a className="logo">Lets Get Fit!</a></Link></div>
        //                 <Link href={{ pathname: '/fitness-assessment'}}><a className='nav-item'>Fitness Assessment</a></Link>
        //                 <Link href={{ pathname: '/food-search'}}><a className='nav-item'>Food Search</a></Link>
        //                 <Link href={{ pathname: '/login'}} href="./login"><a className='login'>Login</a></Link>
        //                 <Link href={{ pathname: '/sign-up'}}><a className='login'>Sign Up</a></Link>     
        //                 <ul className='dropdown-ul'>
        //                     <li ><a  onClick={(e) => this.showDropdownMenu(e)} href="#" className='dropdown-list'>Menu</a>
        //                     { 
        //                         this.state.showMenu ? 
        //                         (
        //                             <div className="nav-sub">
        //                                 <ul>
        //                                     <Link href={{ pathname: '/fitness-assessment'}}><a className='dropdown-link'>Fitness Assessment</a></Link>
        //                                     <Link href={{ pathname: '/nutrition-center'}}><a className='dropdown-link'>Nutrition Center</a></Link>
        //                                     <Link href={{ pathname: '/login'}} href="./login"><a className='dropdown-link'>Login</a></Link>
        //                                     <Link href={{ pathname: '/sign-up'}}><a className='dropdown-link'>Sign Up</a></Link> 
        //                                 </ul>
        //                             </div>
        //                         ) : ( null )
        //                     }
        //                     </li>
        //                 </ul>
        //         </nav>
        //     </div>
        // ) 
	}
}
