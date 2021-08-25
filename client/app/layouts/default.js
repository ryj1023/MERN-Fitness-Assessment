import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import NavBar from '../components/navigations'
// import '../../../styles/styles.scss'

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
                    content="initial-scale=1.0, width=device-width, shrink-to-fit=no"
                />
                <link rel="manifest" href="/static/manifest.json" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#212529"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                {/* <meta name="theme-color" content="#ffffff"></meta> */}
            </Head>
            <NavBar loading={isLoading} loggedIn={loggedIn} />
            {isLoading ? <>loading...</> : children}
        </div>
    )
}

export default Layout
