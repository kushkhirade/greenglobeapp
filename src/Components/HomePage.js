import React from "react";
import { Admin, Resource } from "react-admin";
import {
  Home,
  Book,
  Business,
  Payment,
  People,
  Pages,
  History,
  HeadsetMic,
  Chat,
  AccountCircle,
} from "@material-ui/icons";
import iLayout from "../Custom/iLayout";
import { HomePage, Support, Rto, Communication } from "../Sections";
import data from "../data";
import { ProfilePage } from "./Profile";

function getData(url) {
  console.log(url);
  if (url === "Home") return data.sales;
  else if (url === "Support") return data.support;
  else if (url === "RTO") return data.rto;
  else if (url === "Profile") return data.profile;
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

const PersonIcon = () => <AccountCircle className="profile-icon" fontSize="large" />;

export const HomeScreen = () => (
  <Admin layout={iLayout} dataProvider={dataProvider}>
    <Resource
      name="Profile"
      title="Profile"
      list={ProfilePage}
      icon={PersonIcon}
    />
    <Resource name="Home" title="Home" list={HomePage} icon={Home} />
    <Resource name="Inventory" list={Empty} icon={Book} />
    <Resource name="Buy Orders" list={Empty} icon={Payment} />
    <Resource name="Leads" list={Empty} icon={Pages} />
    <Resource name="Customers" list={Empty} icon={People} />
    <Resource name="Transactions" list={Empty} icon={Business} />
    <Resource name="Report" list={Empty} />
    <Resource name="RTO" list={Rto} icon={History} />
    <Resource name="Communications" list={Communication} icon={HeadsetMic} />
    <Resource name="Support" list={Support} icon={Chat} />
  </Admin>
);
