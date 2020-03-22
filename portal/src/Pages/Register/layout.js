import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Header, Snackbar } from "Components";
import LockIcon from "@material-ui/icons/Lock";

import {
  InputAdornment,
  TextField,
  Button,
  Container,
  Link,
  Typography
} from "@material-ui/core";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

//For Data Retriving from the redux
import { AuthServices } from "Services";
import { useHistory } from "react-router-dom";

const Layout = props => {
  const classes = useStyles();
  const history = useHistory();
  const [email, Setemail] = useState();
  const [password, Setpassword] = useState();
  const [state, setState] = useState({
    isOpen: false,
    variant: "error",
    message: ""
  });

  const handleSubmit = async e => {
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
    //Api Calling
    try {
      await AuthServices.signup(email, password).then(
        history.push("/hospital")
      );
    } catch (err) {
      setState({
        isOpen: true,
        message: err.response.data.data.message || "User is Already Register"
      });
    } finally {
      Setemail("");
      Setpassword("");
    }
  };

  return (
    <div>
      <Header title="Register" />
      <Snackbar
        errorMessage={state.message}
        isOpen={state.isOpen}
        variant={state.variant}
        handleClose={() => setState({ isOpen: false })}
      />
      <div>
        <Container className={classes.Container} maxWidth="md">
          <div className={classes.SingUp}>
            <div className={classes.SignUpContent}>
              <div className={classes.SignUpForm}>
                <form className={classes.SignUpForm}>
                  <div className={classes.SignUpFormInput}>
                    <Typography variant="h3" className={classes.FormTitle}>
                      Register
                    </Typography>
                    <TextField
                      autoFocus
                      className={classes.TextField}
                      id="input-with-icon-AcccountCircle"
                      fullWidth
                      name="username"
                      size="medium"
                      placeholder="Username Or Email"
                      type="email"
                      required
                      value={email}
                      onChange={e => Setemail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonAddIcon style={{ color: "#222222" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      className={classes.TextField}
                      id="input-with-icon-Lohck"
                      placeholder="Password"
                      name="password"
                      fullWidth
                      type="password"
                      onChange={e => Setpassword(e.target.value)}
                      value={password}
                      type="password"
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
                        onClick={handleSubmit}
                        color="primary"
                        className={classes.SignUpButton}>
                        Register
                      </Button>
                    </div>
                    <div className={classes.links}>
                      <Link
                        className={classes.link}
                        onClick={() => history.push("/login")}>
                        Already Have An Account..
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <div className={classes.signUpImage}>
                <figure>
                  <img
                    src="./images/signup-image.png"
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
