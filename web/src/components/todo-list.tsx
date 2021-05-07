import Todo from './todo';

interface ITodo {
  desc: string;
  id: string;
  completed: boolean;
  priority: number;
}

interface TodoListProps {
  todos: ITodo[];
  updateTodoList(): void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodoList }) => {
  return (
    <div className='todo-list'>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          updateTodoList={updateTodoList}
          id={todo.id}
          desc={todo.desc}
          completed={todo.completed}
          priority={todo.priority}
        />
      ))}
    </div>
  );
};

export default TodoList;
