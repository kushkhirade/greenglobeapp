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
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../state/User";
import { Utility } from "../state/Utility";
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
  { path: "/inventory", title: "Inventory", icon: () => <Book /> },
  { path: "/buy-orders", title: "Buy Orders", icon: () => <Payment /> },
  { path: "/leads", title: "Leads", icon: () => <Pages /> },
  { path: "/customers", title: "Customer", icon: () => <People /> },
  { path: "/transactions", title: "Transactions", icon: () => <Book /> },
  { path: "/rto-process", title: "RTO Process", icon: () => <HeadsetMic /> },
  { path: "/communication", title: "Communications", icon: () => <Book /> },
  { path: "/support", title: "Support", icon: () => <Chat /> },
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
          <div className="content" >
            <AccountCircle className="profile-icon" fontSize="large" />
            <Typography variant="h5" color="inherit" noWrap={true}>
              Profile
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
        {routes.map((route, index) => {
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
