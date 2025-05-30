import React, {useContext, useState} from "react";
import {Navbar} from "../../components/Navbar";
import CalendarAdminMonth from "../../components/Calendar/CalendarAdmin/CalendarAdminMonth";
import {useNavigate} from "react-router-dom";
import {RequestContext} from "../../context/requestContext/RequestContext";
import {IRequest} from "../../models";
import CalendarAdminWeek from "../../components/Calendar/CalendarAdmin/CalendarAdminWeek";

export function CalendarAdminPage() {
    const navigate = useNavigate()
    const requestContext = useContext(RequestContext)
    const [weekMode, setWeekMode] = useState(false)

    const request: IRequest = {
        request_Id: -1,
        type_Work: "",
        description: "",
        roles_Id: null,
        worker_Id: [],
        object_Id: 0,
        status: "1",
        urgency: false,
        photos: null,
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
                    <div className="form-check form-switch mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input me-1"
                            name='weekMode'
                            role="switch"
                            checked={weekMode}
                            onChange={() => {
                                setWeekMode(prev => (!prev))
                            }}
                        />
                        <label htmlFor='weekMode'>{weekMode? "Неделя": "Месяц"}</label>
                    </div>
                    {weekMode? <CalendarAdminWeek/> : <CalendarAdminMonth/>}
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