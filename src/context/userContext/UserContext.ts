import {createContext} from 'react'
import {IUsers} from "../../models";

interface IUserContext{
    user: IUsers | null,
    setUser: (user: IUsers | null) => void
}

export const UserContext = createContext<IUserContext | undefined>(undefined)