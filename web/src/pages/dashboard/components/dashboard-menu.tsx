import { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ExportOutlined, HomeOutlined } from '@ant-design/icons';

const DashboardMenu: React.FC = () => {
  // set the current active item. Dashboard by default
  const [current, setCurrent] = useState('dashboard');

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      selectedKeys={[current]}
      defaultSelectedKeys={[current]}
      onClick={handleClick}
      style={{border: 'none'}}
    >
      <Menu.Item icon={<HomeOutlined />} key="dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item icon={<ExportOutlined />} key="logout">
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

export default DashboardMenu;
