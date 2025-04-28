import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {RequestContext} from "../../context/requestContext/RequestContext";
import {IRequest} from "../../models";

export function RequestDescriptionPage(){
    const edemContext = useContext(EdembackContext)
    const requestContext = useContext(RequestContext)
    const [updatedRequest, setUpdatedRequest] = useState<IRequest>(requestContext.request)
    const navigate = useNavigate()

    const handleClickCreate = () => {
        edemContext.createRequest(requestContext.request)
        navigate('/calendar')
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "urgency") {
            const newRequest = {
                ...requestContext.request,
                urgency: !requestContext.request.urgency,
            }
            requestContext.setRequest(newRequest)
        }

        console.log('urgency', requestContext.request)
    }
    return(
        <>
            <Navbar/>
            <div className="container-sm" style={{paddingTop: "60px"}}>
                <div className="row">
                    <div className="col-sm-6 border-black border-3">
                        <div className="mb-1">
                            <label htmlFor="task" className="form-label mb-0">Задание</label>
                            <input
                                type="text"
                                className="form-control"
                                name="task"
                            />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="task_desc" className="form-label mb-1">Описание</label>
                            <textarea
                                className="form-control"
                                name="task_desc"
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input me-1"
                                id='urgency'
                                name='urgency'
                                checked={requestContext.request.urgency}
                                onChange={handleChange}
                            />
                            <label htmlFor='kitchen'>Это срочное задание</label>
                        </div>
                        <div className="row h-100">
                            <div className="col-sm-1 d-flex flex-column">
                                <button type="button" className="btn-sm button_calendar" onClick={handleClickCreate}>Создать заявку</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}