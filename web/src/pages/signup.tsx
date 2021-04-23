import { UserForm } from "../components/user-form";
import { useRegisterMutation} from "../generated/graphql";
import { useState } from "react";
import { useHistory } from "react-router";


interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [, register] = useRegisterMutation();


  const handleFormFinish = async (email: string, password: string) => {
    const res = await register({email, password});
    const {data} = res;

    if(data?.register.error){
      setError(data.register.error);
    }

    if(data?.register.ok){
      history.push("/");
    }
  } 

  return (
    <main style={{ padding: "1rem" }}>
      <UserForm type="signup" handleFormFinish={handleFormFinish} error={error !== "" ? error : undefined}/>
    </main>
  );
};
