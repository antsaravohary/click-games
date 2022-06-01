import React from 'react';
import MasterCard from './image/master-card.png';
import Paypal from './image/paypal.png';
import Visa from './image/visa.png';


interface Props {
  id: string;
  name: string;
  cardType: string;
  lastFourDigit: string;
  color: string;
}

const Card: React.FC<Props> = ({
  id,
  name,
  cardType,
  lastFourDigit,
  color,
}) => {
  const logo =
    (cardType === 'paypal' && Paypal) ||
    (cardType === 'master' && MasterCard) ||
    (cardType === 'visa' && Visa);

  return (
    <div className="payment-card" color={color}>
      <div>
        <img src={logo} alt={`card-${id}`} />
      </div>
      <div>Card Number</div>
      <div>
        <span>****</span>
        <span>****</span>
        <span>****</span>
        <span className="card-number">{lastFourDigit}</span>
      </div>
      <div>{name}</div>
    </div>
  );
};

export default Card;
