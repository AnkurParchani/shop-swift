import React from "react";

const NoItemsFound = ({ bgTheme }: { bgTheme: string }) => {
  return (
    <div
      className={`absolute right-0 top-10 w-[250px] rounded-md border-x-2 border-b-2 border-content1-500 px-2 py-2 text-sm font-medium sm:w-full ${
        bgTheme === "dark"
          ? "bg-background text-foreground"
          : "bg-foreground text-background"
      }`}
    >
      <p>Sorry, no items found according to search results :(</p>
    </div>
  );
};

export default NoItemsFound;
