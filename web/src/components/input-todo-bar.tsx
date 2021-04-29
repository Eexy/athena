import { Form, Input, Button, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface FormValue {
  desc: string;
}

interface InputTodoBarProps {
  addTodo(desc: string): void;
}

const InputTodoBar: React.FC<InputTodoBarProps> = ({ addTodo }) => {
  const handleFormSubmit = ({ desc }: FormValue) => {
    addTodo(desc);
  };

  return (
    <div>
      <Form onFinish={handleFormSubmit} layout="vertical">
        <Row>
          <Form.Item
            name="desc"
            rules={[
              { required: true, message: "You need to enter a description" },
            ]}
            style={{ minWidth: "280px" }}
          >
            <Input placeholder="Do homework, clean the house..." />
          </Form.Item>
          <Form.Item>
            <Button style={{marginLeft: '0.2rem'}} htmlType="submit" type="primary">
              <PlusOutlined />
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default InputTodoBar;
