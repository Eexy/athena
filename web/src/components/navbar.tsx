import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { NavbarMenu } from "./navbar-menu";
import {Link} from "react-router-dom";

interface NavbarProps{
  isAuth: boolean;
  setAuth(value: boolean): void;
  removeCookie(name: string): void;
}

export const Navbar: React.FC<NavbarProps> = ({isAuth, setAuth, removeCookie}) => {
  return (
    <nav className="navbar">
      <Row style={{ padding: "0.8rem" }} justify="space-between">
        <Col>
          <Link to="/">
            <Title level={3} style={{ margin: "0" }} className="logo">
              Athena
            </Title>
          </Link>
        </Col>
        <Col>
          <NavbarMenu isAuth={isAuth} setAuth={setAuth} removeCookie={removeCookie}/>
        </Col>
      </Row>
    </nav>
  );
};
