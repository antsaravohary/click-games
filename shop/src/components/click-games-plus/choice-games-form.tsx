import CategoryChoice from "@components/category/category-choice"
import CategoryChoiceSingle from "@components/category/category-choice-single";
import SelectInput from "@components/ui/select-input";
import { useProductsQuery } from "@data/product/use-products.query";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
type FormValue = {
    product: any;
};


const ChoiceGameForm = ({ setProduct }) => {
    const [category, setCategory] = useState();
    const [text, setText] = useState("");
    const { control, watch } = useForm<FormValue>();
    const { data, isLoading } = useProductsQuery({ limit: 100, category: category?.slug, text: text });
    const myProduct = watch("product");
    useEffect(() => {
        if (myProduct) {
            setProduct(myProduct);
        }
    }, [myProduct])
    return <div>
        <div className="">
            <h4 className="font-semi-bold text-lg">
                Vous voulez vous echanger avec quoi
            </h4>
            <CategoryChoiceSingle setValue={(e) => setCategory(e)} />
        </div>
        <div className="mt-5">
            <h4 className="font-semi-bold text-lg">
                C'est quoi le nom de votre jeux
            </h4>
            <SelectInput
                name="product"
                onInputChange={(e) => setText(e)}
                control={control}
                isLoading={isLoading}
                getOptionLabel={(e: any) => e.name}
                getOptionValue={(e: any) => e.id}
                options={data?.pages[0]?.data ?? []}
            />
        </div>
    </div>
}

export default ChoiceGameForm;