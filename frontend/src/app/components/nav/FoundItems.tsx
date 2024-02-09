import { MatchedItem } from "../../../../global";
import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type FoundItemsProps = {
  bgTheme: string;
  items: MatchedItem[];
  setSearchText: Dispatch<SetStateAction<string>>;
};

const FoundItems = ({ bgTheme, items, setSearchText }: FoundItemsProps) => {
  return (
    <div
      className={`absolute right-0 top-10 w-[250px] rounded-md border-x-2 border-b-2 border-content1-500 px-2 py-2 text-sm sm:w-full ${
        bgTheme === "dark"
          ? "bg-background text-foreground"
          : "bg-foreground text-background"
      }`}
    >
      {items.map((el) => {
        const { item, matchedProperties } = el;
        const { id } = item;

        const matchedItems = matchedProperties.map((match) => {
          return {
            key: match,
            // @ts-ignore
            value: item[match] || item.description[match],
          };
        });

        return (
          <Link
            className="flex gap-2 border-b border-content1-500 py-2"
            key={id}
            href={`/items/${id}`}
            onClick={() => setSearchText("")}
          >
            <Image
              height={1000}
              width={1000}
              alt="Item-img"
              className="h-20 w-[60px] rounded-md object-cover"
              src={item.image as string}
            />
            <div className="flex flex-col gap-0.5">
              {matchedItems.map((match, i) => {
                return (
                  <h1 key={i} className="text-xs font-semibold capitalize ">
                    {match.key}:{" "}
                    <span className="font-normal ">{match.value}</span>
                  </h1>
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FoundItems;
