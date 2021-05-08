import React from 'react';
import isEmail from 'validator/lib/isEmail';
import { Card, Form, Input, Button, Divider, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface AuthFormProps {
  type: string;
  getAuthFormValue(email: string, password: string): void;
}

interface AuthFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, getAuthFormValue }) => {
  const handleFormSubmit = ({
    email,
    password,
    confirmPassword,
  }: AuthFormValues) => {
    if (!isEmail(email)) {
      return console.log('invalid email');
    }

    if (password !== confirmPassword && type === 'signup') {
      return console.log("passwords don't match");
    }

    return getAuthFormValue(email, password);
  };

  return (
    <Card style={{ width: '300px' }}>
      <Title level={3} style={{ textTransform: 'capitalize' }}>
        {type}
      </Title>
      <Divider />
      <Form
        className="form"
        id="auth-form"
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email : "
          rules={[{ required: true, message: 'Please enter an email' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password : "
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        {type === 'signup' ? (
          <Form.Item
            name="confirmPassword"
            label="Confirm your password :"
            rules={[
              { required: true, message: 'You need to confirm your password' },
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
        ) : null}
        <Form.Item>
          <Button
            htmlType="submit"
            style={{ textTransform: 'capitalize', width: '100%' }}
            type="primary"
          >
            {type}
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Link to={type === 'signup' ? '/signin' : '/signup'}>
        <Button style={{ width: '100%' }}>
          {type === 'signup' ? 'Signin' : 'Signup'}
        </Button>
      </Link>
    </Card>
  );
};

export default AuthForm;
