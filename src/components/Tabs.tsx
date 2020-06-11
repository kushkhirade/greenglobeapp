import * as React from "react";
import "./resuableComponent.scss";
import { SortComponent } from "./Sort";

export interface TabsProps {
  tabsData: any;
  onSortChange?: (value) => void;
  hasSort?: boolean;
}

export class Tabs extends React.Component<
  TabsProps,
  { activeTabIndex: number; activeTab: any }
> {
  public state = { activeTabIndex: 0, activeTab: "" };

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
                {tab.tabName}
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
