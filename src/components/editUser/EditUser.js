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

class EditUser extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            birthdate: '',
            validUsername: true,
            validBirthdate: true,
            validForm: true
        };
        this.handleChange = this.handleChange.bind(this)
        this.validateInput = this.validateInput.bind(this)
    }

    async componentDidMount() {
        try{
            const response = await api.get('/users/' + localStorage.getItem("id"));

            const user = response.data

            this.setState({
                username: user.username,
                birthdate: user.birthdate
            })
        } catch (error) {
            alert(`Something went wrong while fetching the user data: \n${handleError(error)}`);
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
        this.validateInput(event.target.name)
    }

    validateInput(inputField){
        switch(inputField){
            case "username":
                if (this.state.username.length <= 3){
                    this.setState({validUsername: false})
                }
                else{this.setState({validUsername: true})}
                break;

            case "birthdate":
                this.setState({validUsername: true})
                break;
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
                    {this.state.validUsername ? <p>username is valid</p> : <p>username is invalid</p>}

                    <h3>birthdate: (format: YYYY-MM-DD) {this.state.birthdate}</h3>
                    <input
                        type="text"
                        name="birthdate"
                        placeholder="birthdate"
                        value={this.state.birthdate}
                        onChange={this.handleChange}
                    />
                    {this.state.validBirthdate ? <p>birthdate is valid</p> : <p>birthdate is invalid</p>}

                    <ButtonContainer>
                        <Button>
                            Save changes
                        </Button>
                    </ButtonContainer>
                </form>
            </Container>
        );
    }
}

export default withRouter(EditUser);
