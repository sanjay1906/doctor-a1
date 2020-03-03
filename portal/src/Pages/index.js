import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Config from 'Config';

import Login from 'Pages/Login';
import Register from 'Pages/Register';
import HospitalListing from 'Pages/HospitalListing';
import HospitalAdd from 'Pages/HospitalAdd';
import Cab from 'Pages/Cab';
import DoctorAdd from './DoctorAdd';
import NotFoundView from './NotFoundView';
import HospitalDetail from 'Pages/HospitalsDetail';
import PatientDetail from 'Pages/PatientDetails';
import Notification from 'Pages/Notification';
import Order from 'Pages/Order';
import OtpVerification from 'Pages/OTP VERIFICATION';
import CategoryAddPage from 'Pages/Category';
import CategoryListing from 'Pages/CategoryListing';
import ExpressFirebase from 'express-firebase';
import { AuthServices } from 'Services';
ExpressFirebase.connect(Config.FIREBASE_CONFIG);

class Root extends React.Component {
  componentDidMount() {
    console.log(AuthServices.isAdmin());
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={HospitalListing} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/hospital" component={HospitalListing} />

          {AuthServices.isAuthenticated() && AuthServices.isAdmin() && (
            <Route exact path="/add/hospital" component={HospitalAdd} />
          )}
          {/* adding cab */}

          {AuthServices.isAuthenticated() && AuthServices.isAdmin() && (
            <Route exact path="/cab" component={Cab} />
          )}

          {/* category */}

          {AuthServices.isAuthenticated() && AuthServices.isAdmin() && (
            <Route exact path="/category" component={CategoryAddPage} />
          )}

          <Route
            exact
            path="/hospital/:hospitalId"
            component={HospitalDetail}
          />
          <Route exact path="/add/doctor/:hospitalId" component={DoctorAdd} />
          <Route exact path="/patient" component={PatientDetail} />
          <Route exact path="/notification" component={Notification} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/otp" component={OtpVerification} />
          <Route exact path="/category/list" component={CategoryListing} />
          <Route component={NotFoundView} />
        </Switch>
      </Router>
    );
  }
}
export default Root;
