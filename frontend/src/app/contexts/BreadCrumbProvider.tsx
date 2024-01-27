import { createContext, useContext, useState } from "react";

type PrevPage = {
  label: string;
  link: string;
};

type BreadcrumbContextType = {
  prevPages: PrevPage[];
  setPrevPages: React.Dispatch<React.SetStateAction<PrevPage[]>>;
};

const BreadcrumbContext = createContext<undefined | BreadcrumbContextType>(
  undefined,
);

const BreadCrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [prevPages, setPrevPages] = useState<PrevPage[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ prevPages, setPrevPages }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadCrumbProvider;

// Exporting the useContext to directly access it
export const useBreadcrumb = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext);

  if (!context)
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");

  return context;
};
