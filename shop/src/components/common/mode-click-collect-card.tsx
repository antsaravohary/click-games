import { useTranslation } from "next-i18next";

interface ICardItem {
  id: string | number;
  title: string;
  description: string;
  address?: any;
  // default: boolean;
}
interface Props {
  count?: number;
}

const ModeClickCollectCard = ({ count }: Props) => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div className="flex items-center space-s-3 md:space-s-4">
          {count && (
            <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
              {count}
            </span>
          )}
          <p className="text-lg lg:text-xl text-heading">Mode de livraison</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative p-4 rounded border cursor-pointer group hover:border-accent border-accent shadow-sm">
          <p className="text-sm text-heading font-semibold mb-3 capitalize">
            CLICK&COLLECT
          </p>
          <p className="text-sm text-sub-heading">Gratuit</p>
          <div className="absolute top-4 end-4 flex space-s-2 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </>
  );
};

export default ModeClickCollectCard;
