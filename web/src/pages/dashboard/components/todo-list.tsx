import { ITodo } from '../../../utils/types';
import Todo from './todo';

interface TodoListProps {
  todos: ITodo[];
  deleteTodo(id: string): void;
  updateTodo(id: string, completed: boolean): void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <div className="todolist" style={{paddingTop: '1rem'}}>
      {todos.length === 0 ? (
        <p>no todo</p>
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            priority={todo.priority}
            desc={todo.desc}
            completed={todo.completed}
            removeTodoFromList={deleteTodo}
            updateTodo={updateTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
