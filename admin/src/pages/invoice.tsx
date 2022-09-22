import InvoicePdf from "@components/order/invoice-pdf";
import OrderInfoPdf from "@components/order/order-info-pdf";
import ShippingLabelPdf from "@components/order/shipping-label-pdf";
import SubscriptionTransactionPdf from "@components/subscription-admin/subscription-transaction-pdf";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useArticlesQuery } from "@data/article/use-articles.query";
import { useOrderQuery } from "@data/order/use-order.query";
import { useTransactionsQuery } from "@data/transaction/use-transactions.query";
import { PDFViewer } from "@react-pdf/renderer";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"])),
  },
});

const InvoicePage = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useOrderQuery("4");
  const {
    data:dataT,
    isLoading:tloading
  } = useTransactionsQuery({ type: "CGP_PAID",user_id:data?.order?.customer_id,object:"Activation" });
  const {data:dataA}=useArticlesQuery({limit:100});
  if (loading,tloading) return <Loader showText={false} />;
  if (error) return <ErrorMessage message={error.message} />;
  console.log("data",dataT.transactions?.data[0]);
  return (
    <PDFViewer style={{ width: "100vw", height: "100vh" }}>
       <ShippingLabelPdf/>
    </PDFViewer>
  );
};

export default InvoicePage;
