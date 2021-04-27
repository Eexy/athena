import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTodosQuery } from "../generated/graphql";
import PageProps from "../utils/page-props";

interface DashboardProps extends PageProps{
  getAuthCookie(): string;
}

const Dashboard: React.FC<DashboardProps> = ({pageName, getAuthCookie}) => {
  const history = useHistory();
  const [todos, queryTodos] = useTodosQuery();

  console.log(todos);

  useEffect(() => {
    document.title = `${pageName}`;
  })

  if(getAuthCookie() === undefined){
    history.push('/signin');
  }

  return (<div>
    Dashboard
  </div>)
}

export default Dashboard;