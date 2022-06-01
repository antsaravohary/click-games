import React from 'react';
import { FormattedMessage } from 'react-intl';
import Carousel from 'components/carousel/carousel';
import PaymentCard from '../payment-card/payment-card';
import { Plus } from 'assets/icons/PlusMinus';
import Button from "@components/ui/button";
import Card from './card';
import { PlusIcon } from '@components/icons/plus-icon';
import { useTranslation } from 'next-i18next';

interface PaymentCardType {
  id: number | string;
  type: string;
  lastFourDigit: string;
  name: string;
}

interface PaymentOptionType {
  showCard?: boolean;
  addedCard?: PaymentCardType[];
  mobileWallet?: boolean;
  cashOnDelivery?: boolean;
}

interface PaymentGroupProps {
  id?: any;
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  name: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  defaultPayementMethod?: any
  value?: string;
  onChange: Function;
  items: any;
  onDelete: any;
  handleAddNewCard: any;
}

const PaymentGroup: React.FunctionComponent<PaymentGroupProps> = ({
  items,
  deviceType,
  className,
  name,
  onChange,
  onDelete,
  defaultPayementMethod,
  handleAddNewCard,
}) => {
  // RadioGroup State

  // Handle onChange Func
  const handleChange = (item: any) => {
    onChange(item);
  };
  const { t } = useTranslation("common");
  return (
    <>
      {/* {deviceType === 'desktop' && ( */}
      <div className="flex">
      <h1 className="flex-auto text-xl font-semibold">
        Paiement
      </h1>
      <button
            className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 focus:outline-none focus:text-accent-hover hover:text-accent-hover"
            
          >
            <PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
            {t("text-add")}{" "}
            <span className="hidden sm:inline-block sm:ms-1">
                paiement
            </span>
          </button>
      </div>
    
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        <div className="relative p-4 rounded border bg-primary cursor-pointer group hover:border-accent">
          <Card id="0"
            name="orelien"
            cardType="visa"
            lastFourDigit="2152"
            color="" />
            
        </div>

        <div className="relative p-4 rounded border bg-primary cursor-pointer group hover:border-accent">
          <Card id="0"
            name="orelien"
            cardType="visa"
            lastFourDigit="2152"
            color="" />
            
        </div>
      </div>

    </>
  );
};

export default PaymentGroup;
