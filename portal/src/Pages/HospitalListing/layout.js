import React, { useEffect, useState } from "react";
import { Button, Avatar, Fab, Tooltip } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import { Header, Listing } from "Components";
import useStyles from "./style";
import { fetchHospitalListing } from "Store/action";
import { selectHospital } from "Store/selectors";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Chat } from "Components";

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

  return (
    <div>
      <Header title="Hospital" />
      <Chat />
      <div className={classes.addbutton}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/add/hospital")}>
          ADD HOSPITAL
        </Button>
      </div>
      <Listing
        data={hospitalListing}
        keys={{
          hospitalName: "Hospital Name",
          mobileNo: "Mobile Number",
          address: "Address"
        }}
        onClick={navigateHospitalDetail}
      />
    </div>
  );
};

export default Layout;
