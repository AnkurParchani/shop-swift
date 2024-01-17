import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputSelectType = {
  options: { label: string | number; value: string | number }[];
  label: string;
  variant: "flat" | "bordered" | "underlined" | "faded";
  placeholder?: string;
  register?: UseFormRegister<FieldValues>;
  registerName?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  size?: "md" | "sm" | "lg";
  defaultSelectedKey?: string;
};

const InputSelect = ({
  options,
  label,
  variant,
  onChange,
  size,
  registerName,
  register,
  placeholder,
  defaultSelectedKey,
}: InputSelectType) => {
  return (
    <Select
      label={label}
      defaultSelectedKeys={defaultSelectedKey ? [defaultSelectedKey] : []}
      variant={variant}
      size={size || "md"}
      placeholder={placeholder}
      onChange={onChange}
      className="capitalize text-white"
      {...(register && register(registerName as string))}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default InputSelect;
