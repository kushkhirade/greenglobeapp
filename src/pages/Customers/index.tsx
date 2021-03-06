import { Fab, Grid, Button, List } from "@material-ui/core";
import { Add, PersonPin, Phone } from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import WhatsappIcon from "./wtsapimg.png";
import Rating from "@material-ui/lab/Rating";
import * as React from "react";
import { connect } from "react-redux";
import { BaseModal } from "src/components/BaseModal";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./customers.scss";
import { withRouter } from "react-router-dom";
import filter from "./filter.svg";
import Search from "@material-ui/icons/Search";
import { IHistory } from "src/state/Utility";
import getData from "src/utils/getData";
import { getToken, getAllRecordTypeIds, isDealer } from "./../../state/Utility";
import { saveDealerData } from "src/actions/App.Actions";
import { ChangePhoneFormat } from "src/components/Format";
// import { url } from "inspector";

let loggedInUserDetails, recordTypes;

const leadfilterOptions = (custData) => [
  { value: "3 Wheeler", label: "3 Wheeler ( "+ custData.filter( lead =>  lead.x3_or_4_wheeler__c === "3 Wheeler" ).length +" )" },
  { value: "4 Wheeler", label: "4 Wheeler ( "+ custData.filter( lead =>  lead.x3_or_4_wheeler__c === "4 Wheeler" ).length +" )" },
];

const subfilterOptions = (custData) => [
  { value: "Customer", label: "Customer ( "+ custData.filter( lead =>  lead.sub_lead_type__c === "Customer" ).length +" )" },
  { value: "Influencer", label: "Influencer ( "+ custData.filter( lead =>  lead.sub_lead_type__c === "Influencer" ).length +" )" },
  { value: "Fitment", label: "Fitment ( "+ custData.filter( lead =>  lead.sub_lead_type__c === "Fitment" ).length +" )" },
  { value: "Servicing", label: "Servicing ( "+ custData.filter( lead =>  lead.sub_lead_type__c === "Servicing" ).length +" )" },
];

const ratingfilterOptions = (custData) => [
  { value: "Hot", label: "Hot ( "+ custData.filter( lead =>  lead.lead_rating__c === "Hot" ).length +" )" },
  { value: "Cold", label: "Cold ( "+ custData.filter( lead =>  lead.lead_rating__c === "Cold" ).length +" )" },
  { value: "Warm", label: "Warm ( "+ custData.filter( lead =>  lead.lead_rating__c === "Warm" ).length +" )" },
];

const sortingData = (custData) =>  [
  {placeholder: "sort by Name", options: [{label: "Name Asc", value: "byNameAsc"},{label: "Name Desc", value: "byNameDesc"}]},
  // {placeholder: "sort by city", options: [{label: "City Asc", value: "byCityAsc"},{label: "City Desc", value: "byCityDesc"}]},
  {placeholder: "sort by Date", options: [{label: "Date Asc", value: "byDateAsc"},{label: "Date Desc", value: "byDateDesc"}]},
  {placeholder: "3 or 4 Wheeler", options: [
    {label: "3 Wheeler ( "+ custData.filter( lead =>  lead.x3_or_4_wheeler__c === "3 Wheeler" ).length +" )", value: "3Wheeler"},
    {label: "4 Wheeler ( "+ custData.filter( lead =>  lead.x3_or_4_wheeler__c === "4 Wheeler" ).length +" )", value: "4Wheeler"}]},
]
export interface ICustomersProps {
  history: IHistory;
  location: any
}

export class CustomersImpl extends React.PureComponent<ICustomersProps, { showFilerOptions, filterType, selectedFilter, selectedFilterValues, sortType, customers: any}> {
  constructor(props: ICustomersProps) {
    super(props);
    this.state = {
      showFilerOptions: false,
      filterType: "",
      selectedFilter: "",
      selectedFilterValues: [],
      sortType: "",
      customers : []
    }
  }

