"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTheme } from "./contexts/ThemeContext";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-10">
      <div className="text-center">
        <Image
          src={"/icons/not-found.svg"}
          alt="Empty List Image"
          height={1000}
          width={1000}
          className="mx-auto h-32 w-auto text-center opacity-80"
        />
        <h1 className="mt-5 text-lg font-bold ">Oops...</h1>
        <h3 className="mb-2 text-center text-xs">
          Looks like there&apos;s no resource for this page
        </h3>
      </div>

      <div className="flex gap-3">
        <Button
          variant="flat"
          onClick={() => router.back()}
          className={`border border-content1-500 bg-transparent ${
            bgTheme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Go Back
        </Button>

        <Button
          onClick={() => router.push("/")}
          variant="solid"
          className="bg-content1-400 text-white"
        >
          Home
        </Button>
      </div>
    </div>
  );
}
