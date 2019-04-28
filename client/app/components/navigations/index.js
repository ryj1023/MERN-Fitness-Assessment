import React, {Component} from 'react';
import Drawer from 'react-motion-drawer';
import { Button, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
// import './navigation.css';
import Link from 'next/link';
import { AlignJustify } from 'react-feather';


export default class Navigation extends Component{
    state = {
            loggedIn: false,
            showMenu: false,
            //userName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
            userName: null,
            width: 300,
            noTouchOpen: false,
            noTouchClose: false,
            openRight: false,
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
        const {
            openRight,
            noTouchOpen,
            noTouchClose,
          } = this.state;
            return(
                <div>
                       <Drawer 
                        onChange={() => {}}
                        fadeOut
                        open={openRight}
                        onChange={open => this.setState({ openRight: open })}
                        noTouchOpen={noTouchOpen}
                        noTouchClose={noTouchClose}
                       >
                           <div style={{ width: "100%" }}>
                                <h3>Navigation</h3>
                            </div>
                            <div style={{ padding: "2em" }}>
                                <h3>Navigation</h3>
                            </div>
                        </Drawer>
                    <nav className='nav-main'>
                        {
                            this.state.loggedIn ?
                                (
                                    <div className='d-flex align-items-center'>
                                        <Link href={{pathname: '/'}}><a className="logo btn btn-lg rounded-0 text-white">Let's Get Fit</a></Link>
                                        <Link href={{pathname: '/profile'}}><a className='d-none d-sm-flex nav-item btn btn-lg rounded-0 text-white'>Profile</a></Link>
                                        {/* <Link href={{pathname: '/fitness-assessment'}}><a className='d-none d-sm-flex nav-item btn btn-lg rounded-0'>Fitness Assessment</a></Link> */}
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
                                        <Button onClick={(e) => this.logout(e)} className='d-none d-sm-flex login ml-auto btn-lg border-0 rounded-0'>Logout</Button>                            
                                            <ul className='dropdown-ul d-md-none ml-auto'>
                                                <li className='list-group-item border-0'>
                                                    <a onClick={() => this.toggleDropdown()} href="#" className='dropdown-list'>
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
                                                            <Link href={{pathname: '/my-nutrition'}}><a className='dropdown-link'>My Nutrition</a></Link>
                                                            <Link href={{pathname: '/food-search'}}><a className='dropdown-link'>Food Search</a></Link>
                                                            <Link href='/' onClick={(e) => this.logout(e)}><a className='dropdown-link'>Logout</a></Link>
                                                        </ul>
                                                    </div>
                                            ) : ( null )
                                                }
                                                </li>
                                            </ul>
                                            <a
                                                style={{ padding: 15 }}
                                                className=""
                                                onClick={() =>
                                                this.setState({ openRight: !openRight})}
                                            >
                                               <AlignJustify/>
                                            </a>
                                     {/* <UncontrolledButtonDropdown className='d-md-none ml-auto'>
                                            <DropdownToggle className='dropdown-button btn-lg border-0 rounded-0'>
                                                <div className='icon'></div>
                                                <div className='icon'></div>
                                                <div className='icon'></div>
                                            </DropdownToggle>
                                            <DropdownMenu className='p-0 w-100'>
                                                <DropdownItem className='p-0'>
                                                    <Link href={{pathname: '/my-nutrition'}}><a className='text-white btn w-100 btn-lg rounded-0'>My Nutrition</a></Link>
                                                </DropdownItem>
                                                <DropdownItem className='p-0'>
                                                    <Link href={{pathname: '/food-search'}}><a className='text-white btn w-100 btn-lg rounded-0'>Food Search</a></Link>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>  */}
                                </div>
                            )
                            :
                            (
                                <div className='d-flex p-2'>
                                    <Link href={{ pathname: '/'}}><a className="logo">Lets Get Fit!</a></Link>
                                    <Link href={{ pathname: '/fitness-assessment'}}><a className='nav-item'>Fitness Assessment</a></Link>
                                    <Link href={{ pathname: '/food-search'}}><a className='nav-item'>Food Search</a></Link>
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
                                </div>
                            )
                        } 
                    </nav>
                    <style jsx>{`
                        nav, nav :global(.list-group-item, .btn-lg) {
                            background-color: #454545 !important;
                        }
                        div :global(.dropdown-item) {
                            white-space: normal;
                        }
                        {/*.dropdown-list {
                            height: 70px;
                            padding: 1.1em;
                            background-color: #454545;
                            cursor: pointer;
                            color: white;
                            text-decoration: none;
                            text-align: center;
                          }
                          .dropdown-list:hover {
                            background-color: #9a9a9a;
                            text-decoration: none;
                            color: white;
                          } */}
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
