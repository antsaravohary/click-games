import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useCheckout } from "@contexts/checkout.context";
import { useEffect, useRef, useState } from "react";

const DeliveryRelayPoint = () => {
  const [dataRelayPoint, setDataRelayPoint] = useState<any>(null);
  const ref = useRef(null);
  var el;
  var $el = window.$(el);
  const { relay_point, setRelayPoint } = useCheckout();
  const { closeModal } = useModalAction();
  const handleValid = () => {
    setRelayPoint(dataRelayPoint);
    closeModal();
  };
  const showMap = () => {
    window.$("#Zone_Widget").MR_ParcelShopPicker({
      //
      // Settings relating to the HTML.
      //
      // JQuery selector of the HTML element receiving the Parcelshop Number (ex: here, input type text, but should be input hidden)
      Target: "#Target_Widget",
      //
      // Settings for Parcelshop data access
      //
      // Code given by Mondial Relay, 8 characters (padding right with spaces)
      // BDTEST is used for development only => a warning appears
      Brand: "BETEST  ",
      Country: "FR" ,
      EnableGmap: true,
      // Delivery mode (Standard [24R], XL [24L], XXL [24X], Drive [DRI])
      ColLivMod: "24R",
      NbResults: "7",
      OnParcelShopSelected: (data: any) => {
        console.log(data);
        setDataRelayPoint({
          nom: data.Nom,
          address: data.Adresse1,
          city: data.Ville,
          zip: data.CP,
          HoursHtmlTable:data.HoursHtmlTable,
        });
      },
      //
      // Display settings
      //
      // Enable Responsive (nb: non responsive corresponds to the Widget used in older versions=
      Responsive: true,
      // Show the results on Leaflet map usng OpenStreetMap.
      ShowResultsOnMap: true,
    });
  };
  useEffect(() => {
    showMap();
  });
  return (
    <div className="bg-white flex flex-col">
    <div className="flex flex-col  h-96">
      <div className="h-96" id="Zone_Widget"></div>
      <input type="hidden" ref={(el) => ($el = ref)} id="Target_Widget" />
     
    </div>
    {dataRelayPoint&& <Button onClick={handleValid} className="my-4 mx-4">
        Valider
      </Button>}
    </div>
  );
};

export default DeliveryRelayPoint;
