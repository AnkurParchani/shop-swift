import { Input } from "@nextui-org/react";
import { ChangeEventHandler } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputTextType = {
  label: string;
  register?: UseFormRegister<FieldValues>;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  registerName?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function InputText({
  label,
  register,
  registerName,
  placeholder,
  className,
  onChange,
  type,
  autoFocus,
}: InputTextType) {
  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
      <Input
        autoFocus={autoFocus}
        variant="bordered"
        size="md"
        placeholder={placeholder}
        type={type || "text"}
        label={label}
        className={className}
        onChange={onChange}
        {...(register && register(registerName as string))}
      />
    </div>
  );
}
