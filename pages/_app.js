import React from 'react'
import App, { Container } from 'next/app'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import Layout from '../client/app/layouts/default'
import { Provider } from 'react-redux'
import ConfigureStore from '../client/app/store'
import 'nprogress/nprogress.css'

const linkStyle = {
    margin: '0 10px 0 0',
}
NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', url => {
    console.log('route change')
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const store = ConfigureStore()

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props

        return (
            <Provider store={store}>
                <Layout>
                    <div>
                        <Component store={store} {...pageProps} />
                        {/* <style jsx>
                                {`
                                    :global(.btn) {
                                        background: #454545;
                                        color: white !important;
                                    }
                                    :global(.btn:hover) {
                                        background: #5a6268;
                                    }
                                `}
                            </style> */}
                    </div>
                </Layout>
            </Provider>
        )
    }
}
