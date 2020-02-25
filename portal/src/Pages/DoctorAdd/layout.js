import React, { useState, useEffect } from 'react';
import useStyles from './style';
import Header from 'Components/Header';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DegreeIcon from '@material-ui/icons/Bookmark';
import CategoryIcon from '@material-ui/icons/Category';
import StarIcon from '@material-ui/icons/Star';
import DescriptionIcon from '@material-ui/icons/Description';
import HospitalIcon from '@material-ui/icons/LocalHospital';
import { InputComponent } from 'Components';
import { useSelector } from 'react-redux';
import { selectHospitalDetail } from 'Store/selectors';
import { useHistory } from 'react-router-dom';
import { handleError } from 'Store/helper';
import { addDoctor } from 'Store/action';

const Layout = () => {
  const selectedHospital = useSelector(selectHospitalDetail);
  const history = useHistory();

  const [doctorName, setDoctorName] = useState();
  const [description, setDescription] = useState();
  const [degree, setDegree] = useState();
  const [category, setCategory] = useState();
  const [isValidForm, setValidForm] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedHospital.data) {
      return history.goBack();
    }
  }, [selectedHospital]);

  const handleAddDoctor = async () => {
    try {
      setSubmitting(true);

      if (!doctorName || !description || !degree || !category) {
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
        hospitalId: selectedHospital.data._id
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
                    placeholder="Doctor name"
                    Icon={PersonIcon}
                    value={doctorName}
                    onChange={e => setDoctorName(e.target.value)}
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
                    placeholder="Degree"
                    Icon={DegreeIcon}
                    value={degree}
                    onChange={e => setDegree(e.target.value)}
                  />
                  <InputComponent
                    placeholder="Category"
                    Icon={CategoryIcon}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  />
                  <input
                    accept="image/*"
                    hidden
                    id="raised-button-file"
                    multiple
                    type="file"
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
                        Upload doctor image
                      </Typography>
                    </div>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 15 }}
                    onClick={handleAddDoctor}
                    fullWidth
                  >
                    Submit
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
