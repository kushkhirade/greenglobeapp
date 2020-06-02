import { Modal } from "@material-ui/core";
import * as React from "react";
import "./resuableComponent.scss";

export interface IBaseModalProps {
  open: boolean;
  onClose: any;
  className?: string;
  contentClassName?: string;
}

export class BaseModal extends React.PureComponent<IBaseModalProps, {}> {
  public render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-body"
        className={`modal ${this.props.className}`}
        open={this.props.open}
        onBackdropClick={this.props.onClose}
      >
        <div className="modal-content">
          <div className="modal-container">{this.props.children}</div>
        </div>
      </Modal>
    );
  }
}
