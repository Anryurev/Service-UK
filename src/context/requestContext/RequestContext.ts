import {createContext} from 'react'
import {IRequest} from "../../models";

interface IRequestContext{
    request: IRequest,
    setRequest: (request: IRequest) => void
}

export const RequestContext = createContext<IRequestContext>({
    request: {request_Id: 0,
        role_Id: 0,
        worker_Id: 0,
        object_Id: 0,
        status: "",
        urgency: false},
    setRequest: () => {},
})