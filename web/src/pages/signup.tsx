import { useEffect } from "react";
import AuthForm from "../components/auth-form";
import { useRegisterMutation } from "../generated/graphql";
import PageProps from "../utils/page-props";

interface SignupProps extends PageProps{
  
}

const Signup: React.FC<SignupProps> = ({pageName}) => {
  const [, signup] = useRegisterMutation();

  useEffect(() => {
    document.title = `Athena | ${pageName}`;
  }, []);

  const getAuthFormValue = async (email: string, password: string) => {
    try{
      const res = await signup({email, password});
      const {data} = res;

      if(data?.register.token){
        localStorage.setItem('jid',data.register.token);
      }
    }catch(e){
      console.log(e);
    }

  }

  return <div>
    <AuthForm type="signup" getAuthFormValue={getAuthFormValue}/>
  </div>;
};

export default Signup;