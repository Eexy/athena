import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";

export const App = () => {
  const [isAuth, setAuth] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(['jid']);

  function getCookie(value: string){
    console.log(value);
    setCookies('jid', "test", {path: '/'});
  }

  return (
    <CookiesProvider>
      <Router>
        <header style={{ boxShadow: "0 2px 8px #f0f1f2" }}>
          <Navbar isAuth={isAuth} setAuth={setAuth} removeCookie={removeCookie}/>
        </header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login setAuth={setAuth} setCookie={getCookie}/>
          </Route>
          <Route exact path="/signup">
            <Signup setAuth={setAuth} setCookie={getCookie}/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard isAuth={isAuth} setAuth={setAuth} removeCookie={removeCookie}/>
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
};
