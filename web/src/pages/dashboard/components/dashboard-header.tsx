import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Button, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useMeQuery } from '../../../generated/graphql';

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
  const [me, meQuery] = useMeQuery();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const { data } = me;
    if (data) {
      setEmail(data.me.email);
    }
  }, [me]);

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
                {email}
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
