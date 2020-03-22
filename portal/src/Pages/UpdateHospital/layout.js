import React, { useState, useEffect } from 'react';
import useStyles from './style';
import { Header, Snackbar } from 'Components';
import { Typography, Container, Button, Grid } from '@material-ui/core';
import { MapService, NetworkServices } from 'Services';
import { fetchHospitalDetail } from 'Store/action';
import { selectHospitalDetail } from 'Store/selectors';

//icon
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HttpIcon from '@material-ui/icons/Http';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import { InputComponent } from 'Components';
import { handleError } from 'Store/helper';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Config from 'Config';
import CircularProgress from '@material-ui/core/CircularProgress';

const Layout = () => {
  const match = useRouteMatch();
  const classes = useStyles();
  const history = useHistory();

  const [coordinates, setCoordinates] = useState();
  const hospitalDetail = useSelector(selectHospitalDetail);
  const [address, setAddress] = useState();
  const [hospitalName, setHospitalName] = useState();
  const [description, setDescription] = useState();
  const [websiteUrl, setWebsiteUrl] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [emailId, setEmailId] = useState();
  const [isValidForm, setValidForm] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [state, setState] = useState({
    isOpen: false,
    variant: 'error',
    message: ''
  });

  useEffect(() => {
    if (match.params.hospitalId) {
      fetchHospitalDetail(match.params.hospitalId);
    }
  }, [match]);

  const handleCoordinates = async () => {
    if (!address) {
      return setCoordinates();
    }
    const response = await MapService.fromAddress(address);
    if ((response.data || {}).results[0]) {
      setCoordinates(response.data.results[0].geometry.location);
    }
  };

  const handleFileUpload = e => {
    const files = e.target.files;
    if (files && files.length) {
      setFile({ image: files[0], name: files[0].name });
    }
  };
  if (!hospitalDetail.loading && !hospitalDetail.data) {
    return <div>Something went wrong..</div>;
  }

  const hospital = hospitalDetail.data;

  const updateHospital = async () => {
    try {
      setSubmitting(true);
      const HospitalId = match.params.hospitalId;
      const hospitalName = document.querySelector('#hospitalName').value;
      const address = document.querySelector('#address').value;
      const description = document.querySelector('#description').value;
      const websiteUrl = document.querySelector('#websiteUrl').value;
      const mobileNo = document.querySelector('#mobileNo').value;
      const emailId = document.querySelector('#emailId').value;

      if (
        !address ||
        !hospitalName ||
        !description ||
        !websiteUrl ||
        !mobileNo ||
        !emailId
      ) {
        setState({
          message: 'Field is Required',
          isOpen: true,
          variant: 'error'
        });
        setSubmitting(false);
        return setValidForm(false);
      }
      if (mobileNo.length !== 10) {
        setState({
          message: 'Please Check Your Mobile No!',
          isOpen: true,
          variant: 'error'
        });
        setSubmitting(false);
        return setValidForm(false);
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
        setState({
          message: 'You have entered an invalid email address!',
          isOpen: true,
          variant: 'error'
        });
        setSubmitting(false);
        setValidForm(false);
      }

      await NetworkServices.put(
        `${Config.SERVER_URL}/updatehospital/${HospitalId}`,
        {
          hospitalName,
          address,
          description,
          websiteUrl,
          mobileNo,
          emailId
        }
      );
      setState({
        isOpen: true,
        variant: 'success',
        message: 'Update Record Successfully'
      });
      setTimeout(() => {
        history.push('/hospital');
      }, 1000);
    } catch (err) {
      handleError(err.response);
      setState({
        isOpen: true,
        variant: 'error',
        message: 'Error to update'
      });
    } finally {
      // Finally do this
      setSubmitting(false);
    }
  };

  return (
    <div>
      {hospitalDetail.loading ? (
        <CircularProgress
          color="primary"
          style={{
            position: 'absolute',
            left: '45%',
            top: '40%'
          }}
          size="5rem"
        />
      ) : (
        <div className={classes.hospitalDetails}>
          <Header title="Update Hospital" />
          <Snackbar
            errorMessage={state.message}
            isOpen={state.isOpen}
            handleClose={() => setState({ isOpen: false })}
            variant={state.variant}
          />
          <div className={classes.hospitalsDetailsContent}>
            <Container className={classes.Container} maxWidth="md">
              <Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <div className={classes.HospitalContent}>
                      <div className={classes.HospitalIconContent}>
                        <img
                          src="/images/hospital.png"
                          alt="hospital-icon"
                          className={classes.iconhospital}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                      Hospital Details
                    </Typography>
                  </Grid>
                </Grid>
                <form className={classes.HospitalForm}>
                  <div className={classes.HospitalFormInput}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <InputComponent
                          placeholder="Hospital Name"
                          Icon={PersonIcon}
                          onChange={e => setHospitalName(e.target.value)}
                          id="hospitalName"
                          defaultValue={hospital.hospitalName || []}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputComponent
                          placeholder="Address"
                          rowsMax="4"
                          onChange={e => setAddress(e.target.value)}
                          multiline
                          id="address"
                          Icon={HomeIcon}
                          onBlur={handleCoordinates}
                          value={address}
                          defaultValue={hospital.address || []}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputComponent
                          placeholder="Description"
                          rowsMax="4"
                          multiline
                          id="description"
                          Icon={CreateIcon}
                          onChange={e => setDescription(e.target.value)}
                          value={description}
                          defaultValue={hospital.description || []}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <input
                          accept="image/*"
                          hidden
                          id="raised-button-file"
                          multiple
                          type="file"
                          onChange={handleFileUpload}
                        />
                        <label htmlFor="raised-button-file">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              flex: 1,
                              paddingBottom: 8,
                              borderBottom: '1px solid rgba(0,0,0,0.5)'
                            }}
                          >
                            <AddAPhotoIcon color="primary" />
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              style={{ padding: '0 10px' }}
                            >
                              {(file || {}).name || 'Choose Hospital Image'}
                            </Typography>
                          </div>
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputComponent
                          placeholder="WebsiteUrl"
                          Icon={HttpIcon}
                          onChange={e => setWebsiteUrl(e.target.value)}
                          value={websiteUrl}
                          id="websiteUrl"
                          defaultValue={hospital.websiteUrl || []}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputComponent
                          placeholder="Location"
                          value={
                            coordinates
                              ? `Latitude : ${coordinates.lat} Longitude : ${coordinates.lng}`
                              : ''
                          }
                          disabled
                          Icon={LocationOnIcon}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputComponent
                          placeholder="Mobile Number"
                          Icon={PhoneAndroidIcon}
                          onChange={e => setMobileNo(e.target.value)}
                          value={mobileNo}
                          id="mobileNo"
                          defaultValue={hospital.mobileNo[0] || []}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputComponent
                          placeholder="Email id "
                          Icon={EmailIcon}
                          onChange={e => setEmailId(e.target.value)}
                          value={emailId}
                          id="emailId"
                          defaultValue={hospital.emailId || []}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.hospitalButton}
                    onClick={updateHospital}
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size="1.5rem" />
                    ) : (
                      'Update'
                    )}
                  </Button>
                </form>
              </Grid>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
