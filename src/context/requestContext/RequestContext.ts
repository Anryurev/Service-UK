import {createContext} from 'react'
import {IRequest} from "../../models";

interface IRequestContext{
    request: IRequest,
    setRequest: (request: IRequest) => void
}

export const RequestContext = createContext<IRequestContext>({
    request: {
        request_Id: -1,
        type_Work: "",
        description: "",
        roles_Id: null,
        worker_Id: 0,
        object_Id: 0,
        status: "1",
        urgency: false,
        photos: null,
    },
    setRequest: () => {},
})