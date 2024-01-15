import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

type EmptyListType = {
  description: string;
  iconSrc: string;
  heading: string;
  backButton?: boolean;
  actionButtonTxt?: string;
  handleActionFn?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function EmptyList({
  iconSrc,
  heading,
  backButton,
  description,
  actionButtonTxt,
  handleActionFn,
}: EmptyListType) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-10">
      <Image
        src={iconSrc}
        alt="Empty List Image"
        height={1000}
        width={1000}
        className="h-32 w-auto opacity-80"
      />
      <h1 className=" text-sm font-bold uppercase">{heading}</h1>
      <h3 className="mb-2 text-center text-xs text-[#767676]">{description}</h3>

      <div className="flex gap-3">
        {backButton && (
          <Button
            variant={actionButtonTxt ? "flat" : "solid"}
            onClick={() => router.back()}
            color="primary"
          >
            Go Back
          </Button>
        )}

        {actionButtonTxt && (
          <Button variant="solid" onClick={handleActionFn} color="primary">
            {actionButtonTxt}
          </Button>
        )}
      </div>
    </div>
  );
}
