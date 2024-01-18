import { CartItem } from "../../../global";

type CheckoutBtnType = {
  cart: CartItem[];
};

const CheckoutBtn = ({ cart }: CheckoutBtnType) => {
  return <div>{cart.length}</div>;
};

export default CheckoutBtn;
