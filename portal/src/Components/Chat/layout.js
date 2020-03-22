import React, { useEffect, useState } from "react";
import { Button, Avatar, Fab, Tooltip } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import useStyles from "./style";
import { fetchHospitalListing } from "Store/action";
import { selectHospital } from "Store/selectors";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Input from "@material-ui/core/Input";

import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

const Layout = props => {
  const classes = useStyles();
  const hospitalListing = useSelector(selectHospital);
  const history = useHistory();
  const [state, setState] = useState({
    Message: ["Hi", "My name is Kishan", "nice to meet you"]
  });
  const [input, setInput] = useState({
    inputMessage: ""
  });
  useEffect(() => {
    fetchHospitalListing();
  }, []);

  const navigateHospitalDetail = element => {
    history.push(`/hospital/${element._id}`);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = e => {
    e.persist();
    setState(prevState => {
      return {
        ...prevState,
        input: e.target.value
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleclick = () => {
    let msg = state.Message.slice();
    msg.push(state.input);

    setState({
      Message: msg,
      input: ""
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle
          id="form-dialog-title"
          style={{ borderBottom: "1px solid #ddd", color: "#999999" }}>
          Chat With DoctorAi
        </DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.chatBoard}>
          <section className={classes.msgChat}>
            <div className={classes.msg}>
              <div className={classes.msgImg}></div>
              <div
                className={classes.msgbubble}
                style={{ borderBottomLeftRadius: 0 }}>
                <div className={classes.msgInfo}>
                  <div className={classes.msgSenderName}>Doctor</div>
                  <div className={classes.msgTime}>12:45</div>
                </div>
                <div className={classes.msgText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consectetur veniam a laudantium expedita quis reiciendis sit
                </div>
              </div>
            </div>
            {/* start */}
            {state.Message.map((item, key) => (
              <div key={key}>
                <div
                  className={classes.msg}
                  style={{ flexDirection: "row-reverse" }}>
                  <div
                    className={classes.msgImgRight}
                    style={{ margin: "0 0 0 10px" }}></div>
                  <div
                    className={classes.msgbubble}
                    style={{
                      color: "#fff",
                      background: "#7563FF",
                      borderBottomLeftRadius: 0
                    }}>
                    <div className={classes.msgInfo}>
                      <div className={classes.msgSenderName}>kishan</div>
                      <div className={classes.msgTime}>12.00</div>
                    </div>
                    <div className={classes.msgText}>
                      {/* this is patient side */}
                      {item}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* end */}
          </section>
        </DialogContent>
        <DialogActions className={classes.inputBox}>
          <Avatar style={{ background: "#ffffff" }}>
            <InsertEmoticonIcon style={{ color: "#333" }} />
          </Avatar>
          <Input
            fullWidth
            placeholder="Type a massage"
            value={state.input}
            onChange={handleChange}
          />
          <Avatar
            onClick={() => alert("say somthing")}
            style={{ background: "#0EC74B" }}>
            <MicIcon style={{ color: "#ffffff" }} />
          </Avatar>
          <Avatar style={{ background: "#0EC74B" }} onClick={handleclick}>
            <SendIcon style={{ color: "#ffffff" }} />
          </Avatar>
        </DialogActions>
      </Dialog>
      <Tooltip onClick={handleClickOpen} title="Add" aria-label="add">
        <Fab color="primary" className={classes.absolute}>
          <ChatIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Layout;
