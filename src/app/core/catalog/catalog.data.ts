import { StoreCategory, StoreProduct } from "./product.model";

/** Storefront currency is INR (₹) only. */
export const STORE_CURRENCY = "INR" as const;

export const STORE_BRAND = {
  name: "AK Fussion",
  legalName: "AK Fussion",
  tagline: "Smart shopping for everyday value",
  phone: "(+91) 8876900903",
  email: "akelectricalsbprd@gmail.com",
  address: "12 Industrial Estate, Pune, Maharashtra 411019",
  hours: "Mon - Sun / 9:00AM - 8:00PM",
  currency: STORE_CURRENCY
} as const;

/** Static demo catalog — Meesho-style categories (no API required). */
export const STATIC_CATEGORIES: StoreCategory[] = [
  {
    id: "cat-ethnic",
    name: "Ethnic Wear",
    slug: "ethnic-wear",
    description: "Kurtis, sarees & festive sets",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-western",
    name: "Western Dresses",
    slug: "western-dresses",
    description: "Dresses, tops & casual wear",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-mens",
    name: "Menswear",
    slug: "menswear",
    description: "Tees, shirts & bottoms",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-footwear",
    name: "Footwear",
    slug: "footwear",
    description: "Sneakers, sandals & flats",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-home",
    name: "Home Decor",
    slug: "home-decor",
    description: "Decor, bedding & more",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-beauty",
    name: "Beauty",
    slug: "beauty",
    description: "Skincare & personal care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Bags, jewellery & more",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "cat-grocery",
    name: "Grocery",
    slug: "grocery",
    description: "Daily essentials",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"
  }
];

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Static demo products for marketplace-style grids. */
export const STATIC_PRODUCTS: StoreProduct[] = [
  {
    id: "p1",
    sku: "ETH-KUR-001",
    name: "Printed Cotton Kurti",
    slug: "printed-cotton-kurti",
    categoryId: "cat-ethnic",
    brand: "AK Style",
    description: "Comfortable cotton kurti with festive print. Ideal for daily wear and casual outings.",
    price: 299,
    compareAtPrice: 599,
    currency: "INR",
    unit: "pcs",
    rating: 4.2,
    reviewCount: 1284,
    inStock: true,
    badge: "sale",
    image: img("photo-1610030469983-98e550d6193c"),
    features: ["Pure cotton", "Machine wash", "Free size available"]
  },
  {
    id: "p2",
    sku: "ETH-SAR-002",
    name: "Banarasi Silk Saree",
    slug: "banarasi-silk-saree",
    categoryId: "cat-ethnic",
    brand: "AK Style",
    description: "Classic silk saree with woven border. Perfect for weddings and festive occasions.",
    price: 899,
    compareAtPrice: 1499,
    currency: "INR",
    unit: "pcs",
    rating: 4.5,
    reviewCount: 642,
    inStock: true,
    badge: "featured",
    image: img("photo-1583391733956-375ffbf997ce"),
    features: ["Silk blend", "With blouse piece", "Dry clean preferred"]
  },
  {
    id: "p3",
    sku: "WES-DRS-003",
    name: "Floral A-Line Dress",
    slug: "floral-a-line-dress",
    categoryId: "cat-western",
    brand: "AK Style",
    description: "Light floral A-line dress with soft lining. Easy everyday western look.",
    price: 449,
    compareAtPrice: 799,
    currency: "INR",
    unit: "pcs",
    rating: 4.1,
    reviewCount: 890,
    inStock: true,
    badge: "sale",
    image: img("photo-1496747611176-843222e1e57c"),
    features: ["Soft fabric", "Knee length", "Sizes S–XL"]
  },
  {
    id: "p4",
    sku: "WES-TOP-004",
    name: "Casual Crop Top",
    slug: "casual-crop-top",
    categoryId: "cat-western",
    brand: "AK Style",
    description: "Trendy crop top for casual styling with jeans or skirts.",
    price: 199,
    compareAtPrice: 399,
    currency: "INR",
    unit: "pcs",
    rating: 3.9,
    reviewCount: 412,
    inStock: true,
    badge: "new",
    image: img("photo-1434389677669-e08b4cac3105"),
    features: ["Stretch cotton", "Regular fit"]
  },
  {
    id: "p5",
    sku: "MEN-TEE-005",
    name: "Men Solid Round Neck Tee",
    slug: "men-solid-round-neck-tee",
    categoryId: "cat-mens",
    brand: "AK Men",
    description: "Everyday cotton tee with soft hand-feel and regular fit.",
    price: 249,
    compareAtPrice: 499,
    currency: "INR",
    unit: "pcs",
    rating: 4.3,
    reviewCount: 2103,
    inStock: true,
    badge: "sale",
    image: img("photo-1521572163474-6864f9cf17ab"),
    features: ["100% cotton", "Bio-washed", "Sizes M–XXL"]
  },
  {
    id: "p6",
    sku: "MEN-SHT-006",
    name: "Checked Casual Shirt",
    slug: "checked-casual-shirt",
    categoryId: "cat-mens",
    brand: "AK Men",
    description: "Lightweight checked shirt for office-casual and weekend wear.",
    price: 499,
    compareAtPrice: 899,
    currency: "INR",
    unit: "pcs",
    rating: 4.0,
    reviewCount: 756,
    inStock: true,
    image: img("photo-1596755094514-f87e34085b2c"),
    features: ["Full sleeves", "Regular collar"]
  },
  {
    id: "p7",
    sku: "FTW-SNK-007",
    name: "Mens Running Sneakers",
    slug: "mens-running-sneakers",
    categoryId: "cat-footwear",
    brand: "AK Walk",
    description: "Cushioned soles and breathable mesh upper for daily walks and workouts.",
    price: 799,
    compareAtPrice: 1299,
    currency: "INR",
    unit: "pair",
    rating: 4.4,
    reviewCount: 1540,
    inStock: true,
    badge: "featured",
    image: img("photo-1542291026-7eec264c27ff"),
    features: ["Anti-slip sole", "Sizes 6–11"]
  },
  {
    id: "p8",
    sku: "FTW-SND-008",
    name: "Women Comfort Sandals",
    slug: "women-comfort-sandals",
    categoryId: "cat-footwear",
    brand: "AK Walk",
    description: "Soft footbed sandals for all-day comfort.",
    price: 349,
    compareAtPrice: 699,
    currency: "INR",
    unit: "pair",
    rating: 4.1,
    reviewCount: 988,
    inStock: true,
    badge: "sale",
    image: img("photo-1543163521-1bfcec4bb9d2"),
    features: ["Lightweight", "Sizes 4–8"]
  },
  {
    id: "p9",
    sku: "HOM-VAS-009",
    name: "Ceramic Flower Vase",
    slug: "ceramic-flower-vase",
    categoryId: "cat-home",
    brand: "AK Home",
    description: "Minimal ceramic vase for living room and shelf styling.",
    price: 279,
    compareAtPrice: 549,
    currency: "INR",
    unit: "pcs",
    rating: 4.6,
    reviewCount: 321,
    inStock: true,
    badge: "new",
    image: img("photo-1586023492125-27b2c045efd7"),
    features: ["Handmade look", "Gift ready"]
  },
  {
    id: "p10",
    sku: "HOM-CUSH-010",
    name: "Printed Cushion Cover Set",
    slug: "printed-cushion-cover-set",
    categoryId: "cat-home",
    brand: "AK Home",
    description: "Set of 2 soft cushion covers with modern print.",
    price: 199,
    compareAtPrice: 399,
    currency: "INR",
    unit: "set",
    rating: 4.0,
    reviewCount: 510,
    inStock: true,
    image: img("photo-1555041469-a586c61ea9bc"),
    features: ["16x16 inch", "Zip closure"]
  },
  {
    id: "p11",
    sku: "BEA-CRM-011",
    name: "Vitamin C Face Cream",
    slug: "vitamin-c-face-cream",
    categoryId: "cat-beauty",
    brand: "AK Glow",
    description: "Daily brightening cream with vitamin C for soft, hydrated skin.",
    price: 179,
    compareAtPrice: 349,
    currency: "INR",
    unit: "pcs",
    rating: 4.2,
    reviewCount: 1876,
    inStock: true,
    badge: "sale",
    image: img("photo-1596462502278-27bfdc403348"),
    features: ["50 ml", "For all skin types"]
  },
  {
    id: "p12",
    sku: "BEA-LIP-012",
    name: "Matte Lipstick Combo",
    slug: "matte-lipstick-combo",
    categoryId: "cat-beauty",
    brand: "AK Glow",
    description: "Long-wear matte lipstick pack with 3 everyday shades.",
    price: 229,
    compareAtPrice: 449,
    currency: "INR",
    unit: "set",
    rating: 4.3,
    reviewCount: 2201,
    inStock: true,
    badge: "featured",
    image: img("photo-1586495777744-4413f21062fa"),
    features: ["Transfer resistant", "3 shades"]
  },
  {
    id: "p13",
    sku: "ACC-BAG-013",
    name: "Women Handbag",
    slug: "women-handbag",
    categoryId: "cat-accessories",
    brand: "AK Carry",
    description: "Spacious handbag with multiple compartments for daily use.",
    price: 549,
    compareAtPrice: 999,
    currency: "INR",
    unit: "pcs",
    rating: 4.1,
    reviewCount: 734,
    inStock: true,
    image: img("photo-1590874103328-eac38a683ce7"),
    features: ["PU leather", "Adjustable strap"]
  },
  {
    id: "p14",
    sku: "ACC-EAR-014",
    name: "Oxidised Earrings Set",
    slug: "oxidised-earrings-set",
    categoryId: "cat-accessories",
    brand: "AK Carry",
    description: "Traditional oxidised earrings for ethnic and festive looks.",
    price: 149,
    compareAtPrice: 299,
    currency: "INR",
    unit: "pair",
    rating: 4.4,
    reviewCount: 1120,
    inStock: true,
    badge: "sale",
    image: img("photo-1535632066927-ab7c9ab60908"),
    features: ["Nickel free", "Lightweight"]
  },
  {
    id: "p15",
    sku: "GRO-RICE-015",
    name: "Premium Basmati Rice 1kg",
    slug: "premium-basmati-rice-1kg",
    categoryId: "cat-grocery",
    brand: "AK Fresh",
    description: "Aged basmati rice for everyday cooking and special meals.",
    price: 129,
    compareAtPrice: 169,
    currency: "INR",
    unit: "pack",
    rating: 4.5,
    reviewCount: 456,
    inStock: true,
    image: img("photo-1586201375761-83865001e31c"),
    features: ["1 kg pack", "Long grain"]
  },
  {
    id: "p16",
    sku: "GRO-OIL-016",
    name: "Cold Pressed Mustard Oil 1L",
    slug: "cold-pressed-mustard-oil-1l",
    categoryId: "cat-grocery",
    brand: "AK Fresh",
    description: "Pure cold-pressed mustard oil for cooking and pickles.",
    price: 189,
    compareAtPrice: 229,
    currency: "INR",
    unit: "bottle",
    rating: 4.3,
    reviewCount: 602,
    inStock: true,
    badge: "new",
    image: img("photo-1474979266404-7eaacbcd87c5"),
    features: ["1 litre", "No additives"]
  }
];

