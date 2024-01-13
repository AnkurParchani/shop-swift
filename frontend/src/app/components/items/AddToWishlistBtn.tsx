import { useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useAddToWishlist } from "@/app/hooks/useWishlist";

const AddToWishlistBtn = () => {
  const mutation = useAddToWishlist();

  const [isAdded, setIsAdded] = useState(false);

  // console.log("Logging the data from addtowishlistbtn ", data);

  return (
    <div
      className="absolute right-0.5 top-0.5 z-20 text-2xl text-pink-600 "
      onClick={async (e) => {
        e.stopPropagation();
        setIsAdded((isAdded) => !isAdded);

        mutation.mutate(21);
      }}
    >
      {isAdded ? <IoMdHeart /> : <CiHeart />}
    </div>
  );
};

export default AddToWishlistBtn;
