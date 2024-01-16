"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";

import Loading from "../loading";
import EmptyAddresses from "./EmptyAddresses";
import AddAddressForm from "./AddAddressForm";
import DeleteAddressModal from "./DeleteAddressModal";

import { useGetAddresses } from "../hooks/useAddress";
import { Address } from "../../../global";
import UpdateAddressModal from "./UpdateAddressModal";

const Page = () => {
  const [address, setAddress] = useState<Address | null>();
  const [addressId, setAddressId] = useState<number>(0);
  const { data: addresses, isLoading, error } = useGetAddresses();
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

      {/* @ts-ignore */}
      {addresses.map((address: Address) => {
        const {
          id,
          firstName,
          lastName,
          phoneNumber,
          street,
          country,
          flatNumber,
          city,
          gender,
          isDeliveryAddress,
          state,
        } = address;

        return (
          <Card key={id} className="relative max-w-[400px]">
            <CardHeader className="flex gap-3">
              <div
                className={`h-8 w-8 rounded-md ${
                  isDeliveryAddress ? "bg-green-600" : "bg-default"
                }`}
              />
              <div className="flex flex-col">
                <p className="text-md capitalize">
                  {firstName} {lastName}{" "}
                  <span className="text-sm text-gray-500">
                    ({gender === "female" ? "F" : "M"})
                  </span>
                </p>
                <p className="text-small text-default-500">{phoneNumber}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-1 text-sm capitalize">
              {flatNumber && <p>{flatNumber},</p>}
              {street && <p>{street},</p>}
              <p>{city},</p>
              <p>
                {state}, {country}
              </p>
            </CardBody>
            <Divider />
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
                  setAddressId(id);
                  deleteAddressOnOpen();
                }}
                color="danger"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        );
      })}

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
