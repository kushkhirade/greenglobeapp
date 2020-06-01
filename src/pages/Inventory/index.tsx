import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./inventory.scss";
import { BaseModal } from "src/components/BaseModal";
import { Grid } from "@material-ui/core";
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
              <div>Product Images</div>
            </div>
            <div className="text-left">
              <div className="head">
                <b> Product Details</b>
                <hr />
              </div>
              {dataToDisplay.map((data) => (
                <Grid container className="padding-6">
                  <Grid item md={6} xs={6} className="grid-label">
                    {data.label}
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
  public render() {
    return (
      <AppBar>
          {this.renderModal()}
        <div className="inventory-container">
          <InventoryCards
            onClickItem={this.handleItemClick}
            data={data.inventory.data}
          />
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
      <div
        onClick={() => props.onClickItem(inData)}
        key={key}
        className="card-container"
      >
        <div className="inventory-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="padding-6">{inData.model}</div>
            <img
              height="16px"
              src="https://img.icons8.com/material/24/000000/menu-2--v1.png"
              alt="menu"
            />
          </div>
          <div className="content">
            <div>
              <img
                className="padding-6"
                src={inData.imageURL}
                width="80px"
                alt="bike"
              />
            </div>
            <div className="padding-6">{inData.price}</div>
          </div>
          <div className="padding-6">{inData.addedOn}</div>
        </div>
      </div>
    );
  });
};
