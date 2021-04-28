import { useEffect } from "react";
import InputTodoBar from "../components/input-todo-bar";
import TodoList from "../components/todo-list";
import { useTodosQuery, useCreateTodoMutation } from "../generated/graphql";
import PageProps from "../utils/page-props";

interface DashboardProps extends PageProps {}

const Dashboard: React.FC<DashboardProps> = ({ pageName }) => {
  const [todos, todoQuery] = useTodosQuery();
  const [, createTodo] = useCreateTodoMutation();

  useEffect(() => {
    document.title = `${pageName}`;
  });

  const addTodo = async (desc: string) => {
    try{
      await createTodo({desc});
      todoQuery();
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div className="dashboard">
      <InputTodoBar addTodo={addTodo} />
      {
        todos.data ? 
          <TodoList todos={todos.data.todos} updateTodoList={todoQuery} />
        : null
      }
    </div>
  );
};

export default Dashboard;
