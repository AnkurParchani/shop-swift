import { Item } from "../../../global";
import { MatchedItem } from "../../../global";

// Getting the user's img
export const getUserImg = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user-img") || null;
  }
};

// Formatting the date
export const formatDate = (date: string) => {
  const originalDate = new Date(date);

  const day = originalDate.getDate().toString().padStart(2, "0");
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const year = originalDate.getFullYear().toString();

  return `${day}/${month}/${year}`;
};

// Getting the searched items according to the input.
export const getSearchedItems = (searchText: string, items: Item[]) => {
  const matchedItems: MatchedItem[] = items.reduce(
    (result: MatchedItem[], item) => {
      const { name, category, company } = item;
      const { genericName, packer } = item.description;

      // Converting the search to lower case
      const lowerSearchText = searchText.toLowerCase();

      // Converting all the rest variables to lower case
      const lowerName = name.toLowerCase();
      const lowerCategory = category.toLowerCase();
      const lowerCompany = company.toLowerCase();
      const lowerGenericName = genericName.toLowerCase();
      const lowerPacker = packer?.toLowerCase();

      // Check if any of the properties contain the search input
      if (
        lowerName.includes(lowerSearchText) ||
        lowerCategory.includes(lowerSearchText) ||
        lowerCompany.includes(lowerSearchText) ||
        lowerGenericName.includes(lowerSearchText) ||
        lowerPacker?.includes(lowerSearchText)
      ) {
        // Create an object to store the matched item and matched properties
        const matchedItem: MatchedItem = {
          item,
          searchValue: lowerSearchText,
          matchedProperties: [],
        };

        // Add the matched properties to the matchedItem object
        if (lowerName.includes(lowerSearchText)) {
          matchedItem.matchedProperties.push("name");
        }
        if (lowerCategory.includes(lowerSearchText)) {
          matchedItem.matchedProperties.push("category");
        }

        if (lowerCompany.includes(lowerSearchText)) {
          matchedItem.matchedProperties.push("company");
        }
        if (lowerGenericName.includes(lowerSearchText)) {
          matchedItem.matchedProperties.push("genericName");
        }
        if (lowerPacker?.includes(lowerSearchText)) {
          matchedItem.matchedProperties.push("packer");
        }

        // Pushing to the accumulator
        result.push(matchedItem);
      }

      return result;
    },
    [],
  );

  return matchedItems;
};
