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
};
