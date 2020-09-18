import { Theme, withStyles, Grid, IconButton } from "@material-ui/core";
import WarningIcon from '@material-ui/icons/Warning';
import { Assessment } from "@material-ui/icons";
import * as React from "react";
import { BaseModal } from "src/components/BaseModal";
import AppBar from "src/navigation/App.Bar";
import { TableWithGrid } from "../../components/TableWithGrid";
import data from "../../data";
import { isDealer } from "src/state/Utility";
import { SubFormHeading } from "src/components/SubFormHeading";
import {
  PieChart, Pie, Label, Cell,
  BarChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Bar,
} from "recharts";
import custLeadIcon from "./starLeadIcon.png";
import { getToken } from "src/state/Utility";
import getData from "src/utils/getData";
import { toNumber } from "lodash";
import { saveDealerData } from "src/actions/App.Actions";

interface IPageState {
  usersTablePage?: number;
  usersTableRowsPerPage: number;
  showStatsModal: boolean;
  todaysTasks: any;
  monthlyTotal: number;
  annualTotal: number;
  monthlyTarget: number;
  annualTarget: number;
  customerData: any;
  storeData: any;
  leadStatus: any;
  leadDealerData: any;
}

class HomePageImpl extends React.Component<{ classes: any }, {}> {
  public state: IPageState = {
    usersTablePage: 0,
    usersTableRowsPerPage: 5,
    // showStatsModal: true,
    showStatsModal: this.props.location.showStatsModal ? this.props.location.showStatsModal : false ,
    todaysTasks: [],
    monthlyTotal: 100,
    annualTotal: 100,
    monthlyTarget: 100,
    annualTarget: 100,
    customerData: [],
    storeData: [],
    leadStatus: [],
    leadDealerData: [],
  };

  async componentDidMount(){
    const data = getToken().data;
    await this.getTodaysTasks(data);
    await this.getMonthlyandAnnualTotal(data);
    await this.getMonthlyTarget(data);
    await this.getAnnualTarget(data);
    await this.getCustomerLeads(data);
    if(isDealer()){
      await this.getleadStatus(data);
    }else{
      await this.getStoreStatus(data);
      await this.getDealerLead(data);
    }
  }

  getTodaysTasks = async(data) => {
    try{
      const todaysTasks = await getData({
        query: `SELECT leadid,recordtypeid,salesforce.lead.firstname,salesforce.lead.middlename,salesforce.lead.lastname
        FROM salesforce.leadhistory  Full OUTER JOIN salesforce.lead ON salesforce.lead.sfid = salesforce.leadhistory.leadid
        WHERE (oldvalue is null or oldvalue !='${data.sfid}') and (newvalue like '${data.sfid}' )
        and salesforce.leadhistory.createddate >= NOW() - '24 hour'::INTERVAL`,
        token: data.token
      })
      console.log("todaysTasks : ", todaysTasks );
      this.setState({ todaysTasks : todaysTasks.result });

    }catch(e){
      console.log("Error: ", e)
    }
  };

  getMonthlyandAnnualTotal = async(data) => {
    try{
      const TotalSales = await getData({
        query: `select Annual_sales__c, Monthly_Sales__c from salesforce.account where sfid like '${data.sfid}'`,
        token: data.token
      })
      console.log("TotalSales : ", TotalSales.result[0] );
      this.setState({ 
        annualTotal: toNumber(TotalSales.result[0].annual_sales__c), 
        monthlyTotal: toNumber(TotalSales.result[0].monthly_sales__c)
      });
    
    }catch(e){
      console.log("Error: ", e)
    }
  }

