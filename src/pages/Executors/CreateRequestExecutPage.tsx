import React, {useContext, useState} from "react";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {IRequest} from "../../models";
import {useNavigate} from "react-router-dom";
import {Navbar} from "../../components/Navbar";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";

export function CreateRequestExecutPage(){
    const edemContext = useContext(EdembackContext)
    const {worker} = getAuthDataFromLocalStorage()
    const [request, setRequest] = useState<IRequest>({
        request_Id: -1,
        type_Work: "Администратор",
        description: "",
        roles_Id: null,
        object_Id: 0,
        status: "",
        urgency: false,
        admin_Id: worker? worker.id : 0,
        photos: []
    })
    const navigate = useNavigate()

    const handleClickCreate = () => {
        console.log('обратный request', request)
        edemContext.createRequest(request)
        navigate('/execut')
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked

        setRequest({
            ...request,
            [name]: type === 'checkbox' ? checked : value
        })
    }
    return(
        <>
            <Navbar/>
            <div className="d-flex flex-column min-vh-100 container-sm" style={{paddingTop: '63px'}}>
                <main className="flex-grow-1">
                    <div className="col-sm-6 border-black border-3">
                        <div className="mb-1">
                            <label htmlFor="description" className="form-label mb-1">Описание</label>
                            <textarea
                                rows={10}
                                className="form-control"
                                name="description"
                                value={request.description || ''}
                                onChange={handleChange}
                            />
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