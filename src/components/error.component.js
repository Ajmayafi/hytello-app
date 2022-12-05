import React from "react";
import styled from "styled-components/native";

const ErrorContainer = styled.View`
align-items: center;
width: 85%;
padding: 4px;
margin-top: 6px;
`;

const ErrorTitle = styled.Text`
color: red;
font-size: 18px;
`;

const ErrorText = styled.Text`
color: black;
font-size: 18px;
`;


export const ErrorComponent = ({ error, inputError }) => {
  return (
    <ErrorContainer>

    {error && (
       <ErrorText>Error:<ErrorTitle> {String(error)}</ErrorTitle></ErrorText> )}

    {inputError && ( <ErrorText>Error:<ErrorTitle> {inputError}</ErrorTitle></ErrorText> 
    )}
    </ErrorContainer>
  )
}
