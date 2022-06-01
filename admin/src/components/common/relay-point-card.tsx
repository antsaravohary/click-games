const RelayPointCard = ({ data, customer }: any) => {
  console.log("customer",customer);
  return (
    <ul className="list-unstyled font-size-sm mt-2 border p-4">
      <li className="text-left">
        <span className="text-right text-size-md">
          Information sur le point de relais
        </span>
      </li>

      {data && (
        <>
          <li className="text-left">
            <span className="text-right  text-gray-700">
              Client:&nbsp;{customer?.name}
            </span>
          </li>
          <li className="text-left">
            <span className="text-right  text-gray-700">
              Nom du point de relay:&nbsp;{data?.nom}
            </span>
          </li>
          <li className="text-left">
            <span className=" text-right text-gray-700">
              Adresse:&nbsp;{data?.address}
            </span>
          </li>
          <li className="text-left">
            <span className=" text-right  text-gray-700">
              Code postal:&nbsp;{data?.zip}
            </span>
          </li>
        </>
      )}
    </ul>
  );
};

export default RelayPointCard;
