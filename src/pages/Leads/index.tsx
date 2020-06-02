import * as React from "react";
import { connect } from "react-redux";
import { Tabs } from "src/components/Tabs";
import data from "../../data";
import AppBar from "src/navigation/App.Bar";
import "./leads.scss";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import { Button, Fab, TextField } from "@material-ui/core";
import { BaseModal } from "src/components/BaseModal";
import { Add } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

export interface ILeadsProps {
  history: {
    push: (path: string) => void;
  };
}

export class LeadsImpl extends React.Component<
  ILeadsProps,
  {
    topActiveTab: string;
    activeTabType: string;
    isModalOpen: boolean;
    dealers: any;
  }
> {
  public state = {
    topActiveTab: "Customer",
    activeTabType: "Assigned",
    isModalOpen: false,
    dealers: data.dealers,
  };

  public openAssignDealerModal = () => {
    this.setState({ isModalOpen: true });
  };

  public renderCustomersAssigned = () => {
    return data.leads.data.map((d) => {
      if (!d.isDealer && d.assigned) {
        return <CardDetails details={d} />;
      }
      return " ";
    });
  };
  public renderCustomersUnAssigned = () => {
    return data.leads.data.map((d: any) => {
      if (!d.isDealer && !d.assigned) {
        return (
          <CardDetails details={d} onClickAssign={this.openAssignDealerModal} />
        );
      }
      return " ";
    });
  };
  public renderDealersAssigned = () => {
    return data.leads.data.map((d: any) => {
      if (d.isDealer && d.assigned) {
        return <CardDetails details={d} />;
      }
      return " ";
    });
  };
  public renderDealersUnAssigned = () => {
    return data.leads.data.map((d: any) => {
      if (d.isDealer && !d.assigned) {
        return <CardDetails details={d} />;
      }
      return " ";
    });
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
            <Button variant="contained">Cancel</Button>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </BaseModal>
    );
  };

  public render() {
    return (
      <AppBar>
        {this.renderAssignDealerModal()}
        <div className="leads">
          <Tabs tabsData={this.tabData} />
          <Tabs tabsData={this.tabDataToDisplay} />
        </div>
        <span
          onClick={() => this.props.history.push("/leads/add-new-lead")}
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
  return {};
}
export const Leads = withRouter(
  connect<{}, {}, ILeadsProps>(mapStateToProps)(LeadsImpl) as any
);

const CardDetails = (props: any) => {
  const { details } = props;
  return (
    <div className="card-container">
      <div className="card-data">
        <div className="card-element">
          <PersonIcon /> &nbsp; {details.name}
        </div>
        <div className="card-element">
          <PhoneIcon /> &nbsp;{details.phoneNumber}
        </div>
        <div className="card-element">
          <MailIcon /> &nbsp;{details.email}
        </div>
        <div className="card-element">{details.kitEnq}</div>
        <div className="card-element">{details.assignedDealer}</div>
        <div className="card-element">{details.vehicleType}</div>
        <div className="clickable" onClick={props.onClickAssign}>
          {!details.assigned ? "Click To Assign Dealer" : ""}
        </div>
      </div>
    </div>
  );
};
