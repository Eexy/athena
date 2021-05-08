import React, { useEffect } from 'react';
import Header from '../../shared-components/header';
import { PageProps } from '../../utils/types';

interface HomeProps extends PageProps {}

const Home: React.FC<HomeProps> = ({ pageName }) => {
  useEffect(() => {
    document.title = `${pageName}`;
  }, []);

  return (
    <>
      <Header />
      <div>Hello World</div>
    </>
  );
};

export default Home;
