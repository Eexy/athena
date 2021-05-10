import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Col, Row } from 'antd';
import Sidebar from './components/sidebar';
import Editor from './components/editor';
import MobileMenu from './components/mobile-menu';
import DashboardHeader from './components/dashboard-header';
import { PageProps } from '../../utils/types';

interface DashboardProps extends PageProps {}

const Dashboard: React.FC<DashboardProps> = ({ pageName }) => {
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 900px)',
  });
  const [hideMobileMenu, setMobileMenuVisibility] = useState(false);

  useEffect(() => {
    document.title = `${pageName}`;
  });

  useEffect(() => {
    if (isLargeScreen) {
      setMobileMenuVisibility(false);
    }
  }, [isLargeScreen]);

  return (
    <div className="dashboard" style={{ height: '100%', minHeight: '100%' }}>
      <Row className="dashboard" style={{ minHeight: '100%' }}>
        {isLargeScreen ? (
          <Col style={{ minHeight: '100%' }}>
            <Sidebar />
          </Col>
        ) : null}
        <Col
          style={{
            height: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DashboardHeader
            displayMenuIcon={!isLargeScreen}
            hideMobileMenu={hideMobileMenu}
            setMobileMenuVisibility={setMobileMenuVisibility}
          />
          {hideMobileMenu ? <MobileMenu /> : <Editor />}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
