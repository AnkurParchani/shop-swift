import React from "react";

type PriceSummaryType = {
  discountedPrice: number;
  originalPrice: number;
};

const PriceSummary = ({ discountedPrice, originalPrice }: PriceSummaryType) => {
  const discount = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );

  return (
    <>
      <div className="mt-2 flex items-center gap-2">
        <p className="text-lg font-bold">₹{discountedPrice}</p>
        <p className="text-sm text-red-300 line-through">₹{originalPrice}</p>
        <p className="text-sm text-yellow-300">({discount}% OFF)</p>
      </div>

      <p className="-mt-0.5 text-sm text-green-400">Inclusive of all taxes</p>
    </>
  );
};

export default PriceSummary;
