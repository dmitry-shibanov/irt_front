import React, { FunctionComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './auth/secretary/AddStudent';
import Login from './auth/Login';
import IGeneral from '../models/props/IGeneral';

import ResetPassword from './auth/resets/ResetPassword';
import ConfirmPassword from './auth/ConfirmPassword';
import NotFound from './error/404/NotFound';
import ServerError from './error/500/ServerError';
import Forbidden from './error/403/Forbidden';
import TableUser from './secretary/tables/TableUsers';
import StudentProfile from './student/StudentProfile';
import SecretaryProfile from './secretary/profile/SecretaryProfile';
import Subjects from './secretary/tables/TableSubjects';
import Factors from './secretary/tables/TableFactors';
import TableForEmployer from './secretary/tables/TableEmployer';
import ListOfTableResults from './secretary/ListOfTablesResult';

const IndexPage: FunctionComponent<IGeneral> = ({
  signupHandler,
  loginHandler,
  authLoading,
  history,
  location,
  match,
  isAuth,
  userId,
  token,
  role,
}) => {
  function PrivateRoute(props: any) {
    const { children } = props;
    return (
      <Route
        // {...rest}
        render={({ location }) =>
          isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/error/403',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={({ location }) =>
          isAuth ? (
            // <FormEmployer token={"token as string"} history={history} />
            // <Redirect
            //   to={{
            //     pathname: '/auth/signup', // /secreatry/findSuitableStudent
            //     state: { from: location },
            //   }}
            // />
            <Redirect
              to={{
                pathname: '/users/profile',
                state: { from: location },
              }}
            />
          ) : (
            <Redirect
              to={{
                pathname: '/auth/login',
                state: { from: location },
              }}
            />
          )
        }
      />

      {/* // isAuth ? (
          //   <StudentProfile userId={userId as string} token={token as string} />
          // ) : (
          //   <Redirect
          //     to={{
          //       pathname: '/auth/login',
          //       state: { from: location },
          //     }}
          //   />
          // ) */}

      <Route
        path="/users/profile"
        render={(props) =>
          isAuth && role === 'student' ? (
            <StudentProfile userId={userId as string} token={token as string} />
          ) : (
            <Redirect to="/secretary/profile" />
          )
        }
      />

      <Route
        path="/secretary/students"
        render={(props) => <TableUser token={token} />}
      />
      <Route
        path="/secretary/profile"
        render={(props) => <SecretaryProfile />}
      />
      <Route
        path="/secreatry/findsuitablestudent"
        render={(props) => <TableForEmployer token={token} history={history} />}
      />
      {/* {(props) => <FormEmployer token={token} history={history} */}
      <Route
        path="/secretary/factors"
        render={(props) => <Factors token={token as string} />}
      />
      <Route
        path="/secretary/subjects"
        render={(props) => {
          return <Subjects token={token as string} />;
        }}
      />
      <Route
        path="/secretary/history"
        render={(props) => {
          return <ListOfTableResults token={token as string} />;
        }}
      />

      <Route
        path="/confirmRegestration/:token"
        render={(props) => (
          <ConfirmPassword
            history={history}
            match={match}
            location={location}
          />
        )}
      />
      <Route
        path="/auth/signup"
        render={(props) => (
          <SignUp
            onSignup={signupHandler}
            loading={authLoading}
            history={history}
            location={location}
            match={match}
          />
        )}
      />
      <Route
        path="/auth/login"
        render={(props) => (
          <Login
            onLogin={loginHandler}
            history={history}
            match={match}
            location={location}
            loading={authLoading}
          />
        )}
      />

      <Route path="/auth/reset" component={ResetPassword} />

      <Route path="/error/500" component={ServerError} />
      <Route path="/error/403" component={Forbidden} />
      <Route render={() => <NotFound />} />
    </Switch>
  );
};

export default IndexPage;
