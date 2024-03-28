import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { Input } from "./ui/input";

const ItemRow = ({
  item,
  handleInputChange,
}: {
  item: {
    id: number;
    length: number;
    quantity: number;
    name: string;
  };
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
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>
        <Input
          type="text"
          name="length"
          value={item.length}
          onChange={(e) =>
            handleInputChange({
              id: item.id,
              field: "length",
              value: e.target.value,
            })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          type="text"
          name="quantity"
          value={item.quantity}
          onChange={(e) =>
            handleInputChange({
              id: item.id,
              field: "quantity",
              value: e.target.value,
            })
          }
        />
      </TableCell>
      {/* <TableCell>
        <Input
          type="text"
          name="name"
          value={item.name}
          onChange={(e) =>
            handleInputChange({
              id: item.id,
              field: "name",
              value: e.target.value,
            })
          }
        />
      </TableCell> */}
      <TableCell className="text-right">X</TableCell>
    </TableRow>
  );
};

export default ItemRow;
