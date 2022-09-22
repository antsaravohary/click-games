import Button from "@components/ui/button";
import LinkButton from "@components/ui/link-button";
import { formatAddress } from "@utils/format-address";
import { useTranslation } from "next-i18next";

type Iprops = {
  delivery: any;
};

const DeliveryCard = ({ delivery }: Iprops) => {
  const { t } = useTranslation();
  return (
    <div className="w-full border border-200 mt-2 rounded p-4">
      <h3 className="text-heading text-start font-semibold mb-3">
        Information de livraison
      </h3>{" "}
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div className="flex flex-col px-4 py-5 sm:p-6">
          <div>
            {" "}
            <span className="text-gray-600">Companie: </span>
            {delivery?.company}
          </div>
          <div>
            {" "}
            <span className="text-gray-600">N° suivie: </span>
            { }
            <a className="text-accent" href={delivery?.tracking_url}>{delivery?.tracking_number}</a>
          </div>

          <div>
            {" "}
            <span className="text-gray-600">Status: </span>
            {delivery?.status}
          </div>
          {delivery?.label_pdf&&  <div className="mt-2">
            {" "}
            <LinkButton className="text-accent" href={delivery?.label_pdf} target="_blank">Etiquette</LinkButton>
          </div>}
        </div>
        <div className="flex flex-col px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900 border-b">
            Expediteur
          </dt>
          <dd className="mt-1 flex-col text-sm justify-between items-baseline md:block">
            <div className="">{delivery?.sender?.title}</div>
            <div className="">{formatAddress(delivery?.sender?.address)}</div>
          </dd>
        </div>
        <div className="flex flex-col px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900 border-b">
            Destinateur
          </dt>
          <dd className="mt-1 text-sm flex-col justify-between items-baseline md:block">
            <div className="">{delivery?.receiver?.title}</div>
            <div className="">{formatAddress(delivery?.receiver?.address)}</div>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default DeliveryCard;
