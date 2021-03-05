import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {Link, withRouter} from 'react-router-dom';
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class UserDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
    }

    async componentDidMount() {
        try{
            const response = await api.get('/users/' + this.props.match.params.id);
            console.log(response.data.username);
            this.setState({user: response.data})

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);
        } catch (error){
            alert(`Something went wrong while fetching the user: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container>
                <p>Name: {this.state.user ? this.state.user.username : ''}</p>
                <p>Status: {this.state.user ? this.state.user.status : ''}</p>
                <p>Creation Date: {this.state.user ? this.state.user.creationDate : ''}</p>
                <p>ID: {this.state.user ? this.state.user.id : ''}</p>
                {(this.state.user && this.state.user.birthdate) ? <p>Birth date: {this.state.user.birthdate}</p>: ''}
                <Link to="/game/editusers">
                    <ButtonContainer>
                        <Button width="50%">
                            Edit user
                        </Button>
                    </ButtonContainer>
                </Link>
                <Link to="/game">
                    <ButtonContainer>
                        <Button width="50%">
                            Go back
                        </Button>
                    </ButtonContainer>
                </Link>
            </Container>
    );
    }
}

export default withRouter(UserDetails);
