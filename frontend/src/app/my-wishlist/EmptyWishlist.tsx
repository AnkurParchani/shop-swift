import EmptyList from "../components/others/EmptyList";

const EmptyWishlist = () => {
  return (
    <EmptyList
      iconSrc="/icons/empty-wishlist.svg"
      heading="Your Wishlist is empty"
      description="Add items that you like to your wishlist. Review them anytime and easily move them to the bag."
      backButton
    />
  );
};

export default EmptyWishlist;