  async componentDidMount(){
    loggedInUserDetails = getToken().data;
    recordTypes = getAllRecordTypeIds().recordTypeIds;
    console.log("recordTypes: ", recordTypes);  
    const customerData = await this.getAllCustomers(loggedInUserDetails);
    this.setState({ customers : customerData });
  }

  getFilteredCustomers = async (data, name) => {
    console.log("data: ", data, "name: ", name)
    const {location} = this.props;
    let sfid = data.sfid;
    let recordtypeid = data.record_type;
    if(location && location.data && Object.keys(location.data).length){
      data.sfid = location.data.sfid;
      recordtypeid = location.data.recordtypeid;
    }
    try{
      let customerData;
      if(recordtypeid === recordTypes.dealerAccount){
        customerData = await getData({
          query: `SELECT name, whatsapp_number__c, email, purchased_product__c, lead_rating__c, recordtypeid, sfid, createddate, x3_or_4_wheeler__c
          FROM salesforce.Contact 
          WHERE Assigned_Dealer__c LIKE '%${data.sfid}%' AND Recordtypeid = '${recordTypes.customer}' 
          AND SFID is not null AND (name ilike '%${name}%' or whatsapp_number__c ilike '%${name}%')`,
          token: data.token
        })
      }
      else if(recordtypeid === recordTypes.distributorAccount){
        customerData = await getData({
          query: `SELECT name, whatsapp_number__c, email, purchased_product__c, lead_rating__c, recordtypeid, sfid, createddate, x3_or_4_wheeler__c  
          FROM salesforce.Contact 
          WHERE contact.accountid LIKE '%${data.sfid}%' AND Recordtypeid = '${recordTypes.customer}' 
          AND SFID is not null AND (name like '%${name}%' or whatsapp_number__c ilike '%${name}%')`,
          token: data.token
        });
      }
      console.log("customerData =>", customerData.result)
      this.setState({ customers : customerData.result })
    }
    catch(e){
      console.log(e);
    }
  }

  getAllCustomers = async (data) => {
    const {location} = this.props;
    let sfid = data.sfid;
    let recordtypeid = data.record_type;
    if(location && location.data && Object.keys(location.data).length){
      data.sfid = location.data.sfid;
      recordtypeid = location.data.recordtypeid;
    }
    try{
      let customerData;
      if(recordtypeid === recordTypes.dealerAccount){
        customerData = await getData({
          query: `SELECT name, mailingcity, whatsapp_number__c, email, purchased_product__c, lead_rating__c, recordtypeid, sfid, createddate, x3_or_4_wheeler__c  
          FROM salesforce.Contact 
          WHERE Assigned_Dealer__c LIKE '%${data.sfid}%' AND Recordtypeid = '${recordTypes.customer}' AND SFID is not null`,
          token: data.token
        })
      }
      else if(recordtypeid === recordTypes.distributorAccount){
        customerData = await getData({
          query: `SELECT name, mailingcity, whatsapp_number__c, email, purchased_product__c, lead_rating__c, recordtypeid, sfid, createddate, x3_or_4_wheeler__c
          FROM salesforce.Contact 
          WHERE contact.accountid LIKE '%${data.sfid}%' AND Recordtypeid = '${recordTypes.customer}' AND SFID is not null`,
          token: data.token
        });
      }

      console.log("customerData =>", customerData.result)
      return customerData.result;
    }
    catch(e){
      console.log(e);
    }
  }

  handleCustomerDetails = async (customer) => {
    console.log("customer Data ", customer)
    saveDealerData(customer);
    this.props.history.push(`/customer/customer-lead-details/${customer.recordtypeid}/${customer.sfid}`);
  };

