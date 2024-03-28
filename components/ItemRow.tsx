import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { LuTrash2 } from "react-icons/lu";

const ItemRow = ({
  item,
  handleInputChange,
  deleteRow,
  index
}: {
  item: {
    id: number;
    length: number;
    quantity: number;
    name: string;
  };
  index: number;
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
  deleteRow: (id: number) => void;
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{index }</TableCell>
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
      <TableCell className="text-right" onClick={() => deleteRow(item.id)}><LuTrash2 className="text-xl hover:text-red-700 cursor-pointer duration-200"/></TableCell>
    </TableRow>
  );
};

export default ItemRow;
