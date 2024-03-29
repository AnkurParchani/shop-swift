"use client";

import React, { ChangeEventHandler, useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../others/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../others/EyeFilledIcon";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputPasswordType = {
  register?: UseFormRegister<FieldValues>;
  registerName?: string;
  label: string;
  size?: "md" | "sm" | "lg";
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

// For Password inside form
const InputPassword = ({
  register,
  registerName,
  size,
  onChange,
  value,
  label,
}: InputPasswordType) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      value={value}
      label={label}
      variant="bordered"
      size={size || "md"}
      onChange={onChange}
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
      {...(register && register(registerName as string))}
    />
  );
};

export default InputPassword;
