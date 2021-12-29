// フィルタリング用セレクタのコンポーネント
import { Dispatch, memo, useContext } from "react";
import { AppContext } from "./AppContext";

type Props = {
  dispatch: Dispatch<Action>;
};

export const Selector = memo(() => {
  const { dispatch } = useContext(AppContext);
  // state.filter の書き換えを行う
  const handleOnFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "filter", filter: e.target.value as Filter });
  };

  return (
    <select defaultValue="all" onChange={handleOnFilter}>
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ごみ箱</option>
    </select>
  );
});

Selector.displayName = "Selector";
