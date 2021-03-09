import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { Link, withRouter } from 'react-router-dom';
import PlayerProfile from "./UserProfile";
import UserProfile from "./UserProfile";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const PageHeader = styled.h1`
  text-align: center;
  color: white;
`

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

class UserFrame extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            editMode: false
        };
        this.fetchUserData = this.fetchUserData.bind(this)
        this.changeMode = this.changeMode.bind(this);
    }

    changeMode() {
        this.setState(state => ({
            editMode: !state.editMode
        }));
    }

    async fetchUserData(id = this.props.match.params.id) {
        try {
            const response = await api.get(`/users/${id}`, {headers: {"token": localStorage.getItem('token')}});
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ user: response.data });

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        this.fetchUserData()
    }

    render() {
        return (
            <Container>
                {!this.state.user ? (
                    <Spinner />
                ) : (
                    <div>
                        <PageHeader>User Profile: {this.state.user.username}</PageHeader>
                        <div>
                            <div style={{
                                width: '100%',
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                textAlign: 'left',
                            }}>
                            </div>
                            <Users>
                                <PlayerContainer key={this.state.user.id}>
                                    <UserProfile user={this.state.user} fetchUserData={this.fetchUserData} editMode={this.state.editMode} changeMode={this.changeMode} />
                                </PlayerContainer>
                                {(!this.state.editMode && localStorage.getItem('id').toString() === this.state.user.id.toString()) ?
                                    <ButtonContainer>
                                        <Button style={{width: '50%'}} onClick={this.changeMode}>Edit</Button>
                                    </ButtonContainer>
                                    : null }
                                <Link to={`/game/dashboard`}>
                                    <ButtonContainer>
                                        <Button style={{width: '60%'}}>Back to Dashboard</Button>
                                    </ButtonContainer>
                                </Link>
                            </Users>
                        </div>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(UserFrame);