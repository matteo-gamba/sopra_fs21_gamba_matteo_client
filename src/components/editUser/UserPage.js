import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { Link, withRouter } from 'react-router-dom';
import UserDetails from "./UserDetails";

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

class UserPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username:null,
            status: null,
            creationDate: null,
            birthdate: null,
            id: null,
            user: null,
            editMode: false
        };
        this.getUserData = this.getUserData.bind(this)
        this.changeMode = this.changeMode.bind(this);
    }

    changeMode() {
        this.setState({editMode: !this.state.editMode});
    }


    async componentDidMount() {await this.getUserData()}


    handleUsernameChange(event){
        this.setState({username: event.target.value })
    }

    handleBirthDateChange(event){
        this.setState({birthdate: event.target.value})
    }

    async handleSubmit(event){
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                birthdate: this.state.birthdate
            });
            const response = await api.post("/users/" + localStorage.id, requestBody);

            localStorage.setItem("username", this.state.username);
            //alert('game/userdetails/'+localStorage.getItem("id"));
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async getUserData(){
        try {
            const response = await api.get(`/users/${this.props.match.params.id}`);

            // Get the returned users and update the state.
            this.setState({
                username: response.data.username,
                status: response.data.status,
                creationDate: response.data.creationDate,
                birthdate: response.data.birthdate,
                id: response.data.id,
                user: response.data });

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

    render() {
        return (
            <Container>
                {!this.state.user ? (
                    <Spinner />
                ) : (
                    <Users>
                        {
                            !this.state.editMode ?
                            <Container>
                                <PlayerContainer key={this.state.user.id}>
                                    <UserDetails user={this.state.user} getUserData={this.getUserData}/>
                                </PlayerContainer>
                                <ButtonContainer>
                                    <Button onClick={this.changeMode} width="50%">
                                        Edit user
                                    </Button>
                                </ButtonContainer>
                            </Container>
                            :
                            <Container>
                                <h1>Edit Your Details</h1>
                                <form onSubmit={this.handleSubmit}>
                                    <h3>username: {this.state.username}</h3>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange= {this.handleUsernameChange}
                                    />

                                    <h3>birthdate: (format: YYYY-MM-DD) {this.state.birthdate}</h3>
                                    <input
                                        type="text"
                                        name="birthdate"
                                        placeholder="birthdate"
                                        value={this.state.birthdate}
                                        onChange={this.handleBirthDateChange}
                                    />

                                    <ButtonContainer>
                                        <Button
                                            //disabled={!this.state.validForm}
                                            onClick={() => {
                                                this.changeMode();
                                            }}
                                        >
                                            Save changes
                                        </Button>
                                    </ButtonContainer>
                                </form>
                            </Container>
                        }
                    </Users>
                )}
            </Container>
        );
    }
}

export default withRouter(UserPage);