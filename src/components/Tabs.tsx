import * as React from "react";
import "./resuableComponent.scss";
import Select from "react-select";
import { GSelect } from "./GSelect";
<<<<<<< HEAD
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
=======
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { SortComponent } from "./Sort";
import { FormComponent } from "src/components/FormComponent";
<<<<<<< HEAD
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Menu, InputLabel, FormControl } from '@material-ui/core';
=======
import { isWidthDown } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1

export interface TabsProps {
  tabsData: any;
  onSortChange?: (value) => void;
  onChangeTabValue?: (value) => void;
<<<<<<< HEAD
  hasSort?: boolean;  
  sortValue?: (value) => void;
=======
  hasSort?: boolean;
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
}

export class Tabs extends React.Component<
  TabsProps,
  { activeTabIndex: number; activeTab: any; selectValue: string;}
> {
  public state = { activeTabIndex: 0, activeTab: "", selectValue: "", previousNum: ""};

  public handleTabChange = (tabData: any, index: number) => {
    console.log("tab: ", tabData.tabName)
    this.setState({
      activeTab: tabData,
      activeTabIndex: index,
    });

    if(tabData.tabName === this.props.tabsData[0].tabName){
      this.props.tabsData.map(tab=> {
        tabData.tabName !== tab.tabName 
        ? tab.onChangeTabValue && tab.onChangeTabValue(null)
        : console.log("else: ", tab)
      })
    }
  };

  handleSortChange = (value) => {
    this.props.onSortChange && this.props.onSortChange(value);
  };

  public render() {
    console.log("activeTab",this.state.activeTab)
    console.log("selectTab",this.state.selectValue)
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
<<<<<<< HEAD
                {tab.options ? 
                  <Select
                    // autoFocus={true}
                    // styles = {{option: (provided, state) => ({
                    //   ...provided,
                    //   color: state.isSelected ? 'white' : 'black',
                    //   backgroundColor: state.isSelected ? '#48a89c' : 'white',
                    // })}}
                    // id= 'demo-simple-select-filled'
                    isSearchable={true}
                    value={this.state.activeTab.tabName == tab.tabName ? this.state.selectValue : this.state.previousNum}
                    onChange={(e) => {tab.onChangeTabValue(e.value), this.setState({selectValue: e})}}
                    placeholder={tab.tabName}
                    options= {tab.options}
                  />
                :
                  <div style={{fontSize: '16px', paddingTop: '10px'}} > {tab.tabName} </div>
                }
=======
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
                {/* <Autocomplete
                  id="combo-box-demo"
                  blurOnSelect={true}
                  options={tab.options}
                  onChange={(option)=> tab.onChangeTabValue(option.label)}
                  getOptionLabel={option => option.label}
                  style={{ width: 100 }}
                  renderInput={params => (
                    <TextField {...params} label={tab.tabName} style={{width: 100}}/>
                  )}
                /> */}
                    {/* <Select
                      className="r-select"
                      classNamePrefix="r-select-pre"
                      isSearchable={true}
                      onChange={tab.onChangeTabValue}
                      placeholder={tab.tabName}
                      options= {tab.options}
                    /> */}
                {tab.tabName}
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
              </div>
            );
          })}
          {this.props.hasSort && (
            <div className="tab-button">
              <Select
                onChange={(e)=> this.props.sortValue(e.value)}
                placeholder="Sort"
                isSearchable={false}
                options={[
                  { label: "Assending", value: "asc" },
                  { label: "Descending", value: "dsc" },
                ]}
              />
            </div>
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
<<<<<<< HEAD
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#48a89c' : 'white',
    hover: {
      cursor: 'pointer',
      backgroundColor: '#48a89c',
      // color:white;
      // color:'black'
  }
  }),
  control: (provided, state) => ({
    ...provided,
    color: 'white',
    // backgroundColor: '#48a89c',
    border: '#48a89c'
  })
=======

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
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
}