import ErrorMessage from "@components/ui/error-message";
import BakeryCategoryLoader from "@components/ui/loaders/bakery-category-loader";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { useTranslation } from "next-i18next";
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
          <div className="hidden xl:block">
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
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50 cursor-pointer  shadow-lg rounded-lg "
            role="button"
            onClick={() => onCategoryClick(category?.slug)}
            >
              <img
                className="max-h-12"
                src={
                    category?.image?.original! ??
                    "/product-placeholder.svg"
                  }
                alt={category?.name}
              />
            </div>))}
          </div>
        </div>
      </div>
    )
  }