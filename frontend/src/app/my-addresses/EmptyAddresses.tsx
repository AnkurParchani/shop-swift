import EmptyList from "../components/others/EmptyList";

const EmptyAddresses = () => {
  return (
    <EmptyList
      iconSrc="/icons/empty-address.svg"
      heading="SAVE YOUR ADDRESSES NOW"
      description="Add your home and office addresses and enjoy faster checkout."
      backButton
      actionButtonTxt="Add Address"
    />
  );
};

export default EmptyAddresses;
