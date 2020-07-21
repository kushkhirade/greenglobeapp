//#region
import { Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import * as AppActionCreators from "../actions/App.Actions";
import { IApplicationProps } from "../actions/App.Actions";
import SpinnerDialog from "../spinner/Spinner";
import { Alert } from "../state/Alert";
import { AppState, isAuthenticated } from "../state/AppState";
import AppDrawer, { routes } from "./App.Drawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getUserDetails } from "./../state/Utility"
//#endregion
import ButterToast from "butter-toast";

import "./main.css";
import { styles } from "./styles";
const classNames = require("classnames");
interface IAppProps extends IApplicationProps {
  classes: any;
  theme?: any;
}

interface IState {
  anchorEl: any;
  notificationEl: any;
  routeName: string;
}

class MiniDrawer extends React.Component<IAppProps, IState> {
  public state: IState = {
    anchorEl: null,
    notificationEl: null,
    routeName: routes(this.props.isDealer).find((routeData) =>
      window.location.hash.includes(routeData.path)
    ).title as string,
  };

  private handleMenuClose = (path?: string) => {
    this.setState({ anchorEl: null });
    this.navigate(path);
  };

  public handleLogout = () => {
    this.props.history.push("/");
    localStorage.clear();
  };

  private navigate = (path?: string) => {
    if (path) {
      this.props.history.push(path);
    }
  };

  public handleDrawerOpen = () => {
    AppActionCreators.openDrawer();
  };

  public handleDrawerClose = () => {
    AppActionCreators.closeDrawer();
  };

  public showPopup = () => {
    AppActionCreators.showPopup(
      new Alert({
        title: "Testing title",
        message: "This is a very long message, expect alert to be very wide",
      })
    );
  };

  private renderAlert(): JSX.Element {
    if (this.props.utility.alert) {
      return <div></div>;
    }

    return null;
  }

  private renderSpinner(): JSX.Element {
    if (this.props.utility.spinner) {
      return <SpinnerDialog message={this.props.utility.spinner.message} />;
    }

    return null;
  }

  private renderAppBar() {
    const { classes, utility } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar
        position="fixed"
        className={classNames(
          classes.appBar,
          utility.drawerOpen && classes.appBarShift
        )}
      >
        <Toolbar disableGutters={!utility.drawerOpen}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              utility.drawerOpen && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.fillSpace}
            variant="h5"
            color="inherit"
            noWrap={true}
          >
            {this.state.routeName}
          </Typography>
          {this.props.sideButton}
          <div className="align-center" onClick={this.handleLogout}>
            {/* <div>
              Logout <span style={{ paddingRight: "3px" }} />{" "}
            </div> */}
            <ExitToAppIcon />
            &nbsp; &nbsp;
          </div>
        </Toolbar>
      </AppBar>
    );
  }

  private renderDrawer() {
    const { utility } = this.props;
    return (
      <Hidden mdDown={!utility.drawerOpen && true}>
        <AppDrawer
          utility={utility}
          authentication={true}
          handleDrawerClose={this.handleDrawerClose}
          onRouteChange={(routeName: string) => {
            this.setState({ routeName });
            AppActionCreators.closeDrawer();
          }}
        />
      </Hidden>
    );
  }

  public render() {
    const { classes } = this.props;
    const isLoggedIn = isAuthenticated();
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className={classes.root}>
        <ButterToast />
        {this.renderAppBar()}
        {this.renderDrawer()}
        <div className="page-base"> {this.props.children}</div>
        {this.renderAlert()}
        {this.renderSpinner()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  utility: state.utility,
  authentication: state.authentication,
  users: state.users,
  materials: state.materials,
  isDealer: state.users.get("currentUser").isDealer,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(withStyles(styles as any, { withTheme: true })(MiniDrawer as any)) as any
);
