import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputTodoBar from "../components/input-todo-bar";
import { useTodosQuery, useCreateTodoMutation } from "../generated/graphql";
import PageProps from "../utils/page-props";

interface DashboardProps extends PageProps {}

const Dashboard: React.FC<DashboardProps> = ({ pageName }) => {
  const history = useHistory();
  const [todos, todoQuery] = useTodosQuery();
  const [, createTodo] = useCreateTodoMutation();

  useEffect(() => {
    document.title = `${pageName}`;
  });

  const addTodo = async (desc: string) => {
    try{
      const res = await createTodo({desc});
      const {data} = res;
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div className="dashboard">
      <InputTodoBar addTodo={addTodo} />
      {
        todos.data ? 
          <div className="todos-list">
            {
              todos.data.todos.map((todo) => <div key={todo.id}>{todo.desc}</div>)
            }
          </div>
        : null
      }
    </div>
  );
};

export default Dashboard;
