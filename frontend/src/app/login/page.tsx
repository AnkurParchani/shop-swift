"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import InputPassword from "../components/events/InputPassword";
import AuthFormTemplate from "../components/form/AuthFormTemplate";
import InputEmail from "../components/events/InputEmail";

import { login } from "../services/apiUsers";

const Page = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { register, handleSubmit, reset } = useForm();

  // react-query's useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Showing success notification and resetting the form
      toast("Logged in successfully", { type: "success" });
      reset();

      // Setting the user in localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, img: data.img || undefined }),
      );

      // For Nav's useEffect run
      const storageEvent = new Event("storage");
      window.dispatchEvent(storageEvent);

      // Setting the cookie
      setCookie("token", data.token);

      // Redirection to home page
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
        color="primary"
        variant="solid"
        isDisabled={isPending}
        isLoading={isPending}
      >
        Login
      </Button>

      <p className="text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </AuthFormTemplate>
  );
};

export default Page;
