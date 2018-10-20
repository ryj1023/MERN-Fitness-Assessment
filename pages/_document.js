import Document, { Head, Main, NextScript } from 'next/document'


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
        <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
          <style>{`body { background-color: #efefef; height: 90vh} #__next { height: inherit}, .rc-pagination-prev, .rc-pagination-next { display: inline }  /* custom! */`}</style>
        </Head>
        <body>
            <Main className='main' />
            <NextScript />
        </body>
      </html>
    )
  }
}