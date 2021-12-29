import { useReducer } from "react";
import "./App.scss";

import { reducer } from "./reducer";
import { initialState } from "./initialState";

import { Form } from "./Form";
import { Selector } from "./Selector";
import { EmptyButton } from "./EmptyButton";
import { FilteredTodos } from "./FilteredTodos";

import { AppContext } from "./AppContext";

export const App = (): JSX.Element => {
  /**
   * text = ステートの値
   * setText = ステートの値を更新するメソッド
   * useState の引数 = ステートの初期値 (=空の文字列)
   */
  // const [ステート, reducerを呼び出す用の関数]
  // = useReducer(ステートを更新するための関数, ステートの初期値);
  // reducerのAction型から、dispatchの引数の型を推論している？
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <Selector />
        {state.filter === "removed" ? <EmptyButton /> : <Form />}
        <FilteredTodos />
      </div>
    </AppContext.Provider>
  );
};

export default App;
