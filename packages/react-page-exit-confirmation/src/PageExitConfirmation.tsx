import autobind from "autobind-decorator";
import { Location } from "history";
import React from "react";
import Modal from "react-modal";
import { Prompt } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";
import { colors } from "./lib/styleColors";

const DEFAULT_MODAL_STYLE = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  width: 500,
  padding: "30px 20px",
  transform: "translate(-50%, -50%)",
  boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.37)"
};

const LEAVE_BUTTON_STYLE = {
  width: 90,
  height: 30
};

const CANCEL_BUTTON_STYLE = {
  width: 90,
  height: 30
};

const Title = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.N300};
`;

const Content = styled.div`
  margin-bottom: 20px;
  font-size: 13px;
  color: ${colors.N300};
`;

const Footer = styled.div`
  background: transparent;
  text-align: right;

  & > button {
    margin-left: 4px;
  }
`;

interface PageExitConfirmationProps
  extends Pick<RouteComponentProps, "history"> {
  shouldConfirm: boolean;
  modalHeader?: React.ReactNode;
  modalContent?: React.ReactNode;
  modalStyle?: React.CSSProperties;
  leaveButtonStyle?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties;
}

interface PageExitConfirmationState {
  isDialogOpen: boolean;
  nextLocation: Location;
  confirmedNavigation: boolean;
}

class PageExitConfirmation extends React.Component<
  PageExitConfirmationProps,
  PageExitConfirmationState
> {
  public static defaultProps: Partial<PageExitConfirmationProps> = {
    modalHeader: "Leave this page?",
    modalContent: "You have unsaved changes that will be lost if you leave.",
    modalStyle: {},
    leaveButtonStyle: {},
    cancelButtonStyle: {}
  };

  constructor(props: PageExitConfirmationProps) {
    super(props);
    this.state = {
      isDialogOpen: false,
      nextLocation: null,
      confirmedNavigation: false
    };
  }

  public componentDidMount() {
    window.addEventListener("beforeunload", this.handleExit);
  }

  public componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleExit);
  }

  public render() {
    const { isDialogOpen } = this.state;
    const {
      shouldConfirm,
      modalHeader,
      modalContent,
      modalStyle,
      leaveButtonStyle,
      cancelButtonStyle
    } = this.props;

    return (
      <>
        <Prompt when={shouldConfirm} message={this.handleBlockedNavigation} />
        <Modal
          isOpen={isDialogOpen}
          style={{ content: { ...DEFAULT_MODAL_STYLE, ...modalStyle } }}
        >
          <Title>{modalHeader}</Title>
          <Content>{modalContent}</Content>
          <Footer>
            <Button
              style={{ ...CANCEL_BUTTON_STYLE, ...cancelButtonStyle }}
              label="Cancel"
              onClick={this.closeModal}
            />
            <Button
              style={{ ...LEAVE_BUTTON_STYLE, ...leaveButtonStyle }}
              label="Leave"
              onClick={this.handleDialogYes}
            />
          </Footer>
        </Modal>
      </>
    );
  }

  @autobind
  private handleBlockedNavigation(nextLocation: Location) {
    const { confirmedNavigation } = this.state;
    const { shouldConfirm } = this.props;
    if (!confirmedNavigation && shouldConfirm) {
      this.showModal(nextLocation);
      return false;
    }

    return true;
  }

  @autobind
  private handleDialogYes() {
    const { history } = this.props;
    const { nextLocation } = this.state;
    const navigateToNextLocation = () => {
      if (nextLocation) {
        this.setState({ confirmedNavigation: true }, () => {
          history.push(nextLocation.pathname);
        });
      }
    };
    this.setState({ isDialogOpen: false }, navigateToNextLocation);
  }

  @autobind
  private showModal(nextLocation: Location) {
    this.setState({ isDialogOpen: true, nextLocation });
  }

  @autobind
  private closeModal() {
    this.setState({ isDialogOpen: false });
  }

  // this is for chrome prompt
  @autobind
  private handleExit(evt: BeforeUnloadEvent) {
    const { shouldConfirm } = this.props;
    if (shouldConfirm) {
      const text = "You have unsaved changes that will be lost if you leave.";
      evt.returnValue = text;
      return text;
    }
  }
}

export default PageExitConfirmation;
