import Link from "next/link";

const SellerInfo = ({ sellerLink }: { sellerLink: string }) => {
  return (
    <div className="mt-5 py-3">
      <div className="rounded-sm border-2 border-red-400 bg-red-700 px-4 py-2.5 text-center text-xs font-semibold text-foreground">
        Note: This is just a demo website, To know more about this product,{" "}
        <Link
          target="_blank"
          href={sellerLink}
          className="text-blue-500 hover:underline"
        >
          Click here
        </Link>
      </div>
    </div>
  );
};

export default SellerInfo;
