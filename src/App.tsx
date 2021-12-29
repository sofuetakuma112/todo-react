import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type Todo = {
  value: string;
  readonly id: number; // 一意であるはずの識別子が書き換えられてはならないため
  checked: boolean;
  removed: boolean;
};

type Filter = "all" | "checked" | "unchecked" | "removed";

function App() {
  /**
   * text = ステートの値
   * setText = ステートの値を更新するメソッド
   * useState の引数 = ステートの初期値 (=空の文字列)
   */
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([newTodo, ...todos]);
    setText("");
  };

  // コールバック関数として書き出すことで、
  // のちにコンポーネント間での props の受け渡しが容易になりやすい
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // idでtodoを特定して、valueを編集, 保存する
  const handleOnEdit = (id: number, value: string) => {
    // スプレッド構文による配列のコピーや
    // Array.map() メソッドによる新配列の生成は、
    // このシャローコピーにあたるので、
    // 入れ子のオブジェクトのプロパティ(valueなど)への変更は
    // 原本のデータを変更してしまっている
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
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

  const handleOnEmpty = () => {
    // プロパティは変更しないからshallow copyでOK
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === "removed" ? (
        <button
          onClick={handleOnEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ごみ箱を空にする
        </button>
      ) : (
        <form onSubmit={(e) => handleOnSubmit(e)}>
          {/*
          入力中テキストの値を text ステートが
          持っているのでそれを value として表示

          onChange イベント（＝入力テキストの変化）を
          text ステートに反映する
         */}
          <input
            type="text"
            value={text}
            disabled={filter === "checked"}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="submit"
            disabled={filter === "checked"}
            value="追加"
            onSubmit={(e) => e.preventDefault()}
          />
        </form>
      )}
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
    </div>
  );
}

export default App;
