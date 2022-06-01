import React from 'react';
import Head from 'next/head';

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
  description="Marketplace Français | Achat et vente en ligne parmi des milliers d’articles | Click&Collect et livraison gratuite à partir de 35€ | Click sur ton Univers",
  canonical,
  css,
  js,
  image="http://test.api.click-univers.com/storage/96/60847fa03096e252162228.png",
}) => (
  <Head>
    <title>{"Click Seller | "+title}</title>
    <meta name="description" content={description} />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={"Click Univers | "+title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content="Click Univers" />
    <meta property="og:url" content={`${canonical}`} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={"Click Univers | "+title} />
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
