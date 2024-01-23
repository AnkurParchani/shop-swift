import React from "react";
import { Address } from "../../../../global";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";

const AddressBox = ({
  address,
  children,
}: {
  address: Address;
  children?: React.ReactNode;
}) => {
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
      {children && <Divider />}
      {children}
    </Card>
  );
};

export default AddressBox;
