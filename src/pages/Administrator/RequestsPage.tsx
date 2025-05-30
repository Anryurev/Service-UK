import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import api from "../../api";
import {IObject, IOffice, IRequest, IRole, IWorkers} from "../../models";
import {Form} from "react-bootstrap";
import {RequestContext} from "../../context/requestContext/RequestContext";
import RequestCard from "../../components/Request/RequestCard";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";

interface TaskCount {
    created: number
    assigned: number
    inProgress: number
    completed: number
    other: number
}

export function RequestsPage(){
    const [selectedObject, setSelectedObject] = useState({id: 0, name: "Выберите объект"})
    const [objectsOffice, setObjectsOffice] = useState<IObject[]>([])
    const [requestsObject, setRequestsObject] = useState<IRequest[]>([])
    const [requests, setRequests] = useState<IRequest[]>([])
    const requestContext = useContext(RequestContext)
    const navigate = useNavigate()
    const location = useLocation();

    const LoadingData = async () => {
        try {
            const {worker} = getAuthDataFromLocalStorage();
            const officeId = worker?.id_Office;
            const [responseObject, responseRequests] = await Promise.all([
                api.get(`/Objects?Office=${officeId}`),
                api.get(`/Requests?Office=${officeId}`)
            ]);

            setObjectsOffice(responseObject.data || []);
            setRequests(responseRequests.data || []);
            setRequestsObject(responseRequests.data || []);
        } catch (error) {
            console.error('Error loading data:', error);
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
        if (requestContext?.request) {
            const updatedRequest = { ...requestContext.request, object_Id: selectedObject.id }
            requestContext.setRequest(updatedRequest)
        }

        const filteredRequests = selectedObject.id === 0
            ? requests
            : requests.filter(r => r.object_Id === selectedObject.id)

        setRequestsObject(filteredRequests || [])
    }, [selectedObject])

    const handleClick = () => {
        console.log('request objectPage', requestContext.request)
        navigate(`/request/execut`)
    }

    const StatusBadges = ({ counts }: { counts: TaskCount }) => (
        <div className="d-flex gap-1 ms-2">
            {counts.created > 0 && (
                <span className={`badge rounded-pill bg-success text-white`}>
        {counts.created}
      </span>
            )}
            {counts.assigned > 0 && (
                <span className={`badge rounded-pill bg-warning text-dark`}>
        {counts.assigned}
      </span>
            )}
            {counts.inProgress > 0 && (
                <span className={`badge rounded-pill bg-danger text-white`}>
        {counts.inProgress}
      </span>
            )}
            {counts.completed > 0 && (
                <span className={`badge rounded-pill bg-primary text-white`}>
        {counts.completed}
      </span>
            )}
            {counts.other > 0 && (
                <span className={`badge rounded-pill bg-secondary text-white`}>
        {counts.other}
      </span>
            )}
        </div>
    )

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
                        Далее
                    </button>
                </footer>
            </div>
        </>
    )
}

