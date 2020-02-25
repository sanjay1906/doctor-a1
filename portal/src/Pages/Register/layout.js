import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Header } from "Components";
import LockIcon from "@material-ui/icons/Lock";
import {
  InputAdornment,
  TextField,
  Button,
  Container,
  Link,
  Typography
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

//For Data Retriving from the redux
import { useSelector } from "react-redux";
import { SingUp } from "Store/action";
import { AuthServices } from "Services";
import { useHistory } from "react-router-dom";

const Layout = props => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setRegistering] = useState(false);
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      setRegistering(true);
      // Todo : Validate username and password should always have value
      await AuthServices.signup(username, password);
      setRegistering(false);
      history.push('/hospital');
    } catch (err) {
      // Todo : Display Message to user
      console.log('err', err);
    } finally {
      setRegistering(false);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div>
      <Header title="Register" />
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
                      className={classes.TextField}
                      id="input-with-icon-AcccountCircle"
                      fullWidth
                      size="medium"
                      placeholder="Name"
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
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
                      id="input-with-icon-AcccountCircle"
                      fullWidth
                      size="medium"
                      placeholder="password"
                      type="email"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon style={{ color: "#222222" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <div className={classes.Button}>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color="primary"
                        className={classes.SignUpButton}
                        disabled={isRegistering}
                      >
                        Register
                      </Button>
                    </div>
                    <div className={classes.links}>
                      <Link className={classes.link}>
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
