import * as React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { LoginScreen } from "./pages/account/Login";
import { BuyOrders } from "./pages/BuyOrders";
import { Customers } from "./pages/Customers";
import { HomePage } from "./pages/Home";
import { Inventory } from "./pages/Inventory";
import { Leads } from "./pages/Leads";
import { AddNewLead } from "./pages/Leads/AddLead";
import { Profile } from "./pages/Profile";
import { Support } from "./pages/support";
import { store } from "./store/Store";
import { AddNewCustomer } from "./pages/Customers/AddNewCustomer";
import { RTOProcess } from "./pages/RTOProcess";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={LoginScreen} />
            <Route path="/home" exact={true} component={HomePage} />
            <Route path="/inventory" exact={true} component={Inventory} />
            <Route path="/leads" exact={true} component={Leads} />
            <Route
              path="/leads/add-new-lead"
              exact={true}
              component={AddNewLead}
            />
            <Route path="/customers" exact={true} component={Customers} />
            <Route
              path="/customer/add-new-customer"
              exact={true}
              component={AddNewCustomer}
            />
            <Route path="/transactions" exact={true} component={Support} />
            <Route path="/rto-process" exact={true} component={RTOProcess} />
            <Route path="/buy-orders" exact={true} component={BuyOrders} />
            <Route path="/communication" exact={true} component={Support} />
            <Route path="/support" exact={true} component={Support} />
            <Route path="/profile" exact={true} component={Profile} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
