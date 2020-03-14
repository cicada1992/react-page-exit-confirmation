import React from "react";
import PageExitConfirmation from "react-page-exit-confirmation";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 69px;
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.div`
  margin-left: 10px;
  color: #5d95ff;
`;

const List = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 69px;
  font-size: 20px;
  color: #555;
`;

const PageOne: React.FC<RouteComponentProps> = ({ history }) => {
  const modalContent = (
    <>
      <div>You have unsaved changes that will be lost if you leave.</div>
      <div>Is it okay?</div>
    </>
  );
  return (
    <>
      <PageExitConfirmation
        shouldConfirm={true}
        history={history}
        modalHeader="Leave this page?"
        modalContent={modalContent}
        modalStyle={{
          background: "#fff",
          borderRadius: 0
        }}
        leaveButtonStyle={{ background: "#5d95ff", color: "#fff" }}
      />
      <Container>
        Demo page for <Title>react-page-exit-confirmation</Title>
      </Container>
      <List>
        1. Try to close or refresh window. then, you can see chrome prompt.
      </List>
      <List>
        2. Try to route by clicking the button below. then, you can see modal.
        (for SPA)
      </List>
      <Link to="/two">
        <button>Route to another page (SPA)</button>
      </Link>
    </>
  );
};

export default withRouter(PageOne);
