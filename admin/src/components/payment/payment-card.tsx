import MasterCard from './image/master-card.png';
import Paypal from './image/paypal.png';
import Visa from './image/visa.png';

type Props= {
  id: string;
  name: string;
  onClick:any;
  cardType: string;
  lastFourDigit: string;
  color: string;
  expire:string;
  active:boolean;
}

const PaymentCard = ({ id,name,cardType,lastFourDigit,color,expire,active,onClick}:Props) => {
  const logo:any =(cardType === 'paypal' && Paypal) ||
              (cardType === 'master' && MasterCard) ||
              (cardType === 'visa' && Visa);
  return (
    <div className={`space-y-16 rounded-2xl  hover:shadow-2xl hover:border-4 hover:border-indigo-700 hover:scale-105 shadow-xl ${active &&" shadow-2xl border-4 border-indigo-700 scale-105"}`}>
    <div className={`w-52 h-32 m-auto bg-red-100 rounded-xl  relative text-white overflow-hidden  transition-transform transform  cursor-pointer `} >
        <img
          className="relative object-cover w-full h-full rounded-xl"
          src="https://i.imgur.com/kGkSg1v.png"
        />
        <div className="w-full px-2 absolute top-2 
        "
        onClick={onClick}
        >
          <div className="flex justify-between">
            <div>
              <p className="font-light text-xs">Nom</p>
              <p className="font-medium tracking-widest text-xs">{name}</p>
            </div>
            <img className={`w-10 h-auto`} src={logo.src} />
          </div>
          <div className="pt-1">
            <p className="font-light text-xs">Numéro de carte</p>
            <p className="font-medium tracking-more-wider text-xs">
              **** **** **** {lastFourDigit}
            </p>
          </div>
          <div className="pt-2 pr-2">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs text-xs">Validité</p>
                <p className="font-medium tracking-wider text-sm text-xs">{expire}</p>
              </div>
             
              <div>
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">···</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentCard;