import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Header } from "Components";
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
// import { useSelector } from "react-redux";
// import { fetchLogin } from "Store/action";
// import { selectLoginData } from "Store/selectors";
import { AuthServices } from "Services";
import { useHistory } from "react-router-dom";

const Layout = props => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setLogin] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      setLogin(true);
      // Todo : Validate username and password should always has value
      await AuthServices.login(username, password);
      setLogin(false);
      history.push("/hospital");
    } catch (err) {
      // Todo : Display Error message to User
      console.log("err", err);
    } finally {
      setUsername("");
      setPassword("");
      setLogin(false);
    }
  };

  return (
    <div className={classes.loginpage}>
      <Header title="Login" />
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
                      className={classes.TextField}
                      id="input-with-icon-AcccountCircle"
                      fullWidth
                      size="medium"
                      placeholder="Username Or Email"
                      type="Email"
                      onChange={e => setUsername(e.target.value)}
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
                      fullWidth
                      type="password"
                      onChange={e => setPassword(e.target.value)}
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
                        className={classes.SigninButton}
                        disabled={isLogin}>
                        {isLogin ? "Login..." : "Login"}
                      </Button>
                    </div>
                    <div className={classes.links}>
                      <Link className={classes.link}>Forget Password !!</Link>
                      <Link className={classes.link}>
                        New Here ?? Register Here
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
