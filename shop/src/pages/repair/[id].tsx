import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AccountLayout from "@components/layout/account-layout";
import { useRepairsQuery } from "@data/repair/use-repairs.query";
import classNames from "classnames";
import { useRepairQuery } from "@data/repair/use-repair.query";
import { useRouter } from "next/router";
import Loader from "@components/ui/loader/loader";
import { formatDateComplet } from "@utils/format-date";
import { delivery } from "@ts-types/delivery-type";
import { formatToPrice } from "@utils/use-price";
import { status_repair } from "@utils/data";
import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUpdateRepairMutation } from "@data/repair/use-update-repair.mutation";
import RepairPayForm from "@components/repair/repair-pay-form";
import { formatAddress } from "@utils/format-address";
import PaymentCardInfo from "@components/payment/payment-card-info";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "forms"])),
    },
  };
};
export default function RepairEdit() {
  const router = useRouter();
  const { openModal } = useModalAction();
  const { data, isLoading } = useRepairQuery({
    ref: router.query.id as string,
  });
  const { mutate: updateRepair } = useUpdateRepairMutation();
  const repair = data?.repair;
  const step = repair ? status_repair[repair.status]?.value : 0;
  const delivery: delivery = repair?.return_delivery?repair?.return_delivery:repair?.send_delivery;
  if (isLoading && !repair) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-2xl mx-auto pt-8 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Ref #{repair?.ref}
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Date de création{" "}
            <time dateTime="2021-03-22" className="font-medium text-gray-900">
              {formatDateComplet(repair?.created_at)}
            </time>
          </p>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden"
          >
            View invoice<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        {/* Products */}
        <section aria-labelledby="products-heading" className="mt-6">
          <h2 id="products-heading" className="sr-only">
            Reparation de
          </h2>

          <div className="space-y-8">
            <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg">
              <div className="w-full flex justify-end px-4 space-x-2">
                {repair?.status === "pending" && (
                  <Button
                    className=" mb-2  mt-2"
                    size="small"
                    onClick={() =>
                      openModal("DELIVERY_FORM", {
                        onValide: (e: any) => {
                          if (repair) {
                            updateRepair({
                              id: repair.id,
                              input: {
                                action: "shipping_packet",
                                shipping_data: e,
                              },
                            });
                          }
                        },
                      })
                    }
                  >
                    Expedier le colis
                  </Button>
                )}

                <Button
                  className="bg-green-500 hover:bg-red-600 mb-2  mt-2"
                  size="small"
                  onClick={() =>
                    openModal("REPAIR_TRACK_LABEL", { repair: repair })
                  }
                >
                  Etiquette
                </Button>
              </div>

              <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                <div className="sm:flex-col lg:col-span-7">
                  <h3 className="text-md font-semibold">
                    Reparation de {repair?.model_brand?.brand?.name} model{" "}
                    {repair?.model_brand?.name}
                  </h3>
                  <dl className="sm:divide-y sm:divide-gray-200">
                    {repair?.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          {item?.name}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {formatToPrice(item?.pivot?.price)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-6 lg:mt-0 lg:col-span-5">
                  <dl className="grid grid-cols-2 gap-x-6 text-sm">
                    <div>
                      <dt className="font-medium text-gray-900">
                        Adresse de livraison
                      </dt>
                      <dd className="mt-3 text-gray-500">
                        <span className="block">
                          {delivery?.receiver?.address.street_address}
                        </span>
                        <span className="block">
                          {delivery?.receiver?.address.city}
                        </span>
                        <span className="block">
                          {delivery?.receiver?.address.country}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">
                        Information livraison
                      </dt>
                      <dd className="mt-3 text-gray-500 space-y-3">
                        <p>Company: {delivery.company}</p>
                        <p>N° suivie: {delivery.tracking_number}</p>
                        {delivery.tracking_url && (
                          <p>Lien de suvie: {delivery.tracking_url}</p>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
                <h4 className="sr-only">Status</h4>
                <p className="text-sm font-medium text-gray-900">
                  {repair && status_repair[repair.status]?.text}
                </p>
                <div className="mt-6" aria-hidden="true">
                  <div className="bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-indigo-600 rounded-full"
                      style={{
                        width: `${(step * 100) / 8}%`,
                      }}
                    />
                  </div>
                  <div className="hidden sm:eSSgrid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                    <div className="text-indigo-600">Envoie du console</div>
                    <div
                      className={classNames(
                        step > 0 ? "text-indigo-600" : "",
                        "text-center"
                      )}
                    >
                      Reparation encours
                    </div>
                    <div
                      className={classNames(
                        step > 1 ? "text-indigo-600" : "",
                        "text-center"
                      )}
                    >
                      Envoie retour du console
                    </div>
                    <div
                      className={classNames(
                        step > 2 ? "text-indigo-600" : "",
                        "text-right"
                      )}
                    >
                      Terminée
                    </div>
                    <div
                      className={classNames(
                        step > 2 ? "text-indigo-600" : "",
                        "text-right"
                      )}
                    >
                      Terminée
                    </div>
                    <div
                      className={classNames(
                        step > 2 ? "text-indigo-600" : "",
                        "text-right"
                      )}
                    >
                      Terminée
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {data?.repair?.status === "to_pay" && (
          <RepairPayForm repair={data?.repair} />
        )}
        {/* Billing */}
        {repair?.paid_at&&
        <section aria-labelledby="summary-heading" className="mt-16">
          <h2 id="summary-heading" className="sr-only">
            Adresse de facturation
          </h2>

          <div className="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">{repair?.send_delivery?.sender?.title}</span>
                  <span className="block">{formatAddress(repair?.send_delivery.sender.address)}</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">
                Informations de paiement
                </dt>
                <div className="mt-3">
                  <dd className="-ml-4 -mt-4 flex flex-wrap">
                    <div className="mt-4">
                    <PaymentCardInfo card={repair?.payment_info?.payment_method_details}/>
                    </div>
                  
                  </dd>
                </div>
              </div>
            </dl>

            <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Date du paiement </dt>
                <dd className="font-medium text-gray-900">{formatDateComplet(repair?.paid_at)}</dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Montant payée</dt>
                <dd className="font-medium text-gray-900">{formatToPrice(repair?.total_paid)}</dd>
              </div>
            </dl>
          </div>
        </section>}
      </div>
    </>
  );
}

RepairEdit.Layout = AccountLayout;
