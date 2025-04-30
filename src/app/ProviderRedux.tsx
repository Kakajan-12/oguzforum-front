'use client'
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./Store/store";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
