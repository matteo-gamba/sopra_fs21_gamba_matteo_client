import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {Button} from "../../views/design/Button";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            id: null
        };
    }

    async componentDidMount() {
        try {
            this.setState({ id: this.props.id });
            const response = await api.get('/users/' + this.props.id);


            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);
        } catch (error) {
            alert(`Something went wrong while fetching the user: \n${handleError(error)}`);
        }
    }

    changeDateAppearance(string) {
        const date = new Date(string);
        return ('0' + date.getDate()).slice(-2) + "." + ('0' + (date.getMonth()+1)).slice(-2) + "." + date.getFullYear();
    }

    render() {
        return (
            <Container>
                <p>Name: {this.state.user ? this.state.user.name : ''}</p>
                <p>Username: {this.state.user ? this.state.user.username : ''}</p>
                <p>Is currently: {this.state.user ? this.state.user.status : ''}</p>
                <p>Was created at: {this.state.user ? this.changeDateAppearance(this.state.user.creationDate) : ''}</p>
                {(this.state.user && this.state.user.birthDate) ? <p>Birth date: {this.changeDateAppearance(this.state.user.birthDate)}</p>: ''}
                <Button width = "200px" onClick={() => {
                    this.props.history.push(`/game/dashboard`);
                }}>Back to the overview</Button>
            </Container>
        );
    }
}

export default withRouter(ProfilePage);