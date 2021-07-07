import React from 'react';
import { Input, Button, Space, Form } from 'antd';

interface AddTodoFormProps {
  hideBox(hide: boolean): void;
  createNewTodo(desc: string): void;
}

interface TodoFormValue {
  desc: string;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({
  hideBox,
  createNewTodo,
}) => {
  const [form] = Form.useForm();

  const closeForm = () => {
    form.resetFields();
    hideBox(true);
  };

  const handleFinish = (value: TodoFormValue) => {
    createNewTodo(value.desc);
    closeForm();
  };

  return (
    <div>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="desc" rules={[{ required: true }]}>
          <Input placeholder="What you gonna do ?" />
        </Form.Item>
        <Form.Item>
          <Space size="middle">
            <Button htmlType="submit" type="primary">
              Add
            </Button>
            <Button htmlType="button" onClick={closeForm} danger>
              cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTodoForm;
