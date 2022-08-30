import React, { useMemo } from "react";
import { siteSettings } from "@settings/site.settings";
type Action = { type: "SET_USER"; payload: any };
type State = {
  user: any;
  click_game_plus:boolean;
};

const initialState = {
  user: null,
  click_game_plus:false,
};
function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
  }
}

export const UserContext = React.createContext<State | any>(initialState);

UserContext.displayName = "UserContext";

export const UserProvider: React.FC<{ initialValue: any }> = ({
  initialValue,
  ...props
}) => {
  const [state, dispatch] = React.useReducer(
    uiReducer,
    initialValue ?? initialState
  );
  const setUser = (payload: any) =>
    dispatch({ type: "SET_USER", payload: payload });
  const value = useMemo(
    () => ({
      ...state,
      setUser,
    }),
    [state]
  );
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvier`);
  }
  return context;
};
