import * as React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
const LoginScreen = React.lazy(() =>
  import("./pages/account/Login").then(({ LoginScreen }) => ({
    default: LoginScreen,
  }))
);
const BuyOrders = React.lazy(() =>
  import("./pages/BuyOrders").then(({ BuyOrders }) => ({ default: BuyOrders }))
);
const Communications = React.lazy(() =>
  import("./pages/Communicatios").then(({ Communications }) => ({
    default: Communications,
  }))
);
const Customers = React.lazy(() =>
  import("./pages/Customers").then(({ Customers }) => ({ default: Customers }))
);
const AddNewCustomer = React.lazy(() =>
  import("./pages/Customers/AddNewCustomer").then(({ AddNewCustomer }) => ({
    default: AddNewCustomer,
  }))
);
const HomePage = React.lazy(() =>
  import("./pages/Home").then(({ HomePage }) => ({ default: HomePage }))
);
const Inventory = React.lazy(() =>
  import("./pages/Inventory").then(({ Inventory }) => ({ default: Inventory }))
);
const Leads = React.lazy(() =>
  import("./pages/Leads").then(({ Leads }) => ({ default: Leads }))
);
const AddNewLead = React.lazy(() =>
  import("./pages/Leads/AddLead").then(({ AddNewLead }) => ({
    default: AddNewLead,
  }))
);
const Profile = React.lazy(() =>
  import("./pages/Profile").then(({ Profile }) => ({ default: Profile }))
);
const RTOProcess = React.lazy(() =>
  import("./pages/RTOProcess").then(({ RTOProcess }) => ({
    default: RTOProcess,
  }))
);
const Support = React.lazy(() =>
  import("./pages/support").then(({ Support }) => ({ default: Support }))
);
// import { LoginScreen } from "./pages/account/Login";
// import { BuyOrders } from "./pages/BuyOrders";
// import { Communications } from "./pages/Communicatios";
// import { Customers } from "./pages/Customers";
// import { AddNewCustomer } from "./pages/Customers/AddNewCustomer";
// import { HomePage } from "./pages/Home";
// import { Inventory } from "./pages/Inventory";
// import { Leads } from "./pages/Leads";
// import { AddNewLead } from "./pages/Leads/AddLead";
// import { Profile } from "./pages/Profile";
// import { RTOProcess } from "./pages/RTOProcess";
// import { Support } from "./pages/support";
import { store } from "./store/Store";
import "./main.scss";
import { MyUsers } from "./pages/MyUsers";
import { AssignedDealers } from "./pages/AssignedDealers";
import { DealerDetails } from "./pages/AssignedDealers/DealerDetails";

const Loader = () => (
  <div className="loader-main">
    <div className="hourglass"></div>
  </div>
);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Suspense fallback={<Loader />}>
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
              <Route
                path="/assign-dealers"
                exact={true}
                component={AssignedDealers}
              />
              <Route
                path="/dealers/dealer-details"
                exact={true}
                component={DealerDetails}
              />
              <Route path="/rto-process" exact={true} component={RTOProcess} />
              <Route path="/buy-orders" exact={true} component={BuyOrders} />
              <Route
                path="/communication"
                exact={true}
                component={Communications}
              />
              <Route path="/support" exact={true} component={Support} />
              <Route path="/profile" exact={true} component={Profile} />
              <Route path="/my-users" exact={true} component={MyUsers} />
            </Switch>
          </React.Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
