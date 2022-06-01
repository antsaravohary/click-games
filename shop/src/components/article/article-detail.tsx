import Heading from "@components/ui/heading";
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
     {/**  <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">
          {data?.title}
        </h1> */} 
        <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0.5">
          Dernière mise à jour {dayjs(data?.updated_at ).format("DD-MM-YYYY")}
        </p>
      </header>
      <div className="flex flex-col md:flex-row">
      <nav className="hidden sm:block md:w-72 xl:w-3/12 mb-8 2xl:mb-0 lg:-mt-2">
              <ol className="sticky md:top-16 lg:top-20 z-10">
              {data?.items?.map((item: any) => (
                  <li key={item.title}>
                    <Link
                      spy={true}
                      offset={-120}
                      smooth={true}
                      duration={200}
                      to={makeTitleToDOMId(item.title)}
                      activeClass="text-skin-primary font-medium borderColor relative ps-3"
                      className="block transition-all cursor-pointer py-3 text-sm lg:text-15px text-skin-base font-medium"
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
              className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
            >
              <Heading className="mb-4 lg:mb-6 font-body">
                {item.title}
              </Heading>
              <div
                className="text-skin-muted text-sm lg:text-15px leading-7 space-y-5"
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
