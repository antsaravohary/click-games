import InvoicePdf from "@components/order/invoice-pdf";
import OrderInfoPdf from "@components/order/order-info-pdf";
import SubscriptionTransactionPdf from "@components/subscription-admin/subscription-transaction-pdf";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useArticlesQuery } from "@data/article/use-articles.query";
import { useOrderQuery } from "@data/order/use-order.query";
import { useTransactionsQuery } from "@data/transaction/use-transactions.query";
import { PDFViewer } from "@react-pdf/renderer";

const InvoicePage = () => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type:" ItemTypes.CARD",
      item: "text",
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return <div></div>;
};

export default InvoicePage;
