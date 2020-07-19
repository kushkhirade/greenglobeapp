import { Grid, Button } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { BaseModal } from "src/components/BaseModal";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import getData from "src/utils/getData";
import data from "../../data";
import { getToken, isDealer } from "src/state/Utility";
import "./inventory.scss";

const productsFilterOptions = [
  {label: "3W ACE", value: "3 Wheeler Ace"},
  {label: "3W Pro", value: "3 Wheeler Pro"},
  {label: "4W Ace", value: "4 Wheeler Ace"},
  {label: "4W Pro", value: "4 Wheeler Pro"},
];

const tankFilterOptions = [
  {label: "30", value: "30"},
  {label: "35", value: "35"},
  {label: "60", value: "60"},
  {label: "65", value: "65"},
  {label: "70", value: "70"},
  {label: "75", value: "75"},
  {label: "90", value: "90"},
]

export interface IInventoryProps {location?: any;}

export class InventoryImpl extends React.PureComponent<
  IInventoryProps,
  { currentItem: any; 
    openEditModal: boolean;
     data: any;
     isFilterOpen: boolean;
     filterType: string;
     selectedProductFilter: string;
     selectedTankFilter: string;
     sortType: string;
  }
> {
  constructor(props: IInventoryProps) {
    super(props);
    this.state = {
      currentItem: null,
      openEditModal: false,
      data: [],
      isFilterOpen: false,
      filterType: "",
      selectedProductFilter: "",
      selectedTankFilter: "",
      sortType: "",
    };
  };

  async componentDidMount(){
    console.log("this.props ", this.props.location.data)

    const {data} = getToken();
    const sfid = this.props.location.data && this.props.location.data.sfid ? this.props.location.data.sfid : data.sfid;
    const recordtypeid = this.props.location.data && this.props.location.data.recordtypeid ? this.props.location.data.recordtypeid : data.record_type;
    const res = await this.getAllInventoryData(data.token,  sfid, recordtypeid );
    console.log("result ", res)
    this.setState({data : res});
  }

  getAllInventoryData = async (token, sfid, recordtypeid) => {
    // console.log("token: ",token);
    // console.log("sfid: ",sfid);
    // console.log("recordtypeid: ",recordtypeid);
    let inventoryData;
    try {
      if(recordtypeid === "0122w000000cwfSAAQ"){
        inventoryData = await getData({
          query: `SELECT CreatedDate, Date_Purchased__c, Description, Family, Id, image_url__c, 
          Manufacture_date__c, Name, ProductCode, Sold_To_Customer__c, Sold_To_Dealer__c, 
          Sold_To_Distributor__c, StockKeepingUnit, Tank_Capacity__c, Tank_Id__c
          FROM salesforce.product2 WHERE sold_to_dealer__c = '${sfid}'`,
          token: token
        })
      }else if(recordtypeid === "0122w000000cwfNAAQ"){
        inventoryData = await getData({
          query: `SELECT CreatedDate, Date_Purchased__c, Description, Family, Id, image_url__c, 
            Manufacture_date__c, Name, ProductCode, Sold_To_Customer__c, Sold_To_Dealer__c, 
            Sold_To_Distributor__c, StockKeepingUnit, Tank_Capacity__c, Tank_Id__c
            FROM salesforce.product2 WHERE sold_to_distributor__c ='${sfid}'`,
          token: token
        })
      }
        console.log("inventoryData =>", inventoryData);
        return inventoryData.result;
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  public renderModal = () => {
    const { currentItem, data } = this.state;
    if (!currentItem) {
      return ;
    }
    const dataToDisplay = [
      { label: "Product Name", value: currentItem.family },
      { label: "SKU", value: currentItem.stockkeepingunit },
      { label: "Manf. Date", value: currentItem.manufacture_date__c },
      { label: "Tank ID", value: currentItem.tank_id__c },
      { label: "Tank Capacity", value: currentItem.tank_capacity__c },
    ];
    return (
      <BaseModal
        open={this.state.openEditModal}
        className="inventory-modal"
        contentClassName="inventory-modal"
        onClose={() => this.setState({ openEditModal: false })}
      >
        <Grid container spacing={1} className="">
          <Grid item className="modal-margin" xs={12} md={12}>
            <div>
              <img src={currentItem.image_url__c} height="200px" alt="dta" />
              <div className="description-text">Product Images</div>
            </div>
            <div className="text-left">
              <div className="head">
                <b> Product Details</b>
                <hr />
              </div>
              {dataToDisplay.map((data) => (
                <Grid container className="padding-6">
                  <Grid item md={6} xs={6} className="grid-label">
                    <span className="description-text">{data.label}</span>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    {data.value}
                  </Grid>
                </Grid>
              ))}
            </div>
          </Grid>
        </Grid>
      </BaseModal>
    );
  };

  public handleItemClick = (itemData: any) => {
    this.setState({
      currentItem: itemData,
      openEditModal: true,
    });
  };

  public renderFilterModel = () => {
    return(
      <BaseModal
        className="assign-dealer-modal"
        contentClassName="support-content"
        onClose={() => this.setState({ isFilterOpen: false })}
        open={this.state.isFilterOpen}
      >
         <div className="head-title">Filters</div>
        <form className="form-content" autoComplete="off">
          <div className="dealer-name-container">
            {this.state.filterType === "Product Type" ?
              productsFilterOptions.map((fData, index) => (
                <div
                  key={index}
                  onClick={() =>
                    this.setState({
                      selectedProductFilter: fData.label,
                    })
                  }
                  className={`dealer-name ${
                    this.state.selectedProductFilter === fData.label && "active"
                  }`}
                >
                  {fData.label}
                </div>
              ))
            : null }
            {this.state.filterType === "Tank Capacity" ?
              tankFilterOptions.map((fData, index) => (
                <div
                  key={index}
                  onClick={() =>
                    this.setState({
                      selectedTankFilter: fData.label,
                    })
                  }
                  className={`dealer-name ${
                    this.state.selectedTankFilter === fData.label && "active"
                  }`}
                >
                  {fData.label}
                </div>
              ))
            : null }
          </div>

          <div className="button-container">
            <Button
              onClick={() => this.setState({ isFilterOpen: false })}
              variant="contained"
              color="default"
            >
              Cancel
            </Button>{" "}
            <Button
              onClick={() => this.setState({ isFilterOpen: false })}
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
          </div>
        </form>
      </BaseModal>
    )
  }

  public render() {
    console.log(this.state.sortType)
    var invdata ;
    if(this.state.sortType === "asc"){ 
      invdata = this.state.data.sort((a,b) => new Date(a.date_purchased__c) - new Date(b.date_purchased__c))}
    else if(this.state.sortType === "dsc"){
      invdata = this.state.data.sort((a,b) => new Date(b.date_purchased__c) - new Date(a.date_purchased__c) )
    }
    else{
      invdata = this.state.data
    }
    console.log("this.state.selectedTankFilter: ", this.state.selectedTankFilter)
    console.log("this.state.selectedProductFilter: ", this.state.selectedProductFilter)
    return (
      <AppBar>
        {this.renderModal()}
        {/* {this.renderFilterModel()} */}
        <Tabs 
          hasSort={true} 
          sortValue={(sortVal) => this.setState({sortType: sortVal})}
          tabsData={ [
            { tabName: "All("+ invdata.length +")",
              // options: [],
              component: (
                <div className="inventory-container">
                  { invdata.map((inData) => {
                    {console.log("ALL")}
                    return(              
                      // <Grid item xs={12} md={6}>
                        <InventoryCards
                          onClickItem={this.handleItemClick}
                          data={inData}
                        />
                    // </Grid>
                    )
                  })
                }
                </div>
              ),
              onTabSelect: (tabname) => this.setState({ selectedProductFilter: "", selectedTankFilter: ""}),
            },
            { tabName: "Product",
              options: productsFilterOptions,
              component: (
                <div className="inventory-container">
                  
                  { invdata.map((inData) => {
                    if(this.state.selectedTankFilter!==""){
                      if(inData.family === this.state.selectedProductFilter && inData.tank_capacity__c === this.state.selectedTankFilter){
                        // {console.log("product + tank")}
                        return(              
                          <InventoryCards
                            onClickItem={this.handleItemClick}
                            data={inData}
                          />
                        )
                      }
                    }
                    else {if(inData.family === this.state.selectedProductFilter){
                      // {console.log("product")}
                      return(              
                        <InventoryCards
                          onClickItem={this.handleItemClick}
                          data={inData}
                        />
                      )
                    }}
                  })
                }
                </div>
              ),
              onTabSelect: (tabname) => this.setState({ isFilterOpen: true, filterType: "Product Type"}),
              onChangeTabValue : (tabValue) => this.setState({ selectedProductFilter: tabValue }),
            },
            { tabName: "Tank",
              options: tankFilterOptions,
              component: (
                <div className="inventory-container">
                  { invdata.map((inData) => {
                    if(this.state.selectedProductFilter !== "" ){
                      if(inData.tank_capacity__c === this.state.selectedTankFilter && inData.family === this.state.selectedProductFilter){
                        // {console.log("Tank + Product")}
                        return(              
                          <InventoryCards
                            onClickItem={this.handleItemClick}
                            data={inData}
                          />
                        )
                      }
                    }
                    else {if(inData.tank_capacity__c === this.state.selectedTankFilter){
                      // {console.log("tank")}
                      return(              
                        <InventoryCards
                          onClickItem={this.handleItemClick}
                          data={inData}
                        />
                      )
                    }}
                  })
                }
                </div>
              ),
              onTabSelect: (tabName) => this.setState({ isFilterOpen: true, filterType: "Tank Capacity" }),
              onChangeTabValue : (tabValue) => this.setState({ selectedTankFilter: tabValue }),
            },
          ]}  
        />
        {/* <div className="inventory-container">
          <Grid container>
            <InventoryCards
              onClickItem={this.handleItemClick}
              data={this.state.data}
            />
          </Grid>
        </div> */}
      </AppBar>
    );
  }
}
export function mapStateToProps(state) {
  return {};
}
export const Inventory = connect<{}, {}, IInventoryProps>(mapStateToProps)(
  InventoryImpl
);

const InventoryCards = (props: any) => {
  const inData =  props.data;
  var date1 = new Date();
  var date2 = new Date(inData.date_purchased__c);
  var diffinMonths = date1.getMonth() - date2.getMonth();
  var diffinDays = (date1.getDate() - date2.getDate()) + (30 * diffinMonths);

  // return props.data.map((inData: any, key: string) => {
    return (
      <Grid item xs={12} md={4} lg={4}>
        <div
          onClick={() => props.onClickItem(inData)}
          // key={key}
          className="card-container"
        >
          <div className="inventory-card">
            {" "}
            <div>
              <img
                src={inData.image_url__c}
                width="80px"
                alt="bike"
                className="inv-image"
              />
            </div>
            <div className="text-left">
              <div className="padding-6">
                {" "}
                <span className="description-text">Model - </span> {inData.name}
              </div>
              {/* <div className="padding-6">
                <span className="description-text">Price - </span>
                {inData.price}
              </div>{" "} */}
              <div className="padding-6">
                <span className="description-text">Inventory Aging - </span>
                {diffinDays < 0 ? -diffinDays : diffinDays} days
              </div>
              <div className="padding-6">
                <span className="description-text">
                  {" "}
                  Added to Inventory on -{" "}
                </span>
                {inData.date_purchased__c}
              </div>
              {isDealer() ?
                inData.sold_to_customer__c ? 
                  <div className="padding-6">
                    <span className="description-text">Sold to Customer -</span>
                    {inData.sold_to_customer__c}
                  </div>
                : null
              :
                inData.sold_to_dealer__c ?
                  <div className="padding-6">
                    <span className="description-text">Sold to Dealer -</span>
                    {inData.sold_to_dealer__c}
                  </div>
                : null
              }
            </div>
          </div>
        </div>
      </Grid>
    );
  // });
};
