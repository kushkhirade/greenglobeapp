import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./inventory.scss";
import { BaseModal } from "src/components/BaseModal";
import { Grid } from "@material-ui/core";
import { Tabs } from "src/components/Tabs";
export interface IInventoryProps {}

export class InventoryImpl extends React.PureComponent<
  IInventoryProps,
  { currentItem: any; openEditModal: boolean }
> {
  constructor(props: IInventoryProps) {
    super(props);
    this.state = { currentItem: null, openEditModal: false };
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
    ];
    return (
      <BaseModal
        open={this.state.openEditModal}
        className="support-modal"
        contentClassName="support-content"
        onClose={() => this.setState({ openEditModal: false })}
      >
        <Grid container spacing={1} className="modal-content">
          <Grid item className="modal-margin" xs={12} md={12}>
            <div>
              <img src={currentItem.imageURL} height="100px" alt="dta" />
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

  tabData = [
    {
      tabName: "All(50)",
    },
    {
      tabName: "3W ACE",
    },
    {
      tabName: "3W PRO(12)",
    },
    {
      tabName: "4W ACE(10)",
    },
    {
      tabName: "4W PRO(50)",
    },
  ];

  public render() {
    return (
      <AppBar>
        {this.renderModal()}
        <Tabs tabsData={this.tabData} />
        <div className="inventory-container">
          <Grid container>
            <InventoryCards
              onClickItem={this.handleItemClick}
              data={data.inventory.data}
            />
          </Grid>
        </div>
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
  return props.data.map((inData: any, key: string) => {
    return (
      <Grid item xs={12} md={4} lg={4}>
        <div
          onClick={() => props.onClickItem(inData)}
          key={key}
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
            <div>
              <div className="padding-6">
                {" "}
                <span className="description-text">Model: </span> {inData.model}
              </div>
              <div className="padding-6">
                <span className="description-text">Price - </span>
                {inData.price}
              </div>{" "}
              <div className="padding-6">
                <span className="description-text">
                  {" "}
                  Added to Inventory on{" "}
                </span>
                {inData.addedOn}
              </div>
            </div>
          </div>
        </div>
      </Grid>
    );
  });
};
