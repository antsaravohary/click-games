import React from "react";
import { cartReducer, State, initialState } from "./cart.reducer";
import { Item, getItem, inStock } from "./cart.utils";
import { useLocalStorage } from "@utils/use-local-storage";
import { CART_KEY } from "@utils/constants";
interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item["id"]) => void;
  // updateItem: (id: Item["id"], payload: object) => void;
  // updateItemQuantity: (id: Item["id"], quantity: number) => void;
  clearItemFromCart: (id: Item["id"]) => void;
  getItemFromCart: (id: Item["id"]) => any | undefined;
  isInCart: (id: Item["id"]) => boolean;
  isInStock: (id: Item["id"]) => boolean;
  resetCart: () => void;
  setClickCollect:(id: Item["id"]) => void;
  setClickGamePlus:(payload:boolean)=>void;
  // updateCartMetadata: (metadata: Metadata) => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = "CartContext";

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export const CartProvider: React.FC = (props) => {
  const [savedCart, saveCart] = useLocalStorage(
    CART_KEY,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Item, quantity: number) =>
    dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });
  const removeItemFromCart = (id: Item["id"]) =>
    dispatch({ type: "REMOVE_ITEM_OR_QUANTITY", id });
  const clearItemFromCart = (id: Item["id"]) =>
    dispatch({ type: "REMOVE_ITEM", id });
  const isInCart = (id: Item["id"]) => !!getItem(state.items, id);
  const getItemFromCart = (id: Item["id"]) => getItem(state.items, id);
  const isInStock = (id: Item["id"]) => inStock(state.items, id);
  const resetCart = () => dispatch({ type: "RESET_CART" });
  const setClickCollect=(id: Item["id"])=>dispatch({type:"SET_CLICK_COLLECT_ITEM",id});
  const setClickGamePlus=(payload:boolean)=>dispatch({type:"SET_CLICK_GAMES_PLUS",payload});
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
      setClickCollect,
      setClickGamePlus,
    }),
    [state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
