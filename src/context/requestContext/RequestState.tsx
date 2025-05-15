import React, {useState} from "react";
import {IRequest} from "../../models";
import {RequestContext} from "./RequestContext";

interface IRequestState{
    children: React.ReactNode
}

export const RequestState = ({children}: IRequestState) => {

    const [request, setRequest] = useState<IRequest>({
        request_Id: -1,
        type_Work: "",
        description: "",
        roles_Id: null,
        worker_Id: 0,
        object_Id: 0,
        status: "1",
        urgency: false,
        photos: null,
    })

    return (

        <RequestContext.Provider value={{
            request, setRequest
        }}>
            {children}
        </RequestContext.Provider>
    )
}