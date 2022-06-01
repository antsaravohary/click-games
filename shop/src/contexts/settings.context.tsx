import React, { useMemo } from "react";
import { siteSettings } from "@settings/site.settings";
type Action = { type: "SET_SEO",payload:any };
type State = typeof initialState;

const initialState = {
  siteTitle: siteSettings.name,
  siteSubtitle: siteSettings.description,
  currency: siteSettings.currencyCode,
  logo: {
    id: 1,
    thumbnail: siteSettings.logo.url,
    original: siteSettings.logo.url,
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: {
      id: 1,
      thumbnail: "",
      original: "",
    },
    twitterHandle: "",
    twitterCardType: "",
    metaTags: "",
    canonicalUrl: "",
  },
  google: {
    isEnable: false,
    tagManagerId: "",
  },
  facebook: {
    isEnable: false,
    appId: "",
    pageId: "",
  },
};
function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SEO": {
      
      return {
        ...state,
        seo:{
          ...state.seo,
          metaTitle:action?.payload?.metaTitle ?? state.seo.metaTitle,
        }
      };
    }
  }
}

export const SettingsContext = React.createContext<State | any>(initialState);

SettingsContext.displayName = "SettingsContext";

export const SettingsProvider: React.FC<{ initialValue: any }> = ({
  initialValue,
  ...props
}) => {
  const [state, dispatch] = React.useReducer(
    uiReducer,
    initialValue ?? initialState
  );
  const setSeo = (payload:any) => dispatch({ type: "SET_SEO",payload:payload });
  const value = useMemo(
    () => ({
      ...state,
      setSeo,
    }),
    [state]
  );
  return <SettingsContext.Provider value={value} {...props} />;
};


export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
};
