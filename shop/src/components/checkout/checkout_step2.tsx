import Address from "@components/address/address"
import { ArrowNext } from "@components/icons"
import { User } from "@ts-types/generated";
import { Button } from ".."

type props = {
    me: User;
    setStep: (e) => {};

}
const CheckoutStep2 = ({ me, setStep }: props) => {
    return (
        <div className="p-5 md:p-4 flex flex-col h-full">

            <Address
                id={me?.id!}
                me={me}

                heading="text-delivery-address"
                addresses={me?.address}
                disabled={false}
                type="billing"
            />

            <div className="mt-auto flex justify-between">
                <Button onClick={() => {
                    setStep(0);
                }}>Retour</Button>
                <Button
                    onClick={() => {
                        setStep(2);
                    }}
                >Suivant</Button>
            </div>

        </div>

    )
}
export default CheckoutStep2;