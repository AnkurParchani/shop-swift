"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../others/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../others/EyeFilledIcon";
import { FieldValues, UseFormRegister } from "react-hook-form";

const InputPassword = ({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...register("password")}
      label="Password"
      variant="bordered"
      size="lg"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
  );
};

export default InputPassword;
