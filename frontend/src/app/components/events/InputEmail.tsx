import React from "react";
import { Input } from "@nextui-org/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

// For Email inside forms
export default function InputEmail({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) {
  const [value, setValue] = React.useState<string>("someone@example.com");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <Input
      {...register("email")}
      value={value}
      type="email"
      label="Email"
      variant="bordered"
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "success"}
      errorMessage={isInvalid && "Please enter a valid email"}
      onValueChange={setValue}
      className="max-w-xs"
    />
  );
}
