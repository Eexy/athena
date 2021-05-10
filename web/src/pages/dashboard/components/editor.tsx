import Title from 'antd/lib/typography/Title';
import TodoCounter from './todo-counter';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import AddTodoModal from './add-todo-modal';
import { ITodo } from '../../../utils/types';
import TodoList from './todo-list';
import {
  useCreateTodoMutation,
  useTodosQuery,
} from '../../../generated/graphql';
import { PlusOutlined } from '@ant-design/icons';

const Editor: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [res, todosQuery] = useTodosQuery();
  const [todos, setTodos] = useState<ITodo[]>([]);
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
    const n = todos.filter(todo => todo.completed !== true).length;
    setIncompleted(n);
  }, [todos]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (todo: ITodo) => {
    try {
      const {data} = await createTodo({ ...todo });
      todo.id = data?.createTodo.id;
      setTodos([...todos, todo]);
    } catch (e) {
      console.log(e);
    }
    setIsModalVisible(false);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos]);
  };

  const updateTodo = (id: string, completed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = completed;
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
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
        Add Todo
      </Button>
      <AddTodoModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        handleOk={handleOk}
      />
      {fetching ? (
        <p>fetching</p>
      ) : (
        <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      )}
    </div>
  );
};

export default Editor;
