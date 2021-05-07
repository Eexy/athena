import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ExportOutlined, HomeOutlined } from '@ant-design/icons';
import logout from '../utils/logout';
import { useState } from 'react';

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = () => {
  const [current, setCurrent] = useState('dashboard');

  const handleLogoutClick = () => {
    logout();
  };

  const handleMenuClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <div className='mobile-menu' style={{ flex: 1 }}>
      <Menu
        style={{ border: 'none' }}
        onClick={handleMenuClick}
        selectedKeys={[current]}
        defaultSelectedKeys={[current]}
      >
        <Menu.Item icon={<HomeOutlined />} key='dashboard'>
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item
          icon={<ExportOutlined />}
          key='logout'
          onClick={handleLogoutClick}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MobileMenu;
