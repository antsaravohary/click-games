/* This example requires Tailwind CSS v2.0+ */

import Loader from "@components/ui/loader/loader";
import { useShopQuery } from "@data/shop/use-shop.query";
import http from "@utils/api/http";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SubscriptionDetail() {
  const router = useRouter();
  const {
    query: { shop },
  } = router;
  const [subscriptionData, setSubscription] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { data: shopData } = useShopQuery(shop as string);
  const shopId = shopData?.shop?.id!;
  useEffect(() => {
    if (shopId) {
      http
        .post("stripe/subscription-portal", {
          shopId,
        })
        .then((response) => {
          setSubscription(response.data);
          setLoading(false);
        });
    }
  }, [shopId]);
  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-32">
        <Loader className="w-16 h-16" simple={true} />
      </div>
    );
  }
  return (
    <div className="bg-white shadow overflow-hidden rounded max-w-md p-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Votre abonnement Click Univers
        </h3>
        <p className="mt-1 max-w-1xl text-sm text-gray-500"></p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            ClickSeller
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Période</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {dayjs(subscriptionData.subscription.current_period_start).format(
                "DD/MM/YYYY"
              )}{" "}
              -{" "}
              {dayjs(subscriptionData.subscription.current_period_end).format(
                "DD/MM/YYYY"
              )}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Statuts</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {subscriptionData?.stripe_subscription?.status==="active"?"Actif":"Inactif"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
