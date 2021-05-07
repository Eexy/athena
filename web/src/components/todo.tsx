import { useState } from 'react';
import {
  useUpdateTodoStatusMutation,
  useDeleteTodoMutation,
} from '../generated/graphql';
import { Card, Row, Col, Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface TodoProps {
  desc: string;
  id: string;
  completed: boolean;
  priority: number;
  updateTodoList(): void;
}

const Todo: React.FC<TodoProps> = ({
  id,
  desc,
  completed,
  priority,
  updateTodoList,
}) => {
  const [isCompleted, setCompleted] = useState(completed);
  const [, updateTodoStatus] = useUpdateTodoStatusMutation();
  const [, deleteTodo] = useDeleteTodoMutation();

  const handleStatusChange = async () => {
    try {
      await updateTodoStatus({ id, completed: !isCompleted });
      setCompleted(!isCompleted);
      updateTodoList();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteBtn = async () => {
    try {
      await deleteTodo({ id });
      updateTodoList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ padding: '0.6rem 0' }}>
      <Card>
        <Row justify='space-between' align='middle'>
          <Col>
            <Checkbox checked={isCompleted} onChange={handleStatusChange} />
            <span style={{ paddingLeft: '1rem' }}>{desc}</span>
            {priority > 0 ? (
              <span style={{ paddingLeft: '1.5rem' }}>
                priority: {priority}
              </span>
            ) : null}
          </Col>
          <Col>
            <Button onClick={handleDeleteBtn} danger>
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Todo;
