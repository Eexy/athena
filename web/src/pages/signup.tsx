import { useEffect } from "react";
import AuthForm from "../components/auth-form";
import PageProps from "../utils/page-props";

interface SignupProps extends PageProps{}

const Signup: React.FC<SignupProps> = ({pageName}) => {
  useEffect(() => {
    document.title = `Athena | ${pageName}`;
  }, []);

  const getAuthFormValue = (email: string, password: string) => {
    console.log({email, password});
  }

  return <div>
    <AuthForm type="signup" getAuthFormValue={getAuthFormValue}/>
  </div>;
};

export default Signup;