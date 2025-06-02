import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {IRequest} from "../../../models";
import {useRequest} from "../../../storage/Request/useRequest";

export function RequestDescriptionPage(){
    const edemContext = useContext(EdembackContext)
    const [description, setDescription] = useState("")
    const [urgency, setUrgency] = useState(false)
    const navigate = useNavigate()
    const { getRequestFromLocalStorage, updateRequestDescription } = useRequest()

    const handleClickCreate = () => {
        updateRequestDescription(description, urgency)
        const request = getRequestFromLocalStorage()
        console.log('create request', request)
        edemContext.createRequest(request)
        navigate('/calendar')
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
                                value={description || ''}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input me-1"
                                id='urgency'
                                name='urgency'
                                checked={urgency || false}
                                onChange={(e) => setUrgency(prev => !prev)}
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