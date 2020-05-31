import { Grid, Card } from "@material-ui/core";
import {
  PersonPin,
  Email,
  Phone,
  Chat,
  LocationCity,
} from "@material-ui/icons";

import React from "react";
import "./Profile.scss";

export const ProfilePage = (props) => {
  const [userData, setUserData] = React.useState({});
  React.useEffect(
    () =>
      setUserData({
        distID: 2555,
        name: "Sachin T.",
        email: "Sachin@gmail.com",
        phoneNumber: "12346423423",
        whatsApp: "12346423423",
        address: "Indiabulls, Lower Parel",
        pincode: "411093",
        city: "Mumbai",
        state: "MH",
        country: "INDIA",
      }),
    []
  );

  return (
    <div className="profile-container">
      <Card>
        <Grid container className="profile-grid">
          <Grid item className="profile-item" xs={12}>
            Distributor ID: <b>{userData.distID}</b>
          </Grid>
          <Grid item className="profile-item" xs={12} md={6}>
            <PersonPin fontSize="small" /> {userData.name}
          </Grid>
          <Grid item className="profile-item" xs={12} md={6}>
            <Email fontSize="small" /> <div>{userData.email}</div>
          </Grid>
          <Grid item className="profile-item" xs={6}>
            <Phone fontSize="small" /> {userData.phoneNumber}
          </Grid>
          <Grid item className="profile-item" xs={6}>
            <Chat fontSize="small" /> {userData.whatsApp}
          </Grid>
          <Grid item className="profile-item" xs={6}>
            <LocationCity /> {userData.address}
          </Grid>
          <Grid item className="profile-item" xs={6}>
            {userData.pincode}
          </Grid>
          <Grid item className="profile-item" xs={4} md={2} >
            {userData.city}
          </Grid>
          <Grid item className="profile-item" xs={4} md={2}>
            {userData.state}
          </Grid>
          <Grid item className="profile-item" xs={4} md={2}>
            {userData.country}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
