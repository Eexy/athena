import Title from 'antd/lib/typography/Title';
import DashboardMenu from './dashboard-menu';

const Sidebar: React.FC = () => {
  return (
    <div
      className="sidebar"
      style={{
        padding: '1rem 0',
        width: '230px',
        borderRight: '1px solid #f0f0f0',
        minHeight: '100%'
      }}
    >
      <Title level={3} style={{ paddingLeft: '1.5rem' }}>
        .athena
      </Title>
      <DashboardMenu />
    </div>
  );
};

export default Sidebar;
