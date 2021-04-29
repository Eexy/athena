import { useEffect } from "react";
import InputTodoBar from "../components/input-todo-bar";
import TodoList from "../components/todo-list";
import { useTodosQuery, useCreateTodoMutation } from "../generated/graphql";
import PageProps from "../utils/page-props";
import { Row, Col } from "antd";

interface DashboardProps extends PageProps {}

const Dashboard: React.FC<DashboardProps> = ({ pageName }) => {
  const [todos, todoQuery] = useTodosQuery();
  const [, createTodo] = useCreateTodoMutation();

  useEffect(() => {
    document.title = `${pageName}`;
  });

  const addTodo = async (desc: string) => {
    try {
      await createTodo({ desc });
      todoQuery();
      console.log(todos);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Row className="dashboard" justify="center" style={{ padding: "1.5rem" }}>
      <Col style={{maxWidth: "650px"}}>
        <InputTodoBar addTodo={addTodo} />
        {todos.data ? (
          <TodoList todos={todos.data.todos} updateTodoList={todoQuery} />
        ) : null}
      </Col>
    </Row>
  );
};

export default Dashboard;
