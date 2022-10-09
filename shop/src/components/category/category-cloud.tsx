import ErrorMessage from "@components/ui/error-message";
import BakeryCategoryLoader from "@components/ui/loaders/bakery-category-loader";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CategoryCloud() {
    const { t } = useTranslation("common");
    const router = useRouter();
    const {
        data,
        isLoading: loading,
        error,
      } = useCategoriesQuery({
        type: "bakery",
      });
    
      if (loading) {
        return (
          <div className=" xl:block">
            <div className="w-full h-52 flex justify-center mt-8 px-2">
              <BakeryCategoryLoader />
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
      <div className="">
        <div className=" mx-auto py-2 px-4 sm:px-6 lg:py-4 lg:px-6">
          <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2  md:grid-cols-6 lg:mt-4">
          {data?.categories?.data.map((category, idx) => (
            <div className="text-center rounded bg-light py-2 flex flex-col items-center justify-start relative overflow-hidden cursor-pointer border-2"
            role="button"
            onClick={() => onCategoryClick(category?.slug)}
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
            </div>))}
          </div>
        </div>
      </div>
    )
  }