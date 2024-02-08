import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useTheme } from "@/app/contexts/ThemeContext";

const PricingBtn = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 flex flex-col gap-3 border-t-2 border-t-content1-400  px-4 py-3 text-center ${
        bgTheme === "dark" ? "bg-background" : "bg-foreground"
      }`}
    >
      <Button
        variant="solid"
        onPress={() => router.push("/pricing")}
        className="bg-content1-400 text-white"
      >
        Pricing
      </Button>
    </div>
  );
};

export default PricingBtn;
