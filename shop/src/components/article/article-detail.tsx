import { useArticleQuery } from "@data/article/use-article.query";
import dayjs from "dayjs";
import { Link, Element } from "react-scroll";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}
const ArticleDetail = ({ id }: any) => {
  const { data, isLoading } = useArticleQuery(id);
  
  if (isLoading) {
    return <div>Chargement ...</div>;
  }
  return (
    <div>
      <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
        <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">
          {data?.title}
        </h1>
        <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0.5">
          Dernière mise à jour {dayjs(data?.updated_at ).format("DD-MM-YYYY")}
        </p>
      </header>
      <div className="flex flex-col md:flex-row">
        <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
          <ol className="sticky md:top-16 lg:top-22 bg-gray-100 z-10">
            {data?.items?.map((item: any) => (
              <li key={item.title}>
                <Link
                  spy={true}
                  offset={-120}
                  smooth={true}
                  duration={500}
                  to={makeTitleToDOMId(item.title)}
                  activeClass="text-sm lg:text-base text-heading font-semibold"
                  className="cursor-pointer inline-flex py-3 text-sub-heading uppercase"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {/* End of section scroll spy menu */}

        <div className="md:w-9/12 md:ps-8 md:pb-96">
          {data?.items?.map((item: any) => (
            <Element
              key={item.title}
              name={makeTitleToDOMId(item.title)}
              className="mb-10"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
                {item.title}
              </h2>
              <div
                className="text-body-dark leading-loose"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </Element>
          ))}
        </div>
        {/* End of content */}
      </div>
    </div>
  );
};

export default ArticleDetail;
