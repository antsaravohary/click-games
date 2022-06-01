import Layout from "@components/layout/layout";
import { termsAndServices } from "@settings/terms.settings";
import { Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { cgua } from "@settings/site-terms-buyers";
import { cga } from "@settings/site-terms-acheteurs";
import { cgu } from "@settings/site-terms-and-services";
import { cguv } from "@settings/site-terms-vendors";
import { useEffect, useState } from "react";
import { useArticlesQuery } from "@data/article/use-articles.query";
import { Article } from "@ts-types/custom.types";
import ArticleDetail from "@components/article/article-detail";
import { SEO } from "@components/seo";
import FooterOne from "@components/layout/footer-one";
import { useRouter } from "next/router";
import { useArticleQuery } from "@data/article/use-article.query";
import Link from "next/link";
import HomeLayout from "@components/layout/home-layout";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function TermsPage() {
  const { t } = useTranslation("terms");
  const { query, push } = useRouter();
  const [terms, setTerms] = useState<Article | undefined>();
  const { data: articleData } = useArticlesQuery({ limit: 50,type:"rules" });
  const articles = articleData?.pages[0]?.data;
  useEffect(() => {
    if (articles) {
      const a=articles.find(ar=>ar.slug==query.terms);;
      if(a){
        setTerms(a);
      }
    }
  }, [query,articles]);
  return (
    <>
      <SEO title={"Mentions légale - " +terms?.title} />
      <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="flex">
          {/*articles &&
            articles.map((article) => (
              <Link key={article.id} href={"/terms/" + article.slug}>
                <a className="mx-2 p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300">
                  {" "}
                  {article.title}
                </a>
              </Link>
            ))*/}
        </div>

        {/* End of page header */}
        {terms && <ArticleDetail id={terms?.id} />}
      </section>
     
    </>
  );
}

TermsPage.Layout = HomeLayout
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      "/terms/terms",
      // Object variant:
      { params: { terms: "terms" } },
    ],
    fallback: true,
  };
}
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "terms"])),
    },
  };
};
