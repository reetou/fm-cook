import React from 'react'
import { User } from "../types/User";

export interface UserContextProps {
  user: User | null;
  authenticated: boolean;
  token: null | string;
  showOnboarding: boolean;
  checking: boolean;
  refreshing: boolean;
  hasStaleData: boolean;
  setHasStaleData: (value: boolean) => void;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (value: boolean) => void;
  setRefreshing: (value: boolean) => void;
}

export default React.createContext<UserContextProps>({
  user: null,
  authenticated: false,
  token: null,
  showOnboarding: false,
  checking: false,
  refreshing: false,
  hasStaleData: false,
  setUser: () => {},
  setToken: () => {},
  setAuthenticated: () => {},
  setRefreshing: () => {},
  setHasStaleData: () => {},
})