  getAnnualTarget = async(data) => {
    try{
      if(data.record_type === "0122w000000cwfSAAQ"){
        const annualSale1 = await getData({
          query: `SELECT sum(quantity) FROM salesforce.order  Full OUTER JOIN salesforce.orderitem ON  salesforce.order.sfid = salesforce.orderitem.orderid
          WHERE salesforce.order.sold_to_dealer__c LIKE '${data.sfid}'
          and salesforce.order.createddate >= NOW() - '12 month'::INTERVAL`,
          token: data.token
        })
        const annualSale2 = await getData({
          query: `SELECT sum(quantity__c) FROM salesforce.Lead  Full OUTER JOIN salesforce.customer_order__c ON  salesforce.lead.sfid = salesforce.customer_order__c.Lead_Name__c 
          where salesforce.lead.recordtypeid='0122w000000chRpAAI' and salesforce.lead.assigned_dealer__c like '${data.sfid}'  
          and  salesforce.lead.createddate >= NOW() - '12 month'::INTERVAL`,
          token: data.token
        })
        console.log("annualSale1 : ", annualSale1.result[0] );
        console.log("annualSale2 : ", annualSale2.result[0] );
        const sum1 = toNumber(annualSale1.result[0].sum ?? 0);
        const sum2 = toNumber(annualSale2.result[0].sum ?? 0);
        this.setState({ annualTarget: (sum1 + sum2) });
      }
      else if(data.record_type ===  "0122w000000cwfNAAQ"){
        const annualSales = await getData({
          query: `SELECT sum(quantity) FROM salesforce.order  Full OUTER JOIN salesforce.orderitem ON  salesforce.order.sfid = salesforce.orderitem.orderid 
          WHERE salesforce.order.accountid LIKE '${data.sfid}' and recordtypeid = '0122w000000UJe1AAG' and
          salesforce.order.createddate >= NOW() - '12 month'::INTERVAL`,
          token: data.token
        })
        console.log("annualSales => ", annualSales.result);
        this.setState({ annualTarget: toNumber(annualSales.result[0].sum) });
      }

    }catch(e){
      console.log("Error: ", e)
    }
  };

  getMonthlyTarget = async(data) => {
    try{
      if(data.record_type === "0122w000000cwfSAAQ"){
        const monthlySale1 = await getData({
          query: `SELECT sum(quantity) FROM salesforce.order  Full OUTER JOIN salesforce.orderitem ON  salesforce.order.sfid = salesforce.orderitem.orderid
          WHERE salesforce.order.sold_to_dealer__c LIKE '${data.sfid}'
          and salesforce.order.createddate >= NOW() - '1 month'::INTERVAL`,
          token: data.token
        })
        const monthlySale2 = await getData({
          query: `SELECT sum(quantity__c) FROM salesforce.Lead  Full OUTER JOIN salesforce.customer_order__c ON  salesforce.lead.sfid = salesforce.customer_order__c.Lead_Name__c 
          where salesforce.lead.recordtypeid='0122w000000chRpAAI' and salesforce.lead.assigned_dealer__c like '${data.sfid}'  
          and  salesforce.lead.createddate >= NOW() - '1 month'::INTERVAL`,
          token: data.token
        })
        console.log("monthlySale1 : ", monthlySale1.result[0] );
        console.log("monthlySale2 : ", monthlySale2.result[0] );
        const sum1 = toNumber(monthlySale1.result[0].sum ?? 0);
        const sum2 = toNumber(monthlySale2.result[0].sum ?? 0);
        this.setState({ monthlyTarget: (sum1 + sum2) });
      }
      else if(data.record_type ===  "0122w000000cwfNAAQ"){
        const monthlySales = await getData({
          query: `SELECT sum(quantity) FROM salesforce.order  Full OUTER JOIN salesforce.orderitem ON  salesforce.order.sfid = salesforce.orderitem.orderid 
          WHERE salesforce.order.accountid LIKE '${data.sfid}' and recordtypeid = '0122w000000UJe1AAG' and
          salesforce.order.createddate >= NOW() - '1 month'::INTERVAL`,
          token: data.token
        })
        console.log("monthlySales => ", monthlySales.result);
        this.setState({ monthlyTarget: toNumber(monthlySales.result[0].sum) });
      }
    
    }catch(e){
      console.log("Error: ", e)
    }
  };

  getCustomerLeads = async(data) => {
    try{
      const customerData = await getData({
        query: `select date_part('dow', createddate), To_Char("createddate", 'DAY') from salesforce.lead
        where assigned_dealer__c like '%0011s00000HEdJy%' and recordtypeid='0122w000000chRpAAI'`,
        token: data.token
      })
      console.log("customerData : ", customerData );
      this.setState({ customerData : customerData.result });

    }catch(e){
      console.log("Error: ", e)
    }
  };

  getStoreStatus = async(data) => {
    try{
      let storeData;
      if(data.record_type === "0122w000000cwfSAAQ"){
        storeData = await getData({
          query: `SELECT Name, Status__c FROM salesforce.store__c WHERE dealer__c like '${data.sfid}'`,
          token: data.token
        })
        console.log("storeData : ", storeData );
        this.setState({ storeData : storeData.result });  
      }else if(data.record_type === "0122w000000cwfNAAQ"){
        storeData = await getData({
          query: `SELECT Name, Status__c FROM salesforce.store__c WHERE distributor__c like '${data.sfid}'`,
          token: data.token
        })
        console.log("storeData : ", storeData );
        this.setState({ storeData : storeData.result });  
      }
     
    }catch(e){
      console.log("Error: ", e)
    }
  };

