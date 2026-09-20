/** Contact / chrome defaults. Catalog categories and products load from cursor-node-api. */

/** Storefront currency is INR (₹) only. */
export const STORE_CURRENCY = "INR" as const;

export const STORE_BRAND = {
  name: "AK Electricals",
  tagline: "Welcome to our market!",
  phone: "(+91) 8876900903",
  email: "akelectricalsbprd@gmail.com",
  address: "12 Industrial Estate, Pune, Maharashtra 411019",
  hours: "Mon - Sun / 9:00AM - 8:00PM",
  currency: STORE_CURRENCY
} as const;
