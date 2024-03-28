import { InputChange, PartItemType } from "@/types/types";
import { useState } from "react";

function generateRandomInt(): number {
  return Math.floor(Math.random() * 10000001);
}
export function usePartItems(type: 'stock' | 'demand') {
    const [partItems, setPartItems] = useState<PartItemType[]>([
      {
        id: generateRandomInt(),
        length: 0,
        quantity: type === 'stock' ? 9999 : 0,
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
  
    const addItemRow = () => {
      setPartItems([
        ...partItems,
        {
          id: generateRandomInt(),
          length: 0,
          quantity: type === 'stock' ? 9999 : 0,
          name: "",
        },
      ]);
    };
  

    const deleteItemRow = (id: number) => {
      console.log(id)
      setPartItems(partItems.filter((item) => item.id !== id));
    }

    return {
      partItems,
      handleInputChange,    
      addItemRow,
      deleteItemRow
    };
  }