export function formatOrderedProduct(product: any,click_game_plus) {

  return {
    product_id: product?.productId ? product.productId : product.id,
    ...(product?.variationId
      ? { variation_option_id: product.variationId }
      : {}),
    order_quantity: product.quantity,
    click_collect:product.active_click_collect,
    mode:(click_game_plus&&product.discount>0)?"CGP":"NONE",
    unit_price: product.price,
    subtotal: product.itemTotal,
  };
}
