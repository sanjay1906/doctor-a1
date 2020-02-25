import React, { useEffect } from 'react';
import useStyles from './style';
import Header from 'Components/Header';
import {
  Container,
  CardContent,
  Card,
  Typography,
  Button,
  Grid
} from '@material-ui/core';

import Call from '@material-ui/icons/Call';
import Address from '@material-ui/icons/LocationCity';
import Web from '@material-ui/icons/VpnLock';
import Check from '@material-ui/icons/CheckCircle';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { fetchHospitalDetail } from 'Store/action';
import { selectHospitalDetail } from 'Store/selectors';
import { useSelector } from 'react-redux';

const Layout = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();
  const hospitalDetail = useSelector(selectHospitalDetail);

  useEffect(() => {
    if (match.params.hospitalId) {
      fetchHospitalDetail(match.params.hospitalId);
    }
  }, [match]);

  if (hospitalDetail.loading) {
    return <div>Loading...</div>;
  }

  if (!hospitalDetail.loading && !hospitalDetail.data) {
    return <div>Something went wrong..</div>;
  }

  const hospital = hospitalDetail.data;

  console.log(hospital);
  return (
    <div className={classes.Hospitaldetails}>
      <Header title="Hospital Detail" />
      <Container maxWidth="lg" className={classes.container}>
        <div style={{ textAlign: 'end', marginTop: 10, marginBottom: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              history.push(`/add/doctor/${match.params.hospitalId}`)
            }
          >
            Add Doctor
          </Button>
        </div>
        <div className={classes.hospitalInfo}>
          <Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={4}>
                <Card>
                  <CardContent>
                    <div className={classes.hospitalsection}>
                      <img
                        src={hospital.thumbnailImage}
                        alt="HospitalBanner"
                        className={classes.hospitalImage}
                      />
                      <div>
                        <Typography variant="h6">
                          {hospital.hospitalName}
                        </Typography>
                        <Typography
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10
                          }}
                          variant="body2"
                        >
                          <Call color="primary" />
                          {hospital.mobileNo.map(number => (
                            <span>{number}</span>
                          ))}
                        </Typography>
                        <Typography
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10,
                            marginBottom: 10
                          }}
                          variant="body2"
                        >
                          <Address color="primary" /> {hospital.address}
                        </Typography>
                        <Typography
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                          }}
                          variant="body2"
                        >
                          <Web color="primary" fontSize="small" />{' '}
                          {hospital.websiteUrl}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} lg={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Description</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      {hospital.description}
                    </Typography>
                    <div className={classes.category}>
                      <Typography variant="h5">Category</Typography>
                      <div className={classes.categorysection}>
                        {Boolean(hospital.category.length) &&
                          hospital.category.map(category => (
                            <Typography
                              variant="body1"
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Check
                                color="primary"
                                fontSize="small"
                                style={{ marginRight: 5 }}
                              />
                              {category.title}
                            </Typography>
                          ))}
                        {!Boolean(hospital.category.length) && (
                          <Typography color="textSecondary">
                            No Category found this hospital
                          </Typography>
                        )}
                      </div>
                    </div>
                    <div className={classes.hospitaldoctor}>
                      <Typography variant="h5">Doctors</Typography>
                      <div className={classes.doctors}>
                        {Boolean(hospital.doctors.length) &&
                          hospital.doctors.map(doctor => (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                              }}
                            >
                              <img
                                src={doctor.thumbnailImage}
                                alt="HospitalBanner"
                                className={classes.doctorImage}
                              />
                              <Typography variant="body1">
                                {doctor.doctorName}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {doctor.degree}
                              </Typography>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
