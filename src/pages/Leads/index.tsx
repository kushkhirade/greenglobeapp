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
import getData from "src/utils/getData";
import data from "../../data";
import { getToken, isDealer, IHistory } from "src/state/Utility";
import { saveLeadsData, saveAssignedDealersData, saveDealerData } from "src/actions/App.Actions";
import { ChangePhoneFormat } from "src/components/Format";
import "./leads.scss";

var loggedInUserDetails;
const allfilterOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "fresh",
    label: "Fresh",
  },
  {
    value: "followups",
    label: "Followups",
  },
  {
    value: "followups td",
    label: "Followups Today",
  },
  {
    value: "followups",
    label: "Followups Pending",
  },
];

const leadfilterOptions = [
  {
    value: "3 Wheeler",
    label: "3 Wheeler",
  },
  {
    value: "4 Wheeler",
    label: "4 Wheeler",
  },
];

const subfilterOptions = [
  {
    value: "Customer",
    label: "Customer",
  },
  {
    value: "Influencer",
    label: "Influencer",
  },
  {
    value: "Fitment",
    label: "Fitment",
  },
  {
    value: "Servicing",
    label: "Servicing",
  },
];

const ratingfilterOptions = [
  {
    value: "Hot",
    label: "Hot",
  },
  {
    value: "Cold",
    label: "Cold",
  },
  {
    value: "Warm",
    label: "Warm",
  },
];

export interface ILeadsProps {
  history: IHistory;
  isDealer: boolean;
  leadsData: any;
  dealersData: any;
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
    selectedDealerAssignTo: string;
    selectedCustomerToAssign: string;
    selectedFilterValues: any;
    filterType: string;
    sortType: string;
  }
