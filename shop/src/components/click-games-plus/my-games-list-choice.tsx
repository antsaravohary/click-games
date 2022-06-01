import ChevronRight from "@components/icons/chevron-right";
import Loader from "@components/ui/loader/loader";
import { useCustomerProductQuery } from "@data/customer-poduct/use-customers-products.query";


export default function MyGameListChoice({ setMyProduct }) {
    const { data, isLoading } = useCustomerProductQuery();
    if (isLoading) {
        return (<div className="flex justify-start items-center"><Loader simple className="h-10 w-10 mr-4" /> <span>Recherche mes jeux ....</span></div>)
    }
    if (!data?.data?.length) {
        return (
            <div className="bg-light">
                <h3 className="text-leading text-center font-semibold">

                    Vous n'avez auccun jeux pour echanger
                </h3>

            </div>
        )
    }

    return (<div className="">
        <h3 className="text-xl font-semibold mb-5">Mes jeux</h3>

        <ul role="list" className="-my-5 divide-y divide-gray-200">
            {data?.data?.map((my_product) => (
                <li key={my_product.id} className="py-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8 rounded-full" src={my_product?.product?.image?.thumbnail} alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{my_product?.product?.name}</p>
                            <p className="text-sm text-gray-500 truncate"></p>
                        </div>
                        <div>
                            <button
                                onClick={()=>setMyProduct(my_product)}
                                className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <ChevronRight height={25} width={25} />
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>);
}