import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Header, Snackbar } from "Components";
import LockIcon from "@material-ui/icons/Lock";

import {
  Typography,
  TextField,
  InputAdornment,
  Container,
  Button,
  Link
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { AuthServices } from "Services";
import { useHistory } from "react-router-dom";

const Layout = props => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [state, setState] = useState({
    isOpen: false,
    variant: "error",
    message: ""
  });

  const handleLogin = async e => {
    e.preventDefault();
    if (!email && !password) {
      return setState({
        isOpen: true,
        message: "All field is Required"
      });
    }
    if (!email) {
      return setState({
        isOpen: true,
        message: "Your Email is Required"
      });
    }
    if (!password) {
      return setState({
        isOpen: true,
        message: "Your Password is Required"
      });
    }
    const EmailPatten = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EmailPatten.test(email)) {
      return setState({
        isOpen: true,
        message: "Please Enter Valid Email"
      });
    }
    try {
      await AuthServices.login(email, password).then(() =>
        history.push("/hospital")
      );
    } catch (err) {
      setState({
        isOpen: true,
        message: "Enable to Found User in Database"
      });
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={classes.loginpage}>
      <Header title="Login" />
      <Snackbar
        errorMessage={state.message}
        isOpen={state.isOpen}
        variant={state.variant}
        handleClose={() => setState({ isOpen: false })}
      />
      <div>
        <Container className={classes.Container} maxWidth="md">
          <div className={classes.SingIn}>
            <div className={classes.SignInContent}>
              <div className={classes.SignInForm}>
                <form className={classes.SignInForm}>
                  <div className={classes.SignInFormInput}>
                    <Typography variant="h3" className={classes.FormTitle}>
                      Login
                    </Typography>
                    <TextField
                      autoFocus
                      className={classes.TextField}
                      id="input-with-icon-AcccountCircle"
                      fullWidth
                      name="username"
                      size="medium"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      placeholder="Username Or Email"
                      type="email"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon style={{ color: "#222222" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      className={classes.TextField}
                      id="input-with-icon-Lock"
                      placeholder="Password"
                      name="password"
                      fullWidth
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              style={{
                                color: "#222222"
                              }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <div className={classes.Button}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        className={classes.SigninButton}>
                        Login
                      </Button>
                    </div>
                    <div className={classes.links}>
                      <Link
                        className={classes.link}
                        style={{ marginBottom: 3 }}
                        onClick={() => history.push("/forgotpassword")}>
                        Forget Password !!
                      </Link>
                      <Link
                        className={classes.link}
                        onClick={() => history.push("/register")}>
                        > New Here ?? Register Here
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <div className={classes.signInImage}>
                <figure>
                  <img
                    src="./images/signin-image.png"
                    alt="signin Referecence Pages"
                  />
                </figure>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
