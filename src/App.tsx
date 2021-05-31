import React, { Fragment, Component } from 'react';
import './App.global.css';

import { withRouter } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import IHistoryProps from './models/props/IHistory';
import axios from './axios-default';
import IAppState from './models/state/IApp';

class App extends Component<IHistoryProps, IAppState> {
  state = {
    role: "",
    showBackdrop: false,
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    console.log(localStorage.getItem('token'));
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  render() {
    return (
      <div id="App">
        <Fragment>
          <div id="page-wrap">
            <IndexPage
              history={this.props.history}
              match={this.props.match}
              location={this.props.location}
              loginHandler={this.loginHandler}
              logout={this.logoutHandler}
              signupHandler={this.signupHandler}
              authLoading={this.state.authLoading}
              isAuth={this.state.isAuth}
              userId={this.state.userId}
              token={this.state.token}
            />
          </div>
        </Fragment>
      </div>
    );
  }

  signupHandler = async (
    event: React.FormEvent<HTMLFormElement>,
    authData: any
  ) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    try {
      const response = await axios.post(
        '/signup',
        JSON.stringify({
          email: authData.signupForm.email.value,
          password: authData.signupForm.password.value,
          login: authData.signupForm.name.value,
        })
      );

      if (response.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (response.status !== 200 && response.status !== 201) {
        console.log('Error!');
        throw new Error('Creating a user failed!');
      }

      const resData = response.data;
      this.setState({ isAuth: false, authLoading: false });
      this.props.history.replace('/');
    } catch (err) {
      console.log(err);
      this.setState({
        isAuth: false,
        authLoading: false,
        error: err,
      });
    }
  };

  loginHandler = async (
    event: React.FormEvent<HTMLFormElement>,
    authData: any,
    userRole: string
  ) => {
    event.preventDefault();
    this.setState({ authLoading: true });

    try {
      const response = await axios.post(
        `/secretary/login`,
        {
          email: authData.loginForm.email.value,
          password: authData.loginForm.password.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 422) {
        throw new Error('Validation failed.');
      }

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Could not authenticate you!');
      }

      const resData = response.data;

      this.setState({
        role: resData.role,
        isAuth: true,
        token: resData.token,
        authLoading: false,
        userId: resData.userId,
      });

      localStorage.setItem('token', resData.token);

      localStorage.setItem('userId', resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      this.setAutoLogout(remainingMilliseconds);

      this.props.history.replace('/');
    } catch (err) {
      this.setState({
        isAuth: false,
        authLoading: false,
        error: err,
      });
    }
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  setAutoLogout = (milliseconds: number) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };
}

export default withRouter(App);
