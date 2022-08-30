import { useForm } from "react-hook-form";
import Image from "next/image";
import Button from "@components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product } from "@ts-types/custom.types";
import { useTranslation } from "next-i18next";
import FileInput from "@components/ui/file-input";
import { AttachmentInput, User } from "@ts-types/generated";
import { ThumbsCarousel } from "@components/ui/carousel";
import usePrice from "@utils/use-price";
import { useCreateProductMutation } from "@data/product/use-create-product.mutation";
type FormValue = {
  gallery: AttachmentInput[];
  image: AttachmentInput;
};
type props = {
  nextStep: any;
  previousStep: any;
  update: any;
  me:User;
  product: any;
};
const validationSchema = yup.object().shape({});
const Step6 = ({ nextStep, previousStep, update, product,me }: props) => {
  console.log("me",me);
  const { t } = useTranslation();

  const {mutate,isLoading}= useCreateProductMutation();

  const onSubmit = (values: any) => {
    
    let input={
      name:product?.name,
      user_id:me?.id,
      price:product?.price,
      category:product?.categories?.map((c:any)=>c.id),
      description:product?.description,
      gallery:product?.gallery,
      product_condition:product?.status?.value,
      image:product?.gallery[0],
      brand_id:product?.brand?.value,
      mode:'user-product',
      modele_id:product?.modele?.value,
      product_type:"simple",
      quantity:1,
      type_id:product?.type,
      discount:0,
      product_information:{
        storage_capacity:product?.storage_capacity?.value,
        color:product?.color,
        year:product?.year,
        milage:product?.milage,
        licence:product?.licence,
        fuel:product?.fuel,
        platform:product?.platform,
        age:product?.age
      }
    }
    mutate(input,{onSuccess:(data)=>{
      console.log(data);
    }});
  };
  const { price, basePrice, discount } = usePrice({
    amount: product?.price as number,
    baseAmount: product?.sale_price,
  });
  return (
    <>
      <div >
        <div className="max-w-4xl mx-auto mt-4 bg-white rounded p-4">
          <h4 className="font-semi-bold text-lg">Résumer</h4>
          <div className="m-4 border rounded p-4">
            <div className="bg-white">
              <div className="pt-6">
                {/* Image gallery */}
                <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                  {product?.gallery[0] && (
                    <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                      <img
                        src={product?.gallery[0].thumbnail}
                        alt={"product?.gallery[0].alt"}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                  )}
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    {product?.gallery[1] && (
                      <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                        <img
                          src={product?.gallery[1].thumbnail}
                          alt={"product.images[1].alt"}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    )}
                    {product?.gallery[2] && (
                      <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                        <img
                          src={product?.gallery[2].thumbnail}
                          alt={"product.images[2].alt"}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {product?.gallery[3] && (
                    <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                      <img
                        src={product?.gallery[3].thumbnail}
                        alt={"product.images[3].alt"}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                  <div className="lg:col-span-2 flex  lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                      {product.name}
                    </h1>{" "}
                    -
                    <p className="text-3xl text-gray-900 ml-4">
                      {price}
                    </p>
                  </div>
                  <div className="py-5  lg:pb-3 lg:col-start-1 lg:col-span-2">
                    <div>
                      <h3 className="">Description</h3>

                      <div className="">
                        <p className="text-base text-gray-900">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>En validant la diffusion de mon annonce, j’accepte les conditions <a href="#" className="text-accent">générales d’utilisation</a> et <a className="text-accent" href="#">les règles de diffusion</a> du site click-univers.fr et j’autorise leboncoin à diffuser mon annonce.</p>
          <div className="mt-4 flex  justify-between">
            <Button onClick={previousStep}>Retour</Button>
            <Button loading={isLoading} disabled={isLoading} onClick={onSubmit}>Valider </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step6;
