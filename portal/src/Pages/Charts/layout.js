import React from "react";
import useStyles from "./style";
import { Grid, Card, CardContent, Container } from "@material-ui/core";
import { Line, Bar } from "react-chartjs-2";
import PeopleIcon from "@material-ui/icons/People";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  datasets: [
    {
      label: "Number of User Save Life",
      data: [65, 59, 80, 81, 56, 55, 40, 25, 40, 25, 60, 65],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)"
      ]
    }
  ]
};

const Layout = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Card className={classes.Card}>
              <CardContent>
                <div className={classes.content}>
                  <div className={classes.joinUser}>
                    <h2 className={classes.number}>300</h2>
                    <p className={classes.cardText}>Connected User</p>
                  </div>
                  <div className={classes.iconDiv}>
                    <img
                      src="./images/Users.svg"
                      alt="Users"
                      style={{ height: "70px", width: "70px" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card className={classes.Card}>
              <CardContent>
                <div className={classes.content}>
                  <div className={classes.joinUser}>
                    <h2 className={classes.number}>210</h2>
                    <p className={classes.cardText}>Totle Hospital Added</p>
                  </div>
                  <div className={classes.iconDiv}>
                    <img
                      src="./images/hospitaladmin.svg"
                      alt="Hospital"
                      style={{ height: "70px", width: "70px" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card className={classes.Card}>
              <CardContent>
                <div className={classes.content}>
                  <div className={classes.joinUser}>
                    <h2 className={classes.number}>140</h2>
                    <p className={classes.cardText}>Totle Doctor Added</p>
                  </div>
                  <div className={classes.iconDiv}>
                    <img
                      src="./images/doctorAdmin.svg"
                      alt="Hospital"
                      style={{ height: "70px", width: "70px" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className={classes.ChartsGrid}>
          <Card className={classes.mainCard}>
            <CardContent>
              <CardContent>
                <h2>Usage:</h2>
                <div>
                  <Bar data={data} height="80px" />
                </div>
              </CardContent>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Layout;
