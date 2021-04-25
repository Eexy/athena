import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserForm } from "../components/user-form"
import { useLoginMutation} from "../generated/graphql";

interface LoginProps{
  setAuth(value: boolean): void;
  setCookie(value: string): void;
}

export const Login: React.FC<LoginProps> = ({setAuth, setCookie}) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [, login] = useLoginMutation();

  useEffect(() => {
    document.title = "Athena | Login"
  }, []);

  const handleFormFinish = async (email: string, password: string) => {
    let res = null;
    try{
      res = await login({email, password});
      console.log(res);
    }catch(e){
      console.log(e);
    }

    const {data} = res!;

    if(data?.login.error){
      setError(data.login.error);
    }

    if(data?.login.ok){
      setCookie(data.login.token!);
      setAuth(true);
      history.push("/dashboard");
    }
  } 

  return (
    <main style={{ padding: "1rem" }}>
      <UserForm type="login" handleFormFinish={handleFormFinish} error={error !== "" ? error : undefined}/>
    </main>
  );
};
