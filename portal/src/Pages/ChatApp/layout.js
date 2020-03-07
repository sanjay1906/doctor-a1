import React, { useEffect, useState } from 'react';
import { Avatar, Fab, Tooltip } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import useStyles from './style';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
const Layout = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ShowButton, setShowButton] = useState(false);
  const [massage, setmassage] = useState('');
  const [items, setitems] = useState([]);

  useEffect(() => {
    setShowButton(false);
    if (massage.length > 0) {
      setShowButton(true);
    }
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let myInp;

  const sendMassage = e => {
    e.preventDefault();
    items.push({
      massage
    });
    setmassage('');
    myInp.focus();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ borderBottom: '1px solid #ddd', color: '#999999' }}
        >
          Chat With DoctorAi
        </DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.chatBoard}>
          <section className={classes.msgChat}>
            <div className={classes.msg}>
              <div className={classes.msgImg}></div>
              <div
                className={classes.msgbubble}
                style={{ borderBottomLeftRadius: 0 }}
              >
                <div className={classes.msgInfo}>
                  <div className={classes.msgSenderName}>Doctor</div>
                  <div className={classes.msgTime}>12:45</div>
                </div>
                <div className={classes.msgText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consectetur veniam a laudantium expedita quis reiciendis sit
                  optio amet ex quas, fugit autem perferendis voluptatum alias
                  eveniet fugiat vero sunt nobis consequatur! Fugiat repudiandae
                  at rerum voluptatibus vero. Facilis dolor consequuntur, quo
                  corrupti nemo ea fuga iure officia eaque quas adipisci.
                </div>
              </div>
            </div>
            {/* start */}
            {items.map((item, key) => (
              <div key={key}>
                <div
                  className={classes.msg}
                  style={{ flexDirection: 'row-reverse' }}
                >
                  <div
                    className={classes.msgImgRight}
                    style={{ margin: '0 0 0 10px' }}
                  ></div>
                  <div
                    className={classes.msgbubble}
                    style={{
                      color: '#fff',
                      background: '#7563FF',
                      borderBottomLeftRadius: 0
                    }}
                  >
                    <div className={classes.msgInfo}>
                      <div className={classes.msgSenderName}>kishan</div>
                      <div className={classes.msgTime}>12.00</div>
                    </div>
                    <div className={classes.msgText}>{item.massage}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* end */}
          </section>
        </DialogContent>
        <DialogActions>
          <Avatar>
            <InsertEmoticonIcon color="primary" />
          </Avatar>
          <Input
            ref={ip => (myInp = ip)}
            autoFocus
            value={massage}
            id="massagge"
            fullWidth
            placeholder="Type a massage"
            // multiline
            onChange={e => setmassage(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                {ShowButton ? (
                  <div>
                    <input
                      capture="camcorder"
                      style={{ display: 'none' }}
                      id="icon-button-video"
                      type="file"
                    />
                    <label htmlFor="icon-button-video">
                      <IconButton color="primary" component="span">
                        <AttachFileIcon color="primary" />
                      </IconButton>
                    </label>
                  </div>
                ) : (
                  <div>
                    <input
                      accept="image/*"
                      capture="camcorder"
                      style={{ display: 'none' }}
                      id="icon-button-video"
                      type="file"
                    />
                    <label htmlFor="icon-button-video">
                      <IconButton color="primary" component="span">
                        <CameraAltIcon color="primary" />
                      </IconButton>
                    </label>
                  </div>
                )}
              </InputAdornment>
            }
          />

          <Avatar>
            {ShowButton ? (
              <SendIcon onClick={sendMassage} color="primary" />
            ) : (
              <div>
                <input
                  accept="capture=microphone"
                  capture="camcorder"
                  style={{ display: 'none' }}
                  id="icon-button-video"
                  type="file"
                />
                <label htmlFor="icon-button-video">
                  <IconButton color="primary" component="span">
                    <MicIcon color="primary" />
                  </IconButton>
                </label>
              </div>
            )}
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
