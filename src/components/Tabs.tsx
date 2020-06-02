import * as React from "react";
import "./resuableComponent.scss";

export interface TabsProps {
  tabsData: any;
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
                  tab.onTabSelect(tab.tabName);
                  this.handleTabChange(tab, index);
                }}
              >
                {tab.tabName}
              </div>
            );
          })}
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
