"use client";
import ItemRow from "@/components/ItemRow";
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
  const [demandItems , setDemandItems] = useState<PartItemType[]>([
    {
      id: 1,
      length: 0,
      quantity: 0,
      name: "",
    },
  ]);
  const [stockItems, setStockItems] = useState<PartItemType[]>([
    {
      id: 1,
      length: 0,
      quantity: 0,
      name: "",
    },
  ]);

  const handleDemandInputChange = ({ id, field, value }: InputChange) => {
    const newPartItems = [...demandItems];
    const itemIndex = newPartItems.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
      newPartItems[itemIndex] = { ...newPartItems[itemIndex], [field]: value };
      setDemandItems(newPartItems);
    }
  };

  const handleStockInputChange = ({ id, field, value }: InputChange) => {
    const newPartItems = [...stockItems];
    const itemIndex = newPartItems.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
      newPartItems[itemIndex] = { ...newPartItems[itemIndex], [field]: value };
      setStockItems(newPartItems);
    }
  };


  const addDemandItemRow = () => {
    setDemandItems([
      ...demandItems,
      {
        id: demandItems.length + 1,
        length: 0,
        quantity: 0,
        name: "",
      },
    ]);
  };
  const addStockItemRow = () => {
    setStockItems([
      ...stockItems,
      {
        id: stockItems.length + 1,
        length: 0,
        quantity: 0,
        name: "",
      },
    ]);
  };

  // const stockItems: StockItem[] = [
  //   {
  //     length: 110,
  //     quantity: 1000,
  //   },
  // ];

  // const demandItems: DemandItem[] = [
  //   {
  //     length: 20,
  //     quantity: 64,
  //   },
  //   {
  //     length: 50,
  //     quantity: 32,
  //   },
  //   {
  //     length: 55,
  //     quantity: 26,
  //   },
  // ];

  function convert (stockItems: PartItemType[], demandItems: PartItemType[]): [StockItem[], DemandItem[]] {
    const stockItemsConverted = stockItems.map((item) => {
      return {
        length: item.length,
        quantity: item.quantity,
      };
    });

    const demandItemsConverted = demandItems.map((item) => {
      return {
        length: item.length,
        quantity: item.quantity,
      };
    });

    return [stockItemsConverted, demandItemsConverted];
  }



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
        {stockItems.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              handleInputChange={handleStockInputChange}
            />
          ))}
        
        </TableBody>
      </Table>
         <Button onClick={addStockItemRow}>Add Part Item</Button>
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
          {demandItems.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              handleInputChange={handleDemandInputChange}
            />
          ))}
        </TableBody>
      </Table>
      <Button onClick={addDemandItemRow}>Add Part Item</Button>


      <Button onClick={() => {
        const [stockItemsConverted, demandItemsConverted] = convert(stockItems, demandItems);
        const cuttingPatterns = solveCuttingStockProblem(stockItemsConverted, demandItemsConverted);
        console.log(cuttingPatterns)
      }}>Cut</Button>
    </div>
  );
}
