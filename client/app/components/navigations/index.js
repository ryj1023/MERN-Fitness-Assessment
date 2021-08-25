import React, { useState } from 'react'
// import Drawer from 'react-motion-drawer'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap'
import Link from 'next/link'
import { AlignJustify } from 'react-feather'

const Navigation = props => {
    const [isOpen, setIsOpen] = useState(false)

    const { loggedIn } = props
    const toggle = () => setIsOpen(!isOpen)
    const logout = e => {
        e.preventDefault()
        localStorage.clear('user')
        window.location = '/'
    }

    return (
        <div id="nav-wrapper">
            <Navbar className="nav-main p-0 faded" light expand="md">
                <Link href={{ pathname: '/' }}>
                    <a className="logo btn btn-lg rounded-0 text-white nav-item">
                        Let's Get Fit
                    </a>
                </Link>
                <NavbarToggler className="mr-2" onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link href={{ pathname: '/' }}>
                                <a
                                    id="dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="w-100 d-block rounded-0 text-white font-weight-bold text-decoration-none p-3"
                                >
                                    Dashboard
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href={{ pathname: '/assessment' }}>
                                <a
                                    onClick={() => setIsOpen(false)}
                                    className="w-100 d-block rounded-0 text-white font-weight-bold text-decoration-none p-3 "
                                >
                                    Assessment
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href={{ pathname: '/my-goals' }}>
                                <a
                                    onClick={() => setIsOpen(false)}
                                    className="w-100 d-block rounded-0 text-white font-weight-bold text-decoration-none p-3 "
                                >
                                    My Goals
                                </a>
                            </Link>
                        </NavItem>
                        <>
                            {loggedIn ? (
                                <NavItem>
                                    <div
                                        onClick={e => logout(e)}
                                        className="d-block text-left w-100 rounded-0 text-white font-weight-bold p-3 "
                                    >
                                        Log Out
                                    </div>
                                </NavItem>
                            ) : (
                                <NavItem>
                                    <Link href={{ pathname: '/login' }}>
                                        <a
                                            onClick={() => setIsOpen(false)}
                                            className="w-100 d-block rounded-0 text-white font-weight-bold text-decoration-none p-3"
                                        >
                                            Log In
                                        </a>
                                    </Link>
                                </NavItem>
                            )}
                            {!loggedIn && (
                                <NavItem style={{ cursor: 'pointer' }}>
                                    <Link href={{ pathname: '/sign-up' }}>
                                        <a
                                            onClick={() => setIsOpen(false)}
                                            className="d-block text-left w-100 rounded-0 text-white text-decoration-none font-weight-bold p-3"
                                        >
                                            Sign Up
                                        </a>
                                    </Link>
                                </NavItem>
                            )}
                        </>
                    </Nav>
                </Collapse>
            </Navbar>
            <style jsx>{`
                div :global(.navbar-toggler) {
                    background: #f5f5f5;
                }

                div > :gloabl(.nav-main) {
                    background-color: #454545;
                }
                div :global(.nav-item:hover) {
                    cursor: pointer;
                    background-color: #5a6268 !important;
                    text-decoration: none;
                    color: white;
                }
            `}</style>
        </div>
    )
}

export default Navigation
