import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";

export const App = () => {
  return (
      <Router>
        <header style={{ boxShadow: "0 2px 8px #f0f1f2" }}>
          <Navbar />
        </header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
  );
};
