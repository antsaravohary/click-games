import usePrice from "@utils/use-price";

const PriceView = ({ amount ,...props}: any) => {
  const { price } = usePrice({ amount: amount });
  return <span {...props}>{price}</span>;
};

export default PriceView;
