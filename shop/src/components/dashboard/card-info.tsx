import { Link } from "..";

export default function CardInfo({ text, value,icon,href }: any) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {text}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 ">
        <div className="text-sm">
          {href&&
           <Link href={href} className="font-medium text-cyan-700 hover:text-cyan-900">
           Voir tous
          </Link>}
         
        </div>
      </div>
    </div>
  );
}
