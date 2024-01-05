"use client";

import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import InputPassword from "../components/events/InputPassword";
import AuthFormTemplate from "../components/form/AuthFormTemplate";
import InputEmail from "../components/events/InputEmail";

import { signup } from "../services/apiUsers";
import InputText from "../components/events/InputText";

const Page = () => {
  const router = useRouter();
  const cookies = useCookies();
  const { register, handleSubmit, reset } = useForm();

  // react-query's useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast("Signed up successfully", { type: "success" });
      reset();
      cookies.set("token", data.token);
      router.push("/");
    },
    onError: (err) => {
      toast(err.message, { type: "error", theme: "dark" });
    },
  });

  // The onSubmit function for react-hook-form that will call mutate on react query
  const onSubmit = (data: FieldValues) => mutate(data);

  // The JSX
  return (
    <AuthFormTemplate
      heading="Signup"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <InputText label="Name" register={register} registerName="name" />

      <InputEmail register={register} />

      <InputPassword
        register={register}
        registerName="password"
        label="Password"
      />

      <InputPassword
        register={register}
        registerName="passwordConfirm"
        label="Confirm Password"
      />
      <Button
        type="submit"
        color="primary"
        variant="solid"
        isDisabled={isPending}
        isLoading={isPending}
      >
        Signup
      </Button>
    </AuthFormTemplate>
  );
};

export default Page;
