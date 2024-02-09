import { Button } from "@nextui-org/react";
import { useTheme } from "../contexts/ThemeContext";
import { useRouter } from "next/navigation";

// If there are no addresses or no items in the cart of the user then showing this page
const IncompleteDetails = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const bgTheme = theme.split("-")[1];

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-10">
      <div className="text-center">
        <h1 className="mt-5 text-lg font-bold ">Sorry...</h1>
        <h3 className="mb-2 text-center text-xs">
          You are not allowed on this page as your previous details are missing
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
};

export default IncompleteDetails;
