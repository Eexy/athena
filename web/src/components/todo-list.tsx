import Todo from "./todo";

interface ITodo {
  desc: string;
  id: string;
  completed: boolean;
}

interface TodoListProps {
  todos: ITodo[];
  updateTodoList(): void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodoList }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          updateTodoList={updateTodoList}
          id={todo.id}
          desc={todo.desc}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList;
