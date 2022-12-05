import React, { useContext } from "react";
import { AuthContext } from "../services/authentication/auth.context";



export const useAuthStates = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("Provider must be wrapped")
    }

    return context
}