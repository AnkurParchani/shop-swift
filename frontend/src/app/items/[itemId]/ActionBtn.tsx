import { Button } from "@nextui-org/react";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

const ActionBtn = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button color="primary" variant="solid">
        <CiShoppingCart style={{ fontSize: "25px" }} />
        Add to Cart
      </Button>
      <Button color="primary" variant="flat">
        <CiHeart style={{ fontSize: "25px" }} />
        Add to Wishlist
      </Button>
    </div>
  );
};

export default ActionBtn;
