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
  extraDetails: object;
  numReviews: number;
  ratings: number;
  company: string;
  image?: string;
  images?: Image[];
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
};
