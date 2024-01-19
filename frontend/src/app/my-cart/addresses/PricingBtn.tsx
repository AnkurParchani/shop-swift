import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const PricingBtn = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex flex-col gap-3 border-t-2 border-t-secondary bg-[#1b1b1b] px-4 py-3 text-center">
      <Button
        variant="solid"
        onPress={() => router.push("/pricing")}
        color="secondary"
      >
        Pricing
      </Button>
    </div>
  );
};

export default PricingBtn;
