import React, { Component, FormEvent } from 'react';
import { required, length, email } from '../../../utils/validators';
import Auth from '../AuthPage';
import axios from '../../../axios-default';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Form/Input';


class ResetPassword extends Component<unknown, any>{
    state = {
        confirmForm: {
          email: {
            value: '',
            valid: false,
            touched: false,
            validators: [required, email]
          },
          formIsValid: false
        }
      };
    
      inputChangeHandler = (input:any, value:any) => {
        this.setState((prevState: any) => {
          let isValid = true;
          for (const validator of prevState.confirmForm[input].validators) {
            isValid = isValid && validator(value);
          }
          const updatedForm = {
            ...prevState.confirmForm,
            [input]: {
              ...prevState.confirmForm[input],
              valid: isValid,
              value: value
            }
          };
          let formIsValid = true;
          for (const inputName in updatedForm) {
            formIsValid = formIsValid && updatedForm[inputName].valid;
          }
          return {
            confirmForm: updatedForm,
            formIsValid: formIsValid
          };
        });
      };
    
      inputBlurHandler = (input: any) => {
        this.setState((prevState: any) => {
          return {
            confirmForm: {
              ...prevState.confirmForm,
              [input]: {
                ...prevState.confirmForm[input],
                touched: true
              }
            }
          };
        });
      };

      sendConfirmationEmail = async (e: FormEvent) => {
        const result = await axios.post("/auth/reset", {
            email: this.state.confirmForm["email"].value
        },{method:"POST"});
      }
    
      render() {
        return (
          <Auth>
            <form onSubmit={this.sendConfirmationEmail}>
              <Input
                id="email"
                label="Your E-Mail"
                type="email"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, 'email')}
                value={this.state.confirmForm['email'].value}
                valid={this.state.confirmForm['email'].valid}
                touched={this.state.confirmForm['email'].touched}
              />
              <Button design="raised" type="submit">
                Send confirmation email
              </Button>
            </form>
          </Auth>
        );
      }
}

export default ResetPassword;