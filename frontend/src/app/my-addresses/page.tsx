"use client";

import Loading from "../loading";
import EmptyAddresses from "./EmptyAddresses";

import { useGetAddresses } from "../hooks/useAddress";
import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import AddAddressForm from "./AddAddressForm";

const Page = () => {
  const { data: addresses, isLoading, error } = useGetAddresses();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  if (isLoading) return <Loading />;
  if (addresses && addresses.length === 0) return <EmptyAddresses />;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
      <div className="flex justify-between">
        <p className="flex items-center gap-1 text-lg font-semibold text-primary">
          {/* Wishlist <span className="text-sm">({wishlist.length} addresses)</span> */}
          You have address
        </p>
      </div>

      {/* @ts-ignore */}
      {addresses.map((address, i) => {
        return <p key={i}> This is a new Adress</p>;
      })}

      <Button onClick={onOpen}>Add Address</Button>
      {isOpen && (
        <AddAddressForm
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
};

export default Page;
