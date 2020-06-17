import { Button, Fab, Grid, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseModal } from "src/components/BaseModal";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./leads.scss";
import { isDealer } from "src/state/Utility";

const filterOptions = [
  {
    name: "all",
    label: "All",
  },
  {
    name: "fresh",
    label: "Fresh",
  },
  {
    name: "followups",
    label: "Followups",
  },
  {
    name: "followups td",
    label: "Followups Today",
  },
  {
    name: "followups",
    label: "Followups Pending",
  },
];

export interface ILeadsProps {
  history: {
    push: (path: string) => void;
  };
  isDealer: boolean;
}

export class LeadsImpl extends React.Component<
  ILeadsProps,
  {
    topActiveTab: string;
    activeTabType: string;
    isModalOpen: boolean;
    dealers: any;
    showFiletOptions: boolean;
  }
> {
  public state = {
    topActiveTab: "Customer",
    activeTabType: "Assigned",
    isModalOpen: false,
    showFiletOptions: false,
    selectedFilter: "",
    dealers: data.leads.data,
  };

  public openAssignDealerModal = () => {
    this.setState({ isModalOpen: true });
  };

  public renderCustomersAssigned = () => {
    return (
      <Grid container>
        {data.leads.data.map((d) => {
          if (!d.isDealer && d.assigned) {
            return (
              <Grid item xs={12} md={6} sm={6}>
                <CardDetails details={d} />
              </Grid>
            );
          }
          return " ";
        })}
      </Grid>
    );
  };
  public renderCustomersUnAssigned = () => {
    return (
      <Grid container>
        {data.leads.data.map((d) => {
          if (!d.isDealer && !d.assigned) {
            return (
              <Grid item xs={12} md={6} sm={6}>
                <CardDetails
                  onClickAssign={this.openAssignDealerModal}
                  details={d}
                />
              </Grid>
            );
          }
          return " ";
        })}
      </Grid>
    );
  };
  public renderDealersAssigned = () => {
    return (
      <Grid container>
        {data.leads.data.map((d) => {
          if (d.isDealer && d.assigned) {
            return (
              <Grid item xs={12} md={6} sm={6}>
                <CardDetails details={d} />
              </Grid>
            );
          }
          return " ";
        })}
      </Grid>
    );
  };
  public renderDealersUnAssigned = () => {
    return (
      <Grid container>
        {data.leads.data.map((d) => {
          if (d.isDealer && !d.assigned) {
            return (
              <Grid item xs={12} md={6} sm={6}>
                <CardDetails details={d} />
              </Grid>
            );
          }
          return " ";
        })}
      </Grid>
    );
  };

  public tabData = [
    {
      tabName: "Customer",
      component: "",
      onTabSelect: (tabName: any) => this.setState({ topActiveTab: tabName }),
    },
    {
      tabName: "Dealer",
      component: "",
      onTabSelect: (tabName: any) => this.setState({ topActiveTab: tabName }),
    },
  ];
  public tabDataToDisplay = [
    {
      tabName: "Assigned",
      component:
        this.state.topActiveTab === "Customer"
          ? this.renderCustomersAssigned()
          : this.renderDealersAssigned(),
      onTabSelect: (tabName: any) => this.setState({ activeTabType: tabName }),
    },
    {
      tabName: "Unassigned",
      component:
        this.state.topActiveTab === "Customer"
          ? this.renderCustomersUnAssigned()
          : this.renderDealersUnAssigned(),
      onTabSelect: (tabName: any) => this.setState({ activeTabType: tabName }),
    },
  ];

  public filterDealers = (event: any) => {
    const value = event.target.value;
    const dealers = data.dealers.filter((dData) =>
      dData.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({
      dealers,
    });
  };

  public renderAssignDealerModal = () => {
    return (
      <BaseModal
        className="assign-dealer-modal"
        contentClassName="support-content"
        onClose={() => this.setState({ isModalOpen: false })}
        open={this.state.isModalOpen}
      >
        <div className="head-title">Assign Dealer</div>
        <form className="form-content" autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Search Dealer"
            className="form-input"
            onChange={this.filterDealers}
            variant="outlined"
          />
          <div className="dealer-name-container">
            {this.state.dealers.length
              ? this.state.dealers.map((dealerData) => (
                  <div className="dealer-name">{dealerData.name}</div>
                ))
              : "No Dealer Found"}
          </div>
          <div className="button-container">
            <Button
              onClick={() => this.setState({ isModalOpen: false })}
              variant="contained"
              color="default"
            >
              Cancel
            </Button>{" "}
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </BaseModal>
    );
  };

  public renderFilterModal = () => {
    return (
      <BaseModal
        className="assign-dealer-modal"
        onClose={() => this.setState({ showFiletOptions: false })}
        contentClassName="support-content"
        open={this.state.showFiletOptions}
      >
        <div className="head-title">Filters</div>
        <form className="form-content" autoComplete="off">
          <div className="dealer-name-container">
            {filterOptions.map((fData, index) => (
              <div
                key={index}
                onClick={() =>
                  this.setState({
                    selectedFilter: fData.label,
                  })
                }
                className={`dealer-name ${
                  this.state.selectedFilter === fData.label && "active"
                }`}
              >
                {fData.label}
              </div>
            ))}
          </div>
          <div className="button-container">
            <Button
              onClick={() => this.setState({ showFiletOptions: false })}
              variant="contained"
              color="default"
            >
              Cancel
            </Button>{" "}
            <Button
              onClick={() => this.setState({ showFiletOptions: false })}
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
          </div>
        </form>
      </BaseModal>
    );
  };

  tabDataForDealer = [
    {
      tabName: "All(50)",
      component: (
        <Grid container>
          {data.leads.data.map((d) => {
            return <CardDetailsForDealer details={d} />;
          })}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFiletOptions: true }),
    },
    {
      tabName: "Lead Type",
    },
    {
      tabName: "Sub Lead Type",
    },
    {
      tabName: "Rating",
    },
    {
      tabName: "Walk Ins",
    },
  ];

  public render() {
    return (
      <AppBar>
        {this.renderAssignDealerModal()}
        {this.renderFilterModal()}
        <div className="leads">
          {isDealer() ? (
            <Tabs tabsData={this.tabDataForDealer} hasSort={true} />
          ) : (
            <React.Fragment>
              <Tabs tabsData={this.tabData} />
              <Tabs tabsData={this.tabDataToDisplay} />
            </React.Fragment>
          )}
        </div>
        <span
          onClick={() => this.props.history.push("/lead/add-new-lead")}
          style={{ position: "absolute", right: 20, bottom: 20 }}
        >
          <Fab color="secondary" aria-labelledby="add-ticket">
            <Add />
          </Fab>
        </span>
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {
    isDealer: false,
  };
}
export const Leads = withRouter(
  connect<{}, {}, ILeadsProps>(mapStateToProps)(LeadsImpl) as any
);

const CardDetails = (props: any) => {
  const { details } = props;
  return (
    <div className="card-container">
      <Grid container>
        <Grid className="padding-6" item xs={6} md={6}>
          <span className="description-text">Name:</span>
          {details.name}
        </Grid>
        <Grid className="padding-6" item xs={6} md={6}>
          <span className="description-text">Contact:</span>
          {details.mobileNumber || "NA"}
        </Grid>
        <Grid className="padding-6" item xs={6} md={6}>
          <span className="description-text">Email:</span>
          {details.email}
        </Grid>
        <Grid className="padding-6" item xs={6} md={6}>
          <span className="description-text">Kit Enquiry:</span>
          {details.kitEnq || "NA"}
        </Grid>
        <Grid className="padding-6" item xs={6} md={6}>
          <span className="description-text">Vehicle Type:</span>
          {details.vehicleType || "NA"}
        </Grid>
        <Grid className="padding-6" item xs={6} md={6}>
          <span className="description-text">Dealer Generated Lead:</span>
          {details.dealer || "NA"}
        </Grid>
      </Grid>
      <div className="clickable" onClick={props.onClickAssign}>
        {!details.assigned ? "Click To Assign Dealer" : ""}
      </div>
      <Grid container className="padding-15 align-left">
        <Grid className="padding-6" item xs={12} md={12}>
          <div className="icon-container">
            <PhoneIcon className="phone-icon" />
            &nbsp;
            <ChatIcon className="chat-icon" />
            &nbsp;
            <MailIcon className="mail-icon" />
            &nbsp;
            <img
              height="44px"
              src="https://img.icons8.com/color/48/000000/whatsapp.png"
            />{" "}
          </div>
        </Grid>
      </Grid>{" "}
    </div>
  );
};

const CardDetailsForDealer = (props: any) => {
  const { details } = props;
  return (
    <Grid item xs={12} md={6} lg={6} sm={6}>
      <div className="card-container">
        <Grid container className="padding-15 align-left">
          <Grid item className="padding-6" xs={12} md={12}>
            <span className="description-text">Name:</span> {details.name}
          </Grid>
          <Grid className="padding-6" item xs={12} md={12}>
            <span className="description-text">Contact</span>{" "}
            {details.mobileNumber}
          </Grid>
        </Grid>{" "}
        <Grid container className="padding-15 align-left">
          <Grid item className="padding-6" xs={12} md={12}>
            <span className="description-text">Email:</span> {details.email}
          </Grid>
          <Grid className="padding-6" item xs={12} md={12}>
            <span className="description-text">Kit Enquiry</span>{" "}
            {details.kitEnq}
          </Grid>
        </Grid>{" "}
        <Grid container className="padding-15 align-left">
          <Grid item className="padding-6" xs={12} md={12}>
            <span className="description-text">Vehicle Type:</span>{" "}
            {details.vehicleType}
          </Grid>
          <Grid className="padding-6" item xs={12} md={12}>
            <span className="description-text">Dealer Generated Lead</span>{" "}
            {details.mobileNumber}
          </Grid>
        </Grid>{" "}
        <Grid container className="padding-15 align-left">
          <Grid className="padding-6" item xs={12} md={12}>
            <div className="icon-container">
              <PhoneIcon className="phone-icon" />
              &nbsp;
              <ChatIcon className="chat-icon" />
              &nbsp;
              <MailIcon className="mail-icon" />
              &nbsp;
              <img
                height="44px"
                src="https://img.icons8.com/color/48/000000/whatsapp.png"
              />{" "}
            </div>
          </Grid>
        </Grid>{" "}
      </div>
    </Grid>
  );
};
