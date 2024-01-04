"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "@nextui-org/react";
import InputPassword from "../components/events/InputPassword";
import AuthFormTemplate from "../components/form/AuthFormTemplate";

import { login } from "../services/apiUsers";

const Page = () => {
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => console.log("logged in successfully"),
  });

  const onSubmit = (data: FieldValues) => mutate(data);

  return (
    <AuthFormTemplate
      heading="Login"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <Input
        {...register("email")}
        size="lg"
        type="email"
        label="Email"
        variant="bordered"
        // errorMessage="Please enter a valid email"
      />

      <InputPassword register={register} />

      <Button type="submit" color="danger" variant="solid">
        Login
      </Button>
    </AuthFormTemplate>
  );
};

export default Page;
