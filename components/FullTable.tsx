import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button, ButtonProps } from "./ui/button";
import ItemRow from "./ItemRow";
import { PartItemType } from "@/types/types";

type FullTableType = {
  header: string;
  buttonText: string;
  items: PartItemType[];
  handleInputChange: (args: {
    id: number;
    field: keyof {
      id: number;
      length: number;
      quantity: number;
      name: string;
    };
    value: string | number;
  }) => void;
  addRow: () => void;
  deleteRow: (id: number) => void;
  cutButton?: React.ReactNode | undefined

};
const FullTable = ({
  header,
  buttonText,
  items,
  handleInputChange,
  addRow,
  deleteRow,
  cutButton,
}: FullTableType) => {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-3xl my-6 font-medium">{header} </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">LP</TableHead>
            <TableHead>Length</TableHead>
            <TableHead>Quantity</TableHead>
            {/* <TableHead>Name</TableHead> */}
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <ItemRow
              key={index}
              index={index}
              item={item}
              handleInputChange={handleInputChange}
              deleteRow={deleteRow}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-between">
        <Button onClick={addRow}>{buttonText}</Button>
        {cutButton}
      </div>
    </div>
  );
};

export default FullTable;
