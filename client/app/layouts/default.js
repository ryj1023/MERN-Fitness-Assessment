import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import NavBar from '../components/Navigations'
import '../../../styles/styles.scss'

const Layout = ({ children }) => {
    const [loggedIn, setLoggedInStatus] = useState(false)
    const [isLoading, setLoadingStatus] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            setLoggedInStatus(true)
            setLoadingStatus(false)
        } else {
            setLoadingStatus(false)
        }
    })
    return (
        <div className="h-100">
            <Head>
                <title>Fitness Assessment</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <NavBar loading={isLoading} loggedIn={loggedIn} />
            {isLoading ? <>loading...</> : children}
        </div>
    )
}

export default Layout
