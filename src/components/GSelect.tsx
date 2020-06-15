import * as React from "react";
import Select from "react-select";

export const GSelect = (props) => (
  <Select
    className="r-select"
    classNamePrefix="r-select-pre"
    isSearchable={false}
    onChange={props.handleChange}
    placeholder={props.placeholder}
    options={props.options}
  />
);
