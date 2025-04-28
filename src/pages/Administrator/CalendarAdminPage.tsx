import React, {useContext} from "react";
import {Navbar} from "../../components/Navbar";
import CalendarAdmin from "../../components/Calendar/CalendarAdmin";
import {useNavigate} from "react-router-dom";
import {RequestContext} from "../../context/requestContext/RequestContext";
import {IRequest} from "../../models";

export function CalendarAdminPage() {
    const navigate = useNavigate()
    const requestContext = useContext(RequestContext)

    const request: IRequest = {
        request_Id: -1,
        role_Id: 0,
        worker_Id: 0,
        object_Id: 0,
        status: "",
        urgency: false
    }

    const handleClickAssign = () => {
        requestContext?.setRequest(request)
        navigate('/request/object')
    }

    return(
        <>
            <div className="container-fluid" style={{paddingTop: "60px"}}>
                <div className="row h-100">
                    <Navbar/>
                    <CalendarAdmin/>
                </div>
                <div className="row h-100">
                    <div className="col-sm-1 d-flex flex-column">
                        <button type="button" className="btn-sm button_calendar mt-auto" onClick={handleClickAssign}>Назначить</button>
                    </div>
                </div>
            </div>
        </>
    )
}