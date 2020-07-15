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
  sortValue?: (value) => void;
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
}