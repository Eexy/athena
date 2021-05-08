import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'urql';
import client from './utils/client';
import AuthContext from './context/auth-context';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/signup';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Logout from './pages/logout/logout';

function App() {
  const [auth, setAuth] = useState(false);

  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  useEffect(() => {
    if (localStorage.getItem('jid')) {
      setAuth(true);
    }
  }, [auth]);

  return (
    <Provider value={client}>
      <Router>
        <div className="App">
          <AuthContext.Provider value={value}>
            <Switch>
              <Route exact path="/">
                <Home pageName="Athena" />
              </Route>
              <Route exact path="/signin">
                <Signin pageName="Signin" />
              </Route>
              <Route exact path="/signup">
                <Signup pageName="Signup" />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard pageName="Dashboard" />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
            </Switch>
          </AuthContext.Provider>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
