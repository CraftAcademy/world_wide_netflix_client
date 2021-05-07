import React from "react";
import LoginModal from "./LoginModal";
import { Header, Segment, Sticky } from "semantic-ui-react";

const HeaderMainPage = () => {
  return (
    <div data-cy="header">
      <Sticky onTop>
        <Segment inverted>
          <Header textAlign="center" size="huge" color="red" inverted>
            World Wide Netflix
          </Header>
          <Header textAlign="center">
            Tired of watching the choice Netflix gives you, check out what is
            available around the globe!
          </Header>
          <LoginModal />
        </Segment>
      </Sticky>
    </div>
  );
};

export default HeaderMainPage;
