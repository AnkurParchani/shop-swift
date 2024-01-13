import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

type ExtraDetailsType = {
  company: string;
  category: string;
  description: object;
};

const ExtraDetailsTable = ({
  description,
  company,
  category,
}: ExtraDetailsType) => {
  const details = { category, company, ...description };

  const rows = Object.entries(details).map(([key, value]) => {
    return (
      <TableRow className="capitalize" key={key}>
        <TableCell className="border border-gray-600 font-semibold text-gray-300">
          {key}
        </TableCell>
        <TableCell className="border border-gray-600">{value}</TableCell>
      </TableRow>
    );
  });

  return (
    <div className="py-5">
      <h2 className="mb-2 pl-1 text-lg font-semibold text-white">
        Other Details
      </h2>

      <Table
        removeWrapper={true}
        hideHeader
        radius="lg"
        className="p-0"
        layout="auto"
      >
        <TableHeader>
          <TableColumn>Specification</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableHeader>

        <TableBody>{rows}</TableBody>
      </Table>
    </div>
  );
};

export default ExtraDetailsTable;
