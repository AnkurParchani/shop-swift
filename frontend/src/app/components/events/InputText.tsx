import { Input } from "@nextui-org/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputTextType = {
  label: string;
  register: UseFormRegister<FieldValues>;
  registerName: string;
};

export default function InputText({
  label,
  register,
  registerName,
}: InputTextType) {
  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
      <Input
        variant="bordered"
        size="md"
        type="text"
        label={label}
        {...register(registerName)}
      />
    </div>
  );
}
