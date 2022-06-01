export default function DeliveryInfo({delivery,company,tracking_number,address,tracking_url}:any){
    return(
        <div className="mt-6 lg:mt-0 lg:col-span-5">
        <dl className="grid grid-cols-2 gap-x-6 text-sm">
          <div>
            <dt className="font-medium text-gray-900">
              Adresse de livraison
            </dt>
            <dd className="mt-3 text-gray-500">
              <span className="block">
                {address.address.street_address}
              </span>
              <span className="block">
                {address.address.city}
              </span>
              <span className="block">
                {address.address.country}
              </span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">
              Information livraison
            </dt>
            <dd className="mt-3 text-gray-500 space-y-3">
              <p>Company: {company}</p>
              <p>N° suivie: {tracking_number}</p>
              {tracking_url && (
                <p>Lien de suvie: {}</p>
              )}
            </dd>
          </div>
        </dl>
      </div>
    )
}