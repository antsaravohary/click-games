import React from 'react';
import Head from 'next/head';
import { useSettings } from '@contexts/settings.context';

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string;
  css?: string;
  js?: string;
  image?: string;
};

export const SEO: React.FC<SeoProps> = ({
  title,
  description = "Click Games | E-commerce spécialiste du jeux vidéos  | Choisissez votre univers | Des nombreuses promotions jusqu’à -70% | Livraison gratuite à partir de 35€ | Click sur ton Univers.",
  canonical,
  css,
  js,
  image = "https://api.click-games.com/storage/96/60847fa03096e252162228.png",
}) => {
  const settings = useSettings();  
  return (
    <Head>
      <title>{settings?.siteTitle ?? "Click GAMES"}</title>
      <meta name="description" content={`%s | ${settings?.seo?.metaTitle ?? "E-Commerce"}`} />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <meta name="google-site-verification" content="GmRBmFDag8po0_SqBMt-kxbmjspnodXCo0P15SgE5Z8" />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={settings?.siteTitle ?? "Click GAMES"+"| " + title} />
      <meta
        name="og:description"
        property="og:description"
        content={settings?.seo?.metaDescription??description}
      />
      <meta property="og:site_name" content="Click Game" />
      <meta property="og:url" content={`${canonical}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={"Click Games | " + title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@propernounco" />
      <meta name="twitter:creator" content="@propernounco" />
      {css && <link rel="stylesheet" href={`${css}`} />}
      {image ? (
        <meta property="og:image" content={`${image}`} />
      ) : (
        <meta
          property="og:image"
          content="https://www.propernoun.co/static/images/proper-noun-social.png"
        />
      )}
      {image && <meta name="twitter:image" content={`${image}`} />}
      {canonical && <link rel="canonical" href={`${canonical}`} />}
      {js && <script type="text/javascript" src={`${js}`}></script>}
    </Head>
  );
}
