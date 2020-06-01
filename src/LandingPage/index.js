import {
  AccountCircle,
  Book,
  Business,
  Chat,
  HeadsetMic,
  History,
  Home,
  Pages,
  Payment,
  People,
} from "@material-ui/icons";
import React from "react";
import { Admin, Resource } from "react-admin";
import { HomePage } from "../Components/HomePage";
import { Communication, Rto, Support } from "../Components/inedx";
import { Inventory } from "../Components/Inventory";
import { ProfilePage } from "../Components/Profile";
import iLayout from "../Custom/iLayout";
import data from "../data";
import { Customers } from "../Components/Customers";

function getData(url) {
  console.log(url);
  if (url === "Home") return data.sales;
  else if (url === "Support") return data.support;
  else if (url === "RTO") return data.rto;
  else if (url === "Profile") return data.profile;
  else if (url === "Inventory") return data.inventory;
  else if (url === "Customers") return data.customers;
  return data.sales;
}

const getList = (url = "", params = {}) =>
  new Promise((resolve, reject) => {
    try {
      resolve(getData(url));
    } catch (e) {
      reject(e);
    }
  });

const getOne = (url = "", params = {}) =>
  new Promise((resolve, reject) => {
    try {
      resolve(getData(url));
    } catch (e) {
      reject(e);
    }
  });

const dataProvider = {
  getList,
  getOne,
};

function Empty(props) {
  return <h2>Under Construction</h2>;
}

const PersonIcon = () => (
  <AccountCircle className="profile-icon" fontSize="large" />
);

export const LandingPage = () => (
  <div style={{ width: "100%" }}>
    <Admin layout={iLayout} dataProvider={dataProvider}>
      <Resource
        name="Profile"
        title="Profile"
        list={ProfilePage}
        icon={PersonIcon}
        options={{ label: "Profile" }}
      />
      <Resource
        options={{ label: "Home" }}
        name="Home"
        title="Home"
        list={HomePage}
        icon={Home}
      />
      <Resource
        options={{ label: "Inventory" }}
        name="Inventory"
        list={Inventory}
        icon={Book}
      />
      <Resource
        options={{ label: "Buy Orders" }}
        name="Buy Orders"
        list={Empty}
        icon={Payment}
      />
      <Resource
        options={{ label: "Leads" }}
        name="Leads"
        list={Empty}
        icon={Pages}
      />
      <Resource
        options={{ label: "Customers" }}
        name="Customers"
        list={Customers}
        icon={People}
      />
      <Resource
        options={{ label: "Transactions" }}
        name="Transactions"
        list={Empty}
        icon={Business}
      />
      <Resource options={{ label: "Reports" }} name="Report" list={Empty} />
      <Resource
        options={{ label: "RTO Process" }}
        name="RTO"
        list={Rto}
        icon={History}
      />
      <Resource
        options={{ label: "Communications" }}
        name="Communication"
        list={Communication}
        icon={HeadsetMic}
      />
      <Resource
        options={{ label: "Support" }}
        name="Support"
        list={Support}
        icon={Chat}
      />
    </Admin>
  </div>
);
