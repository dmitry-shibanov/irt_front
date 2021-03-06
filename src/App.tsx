import React, { useEffect } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import StudentList from '@material-ui/icons/List';
import SubjectsList from '@material-ui/icons/ListOutlined';
import SearchStudent from '@material-ui/icons/Search';
import LoginIcon from '@material-ui/icons/GetApp';
import AddStudentIcon from '@material-ui/icons/Add';

import { Link, withRouter } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import axios from './axios-default';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1), // possibly to comment
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

function PersistentDrawerLeft(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [role, setRole] = React.useState('');
  const [isAuth, setIsAuth] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token') ?? '';
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId') ?? '';
    const role = localStorage.getItem('role') ?? '';
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    console.log(localStorage.getItem('token'));
    setIsAuth(true);
    setToken(token);
    setUserId(userId);
    setRole(role);
    setAutoLogout(remainingMilliseconds);
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signupHandler = async (
    event: React.FormEvent<HTMLFormElement>,
    authData: any
  ) => {
    event.preventDefault();
    setAuthLoading(true);
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
      setIsAuth(false);
      setAuthLoading(false);
      props.history.replace('/');
    } catch (err) {
      console.log(err);
      setIsAuth(false);
      setAuthLoading(false);
      setError(err);
    }
  };

  const loginHandler = async (
    event: React.FormEvent<HTMLFormElement>,
    authData: any
  ) => {
    event.preventDefault();
    setAuthLoading(true);
    console.log('cghdjkasljdla');
    console.log(authData);

    try {
      const response = await axios.post(
        `/auth/login`,
        {
          email: authData.email.value,
          password: authData.password.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);

      if (response.status === 422) {
        throw new Error('Validation failed.');
      }

      if (response.status === 404 || response.status === 400) {
        throw new Error('???????????????????????? ?? ?????????????? ?????????????? ???? ????????????');
      }

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Could not authenticate you!');
      }

      const resData = response.data;

      setRole(resData.role);
      setIsAuth(true);
      setToken(resData.token);
      setAuthLoading(false);
      setUserId(resData.userId);

      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
      localStorage.setItem('role', resData.role);
      props.history.replace('/');
    } catch (err) {
      console.log(`err is ${err}`);
      setIsAuth(false);
      setAuthLoading(false);
      setError(err);
      if (err.message.includes('Network Error')) {
        props.history.replace('/error/500');
      }
    }
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    props.history.replace('/');
  };

  const setAutoLogout = (milliseconds: number) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            The most suitable student
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {isAuth && (
            <ListItem button key={0} component={Link} to={`/${role}/profile`}>
              <ListItemIcon>
                <VerifiedUser />
              </ListItemIcon>
              <ListItemText primary={'??????????????'} />
            </ListItem>
          )}
          {isAuth && role === 'secretary' && (
            <ListItem button key={1} component={Link} to="/secretary/students">
              <ListItemIcon>
                <StudentList />
              </ListItemIcon>
              <ListItemText primary={'????????????????'} />
            </ListItem>
          )}
          {isAuth && role === 'secretary' && (
            <ListItem button key={2} component={Link} to="/secretary/subjects">
              <ListItemIcon>
                <SubjectsList />
              </ListItemIcon>
              <ListItemText primary={'????????????????'} />
            </ListItem>
          )}
          {isAuth && role === 'secretary' && (
            <ListItem button key={3} component={Link} to="/secretary/factors">
              <ListItemIcon>
                <SubjectsList />
              </ListItemIcon>
              <ListItemText primary={'??????????????'} />
            </ListItem>
          )}
          {isAuth && role === 'secretary' && (
            <ListItem
              button
              key={4}
              component={Link}
              to="/secreatry/findsuitablestudent"
            >
              <ListItemIcon>
                <SearchStudent />
              </ListItemIcon>
              <ListItemText primary={'?????????? ????????????????'} />
            </ListItem>
          )}
          {isAuth && role === 'secretary' && (
            <ListItem button key={5} component={Link} to="/auth/signup">
              <ListItemIcon>
                <AddStudentIcon />
              </ListItemIcon>
              <ListItemText primary={'???????????????? ????????????????'} />
            </ListItem>
          )}

          {isAuth && role === 'secretary' && (
            <ListItem button key={6} component={Link} to="/secretary/history">
              <ListItemIcon>
                <AddStudentIcon />
              </ListItemIcon>
              <ListItemText primary={'?????????????? ????????????'} />
            </ListItem>
          )}

          {isAuth || (
            <ListItem button key={7} component={Link} to="/auth/login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={'????????'} />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          {['??????????'].map(
            (text, index) =>
              isAuth && (
                <ListItem button key={text} onClick={logoutHandler}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <IndexPage
          history={props.history}
          match={props.match}
          location={props.location}
          loginHandler={loginHandler}
          logout={logoutHandler}
          signupHandler={signupHandler}
          authLoading={authLoading}
          isAuth={isAuth}
          userId={userId}
          token={token}
          role={role}
        />
      </main>
    </div>
  );
}

export default withRouter(PersistentDrawerLeft);
