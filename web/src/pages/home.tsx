import { useEffect } from "react";
import PageProps from "../utils/page-props";

interface HomeProps extends PageProps{}

const Home: React.FC<HomeProps> = ({pageName}) => {


  useEffect(() => {
    document.title = `${pageName}`;
  }, [])

  return (<div>Home</div>);
}

export default Home;