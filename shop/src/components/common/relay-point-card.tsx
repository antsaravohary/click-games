const RelayPointCard = ({data}:any) => {
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
            <span className="text-right text-muted">
              Nom du point de relay:&nbsp;{data?.nom}
            </span>
          </li>
          <li className="text-left">
            <span className=" text-right text-muted">
              Adresse:&nbsp;{data?.address}
            </span>
          </li>
          <li className="text-left">
            <span className=" text-right text-muted">
              Code postal:&nbsp;{data?.zip}
            </span>
          </li>
        </>
      )}
    </ul>
  );
};

export default RelayPointCard;
