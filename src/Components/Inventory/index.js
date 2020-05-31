import { Grid, Tab } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { isEmpty, map, values } from "ramda";
import React from "react";
import { List } from "react-admin";
import "./inventory.scss";

export class Inventory extends React.Component {
  state = {
    value: 0,
    currentItem: null,
    openEditModal: false,
  };

  tabs = ["All", "3W ACE", "3W PRO", "4W ACE", "4W PRO"];

  renderModal = () => {
    const { currentItem } = this.state;
    if (!currentItem) return "";
    const dataToDisplay = [
      { label: "Product Name", value: "pName" },
      { label: "SKU", value: "SKU" },
      { label: "Manf. Date", value: "mDate" },
      { label: "Tank ID", value: "tankID" },
      { label: "Tank Capacity", value: "tankCapacity" },
    ];
    return (
      <Modal
        open={this.state.openEditModal}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className="modal inventory-modal"
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
      </Modal>
    );
  };

  handleItemClick = (itemData) => {
    this.setState({
      currentItem: itemData,
      openEditModal: true,
    });
  };

  render() {
    return (
      <div className="inventory-main">
        {this.renderModal()}
        <TabContext value={this.state.value}>
          <TabList onChange={(e, value) => this.setState({ value: value })}>
            {this.tabs.map((tabData, index) => (
              <Tab label={tabData} value={index} />
            ))}
          </TabList>
          <TabPanel value={0}>
            <Grid className="grid-container" container>
              <List
                actions={null}
                className="list-main"
                exporter={false}
                {...this.props}
              >
                <InventoryCards onClickItem={this.handleItemClick} />
              </List>
            </Grid>
          </TabPanel>
        </TabContext>
      </div>
    );
  }
}

const InventoryCards = (props) => {
  return isEmpty(props.data) ? (
    <div>Empty</div>
  ) : (
    map((inData, key) => {
      return (
        <Grid
          key={key}
          onClick={() => props.onClickItem(inData)}
          item
          xs={12}
          className="base-item"
          md={6}
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
            <Grid item xs={12} md={12}>
              <Grid>
                <img
                  className="padding-6"
                  src={inData.imageURL}
                  width="80px"
                  alt="bike"
                />
              </Grid>
              <Grid className="padding-6">{inData.price}</Grid>
            </Grid>
            <div className="padding-6">{inData.addedOn}</div>
          </div>
        </Grid>
      );
    }, values(props.data))
  );
};
