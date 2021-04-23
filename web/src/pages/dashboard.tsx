import { useHistory } from "react-router-dom";
import { TodoInputBar } from "../components/todo-input-bar";
import { TodoList } from "../components/todo-list";
import { useCreateTodoMutation, useTodosQuery } from "../generated/graphql";

interface DashboardProps {
  isAuth: boolean;
  setAuth(value: boolean): void;
}

export const Dashboard: React.FC<DashboardProps> = ({ isAuth }) => {
  const history = useHistory();
  const [result, queryTodos] = useTodosQuery();
  const [, addTodo] = useCreateTodoMutation();

  // if user is not authentified redirect to login page
  if (!isAuth) {
    history.push("/login");
  }

  const { error, fetching } = result;

  if (fetching) {
    return <div>Loading todo list</div>;
  }

  if (error) {
    history.push("/login");
  }

  const addTodoCallback = async (desc: string) => {
    const res = await addTodo({desc});
    queryTodos();
    console.log(result);
  }

  return (
    <main style={{padding: '1.5rem'}}>
      <TodoInputBar addTodoCallback={addTodoCallback} />
      <TodoList todos={result.data?.todos} />
    </main>
  );
};
