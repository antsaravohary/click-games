import isEmpty from "lodash/isEmpty";
interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  pre_order:boolean;
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}
interface Variation {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation,click_game_plus:boolean) {
  const { id, name, slug, image, price, sale_price,pre_order, quantity, unit,click_collect, shop,discount } = item;
  if (!isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${name} - ${variation.title}`,
      active_click_collect:false,
      click_collect,
      pre_order,
      shop,
      discount,
      slug,
      unit,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: image?.thumbnail,
      variationId: variation.id,
    };
  }
  return {
    id,
    name,
    slug,
    discount,
    unit,
    active_click_collect:false,
    click_collect,
    pre_order,
    shop,
    image: image?.thumbnail,
    stock: quantity,
    original_price:price,
    click_game_plus,
    sale_price:sale_price,
    price: sale_price&&click_game_plus ? sale_price : price,
  };
}
