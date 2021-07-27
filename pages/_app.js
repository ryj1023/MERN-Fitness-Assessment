import React from 'react';
import App, {Container} from 'next/app';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import Layout from '../client/app/layouts/default'
import { Provider } from 'react-redux';
import ConfigureStore from '../client/app/store'

const linkStyle = {
  margin: '0 10px 0 0'
}

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const store = ConfigureStore()

export default class MyApp extends App {
  render () {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component store={store} {...pageProps} />
          </Layout>
          </Provider>
      </Container>
    )
  }
}