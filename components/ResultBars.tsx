import { CuttingPattern, QuantityType } from '@/types/types';
import React from 'react'

const ResultBars = ({result}: {
    result: Array<CuttingPattern & QuantityType>;
}) => {
  return (
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
  )
}

export default ResultBars