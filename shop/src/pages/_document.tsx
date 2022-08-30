import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
require("dayjs/locale/fr");
export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";
    if (process.env.NODE_ENV !== "production") {
      i18n!.reloadResources("locale");
    }
    return (
      <Html>
        <Head>
        {/** <link href="https://checkout.moneytigo.com/dist/css/app.css" rel="stylesheet"/> */} 
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              var callback = fonction () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  « send_to »: « AW-575028874/D1cLCK3uw-gBEIr9mJIC»,
                  « event_callback »: rappel
              });
              renvoyer false;
            }
          `,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              gtag('event', 'conversion', {'send_to': 'AW-575028874/D1cLCK3uw-gBEIr9mJIC'});
          `,
              }}
            />
        </Head>
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>

        {/** 
        <script
          type="text/javascript"
          src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"
        ></script>

        <script
          type="text/javascript"
          src="//unpkg.com/leaflet/dist/leaflet.js"
        ></script>
        <link
          rel="stylesheet"
          type="text/css"
          href="//unpkg.com/leaflet/dist/leaflet.css"
        />
        <script
          type="text/javascript"
          src="https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js"
        ></script>*/}
      </Html>
    );
  }
}
