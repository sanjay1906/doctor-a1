import React, { useState, useEffect } from 'react';
import useStyles from './style';
import Header from 'Components/Header';
import validate from 'validate.js';

import {
  Container,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DegreeIcon from '@material-ui/icons/Bookmark';
import DescriptionIcon from '@material-ui/icons/Description';
import HospitalIcon from '@material-ui/icons/LocalHospital';
import { InputComponent } from 'Components';
import { useSelector } from 'react-redux';
import { selectHospitalDetail, selectCategories } from 'Store/selectors';
import { useHistory } from 'react-router-dom';
import { handleError } from 'Store/helper';
import { addDoctor, fetchCategory } from 'Store/action';
import ExpressFirebase from 'express-firebase';

const schema = {
  doctorName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  degree: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  category: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  }
};

const Layout = () => {
  const selectedHospital = useSelector(selectHospitalDetail);
  const categoryListing = useSelector(selectCategories);
  const history = useHistory();
  const [description, setDescription] = useState();
  const [isSubmitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    if (!selectedHospital.data) {
      return history.goBack();
    }
  }, [selectedHospital]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const { doctorName, degree, category } = formState.values;

  const handleFileUpload = e => {
    const files = e.target.files;
    if (files && files.length) {
      setFile({ image: files[0], name: files[0].name });
    }
  };

  const handleAddDoctor = async () => {
    try {
      setSubmitting(true);

      if (!doctorName || !description || !degree || !category) {
        return setSubmitting(false);
      }

      const imageUrl = await ExpressFirebase.uploadFile(file.name, file.image);
      if (!imageUrl) {
        return setSubmitting(false);
      }

      // Api Calling Will Be Here
      await addDoctor({
        doctorName,
        description,
        degree,
        category,
        latitude: selectedHospital.data.location.coordinates[1],
        longitude: selectedHospital.data.location.coordinates[0],
        hospitalId: selectedHospital.data._id,
        thumbnailImage: imageUrl
      });

      // Navigate to Back Screen After Adding
      history.goBack();
    } catch (err) {
      // Handling error
      handleError(err);
    } finally {
      setSubmitting(false);
      // Reseting state here...
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.docDetails}>
      <Header title="Add New Doctor" />
      <div className={classes.docDetailsContent}>
        <Container className={classes.container} maxWidth="md">
          <Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className={classes.Docicon}>
                  <img
                    src="/images/Doctor.svg"
                    alt="taxi-icon"
                    className={classes.icondoctor}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" align="center">
                  Doctor Details
                </Typography>
                <form>
                  <InputComponent
                    placeholder="Hospital Name"
                    disabled
                    Icon={HospitalIcon}
                    value={(selectedHospital.data || {}).hospitalName}
                  />
                  <InputComponent
                    name="doctorName"
                    error={hasError('doctorName')}
                    helperText={
                      hasError('doctorName')
                        ? formState.errors.doctorName[0]
                        : null
                    }
                    onChange={handleChange}
                    value={formState.values.doctorName || ''}
                    placeholder="Doctor name"
                    Icon={PersonIcon}
                  />
                  <InputComponent
                    placeholder="Description"
                    Icon={DescriptionIcon}
                    multiline
                    rowsMax="4"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <InputComponent
                    name="degree"
                    error={hasError('degree')}
                    helperText={
                      hasError('degree') ? formState.errors.degree[0] : null
                    }
                    onChange={handleChange}
                    value={formState.values.degree || ''}
                    placeholder="Degree"
                    Icon={DegreeIcon}
                  />
                  <FormControl style={{ flex: 1, display: 'flex' }}>
                    <InputLabel>Select Category</InputLabel>
                    <Select
                      name="category"
                      error={hasError('category')}
                      helperText={
                        hasError('category')
                          ? formState.errors.category[0]
                          : null
                      }
                      onChange={handleChange}
                      value={formState.values.category || ''}
                      id="demo-simple-select"
                      fullWidth
                    >
                      <MenuItem value={1}>Select Category</MenuItem>
                      {(categoryListing.data || []).map(element => (
                        <MenuItem value={element._id}>{element.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                        marginTop: 8,
                        borderBottom: '1px solid rgba(0,0,0,0.5)'
                      }}
                    >
                      <AddAPhotoIcon color="primary" />
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        style={{ padding: '0 10px' }}
                      >
                        {(file || {}).name || 'Upload doctor image'}
                      </Typography>
                    </div>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 15 }}
                    onClick={handleAddDoctor}
                    fullWidth
                    disabled={!formState.isValid}
                  >
                    {categoryListing.loading && (
                      <CircularProgress
                        color="inherit"
                        size={20}
                        style={{ marginRight: 10 }}
                      />
                    )}{' '}
                    {formState.isValid ? 'Submitting..' : 'Submit'}
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
export default Layout;
