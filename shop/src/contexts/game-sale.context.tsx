import { Game } from "@ts-types/games-type";
import { Address, Attachment } from "@ts-types/generated";
import React, { FC, useMemo } from "react";
type Shipping = {
  shipping_company: string;
  traking_number: string;
  traking_url: string;
  weight: number;
};
type purchase_game = {
  game: Game;
  price: number;
  quantity: number;
  total_price: number;
};
type purchase_product = {
  id: string|number;
  name: string;
  price: number;
  quantity: number;
  total_price: number;
  gallery: Attachment[];
  description: string;
};
export interface State {
  shipping: Shipping | null;
  purchase_games: purchase_game[];
  purchase_products: purchase_product[];
  amount: number;
  total_amount: number;
  step: number;
}

const defaultState = {
  shipping: null,
  purchase_games: [],
  purchase_products: [],
  amount: 0,
  total_amount: 0,
  step: 1,
};
const initialState =
  typeof window !== "undefined" && localStorage.getItem("game-sale")
    ? JSON.parse(localStorage.getItem("game-sale")!)
    : defaultState;
type Action =
  | {
      type: "SET_SHIPPING";
      payload: Shipping;
    }
  | {
      type: "SET_SHIPPING_ADDRESS";
      payload: Address;
    }
  | {
      type: "ADD_GAME_SALE";
      payload: purchase_game;
    }
  | {
      type: "ADD_PURCHASE_PRODUCT";
      payload: purchase_product;
    }
  | {
      type: "REMOVE_GAME";
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

export const SaleGameContext = React.createContext<State | any>(initialState);

SaleGameContext.displayName = "SaleGameContext";
const recalcul = (state: State) => {
  const newState = { ...state };
  let amount = 0;
  newState.purchase_games.map((p) => {
    amount += p.total_price;
  });
  newState.amount = amount;
  newState.total_amount = amount;
  return newState;
};
function saleGameReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SHIPPING": {
      return { ...state, shipping: action.payload };
    }
    case "ADD_PURCHASE_PRODUCT": {
      const newState = {
        ...state,
        purchase_products: state?.purchase_products ?[...state?.purchase_products, action.payload]:[action.payload],
        amount: state.amount + action.payload.total_price,
      };
      newState.total_amount = newState.amount;
      return newState;
    }
    case "ADD_GAME_SALE": {
      if (
        state.purchase_games.some((p) => p.game.id === action.payload.game.id)
      ) {
        return state;
      } else {
        const newState = {
          ...state,
          purchase_games: [...state.purchase_games, action.payload],
          amount: state.amount + action.payload.total_price,
        };
        newState.total_amount = newState.amount;
        return newState;
      }
    }
    case "UPDATE_QUANTITY": {
      const purchase_products = [...state.purchase_products].map((p) => {
        if (p.id == action.payload.id) {
          p.quantity = action.payload.quantity;
          p.total_price = action.payload.quantity * p.price;
        }
        return p;
      });
      let total=0;
      purchase_products.forEach(p=>{
        total+=p.total_price;
      })
      return {
        ...state,
        purchase_products: purchase_products,
        amount:total,
        total_amount:total,
      };
    }

    case "REMOVE_GAME": {
      const newState = {
        ...state,
        purchase_games: [
          ...state.purchase_games.filter(
            (purchase_game) => purchase_game.game.id !== action?.payload
          ),
        ],
      };
      let amount = 0;
      newState.purchase_games.map((p) => {
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
export const SaleGameProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(saleGameReducer, initialState);
  React.useEffect(() => {
    localStorage.setItem("game-sale", JSON.stringify(state));
  }, [state]);
  const setShippingAddress = (payload: Address) =>
    dispatch({ type: "SET_SHIPPING_ADDRESS", payload });
  const addPurchaseProduct = (payload: purchase_product) =>
    dispatch({ type: "ADD_PURCHASE_PRODUCT", payload });
  const addGameSale = (payload: purchase_game) =>
    dispatch({ type: "ADD_GAME_SALE", payload });
  const deleteGame = (payload: any) => {
    dispatch({ type: "REMOVE_GAME", payload });
  };
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
      addGameSale,
      addPurchaseProduct,
      updateQuantity,
      deleteGame,
      setStep,
      setShipping,
      clear,
    }),
    [state]
  );

  return <SaleGameContext.Provider value={value} {...props} />;
};

export const useGameSale = () => {
  const context = React.useContext(SaleGameContext);
  if (context === undefined) {
    throw new Error(`useGameSale must be used within a SaleGameProvider`);
  }
  return context;
};
