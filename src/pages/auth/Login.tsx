import React, { useState, FunctionComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '../../components/Alert/Alert';
import {
  required,
  length,
  email as emailValidation,
} from '../../utils/validators';
import { Color } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
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

const SignIn: FunctionComponent<any> = (props: any) => {
  const classes = useStyles();
  const emailValidators = [required, emailValidation];
  const passwordValidators = [required, length({ min: 5 })];
  const [email, setEmail] = useState({
    value: '',
    valid: false,
  });
  const [password, setPassword] = useState({
    value: '',
    valid: false,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isAlertOpen, setAlert] = useState(false);
  const [error, setError] = useState<{
    severity: Color;
    message: string;
    title: string;
  } | null>(null);

  const onClickLink: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLSpanElement> = () => {
    props.history.replace('/auth/reset');
  };

  const onChangePassword: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const currentPassword = e.target.value;
    let isValid = true;
    for (const item of passwordValidators) {
      isValid = isValid && item(currentPassword);
    }
    setPassword({ value: currentPassword, valid: isValid });
  };

  const onChangeEmail: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const currentEmail = e.target.value;
    let isValid = true;
    for (const item of emailValidators) {
      isValid = isValid && item(currentEmail);
    }
    setEmail({ value: currentEmail, valid: isValid });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {error && isAlertOpen ? (
        <Alert
          title={error.title}
          message={error.message}
          severity={error.severity}
        />
      ) : null}

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) =>
            props.onLogin(e, { email: email, password: password })
          }
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email.value}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChangeEmail}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password.value}
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChangePassword}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
              <Link variant="body2" onClick={onClickLink}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
