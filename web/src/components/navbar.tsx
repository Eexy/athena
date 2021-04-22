import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { NavbarMenu } from "./navbar-menu";
import {Link} from "react-router-dom";

export const Navbar = () => {
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
          <NavbarMenu />
        </Col>
      </Row>
    </nav>
  );
};
