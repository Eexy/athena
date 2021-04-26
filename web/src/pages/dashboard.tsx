import { useHistory } from "react-router-dom";
import { TodoInputBar } from "../components/todo-input-bar";
import { TodoList } from "../components/todo-list";
import { useCreateTodoMutation, useTodosQuery } from "../generated/graphql";
import {Row} from "antd";
import {useEffect} from "react";

interface DashboardProps {
  isAuth: boolean;
  setAuth(value: boolean): void;
  removeCookie(name: string): void;
}

export const Dashboard: React.FC<DashboardProps> = ({ isAuth, removeCookie }) => {
  const history = useHistory();
  const [result, queryTodos] = useTodosQuery();
  const [, addTodo] = useCreateTodoMutation();

  useEffect(() => {
    document.title = "Athena | Dashboard"
  }, []);

  // if user is not authentified redirect to login page
  if (!isAuth) {
    history.push("/login");
  }

  const { error, fetching } = result;

  if (fetching) {
    return <div>Loading todo list</div>;
  }

  if (error) {
    console.log(error);
    history.push("/login");
    removeCookie("jid");
  }

  const addTodoCallback = async (desc: string) => {
    try{
      await addTodo({ desc });
    }catch(e){
      history.push("/login");
    }
    queryTodos();
  };

  const updateTodoList = () => {   
    queryTodos();
  }

  return (
    <main style={{ padding: "1.5rem" }}>
      <TodoInputBar addTodoCallback={addTodoCallback} />
      <Row justify="center" style={{padding: '2rem 0'}}>
        <TodoList todos={result.data?.todos} updateTodoList={updateTodoList}/>
      </Row>
    </main>
  );
};
