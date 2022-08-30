import { useGameSale } from "@contexts/game-sale.context";
import { useRepair } from "@contexts/repair.context";
import { useAddressQuery } from "@data/address/use-address.query";
import { useCreatePurchaseGameMutation } from "@data/purchase-game/use-create-purchase-game.mutation";
import { useCreateRepairMutation } from "@data/repair/use-create-repair.mutation";
import { formatToPrice } from "@utils/use-price";
import { Button } from "..";

/* This example requires Tailwind CSS v2.0+ */
const products = [
  {
    id: 1,
    name: "Cold Brew Bottle",
    description:
      "This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.",
    href: "#",
    quantity: 1,
    price: "$32.00",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-05-product-01.jpg",
    imageAlt: "Glass bottle with black plastic pour top and mesh insert.",
  },
];

export default function RepairCreateStep3({ onSuccess }: any) {
  const { shipping, repair_items, total_amount,amount,weight,model_brand } = useRepair();
  const { mutate, isLoading } = useCreateRepairMutation();
  const { data } = useAddressQuery({
    id: "1",
  });
  const onValidate = () => {
    /*mutate({
     purchase_games:purchase_games,
     
  });*/
    const input = {
      items: repair_items,
      amount,
      total_amount,
      model_brand_id:model_brand.id,
      paid_total:0,
      status:"pending",
      ...shipping,
      shipping_company: "",
      sender_address_id: shipping?.sender_address?.id,
    };
    mutate(input, {
      onSuccess: (e) => {
        onSuccess(e);
      },
    });
  };
  return (
    <div className="bg-white">
      <div className="max-w-xl">
        <h1 className="text-md font-semibold uppercase tracking-wide text-indigo-600">
          Validation de votre paquet
        </h1>
        <div className="grid grid-cols-2 hidden">
          <dl className="mt-2 text-sm font-medium">
            <dt className="text-gray-900">Company de livraison:</dt>
            <dd className="text-indigo-600 ml-4">
              {shipping?.shipping_company?.value}
            </dd>
          </dl>

          <dl className="mt-2 text-sm font-medium">
            <dt className="text-gray-900">Numero de suivie:</dt>
            <dd className="text-indigo-600 ml-4">
              {shipping?.tracking_number}
            </dd>
          </dl>
        </div>
      </div>
      <div className=" ">
        <h3 className="sr-only">Adresse de livraison</h3>
        <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
          <div>
            <dt className="font-medium text-gray-900">Destinateur</dt>
            <dd className="mt-2 text-gray-700">
              <address className="not-italic">
                <span className="block">{data?.address?.title}</span>
                <span className="block">{data?.address?.address?.street_address}</span>
                <span className="block">{data?.address?.address?.zip} {data?.address?.address?.city}</span>
                <span className="block">France</span>
              </address>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Adresse retour colis</dt>
            <dd className="mt-2 text-gray-700">
              <address className="not-italic">
                <span className="block">{shipping?.sender_address?.title}</span>
                <span className="block">{shipping?.sender_address?.address?.street_address}</span>
                <span className="block">
                  {shipping?.sender_address?.address?.zip}{" "}
                  {shipping?.sender_address?.address?.city}
                </span>
                <span className="block">
                  {shipping?.sender_address?.address?.country}
                </span>
              </address>
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <h2 className="sr-only">Vos jeux</h2>

        <h3 className="sr-only">Items</h3>
        <table className="min-w-full divide-y divide-gray-200 mt-2">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Designation
              </th>
              <th
                scope="col"
                className=" w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Montant
              </th>
            </tr>
          </thead>
          <tbody>
            {repair_items.map((repair_item: any) => (
              <tr key={repair_item.repair_price.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {repair_item.repair_price.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatToPrice(repair_item.price)}
                </td>
              </tr>
            ))}
            <tr className="border-t">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                TOTAL
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatToPrice(total_amount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button loading={isLoading} onClick={onValidate} className="mt-5 w-full">
        Valider
      </Button>
    </div>
  );
}
