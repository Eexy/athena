import { FormEvent, useState } from "react";

interface InputTodoBarProps {
  addTodo(desc: string): void;
}

const InputTodoBar: React.FC<InputTodoBarProps> = ({addTodo}) => {
  const [desc, setDesc] = useState("");

  const handleDescChange = (value: string) => {
    setDesc(value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(desc);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={desc}
          onChange={(e) => handleDescChange(e.target.value)}
          required
        />
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
};

export default InputTodoBar;
