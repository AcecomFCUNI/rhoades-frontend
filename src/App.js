import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';

import { AlertSnackbar, Spinner } from 'components';
import routes from 'routes';

import {
  PublicLayout,
  StudentLayout,
  TeacherLayout,
  ErrorLayout,
  AdminLayout,
} from 'layouts';
import withAuthentication from 'hocs/withAuthentication';

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
          <Route path="/admin/:path?">
              <AdminLayout>
                <Switch>
                  {routes.admin.map(({ path, component: Component }) => (
                    <Route
                      exact
                      key={path}
                      path={path}
                      component={withAuthentication('admin', Component)}
                    />
                  ))}
                  <Route component={() => <Redirect to="/error/404" />} />
                </Switch>
              </AdminLayout>
            </Route>
            <Route path="/student/:path?">
              <StudentLayout>
                <Switch>
                  {routes.student.map(({ path, component: Component }) => (
                    <Route
                      exact
                      key={path}
                      path={path}
                      component={withAuthentication('student', Component)}
                    />
                  ))}
                  <Route component={() => <Redirect to="/error/404" />} />
                </Switch>
              </StudentLayout>
            </Route>
            <Route path="/teacher/:path?">
              <TeacherLayout>
                <Switch>
                  {routes.teacher.map(({ path, component: Component }) => (
                    <Route
                      exact
                      key={path}
                      path={path}
                      component={withAuthentication('teacher', Component)}
                    />
                  ))}
                  <Route component={() => <Redirect to="/error/404" />} />
                </Switch>
              </TeacherLayout>
            </Route>
            <Route path="/error/:path?" exact>
              <ErrorLayout>
                <Switch>
                  {routes.error.map(({ path, component: Component }) => (
                    <Route exact key={path} path={path} component={Component} />
                  ))}
                  <Route component={() => <Redirect to="/error/404" />} />
                </Switch>
              </ErrorLayout>
            </Route>
            <Route>
              <PublicLayout>
                <Switch>
                  {routes.public.map(({ path, component: Component }) => (
                    <Route exact key={path} path={path} component={Component} />
                  ))}
                  <Route component={() => <Redirect to="/error/404" />} />
                </Switch>
              </PublicLayout>
            </Route>
            <Route component={() => <Redirect to="/error/404" />} />
          </Switch>
        </ProfileIsLoaded>
      </AuthIsLoaded>
    </React.Fragment>
  );
};

export default App;
