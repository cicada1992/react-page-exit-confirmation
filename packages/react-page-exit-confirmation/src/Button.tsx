import autobind from "autobind-decorator";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import { colors } from "./lib/styleColors";

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  color: ${colors.N300};
  background: ${colors.N10};
  border: 1px solid ${colors.N50};
  height: 30px;

  &:active {
    transform: translateY(1px);
  }
`;

const ButtonElement = styled.div`
  display: inline-block;
  vertical-align: middle;

  /** If button has an icon, there will be a margin */
  &:nth-child(2) {
    margin-left: 5px;
  }
`;

export interface ButtonProps {
  label?: string | JSX.Element;
  style?: React.CSSProperties;
  onClick?: (evt: SyntheticEvent<HTMLButtonElement>) => void;
}

class Button extends React.PureComponent<ButtonProps> {
  public static defaultProps: Partial<ButtonProps> = {
    style: {}
  };

  public render() {
    const { label, style } = this.props;
    return (
      <StyledButton style={style} onClick={this.handleClick}>
        <ButtonElement>{label}</ButtonElement>
      </StyledButton>
    );
  }

  @autobind
  private handleClick(evt: SyntheticEvent<HTMLButtonElement>) {
    const { onClick } = this.props;
    if (onClick) {
      onClick(evt);
    }
  }
}

export default Button;
