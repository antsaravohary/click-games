import ErrorMessage from "@components/ui/error-message";
import Spinner from "@components/ui/loaders/spinner/spinner";
import ProgressBox from "@components/ui/progress-box/progress-box";
import { useOrderStatusesQuery } from "@data/order/use-order-statuses.query";

interface Props {
  status: number;
  type: number;
  mode:string;
}

const OrderStatus = ({ status, type,mode }: Props) => {
  const { data, isLoading: loading, error } = useOrderStatusesQuery();
  if (loading) return <Spinner showText={false} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <ProgressBox
      data={data?.order_statuses?.data.map((status: any) => {
        if(status.serial===3){
          switch (mode) {
            case "relay_point":
              return {...status,name:"Commande traité par Mondial Relay"}
              break;
            case "click_collect":
              return {...status,name:"Commande en attente de retrait"}
              break;
            default:
              break;
          }
        }
        if(status.serial===4&&mode==="click_collect"){
          return {...status,name:"Commande retiré"}
        }
        return status;
      })}
      status={status}
      type={type}
    />
  );
};

export default OrderStatus;
