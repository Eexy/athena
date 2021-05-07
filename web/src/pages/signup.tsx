import { useEffect } from 'react';
import { useHistory } from 'react-router';
import AuthForm from '../components/auth-form';
import { useRegisterMutation } from '../generated/graphql';
import PageProps from '../utils/page-props';
import { Row, Col } from 'antd';

interface SignupProps extends PageProps {
  setAuth(auth: boolean): void;
}

const Signup: React.FC<SignupProps> = ({ pageName, setAuth }) => {
  const history = useHistory();
  const [, signup] = useRegisterMutation();

  useEffect(() => {
    document.title = `Athena | ${pageName}`;
  }, []);

  const getAuthFormValue = async (email: string, password: string) => {
    try {
      const res = await signup({ email, password });
      const { data } = res;

      if (data?.register.token) {
        localStorage.setItem('jid', data.register.token);
        setAuth(true);
        history.push('/dashboard');
      }
    } catch (e) {}
  };

  return (
    <Row justify="center" style={{ padding: '1.5rem 0' }}>
      <Col>
        <AuthForm type="signup" getAuthFormValue={getAuthFormValue} />
      </Col>
    </Row>
  );
};

export default Signup;
