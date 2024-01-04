"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import InputPassword from "../components/events/InputPassword";
import AuthFormTemplate from "../components/form/AuthFormTemplate";

import { login } from "../services/apiUsers";
import InputEmail from "../components/events/InputEmail";
import { toast } from "react-toastify";

const Page = () => {
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      return toast("Logged in successfully");
    },
    onError: () => {
      toast("Invalid");
    },
  });

  const onSubmit = (data: FieldValues) => mutate(data);

  return (
    <AuthFormTemplate
      heading="Login"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <InputEmail register={register} />
      <InputPassword register={register} />
      <Button
        type="submit"
        color="danger"
        variant="solid"
        isDisabled={isPending}
        isLoading={isPending}
      >
        Login
      </Button>
    </AuthFormTemplate>
  );
};

export default Page;
