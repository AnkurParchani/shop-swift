import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaRegSadTear } from "react-icons/fa";

const NoMatch = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-10">
      <FaRegSadTear style={{ fontSize: "60px" }} />
      <h1 className=" text-sm font-bold uppercase">Sorry,</h1>
      <h3 className="mb-2 text-center text-xs text-[#767676]">
        there were no items match according to your filters
      </h3>

      <Button variant={"flat"} onClick={() => router.back()} color="primary">
        Go Back
      </Button>
    </div>
  );
};

export default NoMatch;
