import EmptyList from "../components/others/EmptyList";
import AddAddressForm from "./AddAddressForm";
import { useDisclosure } from "@nextui-org/react";

const EmptyAddresses = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <EmptyList
        iconSrc="/icons/empty-address.svg"
        heading="SAVE YOUR ADDRESSES NOW"
        description="Add your home and office addresses and enjoy faster checkout."
        backButton
        actionButtonTxt="Add Address"
        handleActionFn={onOpen}
      />

      {isOpen && (
        <AddAddressForm
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default EmptyAddresses;
