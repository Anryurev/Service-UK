import React, {useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {useLocation, useNavigate} from "react-router-dom";
import api from "../../../api";
import {IObject, IRequest} from "../../../models";
import RequestCard from "../../../components/Request/RequestCard";
import {useRequest} from "../../../storage/Request/useRequest";

export function RequestsPage(){
    const [selectedObject, setSelectedObject] = useState({id: 0, name: "Выберите объект"})
    const [objectsOffice, setObjectsOffice] = useState<IObject[]>([])
    const [requestsObject, setRequestsObject] = useState<IRequest[]>([])
    const [requests, setRequests] = useState<IRequest[]>([])
    const navigate = useNavigate()
    const location = useLocation()
    const { updateRequestObject } = useRequest()

    const LoadingData = async () => {
        try {
            const [responseObject, responseRequests] = await Promise.all([
                api.get(`/Objects/Worker`),
                api.get(`/Requests`)
            ])

            setObjectsOffice(responseObject.data || [])
            setRequests(responseRequests.data || [])
            setRequestsObject(responseRequests.data || [])
        } catch (error) {
            console.error('Error loading data:', error)
        }
    }

    useEffect(() => {
        LoadingData()
    }, [])

    useEffect(() => {
        const { objectId } = location.state || {}
        if(objectId && objectsOffice.length > 0){
            const object = objectsOffice.find(obj => obj.id === objectId)
            if(object){
                setSelectedObject({
                    id: objectId,
                    name: `ул. ${object.street} д. ${object.house}`
                })
            }
        }
    }, [objectsOffice, location.state])

    useEffect(() => {
        const filteredRequests = selectedObject.id === 0
            ? requests
            : requests.filter(r => r.object_Id === selectedObject.id)

        setRequestsObject(filteredRequests || [])
    }, [selectedObject])

    const handleClick = () => {
        const { objectId } = location.state || {}
        const object = objectsOffice.find(obj => obj.id === objectId)
        if (object){
            updateRequestObject(object?.id)
            navigate(`/request/execut`)
        } else{
            console.error("Ошибка при выборае объекта")
        }
    }

    return(
        <>
            <Navbar/>
            <div className="d-flex flex-column min-vh-100 container-sm" style={{paddingTop: '60px'}}>
                <main className="flex-grow-1">
                    {/*Кастомное меню выора*/}
                    <div className="p-3 bg-light sticky-top w-100">
                        <div className="dropdown mb-2">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
                                type="button"
                                id="objectDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedObject.name}
                            </button>
                            <ul className="dropdown-menu w-100" aria-labelledby="objectDropdown">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => setSelectedObject({id: 0, name: "Выберите объект"})}
                                    >
                                        Выберите объект
                                    </button>
                                </li>
                                {objectsOffice.map(object => (
                                    <li key={object.id}>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setSelectedObject({id: object.id, name: 'ул.' + object.street + ' д. ' + object.house})}
                                        >
                                            { 'ул.' + object.street + ' д. ' + object.house }
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <input type="hidden" name="id_Role" value={selectedObject.id}/>
                        </div>
                    </div>
                    <div>
                        {requestsObject.length === 0 && <p>Заданий нет</p>}
                        {requestsObject && <div className="container mt-3">
                            {requestsObject.map(request => (
                                <RequestCard
                                    onClick={() => navigate(`/request/${request.request_Id}`)}
                                    request={request}
                                    key={request.request_Id}
                                />
                            ))}
                        </div>}
                    </div>
                </main>
                <footer className="p-3 bg-light">
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleClick}
                    >
                        Назначить задание на данный объект
                    </button>
                </footer>
            </div>
        </>
    )
}

