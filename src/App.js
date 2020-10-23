import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import { AlertSnackbar, Spinner } from 'components';
import routes from 'routes';

// set load spinning if auth or profile is starting
const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Spinner />;
  return children;
};

const ProfileIsLoaded = ({ children }) => {
  const profile = useSelector((state) => state.firebase.profile);
  if (!isLoaded(profile)) return <Spinner />;
  return children;
};

const App = () => {
  return (
    <React.Fragment>
      <AlertSnackbar />
      <AuthIsLoaded>
        <ProfileIsLoaded>
          <Switch>
            {routes.map(({ layout: Layout, views }) =>
              views.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  exact
                  path={path}
                  render={() => (
                    <Layout>
                      <Component />
                    </Layout>
                  )}
                />
              ))
            )}
            <Route component={() => <Redirect to="/error/404" />} />
          </Switch>
        </ProfileIsLoaded>
      </AuthIsLoaded>
    </React.Fragment>
  );
};

export default App;