  getleadStatus = async(data) => {
    try{
      const leadStatus = await getData({
        query: `select Name, Status from salesforce.lead where assigned_dealer__c like '${data.sfid}' and recordtypeid='0122w000000chRpAAI'`,
        token: data.token
      })
      console.log("leadStatus : ", leadStatus );
      this.setState({ leadStatus : leadStatus.result });

    }catch(e){
      console.log("Error: ", e)
    }
  };

  getDealerLead = async(data) => {
    try{
      const leadDealerData = await getData({
        query: `select Name, Status, assigned_distributor__c from salesforce.lead 
        where (assigned_distributor__c like '${data.sfid}' or assigned_distributor__c is NULL) 
        and recordtypeid = '0122w000000chRuAAI'`,
        token: data.token
      })
      console.log("leadDealerData : ", leadDealerData );
      this.setState({ leadDealerData : leadDealerData.result });

    }catch(e){
      console.log("Error: ", e)
    }
  };

  leadColumns = [
    { label: "Stages", name: "stages", options: { filter: true, sort: false }, },
    { label: "Count", name: "count", options: { filter: true, sort: false }, },
  ];
  leadStatus = (state) => [
    { stages: "New", 
      count: (state.leadStatus && state.leadStatus[0] && state.leadStatus.filter( a => a.status === "New").length ) ?? 0
    },
    { stages: "Negotiating", 
      count: (state.leadStatus && state.leadStatus[0] && state.leadStatus.filter( a => a.status === "Negotiation").length ) ?? 0
    },
    { stages: "Converted", 
      count: (state.leadStatus && state.leadStatus[0] && state.leadStatus.filter( a => a.status === "Closed").length ) ?? 0
    },
  ];
  leadDealerData = (state) => [
    { stages: "New", 
      count: (state.leadDealerData && state.leadDealerData[0] && state.leadDealerData.filter( a => a.assigned_distributor__c && a.status === "New").length ) ?? 0
    },
    { stages: "Assigned",   
      count: (state.leadDealerData && state.leadDealerData[0] && state.leadDealerData.filter( a => a.assigned_distributor__c).length ) ?? 0
    },
    { stages: "Unassigned", 
      count: (state.leadDealerData && state.leadDealerData[0] && state.leadDealerData.filter( a => !a.assigned_distributor__c).length ) ?? 0
    },
  ];

  storeColumns = [
    { label: "Stores", name: "stores", options: { filter: true, sort: false, }, },
    { label: "Count", name: "count", options: { filter: true, sort: false, }, },
  ];
  storeData = (state) => [
    { stores: "Operational", 
      count: (state.storeData && state.storeData[0] && state.storeData.filter( a => a.status__c === "Operational").length ) ?? 0,
    },
    { stores: "Pending Stores", 
      count: (state.storeData && state.storeData[0] && state.storeData.filter( a => a.status__c === "Pending").length ) ?? 0,
    },
  ];

  // leadCustomerData = [
  //   { stages: "New", count: 50, },
  //   { stages: "Unassigned", count: 100, },
  // ];

  customerData = (state) => [
    { name: "Mon", 
      custLeads: (state.customerData && this.state.customerData[0] && state.customerData.reduce((s, a) => 
        Number(a.to_char === "MONDAY   " ? a.date_part : 0) + s, 0 )) ?? 0, 
      pv: 1398, 
    },
    { 
      name: "Tue", 
      custLeads: (state.customerData && this.state.customerData[0] && state.customerData.reduce((s, a) => 
        Number(a.to_char === "TUESDAY  " ? a.date_part : 0) + s, 0 )) ?? 0, 
      pv: 2400, 
    },
    { 
      name: "Wed", 
      custLeads: (state.customerData && this.state.customerData[0] && state.customerData.reduce((s, a) => 
        Number(a.to_char === "WEDNESDAY" ? a.date_part : 0) + s, 0 )) ?? 0, 
      pv: 1398, 
    },
    { 
      name: "Thus", 
      custLeads: (state.customerData && this.state.customerData[0] && state.customerData.reduce((s, a) => 
        Number(a.to_char === "THURSDAY " ? a.date_part : 0) + s, 0 )) ?? 0, 
      pv: 2400, 
    },
    { 
      name: "Fri", 
      custLeads: (state.customerData && this.state.customerData[0] && state.customerData.reduce((s, a) => 
        Number(a.to_char === "FRIDAY   " ? a.date_part : 0) + s, 0 )) ?? 0, 
      pv: 1398, 
    },
    { 
      name: "Sat", 
      custLeads: (state.customerData && this.state.customerData[0] && state.customerData.reduce((s, a) => 
        Number(a.to_char === "SATDAY   " ? a.date_part : 0) + s, 0 )) ?? 0, 
      pv: 2400, 
    },
    { 
      name: "Sun", 
      custLeads: (state.customerData && this.state.customerData[0] && state.customerData.reduce((s, a) => 
        Number(a.to_char === "SUNDAY   " ? a.date_part : 0) + s, 0 )) ?? 0, 
      pv: 2400, 
    },
  ];
  
