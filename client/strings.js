export const ALL_PRODUCTS_HEADER = 'Our Websites'
export const CART_HEADER = 'Shopping Cart'
export const WEBSITE_HEADER = 'E-Commerce-Commerce'
export const WEBSITE_SUB_HEADER = 'An E-Commerce-Commerce Company'
export const ORDER_HISTORY_PANEL_LABEL = order =>
  `Date Purchased: (${order.datePurchased}) Total: $${order.products.reduce(
    (sum, product) => {
      return sum + product.product_cart.priceAtPurchase
    },
    0
  )}`
