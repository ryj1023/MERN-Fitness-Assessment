import Document, { Head, Main, NextScript } from 'next/document'
import Layout from '../client/app/layouts/default'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
        <title>Fitness Assessment</title>
          <style>{`body { background-color: #efefef; height: 90vh} #__next { height: inherit}  /* custom! */`}</style>
        </Head>
        <body>
            <Main className='main' />
            <NextScript />
        </body>
      </html>
    )
  }
}