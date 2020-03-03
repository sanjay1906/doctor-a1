import React, { useState, useEffect } from 'react';
import useStyles from './style';
import Header from 'Components/Header';
import { Typography, Container, Button, Grid } from '@material-ui/core';
import { MapService } from 'Services';

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
import { addHospitalAction } from 'Store/action';
import { useHistory } from 'react-router-dom';
import ExpressFirebase from 'express-firebase';
import validate from 'validate.js';

const schema = {
  hospitalName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  address: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  mobileNo: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 12
    }
  },
  emailId: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  }
};

const Layout = () => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useState();
  const [description, setDescription] = useState();
  const [websiteUrl, setWebsiteUrl] = useState();
  const [isValidForm, setValidForm] = useState(false);
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const { address, hospitalName, mobileNo, emailId } = formState.values;

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

  const addHospital = async () => {
    try {
      setFormState({ isValid: true });
      // Validating Form
      if (
        !coordinates ||
        !address ||
        !hospitalName ||
        !description ||
        !websiteUrl ||
        !mobileNo ||
        !emailId
      ) {
        setFormState({ isValid: false });
        return setValidForm(false);
      }

      // Api Calling Will Be Here
      const imageUrl = await ExpressFirebase.uploadFile(file.name, file.image);
      if (!imageUrl) {
        return setFormState({ isValid: false });
      }

      // Api Calling Will be here
      await addHospitalAction({
        address,
        hospitalName,
        description,
        websiteUrl,
        mobileNo,
        emailId,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        hospitalImage: imageUrl
      });
      history.push('/hospital');
    } catch (err) {
      // Handling Error
      handleError(err);
    } finally {
      // Finally do this
      setFormState({ isValid: false });
    }
  };

  return (
    <div className={classes.hospitalDetails}>
      <Header title="Add New Hospital" />
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
                      name="hospitalName"
                      error={hasError('hospitalName')}
                      helperText={
                        hasError('hospitalName')
                          ? formState.errors.hospitalName[0]
                          : null
                      }
                      placeholder="Hospital Name"
                      Icon={PersonIcon}
                      onChange={handleChange}
                      value={formState.values.hospitalName || ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputComponent
                      name="address"
                      error={hasError('address')}
                      helperText={
                        hasError('address') ? formState.errors.address[0] : null
                      }
                      onChange={handleChange}
                      value={formState.values.address || ''}
                      placeholder="Address"
                      rowsMax="4"
                      multiline
                      Icon={HomeIcon}
                      onBlur={handleCoordinates}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputComponent
                      placeholder="Description"
                      rowsMax="4"
                      multiline
                      Icon={CreateIcon}
                      onChange={e => setDescription(e.target.value)}
                      value={description}
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
                      name="mobileNo"
                      error={hasError('mobileNo')}
                      helperText={
                        hasError('mobileNo')
                          ? formState.errors.mobileNo[0]
                          : null
                      }
                      onChange={handleChange}
                      value={formState.values.mobileNo || ''}
                      placeholder="Mobile Number"
                      Icon={PhoneAndroidIcon}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputComponent
                      name="emailId"
                      error={hasError('emailId')}
                      helperText={
                        hasError('emailId') ? formState.errors.emailId[0] : null
                      }
                      onChange={handleChange}
                      value={formState.values.emailId || ''}
                      placeholder="Email id "
                      Icon={EmailIcon}
                    />
                  </Grid>
                </Grid>
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.hospitalButton}
                onClick={addHospital}
                fullWidth
                disabled={!formState.isValid}
              >
                {formState.isValid ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
