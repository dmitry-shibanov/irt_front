import React, { Component } from 'react';
import IHistory from '../../../models/props/IHistory';
import { required, length, email } from '../../../utils/validators';

import axios from 'axios';
import INewPassword from '../../../models/state/INewPassword';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

class NewPassword extends Component<IHistory, INewPassword> {
  constructor(props: IHistory) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      message: 'Loading data',
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      formIsValid: false,
    };
  }
  async componentDidMount() {
    const result = await axios.get('/reset', {
      params: {
        token: this.props.match.params.token,
      },
    });

    if (result.data.error === true) {
      this.setState({
        loading: false,
        error: true,
        message: result.data.message,
      });
    } else {
      this.setState({
        loading: false,
        error: false,
        message: result.data.message,
      });
    }
  }

  changePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  inputChangeHandler = (input: string, value: string) => {
    this.setState(
      (prevState: Readonly<INewPassword>, props: Readonly<IHistory>) => {
        let isValid = true;
        for (const validator of prevState.password!.validators) {
          isValid = isValid && validator(value);
        }
        const updatedForm = {
          password: {
            ...prevState.password,
            valid: isValid,
            value: value,
          },
        };
        let formIsValid = true;
        formIsValid = formIsValid && updatedForm.password.valid;
        const newState: INewPassword = {
          ...prevState,
          password: updatedForm.password,
          formIsValid: formIsValid,
        };
        return newState;
      }
    );
  };

  inputBlurHandler = (input: any) => {
    this.setState((prevState: any) => {
      return {
        password: {
          ...prevState.password,
          touched: true,
        },
      };
    });
  };

  useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  render() {
    const classes = this.useStyles();
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Востановить/Сменить пароль
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default NewPassword;
