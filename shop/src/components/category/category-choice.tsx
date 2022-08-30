import ChevronRight from "@components/icons/chevron-right";
import Select from "@components/ui/select/select";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { Category } from "@ts-types/custom.types";
import { Children, useEffect, useRef, useState } from "react";
type categoryListProps = {
  categories: Category[] | undefined;
  selected: string | undefined | number;
  onClick: any;
};
const CategoryList = ({ categories, selected, onClick }: categoryListProps) => {
  return (
    <ul className="list-none">
      {categories?.map((c, i) => (
        <li
          key={c?.id}
          onClick={() => onClick(c)}
          className={`hover:bg-accent hover:text-white p-1 w-full group rounded-sm cursor-pointer inline-flex items-center justify-between ${
            c?.id == selected && "bg-accent text-white"
          }`}
        >
          <span>{c?.name}</span>{" "}
          <ChevronRight className="hidden group-hover:block" width={20} />
        </li>
      ))}
    </ul>
  );
};
const CategoryChoice = ({ setValue, defaultCategory, defaultChildCategory, control }:any) => {
  const [show, setShow] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [categoryChildren, setCategoryChildren] = useState<Category>(defaultChildCategory);
  const wrapperRef = useRef(null);
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
  });
  useEffect(()=>{
    setShow(false);

  },[wrapperRef])
  const categories = data?.categories?.data;
  return (
    <div ref={wrapperRef}>
      {!show ? (
        <div
          onClick={() => setShow(true)}
          className="px-4 cursor-pointer flex items-center w-full font-semibolds appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base rounded focus:border-accent text-sm h-10 w-96"
        >
          {categoryChildren
            ? `${category?.name} / ${categoryChildren?.name}`
            : "Choisir votre catégorie"}
        </div>
      ) : (
        <div className="border rounded p-4 w-[32rem] ">
          <div className="flex">
            <div className="flex-1 border-r">
              <CategoryList
                categories={categories}
                selected={category?.id}
                onClick={(e: Category) => setCategory(e)}
              />
            </div>
            <div className="flex-1 pl-4">
              {category && (
                <CategoryList
                  categories={category.children}
                  selected={categoryChildren?.id}
                  onClick={(e: Category) => {
                    setCategoryChildren(e);
                    setShow(false);
                    setValue("categories", [category, e]);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryChoice;
