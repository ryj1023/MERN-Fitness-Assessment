import React, { Component } from './node_modules/react'
import Drawer from './node_modules/react-motion-drawer'
import {
    Button,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    ListGroup,
    ListGroupItem,
} from './node_modules/reactstrap'
import Link from './node_modules/next/link'
import { AlignJustify } from './node_modules/react-feather'

export default class Navigation extends Component {
    state = {
        loggedIn: false,
        openRight: false,
        isLoading: true,
    }

    logout(e) {
        e.preventDefault()
        localStorage.clear('user')
        window.location = '/'
    }

    componentDidMount() {
        this.setState({ openRight: false })
    }
    render() {
        const { openRight, isLoading } = this.state
        const { loggedIn, loading } = this.props
        if (loading) return null
        return (
            <div>
                <Drawer
                    fadeOut
                    open={openRight}
                    onChange={open => {
                        this.setState({ openRight: open })
                    }}
                    drawerStyle={{ backgroundColor: 'white' }}
                >
                    <div className="w-100 d-flex flex-column side-rail-list">
                        <Link href={{ pathname: '/' }}>
                            <a
                                id="dashboard"
                                onClick={() =>
                                    this.setState({ openRight: false })
                                }
                                className="w-100 rounded-0 text-dark font-weight-bold text-decoration-none p-3"
                            >
                                Dashboard
                            </a>
                        </Link>
                        <Link href={{ pathname: '/assessment' }}>
                            <a
                                onClick={() =>
                                    this.setState({ openRight: false })
                                }
                                className="w-100 rounded-0 text-dark font-weight-bold text-decoration-none p-3 border-top"
                            >
                                Assessment
                            </a>
                        </Link>
                        {/* <Link href={{ pathname: '/food-search' }}>
                            <a
                                onClick={() =>
                                    this.setState({ openRight: false })
                                }
                                className="w-100 rounded-0 text-dark font-weight-bold text-decoration-none p-3 border-top"
                            >
                                Add Foods
                            </a>
                        </Link> */}
                        <Link href={{ pathname: '/my-goals' }}>
                            <a
                                onClick={() =>
                                    this.setState({ openRight: false })
                                }
                                className="w-100 rounded-0 text-dark font-weight-bold text-decoration-none p-3 border-top"
                            >
                                My Goals
                            </a>
                        </Link>
                        {loggedIn ? (
                            <div
                                onClick={e => this.logout(e)}
                                className="text-left w-100 rounded-0 text-dark font-weight-bold p-3 border-top border-bottom"
                            >
                                Log Out
                            </div>
                        ) : (
                            <Link href={{ pathname: '/login' }}>
                                <a
                                    onClick={() =>
                                        this.setState({ openRight: false })
                                    }
                                    className="w-100 rounded-0 text-dark font-weight-bold text-decoration-none p-3 border-top border-bottom"
                                >
                                    Log In
                                </a>
                            </Link>
                        )}
                        {!loggedIn && (
                            <Link href={{ pathname: '/sign-up' }}>
                                <a
                                    onClick={() =>
                                        this.setState({ openRight: false })
                                    }
                                    className="text-left w-100 rounded-0 text-dark text-decoration-none font-weight-bold p-3 border-top border-bottom"
                                >
                                    Sign Up
                                </a>
                            </Link>
                        )}
                    </div>
                </Drawer>
                <nav className="nav-main">
                    <div className="d-flex align-items-center">
                        <Link href={{ pathname: '/' }}>
                            <a className="logo btn btn-lg rounded-0 text-white nav-item">
                                Let's Get Fit
                            </a>
                        </Link>
                        <Link href={{ pathname: '/assessment' }}>
                            <a
                                style={{ whiteSpace: 'nowrap' }}
                                className="d-none d-sm-flex nav-item btn btn-lg rounded-0 text-white"
                            >
                                Assessment
                            </a>
                        </Link>
                        <Link href={{ pathname: '/my-goals' }}>
                            <a
                                style={{ whiteSpace: 'nowrap' }}
                                className="d-none d-sm-flex nav-item btn btn-lg rounded-0 text-white"
                            >
                                My Goals
                            </a>
                        </Link>
                        {/* <UncontrolledButtonDropdown className="dropdown-container d-none d-sm-flex">
                            <DropdownToggle
                                className="dropdown-button btn-lg border-0 rounded-0"
                                caret
                            >
                                Nutrition
                            </DropdownToggle>
                            <DropdownMenu className="p-0 w-100">
                                <DropdownItem className="p-0">
                                    <Link href={{ pathname: '/my-nutrition' }}>
                                        <a className="text-white btn w-100 btn-lg rounded-0">
                                            My Goals
                                        </a>
                                    </Link>
                                </DropdownItem>
                                <DropdownItem className="p-0">
                                    <Link href={{ pathname: '/food-search' }}>
                                        <a className="text-white btn w-100 btn-lg rounded-0">
                                            Add Foods
                                        </a>
                                    </Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown> */}
                        {loggedIn ? (
                            <Button
                                onClick={e => this.logout(e)}
                                className="d-none d-sm-flex login ml-auto btn-lg border-0 rounded-0"
                            >
                                Logout
                            </Button>
                        ) : (
                            <Link href={{ pathname: '/login' }} href="./login">
                                <a className="text-white btn btn-lg rounded-0 nav-item d-sm-flex d-none ml-auto">
                                    Login
                                </a>
                            </Link>
                        )}
                        {!loggedIn && (
                            <Link href={{ pathname: '/sign-up' }}>
                                <a
                                    style={{ whiteSpace: 'nowrap' }}
                                    className="d-none d-sm-flex nav-item btn btn-lg rounded-0 text-white"
                                >
                                    Sign Up
                                </a>
                            </Link>
                        )}
                        <div className="w-100 d-flex justify-content-end">
                            <a
                                className="d-sm-none hamburger-menu btn btn-lg rounded-0"
                                onClick={() =>
                                    this.setState({ openRight: !openRight })
                                }
                            >
                                <AlignJustify color="white" />
                            </a>
                        </div>
                    </div>
                </nav>
                <style jsx>{`
                    .side-rail-list a:hover,
                    .side-rail-list div:hover {
                        background: #f5f5f5;
                        cursor: pointer;
                    }
                    .hamburger-menu {
                        cursor: pointer;
                    }
                    .logo {
                        white-space: nowrap;
                    }
                    nav,
                    nav :global(.list-group-item, .btn-lg) {
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
                    .dropdown-list:hover,
                    .hamburger-menu:hover,
                    .nav-item:hover,
                    div :global(.dropdown-item a:hover) {
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
    }
}
