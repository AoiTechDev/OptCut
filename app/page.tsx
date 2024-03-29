"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  CuttingPattern,
  InputChange,
  PartItemType,
  QuantityType,
} from "@/types/types";
import { convert, solveCuttingStockProblem } from "@/lib/utils";
import FullTable from "@/components/FullTable";
import { usePartItems } from "@/hooks/usePartItems";
import { Input } from "@/components/ui/input";
import Hero from "@/components/Hero";
import Result from "@/components/Result";

export default function Home() {
  const demandItems = usePartItems("demand");
  const stockItems = usePartItems("stock");

  const [bladeSize, setBladeSize] = useState("0");

  const handleBladeSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBladeSize(e.target.value);
  };

  const [result, setResult] = useState<Array<CuttingPattern & QuantityType>>(
    []
  );



  return (
    <div className="w-full pb-12 px-4 min-[1300px]:px-24  mx-auto min-h-screen flex-col  justify-center items-center gap-12">
      <Hero
        bladeSize={bladeSize}
        handleBladeSizeChange={handleBladeSizeChange}
      />
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
                  demandItemsConverted,
                  parseFloat(bladeSize)
                );
                setResult(cuttingPatterns);
              }}
            >
              Cut
            </Button>
          }
        />
      </div>
      <div className="w-full max-w-3xl mx-auto mt-32 space-y-8 ">
        {result.map((pattern, index) => {
          return (
            <div
              key={index}
              className="flex w-full justify-center items-center gap-2 flex-col"
            >
              <div className="w-full flex justify-center items-center gap-4 ">
                <div className="w-24">
                  {pattern.stockLength} x {pattern.quantity}
                </div>
                <div className="w-full bg-gray-700 h-10 flex  text-white font-bold">
                  {pattern.amountOfDemandItem.map((item, index) => {
                    return (
                      <div
                        className="bg-purple-500"
                        key={index}
                        style={{
                          width: `${Math.ceil(
                            (item.quantity * item.length * 100) /
                              pattern.stockLength
                          )}%`,
                          height: "100%",

                          display: "inline-block",
                          borderRight: "1px solid white",
                        }}
                      >
                        <div className=" flex justify-center items-center h-full">
                          {item.length} x {item.quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full text-end">
                Waste: {pattern.wasteAmount}
              </div>
            </div>
          );
        })}
      </div>

      {!!result.length ? (
      <Result result={result}/>
      ) : null}
    </div>
  );
}
