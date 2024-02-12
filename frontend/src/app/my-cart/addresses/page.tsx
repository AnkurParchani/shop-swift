"use client";

import { useRouter } from "next/navigation";
import { useGetMyAddresses, useUpdateAddress } from "@/app/hooks/useAddress";
import { useGetMyCart } from "@/app/hooks/useCart";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";

import AddAddressForm from "@/app/my-addresses/AddAddressForm";
import PricingBtn from "./PricingBtn";
import Error from "@/app/error";
import EmptyCart from "../EmptyCart";
import BreadCrumb from "@/app/components/others/BreadCrumb";

import { Address } from "../../../../global";
import { useEffect } from "react";
import { useBreadcrumb } from "@/app/contexts/BreadCrumbProvider";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useGetUser } from "@/app/hooks/useUser";

const Page = () => {
  const router = useRouter();
  const { data: user } = useGetUser();
  if (!user) router.push("/login");

  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const { setPrevPages } = useBreadcrumb();
  const {
    data: addresses,
    refetch: myAddressesRefetch,
    error: myAddressesError,
  } = useGetMyAddresses();
  const {
    data: cart,
    refetch: myCartRefetch,
    error: myCartError,
  } = useGetMyCart();

  const updateAddressMutation = useUpdateAddress();
  const {
    isOpen: addAddressIsOpen,
    onOpen: addAddressOnOpen,
    onClose: addAddressOnClose,
    onOpenChange: addAddressOnOpenChange,
  } = useDisclosure();

  // Setting the breadcrumb previous pages
  useEffect(() => {
    setPrevPages([{ label: "Cart", link: "/my-cart" }]);
  }, [setPrevPages]);

  // If there's error in getting cart or addresses
  if (myAddressesError)
    return <Error error={myAddressesError} reset={myAddressesRefetch} />;
  if (myCartError) return <Error error={myCartError} reset={myCartRefetch} />;

  // If there are no products in cart and someone has intentionally made a request to this page
  if (!cart || cart.length === 0) return <EmptyCart />;

  // Sorting the address according the the isDeliveryAddress = true
  const sortedAddress = addresses?.sort((a: Address, b: Address) =>
    a.isDeliveryAddress === b.isDeliveryAddress
      ? 0
      : a.isDeliveryAddress
        ? -1
        : 1,
  );
  const hasDeliveryAddress = sortedAddress?.[0]?.isDeliveryAddress;

  function handleChangeDefaultAddress(addressId: number, address: Address) {
    if (address.isDeliveryAddress) return;
    updateAddressMutation.mutate(
      {
        addressId,
        address: { ...address, isDeliveryAddress: !address.isDeliveryAddress },
      },
      {
        onSuccess: () =>
          toast("Default delivery Address changed", { type: "info" }),
      },
    );
  }

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
        <BreadCrumb size="sm" curPage="Addresses" nextPages={["Payment"]} />

        <p className="text-center text-xs font-semibold text-warning">
          Please choose an address for the shipment of your Order
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:gap-8">
          {sortedAddress?.map((address: Address) => {
            const {
              id,
              isDeliveryAddress,
              lastName,
              firstName,
              phoneNumber,
              gender,
              flatNumber,
              street,
              city,
              country,
              state,
            } = address;

            return (
              <Card
                key={id}
                className={`relative mx-auto w-full border border-content1-500 bg-transparent duration-100 sm:w-11/12 ${
                  !isDeliveryAddress &&
                  "cursor-pointer opacity-60 hover:opacity-80"
                }
                    ${bgTheme === "dark" ? "text-foreground" : "text-black"}
                  `}
              >
                <div onClick={() => handleChangeDefaultAddress(id, address)}>
                  <CardHeader className="flex gap-3">
                    <div
                      className={`h-8 w-8 rounded-md ${
                        isDeliveryAddress ? "bg-green-600" : "bg-red-500"
                      }`}
                    />
                    <div className="flex flex-col">
                      <p className="text-md capitalize">
                        {firstName} {lastName}{" "}
                        <span className="text-sm text-gray-500">
                          ({gender === "female" ? "F" : "M"})
                        </span>
                      </p>
                      <p className="text-small text-default-500">
                        {phoneNumber}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider className="bg-content1-500" />
                  <CardBody className="flex flex-col gap-1 text-sm capitalize">
                    {flatNumber && <p>{flatNumber},</p>}
                    {street && <p>{street},</p>}
                    <p>{city},</p>
                    <p>
                      {state}, {country}
                    </p>
                  </CardBody>
                </div>
              </Card>
            );
          })}
        </div>

        <div
          className={`${
            hasDeliveryAddress ? "mb-16" : "mb-0"
          } grid grid-cols-2 gap-3`}
        >
          <Button
            radius="sm"
            className={`border-content1-400 ${
              bgTheme === "dark" ? "text-foreground" : "text-black"
            }`}
            variant="bordered"
            onPress={() => router.push("/my-addresses")}
          >
            To Address Page
          </Button>
          <Button
            radius="sm"
            className="bg-content1-600 text-white"
            onPress={addAddressOnOpen}
          >
            Add new Address
          </Button>
        </div>

        {hasDeliveryAddress && <PricingBtn />}
      </div>

      {addAddressIsOpen && (
        <AddAddressForm
          isOpen={addAddressIsOpen}
          onClose={addAddressOnClose}
          onOpenChange={addAddressOnOpenChange}
        />
      )}
    </>
  );
};

export default Page;
