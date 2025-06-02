import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import CalendarAdminMonth from "../../components/Calendar/CalendarAdmin/CalendarAdminMonth";
import {useNavigate} from "react-router-dom";
import {IRequest} from "../../models";
import CalendarAdminWeek from "../../components/Calendar/CalendarAdmin/CalendarAdminWeek";
import {useRequest} from "../../storage/Request/useRequest";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";

export function CalendarAdminPage() {
    const navigate = useNavigate()
    const [weekMode, setWeekMode] = useState(false)
    const { worker } = getAuthDataFromLocalStorage()
    const {saveRequestToLocalStorage} = useRequest()
    const request: IRequest = {
        request_Id: -1,
        type_Work: "",
        description: "",
        roles_Id: null,
        worker_Id: [],
        object_Id: 0,
        status: "1",
        urgency: false,
        admin_Id: worker? worker.id : 0,
        photos: [],
    }

    useEffect(() => {
        saveRequestToLocalStorage(request)
    },[])

    const handleClickAssign = () => {
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