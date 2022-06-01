import { useSettings } from "@contexts/settings.context";
import { DefaultSeo } from "next-seo";

const Seo = () => {
  const settings = useSettings();
  return (
    <DefaultSeo
      //fix IOS input zoom issue
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1 maximum-scale=1",
        },
      ]}
      title={settings?.siteTitle ?? "Click Univers "}
      titleTemplate={`%s | ${settings?.seo?.metaTitle ?? "Marketplace"}`}
      description={settings?.seo?.metaDescription || settings?.siteSubtitle}
      canonical={settings?.seo?.canonicalUrl}
      openGraph={{
        title: settings?.seo?.ogTitle,
        description: settings?.seo?.ogDescription,
        type: "website",
        locale: "fr_FR",
        site_name: settings?.siteTitle,
        images: [
          {
            url: settings?.seo?.ogImage?.original,
            width: 800,
            height: 600,
            alt: settings?.seo?.ogTitle,
          },
        ],
      }}
      twitter={{
        handle: settings?.seo?.twitterHandle,
        site: settings?.siteTitle,
        cardType: settings?.seo?.twitterCardType,
      }}
    />
  );
};

export default Seo;
