import Layout from "@components/layout/layout";
import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps, GetStaticPathsContext, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Step1 from "@components/announces/create-form/step1";
import Step2 from "@components/announces/create-form/step2";
import Step3 from "@components/announces/create-form/step3";
import Step4 from "@components/announces/create-form/step4";
import Step5 from "@components/announces/create-form/step5";
import Step6 from "@components/announces/create-form/step6";
import { NEW_ANNONCE } from "@utils/constants";
import { AnimatePresence } from "framer-motion";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { dehydrate, QueryClient } from "react-query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { fetchProduct } from "@data/product/use-product.query";
import { Product } from "@ts-types/custom.types";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import { fetchProducts } from "@data/product/use-products.query";
import CategoryChoice from "@components/category/category-choice";
import ChoiceGameForm from "@components/click-games-plus/choice-games-form";
import Button from "@components/ui/button";
import { formatToPrice } from "@utils/use-price";
import ChoiceGameSku from "@components/click-games-plus/choice-games-sku";
import { useCreateExchangeMutation } from "@data/exchange/use-create-exchange.mutation";
import { useRouter } from "next/router";
import { useCustomerProductQuery } from "@data/customer-poduct/use-customers-products.query";
import MyGameListChoice from "@components/click-games-plus/my-games-list-choice";
import Loader from "@components/ui/loader/loader";
import { CustomerProduct } from "@ts-types/customer-products-type";
// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
    const products = await fetchProducts({
        queryKey: ["products", { limit: 100 }],
    });
    const paths = products?.data?.flatMap((product: Product) =>
        locales?.map((locale) => ({ params: { slug: product.slug }, locale }))
    );
    return {
        paths,
        fallback: "blocking",
    };
}
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const slug = params?.slug as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery("settings", fetchSettings);
    try {
        const product = await fetchProduct(slug);
        return {
            props: {
                product,
                ...(await serverSideTranslations(locale!, ["common"])),
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            },
            revalidate: 60,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};
type Iprops = {
    product: Product;
}

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="">
            <div className="relative border group">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                    <img
                        src={product.image?.thumbnail ?? siteSettings?.product?.placeholderImage}
                        alt={product.name}
                        className="w-full h-full object-center object-cover"
                    />
                </div>

                <div className="absolute top-0 inset-x-0 h-48 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-light">
                        {product.name}
                        <p className="relative text-lg font-semibold text-light">
                            {product.categories[0]?.name}
                        </p>
                    </p>

                </div>
            </div>

        </div>
    )
}

export default function CreateExchangeProduct({ product }: Iprops) {
    const [customerProduct, setMyCustomerProduct] = useState<CustomerProduct>();
    const { push } = useRouter();
  
  
    const { mutate, isLoading } = useCreateExchangeMutation();
    const { data: dataMe, isLoading: loadingMe } = useCustomerQuery();

    const me = dataMe?.me;
    let price = (customerProduct && product) ?  me?.subscription&&me?.subscription?.credit>0?0:10: 0;
    const exchange = () => {
        mutate({
            customer_product_id: customerProduct?.id,
            shop_product_id: product?.id,
        }, {
            onSuccess: (response) => {
              
                push("/exchanges/" + response?.id);
            }
        });
    }
    if (loadingMe)
        return (
            <Loader />
        )
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-screen " >
            <div className="flex justify-center mt-5 border bg-white rounded-md">
                <h3 className="text-2xl">Echange de jeux</h3>
            </div>
            <div className="flex justify-center mt-5 border p-5 bg-white rounded-md">
                <ProductCard product={product} />
                <div className="flex justify-center items-center mx-4 h-48"

                >
                    <img className="h-16 w-16" src="/icons/exchange.png" />

                </div>
                {customerProduct ? <ProductCard product={customerProduct?.product} /> : <div className="w-48 h-48 border bg-white">
                    <div className="flex align-center justify-center">
                        <h3 className="mt-20">Choisir votre jeux</h3>
                    </div>
                </div>}

            </div>


            {me && me?.subscription?.status ?
                <div>
                    {!customerProduct ? <div className="mt-10 flex justify-center">
                        <div className=" w-full mx-auto p-4 sm:px-6 lg:px-8 bg-white rounded-md">
                            <MyGameListChoice setMyProduct={setMyCustomerProduct} />
                        </div>
                    </div> :
                        <>
                            <div className="mt-10 flex flex-col w-full items-center justify-center rounded-md">

                                <Button className="w-96" onClick={() => setMyCustomerProduct(null)} size="small">Choisir une autre jeux</Button>
                                <div className="mt-5 bg-white flex justify-center">
                                    Estimation du prix d'échage: {formatToPrice(price)}
                                </div>
                                {me && me?.subscription?.status && <Button loading={isLoading} disabled={isLoading} className="w-96 bg-green-500 hover:bg-green-600" onClick={exchange} size="small">Demande l'échange de ce jeux</Button>}

                            </div>
                        </>}
                </div> :
                <div className="mt-5 p-5 flex justify-center border rounded-md bg-white">

                    <h3 className="text-red-500 text-lg font-semibold">Abonnez vous pour béneficier de l'échanger de jeux</h3>
                </div>}
        </div>

    );
}
CreateExchangeProduct.Layout = Layout;
