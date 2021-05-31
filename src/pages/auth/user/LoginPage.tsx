import React, { Component } from 'react';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Button/Button';
import { required, length, email } from '../../../utils/validators';
import ILogin from '../../../models/props/ILogin';
import Auth from '../AuthPage';
// import axios from '../../../axios-default';
import { Col, Form, Row } from 'react-bootstrap';
import axios from '../../../axios-default';

class LoginPage extends Component<ILogin, any> {
  state = {
    loginForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      formIsValid: false,
    },
  };

  inputChangeHandler = (input: any, value: any) => {
    this.setState((prevState: any) => {
      let isValid = true;
      for (const validator of prevState.loginForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        loginForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input: any) => {
    this.setState((prevState: any) => {
      return {
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            touched: true,
          },
        },
      };
    });
  };

  render() {
    return (
      <Auth>
        <form onSubmit={(e) => this.props.onLogin(e, this.state, 'secretary')}>
          <Input
            id="email"
            label="Your E-Mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'email')}
            value={this.state.loginForm['email'].value}
            valid={this.state.loginForm['email'].valid}
            touched={this.state.loginForm['email'].touched}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'password')}
            value={this.state.loginForm['password'].value}
            valid={this.state.loginForm['password'].valid}
            touched={this.state.loginForm['password'].touched}
          />
          <Button design="raised" type="submit" loading={this.props.loading}>
            Войти
          </Button>
        </form>
      </Auth>
    );
  }
}

export default LoginPage;
