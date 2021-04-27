import { useEffect } from "react";
import AuthForm from "../components/auth-form";
import PageProps from "../utils/page-props";

interface SigninProps extends PageProps  {}

const Signin: React.FC<SigninProps> = ({pageName}) => {
  useEffect(() => {
    document.title = `Athena | ${pageName}`;
  }, []);

  const getAuthFormValue = (email: string, password: string) => {
    console.log({email, password});
  }

  return <div>
    <AuthForm type="signin" getAuthFormValue={getAuthFormValue}/>
  </div>;
};

export default Signin;