import { CuttingPattern, DemandItem, PartItemType, QuantityType, StockItem } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAllCutCombinations(
  stockItems: StockItem[],
  demandItems: DemandItem[],
  bladeSize: number = 0
): CuttingPattern[] {
  const cuttingPatterns: CuttingPattern[] = [];

  // Iterate over each stock item
  for (let stockIndex = 0; stockIndex < stockItems.length; stockIndex++) {
    const stockItem = stockItems[stockIndex];

    // Stack to keep track of current state of cuts
    const stack: {
      demandIndex: number;
      currentPattern: number[];
      remainingLength: number;
      usedDemandItems: StockItem[];
    }[] = [];

    // Initial state for the first demand item
    stack.push({
      demandIndex: 0,
      currentPattern: [],
      remainingLength: stockItem.length,
      usedDemandItems: [],
    });

    // Process stack until it's empty
    while (stack.length > 0) {
      const currentState = stack.pop()!;

      const { demandIndex, currentPattern, remainingLength, usedDemandItems } =
        currentState;

      // Base case: if all demand items are considered

      if (demandIndex === demandItems.length) {
        const wasteAmount = remainingLength;

        if (currentPattern.length > 0) {
          cuttingPatterns.push({
            stockLength: stockItem.length,
            cutLengths: currentPattern,
            amountOfDemandItem: usedDemandItems,
            wasteAmount: wasteAmount,
          });
        }
        continue;
      }

      // Calculate the maximum number of cuts possible for the current demand item
      const maxCuts = Math.floor(
        (remainingLength / demandItems[demandIndex].length) - bladeSize
      )

      console.log( (remainingLength / demandItems[demandIndex].length) + bladeSize)
      console.log(maxCuts)
      // Generate all possible combinations of cuts for the current demand item
      for (let cuts = 0; cuts <= maxCuts; cuts++) {
        const newPattern = [...currentPattern];
        const newUsedDemandItems = usedDemandItems.slice();
        for (let i = 0; i < cuts; i++) {
          newPattern.push(demandItems[demandIndex].length);

          // Update usedDemandItems
          const usedIndex = newUsedDemandItems.findIndex(
            (item) => item.length === demandItems[demandIndex].length
          );
          if (usedIndex !== -1) {
            newUsedDemandItems[usedIndex].quantity += 1;
          } else {
            newUsedDemandItems.push({
              length: demandItems[demandIndex].length,
              quantity: 1,
            });
          }
        }
        const newRemainingLength =
          remainingLength - cuts * demandItems[demandIndex].length;

        // Push new state to the stack for the next demand item
        stack.push({
          demandIndex: demandIndex + 1,
          currentPattern: newPattern,
          remainingLength: newRemainingLength,
          usedDemandItems: newUsedDemandItems,
        });
      }
    }
  }

  return cuttingPatterns;
}

export function sortAllPatterns(
  stockItems: StockItem[],
  demandItems: DemandItem[],
  bladeSize: number
): CuttingPattern[] {
  const cuttingPatterns: CuttingPattern[] = generateAllCutCombinations(
    stockItems,
    demandItems,
    bladeSize
  );

  cuttingPatterns.sort((a, b) => a.wasteAmount - b.wasteAmount);

  return cuttingPatterns;
}

export function solveCuttingStockProblem(
  stockItems: StockItem[],
  demandItems: DemandItem[],
  bladeSize = 0
) {

  const patterns = sortAllPatterns(stockItems, demandItems, bladeSize);
  let solution = [];

  while (demandItems.some((item) => item.quantity > 0)) {
    let pattern = patterns.find((pattern) => {
      // Check if the stock item quantity is not exhausted
      let stockItem = stockItems.find((i) => i.length === pattern.stockLength);
      if (!stockItem || stockItem.quantity <= 0) return false;

      // Check if the demand can be satisfied
      return pattern.amountOfDemandItem.every((item) => {
        let demandItem = demandItems.find((i) => i.length === item.length);
        return demandItem && demandItem.quantity >= item.quantity;
      });
    });

    if (!pattern) break;

    // Subtract from the stock quantity only when actually using the pattern
    let stockItem = stockItems.find((i) => i.length === pattern.stockLength);
    if (stockItem) stockItem.quantity -= 1;

    for (let item of pattern.amountOfDemandItem) {
      let demandItem = demandItems.find((i) => i.length === item.length);
      if (demandItem) demandItem.quantity -= item.quantity;
    }

    let solutionPattern = solution.find(
      (p) =>
        p.stockLength === pattern.stockLength &&
        p.cutLengths.every((v, i) => v === pattern.cutLengths[i])
    );
    if (solutionPattern) {
      solutionPattern.quantity += 1;
    } else {
      solution.push({ ...pattern, quantity: 1 });
    }
  }

  // Filter out stock items with zero quantity
  solution = solution.filter(pattern => pattern.quantity > 0);

  return solution;
}


export function convert(
  stockItems: PartItemType[],
  demandItems: PartItemType[]
): [StockItem[], DemandItem[]] {
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


export function countWaste(result: Array<CuttingPattern & QuantityType>) {
  let waste = 0;
  for (let i = 0; i < result.length; i++) {
    waste += result[i].wasteAmount * result[i].quantity;
  }
  return waste;
}