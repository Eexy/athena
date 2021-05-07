import { useEffect, useState } from 'react';
import InputTodoBar from '../components/input-todo-bar';
import TodoList from '../components/todo-list';
import { useTodosQuery, useCreateTodoMutation } from '../generated/graphql';
import PageProps from '../utils/page-props';
import { Row } from 'antd';
import MobileMenu from '../components/mobile-menu';
import Title from 'antd/lib/typography/Title';
import Sidebar from '../components/sidebar';
import { useMediaQuery } from 'react-responsive';
import DashboardHeader from '../components/dashboard-header';

interface DashboardProps extends PageProps {}

interface AddTodoFormValue {
  desc: string;
  priority?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ pageName }) => {
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 900px)',
  });
  const [todos, todoQuery] = useTodosQuery();
  const [, createTodo] = useCreateTodoMutation();
  const [isMobileMenuDisplay, displayMobileMenu] = useState(false);

  useEffect(() => {
    document.title = `${pageName}`;
  });

  const addTodo = async (values: AddTodoFormValue) => {
    try {
      await createTodo({ ...values });
      todoQuery();
    } catch (e) {
      console.log(e);
    }
  };

  const taskCounter = () => {
    if (todos.data?.todos.length) {
      const completedTask = todos.data.todos.filter((todo) => !todo.completed);
      if (completedTask.length !== 0) {
        return (
          <div style={{ padding: '0rem 0 1rem 0' }}>
            You have {completedTask.length} task(s) to finish
          </div>
        );
      }
      return null;
    }

    return null;
  };

  return (
    <Row className='dashboard' style={{ height: '100%' }}>
      {isLargeScreen ? <Sidebar /> : null}

      <div
        style={{
          padding: '1.5rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DashboardHeader
          displayMenu={isLargeScreen}
          isMobileMenuDisplay={isMobileMenuDisplay}
          displayMobileMenu={displayMobileMenu}
        />
        {isMobileMenuDisplay ? (
          <MobileMenu />
        ) : (
          <div style={{ flex: 1 }}>
            <Title level={1}>Dashboard</Title>
            {taskCounter()}
            <InputTodoBar addTodo={addTodo} />
            {todos.data ? (
              <TodoList todos={todos.data.todos} updateTodoList={todoQuery} />
            ) : null}
          </div>
        )}
      </div>
    </Row>
  );
};

export default Dashboard;