> {
  public state = {
    topActiveTab: "Customer",
    activeTabType: "Assigned",
    isModalOpen: false,
    showFilerOptions: false,
    selectedFilter: "",
    selectedDealerAssignTo: "",
    selectedCustomerToAssign: "",
    selectedFilterValues: [],
    dealers: data.leads.data,
    filterType: "",
    sortType: "",
  };

  async componentDidMount(){
    loggedInUserDetails = getToken().data;
    this.getAllLeadsData(loggedInUserDetails.token, loggedInUserDetails.sfid, loggedInUserDetails.record_type);
    this.getAllAssignedDealers(loggedInUserDetails);
  }

  getAllLeadsData = async (token, sfid, recordtypeid) => {
    console.log("token: ",token);
    console.log("sfid: ",sfid);
    console.log("recordtypeid: ",recordtypeid);
    let leadsData;
    try {
      if(recordtypeid === "0122w000000cwfSAAQ"){
        leadsData = await getData({
          query: `SELECT *
          FROM salesforce.Lead 
          WHERE RecordTypeId = '0122w000000chRpAAI' AND (Assigned_Dealer__c LIKE '%${sfid}%')`,
          token: token
        })
      }else if(recordtypeid === "0122w000000cwfNAAQ"){
        leadsData = await getData({
          query: `SELECT *
          FROM salesforce.Lead 
          WHERE RecordTypeId = '0122w000000chRpAAI' AND (Assigned_Distributor__c LIKE '%${sfid}%')`,
          token: token
        })
      }
        console.log("leadsData =>", leadsData);
        // return leadsData.result;
        saveLeadsData(leadsData.result)
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  getAllAssignedDealers = async (data) => {
    console.log("data: ",data);
    try {
        const assignedDealerData = await getData({
          query: `SELECT * FROM 
          salesforce.Account WHERE Assigned_Distributor__c = '${data.sfid}'`,
          token: data.token
        })

        console.log("assignedDealerData =>", assignedDealerData);
        saveAssignedDealersData(assignedDealerData.result);
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  getAllCustomersAssignedToDelaer = async (token, sfid) => {
    console.log("token: ",token);
    console.log("sfid: ",sfid)
    try {
        const customerData = await getData({
          query: `SELECT Name, Phone
          FROM salesforce.Contact 
          WHERE Assigned_Dealer__c LIKE '${sfid}%'`,
          token: token
        })

        console.log("customerData =>", customerData);
        return customerData.result;
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }
  
  assignCustomerLeadToDealer = async (data, custSFID, dealerSFID) => {
    console.log("custSFID: ",custSFID);
    console.log("dealerSFID: ",dealerSFID);
    try {
        const updateCustLeadAssigned = await getData({
          query: `UPDATE salesforce.Lead
          SET Assigned_dealer__c = '${dealerSFID}'
          WHERE sfid LIKE '%${custSFID}%'`,
          token: data.token
        })

        console.log("updateCustLeadAssigned =>", updateCustLeadAssigned);
        return updateCustLeadAssigned.result;
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }
  
  public openAssignDealerModal = (custSFID) => {
    console.log(custSFID)
    this.setState({ isModalOpen: true });
    this.setState({ selectedCustomerToAssign: custSFID });
  };

  public renderCustomersAssigned = (leadsData) => {
    return (
      <Grid container>
        {console.log("DEtails: ", this.props.leadsData)}
        {leadsData && leadsData.map((d) => {
          // console.log("DEtails: ", d)
          // if (!d.isDealer && d.assigned) {
            if (d.assigned_dealer__c) {
            return (
              <Grid item xs={12} md={6}>
                <CardDetails details={d} onClickDetails={this.handleCustomerDetails} AssignedDealers={this.props.dealersData} history={this.props.history}/>
              </Grid>
            );
          }
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

  public renderCustomersUnAssigned = (leadsData) => {
    return (
      <Grid container>
        {leadsData && leadsData.map((d) => {
          // if (!d.isDealer && !d.assigned) {
          if (!d.assigned_dealer__c) {
            return (
              <Grid item xs={12} md={6}>
                <CardDetails details={d} onClickDetails={this.handleCustomerDetails} onClickAssign={this.openAssignDealerModal} history={this.props.history}/>
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
        {this.props.dealersData && this.props.dealersData.map((d) => {
            return (
              <Grid item xs={12} md={6}>
                <CardDetails details={d} onClickDetails={this.handleClickDealerDetails} history={this.props.history}/>
              </Grid>
            );
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

  public tabData = (leadsData) => [
    {
      tabName: "Customer",
      component: "",
      onTabSelect: (tabName: any) => { this.setState({ topActiveTab: tabName })},
    },
    {
      tabName: "Dealer",
      component: this.renderDealersAssigned(),
      onTabSelect: (tabName: any) => { this.getAllAssignedDealers(loggedInUserDetails), this.setState({ topActiveTab: tabName })},
    },
  ];

  public tabDataToDisplay = (leadsData) => [
    {
      tabName: "Assigned",
      component:
        this.state.topActiveTab === "Customer"
          ? this.renderCustomersAssigned(leadsData)
          : this.renderDealersAssigned(),
      onTabSelect: (tabName: any) => { this.getAllLeadsData(loggedInUserDetails.token, loggedInUserDetails.sfid, loggedInUserDetails.record_type), this.setState({ activeTabType: tabName })},
    },
    {
      tabName: "Unassigned",
      component:
        this.state.topActiveTab === "Customer"
          ? this.renderCustomersUnAssigned(leadsData)
          : this.renderDealersUnAssigned(),
      onTabSelect: (tabName: any) => { this.getAllLeadsData(loggedInUserDetails.token, loggedInUserDetails.sfid, loggedInUserDetails.record_type), this.setState({ activeTabType: tabName })},
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
          {/* <TextField
            id="outlined-basic"
            label="Search Dealer"
            className="form-input"
            onChange={this.filterDealers}
            variant="outlined"
          /> */}
          <div className="dealer-name-container">
            {this.props.dealersData
              ? this.props.dealersData.map((dealerData) => (
                  <div  
                    onClick={() =>
                      this.setState({
                        selectedDealerAssignTo: dealerData.sfid
                      })
                    }
                    className={`dealer-name ${
                      this.state.selectedDealerAssignTo === dealerData.sfid && "active"
                    }`}
                  >{dealerData.name}</div>
                ))
              : "No Dealer Found"}
          </div>
          <div className="button-container">
            <Button
              onClick={() => this.setState({ isModalOpen: false }) }
              variant="contained"
              color="default"
            >
              Cancel
            </Button>{" "}
            <Button 
              onClick={() => {
                this.assignCustomerLeadToDealer(loggedInUserDetails, this.state.selectedCustomerToAssign, this.state.selectedDealerAssignTo), 
                this.getAllLeadsData(loggedInUserDetails.token, loggedInUserDetails.sfid, loggedInUserDetails.record_type);
                this.setState({ isModalOpen: false }) }}
              variant="contained" 
              color="primary"
            >
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

  tabDataForDealer = (leadsData) => [
    {
      tabName: "All(50)",
      options: allfilterOptions,
      component: (
        <Grid container>
          {leadsData && leadsData.map((d) => {
            return (
              <Grid item xs={12} md={6} >
                <CardDetailsForDealer 
                  onClickDetails={this.handleCustomerDetails}
                  details={d} history={this.props.history}/>
              </Grid>
            );
          })}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFilerOptions: true, filterType: "All" }),
      onChangeTabValue : (tabValue) => {
        const arr = this.state.selectedFilterValues.filter((item) => item.label === "all" ? item.value = tabValue : null)
        if(arr.length === 0 ){
          this.state.selectedFilterValues.push({ label: "all", value: tabValue })
        }
      }
    },
    {
      tabName: "Lead Type",
      options: leadfilterOptions,
      component: (
        <Grid container>
          {leadsData && leadsData.map((d) => {
            const filter = this.state.selectedFilterValues.filter(item => item.label === "leadType")
            if( filter && filter[0] && d.x3_or_4_wheeler__c === filter[0].value){
              return (
                <Grid item xs={12} md={6} >
                  <CardDetailsForDealer 
                    onClickDetails={this.handleCustomerDetails}
                    details={d} history={this.props.history}/>
                </Grid>
              );
            }
          })}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFilerOptions: true, filterType: "Lead Type" }),
      onChangeTabValue : (tabValue) => {
        const arr = this.state.selectedFilterValues.filter((item) => item.label === "leadType" ? item.value = tabValue : null)
        if(arr.length === 0 ){
          this.state.selectedFilterValues.push({ label: "leadType", value: tabValue })
        }
      }
    },
    {
      tabName: "Sub Lead Type",
      options: subfilterOptions,
      component: (
        <Grid container>
          {leadsData && leadsData.map((d) => {
            
            const leadfilter = this.state.selectedFilterValues.filter(item => item.label === "subLeadType")

            if(leadfilter && leadfilter[0] && d.sub_lead_type__c === leadfilter[0].value){
              return (
                <Grid item xs={12} md={6} >
                  <CardDetailsForDealer 
                    onClickDetails={this.handleCustomerDetails}
                    details={d} history={this.props.history}/>
                </Grid>
              );
            }
          })}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFilerOptions: true, filterType: "Sub Lead Type" }),
      onChangeTabValue : (tabValue) => {
        const arr = this.state.selectedFilterValues.filter((item) => item.label === "subLeadType" ? item.value = tabValue : null)
        if(arr.length === 0 ){
          this.state.selectedFilterValues.push({ label: "subLeadType", value: tabValue })
        }
      }
    },
    {
      tabName: "Rating",
      options: ratingfilterOptions,
      component: (
        <Grid container>
          {leadsData && leadsData.map((d) => {
            const leadfilter = this.state.selectedFilterValues.filter(item => item.label === "rating")
            if(leadfilter && leadfilter[0] && d.rating === leadfilter[0].value){
              return (
                <Grid item xs={12} md={6} >
                  <CardDetailsForDealer 
                    onClickDetails={this.handleCustomerDetails}
                    details={d} history={this.props.history}/>
                </Grid>
              );
            }
          })}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ showFilerOptions: true, filterType: "Rating" }),
      onChangeTabValue : (tabValue) => {
        const arr = this.state.selectedFilterValues.filter((item) => item.label === "rating" ? item.value = tabValue : null)
        if(arr.length === 0 ){
          this.state.selectedFilterValues.push({ label: "rating", value: tabValue })
        }
      }
    },
    {
      tabName: "Walk Ins",
      // options: [],
      component: (
        <Grid container>
          {leadsData && leadsData.map((d) => {
            if(d.leadsource === "Store Visits"){
            return (
              <Grid item xs={12} md={6} >
                <CardDetailsForDealer 
                  onClickDetails={this.handleCustomerDetails}
                  details={d} history={this.props.history}/>
              </Grid>
            );
            }
          })}
        </Grid>
      ),
    },
  ];

  handleClickDealerDetails = async (dealer) => {
    console.log("dealer Data ", dealer)
    const customers = await this.getAllCustomersAssignedToDelaer(loggedInUserDetails.token, dealer.sfid);
    console.log("customer Data ", customers)
    saveDealerData({dealer, customers});
    this.props.history.push("/dealers/dealer-details");
  };

  handleCustomerDetails = async (customer) => {
    console.log("customer Data ", customer)
    saveDealerData(customer);
    this.props.history.push("/customer/customer-lead-details");
  };

  public render() {
    var leadsData ;
    console.log("this.state.activeTabType:", this.state.activeTabType) ;
    if(this.state.sortType === "asc"){ 
      leadsData = this.props.leadsData.sort((a,b) => new Date(a.createddate) - new Date(b.createddate))}
    else if(this.props.leadsData === "dsc"){
      leadsData = this.props.leadsData.sort((a,b) => new Date(b.createddate) - new Date(a.createddate) )
    }
    else{
      leadsData = this.props.leadsData
    }
    console.log("this.state.selectedFilterValues ", this.state.selectedFilterValues)
    return (
      <AppBar>
        {this.renderAssignDealerModal()}
        {/* {this.renderFilterModal()} */}
        <div className="leads">
          {isDealer() ? (
            <Tabs tabsData={this.tabDataForDealer(leadsData)} 
              hasSort={true}
              sortValue={(sortVal) => this.setState({sortType: sortVal})}
             />
          ) : (
            <React.Fragment>
              <Tabs tabsData={this.tabData(leadsData)} />
              {/* {this.state.topActiveTab === "Customer" && (
                <Tabs tabsData={this.tabDataToDisplay(leadsData)} />
              )} */}
              {this.state.topActiveTab === "Customer" && 
                <Tabs tabsData={this.tabDataToDisplay(leadsData)} />
              }
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
export function mapStateToProps(state) {
  console.log("state.user.leads: ",state.users.get("assigndealers"))
  return {
    isDealer: false,
    leadsData: state.users.get("leads"),
    dealersData: state.users.get("assigndealers"),
  };
}
export const Leads = withRouter(
  connect<{}, {}, ILeadsProps>(mapStateToProps)(LeadsImpl) as any
);

const CardDetails = (props: any) => {
  const { details, AssignedDealers } = props;

  const assignedDealer = AssignedDealers && AssignedDealers.filter((item) => 
                    item.sfid === details.assigned_dealer__c )
  // console.log("details", assignedDealer[0]);

  const CalRating = () => {
    switch(details.rating){
      case ("Cold"): return 1;
      case ("Warm"): return 3;
      case ("Hot"): return 5;
  }}
  // return (
  //   <div className="cards-main">
  //     {details.map((datavalue: any, index: number) => {
        return (
          <div className="card-container" >
            <Grid container >
              <Grid className="padding-6-corners" item xs={6} md={6} >
                {/* <span className="description-text">Name:</span> */}
                <PersonPin /> <span />
                {details.name}
              </Grid>
              <Grid className="padding-6-corners" item xs={6} md={6}>
                {/* <span className="description-text">Contact:</span> */}
                <Phone /> <span />
                {details.phone && ChangePhoneFormat(details.phone)}
              </Grid>
            </Grid>           
            <Grid container >
              <Grid className="padding-6-corners" item xs={6} md={6} >
                <span className="description-text">Kit Enquiry:</span>
                {details.kit_enquiry__c}
              </Grid>
              <Grid className="padding-6-corners" item xs={6} md={6}>
                <span className="description-text">Vehicle Type:</span>
                {details.x3_or_4_wheeler__c}
              </Grid>
            </Grid>
            {details.assigned_dealer__c || details.recordtypeid === "0122w000000cwfSAAQ"? (
              // <React.Fragment>
                <Grid container>
                  <Grid className="padding-6-corners" item xs={6} md={6}>
                    <span className="description-text">Assigned Dealer :</span>
                    {assignedDealer && assignedDealer[0] && assignedDealer[0].name}
                    {/* {details.assigned_dealer__c} */}
                  </Grid>
                  <Grid className="padding-6-corners" item xs={6} md={6}>
                    <span className="description-text">Lead Rating :</span>
                    {details.rating}
                    {/* <Rating
                      readOnly
                      precision={0.5}
                      value={CalRating()}
                    /> */}
                  </Grid>
                </Grid>
              // </React.Fragment>
            ) : (
              ""
            )}
            <Grid container >
              <Grid className="padding-6-corners" item xs={6} md={6}>
                <span className="description-text">Dealer Generated Lead:</span>
                {details.dealer_generated_lead__c}
              </Grid>
              <Grid className="padding-6-corners" item xs={6} md={6}>
                <span className="view" 
                  onClick={() => {
                    
                    props.onClickDetails(details) 

                  }}>
                  View Details
                </span>
              </Grid>
            </Grid>
            <Grid container >
              <span className="clickable" onClick={() => props.onClickAssign(details.sfid)}>
              {details.recordtypeid === "0122w000000chRpAAI" && !details.assigned_dealer__c ? "Click To Assign Dealer" : ""}
              </span>
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
  const CalRating = () => {
    switch(details.rating){
      case ("Cold"): return 1;
      case ("Warm"): return 3;
      case ("Hot"): return 5;
  }}
  return (
    <div className="card-container">
      <Grid container >
        <Grid item className="padding-6-corners" xs={6} md={6}>
          <PersonPin /> <span />
          {details.name}
        </Grid>
        <Grid item className="padding-6-corners" xs={6} md={6}>
          <Phone /> <span />
          {details.phone && ChangePhoneFormat(details.phone)}
        </Grid>
      </Grid>
      <Grid container >
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text">Kit Enquiery :</span>
          {details.kit_enquiry__c}
        </Grid>
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text"> Vehicle Type</span>
          {details.x3_or_4_wheeler__c}
        </Grid>
      </Grid>
      <Grid container >
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text"> Dealer Generated Lead:</span>
          {details.dealer_generated_lead__c}
        </Grid>
        <Grid item className="padding-6-corners align-center" xs={6} md={6}
          style={{ justifyContent: "flex-start" }}
        >
          <span className="description-text">Lead Rating:</span>
          {details.rating}
          {/* <Rating
            readOnly
            precision={0.5}
            value={CalRating()}
          /> */}
        </Grid>
      </Grid>
      <Grid container >
        <Grid className="padding-6-corners" item xs={4} md={4}> 
          <span
            onClick={() => props.onClickDetails(details)}
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
        //         {details.name}
        //       </Grid>
        //       <Grid className="padding-6-corners" item xs={6} md={6}>
        //         {/* <span className="description-text">Contact:</span> */}
        //         <Phone /> <span style={{ padding: "5px" }} />
        //         {details.phoneNumber}
        //       </Grid>
        //     </Grid>{" "}
        //     <Grid container>
        //       <Grid className="padding-6-corners" item xs={6} md={6} >
        //         <span className="description-text">Kit Enquiry:</span>
        //         {details.kitEnq}
        //       </Grid>
        //       <Grid className="padding-6-corners" item xs={6} md={6} >
        //         <span className="description-text">Vehicle Type:</span>
        //         {details.vehicleType}
        //       </Grid>
        //     </Grid>{" "}
        //     <Grid container>
        //       <Grid className="padding-6-corners" item xs={6} md={6} >
        //         <span className="description-text">Dealer Generated Lead:</span> 
        //         {details.dealer}
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
