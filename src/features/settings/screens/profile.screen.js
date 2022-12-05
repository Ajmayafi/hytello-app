import React, { useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../services/authentication/auth.context";

import { TextInput, Button } from 'react-native-paper';

const ProfileContainer = styled.View`
 align-items: center;
 margin-top: 30px;
`;

const Input = styled(TextInput)`
width: 300px;
margin-bottom: 25px;
`;

const Buton = styled(Button).attrs({
  
})`
width: 300px;
color: ${(props) => props.theme.colors.button.bg}
font-size: 25px;
`;

export const ProfileScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <ProfileContainer>
      <Input
      label="Email"
      value={user.email}
      disabled
    />
      <Input
      label="First Name"
      value={user.first_name}
      disabled
    />
     <Input
      label="Last Name"
      value={user.last_name}
      disabled
    />
      <Input
      label="Phone Number"
      value={user.phone_number}
      disabled
    />
      <Input
      label="Joined"
      value={user.joined}
      disabled
    />
     <Buton mode="text">
    Edit Details
  </Buton>
    </ProfileContainer>
  )
}
