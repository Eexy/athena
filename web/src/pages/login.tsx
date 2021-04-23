import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserForm } from "../components/user-form"
import { useLoginMutation} from "../generated/graphql";



interface LoginProps{}

export const Login: React.FC<LoginProps> = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [, login] = useLoginMutation();


  const handleFormFinish = async (email: string, password: string) => {
    const res = await login({email, password});
    const {data} = res;

    if(data?.login.error){
      setError(data.login.error);
    }

    if(data?.login.ok){
      history.push("/dashboard");
    }
  } 

  return (
    <main style={{ padding: "1rem" }}>
      <UserForm type="login" handleFormFinish={handleFormFinish} error={error !== "" ? error : undefined}/>
    </main>
  );
};
