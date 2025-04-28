import React, {useState} from "react";
import {IRequest} from "../../models";
import {RequestContext} from "./RequestContext";

interface IRequestState{
    children: React.ReactNode
}

export const RequestState = ({children}: IRequestState) => {

    const [request, setRequest] = useState<IRequest>({request_Id: 0,
        role_Id: 0,
        object_Id: 0,
        worker_Id: 0,
        status: "",
        urgency: false})

    return (

        <RequestContext.Provider value={{
            request, setRequest
        }}>
            {children}
        </RequestContext.Provider>
    )
}