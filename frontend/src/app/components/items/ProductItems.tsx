import ProductItem from "./ProductItem";

import { Item } from "../../../../global";

const ProductItems = ({ items }: { items: Item[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-10">
      {items.map((item: Item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductItems;
