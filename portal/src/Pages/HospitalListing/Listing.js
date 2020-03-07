import React, { useEffect, useState } from 'react';
import { Button, Avatar, Fab, Tooltip } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { Header } from 'Components';
import Listing from '../../Components/Listing/Listing';
import useStyles from './style';
import { fetchHospitalListing } from 'Store/action';
import { selectHospital } from 'Store/selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatApp from 'Pages/ChatApp';

const Layout = props => {
  const classes = useStyles();
  const hospitalListing = useSelector(selectHospital);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [ShowButton, setShowButton] = useState(false);
  const [massage, setmassage] = useState('');
  const [items, setitems] = useState([]);

  useEffect(() => {
    fetchHospitalListing();
  }, []);

  useEffect(() => {
    setShowButton(false);
    if (massage.length > 0) {
      setShowButton(true);
    }
  });

  const navigateHospitalDetail = element => {
    history.push(`/hospital/${element._id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMassage = e => {
    e.preventDefault();
    items.push({
      massage
    });
    setmassage('');
  };

  return (
    <div>
      <Header title="Hospital" />
      <ChatApp />
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
