import React, { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import TodoCounter from '../components/todo-counter/todo-counter';
import TodoList from '../components/todo-list/todo-list';
import {
  useCreateTodoMutation,
  useTodosQuery,
} from '../../../generated/graphql';
import AddTodo from '../components/add-todo/add-todo';

const Editor: React.FC = () => {
  const [res, _] = useTodosQuery();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [, createTodo] = useCreateTodoMutation();
  const [incompleted, setIncompleted] = useState(0);

  const { data, fetching } = res;

  // update todos when we get them from the server
  useEffect(() => {
    if (data) {
      setTodos([...todos, ...data.todos]);
    }
  }, [data]);

  // Calculate number of todo incompleted
  useEffect(() => {
    const n = todos.filter((todo) => todo.completed !== true).length;
    setIncompleted(n);
  }, [todos]);

  const addTodo = async (desc: string) => {
    try {
      const addDataRes = await createTodo({ desc, priority: 0 });
      const newData = addDataRes.data;
      const newTodo = {
        id: newData?.createTodo.id,
        desc,
        priority: 0,
      };
      setTodos([...todos, newTodo]);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos]);
  };

  const updateTodo = (id: string, completed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newTodo = todo;
        newTodo.completed = completed;

        return newTodo;
      }

      return todo;
    });
    setTodos([...newTodos]);
  };

  return (
    <div className="editor" style={{ flex: 1, padding: '1rem' }}>
      <Title level={1} style={{ margin: 0 }}>
        Dashboard
      </Title>
      <TodoCounter incompleted={incompleted} />
      <AddTodo createTodo={addTodo} />
      {fetching ? (
        <p>fetching</p>
      ) : (
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
};

export default Editor;
