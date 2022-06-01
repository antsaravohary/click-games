import { CheckMark } from "@components/icons/checkmark";
import Loader from "@components/ui/loader/loader";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { usePromotionTypesQuery } from "@data/promotion-type/use-promotion-types.query";
import { LoadingIndicator } from "react-select/src/components/indicators";
import Image from "next/image";

type PriceTableProps = {
  title: string;
  description: string;
  price: number;
  options: Array<string>;
  image?: any;
  onClick: any;
};

const PriceTable = ({
  title,
  price,
  options,
  description,
  onClick,
  image,
}: PriceTableProps) => {
  return (
    <div className="w-full md:w-1/3 bg-white rounded-lg shadow hover:shadow-xl transition duration-100 ease-in-out p-6 md:mr-4 mb-10 md:mb-0 flex flex-col">
      <h3 className="text-accent font-bold text-center text-lg">{title}</h3>
      <div className="flex justify-center item-center">
        {image?.thumbnail && (
          <Image
            className=""
            src={image?.thumbnail}
            width={80}
            height={80}
            priority={true}
          />
        )}
      </div>
      <p className="text-gray-600 mt-1">
        <span className="font-bold text-black text-xl">{price} €</span> /jour
      </p>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <div className="text-sm text-gray-600 mt-4">
        {options &&
          options.map((o: any, i: any) => o.value!==""?(
            <p className="my-2 flex justify-start items-center align-center nowrap">
              <div className="text-accent-500">
                <CheckMark with="8" height="8" />
              </div>
              <span> {o.value}</span>
            </p>
          ):null)}
      </div>
      <button
        onClick={onClick}
        className="w-full mt-auto text-purple-700 border border-purple-700 rounded hover:bg-purple-700 hover:text-white hover:shadow-xl transition duration-150 ease-in-out py-4"
      >
        {" "}
        Choisir{" "}
      </button>
    </div>
  );
};

const PromotionPriceTable = () => {
  const {
    data: { data_prices, setValue },
  } = useModalState();
  const { data: promotionTypeData, isLoading } = usePromotionTypesQuery({});
  const { closeModal } = useModalAction();
  if (isLoading) {
    return <div className="bg-white p-4">Chargement ...</div>;
  }
  return (
    <div className="relative w-[720px]  mx-auto bg-gray-100 p-4">
      <div className="text-center my-10">
        <h1 className="font-bold text-3xl mb-2">Publicités</h1>
        <h4 className="text-gray-600">-----------------------------------</h4>
      </div>
      <div className="flex flex-col md:flex-row px-2 md:px-0 w-full">
        {promotionTypeData?.promotion_types?.data.map((price) => (
          <PriceTable
            key={price.id}
            description={price.description}
            onClick={() => {
              setValue(price);
              closeModal();
            }}
            image={price.image}
            title={price.title}
            price={price.price}
            options={price.options}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionPriceTable;
