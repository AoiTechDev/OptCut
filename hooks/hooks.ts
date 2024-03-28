import { InputChange, PartItemType } from "@/types/types";
import { useState } from "react";

export function usePartItems() {
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
  
    const addItemRow = () => {
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
  
    return {
      partItems,
      handleInputChange,
      addItemRow,
    };
  }