export type NavChild = { label: string; route: string };
export type NavItem = {
  id: string;
  label: string;
  route: string;
  children?: readonly NavChild[];
};

export const STATIC_NAV: readonly NavItem[] = [
  { id: "n1", label: "Home", route: "/home" },
  {
    id: "n2",
    label: "Women Ethnic",
    route: "/shop/ethnic-wear",
    children: [
      { label: "All Ethnic Wear", route: "/shop/ethnic-wear" },
      { label: "Kurtis", route: "/shop/ethnic-wear" },
      { label: "Sarees", route: "/shop/ethnic-wear" },
      { label: "Lehengas", route: "/shop/ethnic-wear" },
      { label: "Salwar Suits", route: "/shop/ethnic-wear" },
      { label: "Dupattas", route: "/shop/ethnic-wear" }
    ]
  },
  {
    id: "n3",
    label: "Women Western",
    route: "/shop/western-dresses",
    children: [
      { label: "All Western", route: "/shop/western-dresses" },
      { label: "Dresses", route: "/shop/western-dresses" },
      { label: "Tops", route: "/shop/western-dresses" },
      { label: "Jeans", route: "/shop/western-dresses" },
      { label: "Skirts", route: "/shop/western-dresses" },
      { label: "Jumpsuits", route: "/shop/western-dresses" }
    ]
  },
  {
    id: "n4",
    label: "Men",
    route: "/shop/menswear",
    children: [
      { label: "All Menswear", route: "/shop/menswear" },
      { label: "T-shirts", route: "/shop/menswear" },
      { label: "Shirts", route: "/shop/menswear" },
      { label: "Jeans", route: "/shop/menswear" },
      { label: "Ethnic Wear", route: "/shop/menswear" },
      { label: "Innerwear", route: "/shop/menswear" }
    ]
  },
  {
    id: "n5",
    label: "Kids",
    route: "/shop/footwear",
    children: [
      { label: "Boys Clothing", route: "/shop/footwear" },
      { label: "Girls Clothing", route: "/shop/footwear" },
      { label: "Toys", route: "/shop/footwear" },
      { label: "Baby Care", route: "/shop/footwear" }
    ]
  },
  {
    id: "n6",
    label: "Home & Kitchen",
    route: "/shop/home-decor",
    children: [
      { label: "All Home Decor", route: "/shop/home-decor" },
      { label: "Bedding", route: "/shop/home-decor" },
      { label: "Kitchen Tools", route: "/shop/home-decor" },
      { label: "Cushions", route: "/shop/home-decor" },
      { label: "Lighting", route: "/shop/home-decor" }
    ]
  },
  {
    id: "n7",
    label: "Beauty",
    route: "/shop/beauty",
    children: [
      { label: "All Beauty", route: "/shop/beauty" },
      { label: "Skincare", route: "/shop/beauty" },
      { label: "Makeup", route: "/shop/beauty" },
      { label: "Hair Care", route: "/shop/beauty" },
      { label: "Fragrance", route: "/shop/beauty" }
    ]
  },
  {
    id: "n8",
    label: "Jewellery",
    route: "/shop/accessories",
    children: [
      { label: "All Jewellery", route: "/shop/accessories" },
      { label: "Earrings", route: "/shop/accessories" },
      { label: "Necklaces", route: "/shop/accessories" },
      { label: "Bangles", route: "/shop/accessories" },
      { label: "Rings", route: "/shop/accessories" }
    ]
  },
  {
    id: "n9",
    label: "Bags & Footwear",
    route: "/shop/footwear",
    children: [
      { label: "All Footwear", route: "/shop/footwear" },
      { label: "Sneakers", route: "/shop/footwear" },
      { label: "Sandals", route: "/shop/footwear" },
      { label: "Handbags", route: "/shop/accessories" },
      { label: "Clutches", route: "/shop/accessories" }
    ]
  },
  {
    id: "n10",
    label: "Grocery",
    route: "/shop/grocery",
    children: [
      { label: "All Grocery", route: "/shop/grocery" },
      { label: "Staples", route: "/shop/grocery" },
      { label: "Snacks", route: "/shop/grocery" },
      { label: "Beverages", route: "/shop/grocery" },
      { label: "Oils & Ghee", route: "/shop/grocery" }
    ]
  }
];

export const STATIC_BANNERS = [
  {
    title: "Mega Blockbuster Sale",
    subtitle: "Smart shopping trusted by millions",
    cta: "Shop Now",
    link: "/shop",
    tone: "magenta"
  },
  {
    title: "Up to 80% Off*",
    subtitle: "Ethnic, western, home & more",
    cta: "Explore deals",
    link: "/shop",
    tone: "dark"
  }
] as const;

