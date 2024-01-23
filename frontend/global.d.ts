// For Items
export type Item = {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  inStock: boolean;
  about: string;
  for_gender: "male" | "female" | "unisex";
  description: object;
  extraDetails: ExtraDetails;
  numReviews: number;
  ratings: number;
  company: string;
  image?: string;
  images?: Image[];
};

export type ExtraDetails = {
  colors?: { color: string; hex: string }[];
  hexColor?: string;
  maxOrderQuantity: number;
  size: string;
};

// For users
export type User = {
  id: number;
  name: string;
  email: string;
  image: Image;
  password?: string;
  img?: string;
};

// Seperate ImageType
export type Image = {
  id: number;
  isItemExtraImg: boolean;
  isItemMainImg: boolean;
  isUserImg: boolean;
  path: string;
  userId: number;
};

// Description for item Description
export type Description = {
  genericName: string;
  modelNumber: string;
  packer?: string;
};

// Wishlist item type
export type WishlistItem = {
  date: string;
  id: number;
  item: Item;
  itemId: number;
  userId: number;
};

// Address type
export type Address = {
  city: string;
  country: string;
  firstName: string;
  lastName?: string;
  flatNumber: string;
  gender: "male" | "female";
  phoneNumber: number;
  street: string;
  userId: number;
  id: number;
  isDeliveryAddress: boolean;
  state: string;
};

// Cart type
export type CartItem = {
  id: number;
  isChecked: boolean;
  quantity: number;
  size?: string;
  price: number;
  color?: string;
  userId: number;
  itemId: number;
  item: Item;
};

// Single order type
export type OrderItem = {
  color: string | null;
  id: number;
  itemId: number;
  orderId: number;
  quantity: number;
  size: null | string;
  item?: Item;
};

// Order type
export type Order = {
  date: string;
  id: number;
  userId: number;
  orderItems: OrderItem[];
};
