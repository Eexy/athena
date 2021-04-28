import { useState } from "react";
import { useUpdateTodoStatusMutation, useDeleteTodoMutation } from "../generated/graphql";

interface TodoProps {
  desc: string;
  id: string;
  completed: boolean;
  updateTodoList(): void;
}

const Todo: React.FC<TodoProps> = ({ id, desc, completed, updateTodoList }) => {
  const [isCompleted, setCompleted] = useState(completed);
  const [, updateTodoStatus] = useUpdateTodoStatusMutation();
  const [, deleteTodo] = useDeleteTodoMutation();

  const handleStatusChange = async () => {
    try {
      await updateTodoStatus({ id, completed: !isCompleted });
      setCompleted(!isCompleted);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteBtn = async () => {
    try{
      await deleteTodo({id});
      updateTodoList();
    }catch(e){
      console.log(e);
    }
  }

  return (
    <li className="todo">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleStatusChange}
      />
      {desc}
      <button onClick={handleDeleteBtn}>delete</button>
    </li>
  );
};

export default Todo;
