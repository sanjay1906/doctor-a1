import React, { useEffect } from 'react';
import { Button, Avatar, Fab, Tooltip } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { Header, Listing } from 'Components';
import useStyles from './style';
import { fetchHospitalListing } from 'Store/action';
import { selectHospital } from 'Store/selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
const Layout = props => {
  const classes = useStyles();
  const hospitalListing = useSelector(selectHospital);
  const history = useHistory();

  useEffect(() => {
    fetchHospitalListing();
  }, []);

  const navigateHospitalDetail = element => {
    history.push(`/hospital/${element._id}`);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header title="Hospital" />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Chat With DoctorAi</DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <p className={classes.Doctorside} align="right">
            hii im sanju, kishan chutiyo se nai
          </p>
          <p align="left">Ha sanju e to sacchi vat</p>
          <p className={classes.Doctorside} align="right">
            tamane khabar se kishan madharchod se
          </p>
          <p align="left">ha Obviosly maha madharchod</p>
          <p className={classes.Doctorside} align="right">
            hii
          </p>
          <p align="left">I agree to have my personal data processed by</p>
          <p className={classes.Doctorside} align="right">
            tu chutiya hai
          </p>
          <p align="left">hii</p>
          <p className={classes.Doctorside} align="right">
            hii
          </p>
          <p align="left">hii</p>
        </DialogContent>
        <DialogActions>
          <Input
            id="standard-adornment-password"
            fullWidth
            placeholder="Type a massage"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility">
                  <AttachFileIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <Avatar onClick={handleClose}>
            <SendIcon color="primary" />
          </Avatar>
          <Avatar onClick={() => alert('say somthing')}>
            <MicIcon color="primary" />
          </Avatar>
        </DialogActions>
      </Dialog>
      <Tooltip onClick={handleClickOpen} title="Add" aria-label="add">
        <Fab color="primary" className={classes.absolute}>
          <ChatIcon />
        </Fab>
      </Tooltip>
      <div className={classes.addbutton}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push('/add/hospital')}
        >
          ADD HOSPITAL
        </Button>
      </div>
      <Listing
        data={hospitalListing}
        keys={{
          hospitalName: 'Hospital Name',
          mobileNo: 'Mobile Number',
          address: 'Address'
        }}
        onClick={navigateHospitalDetail}
      />
    </div>
  );
};

export default Layout;
