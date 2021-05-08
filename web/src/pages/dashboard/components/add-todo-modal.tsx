import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Select } from 'antd';
import { ITodo } from '../../../utils/types';

const { Option } = Select;

interface AddTodoModalProps {
  isVisible: boolean;
  closeModal(): void;
  handleOk(todo: ITodo): void;
}

interface newTodoValues {
  desc: string;
  priority: string;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isVisible,
  closeModal,
  handleOk,
}) => {
  const handleFormFinish = (newTodoValue: newTodoValues) => {
    const todo: ITodo = {
      desc: newTodoValue.desc,
      priority: parseInt(newTodoValue.priority),
    };

    handleOk(todo);
    closeModal();
  };

  return (
    <Modal
      title="Add Todo"
      visible={isVisible}
      onCancel={() => closeModal()}
      destroyOnClose={true}
      footer={null}
    >
      <Form
        onFinish={handleFormFinish}
        initialValues={{ desc: '', priority: '0' }}
        colon={true}
        layout="vertical"
      >
        <Form.Item
          name="desc"
          label="Description"
          rules={[
            {
              required: true,
              message: "You need to enter a todo's description",
            },
          ]}
        >
          <Input placeholder="Do homework, clean the house..." allowClear />
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Select>
            <Option value="0">Basic</Option>
            <Option value="1">Priority 1</Option>
            <Option value="2">Priority 2</Option>
            <Option value="3">Priority 3</Option>
            <Option value="4">Priority 4</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="reset" danger style={{ marginRight: '0.5rem' }}>
            <DeleteOutlined />
            Reset
          </Button>
          <Button htmlType="submit" type="primary">
            <PlusOutlined /> Add Todo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTodoModal;
