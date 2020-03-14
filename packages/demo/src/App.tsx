import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import PageOne from "./PageOne";
import PageTwo from "./PageTwo";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const App: React.FC = () => (
  <Container>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PageOne} />
        <Route exact path="/two" component={PageTwo} />
      </Switch>
    </BrowserRouter>
  </Container>
);

export default App;
