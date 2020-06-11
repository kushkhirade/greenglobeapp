import * as React from "react";
import { GSelect } from "./GSelect";

export const SortComponent = (props) => {
  return (
    <div className="sort-container">
      <GSelect
        handleChange={props.onChange}
        placeholder="Sort Data"
        options={props.options}
      />
    </div>
  );
};
