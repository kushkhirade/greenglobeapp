import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import { Edit, Add } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { BaseModal } from "src/components/BaseModal";
import { SubFormHeading } from "src/components/SubFormHeading";
import { FormComponent } from "src/components/FormComponent";
import getData from "src/utils/getData";
import data from "src/data";
import { getToken, changeValuesInStore } from "src/state/Utility";
import { store } from "src/store/Store"
import { actions } from "react-redux-form";
import { Button, Fab, TextField, Grid } from "@material-ui/core";


const users = [
  {
    name: "Dinesh KK",
    email: "asdssd@asdsd.com",
    mobileNumber: "8999988989",
    role: "Role & Sales",
  },
  {
    name: "Dinesh KK",
    email: "asdssd@asdsd.com",
    mobileNumber: "8999988989",
    role: "Role & Sales",
  },
  {
    name: "Dinesh KK",
    email: "asdssd@asdsd.com",
    mobileNumber: "8999988989",
    role: "Role & Sales",
  },
  {
    name: "Dinesh KK",
    email: "asdssd@asdsd.com",
    mobileNumber: "8999988989",
    role: "Role & Sales",
  },
];

const userFormOptions = [
  {
    label: "First Name",
    type: "text",
    model: ".firstName",
  },
  {
    label: "Email",
    type: "text",
    model: ".email",
  },
  {
    label: "WhatsApp Number",
    type: "text",
    model: ".whatsappNumber",
  },
  {
    label: "Role",
    type: "select",
    model: ".role",
    options: [],
  },
];

export interface IMyUsersProps {}

export class MyUsersImpl extends React.PureComponent<
  IMyUsersProps,
  { openEditModal: boolean; data: any, myUsers: any; }
> {
  constructor(props: IMyUsersProps) {
    super(props);
    this.state = { openEditModal: false, data: null, myUsers: [] };
  }

  async componentDidMount(){
    const { data } = getToken();
    const res = await this.getAllUsers(data);
    console.log(res);
    this.setState({ myUsers: res });
  }
  getAllUsers = async (data) => {
    try{
      const getUsers = await getData({
        query: `SELECT Name ,Phone, Whatsapp_number__c,Email ,Role__c ,username__c,Password__c 
        FROM salesforce.Contact 
        WHERE contact.accountid LIKE '%${data.sfid}%' and RecordtypeId ='0120l000000ot11AAA'  `,
        token: data.token
      })
      console.log("getUsers => ", getUsers);
      return getUsers.result;
    }
    catch(e){
      console.log(e);
    }
  }

  renderModal = () => {
    console.log("this.props: ", this.props);
    const handleChange = (event, key) => {
      changeValuesInStore(`editUserForm.${key}`, event.target.value);
    };

    return (
      <BaseModal
        className="leads-modal"
        contentClassName="leads-content"
        onClose={() => this.setState({ openEditModal: false })}
        open={this.state.openEditModal}
      >
        <Grid container spacing={1} className="">
          <SubFormHeading>
            Add User/Edit User {this.state.data && this.state.data.name}
          </SubFormHeading>
          {/* <Grid item className="modal-margin" xs={12} md={12}>
            <FormComponent
              onCancel={() => this.setState({ openEditModal: false })}
              options={userFormOptions}
              onSubmit={(v)=> {
                this.setState({ openEditModal: false }),
                console.log("Values: ", store.getState().rxFormReducer["editUserForm"])
              }}
              hasSubmit={true}
              formModel="editUserForm"
            />
          </Grid> */}
          <TextField
            id="outlined-basic"
            label="First Name"
            className="form-input"
            onChange={(e) => handleChange(e, "firstName")}
            variant="outlined"
          />
          <TextField
            className="form-input"
            id="outlined-basic"
            label="E-Mail"
            variant="outlined"
            onChange={(e) => handleChange(e, "email")}

          />
          <TextField
            className="form-input"
            id="outlined-basic"
            label="WhatsApp Number"
            variant="outlined"
            onChange={(e) => handleChange(e, "whatsappnumber")}

          />
          <TextField
            className="form-input"
            id="outlined-basic"
            label="Role"
            variant="outlined"
            onChange={(e) => handleChange(e, "role")}

          />
            <FormComponent
              onCancel={() => this.setState({ openEditModal: false })}
              options={[]}
              onSubmit={(v)=> {
                this.setState({ openEditModal: false }),
                console.log("Values: ", store.getState().rxFormReducer["editUserForm"])
              }}
              hasSubmit={true}
              formModel="editUserForm"
            />
        </Grid>
      </BaseModal>
    );
  };

  render() {
    return (
      <AppBar>
        <Grid container>
          {this.renderModal()}
          {this.state.myUsers.map((us) => (
            <UserCard
              handleEditModelOprn={(data) =>
                this.setState({ data, openEditModal: true })
              }
              details={us}
            />
          ))}
          <span
            style={{ position: "absolute", right: 20, bottom: 20 }}
            onClick={() => this.setState({ openEditModal: true })}
          >
            <Fab color="secondary" aria-labelledby="add-ticket">
              <Add />
            </Fab>
          </span>
        </Grid>
      </AppBar>
    );
  }
}

export function mapStateToProps() {
  return {
    values: store.getState().rxFormReducer["editUserForm"]
  };
}
export function mapDispatchToprops(){
  return{
    setDispatch : (values) => actions.merge("editUserForm", values)
  }
}
export const MyUsers = connect<{}, {}, IMyUsersProps>(mapStateToProps)(
  MyUsersImpl
);

const changePhoneFormat = (phone) =>{
  const p = phone.split(")");
  const p1 = p[0].substr(p.length - 1);
  const p2 = p[1];
  
  return `+91 ${p1}${p2}` ;
}

const UserCard = (props) => {
  const details = props.details;

  return (
    <Grid item xs={12} md={6} sm={6}>
      <div className="card-container">
        <Grid container className="">
          <Grid xs={12} className="padding-6-corners" md={6} sm={6}>
            <span className="description-text">Name:</span>
            {details.name}
          </Grid>
          <Grid xs={12} className="padding-6-corners" md={6} sm={6}>
            <span className="description-text">Email:</span>
            {details.email}
          </Grid>
          <Grid xs={12} className="padding-6-corners" md={6} sm={6}>
            <span className="description-text">Mobile Number:</span>
            {details.phone && changePhoneFormat(details.phone)}
          </Grid>
          <Grid xs={12} className="padding-6-corners" md={6} sm={6}>
            <span className="description-text">Role:</span>
            {details.role__c}
          </Grid>
          <Grid
            xs={12}
            className="padding-6-corners"
            md={12}
            sm={12}
            style={{ textAlign: "right" }}
          >
            <Edit onClick={() => props.handleEditModelOprn(props)} />{" "}
            <span style={{ padding: "10px" }} />
            <DeleteIcon /> <span style={{ padding: "10px" }} />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
