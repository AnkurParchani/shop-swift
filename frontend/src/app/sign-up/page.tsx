"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HiOutlineCamera } from "react-icons/hi2";

import InputPassword from "../components/events/InputPassword";
import AuthFormTemplate from "../components/form/AuthFormTemplate";
import InputEmail from "../components/events/InputEmail";
import InputText from "../components/events/InputText";

import { signup } from "../services/apiUsers";
import { ChangeEvent, useRef, useState } from "react";
import { supabase, supabaseUrl } from "../services/supabase";
import { getUserImg } from "../utils/helpers";

const Page = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const preImg = getUserImg();
  const [userImg, setUserImg] = useState<null | string>(
    preImg
      ? `https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/users/${preImg}`
      : null,
  );
  const { register, handleSubmit, reset } = useForm();
  const userImgRef = useRef<HTMLInputElement | null>(null);

  // react-query's useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FieldValues) => signup(data, userImg),
    onSuccess: (data) => {
      // Showing success notification and resetting the form
      toast("Signed up successfully", { type: "success" });
      reset();

      setUserImg(null);

      // Setting the user in localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, img: userImg }),
      );
      localStorage.removeItem("user-img");

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

  const handleAddUserImg = async (e: ChangeEvent<HTMLInputElement>) => {
    // If there is problem with uploading the img
    if (!e.target?.files?.[0])
      return toast("Something went wrong while uploading the image", {
        type: "error",
      });

    // Removing the old image
    if (preImg) {
      await supabase.storage.from("users").remove([preImg]);
      localStorage.removeItem("user-img");
    }

    const { name } = e.target.files[0];
    const imgName = `${Math.random()}-${name}`.replaceAll("/", "");

    const imgPath = `${supabaseUrl}/storage/v1/object/public/users/${imgName}`;

    // Uploading the img to supabase database
    const { error } = await supabase.storage
      .from("users")
      .upload(imgName, e.target.files[0]);

    if (error)
      return toast("Something went wrong while uploading the image", {
        type: "error",
      });

    // Setting the image as temp storage
    localStorage.setItem("user-img", imgName);

    toast("Img uploaded", { type: "info" });

    setUserImg(imgPath);
  };

  // The onSubmit function for react-hook-form that will call mutate on react query
  const onSubmit = (data: FieldValues) => mutate(data);

  // The JSX
  return (
    <AuthFormTemplate
      heading="Signup"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      {/* Image and other inputs */}
      <input
        type="file"
        ref={userImgRef}
        onChange={handleAddUserImg}
        className="hidden"
      />

      {!preImg && (
        <div
          onClick={() => userImgRef.current?.click()}
          className="mx-auto cursor-pointer rounded-full border-2 border-gray-400 bg-gray-900 p-3 text-5xl"
        >
          <HiOutlineCamera />
        </div>
      )}

      {userImg && (
        <Image
          onClick={() => userImgRef.current?.click()}
          src={userImg}
          alt="User-Img"
          className="m-auto h-20 w-auto cursor-pointer rounded-full"
          height={1000}
          width={1000}
        />
      )}

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
      <p className="text-center text-sm text-gray-400">
        Already a memeber?{" "}
        <Link className="text-blue-500 hover:underline" href="/login">
          Login
        </Link>
      </p>
    </AuthFormTemplate>
  );
};

export default Page;
