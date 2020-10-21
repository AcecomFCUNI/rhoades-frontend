import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from 'routes';

// set load spinning if auth or profile is starting
const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <div>Loading</div>;
  return children;
};

const ProfileIsLoaded = ({ children }) => {
  const profile = useSelector((state) => state.firebase.profile);
  if (!isLoaded(profile)) return <div>Loading</div>;
  return children;
};

const App = () => {
  return (
    <AuthIsLoaded>
      <ProfileIsLoaded>
        <Switch>
          {routes.map(({ layout: Layout, views }) =>
            views.map(({ path, component: Component }) => (
              <Route
                key={path}
                exact
                path={path}
                render={() =>
                  Layout ? (
                    <Layout>
                      <Component />
                    </Layout>
                  ) : (
                    <Component />
                  )
                }
              />
            ))
          )}
          <Route component={() => <Redirect to="/error/404" />} />
        </Switch>
      </ProfileIsLoaded>
    </AuthIsLoaded>
  );
};

export default App;
