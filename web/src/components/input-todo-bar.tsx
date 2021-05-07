import { Form, Input, Button, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface FormValue {
  desc: string;
  priority?: string | number;
}

interface InputTodoBarProps {
  addTodo(values: FormValue): void;
}

const InputTodoBar: React.FC<InputTodoBarProps> = ({ addTodo }) => {
  const handleFormSubmit = (values: FormValue) => {
    if (!values.priority) {
      values.priority = 0;
    }

    values.priority = parseInt(values.priority as string);

    addTodo(values);
  };

  return (
    <div>
      <Form onFinish={handleFormSubmit} layout='vertical'>
        <Row>
          <Form.Item
            name='desc'
            rules={[
              { required: true, message: 'You need to enter a description' },
            ]}
            style={{ minWidth: '280px' }}
          >
            <Input placeholder='Do homework, clean the house...' />
          </Form.Item>
          <Form.Item name='priority' style={{ padding: '0 0.5rem 0 0.5rem' }}>
            <Select placeholder='Select a priority'>
              <Option value='0'>Basic</Option>
              <Option value='1'>Priority 1</Option>
              <Option value='2'>Priority 2</Option>
              <Option value='3'>Priority 3</Option>
              <Option value='4'>Priority 4</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginLeft: '0.2rem' }}
              htmlType='submit'
              type='primary'
            >
              <PlusOutlined />
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default InputTodoBar;
