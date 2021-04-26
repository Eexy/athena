import { useMediaQuery } from "react-responsive";
import { Row, Button } from "antd";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../generated/graphql";

interface NavbarMenuProps {
  isAuth: boolean;
  setAuth(value: boolean): void;
  removeCookie(name: string): void;
}

export const NavbarMenu: React.FC<NavbarMenuProps> = ({ isAuth, setAuth, removeCookie }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 350px)" });
  const [,logout] = useLogoutMutation();

  const handleLogoutButton = async () => {
    await logout();
    removeCookie('jid');
    setAuth(false);
  }

  const authenticatedMenu = () => {
    return (
      <Row>
        <Link to="/dashboard">
          <Button
            type="primary"
            style={isSmallScreen ? {} : { marginRight: "0.8rem" }}
            className="dashboard-btn"
          >
            Dashboard
          </Button>
        </Link>
        {isSmallScreen ? null : (
          <Link to="/" >
            <Button onClick={handleLogoutButton}>Logout</Button>
          </Link>
        )}
      </Row>
    );
  };

  const menu = () => {
    return (
      <Row>
        <Link to="/login">
          <Button
            type="primary"
            style={isSmallScreen ? {} : { marginRight: "0.8rem" }}
            className="login-btn"
          >
            Login
          </Button>
        </Link>
        {isSmallScreen ? null : (
          <Link to="/signup">
            <Button>Signup</Button>
          </Link>
        )}
      </Row>
    );
  };

  return <div className="menu">{isAuth ? authenticatedMenu() : menu()}</div>;
};
