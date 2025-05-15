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
        console.log('request descPage', requestContext.request)

        edemContext.createRequest(requestContext.request)
        navigate('/calendar')
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked

        requestContext.setRequest({
            ...requestContext.request,
            [name]: type === 'checkbox' ? checked : value
        })
    }
    return(
        <>
            <Navbar/>
            <div className="d-flex flex-column min-vh-100 container-sm" style={{paddingTop: '60px'}}>
                <main className="flex-grow-1">
                    <div className="col-sm-6 border-black border-3">
                        <div className="mb-1">
                            <label htmlFor="description" className="form-label mb-1">Описание</label>
                            <textarea
                                rows={10}
                                className="form-control"
                                name="description"
                                value={requestContext.request.description || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input me-1"
                                id='urgency'
                                name='urgency'
                                checked={requestContext.request.urgency || false}
                                onChange={handleChange}
                            />
                            <label htmlFor='urgency'>Это срочное задание</label>
                        </div>
                    </div>
                </main>
                <footer className="p-3 bg-light">
                    <div className="col-sm-1 d-flex flex-column">
                        <button type="button" className="btn-sm button_calendar" onClick={handleClickCreate}>Создать заявку</button>
                    </div>
                </footer>
            </div>
        </>
    )
}