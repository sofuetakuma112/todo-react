// 削除済みTODO全削除用のコンポーネント
import { Dispatch, memo, useContext } from "react";
import { AppContext } from "./AppContext";

type Props = {
  dispatch: Dispatch<Action>;
};

export const EmptyButton = memo(() => {
  const { dispatch } = useContext(AppContext);
  const handleOnEmpty = () => {
    dispatch({ type: "empty" });
  };

  return <button onClick={handleOnEmpty}>ごみ箱を空にする</button>;
});

EmptyButton.displayName = "EmptyButton";
