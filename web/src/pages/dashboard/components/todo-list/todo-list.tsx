import React from 'react';
import EmptyTodoList from './empty-todolist';
import Todo from '../todo/todo';

interface TodoListProps {
  todos: Todo[];
  deleteTodo(id: string): void;
  updateTodo(id: string, completed: boolean): void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  updateTodo,
}) => (
  <div className="todolist" style={{ paddingTop: '1rem' }}>
    {todos.length === 0 ? (
      <EmptyTodoList />
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

export default TodoList;
