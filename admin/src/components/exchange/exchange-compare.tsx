import { Product } from "@ts-types/generated";
import usePrice from "@utils/use-price";

export default function ExchangeCompare({ products }: { products: Product[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full min-w-max">
                <thead>
                    <tr>
                        <th className="p-3 border border-solid border-gray-300 text-center font-medium text-sm capitalize">Produit</th>
                        {products?.map((product) => (
                            <th key={product?.id} className="p-3 border border-solid border-gray-300 text-center font-medium text-sm capitalize">
                                <img className="w-40 block mx-auto mb-4" src={product?.image?.thumbnail ?? ""} alt={product?.name} />
                                <span className="block mb-4">{product?.name}</span>
                            </th>
                        ))}


                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th className="p-3 border border-solid border-gray-300 text-center font-medium text-sm capitalize">Prix</th>
                        {products?.map((product) => {
                            const { price } = usePrice({
                                amount: product?.price,
                            });
                            return (<td key={product?.id} className="p-3 border border-solid border-gray-300 text-center font-medium text-sm capitalize">
                                <span className="whish-list-price"> {price} </span>
                            </td>)
                        }
                        )}


                    </tr>
                    <tr>
                        <th className="p-3 border border-solid border-gray-300 text-center font-medium text-sm capitalize">Categorie</th>
                        {products?.map((product) => (<td key={product?.id} className="p-3 border border-solid border-gray-300 text-center font-medium text-sm capitalize">
                            <p>{product?.categories[0]?.name}</p>
                        </td>))}
                    </tr>
                    <tr>
                        <th className="p-3 border border-solid border-gray-300 text-center font-medium text-sm capitalize">Stock disponible</th>
                        {products?.map((product) => (<td key={product?.id} className="p-3 border border-solid border-gray-300 text-center font-medium text-sm capitalize">
                            <span className="badge bg-success">{product?.quantity}</span>
                        </td>))}

                       
                    </tr>
                    
                  
                </tbody>
            </table>
        </div>

    )
}