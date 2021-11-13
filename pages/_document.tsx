import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>

        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo-96x96.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
        
      </Html>
    )
  }
}

export default MyDocument