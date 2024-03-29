import { countWaste } from "@/lib/utils";
import { CuttingPattern, QuantityType } from "@/types/types";
import React from "react";

const Result = ({
  result,
}: {
  result: Array<CuttingPattern & QuantityType>;
}) => {
  const quantityByLength = result.reduce<Record<number, number>>(
    (acc, pattern) => {
      acc[pattern.stockLength] =
        (acc[pattern.stockLength] || 0) + pattern.quantity;
      return acc;
    },
    {}
  );

  
  return (
    <div className="w-full max-w-3xl mx-auto mt-16 space-y-6">
      <div className="space-y-2">
        <h4 className="text-xl font-medium">Stock Items Used:</h4>
        <ul>
          {Object.entries(quantityByLength).map(
            ([stockLength, totalQuantity], index) => (
              <li className="text-lg" key={index}>
                {stockLength} x {totalQuantity}
              </li>
            )
          )}
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-medium">Total Waste Generated:</h4>
        <span className="text-lg">{countWaste(result)}</span>
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-medium">Patters Used:</h4>
        <ul>
          {result.map((pattern, index) => {
            return (
              <li key={index} className="flex gap-4">
                <div className="w-4">{pattern.quantity}</div>
                <div className="w-4">x</div>
                <div>
                  {pattern.cutLengths.map((cutLength, index) => (
                    <span key={index}>[ {cutLength} ] </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Result;
