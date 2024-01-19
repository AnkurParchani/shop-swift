import { useRouter } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

type BreadCrumbType = {
  curPage: string;
  nextPages?: string[];
  size?: "sm" | "md" | "lg";
};
const BreadCrumb = ({ curPage, nextPages, size }: BreadCrumbType) => {
  const prevPages = [{ label: "useContext", link: "useContext" }];
  const router = useRouter();

  return (
    <Breadcrumbs size={size || "md"} underline="hover">
      {/* for the previous pages */}
      {prevPages?.map((page) => (
        <BreadcrumbItem key={page.label} onPress={() => router.push(page.link)}>
          {page.label}
        </BreadcrumbItem>
      ))}

      {/* for the current page */}
      <BreadcrumbItem isCurrent={true}>{curPage}</BreadcrumbItem>

      {/* for the upcoming pages */}
      {nextPages?.map((page) => (
        <BreadcrumbItem isDisabled isCurrent={false} key={page}>
          {page}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
