import { createContext, Dispatch } from "react";

// const MyContext = React.createContext(defaultValue);
export const AppContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);
