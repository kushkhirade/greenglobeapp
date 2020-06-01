import * as React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { Support } from "./pages/support";
import { store } from "./store/Store";
import { BuyOrders } from "./pages/BuyOrders";
import { LoginScreen } from "./pages/account/Login";
import { Inventory } from "./pages/Inventory";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={LoginScreen} />
            <Route path="/home" exact={true} component={HomePage} />
            <Route path="/inventory" exact={true} component={Inventory} />
            <Route path="/leads" exact={true} component={HomePage} />
            <Route path="/customers" exact={true} component={HomePage} />
            <Route path="/transactions" exact={true} component={Support} />
            <Route path="/rto-process" exact={true} component={Support} />
            <Route path="/buy-orders" exact={true} component={BuyOrders} />
            <Route path="/communication" exact={true} component={Support} />
            <Route path="/support" exact={true} component={Support} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
