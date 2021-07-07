import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Card, Row, Col, Checkbox, Button } from 'antd';
import {
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
} from '../../../../generated/graphql';

interface TodoProps extends Todo {
  removeTodoFromList(id: string): void;
  updateTodo(id: string, completed: boolean): void;
}

const Todo: React.FC<TodoProps> = ({
  id,
  desc,
  completed,
  removeTodoFromList,
  updateTodo,
}) => {
  const [, deleteTodo] = useDeleteTodoMutation();
  const [, updateTodoStatus] = useUpdateTodoStatusMutation();

  const handleOnClick = async () => {
    removeTodoFromList(id!);
    try {
      await deleteTodo({ id: id! });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = async () => {
    updateTodo(id!, !completed);
    try {
      await updateTodoStatus({ id: id!, completed: !completed });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="todo" style={{ paddingBottom: '1rem' }}>
      <Card>
        <Row align="middle" justify="space-between">
          <Col>
            <Checkbox checked={completed} onClick={handleChange} />
            <span style={{ paddingLeft: '1rem' }}>{desc}</span>
          </Col>
          <Col>
            <Button danger onClick={handleOnClick}>
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Todo;
