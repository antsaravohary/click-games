import PriceView from "@components/common/price-view";
import Loader from "@components/ui/loader/loader";
import { useArticlesQuery } from "@data/article/use-articles.query";
import { useOrderQuery } from "@data/order/use-order.query";
import { useTransactionsQuery } from "@data/transaction/use-transactions.query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Transaction } from "@ts-types/transactions-type";
import { formatDate } from "@utils/format-date";
import { formatToPrice } from "@utils/use-price";
import { useTranslation } from "next-i18next";
import SubscriptionTransactionPdf from "./subscription-transaction-pdf";

const TransactionView = ({transaction}:any) => {
  const {t}=useTranslation();
  const {data,isLoading:loading}=useOrderQuery(transaction?.data?.order_id);
  const {data:dataT}=useArticlesQuery({limit:100});
  return (
    <div className="ml-4 flex-shrink-0">
      <PDFDownloadLink
        document={
          <SubscriptionTransactionPdf transaction={transaction} order={data?.order} articles={dataT?.articles?.data} />
        }
        fileName={transaction?.object}
      >
        {({ loading }: any) =>
          loading ? t("common:text-loading") : t("common:text-download")
        }
      </PDFDownloadLink>
    </div>
  );
};

export default function SubscriptionPaymentList({ subscription }) {
  const { t } = useTranslation();
  const { data: dataT, isLoading: loadingT } = useTransactionsQuery({
    type: "CGP_PAID",
    user_id: subscription?.user?.id,
  });

  return (
    <div>
      {loadingT ? (
        <Loader simple className="h-16 w-16" />
      ) : (
        <ul
          role="list"
          className="border border-gray-200 rounded-md divide-y divide-gray-200"
        >
          {dataT?.transactions?.data?.map(
            (transaction: Transaction, idx: number) => {
              return (
                <li
                  key={transaction?.id}
                  className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                >
                  <div className="w-0 flex-1 flex items-center">
                    <span className="ml">
                      {formatDate(transaction?.created_at)}:
                    </span>
                    <span className="ml-2 w-2/4">{transaction?.object}</span>
                    <span className="">
                      <PriceView amount={transaction?.amount} />
                    </span>
                  </div>
                  <TransactionView transaction={transaction}/>
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
}
