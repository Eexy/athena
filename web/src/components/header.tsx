import { Link } from 'react-router-dom';
import { Row, Typography } from 'antd';
import HeaderMenu from './header-menu';

const { Title } = Typography;

interface HeaderProps {
  setAuth(auth: boolean): void;
  isAuth: boolean;
}

const Header: React.FC<HeaderProps> = ({ setAuth, isAuth }) => {
  return (
    <header
      className='header'
      style={{ padding: '0.8rem', boxShadow: '0 2px 8px #f0f1f2' }}
    >
      <Row justify='space-between' align='middle'>
        <Link to='/'>
          <Title
            level={2}
            style={{ marginBottom: '0' }}
            id='athena-header-logo'
          >
            Athena
          </Title>
        </Link>
        <nav className='navbar'>
          <HeaderMenu setAuth={setAuth} isAuth={isAuth} />
        </nav>
      </Row>
    </header>
  );
};

export default Header;
