import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {Link, withRouter} from 'react-router-dom';
import {Button} from "../../views/design/Button";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

function EditUsersButton(){
    return(
        <Link to="/game/editusers">
            <ButtonContainer>
                <Button width="50%">
                    Edit user
                </Button>
            </ButtonContainer>
        </Link>
    )
}

export default withRouter(EditUsersButton);