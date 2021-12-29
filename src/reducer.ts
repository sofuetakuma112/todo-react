// reducer メソッド
// actionを受け取って、stateを更新する
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // 新規追加用のフォームのvalue
    case "change": {
      return { ...state, text: action.text };
    }
    case "check": {
      const deepCopy: Todo[] = JSON.parse(JSON.stringify(state.todos));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.checked = !action.checked;
        }
        return todo;
      });

      return { ...state, todos: newTodos };
    }
    case "edit": {
      // スプレッド構文による配列のコピーや
      // Array.map() メソッドによる新配列の生成は、
      // このシャローコピーにあたるので、
      // 入れ子のオブジェクトのプロパティ(valueなど)への変更は
      // 原本のデータを変更してしまっている
      const deepCopy: Todo[] = JSON.parse(JSON.stringify(state.todos));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.value = action.value;
        }
        return todo;
      });

      return { ...state, todos: newTodos };
    }
    case "empty": {
      // プロパティは変更しないからshallow copyでOK
      const newTodos = state.todos.filter((todo) => !todo.removed);
      return { ...state, todos: newTodos };
    }
    case "filter": {
      return { ...state, filter: action.filter };
    }
    case "remove": {
      const deepCopy: Todo[] = JSON.parse(JSON.stringify(state.todos));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.removed = !action.removed;
        }
        return todo;
      });

      return { ...state, todos: newTodos };
    }
    case "submit": {
      if (!state.text) return state;

      const newTodo: Todo = {
        value: state.text,
        id: new Date().getTime(),
        checked: false,
        removed: false,
      };

      return { ...state, todos: [newTodo, ...state.todos], text: "" };
    }

    default: {
      return state;
    }
  }
};
