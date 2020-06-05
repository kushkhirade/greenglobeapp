import { Grid, Theme, withStyles } from "@material-ui/core";
import * as React from "react";
import AppBar from "src/navigation/App.Bar";
import { TableWithGrid } from "../components/TableWithGrid";
import data from "../data";

interface IPageState {
  usersTablePage?: number;
  usersTableRowsPerPage: number;
}

class HomePageImpl extends React.Component<{ classes: any }, {}> {
  public state: IPageState = {
    usersTablePage: 0,
    usersTableRowsPerPage: 5,
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
    };

    return (
      <AppBar>
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
          <Grid item={true} lg={3} xs={12} sm={12}>
            Expected Turnover / Revenue - 984532120{" "}
            <TableWithGrid
              title={"Leads Status"}
              data={this.leadData}
              columns={this.leadStatus}
              options={options as any}
            />
          </Grid>
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
