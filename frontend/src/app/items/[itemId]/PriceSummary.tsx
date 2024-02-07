import { useTheme } from "@/app/contexts/ThemeContext";
import React from "react";

type PriceSummaryType = {
  discountedPrice: number;
  originalPrice: number;
};

const PriceSummary = ({ discountedPrice, originalPrice }: PriceSummaryType) => {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const discount = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );

  //
  return (
    <>
      <div className="mt-2 flex items-center gap-2">
        <p className="text-lg font-bold">₹{discountedPrice}</p>
        <p
          className={`text-sm line-through ${
            bgTheme === "dark" ? "text-red-300" : "text-red-700"
          }`}
        >
          ₹{originalPrice}
        </p>
        <p
          className={`text-sm ${
            bgTheme === "dark" ? "text-yellow-300" : "text-yellow-600"
          }`}
        >
          ({discount}% OFF)
        </p>
      </div>

      <p className="-mt-0.5 text-sm text-green-400">Inclusive of all taxes</p>
    </>
  );
};

export default PriceSummary;
