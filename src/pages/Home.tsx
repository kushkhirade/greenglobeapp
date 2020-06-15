import { Theme, withStyles } from "@material-ui/core";
import { Assessment } from "@material-ui/icons";
import * as React from "react";
import { BaseModal } from "src/components/BaseModal";
import AppBar from "src/navigation/App.Bar";
import { TableWithGrid } from "../components/TableWithGrid";
import data from "../data";
import { isDealer } from "src/state/Utility";
interface IPageState {
  usersTablePage?: number;
  usersTableRowsPerPage: number;
  showStatsModal: boolean;
}

class HomePageImpl extends React.Component<{ classes: any }, {}> {
  public state: IPageState = {
    usersTablePage: 0,
    usersTableRowsPerPage: 5,
    showStatsModal: false,
  };

  leadStatus = [
    {
      label: "Stores",
      name: "stores",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Count",
      name: "count",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  leadData = [
    {
      stores: "New",
      count: 50,
    },
    {
      stores: "Negotiating",
      count: 100,
    },
    {
      stores: "Converted",
      count: 100,
    },
  ];

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
          <div style={{ width: "200px", height: "300px" }}>
            TODAYS Follow up and pending task
          </div>
        </BaseModal>
        <div className={classes.root}>
          <TableWithGrid
            title={"Annual Sales Target"}
            data={data.sales.data}
            columns={columns}
            options={options as any}
          />
          <TableWithGrid
            title={"Monthly Sales Target"}
            data={data.sales.data}
            columns={columns}
            options={options as any}
          />
          <TableWithGrid
            title={"Lead Status"}
            data={this.leadData}
            columns={this.leadStatus}
            options={options as any}
          />
          {!isDealer() && (
            <TableWithGrid
              title={"Store Status"}
              data={this.leadData}
              columns={this.leadStatus}
              options={options as any}
            />
          )}
        </div>
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
