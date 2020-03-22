import React, { useState } from "react";
import useStyles from "./style";
import Header from "Components/Header";
import {
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Snackbar from "Components/Snakbar";
import { useHistory, useRouteMatch } from "react-router-dom";
import { NetworkServices } from "Services";

const Layout = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const [send, isSend] = useState(false);
  const [click, setCLick] = useState(false);
  const [newPassword, setPassword] = useState();
  const [comfirmPassword, setComfirmpassword] = useState();

  const [state, setState] = useState({
    isOpen: false,
    variant: "success",
    message: ""
  });

  const handleSubmit = async (e, props) => {
    e.preventDefault();
    const { resetPasswordToken } = match.params;

    if (!newPassword || !comfirmPassword) {
      return setState({
        isOpen: true,
        message: "Pasword is Required"
      });
    }
    if (newPassword !== comfirmPassword) {
      return setState({
        isOpen: true,
        message: "Do Not Match the Password"
      });
    }
    setCLick(true);
    await NetworkServices.post(
      `http://localhost:5000/api/1.0/reset/${resetPasswordToken}`,
      { newPassword }
    )
      .then(() => isSend(true))

      .catch(() => {
        setCLick(false);
        setState({
          isOpen: true,
          message: "Your Key is Expried please Re-check "
        });
      });
  };

  return (
    <div>
      {send ? (
        <div>
          <div className={classes.center}>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "Poppins" }}>
              Your password is Change SuccessFully Please Relogin ...
            </h3>
            <Button
              variant="contained"
              color="primary"
              className={classes.gotologin}
              onClick={() => history.push("/login")}>
              GO TO LOGIN
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.cabbooking}>
          <Header title="Reset password" />
          <Snackbar
            errorMessage={state.message}
            isOpen={state.isOpen}
            variant={state.variant}
            handleClose={() => setState({ isOpen: false })}
          />
          <div className={classes.cabcontent}>
            <Container className={classes.container} maxWidth="sm">
              <form>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.title}
                  style={{ marginBottom: "2rem" }}>
                  Reset Your New Password
                </Typography>
                <TextField
                  autoFocus
                  className={classes.TextField}
                  id="input-with-icon-AcccountCircle"
                  fullWidth
                  name="username"
                  required
                  onChange={e => setPassword(e.target.value)}
                  value={newPassword}
                  placeholder="Enter Your New Pasword"
                  type="password"
                  style={{ marginBottom: "1.5rem" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "#222222" }} />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  className={classes.TextField}
                  id="input-with-icon-AcccountCircle"
                  fullWidth
                  name="username"
                  type="password"
                  onChange={e => setComfirmpassword(e.target.value)}
                  size="medium"
                  value={comfirmPassword}
                  placeholder="Confirm Password"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "#222222" }} />
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={click}
                  style={{ marginTop: 25 }}
                  fullWidth>
                  Reset
                </Button>
              </form>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};
export default Layout;