  PieCOLORS = ['#a2a2a2', '#48A89C'];
  BarCOLORS = ['#0088FE', '#00C49F', '#FFBB28', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  pieData = (state) => [
    { "name": "Total", "value": state.monthlyTotal },
    { "name": "Monthly","value": state.monthlyTarget },
  ];

  pieData2 = (state) => [
    { "name": "Total", "value": state.annualTotal },
    { "name": "Annual","value": state.annualTarget },
  ];

  CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
          <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
              <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
          </div>
        );
    }
    return null;
  };

  public render(): JSX.Element {
    const { classes } = this.props;
    const columns = [
      {
        name: "product",
        label: "Product",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "target",
        label: "Target",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "achieved",
        label: "Achieved",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "target_left",
        label: "Target Left",
        options: {
          filter: true,
          sort: false,
        },
      },
    ];
    const options = {
      filterType: "checkbox",
      responsive: "scrollMaxHeight",
    };
    console.log("props ",this.props)
    console.log("state ",this.state)

    return (
      <AppBar
        sideButton={
          <div style={{ marginRight: "20px" }}>
            <Assessment
              onClick={() => this.setState({ showStatsModal: true })}
            />
          </div>
        }
      >
        <BaseModal
          className="assign-dealer-modal"
          onClose={() => this.setState({ showStatsModal: false })}
          contentClassName="support-content"
          open={this.state.showStatsModal}
        >
          <div style={{ height: "300px" }}>
            Today's Tasks / Pending Tasks
            {/* <div style={{ padding: "30px" }}>No Task Added Today</div> */}
                <SubFormHeading>
                  {` ${(this.state.todaysTasks && this.state.todaysTasks[0] && this.state.todaysTasks.filter( a => a.recordtypeid === '0122w000000chRpAAI' ).length) ?? 0} 
                  New Customer Leads Assigned`} <div style={{fontSize: '12px'}}> {new Date().toDateString()} </div> 
                </SubFormHeading>
              
                {!isDealer() &&
                <SubFormHeading>  
                  {` ${(this.state.todaysTasks && this.state.todaysTasks[0] && this.state.todaysTasks.filter( a => a.recordtypeid === '0122w000000chRuAAI' ).length) ?? 0} 
                  New Dealer Leads Assigned`} <div style={{fontSize: '12px'}}> {new Date().toDateString()} </div> 
                </SubFormHeading>
                }
          </div>
        </BaseModal>

        <Grid >
          <div className="card-container">
            <SubFormHeading>Sales Target</SubFormHeading>
              <Grid container>
                <Grid item xs={6} md={6} >
                  <div style={{marginTop: "-25px", marginBottom: "-15px"}}>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart >
                        <Tooltip />
                        <Pie
                          data={this.pieData(this.state)}
                          nameKey="name"
                          dataKey="value"
                          innerRadius="60%"
                          outerRadius="90%" 
                          startAngle={-270}
                          endAngle={90}
                          fill="#8884d8"
                          >
                          <Label value={this.state.monthlyTarget} position="centerBottom" fontSize='22px' fontWeight="bold" style={{transform: "translateY(-10px)"}}/>
                          <Label value={`of ${this.state.monthlyTotal}`} position="centerTop" fontWeight="bold"/>
                          {/* { this.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={this.PieCOLORS[index % this.PieCOLORS.length]} />) } */}
                          <Cell key={`cell-0`} fill={'#a2a2a2'} />
                          <Cell key={`cell-1`} fill={'#48A89C'} />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{fontSize: "13px", fontWeight: "bold", textAlign: "center"}} >Monthly Sales Target</div>
                </Grid>
                <Grid item xs={6} md={6}>
                  <div style={{marginTop: "-25px", marginBottom: "-15px"}}>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart >
                        <Tooltip />
                        <Pie
                          data={this.pieData2(this.state)}
                          nameKey="name"
                          dataKey="value"
                          innerRadius="60%"
                          outerRadius="90%" 
                          startAngle={-270}
                          endAngle={90}
                          fill="#8884d8"
                          >
                          <Label value={this.state.annualTarget} position="centerBottom" fontSize='22px' colorInterpolation="red" fontWeight="bold" style={{transform: "translateY(-10px)"}}/>
                          <Label value={`of ${this.state.annualTotal}`} position="centerTop"  fontWeight="bold"/>
                          {/* { this.pieData2.map((entry, index) => <Cell key={`cell-${index}`} fill={this.PieCOLORS[index % this.PieCOLORS.length]} />) } */}
                          <Cell key={`cell-0`} fill={'#a2a2a2'} />
                          <Cell key={`cell-1`} fill={'#48A89C'} />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{fontSize: "13px", fontWeight: "bold", textAlign: "center"}} >Annual Sales Target</div>
                </Grid>
              </Grid>
          </div>
          <div className="card-container">
            <SubFormHeading>Customer Leads</SubFormHeading>
              <div style={{marginLeft: "-30px"}}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart width={5000} height={200} data={this.customerData(this.state)}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis tick={{ fontFamily: 'Arial',margin: '5px'}} dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="custLeads"  barSize ={150} label={{ position: 'top' }}>
                    {
                      this.customerData(this.state).map((entry, index) => <Cell key={`cell-${index}`} fill={this.BarCOLORS[index % this.BarCOLORS.length]} />)
                    }
                  </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
          </div>
          {/* <div className="card-container" >
            <SubFormHeading>Dealer Leads</SubFormHeading>
              <TableWithGrid
                title={""}
                data={this.leadDealerData}
                columns={this.leadStatus}
                options={options as any}
              />
          </div> */}
          <div className={classes.root + " home"}>
            {!isDealer() && (
              <TableWithGrid
                title={"Store Status"}
                data={this.storeData(this.state)}
                columns={this.storeColumns}
                options={options as any}
              />
            )}
            {isDealer() && (
              <TableWithGrid
                title={"Lead Status"}
                data={this.leadStatus(this.state)}
                columns={this.leadColumns}
                options={options as any}
              />
            )}
            {!isDealer() && (
              <TableWithGrid
                title={"Dealer Lead"}
                data={this.leadDealerData(this.state)}
                columns={this.leadColumns}
                options={options as any}
              />
            )}
          </div>
        </Grid>
          {/* <TableWithGrid
            title={"Monthly Sales Target"}
            data={data.sales.data}
            columns={columns}
            options={options as any}
          />
          {!isDealer() && (
            <TableWithGrid
              title={"Store Status"}
              data={this.storeData}
              columns={this.storeColumns}
              options={options as any}
            />
          )}
          {isDealer() && (
            <TableWithGrid
              title={"Lead Status"}
              data={this.leadStatus}
              columns={this.leadColumns}
              options={options as any}
            />
          )}
          {!isDealer() && (
            <TableWithGrid
              title={"Lead Customer"}
              data={this.leadCustomerData}
              columns={this.leadColumns}
              options={options as any}
            />
          )}
          {!isDealer() && (
            <TableWithGrid
              title={"Lead Dealer"}
              data={this.leadDealerData}
              columns={this.leadColumns}
              options={options as any}
            />
          )}
          <TableWithGrid
            title={"Annual Sales Target"}
            data={data.sales.data}
            columns={columns}
            options={options as any}
          /> */}
      </AppBar>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 24,
  },
  paper: {
    padding: theme.spacing.length * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  headerTiles: {
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: `5px solid ${theme.palette.secondary.main}`,
  },
  headerTileIcon: {
    fontSize: 40,
    color: theme.palette.primary.main,
    paddingRight: 5,
  },
  tileText: {
    fontSize: 20,
    color: theme.palette.grey["400"],
  },
  sectionTitle: {
    paddingLeft: theme.spacing.length * 2,
  },
  users: {
    marginBottom: 24,
    overflowX: "scroll",
  },
  chart: {
    width: "100%",
  },
});

export const HomePage = withStyles(styles as any)(HomePageImpl as any) as any;
