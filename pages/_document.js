import Document, { Html,Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main>
            <link rel="preLoad" href="/fonts/IBMPlexSans-Bold.ttf" as="font" crossOrigin="anonymous"/>
            <link rel="preLoad" href="/fonts/IBMPlexSans-Regular.ttf" as="font" crossOrigin="anonymous"/>
            <link rel="preLoad" href="/fonts/IBMPlexSans-SemiBold.ttf" as="font" crossOrigin="anonymous"/>
          </Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
