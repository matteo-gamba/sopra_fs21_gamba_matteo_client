import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {Button} from "../../views/design/Button";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


class EditUser extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            birthdate: "",
        };
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        try{
            const response = await api.get('/users/' + localStorage.getItem("id"));

            const user = response.data

            this.setState({
                username: user.username,
                birthdate: user.birthdate ? user.birthdate : ""
            })
        } catch (error) {
            alert(`Something went wrong while fetching the user data: \n${handleError(error)}`);
        }
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value })
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

    render() {
        return (
            <Container>
                <h1>Edit Your Details</h1>
                <form>
                    <h3>username: {this.state.username}</h3>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={this.state.username}
                        onChange= {this.handleChange}
                    />

                    <h3>birthdate: (format: YYYY-MM-DD) {this.state.birthdate}</h3>
                    <input
                        type="text"
                        name="birthdate"
                        placeholder="birthdate"
                        value={this.state.birthdate}
                        onChange={this.handleChange}
                    />

                    <ButtonContainer>
                        <Button
                            //disabled={!this.state.validForm}
                            onClick={() => {
                                this.handleSubmit();
                            }}
                        >
                            Save changes
                        </Button>
                    </ButtonContainer>
                </form>
            </Container>
        );
    }
}

export default withRouter(EditUser)
