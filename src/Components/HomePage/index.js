import React from "react";
import { Datagrid, List, TextField } from "react-admin";
export const HomePage = (props) => {
  return (
    <div>
      <h3>Annual Sales Target</h3>
      <List title="Annual Sales Target" {...props}>
        <Datagrid>
          <TextField source="product" />
          <TextField source="target" />
          <TextField source="achieved" />
          <TextField source="target_left" />
        </Datagrid>
      </List>
      <h3>Monthly Sales Target</h3>
      <List title="Monthly Sales Target" {...props}>
        <Datagrid>
          <TextField source="product" />
          <TextField source="target" />
          <TextField source="achieved" />
          <TextField source="target_left" />
        </Datagrid>
      </List>
    </div>
  );
};
