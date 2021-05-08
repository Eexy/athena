import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Button, Avatar } from 'antd';

interface DashboardHeaderProps {
  displayMenuIcon: boolean;
  hideMobileMenu: boolean;
  setMobileMenuVisibility(hide: boolean): void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  displayMenuIcon,
  hideMobileMenu,
  setMobileMenuVisibility,
}) => {
  const handleClick = () => {
    setMobileMenuVisibility(!hideMobileMenu);
  };

  return (
    <div className="editor__header" style={{ padding: '1rem' }}>
      <Row align="middle" justify={displayMenuIcon ? 'space-between' : 'end'}>
        {displayMenuIcon ? (
          <Col>
            <Button onClick={handleClick}>
              <MenuOutlined />
            </Button>
          </Col>
        ) : null}
        <Col style={{ justifySelf: 'end' }}>
          <div className="user">
            <Row align="middle">
              <span className="user-email" style={{ marginRight: '0.5rem' }}>
                test@gmail.com
              </span>
              <Avatar size={32} icon={<UserOutlined />} />
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHeader;
