import {createContext, Dispatch} from 'react'
import {Action, IState} from "../../models";

interface IEdembackContext {
    state: IState,
    dispatch: Dispatch<Action>
}

export const EdembackContext = createContext<IEdembackContext>({
    state: { users: [], objects: [] },
    dispatch: () => {},
})