import { useMediaQuery } from "react-responsive";
import {Row, Button} from "antd";
import {Link} from "react-router-dom";

export const NavbarMenu = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 350px)" });

  return (
    <div className="menu">
      <Row>
        <Button type="primary"  style={isSmallScreen ? {} : {marginRight: '0.8rem'}} className="login-btn">
          <Link to="/login">Login</Link>
        </Button>
        {isSmallScreen ? null : (
          <Button>
            <Link to="/signup">Signup</Link>
          </Button>
        )}
      </Row>
    </div>
  );
};
