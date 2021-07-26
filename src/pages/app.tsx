import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import MenuAppBar from '../components/appbar/appbar';
import Routes from '../routing/routes';
import LoaderFullScreen from '../components/loader/LoaderFullScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <MenuAppBar />
        <main>
          <GuardProvider loading={LoaderFullScreen} error="Forbidden">
            <Switch>
              {Object.values(Routes).map((route) => (
                <GuardedRoute
                  key={route.path}
                  exact
                  path={route.path}
                  guards={route.guards || []}
                  component={route.component}
                />
              ))}
            </Switch>
          </GuardProvider>
        </main>
      </Router>
    </div>
  );
}

export default App;