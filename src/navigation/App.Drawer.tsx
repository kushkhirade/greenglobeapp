import {
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  withStyles,
  Typography,
} from "@material-ui/core";
import {
  Book,
  Chat,
  HeadsetMic,
  AccountCircle,
  Pages,
  Payment,
  People,
  Share,
  PersonPin,
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../state/User";
import { Utility, isDealer } from "../state/Utility";
import { styles } from "./styles";
const classNames = require("classnames");

interface IAppDrawer {
  authentication?: User;
  utility: Utility;
  classes?: any;
  onRouteChange: (routeName: string) => void;
  theme?: Theme;
  handleDrawerClose?: () => void;
}
export const routes = [
  { path: "/home", title: "Home", icon: () => <DashboardIcon /> },
  {
    hidden: true,
    path: "/profile",
    title: "Profile",
    icon: () => <PersonPin />,
  },
  { path: "/inventory", title: "Inventory", icon: () => <Book /> },
  { path: "/buy-orders", title: "Buy Orders", icon: () => <Payment /> },
  { path: "/leads", title: "Leads", icon: () => <Pages /> },
  {
    path: "/assign-dealers",
    hideForDealer: true,
    title: "Assigned Dealers",
    icon: () => <Share />,
  },
  { path: "/customers", title: "Customer", icon: () => <People /> },
  {
    hidden: true,
    path: "/customer/add-new-customer",
    title: "Add New Customer",
  },
  {
    hidden: true,
    path: "/lead/add-new-lead",
    title: "Lead Details - Customer",
  },
  {
    hidden: true,
    path: "/transactions",
    title: "Transactions",
    icon: () => <Book />,
  },
  { path: "/rto-process", title: "RTO Process", icon: () => <HeadsetMic /> },
  { path: "/communication", title: "Communications", icon: () => <Book /> },
  {
    path: "/my-users",
    hideForDealer: true,
    title: "My Users",
    icon: () => <Book />,
  },
  { path: "/support", title: "Support", icon: () => <Chat /> },
  {
    path: "/dealers/dealer-details",
    title: "Dealer Details",
    hidden: true,
    icon: () => <Chat />,
  },
  {
    path: "/buy-order/add-new-order",
    title: "Orders",
    hidden: true,
    icon: () => <Chat />,
  },
];

class AppDrawer extends React.Component<IAppDrawer, {}> {
  public render(): JSX.Element {
    const { authentication, classes, utility, theme } = this.props;
    return (
      <Drawer
        hidden={!authentication}
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !utility.drawerOpen && classes.drawerPaperClose
          ),
        }}
        open={utility.drawerOpen}
      >
        <div className="profile">
          <div className="content">
            <AccountCircle className="profile-icon" fontSize="large" />
            <Typography variant="h5" color="inherit" noWrap={true}>
              <NavLink
                onClick={() => this.props.onRouteChange("Profile")}
                exact={true}
                className="drawer-link"
                to={"/profile"}
              >
                Profile
              </NavLink>
            </Typography>
          </div>
          <div className={classes.toolbar}>
            <IconButton onClick={this.props.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
        </div>
        <Divider />
        {routes
          .filter((x) => !x.hidden)
          .filter((x) => (isDealer() ? !x.hideForDealer : true))
          .map((route, index) => {
            return (
              <NavLink
                key={index}
                onClick={() => this.props.onRouteChange(route.title)}
                exact={true}
                className="drawer-link"
                to={route.path}
              >
                <ListItem button={true}>
                  <ListItemIcon>{route.icon()}</ListItemIcon>
                  <ListItemText primary={route.title} />
                </ListItem>
              </NavLink>
            );
          })}
        <Divider />
      </Drawer>
    );
  }
}

export default withStyles(styles as any, { withTheme: true })(
  AppDrawer as any
) as any;
