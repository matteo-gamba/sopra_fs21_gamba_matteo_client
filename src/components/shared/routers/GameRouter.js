import React, {Fragment} from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Game from "../../game/Game";
import User from "../routers/GameRouter.js"
import UserDetails from "../../editUser/UserDetails";
import EditUser from "../../editUser/EditUser";
import UserPage from "../../editUser/UserPage";
import SpecificUser from "../../userDetails/UserFrame";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
            <Route
                exact
                path={`${this.props.base}/dashboard`}
                render={() => <Game />}
            />

            <Route
                exact
                path={`${this.props.base}/userdetails/:id`}
                render={() => <SpecificUser/>}
            />
            <Route
                exact
                path={`${this.props.base}/editusers`}
                render={() => <EditUser/>}
            />
            <Route
                exact
                path={`${this.props.base}`}
                render={() => <Redirect to={`${this.props.base}/dashboard`} />}
            />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
