import { UserForm } from "../components/user-form";
import { useRegisterMutation} from "../generated/graphql";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";


interface SignupProps {
  setAuth(value: boolean): void;
  setCookie(value: string): void;
}

export const Signup: React.FC<SignupProps> = ({setAuth, setCookie}) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [, register] = useRegisterMutation();

  useEffect(() => {
    document.title = "Athena | Signup"
  }, []);


  const handleFormFinish = async (email: string, password: string) => {
    const res = await register({email, password});
    const {data} = res;

    if(data?.register.error){
      setError(data.register.error);
    }

    if(data?.register.ok){
      setCookie(data.register.token!);
      setAuth(true);
      history.push("/dashboard");
    }
  } 

  return (
    <main style={{ padding: "1rem" }}>
      <UserForm type="signup" handleFormFinish={handleFormFinish} error={error !== "" ? error : undefined}/>
    </main>
  );
};
