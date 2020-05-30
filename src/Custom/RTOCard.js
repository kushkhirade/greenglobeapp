import { Grid } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React from "react";
const RTOCard = ({
  source,
  record = {},
  isGenerate = false,
  onGenerateClick = null,
  onEditClick,
}) => {
  return (
    <Grid item md={3} sm={4}>
      <div style={{ border: "2px solid #ccc", textAlign: "left" }}>
        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            {record[source].title}
          </Grid>
          <Grid item xs={6} md={6}>
            <Edit onClick={() => onEditClick(record)} />
          </Grid>
          <Grid item xs={6} md={6}>
            {record[source].fullname}
          </Grid>
          <Grid item xs={6} md={6}>
            {record[source].phone}
          </Grid>
          <Grid item xs={6} md={6}>
            {record[source].address}
          </Grid>
          <Grid item xs={6} md={6}>
            {record[source].type}
          </Grid>
          <Grid item xs={6} md={6}>
            {record[source].make}
          </Grid>
          <Grid item xs={6} md={6}>
            {record[source].model}
          </Grid>
          <Grid item xs={6} md={6}>
            {record[source].num}
          </Grid>
          <Grid item xs={6} md={6}>
            {record[source].status}
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default RTOCard;
