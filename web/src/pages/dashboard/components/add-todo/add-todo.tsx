import { Button } from 'antd';
import React, { useState } from 'react';
import AddTodoForm from './add-todo-form';

interface AddTodoProps {
  createTodo(desc: string): void;
}

const AddTodo: React.FC<AddTodoProps> = ({ createTodo }) => {
  const [boxIsHidden, setBoxIsHidden] = useState(true);

  const handleClick = () => {
    setBoxIsHidden(!boxIsHidden);
  };

  const newTodo = (desc: string) => {
    createTodo(desc);
  };

  return (
    <div className="add-todo">
      {!boxIsHidden ? (
        <AddTodoForm hideBox={setBoxIsHidden} createNewTodo={newTodo} />
      ) : (
        <Button onClick={handleClick}> Add Todo </Button>
      )}
    </div>
  );
};

export default AddTodo;
