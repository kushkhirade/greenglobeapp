import { Button, Fab, Grid, TextField } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Add, PersonPin, Phone } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import ChatIcon from "@material-ui/icons/Chat";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import WhatsappIcon from "./wtsapimg.png";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseModal } from "src/components/BaseModal";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./leads.scss";
import { isDealer } from "src/state/Utility";

const allfilterOptions = [
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

const leadfilterOptions = [
  {
    name: "Lead Type - 3W",
    label: "Lead Type - 3W",
  },
  {
    name: "Lead Type - 4W",
    label: "Lead Type - 4W",
  },
];

const subfilterOptions = [
  {
    name: "Lead Sub Type - Customer",
    label: "Lead Sub Type - Customer",
  },
  {
    name: "Lead Sub Type - Influencer",
    label: "Lead Sub Type - Influencer",
  },
  {
    name: "Lead Sub Type - Fitment",
    label: "Lead Sub Type - Fitment",
  },
  {
    name: "Lead Sub Type - Servicing",
    label: "Lead Sub Type - Servicing",
  },
];

const ratingfilterOptions = [
  {
    name: "Rating - Hot ",
    label: "Rating - Hot ",
  },
  {
    name: "Rating - Cold",
    label: "Rating - Cold",
  },
  {
    name: "Rating - Warm ",
    label: "Rating - Warm ",
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
    showFilerOptions: boolean;
    selectedFilter: string;
    filterType: string;
  }
> {
  public state = {
    topActiveTab: "Customer",
    activeTabType: "Assigned",
    isModalOpen: false,
    showFilerOptions: false,
    selectedFilter: "",
    dealers: data.leads.data,
    filterType: ""
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
              <Grid item xs={12} md={6}>
                <CardDetails details={d} history={this.props.history}/>
              </Grid>
            );
          }
          return " ";
        })}
      </Grid>
    );
    // const AssignedCust = data.leads.data.map((d) => {
    //   if (!d.isDealer && d.assigned)
    //     return d;
    // });
    // return (
    //   <Grid container >
    //   {console.log("card details: ", AssignedCust)}
    //     <CardDetails details={AssignedCust} history={this.props.history} />
    //   </Grid>
    // );
  };

  public renderCustomersUnAssigned = () => {
    return (
      <Grid container>
        {data.leads.data.map((d) => {
          if (!d.isDealer && !d.assigned) {
            return (
              <Grid item xs={12} md={6}>
                <CardDetails details={d} onClickAssign={this.openAssignDealerModal} history={this.props.history}/>
              </Grid>
            );
          }
          return " ";
        })}
      </Grid>
    );
    // const UnassignedCust = data.leads.data.map((d) => {
    //   if (!d.isDealer && !d.assigned)
    //     return d;
    // });
    // return (
    //   <Grid container >
    //     <CardDetails details={UnassignedCust} history={this.props.history} />
    //   </Grid>
    // );
  };

  public renderDealersAssigned = () => {
    return (
      <Grid container>
        {data.leads.data.map((d) => {
          if (d.isDealer && d.assigned) {
            return (
              <Grid item xs={12} md={6}>
                <CardDetails details={d} history={this.props.history}/>
              </Grid>
            );
          }
          return " ";
        })}
      </Grid>
    );

    // const AssignedDealer = data.leads.data.map((d) => {
    //   if (d.isDealer && d.assigned)
    //     return d;
    // });
    // return (
    //   <Grid container >
    //     <CardDetails details={AssignedDealer} history={this.props.history} />
    //   </Grid>
    // );
  };

  public renderDealersUnAssigned = () => {
    return (
      <Grid container>
        {data.leads.data.map((d) => {
          if (d.isDealer && !d.assigned) {
            return (
              <Grid item xs={12} md={6}>
                <CardDetails details={d} history={this.props.history}/>
              </Grid>
            );
          }
          return " ";
        })}
      </Grid>
    );

    // const  UnassignedDealer = data.leads.data.map((d) => {
    //   if (d.isDealer && !d.assigned)
    //     return d;
    // })
    // return (
    //   <Grid container >
    //     <CardDetails details={UnassignedDealer} history={this.props.history} />
    //   </Grid>
    // );
  };

  public tabData = [
    {
      tabName: "Customer",
      component: "",
      onTabSelect: (tabName: any) => this.setState({ topActiveTab: tabName }),
    },
    {
      tabName: "Dealer",
      component: this.renderDealersAssigned(),
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
        onClose={() => this.setState({ showFilerOptions: false })}
        contentClassName="support-content"
        open={this.state.showFilerOptions}
      >
        <div className="head-title">Filters</div>
        <form className="form-content" autoComplete="off">
          <div className="dealer-name-container">
            {this.state.filterType === "All" ?
              allfilterOptions.map((fData, index) => (
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
              ))
            : null }
            {this.state.filterType === "Lead Type" ?
              leadfilterOptions.map((fData, index) => (
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
              ))
            : null }
            {this.state.filterType === "Sub Lead Type" ?
            subfilterOptions.map((fData, index) => (
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
            ))
          : null }
          {this.state.filterType === "Rating" ?
              ratingfilterOptions.map((fData, index) => (
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
              ))
            : null }
          </div>
          <div className="button-container">
            <Button
              onClick={() => this.setState({ showFilerOptions: false })}
              variant="contained"
              color="default"
            >
              Cancel
            </Button>{" "}
            <Button
              onClick={() => this.setState({ showFilerOptions: false })}
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
            return (
              <Grid item xs={12} md={6} >
                <CardDetailsForDealer details={d} history={this.props.history}/>
              </Grid>
            );
          })}
        </Grid>
        // <Grid container>
        //    <CardDetailsForDealer details={data.leads.data} history={this.props.history} />;
        // </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFilerOptions: true, filterType: "All" }),
    },
    {
      tabName: "Lead Type",
      component: (
        <Grid container>
           {/* <CardDetailsForDealer details={data.leads.data} history={this.props.history} />; */}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFilerOptions: true, filterType: "Lead Type" }),
    },
    {
      tabName: "Sub Lead Type",
      component: (
        <Grid container>
           {/* <CardDetailsForDealer details={data.leads.data} history={this.props.history} />; */}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFilerOptions: true, filterType: "Sub Lead Type" }),
    },
    {
      tabName: "Rating",
      component: (
        <Grid container>
           {/* <CardDetailsForDealer details={data.leads.data} history={this.props.history} />; */}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFilerOptions: true, filterType: "Rating" }),
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
              {this.state.topActiveTab === "Customer" && (
                <Tabs tabsData={this.tabDataToDisplay} />
              )}
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
  // return (
  //   <div className="cards-main">
  //     {details.map((datavalue: any, index: number) => {
        return (
          <div className="card-container">
            <Grid container >
              <Grid className="padding-6-corners" item xs={6} md={6} >
                {/* <span className="description-text">Name:</span> */}
                {details.name || "NA"}
              </Grid>
              <Grid className="padding-6-corners" item xs={6} md={6}>
                {/* <span className="description-text">Contact:</span> */}
                {details.phoneNumber || "NA"}
              </Grid>
            </Grid>           
            <Grid container >
              <Grid className="padding-6-corners" item xs={6} md={6} >
                <span className="description-text">Kit Enquiry:</span>
                {details.kitEnq || "NA"}
              </Grid>
              <Grid className="padding-6-corners" item xs={6} md={6}>
                <span className="description-text">Vehicle Type:</span>
                {details.vehicleType || "NA"}
              </Grid>
            </Grid>
            {details.assigned ? (
              // <React.Fragment>
                <Grid container>
                  <Grid className="padding-6-corners" item xs={6} md={6}>
                    <span className="description-text">Assigned Dealer :</span>
                    {details.dealer || "NA"}
                  </Grid>
                  <Grid className="padding-6-corners" item xs={6} md={6}>
                    <span className="description-text">Lead Rating :</span>
                    <Rating
                      readOnly
                      precision={0.5}
                      value={details.leadRating}
                    />
                  </Grid>
                </Grid>
              // </React.Fragment>
            ) : (
              ""
            )}
            <Grid container >
              <Grid className="padding-6-corners" item xs={6} md={6}>
                <span className="description-text">Dealer Generated Lead:</span>
                {details.dealer || "NA"}
              </Grid>
              <Grid className="padding-6-corners" item xs={6} md={6}>
                
                  <span className="view" onClick={() => props.history.push("/lead/add-new-lead")}>
                  {details.assigned ? "View Details" : ""}
                  </span>
                
                  <span className="clickable" onClick={props.onClickAssign}>
                  {!details.assigned ? "Click To Assign Dealer" : ""}
                  </span>
                
              </Grid>
            </Grid>
            <Grid container className="padding-15 align-left">
              <Grid className="padding-6-corners" item xs={12} md={12}>
                <div className="icon-container">
                  <PhoneIcon className="phone-icon" />
                  &nbsp;
                  <ChatIcon className="chat-icon" />
                  &nbsp;
                  <MailIcon className="mail-icon" />
                  &nbsp;
                  <img
                    height="42px"
                    src={WhatsappIcon}
                    // src="https://img.icons8.com/color/48/000000/whatsapp.png"
                  />{" "}
                </div>
              </Grid>
            </Grid>{" "}
          </div>
    //     )}
    //   )}
    // </div>
  );
};

