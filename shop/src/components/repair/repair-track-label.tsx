import Button from "@components/ui/button";
import { useModalState } from "@components/ui/modal/modal.context";
import { useAddressQuery } from "@data/address/use-address.query";
import { formatAddress } from "@utils/format-address";
import QRCode from "react-qr-code";

const RepairTrackLabel = () => {
  const { data } = useModalState();
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
  const {data:dataAddress}=useAddressQuery({id:"1"})
  console.log("data",data);
  return (
    <div className="bg-white">
      <Button className="mt-2 ml-4" size="small" onClick={print}>
        <span className="block">Imprimmer</span>
      </Button>
      <div id="shipping-label">
        <div className="flex flex-col w-100 p-8 ">
          <div className="flex flex-col">
            <h3 className="font-semibold">Expediteur:</h3>
            <div>{data?.repair?.send_delivery?.sender?.title}</div>
            <div>{formatAddress(data?.repair?.send_delivery?.sender?.address)}</div>
            <div>Téléphone: {data?.repair?.send_delivery?.sender?.telephone}</div>
          </div>
          <div className="border border-black flex-1 p-4 border-r-dashed">
              <div className="flex justify-center">
                <QRCode value={data?.repair?.ref}></QRCode>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairTrackLabel;
