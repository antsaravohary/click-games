import Button from "@components/ui/button";
import { useModalState } from "@components/ui/modal/modal.context";
import { formatAddress } from "@utils/format-address";
import QRCode from "react-qr-code";

const ShippingLabel = () => {
  const { data } = useModalState();
  console.log(data);
  const print = () => {
    var content = window.document.getElementById("shipping-label");
    var a: any = window.open("");
    a.document.write("<html>");
    a.document.write(window.document.head.innerHTML);
    a.document.write("<body >");
    a.document.write(content?.innerHTML);
    a.document.write("</body></html>");
    a.document.close();
    setTimeout(function () {
      a.close();
    }, 10);
    a.print();
  };
  
  return (
    <div className="bg-white">
      <Button className="mt-2 ml-4" size="small" onClick={print}>
        <span className="block">Imprimmer</span>
      </Button>
      <div id="shipping-label">
        <div className="flex w-100 p-4 ">
          <div className="border border-black flex-1 p-4 border-r-dashed">
            <div className="flex-1 flex-column">
              <div className="flex flex-row border-b border-b-4 border-black">
                <div className="flex-1">{data?.order?.shipping_company}</div>
                <div className="flex-2">France métropole</div>
              </div>
              <h4 className=" text-md">Destinateur:</h4>
              <QRCode
                value={`${data?.shipping_address?.title},${formatAddress(
                  data.order.shipping_address.address
                )}`}
              />
            </div>
          </div>
          <div className="border border-black flex-1 p-4  border-l-dashed">
            <h4 className="font-semibold text-lg">Expediteur:</h4>
            <h4 className="font-semibold text-lg">{data?.order?.shop?.name}</h4>
            <div>{formatAddress(data.order.shop.address)}</div>
            <div className="border border-black mt-2 p-4">
              <h4 className="font-semibold text-lg">Destinateur:</h4>
              <h4 className="font-semibold text-lg">
                {data?.order?.shipping_address?.title}
              </h4>
              <div> {formatAddress(data.order.shipping_address.address)}</div>
              <div>Telephone: {data?.order?.customer_contact}</div>
              <div>Email: {data?.order?.customer?.email}</div>

              <div className="mt-8">
                {" "}
                Colis N° {data?.order?.tracking_number}
              </div>
              <div className="mt-4">Pois: {data?.order?.weight}Kg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingLabel;
