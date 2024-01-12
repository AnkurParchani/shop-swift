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
};

// For users
export type User = {
  id: number;
  name: string;
  email: string;
  img?: string;
  password?: string;
};

// Description for item Description
export type Description = {
  genericName: string;
  modelNumber: string;
  packer?: string;
};
