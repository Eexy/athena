import { Col, Row, Card, Form, Input, Divider, Button, Alert } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface UserFormProps {
  type: string;
  error?: string;
  handleFormFinish: (email: string, password: string) => Promise<void>;
}

export const UserForm: React.FC<UserFormProps> = ({
  type,
  error,
  handleFormFinish,
}) => {
  return (
    <Row justify="center">
      <Col>
        <Card title={type === "login" ? "Login" : "Signup"}>
          <Form
            colon={true}
            onFinish={(values) =>
              handleFormFinish(values.email, values.password)
            }
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password
                prefix={<KeyOutlined className="site-form-item-icon" />}
                placeholder="password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                htmlType={"submit"}
              >
                {type === "login" ? "Login" : "Signup"}
              </Button>
            </Form.Item>
            {error ? <Alert message={error} type="error" /> : null}
          </Form>

          <Divider />
          <Link to={type === "login" ? "/signup" : "/login"}>
            <Button style={{ width: "100%" }}>
              {type === "login" ? "Signup" : "Login"}
            </Button>
          </Link>
        </Card>
      </Col>
    </Row>
  );
};
