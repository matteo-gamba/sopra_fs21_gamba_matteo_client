import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { Link, withRouter } from 'react-router-dom';
import EditUsersButton from "../editUser/EditUsersButton";

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

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
    };
  }

  async logout() {
    await api.put('/users/'+localStorage.getItem("id"),'', {headers: {'token': localStorage.getItem('token')}});
    localStorage.removeItem('token')
    this.props.history.push('/login');
  }

  async componentDidMount() {
    try {
      const response = await api.get('/users',{headers: {'token': localStorage.getItem('token')}});
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      await new Promise(resolve => setTimeout(resolve, 1000));

      if(response.data.length === 0){
        localStorage.clear()
        this.props.history.push('/login')
      }

      // Get the returned users and update the state.
      this.setState({
        users: response.data,
      });

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
      localStorage.clear()
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <Container>
        <h2>Welcome {"\""+localStorage.getItem("username")+"\""}! </h2>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                    <PlayerContainer key={user.id}>
                      <Link to={'/game/userdetails/' + user.id}>
                        <Player user={user}/>
                      </Link>
                    </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
