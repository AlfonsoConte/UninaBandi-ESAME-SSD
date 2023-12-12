import Dashboard from "./SupervisorViews/Dashboard";
import PrivateRoute from "./PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegistrationView from "./RegistrationView";

import Signin from "./Signin";
import Signout from "./Signout";

import { useContext } from "react";
import KeycloakContext from "./KeycloakContext";
import CallForApplicationView from "./SupervisorViews/CallForApplicationView";
import ParticipationReview from "./SupervisorViews/ParticipationReview";
import ParticipationView from "./SupervisorViews/ParticipationView";
import Participations from "./StudentViews/Participations";
import CallForApplicationDetails from "./StudentViews/CallForApplicationDetails";
import CallForApplicationApply from "./StudentViews/CallForApplicationApply";
import UsersView from "./AdminViews/UsersView";
import UserDetailsView from "./AdminViews/UserDetailsView";
import Home from "./Home";
import CustomNavbarAdmin from "./Navbars/CustomNavbarAdmin";
import CustomNavbarReviewer from "./Navbars/CustomNavbarReviewer";
import CustomNavbarStudent from "./Navbars/CustomNavbarStudent";
import ContactView from "./ContactView";
import RegistrationConfirmationView from "./RegistrationConfirmationView";

function App() {
  const keycloak = useContext(KeycloakContext);

  const hasRole = (roles) => roles.some((role) => keycloak.hasRealmRole(role));

  if (hasRole(["ROLE_SUPERVISOR"])) {
    return (
      <>
        <Router>
          <CustomNavbarReviewer />
          <Routes>
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/callForApplications/edit/:id"
              element={
                <PrivateRoute>
                  {" "}
                  <CallForApplicationView />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/participations/review/:id"
              element={
                <PrivateRoute>
                  {" "}
                  <ParticipationReview />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/callForApplications/:id/participations"
              element={
                <PrivateRoute>
                  {" "}
                  <ParticipationView />{" "}
                </PrivateRoute>
              }
            />
            <Route path="/home" element={<Home NavShow={false} />} />
            <Route path="signup" element={<RegistrationView />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signout" element={<Signout />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
            <Route path="contacts" element={<ContactView NavShow={false} />} />
          </Routes>
        </Router>
      </>
    );
  } else if (hasRole(["ROLE_STUDENTE"])) {
    return (
      <>
        <Router>
          <CustomNavbarStudent />
          <Routes>
            <Route
              path="myparticipations"
              element={
                <PrivateRoute>
                  <Participations />
                </PrivateRoute>
              }
            />
            <Route
              path="/callForApplications/details/:id"
              element={
                <PrivateRoute>
                  <CallForApplicationDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/callForApplications"
              element={
                <PrivateRoute>
                  {" "}
                  <CallForApplicationApply />{" "}
                </PrivateRoute>
              }
            />

            <Route path="/home" element={<Home NavShow={false} />} />
            <Route path="signup" element={<RegistrationView />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signout" element={<Signout />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
            <Route path="contacts" element={<ContactView NavShow={false} />} />
          </Routes>
        </Router>
      </>
    );
  } else if (hasRole(["ROLE_ADMIN"])) {
    return (
      <>
        <Router>
          <CustomNavbarAdmin />
          <Routes>
            <Route
              path="users"
              element={
                <PrivateRoute>
                  <UsersView />
                </PrivateRoute>
              }
            />

            <Route path="signin" element={<Signin />} />
            <Route path="signout" element={<Signout />} />
            <Route
              path="/users/user/details/:id"
              element={<UserDetailsView />}
            />
            <Route path="/" element={<Navigate replace to="/users" />} />
            <Route path="*" element={<Navigate replace to="/users" />} />
            <Route path="contacts" element={<ContactView NavShow={false} />} />
          </Routes>
        </Router>
      </>
    );
  } else {
    return (
      <Router>
        <Routes>
          {/*<Route path="/home" element={<Homepage NavShow={true} />} />*/}
          <Route path="/home" element={<Home NavShow={true} />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signout" element={<Signout />} />
          <Route path="signup" element={<RegistrationView />} />
          <Route path="contacts" element={<ContactView NavShow={true} />} />
          <Route
            path="registrationConfirmation"
            element={<RegistrationConfirmationView />}
          />

          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
          {/* TO DO */}
        </Routes>
      </Router>
    );
  }
}

export default App;
