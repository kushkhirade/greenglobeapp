import * as React from "react";
import "./resuableComponent.scss";
import Select from "react-select";
import { GSelect } from "./GSelect";
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { SortComponent } from "./Sort";
import { FormComponent } from "src/components/FormComponent";
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Menu, InputLabel, FormControl } from '@material-ui/core';

export interface TabsProps {
  tabsData: any;
  onSortChange?: (value) => void;
  onChangeTabValue?: (value) => void;
  hasSort?: boolean;  
}

export class Tabs extends React.Component<
  TabsProps,
  { activeTabIndex: number; activeTab: any; anchorEl: any; selectedIndex: any; }
> {
  public state = { activeTabIndex: 0, activeTab: "", anchorEl: "", selectedIndex: null };

  public handleTabChange = (tabData: string, index: number) => {
    this.setState({
      activeTab: tabData,
      activeTabIndex: index,
    });
  };

  handleSortChange = (value) => {
    this.props.onSortChange && this.props.onSortChange(value);
  };

  public render() {
    return (
      <React.Fragment>
        <div className="tabs-container">
          {this.props.tabsData.map((tab: any, index: any) => {
            return (
              <div
                className={`tab-button ${
                  index === this.state.activeTabIndex ? "active" : ""
                }`}
                key={index}
                onClick={() => {
                  tab.onTabSelect && tab.onTabSelect(tab.tabName);
                  this.handleTabChange(tab, index);
                }}
              > 
                {/* <CardDetailsForDealer tabData={tab}/> */}
                {/* <div {...getRootProps()}>
                  <label className={classes.label} {...getInputLabelProps()}>
                    useAutocomplete
                  </label>
                  <input className={classes.input} {...getInputProps()} />
                </div>
                {groupedOptions.length > 0 ? (
                  <ul className={classes.listbox} {...getListboxProps()}>
                    {groupedOptions.map((option, index) => (
                      <li {...getOptionProps({ option, index })}>{option.label}</li>
                    ))}
                  </ul>
                ) : null} */}
                {/* <TextField
                  id="standard-select-currency"
                  select
                  label={tab.tabName}
                  // value={currency}
                  onChange={tab.onChangeTabValue}
                  // helperText="Please select your currency"
                >
                  {tab.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> */}
               
                    {/* <Select
                      className="r-select"
                      classNamePrefix="r-select-pre"
                      isSearchable={true}
                      onChange={tab.onChangeTabValue}
                      placeholder={tab.tabName}
                      options= {tab.options}
                    /> */}
                {/* <div className="sort-container">
                  <GSelect
                    handleChange={this.handleTabChange(tab, index)}
                    placeholder={tab.tabName}
                    options={tab.options}
                  />
                </div> */}
                {/* <FormComponent
                  onSubmit={(v: any) => {
                    console.log(">> v", v);
                  }}
                  formModel="leadForm"
                  hasSubmit={false}
                  options={[{
                    label: tab.tabName,
                    // model: ".leadType",
                    type: "select",
                    options: tab.options}]}
                /> */}
                  {/* <Autocomplete
                    id="combo-box-demo"
                    blurOnSelect={true}
                    options={tab.options}
                    onChange={(option)=> tab.onChangeTabValue(option.label)}
                    getOptionLabel={option => option.label}
                    renderInput={params => ( 
                      <TextField {...params} aria-label="empty textarea" label={tab.tabName} variant="outlined" />
                    )}
                  /> */}
               
                 {/* <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem>
                    <ListItemIcon>
                      <SendIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                  </StyledMenuItem>
                </StyledMenu> */}
              {/* <InputLabel id="demo-simple-select-filled-label">{tab.tabName}</InputLabel> 
                <FormControl >
                <Select
                  value={this.state.anchorEl}
                  onChange={(event) => this.setState({anchorEl: event.target.value})}
                  displayEmpty
                  // label={tab.tabName}defaultValue={tab.tabName}
                  variant="outlined"
                  // className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={tab.tabName} disabled>
                    {tab.tabName}
                  </MenuItem>
                  {tab.options.map((option) => (
                    <MenuItem value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                </FormControl> */}

                {tab.options ? 
                  <Select
                    // autosize={true}
                    isSearchable={true}
                    onChange={tab.onChangeTabValue}
                    placeholder={tab.tabName}
                    options= {tab.options}
                  />
                :
                  <div style={{fontSize: '16px'}} > {tab.tabName} </div>
                }
              </div>
            );
          })}
          {this.props.hasSort && (
            <SortComponent
              onChange={this.handleSortChange}
              options={[
                { label: "Assending", value: "asc" },
                { label: "Descending", value: "dsc" },
              ]}
            />
          )}
        </div>
        {
          this.props.tabsData.find(
            (tab: any, index: any) => index === this.state.activeTabIndex
          ).component
        }
      </React.Fragment>
    );
  }
}

const CardDetailsForDealer = (props: any) => {
  const useStyles = makeStyles((theme) => ({
    label: {
      display: 'block',
    },
    input: {
      width: 100,
    },
    listbox: {
      width: 100,
      margin: 0,
      padding: 0,
      zIndex: 1,
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 200,
      border: '1px solid rgba(0,0,0,.25)',
      '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
      },
      '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
      },
    },
  }));
  const classes = useStyles();
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: props.tabData.options,
    getOptionLabel: (option) => option.label,
  });
  
  return (
    <div>
      <div>
        <label className={classes.label}>
          {props.tabData.tabName}
        </label>
        <input className={classes.input} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.label}</li>
          ))}
        </ul>
      ) : null}
      </div>
  );
}