import CategoryChoice from "@components/category/category-choice"
import CategoryChoiceSingle from "@components/category/category-choice-single";
import { CheckMark } from "@components/icons/checkmark";
import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import SelectInput from "@components/ui/select-input";
import { useProductsQuery } from "@data/product/use-products.query";
import http from "@utils/api/http";
import { ROUTES } from "@utils/routes";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Button, Input } from "..";
type FormValue = {
    product: any;
};


const ChoiceGameSku = ({ setProduct }) => {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    return <div className="w-full ">
        <div className="w-full">
            <h4 className="font-semi-bold text-lg">
                SKU de jeux pour echanger
            </h4>
            <div className="flex items-center"> <Input className="w-full" onChange={(e) => {
                setText(e.currentTarget.value)
                if (error != "") setError("")
            }} name="sku" />
                <Button loading={loading} disabled={loading || text === ""} onClick={() => {
                    setLoading(true);
                    http.get(ROUTES.PRODUCT + "?search=sku:" + text + "&searchJoin=and&&limit=1").then((response) => {
                        const data = response?.data?.data;
                        if (data.length) {
                            setProduct(data[0])
                        } else {
                            setError("Votre produit n'existe pas! ")
                        }
                    }).finally(() => {
                        setLoading(false);
                    });
                }} className=" ml-4"><CheckMark /></Button></div>

        </div>
        {error!=""&& <p className=" mt-4 p-2 rounded bg-red-300 text-red-600">{
            error
        }</p>}
       
    </div>
}

export default ChoiceGameSku;