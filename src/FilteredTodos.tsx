// TODOの一覧表示用のコンポーネント
import { Dispatch, memo, useContext } from "react";
import { AppContext } from "./AppContext";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

// filterによるtodosのフィルタリングにstate.todosを使用する
export const FilteredTodos = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  // idでtodoを特定して、valueを編集, 保存する
  const handleOnEdit = (id: number, value: string) => {
    // idが一致するtodoのvalueを更新する
    dispatch({ type: "edit", id, value });
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    // idが一致するtodoのcheckedを反転する
    dispatch({ type: "check", id, checked });
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    // idが一致するtodoのremovedを反転する
    dispatch({ type: "remove", id, removed });
  };

  const filteredTodos = state.todos.filter((todo) => {
    switch (state.filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <ul>
      {filteredTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={(e) => handleOnCheck(todo.id, todo.checked)}
            />
            <input
              type="text"
              value={todo.value}
              disabled={todo.checked || todo.removed}
              onChange={(e) => handleOnEdit(todo.id, e.target.value)}
            />
            <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
              {todo.removed ? "復元" : "削除"}
            </button>
          </li>
        );
      })}
    </ul>
  );
});
