"use client";
import PartItem from "@/components/PartItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as _ from "lodash";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { CuttingPattern, DemandItem, InputChange, PartItemType, StockItem } from "@/types/types";
import { solveCuttingStockProblem } from "@/lib/utils";




export default function Home() {
  const [partItems, setPartItems] = useState<PartItemType[]>([
    {
      id: 1,
      length: 0,
      quantity: 0,
      name: "",
    },
  ]);

  const handleInputChange = ({ id, field, value }: InputChange) => {
    const newPartItems = [...partItems];
    const itemIndex = newPartItems.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
      newPartItems[itemIndex] = { ...newPartItems[itemIndex], [field]: value };
      setPartItems(newPartItems);
    }
  };

  const addRow = () => {
    setPartItems([
      ...partItems,
      {
        id: partItems.length + 1,
        length: 0,
        quantity: 0,
        name: "",
      },
    ]);
  };

  const stockItems: StockItem[] = [
    {
      length: 110,
      quantity: 1000,
    },
  ];

  const demandItems: DemandItem[] = [
    {
      length: 20,
      quantity: 64,
    },
    {
      length: 50,
      quantity: 32,
    },
    {
      length: 55,
      quantity: 26,
    },
  ];



console.log(partItems)
  return (
    <div className="w-full max-w-7xl mx-auto h-screen flex flex-col justify-center items-center gap-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">LP</TableHead>
            <TableHead>Source Item Length</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">X</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell className="text-right">X</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">LP</TableHead>
            <TableHead>Part Length</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">X</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partItems.map((item) => (
            <PartItem
              key={item.id}
              item={item}
              handleInputChange={handleInputChange}
            />
          ))}
        </TableBody>
      </Table>
      <Button onClick={addRow}>Add Part Item</Button>
    </div>
  );
}
