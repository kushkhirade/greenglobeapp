import React from "react";
import { Show } from "react-admin";
export class Communication extends React.Component {
  render() {
    return (
      <div>
        <h3>Communication</h3>
        <Show {...this.props}></Show>
      </div>
    );
  }
}
