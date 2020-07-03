import { Grid, Button } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { BaseModal } from "src/components/BaseModal";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./inventory.scss";

const productsFilterOptions = [
  {label: "3W ACE(20)", value: "3W ACE"},
  {label: "3W PRO(12)", value: "3W pro"},
  {label: "4W ACE(10)", value: "4W ACE"},
  {label: "4W PRO(50)", value: "4W PRO"},
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

export interface IInventoryProps {}

export class InventoryImpl extends React.PureComponent<
  IInventoryProps,
  { currentItem: any; 
    openEditModal: boolean;
     data: any;
     isFilterOpen: boolean;
     filterType: string;
     selectedFilter: string;
  }
> {
  constructor(props: IInventoryProps) {
    super(props);
    this.state = {
      currentItem: null,
      openEditModal: false,
      data: data.inventory.data,
      isFilterOpen: false,
      filterType: "",
      selectedFilter: "",
    };
  }

  public renderModal = () => {
    const { currentItem } = this.state;
    if (!currentItem) {
      return "";
    }
    const dataToDisplay = [
      { label: "Product Name", value: "pName" },
      { label: "SKU", value: "SKU" },
      { label: "Manf. Date", value: "mDate" },
      { label: "Tank ID", value: "tankID" },
      { label: "Tank Capacity", value: "tankCapacity" },
      { label: "Inventory Aging", value: "iAging"}
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
              <img src={currentItem.imageURL} height="200px" alt="dta" />
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
                    {currentItem[data.value]}
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
            {this.state.filterType === "Tank Capacity" ?
              tankFilterOptions.map((fData, index) => (
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

  tabData = [
    {
      tabName: "All(92)",
      component: (
        <div className="inventory-container">
          {data.inventory.data.map((inData) => {
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
    },
    {
      tabName: "Product Type",
      onTabSelect: (tabname) => this.setState({ isFilterOpen: true, filterType: "Product Type"}),
    },
    {
      tabName: "Tank Capacity",
      onTabSelect: (tabName) => this.setState({ isFilterOpen: true, filterType: "Tank Capacity" }),
    },
  ];

  public render() {
    return (
      <AppBar>
        {this.renderModal()}
        {this.renderFilterModel()}
        <Tabs hasSort={true} tabsData={this.tabData}  />
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
export function mapStateToProps() {
  return {};
}
export const Inventory = connect<{}, {}, IInventoryProps>(mapStateToProps)(
  InventoryImpl
);

const InventoryCards = (props: any) => {
  const inData =  props.data;
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
                src={inData.imageURL}
                width="80px"
                alt="bike"
                className="inv-image"
              />
            </div>
            <div className="text-left">
              <div className="padding-6">
                {" "}
                <span className="description-text">Model - </span> {inData.model}
              </div>
              {/* <div className="padding-6">
                <span className="description-text">Price - </span>
                {inData.price}
              </div>{" "} */}
              <div className="padding-6">
                <span className="description-text">
                  {" "}
                  Added to Inventory on -{" "}
                </span>
                {inData.addedOn}
              </div>
            </div>
          </div>
        </div>
      </Grid>
    );
  // });
};
