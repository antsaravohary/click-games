import { useRouter } from "next/router";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import ErrorMessage from "@components/ui/error-message";
import NotFound from "@components/common/not-found";
import cn from "classnames";
import Scrollbar from "@components/ui/scrollbar";
import * as CategoryIcons from "@components/icons/category";
import { getIcon } from "@utils/get-icon";
import ProductFeedLoaderTwo from "@components/ui/loaders/product-feed-loader-two";
import Image from "next/image";

const menus:any = [
/*{
  slug:"click-games-plus",
  name:"Click Games Plus",
  image:{
    thumbnail:"/icons/exchange.png"
  },
  url:"/click-games-plus"
}*/
];
const BoxCategory = () => {
  const router = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: router.pathname === "/grocery-two" ? "grocery" : "furniture",
  });

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-full h-52 flex justify-center mt-8 px-2">
          <ProductFeedLoaderTwo />
        </div>
      </div>
    );
  }
  if (error) return <ErrorMessage message={error.message} />;

  const { pathname, query } = router;
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    if (selectedQueries === slug) {
      const { category, ...rest } = query;
      router.push(
        {
          pathname,
          query: { ...rest },
        },
        {
          pathname,
          query: { ...rest },
        },
        {
          scroll: false,
        }
      );
      return;
    }
    router.push(
      {
        pathname,
        query: { ...query, category: slug },
      },
      {
        pathname,
        query: { ...query, category: slug },
      },
      {
        scroll: false,
      }
    );
  };

  return (
    <Scrollbar className="w-full h-full max-h-screen">
      <div className="p-5">
        {data?.categories?.data?.length ? (
          <div className="grid grid-cols-2 gap-4">
            {data?.categories?.data.map((category, index) => (
              <div
                className={cn(
                  "text-center rounded bg-light py-4 flex flex-col items-center justify-start relative overflow-hidden cursor-pointer border-2",
                  selectedQueries === category.slug
                    ? "border-gray-800"
                    : "border-border-100 xl:border-transparent"
                )}
                role="button"
                onClick={() => onCategoryClick(category?.slug!)}
                key={index}
              >
                <div className="w-full h-20 flex items-center justify-center">
                  <span className="w-10 h-10 inline-block">
                    <Image
                      src={category?.image?.thumbnail ?? "http://api.click-univers.local/1258.jpg"}
                      alt={category?.slug}

                      priority={true}
                      height={250}
                      width={250} />

                  </span>
                </div>

                <span className="text-sm font-semibold text-heading text-center px-2.5 block">
                  {category.name}
                </span>
              </div>
            ))}
            {menus?.map((category,index) => (
          <div
            className={cn(
              "text-center rounded bg-light py-4 flex flex-col items-center justify-start relative overflow-hidden cursor-pointer border-2",
              selectedQueries === category.slug
                ? "border-gray-800"
                : "border-border-100 xl:border-transparent"
            )}
            role="button"
            onClick={() => router.push(category?.url)}
            key={index}
          >
            <div className="w-full h-20 flex items-center justify-center">
              <span className="w-10 h-10 inline-block">
                <img
                  src={category?.image?.thumbnail ?? "http://api.click-univers.local/1258.jpg"}
                  alt={category?.slug}

                 
                  height={250}
                  width={250} />

              </span>
            </div>

            <span className="text-sm font-semibold text-heading text-center px-2.5 block">
              {category.name}
            </span>
          </div>
        ))}
          </div>
        ) : (
          <div className="min-h-full pt-6 pb-8 px-4 lg:p-8">
            <NotFound text="text-no-category" className="h-96" />
          </div>
        )}
        
      </div>
    </Scrollbar>
  );
};

export default BoxCategory;
