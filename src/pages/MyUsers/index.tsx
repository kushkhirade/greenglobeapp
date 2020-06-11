import * as React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import AppBar from "src/navigation/App.Bar";
import { Edit } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { BaseModal } from "src/components/BaseModal";
import { SubFormHeading } from "src/components/SubFormHeading";
import { FormComponent } from "src/components/FormComponent";
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
  { openEditModal: boolean; data: any }
> {
  constructor(props: IMyUsersProps) {
    super(props);
    this.state = { openEditModal: false, data: null };
  }

  renderModal = () => {
    return (
      <BaseModal
        className="leads-modal"
        contentClassName="leads-content"
        onClose={() => this.setState({ openEditModal: false })}
        open={this.state.openEditModal}
      >
        <Grid container spacing={1} className="">
          <SubFormHeading>
            Edit User {this.state.data && this.state.data.name}
          </SubFormHeading>
          <Grid item className="modal-margin" xs={12} md={12}>
            <FormComponent
              onCancel={() => this.setState({ openEditModal: false })}
              options={userFormOptions}
              hasSubmit={true}
              formModel="editUserForm"
            />
          </Grid>
        </Grid>
      </BaseModal>
    );
  };

  render() {
    return (
      <AppBar>
        <Grid container>
          {this.renderModal()}
          {users.map((us) => (
            <UserCard
              handleEditModelOprn={(data) =>
                this.setState({ data, openEditModal: true })
              }
              {...us}
            />
          ))}
        </Grid>
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const MyUsers = connect<{}, {}, IMyUsersProps>(mapStateToProps)(
  MyUsersImpl
);

const UserCard = (props) => {
  return (
    <Grid item xs={12} md={6} sm={6}>
      <div className="card-container">
        <Grid container className="padding-6 align-center">
          <Grid xs={12} md={6} sm={6}>
            <span className="description-text">Name:</span>
            {props.name}
          </Grid>
          <Grid xs={12} md={6} sm={6}>
            <span className="description-text">Email:</span>
            {props.email}
          </Grid>
        </Grid>
        <Grid container className="padding-6 align-center">
          <Grid xs={12} md={4} sm={4}>
            <span className="description-text">Mobile Number:</span>
            {props.mobileNumber}
          </Grid>
          <Grid xs={12} md={4} sm={4}>
            <span className="description-text">Role:</span>
            {props.role}
          </Grid>
          <Grid xs={12} md={4} sm={4}>
            <span className="description-text">Options:</span>
            <Edit onClick={() => props.handleEditModelOprn(props)} />{" "}
            <span style={{ padding: "10px" }} />
            <DeleteIcon /> <span style={{ padding: "10px" }} />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
