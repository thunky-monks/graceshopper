export const ALL_PRODUCTS_HEADER = 'Our Websites';
export const CART_HEADER = 'Shopping Cart';
export const WEBSITE_HEADER = 'E-Commerce-Commerce';
export const WEBSITE_SUB_HEADER = 'An E-Commerce-Commerce Company';
export const ORDER_HISTORY_PANEL_LABEL = order => {
  return `Date Purchased: (${order.datePurchased.slice(
    0,
    10
  )}) Total: $${order.products.reduce((sum, product) => {
    console.log(product.product_cart.quantity);
    return (
      sum +
      +(product.product_cart.priceAtPurchase * product.product_cart.quantity)
    );
  }, 0)}`;
};
