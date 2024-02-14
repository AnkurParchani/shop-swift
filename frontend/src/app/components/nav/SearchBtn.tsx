import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

import { MatchedItem } from "../../../../global";
import { getSearchedItems } from "@/app/utils/helpers";
import { useGetAllItems } from "@/app/hooks/useItems";
import { useTheme } from "@/app/contexts/ThemeContext";
import NoItemsFound from "./NoItemsFound";
import FoundItems from "./FoundItems";

const SearchBtn = () => {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const [searchText, setSearchText] = useState("");
  const [foundItems, setFoundItems] = useState<MatchedItem[] | undefined>();
  const { data: items, isLoading: itemsIsLoading } = useGetAllItems();

  // Function to get the searchItems
  useEffect(() => {
    if (searchText.length < 2) return;
    const results = getSearchedItems(searchText, items);
    setFoundItems(results);
  }, [searchText, items]);

  // The JSX
  return (
    <div className="relative">
      <Input
        classNames={{
          base: "w-[10rem] sm:w-[20rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper: "h-full font-normal dark:bg-foreground",
          label: "",
        }}
        placeholder="Type to search..."
        disabled={itemsIsLoading}
        size="sm"
        value={searchText}
        startContent={<CiSearch className="text-black" size={18} />}
        type="search"
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* When user has searched and no items are found */}
      {searchText.length > 2 && foundItems?.length === 0 && (
        <NoItemsFound bgTheme={bgTheme} />
      )}

      {/* When user has searched and items are found */}
      {searchText.length > 2 && foundItems && foundItems.length > 0 && (
        <FoundItems
          setSearchText={setSearchText}
          bgTheme={bgTheme}
          items={foundItems}
        />
      )}
    </div>
  );
};

export default SearchBtn;
