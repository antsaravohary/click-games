import { siteSettings } from "@settings/site.settings";
import { Product } from "@ts-types/generated";

const ProductCardPlus = ({ product }: { product: Product }) => {
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
export default ProductCardPlus;