"use client";

import { useState } from "react";
import { Button, CardFooter, useDisclosure } from "@nextui-org/react";

import Loading from "../loading";
import Error from "../error";
import EmptyAddresses from "./EmptyAddresses";
import AddAddressForm from "./AddAddressForm";
import DeleteAddressModal from "./DeleteAddressModal";
import UpdateAddressModal from "./UpdateAddressModal";
import AddressBox from "../components/others/AddressBox";
import BreadCrumb from "../components/others/BreadCrumb";

import { Address } from "../../../global";
import { useGetMyAddresses } from "../hooks/useAddress";
import Footer from "../components/others/Footer";

const Page = () => {
  const [address, setAddress] = useState<Address | null>();
  const [addressId, setAddressId] = useState<number>(0);
  const { data: addresses, isLoading, error, refetch } = useGetMyAddresses();
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
  if (error) return <Error error={error} reset={refetch} />;
  if (addresses && addresses.length === 0) return <EmptyAddresses />;

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-5">
        <div className="flex justify-between">
          <p className="flex items-center gap-1 text-lg font-semibold text-content1-400">
            Address{" "}
            <span className="text-sm">({addresses.length} addresses)</span>
          </p>

          <Button
            className="bg-content1-200"
            size="sm"
            onPress={addAddressOnOpen}
          >
            Add new Address
          </Button>
        </div>

        <BreadCrumb curPage="Addresses" />

        <div className="mt-4 flex flex-col gap-4 ">
          {addresses.map((address: Address) => (
            <AddressBox key={address.id} address={address}>
              <CardFooter className="flex justify-end gap-3">
                <Button
                  size="sm"
                  onPress={() => {
                    setAddress(address);
                    updateAddressOnOpen();
                  }}
                  className="border-2 border-content1-600"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
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
        </div>

        <Button
          radius="sm"
          className="mt-3 bg-content1-400 text-white"
          onPress={addAddressOnOpen}
        >
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

      <Footer />
    </>
  );
};

export default Page;
