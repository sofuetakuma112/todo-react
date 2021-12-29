// TODO追加フォームのコンポーネント
import { Dispatch, memo, useContext } from "react";
import { AppContext } from "./AppContext";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

// TSX内で、state.textの参照、変更, state.filterの参照を行う
export const Form = memo(() => {
  // useContext フックの引数に
  // AppContext (コンテクストオブジェクト（React.createContext からの戻り値）) を与えることで、
  // そこから提供されるコンテキスト (= State, Dispatch) を利用できる
  const { state, dispatch } = useContext(AppContext);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // todoの追加、textを空にする
    dispatch({ type: "submit" });
  };

  // コールバック関数として書き出すことで、
  // のちにコンポーネント間での props の受け渡しが容易になりやすい
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 新規追加用のフォームに入力した値でtextを更新する
    dispatch({ type: "change", text: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(e);
      }}
    >
      {/*
          入力中テキストの値を text ステートが
          持っているのでそれを value として表示

          onChange イベント（＝入力テキストの変化）を
          text ステートに反映する
         */}
      <input
        type="text"
        value={state.text}
        disabled={state.filter === "checked"}
        onChange={(e) => handleOnChange(e)}
      />
      <input
        type="submit"
        value="追加"
        disabled={state.filter === "checked"}
        // onSubmit={handleOnSubmit}
      />
    </form>
  );
});

Form.displayName = "Form";
