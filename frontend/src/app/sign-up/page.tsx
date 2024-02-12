"use client";

import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { HiOutlineCamera } from "react-icons/hi2";

import InputPassword from "../components/events/InputPassword";
import AuthFormTemplate from "../components/form/AuthFormTemplate";
import InputEmail from "../components/events/InputEmail";
import InputText from "../components/events/InputText";

import { supabase, supabaseUrl } from "../utils/supabase";
import { getUserImg } from "../utils/helpers";
import { useSignup } from "../hooks/useUser";

const Page = () => {
  const preImg = getUserImg();
  const [userImg, setUserImg] = useState<null | string>(
    preImg
      ? `https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/users/${preImg}`
      : null,
  );

  const userImgRef = useRef<HTMLInputElement | null>(null);

  const { mutation, handleSubmit, register } = useSignup();

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
  const onSubmit = (data: FieldValues) =>
    mutation.mutate(
      { data, userImg: userImg },
      {
        onSuccess: () => {
          setUserImg(null);
        },
      },
    );

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
          className="mx-auto cursor-pointer rounded-full border-2 border-gray-400 p-3 text-5xl"
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
        className="bg-content1-400 text-white"
        variant="solid"
        isDisabled={mutation.isPending}
        isLoading={mutation.isPending}
      >
        Signup
      </Button>
      <p className="text-center text-sm">
        Already a memeber?{" "}
        <Link className="text-blue-500 hover:underline" href="/login">
          Login
        </Link>
      </p>
    </AuthFormTemplate>
  );
};

export default Page;