  tabDataForDealer = (custData) => [
    {
      tabName: "All ( "+ ( custData.length ) +" )",
      options: [],
      component: (
        <Grid container>
          {custData && custData.map((d) => {
            return (
              <Grid item xs={12} md={6} >
                <CustomerList
                onClickDetails={this.handleCustomerDetails}
                customerData={d}
              />
              </Grid>
            );
          })}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ filterType: tabName }),
    },
    {
      tabName: "Rating",
      options: ratingfilterOptions(custData),
      component: (
        <Grid container>
          {custData && custData.map((d) => {
            const filterRating = this.state.selectedFilterValues.find(item => item.label === "rating")
              if (filterRating && filterRating.value === d.lead_rating__c){
                return (
                  <Grid item xs={12} md={6} >
                    <CustomerList
                      onClickDetails={this.handleCustomerDetails}
                      customerData={d} />
                  </Grid>
                );
              }
          })}
        </Grid>
      ),
      onTabSelect: (tabName) => this.setState({ filterType: tabName }),
      onChangeTabValue: (tabValue) => {
        const arr = this.state.selectedFilterValues.filter((item) => item.label === "rating")

        if (arr.length === 0) {
          console.log("arr => ", arr)
          console.log("this.state.selectedFilterValues => ", this.state.selectedFilterValues)
          this.state.selectedFilterValues.push({ label: "rating", value: tabValue })
        }else{
          console.log("arr => ", arr)
          arr[0].value = tabValue;
          this.setState({ selectedFilterValues : arr })
          console.log("this.state.selectedFilterValues => ", this.state.selectedFilterValues)
        }
      }
    },
  ];

  alphabeticalOrderAsc = (arr, arrField) => {
    // return arr.sort();
    return arr.sort((a, b) => {
      if (a[arrField] > b[arrField]) return 1;
      if (a[arrField] < b[arrField]) return -1;
      return 0;
    })
  }

  alphabeticalOrderDesc = (arr, arrField) => {
    // return arr.sort();
    return arr.sort((a, b) => {
      if (b[arrField] > a[arrField]) return 1;
      if (b[arrField] < a[arrField]) return -1;
      return 0;
    })
  }

  public render() {
    var custData ;
    const { sortType, customers } = this.state;
    if (sortType === "byNameAsc") {
      custData = this.alphabeticalOrderAsc(customers, "name")
    }
    else if (sortType === "byNameDesc") {
      custData = this.alphabeticalOrderDesc(customers, "name")
    }
    // else if (sortType === "byCityAsc") {
    //   custData = this.alphabeticalOrderAsc(customers, "mailingcity")
    // }
    // else if (sortType === "byCityDesc") {
    //   custData = this.alphabeticalOrderDesc(customers, "mailingcity")
    // }
    else if (sortType === "byDateAsc"){
      custData = customers.sort((a, b) => new Date(a.createddate) - new Date(b.createddate))
    }
    else if (sortType === "byDateDesc"){
      custData = customers.sort((a, b) => new Date(b.createddate) - new Date(a.createddate))
    }
    else if (sortType === "3Wheeler"){
      custData = customers.filter(cust => cust.x3_or_4_wheeler__c === "3 Wheeler")
    }
    else if (sortType === "4Wheeler"){
      custData = customers.filter(cust => cust.x3_or_4_wheeler__c === "4 Wheeler")
    }
    else {
      custData = customers
    }

    console.log("custData => ", custData)
    console.log("sortType => ", sortType)
    console.log("this.state.selectedFilterValues => ", this.state.selectedFilterValues)

    return (
      <AppBar>
        <div>
          { custData && 
          <Tabs 
            tabsData={null}
            SortingDatacomponent={ (
              <Grid container>
                {custData && custData.map((d) => {
                  return (
                    <Grid item xs={12} md={6} >
                      <CustomerList
                      onClickDetails={this.handleCustomerDetails}
                      customerData={d}
                    />
                    </Grid>
                  );
                })}
              </Grid>
            )}
            // hasSort={true} sortValue={(sortVal) => this.setState({ sortType: sortVal })}
            // sortOptions={[{label: "by Name", value: "byName"},{label: "by City", value: "byCity"}, {label: "by Date", value: "byDate"}]}
            sortingData={sortingData(customers)}
            sortValue={(sortVal) => this.setState({ sortType: sortVal })}
            hasInputText={true} 
            onInputChange={async(e) => await this.getFilteredCustomers(loggedInUserDetails, e.target.value)}
          />  }
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: 'fixed'
          }}
        >
          <InputBase
            id="input-with-icon-adornment"
            endAdornment={
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            }
            type="text" 
            className="search-input"
            style={{ padding: 2, width: '95%', backgroundColor: "white"}}
            placeholder="Search by Name or Mobile Number"
            onChange={async (e) => await this.getFilteredCustomers(loggedInUserDetails, e.target.value)}
          /> 
          <Search fontSize="large" color="primary" 
            onClick={() => {
              this.setState({ isSearch: true })
            }}  
          />
          <Button component="label" onClick={() => this.setState({ isFilter: true})}>
            <img height="26px" src={filter} />
          </Button>
        </div>
        
        <div className="cards-main customer-card">          
          <Grid container>
            {custData && custData.map(cust => {
            return (
              <Grid item xs={12} md={6}>
                <CustomerList
                  onClickDetails={this.handleCustomerDetails}
                  customerData={cust}
                />
              </Grid>
            )}
            )}
          </Grid>
        </div> */}
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const Customers = withRouter(
  connect<{}, {}, ICustomersProps>(mapStateToProps)(CustomersImpl as any) as any
);

