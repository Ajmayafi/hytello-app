import React, { useEffect, useState } from 'react';
import { CreateSecurityPinScreen } from './create-pin-security';
import { LoginSecurityScreen } from './login-security.screen';
import { useAuthStates } from '../../../hooks/useAuthStates';


export const SecurityScreen = () => {
  const { loginPin } = useAuthStates()

  return  (
    loginPin ? <LoginSecurityScreen /> :<CreateSecurityPinScreen />
  )
}