import React from 'react';
import App, {Container} from 'next/app';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import Layout from '../client/app/layouts/default'

const linkStyle = {
  margin: '0 10px 0 0'
}

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
  render () {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
          </Layout>
      </Container>
    )
  }
}