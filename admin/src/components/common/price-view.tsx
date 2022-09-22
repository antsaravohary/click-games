import usePrice from "@utils/use-price";

const PriceView = ({ amount }: any) => {
  const { price } = usePrice({ amount: amount });
  return <span>{price}</span>;
};

export default PriceView;
