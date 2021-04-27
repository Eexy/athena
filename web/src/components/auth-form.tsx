import { FormEvent, useState } from "react";
import isEmail from "validator/lib/isEmail";

interface AuthFormProps {
  type: string;
  getAuthFormValue(email: string, password: string): void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, getAuthFormValue }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    // check if it's a valid email
    if(isEmail(email)){
      getAuthFormValue(email, password);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  return (
    <div>
      <form className="form" id="auth-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">email : </label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password : </label>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            minLength={6}
          />
          {type === "signup" ? (
            <input
              required
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              minLength={6}
            />
          ) : null}
        </div>
        <div className="form-ctas">
          <button type="submit">{type}</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
