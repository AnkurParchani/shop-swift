"use client";

import { useState } from "react";
import { Button, CardFooter, useDisclosure } from "@nextui-org/react";

import Loading from "../loading";
import EmptyAddresses from "./EmptyAddresses";
import AddAddressForm from "./AddAddressForm";
import DeleteAddressModal from "./DeleteAddressModal";

import { useGetMyAddresses } from "../hooks/useAddress";
import { Address } from "../../../global";
import UpdateAddressModal from "./UpdateAddressModal";
import AddressBox from "../components/others/AddressBox";

const Page = () => {
  const [address, setAddress] = useState<Address | null>();
  const [addressId, setAddressId] = useState<number>(0);
  const { data: addresses, isLoading, error } = useGetMyAddresses();
  const {
    isOpen: addAddressIsOpen,
    onOpen: addAddressOnOpen,
    onClose: addAddressOnClose,
    onOpenChange: addAddressOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: updateAddressIsOpen,
    onOpen: updateAddressOnOpen,
    onClose: updateAddressOnClose,
    onOpenChange: updateAddressOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: deleteAddressIsOpen,
    onOpen: deleteAddressOnOpen,
    onClose: deleteAddressOnClose,
    onOpenChange: deleteAddressOnOpenChange,
  } = useDisclosure();

  if (isLoading) return <Loading />;
  if (addresses && addresses.length === 0) return <EmptyAddresses />;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
      <div className="flex justify-between">
        <p className="flex items-center gap-1 text-lg font-semibold text-primary">
          Address{" "}
          <span className="text-sm">({addresses.length} addresses)</span>
        </p>

        <Button color="secondary" size="sm" onPress={addAddressOnOpen}>
          Add new Address
        </Button>
      </div>

      {addresses.map((address: Address) => (
        <AddressBox key={address.id} address={address}>
          <CardFooter className="flex justify-end gap-3">
            <Button
              onPress={() => {
                setAddress(address);
                updateAddressOnOpen();
              }}
              color="default"
            >
              Edit
            </Button>
            <Button
              onPress={() => {
                setAddressId(address.id);
                deleteAddressOnOpen();
              }}
              color="danger"
            >
              Delete
            </Button>
          </CardFooter>
        </AddressBox>
      ))}

      <Button color="secondary" onPress={addAddressOnOpen}>
        Add new Address
      </Button>

      {addAddressIsOpen && (
        <AddAddressForm
          isOpen={addAddressIsOpen}
          onClose={addAddressOnClose}
          onOpenChange={addAddressOnOpenChange}
        />
      )}

      {updateAddressIsOpen && (
        <UpdateAddressModal
          address={address as Address}
          isOpen={updateAddressIsOpen}
          onClose={updateAddressOnClose}
          onOpenChange={updateAddressOnOpenChange}
        />
      )}

      {deleteAddressIsOpen && (
        <DeleteAddressModal
          addressId={addressId}
          isOpen={deleteAddressIsOpen}
          onClose={deleteAddressOnClose}
          onOpenChange={deleteAddressOnOpenChange}
        />
      )}
    </div>
  );
};

export default Page;
