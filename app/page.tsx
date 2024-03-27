"use client";
import PartItem from "@/components/PartItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function Home() {
  type PartItem = {
    id: number;
    partLength: number;
    quantity: number;
    name: string;
  };
  
  const [partItems, setPartItems] = useState<PartItem[]>([
    {
      id: 1,
      partLength: 0,
      quantity: 0,
      name: "",
    },
  ]);
  
  type InputChange = {
    id: number;
    field: keyof PartItem;
    value: string | number;
  };
  
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
        partLength: 0,
        quantity: 0,
        name: "",
      },
    ]);
  };

 
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
            <PartItem key={item.id} item={item} handleInputChange={handleInputChange}/>
          ))}
        </TableBody>
      </Table>
      <Button onClick={addRow}>Add Part Item</Button>
    </div>
  );
}
