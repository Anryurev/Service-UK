import React, {useState} from "react";
import {UserContext} from "./UserContext";
import {IUsers} from "../../models";

interface IExecutorState{
    children: React.ReactNode
}

export const Userstate = ({children}: IExecutorState) => {

    const [user, setUser] = useState<IUsers | null>(null)

    return (

        <UserContext.Provider value={{
            user, setUser
        }}>
            {children}
        </UserContext.Provider>
    )
}