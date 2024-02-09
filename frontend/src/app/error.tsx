"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "./contexts/ThemeContext";

import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-10">
      <div className="text-center">
        <Image
          src={"/icons/error.svg"}
          alt="Empty List Image"
          height={1000}
          width={1000}
          className="mx-auto h-32 w-auto text-center opacity-80"
        />
        <h1 className="mt-5 text-lg font-bold ">Oops...</h1>
        <h3 className="mb-2 text-center text-xs">
          Something went wrong, please try again!
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
          onClick={reset}
          variant="solid"
          className="bg-content1-400 text-white"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
