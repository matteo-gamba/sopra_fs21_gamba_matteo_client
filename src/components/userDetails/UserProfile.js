import React from "react";
import {Link, withRouter} from "react-router-dom";
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {Button} from "../../views/design/Button";
import {BaseContainer} from "../../helpers/layout";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class UserProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            birthdate: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.modifyDetails = this.modifyDetails.bind(this)
    }

    async modifyDetails() {
        console.log(this.state.username)
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                birthdate: this.state.birthdate
            });

            const response = await api.post("/users/" + localStorage.id.toString(), requestBody, {headers: {"token": localStorage.getItem('token')}});

            const user = response.data;
            console.log({username: user.username, birthdate: user.birthdate});

            await this.props.fetchUserData(this.props.user.id);

            this.props.changeMode();

            localStorage.setItem("username", this.state.username);

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    componentDidMount(){}

    render() {
        return (
            <Container>
                {!this.props.editMode ? (
                    <div>
                        <p>Username: {this.props.user.username}</p>
                        <p>Status: {this.props.user.status}</p>
                        <p>Creation Date: {this.props.user.creationDate}</p>
                        <p>ID: {this.props.user.id}</p>
                        {this.props.user.birthdate == null ? '' : <p>Birth date: {this.props.user.birthdate}</p>}
                    </div>
                ) : (
                    <div style={{width: '100%'}}>
                        <div style={{width: '100%'}}>
                            <h2 style={{display: 'block'}}>Change Username</h2>
                            <input
                                name="username"
                                value={this.state.username}
                                placeholder="New username"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div style={{width: '100%'}}>
                            <h2 style={{display: 'block'}}>Set Birthday</h2>
                            <input
                                name="birthdate"
                                value={this.state.birthdate}
                                placeholder="YYYY-MM-DD"
                                onChange={this.handleChange}
                            />
                        </div>
                        <ButtonContainer>
                                <Button
                                    width="100%"
                                    onClick={this.modifyDetails}
                                >
                                    Save changes
                                </Button>
                        </ButtonContainer>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(UserProfile);