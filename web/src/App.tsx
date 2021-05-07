import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Home from './pages/home';
import { Provider } from 'urql';
import client from './utils/client';
import Dashboard from './pages/dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('jid')) {
      setAuth(true);
    }
  }, [isAuth]);

  return (
    <Provider value={client}>
      <Router>
        <div className='App'>
          <main>
            <Switch>
              <Route exact path='/'>
                <Header setAuth={setAuth} isAuth={isAuth} />

                <Home pageName='Athena' />
              </Route>
              <Route exact path='/signin'>
                <Header setAuth={setAuth} isAuth={isAuth} />

                <Signin pageName='Signin' setAuth={setAuth} />
              </Route>
              <Route exact path='/signup'>
                <Header setAuth={setAuth} isAuth={isAuth} />

                <Signup pageName='Signup' setAuth={setAuth} />
              </Route>
              <Route exact path='/dashboard'>
                <Dashboard pageName='Dashboard' />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
