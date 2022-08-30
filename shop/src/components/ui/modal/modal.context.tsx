import React from "react";

type MODAL_VIEWS =
  | "REGISTER"
  | "LOGIN_VIEW"
  | "FORGOT_VIEW"
  | "ADD_OR_UPDATE_ADDRESS"
  | "DELETE_ADDRESS"
  | "DELETE_STRIPE_CARD"
  | "PRODUCT_DETAILS"
  | "ADD_TICKET"
  | "PRODUCT_AVIS"
  | "SHOP_INFO"
  | "STRIPE_PAYMENT_FORM"
  | "DELIVERY_RELAY_POINT"
  | "NOTICE_LIST"
  | "GAME_SALE_ADD_FORM"
  | "PAYMENT_ERROR"
  | "REPAIR_TRACK_LABEL"
  | "DELIVERY_FORM"
  | "PAYMENT_SUCCESS"
  | "PURCHASE_PRODUCT_DETAIL_MODAL"
  | "PURCHASE_PURPOSE_VIEW";

interface State {
  view?: MODAL_VIEWS;
  data?: any;
  isOpen: boolean;
}
type Action =
  | { type: "open"; view?: MODAL_VIEWS; payload?: any }
  | { type: "close" };

const initialState: State = {
  view: undefined,
  isOpen: false,
  data: null,
};

function modalReducer(state: State, action: Action): State {
  switch (action.type) {
    case "open":
      return {
        ...state,
        view: action.view,
        data: action.payload,
        isOpen: true,
      };
    case "close":
      return {
        ...state,
        view: undefined,
        data: null,
        isOpen: false,
      };
    default:
      throw new Error("Unknown Modal Action!");
  }
}

const ModalStateContext = React.createContext<State>(initialState);
ModalStateContext.displayName = "ModalStateContext";
const ModalActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);
ModalActionContext.displayName = "ModalActionContext";

export const ModalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, initialState);
  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error(`useModalState must be used within a ModalProvider`);
  }
  return context;
}

export function useModalAction() {
  const dispatch = React.useContext(ModalActionContext);
  if (dispatch === undefined) {
    throw new Error(`useModalAction must be used within a ModalProvider`);
  }
  return {
    openModal(view?: MODAL_VIEWS, payload?: unknown) {
      dispatch({ type: "open", view, payload });
    },
    closeModal() {
      dispatch({ type: "close" });
    },
  };
}