const CustomerList = (props: any) => {
  const { customerData } = props;
  return (
    // <div className="cards-main">
    // {props.customerData.map((customerData: any, index: any) => {
    // return (
      <div className="card-container" >
        <Grid container >
          <Grid
            item
            className="padding-6-corners"
            xs={6}
            md={6}
          >
            <PersonPin /> <span style={{ padding: "5px" }} />
            <div style={{marginTop: '-25px', marginLeft: '25px'}}>
              {customerData.name}
            </div>
          </Grid>
          <Grid
            className="padding-6-corners"
            item
            xs={6}
            md={6}
          >
            <Phone /> <span style={{ padding: "5px" }} />
            <div style={{marginTop: '-25px', marginLeft: '25px'}}>
              {customerData.whatsapp_number__c && ChangePhoneFormat(customerData.whatsapp_number__c)}
            </div>
          </Grid>
        </Grid>
        <Grid container >
          {/* <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Email:</span>
            {customerData.email || 'NA'}
          </Grid> */}
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Purchased Product:</span>
            {customerData.purchased_product__c}
          </Grid>
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Dealer Rating:</span>
            {customerData.lead_rating__c}
          </Grid>
        </Grid>
        <Grid container >
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text">Dealer Code:</span>
            {customerData.dealer_code__c}
            {/* <Rating
              readOnly
              precision={0.5}
              value={customerData.dealerRating}
              /> */}
          </Grid>
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> 3 or 4 Wheeler:</span>
            {customerData.x3_or_4_wheeler__c}
          </Grid>
        </Grid>
        <Grid container >
          <Grid className="padding-6-corners" item xs={4} md={4}> 
          <span onClick={() => props.onClickDetails(customerData)} className="view">
            View Details
          </span>
          </Grid>
          <Grid className="padding-6-corners" item xs={8} md={8}>
            <div className="icon-container" style={{marginTop: '-8px'}}>
            <a href={"tel:" + customerData.whatsapp_number__c}>
              <PhoneIcon className="phone-icon" />
            </a>
            &nbsp;
            <a href={`sms:${customerData.whatsapp_number__c}?body=Text to Send.`}>
              <ChatIcon className="chat-icon" />
            </a>
            &nbsp;
            <a href={`mailto:${customerData.email}?subject=The subject of the mail&body=The Body of the mail`}>
              <MailIcon className="mail-icon" />
            </a>
            &nbsp;
            <a href={`https://api.whatsapp.com/send?phone=91${customerData.whatsapp_number__c}&text=example Leads`}>
              <img
                height="42px"
                src={WhatsappIcon}
              // src="https://img.icons8.com/color/48/000000/whatsapp.png"
              />{" "}
            </a>
            </div>
          </Grid>
        </Grid>
      </div>
  //    );
  // })} 
  // </div>
  )
};
