"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CuttingPattern, InputChange, PartItemType } from "@/types/types";
import { convert, solveCuttingStockProblem } from "@/lib/utils";
import FullTable from "@/components/FullTable";
import { usePartItems } from "@/hooks/usePartItems";

export default function Home() {
  const demandItems = usePartItems('demand');
  const stockItems = usePartItems('stock');

const [result, setResult] = useState<CuttingPattern[]>([]);
  
  return (
    <div className="w-full px-4 min-[1300px]:px-24 mx-auto min-h-screen flex-col  justify-center items-center gap-12">
      <div className="flex flex-col min-[1300px]:flex-row justify-center items-center min-[1300px]:items-start h-full gap-12 min-[1300px]:gap-24 min-[1300px]:mt-32">
        <FullTable
          header="Source / Stock Items"
          buttonText="Add Stock Item"
          items={stockItems.partItems}
          handleInputChange={stockItems.handleInputChange}
          addRow={stockItems.addItemRow}
          deleteRow={stockItems.deleteItemRow}
        />
        <FullTable
          header="Demand / Part Items"
          buttonText="Add Part Item"
          items={demandItems.partItems}
          handleInputChange={demandItems.handleInputChange}
          addRow={demandItems.addItemRow}
          deleteRow={demandItems.deleteItemRow}
          cutButton={
            <Button
              onClick={() => {
                const [stockItemsConverted, demandItemsConverted] = convert(
                  stockItems.partItems,
                  demandItems.partItems
                );
                const cuttingPatterns = solveCuttingStockProblem(
                  stockItemsConverted,
                  demandItemsConverted
                );
                setResult(cuttingPatterns);
              }}
            >
              Cut
            </Button>
          }
        />
      </div>
    </div>
  );
}
