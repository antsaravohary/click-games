import { BrandType } from "@ts-types/custom.types";
import { Game } from "@ts-types/games-type";
import { Address } from "@ts-types/generated";
import { cp } from "fs/promises";
import React, { FC, useMemo } from "react";
type Shipping = {
  shipping_company: string;
  traking_number: string;
  traking_url: string;
  weight: number;
};
type repair_item = {
  repair_price: {};
  price: number;
  total_price: number;
};
export interface State {
  shipping: Shipping | null;
  repair_items: repair_item[];
  brand: BrandType;
  model_brand: {};
  amount: number;
  total_amount: number;
  step: number;
}

const defaultState = {
  shipping: null,
  repair_items: [],
  brand: {},
  model_brand: undefined,
  amount: 0,
  total_amount: 0,
  step: 1,
};
const initialState =
  typeof window !== "undefined" && localStorage.getItem("repair-create")
    ? JSON.parse(localStorage.getItem("repair-create")!)
    : defaultState;
type Action =
  | {
      type: "SET_MODEL";
      payload: {
        brand: {};
        model_brand: {};
      };
    }
  | {
      type: "SET_SHIPPING";
      payload: Shipping;
    }
  | {
      type: "SET_SHIPPING_ADDRESS";
      payload: Address;
    }
  | {
      type: "ADD_REPAIR_ITEM";
      payload: repair_item;
    }
  | {
      type: "REMOVE_REPAIR_ITEM";
      payload: any;
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        id: number;
        quantity: number;
      };
    }
  | {
      type: "SET_STEP";
      payload: number;
    }
  | {
      type: "CLEAR";
    };

export const RepairContext = React.createContext<State | any>(initialState);

RepairContext.displayName = "RepairContext";

function repairReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_MODEL": {
      return { ...state, ...action?.payload };
    }
    case "SET_SHIPPING": {
      return { ...state, shipping: action.payload };
    }
    case "SET_SHIPPING_ADDRESS": {
      return { ...state, shipping: action.payload };
    }
    case "ADD_REPAIR_ITEM": {
      const newState = {
        ...state,
        repair_items: [...state.repair_items, action.payload],
        amount: state.amount + action.payload.total_price,
      };
      newState.total_amount = newState.amount;
      return newState;
    }

    case "REMOVE_REPAIR_ITEM": {
      const newState = {
        ...state,
        repair_items: [
          ...state.repair_items.filter(
            (item) => item.repair_price.id !== action?.payload
          ),
        ],
      };
      let amount = 0;
      newState.repair_items.map((p) => {
        amount += p.total_price;
      });
      newState.amount = amount;
      newState.total_amount = amount;
      return newState;
    }
    case "SET_STEP": {
      return {
        ...state,
        step: action.payload,
      };
    }
    case "CLEAR": {
      return defaultState;
    }
  }
}

export const RepairProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(repairReducer, initialState);
  React.useEffect(() => {
    localStorage.setItem("repair-create", JSON.stringify(state));
  }, [state]);
  const setShippingAddress = (payload: Address) =>
    dispatch({ type: "SET_SHIPPING_ADDRESS", payload });
  const setModel = (payload: {}) => dispatch({ type: "SET_MODEL", payload });
  const deleteRepairItem = (payload: any) => {
    dispatch({ type: "REMOVE_REPAIR_ITEM", payload });
  };
  const addRepairItem = (payload: repair_item) =>
    dispatch({ type: "ADD_REPAIR_ITEM", payload });
  const updateQuantity = (payload: any) => {
    dispatch({ type: "UPDATE_QUANTITY", payload });
  };
  const setStep = (payload: number) => {
    dispatch({ type: "SET_STEP", payload });
  };
  const clear = (payload: number) => {
    dispatch({ type: "CLEAR", payload });
  };

  const setShipping = (payload: Shipping) => {
    dispatch({ type: "SET_SHIPPING", payload });
  };

  const value = useMemo(
    () => ({
      ...state,
      setShippingAddress,
      setModel,
      addRepairItem,
      updateQuantity,
      deleteRepairItem,
      setStep,
      setShipping,
      clear,
    }),
    [state]
  );

  return <RepairContext.Provider value={value} {...props} />;
};

export const useRepair = () => {
  const context = React.useContext(RepairContext);
  if (context === undefined) {
    throw new Error(`useGameSale must be used within a RepairProvider`);
  }
  return context;
};

export const recalcul = (state: State) => {
  return state;
};