const CardDetailsForDealer = (props: any) => {
  const { details } = props;
  return (
    <div onClick={props.onClick} className="card-container ">
      <Grid container >
        <Grid item className="padding-6-corners" xs={6} md={6}>
          {/* <PersonPin /> <span style={{ padding: "5px" }} /> */}
          {details.name}
        </Grid>
        <Grid item className="padding-6-corners" xs={6} md={6}>
          {/* <Phone /> <span style={{ padding: "5px" }} /> */}
          {details.phoneNumber}
        </Grid>
      </Grid>
      <Grid container >
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text">Kit Enquiery :</span>
          {details.kitEnq || 'NA'}
        </Grid>
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text"> Vehicle Type</span>
          {details.vehicleType}
        </Grid>
      </Grid>
      <Grid container >
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text"> Dealer Generated Lead:</span>
          {details.dealer || "NA"}
        </Grid>
        <Grid item className="padding-6-corners align-center" xs={6} md={6}
          style={{ justifyContent: "flex-start" }}
        >
          <span className="description-text">Lead Rating:</span>
          <Rating
            readOnly
            precision={0.5}
            value={details.leadRating}
          />
        </Grid>
      </Grid>
      <Grid container >
        <Grid className="padding-6-corners" item xs={4} md={4}> 
          <span
            onClick={() =>
              props.history.push("/lead/add-new-lead")
            }
            className="view"
          >
            View Details
          </span>
        </Grid>
        <Grid className="padding-6-corners" item xs={8} md={8} >
          <div className="icon-container">
            <PhoneIcon className="phone-icon" />
            &nbsp;
            <ChatIcon className="chat-icon" />
            &nbsp;
            <MailIcon className="mail-icon" />
            &nbsp;
            <img
              height="42px"
              src={WhatsappIcon}
              // src="https://img.icons8.com/color/48/000000/whatsapp.png"
            />{" "}
          </div>
        </Grid>
      </Grid>{" "}
    </div>
  );
        // return (
        //   <div className="card-container">
        //     <Grid container >
        //       <Grid className="padding-6-corners" item xs={6} md={6}>
        //         {/* <span className="description-text">Name:</span> */}
        //         <PersonPin /> <span style={{ padding: "5px" }} />
        //         {details.name || "NA"}
        //       </Grid>
        //       <Grid className="padding-6-corners" item xs={6} md={6}>
        //         {/* <span className="description-text">Contact:</span> */}
        //         <Phone /> <span style={{ padding: "5px" }} />
        //         {details.phoneNumber || "NA"}
        //       </Grid>
        //     </Grid>{" "}
        //     <Grid container>
        //       <Grid className="padding-6-corners" item xs={6} md={6} >
        //         <span className="description-text">Kit Enquiry:</span>
        //         {details.kitEnq || "NA"}
        //       </Grid>
        //       <Grid className="padding-6-corners" item xs={6} md={6} >
        //         <span className="description-text">Vehicle Type:</span>
        //         {details.vehicleType || "NA"}
        //       </Grid>
        //     </Grid>{" "}
        //     <Grid container>
        //       <Grid className="padding-6-corners" item xs={6} md={6} >
        //         <span className="description-text">Dealer Generated Lead:</span> 
        //         {details.dealer || "NA"}
        //       </Grid>
        //       <Grid className="padding-6-corners" item xs={6} md={6}>
        //         <span className="description-text">Lead Rating :</span>
        //         <Rating
        //           readOnly
        //           precision={0.5}
        //           value={details.dealerRating}
        //         />
        //       </Grid>
        //     </Grid>
        //     <Grid container >
        //     <Grid className="padding-6-corners" item xs={4} md={4}> 
        //         <span
        //           onClick={() =>
        //             props.history.push("/lead/add-new-lead")
        //           }
        //           className="view"
        //         >
        //           View Details
        //         </span>
        //       </Grid>
        //       <Grid className="padding-6-corners" item xs={8} md={8} >
        //         <div className="icon-container">
        //           <PhoneIcon className="phone-icon" />
        //           &nbsp;
        //           <ChatIcon className="chat-icon" />
        //           &nbsp;
        //           <MailIcon className="mail-icon" />
        //           &nbsp;
        //           <img
        //             height="42px"
        //             src={WhatsappIcon}
        //             // src="https://img.icons8.com/color/48/000000/whatsapp.png"
        //           />{" "}
        //         </div>
        //       </Grid>
        //     </Grid>{" "}
        //   </div>
        // );
};
