import React, { useEffect, useState } from "react";
import useStyles from "./style";
import Header from "Components/Header";
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  LinkButtons
} from "@material-ui/core";
import Config from "Config";
import EmailIcon from "@material-ui/icons/Email";
import { handleError } from "Store/helper";
import { useSelector } from "react-redux";
import { passwordForgot } from "Store/selectors";
import { useHistory } from "react-router-dom";
import { Snackbar } from "Components";
import ForgotpasswordIcon from "./Assets/forgot.svg";
import { NetworkServices } from "Services";

const Layout = () => {
  const classes = useStyles();
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState();
  const [click, isClick] = useState(false);
  const [state, setState] = useState({
    isOpen: false,
    variant: "error",
    message: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username) {
      return setState({
        isOpen: true,
        variant: "error",
        message: "Please Enter Email"
      });
    }
    isClick(true);
    try {
      await NetworkServices.post(`${Config.SERVER_URL}/forgotPassword`, {
        username
      }).then(() => {
        setSuccess(true);
      });
    } catch (error) {
      isClick(false);
      handleError(error);
      setState({
        isOpen: true,
        message: "User not Found In Database"
      });
    } finally {
      setUsername("");
    }
  };

  return (
    <div>
      {success ? (
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}>
          <h5 style={{ fontSize: "1.5rem", fontFamily: "Poppins" }}>
            An Email with Reset intruction Send In Your email Address,Kindly
            Check Your Email..
          </h5>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/login")}>
            GO BACK TO LOGIN
          </Button>
        </div>
      ) : (
        <div className={classes.cabbooking}>
          <Snackbar
            errorMessage={state.message}
            isOpen={state.isOpen}
            variant={state.variant}
            handleClose={() => setState({ isOpen: false })}
          />
          <Header title="Forgot password" />
          <div className={classes.cabcontent}>
            <Container className={classes.container} maxWidth="sm">
              <div style={{ textAlign: "center" }}>
                <img
                  src={ForgotpasswordIcon}
                  alt="forgotpasswordicon"
                  className={classes.forgotpasswordIcon}
                />
              </div>
              <form>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.title}
                  style={{ marginBottom: "2rem" }}>
                  Verifying Email Please Enter Your Email
                </Typography>
                <TextField
                  autoFocus
                  className={classes.TextField}
                  id="input-with-icon-AcccountCircle"
                  fullWidth
                  name="username"
                  onChange={e => setUsername(e.target.value)}
                  size="medium"
                  value={username}
                  placeholder="Username Or Email"
                  type="email"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon style={{ color: "#222222" }} />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  style={{ marginTop: 20 }}
                  disabled={click}
                  fullWidth>
                  Send Email
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
function newFunction() {
  return "Send";
}
