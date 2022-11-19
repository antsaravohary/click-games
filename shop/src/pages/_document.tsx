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

          <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>

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
              gtag('event', 'conversion', {'send_to': 'AW-575028874/D1cLCK3uw-gBEIr9mJIC'});
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `!function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
          )ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              
                ttq.load('CDBRVDBC77UCTPU5S0U0');
                ttq.page();
              }(window, document, 'ttq');`,
            }}
          />
       
        </Head>
        <body dir={dir}>
          <Main />
          <div className="trustpilot-widget" data-locale="fr-FR" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="63435434006f1a7199ce4a94" data-style-height="24px" data-style-width="100%" data-theme="light" data-min-review-count="10" data-style-alignment="center">
            <a href="https://fr.trustpilot.com/review/www.click-games.fr" target="_blank" rel="noopener">Trustpilot</a>
          </div>
          <script data-host="https://analytics.click-games.fr" data-dnt="false" src="https://analytics.click-games.fr/js/script.js" id="ZwSg9rf6GA" async defer></script>
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
