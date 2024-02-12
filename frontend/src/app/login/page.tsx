"use client";

import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { Button } from "@nextui-org/react";

import InputPassword from "../components/events/InputPassword";
import AuthFormTemplate from "../components/form/AuthFormTemplate";
import InputEmail from "../components/events/InputEmail";

import { useLogin } from "../hooks/useUser";

const Page = () => {
  const { handleSubmit, register, mutation } = useLogin();

  // Login handleSubmit
  const onSubmit = (data: FieldValues) => mutation.mutate(data);

  // The JSX
  return (
    <AuthFormTemplate
      heading="Login"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <InputEmail register={register} />

      <InputPassword
        label="Password"
        register={register}
        registerName="password"
      />
      <Button
        type="submit"
        className="bg-content1-400 text-white"
        variant="solid"
        isDisabled={mutation.isPending}
        isLoading={mutation.isPending}
      >
        Login
      </Button>

      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </AuthFormTemplate>
  );
};

export default Page;
