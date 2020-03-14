import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 69px;
  font-size: 24px;
  font-weight: bold;
`;

const PageTwo: React.FC = () => (
  <Container>Welcome, This is another page!</Container>
);

export default PageTwo;
