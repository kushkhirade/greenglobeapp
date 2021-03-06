import * as React from "react";
import "./resuableComponent.scss";
import { Fab, Grid, Button, InputBase, InputAdornment } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import Select from "react-select";
import InputLabel from '@material-ui/core/InputLabel';

export interface TabsProps {
  tabsData: any;
  sortingData: any;
  SortingDatacomponent: any;
  onSortChange?: (value) => void;
  onChangeTabValue?: (value) => void;
  hasSort?: boolean;  isIndex?: number;
  sortValue?: (value) => void;
  hasInputText?: boolean;
  onInputChange?: (value) => void;
  sortOptions?: any;
}

export class Tabs extends React.Component<
  TabsProps,
  { activeTabIndex: number; activeTab: any; selectValue: any;}
> {
  public state = { activeTabIndex: 0, activeTab: [], selectValue: [{name: "", label: ""}] };

  public handleTabChange = (tabData: any, index: number) => {
    this.setState({
      activeTab: tabData,
      activeTabIndex: index,
    });

    if(tabData.tabName === this.props.tabsData[0].tabName){
      this.props.tabsData.map(tab=> {
        tabData.tabName !== tab.tabName 
        ? tab.onChangeTabValue && tab.onChangeTabValue(null)
        : this.setState({selectValue: [{name: null, label: null}] })
      })
    }else if(tabData.tabName === "Product"){
      this.props.tabsData[2].onChangeTabValue(null)   
      const arr = this.state.selectValue.filter(item => 
        item.name === "Tank Capacity" ? (item.label = null, item.name = null) : null) 
    }
  };

  handleSortChange = (value) => {
    this.props.onSortChange && this.props.onSortChange(value);
  };

  handleDisable =() => {
    const arr = this.state.selectValue.filter(item => item.name === "Product")
    return arr && arr[0] && arr[0].label === "Tank" ? false : true
  };

  public render() {
    console.log("this.State=> ", this.state);
    console.log("this.props=> ", this.props);

    return (
      <React.Fragment>
        <div className="tabs-container" >
          {this.props.hasInputText && 
            <InputBase
              id="input-with-icon-adornment"
              endAdornment={
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              }
              type="text" 
              autoComplete="off"
              fullWidth={true}
              className="search-input"
              style={{padding: 2, width: '100%', margin: '5px', backgroundColor: 'white'}}
              placeholder="Search by Name or Mobile Number"
              onChange={(e) => this.props.onInputChange(e)}
            /> 
          }
          {this.props.tabsData ? this.props.tabsData.map((tab: any, index: any) => {
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
                  tab.options.length > 0 ? 
                    <Select
                      isSearchable={true}
                      isDisabled={tab.tabName === "Tank Capacity" ?this.handleDisable(): false} 
                      // value={this.state.activeTab.tabName == tab.tabName ? this.state.selectValue : null}
                      value= {this.state.selectValue.filter(item => item.name === tab.tabName)}
                      onChange={(e) => {
                        tab.onChangeTabValue(e.value); 
                        const arr = this.state.selectValue.filter((item) => item.name === tab.tabName ? item.label = e.value : null)
                        if (arr.length === 0) {
                          this.state.selectValue.push({ name: tab.tabName, label: e.value })
                        }
                        // this.setState({selectValue: e})
                      }}
                      placeholder={<div style={{color: 'black'}}>{tab.tabName}</div>}
                      options= {tab.options}
                    />
                  :
                      <input className="tab-input"
                        disabled={true}
                        value= {tab.tabName}
                      />
                : 
                  <input className="tab-input" 
                    style={{width: '170px', height: '34px'}}
                    disabled={true}
                    value= {tab.tabName}
                  /> 
                }
              </div>
            );
          })
        : null}

          {this.props.hasSort && (
            <div className="tab-button">
            <Select
              onChange={(e)=> this.props.sortValue(e.value)}
              placeholder={<div style={{color: 'black'}}>Sort</div>}
              isSearchable={false}
              options={this.props.sortOptions && this.props.sortOptions ||
                [{ label: "Assending", value: "asc" }, { label: "Descending", value: "dsc" },]
              }
            />
            </div>
          )}
          { this.props.sortingData && this.props.sortingData.map( sort => {
            return(
              <div className="sortingButton">
                <Select
                  onChange={(e)=> this.props.sortValue(e.value)}
                  placeholder={<div style={{color: 'black'}}>{sort.placeholder}</div>}
                  isSearchable={false}
                  options={sort.options}
                />
              </div>
            )})
          }
        </div>
        <div style={{padding: this.props.hasSort ? 45 : this.props.sortingData ? 65 : 25}}> </div>

        {/* style={{ height: '1500px', overflowY: 'scroll'}} */}
        <div style={{ height: '680px', overflowY: 'auto'}}> 
          {this.props.tabsData ?
            this.props.tabsData.find(
              (tab: any, index: any) => index === this.state.activeTabIndex
            ).component
            : this.props.SortingDatacomponent
          }
        </div>
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