import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {useNavigate, useSearchParams} from "react-router-dom";
import api from "../../../api";
import {IObject, IOffice, IRequest, IRole, IWorkers} from "../../../models";
import {Form} from "react-bootstrap";
import RequestCard from "../../../components/Request/RequestCard";
import {useRequest} from "../../../storage/Request/useRequest";

interface TaskCount {
    created: number
    assigned: number
    inProgress: number
    completed: number
    other: number
}

export function RequestObjectPage(){
    const [selectedObject, setSelectedObject] = useState(0)
    const [objectsOffice, setObjectsOffice] = useState<IObject[]>([])
    const [requestsObject, setRequestsObject] = useState<IRequest[]>([])
    const [requests, setRequests] = useState<IRequest[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { getRequestFromLocalStorage, updateRequestObject } = useRequest()
    const request: IRequest = getRequestFromLocalStorage()

    const LoadingData = async () => {
        const responseObject = await api.get(`/Objects/Worker`)
        const responseRequests = await api.get(`/Requests`)
        console.log('requests', requests)
        setRequests(responseRequests.data)
        setObjectsOffice(responseObject.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    useEffect(() => {
        setError(false)
        if (Array.isArray(requests)) {
            const filteredRequests = requests.filter(r => r.object_Id === selectedObject);
            setRequestsObject(filteredRequests);
        } else {
            setRequestsObject([]);
        }
    }, [selectedObject])


    const filteredObjects = objectsOffice.filter((object) =>
        object.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.apartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.status.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const countTasksByStatus = (requests: IRequest[], objectId: number): TaskCount => {
        const counts: TaskCount = {
            created: 0,
            assigned: 0,
            inProgress: 0,
            completed: 0,
            other: 0
        }

        requests
            .filter(request => request.object_Id === objectId)
            .forEach(request => {
                switch(request.status) {
                    case 'Создано': counts.created++; break;
                    case 'Назначено': counts.assigned++; break;
                    case 'В процессе': counts.inProgress++; break;
                    case 'Выполнено': counts.completed++; break;
                    default: counts.other++; break;
                }
            })

        return counts
    }

    const styleItem = (object: IObject) => object.id === objectsOffice.find(obj => obj.id === selectedObject)?.id? "list-group-item border-1 border-success" : "list-group-item border-1"

    const handleClick = () => {
        if(request.object_Id !== 0 && selectedObject === 0){
            navigate(`/request/execut`)
        } else {
            if (selectedObject !== 0){
                setError(false)
                navigate(`/request/execut`)
                updateRequestObject(selectedObject)
            } else {
                setError(true)
            }
        }
    }

    const StatusBadges = ({ counts }: { counts: TaskCount }) => (
        <div className="d-flex gap-1 ms-2">
            {counts.created > 0 && (
                <span className={`badge rounded-pill bg-danger text-white`}>
        {counts.created}
      </span>
            )}
            {counts.assigned > 0 && (
                <span className={`badge rounded-pill bg-primary text-white`}>
        {counts.assigned}
      </span>
            )}
            {counts.inProgress > 0 && (
                <span className={`badge rounded-pill bg-warning text-white`}>
        {counts.inProgress}
      </span>
            )}
            {counts.completed > 0 && (
                <span className={`badge rounded-pill bg-success text-white`}>
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
                    <div>
                        <Form.Group className="mb-4">
                            <Form.Label>Поиск по объектам:</Form.Label>
                            <Form.Control
                                type="text"
                                value={searchQuery}
                                placeholder="Поиск объектов"
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                            >
                            </Form.Control>
                        </Form.Group>

                        <label>Выберите объект</label>
                        {error && <div className="alert alert-danger">Выберите объект!</div>}
                        <ul className="list-group">
                            {filteredObjects.map(object => {
                                const taskCounts = countTasksByStatus(requests, object.id)
                                const totalTasks = Object.values(taskCounts).reduce((a, b) => a + b, 0)

                                return(
                                    <li
                                        className={`${styleItem(object)} d-flex justify-content-between align-items-center`}
                                        aria-current="true"
                                        key={object.id}
                                        onClick={() => setSelectedObject(object.id)}
                                    >
                                        <span>
                                            {'ул. ' + object.street + ' д. ' + object.house + ' кв. ' + object.apartment}
                                        </span>
                                        {totalTasks > 0 && <StatusBadges counts={taskCounts} />}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        {selectedObject !== 0 && requestsObject.length === 0 && <p>Заданий нет</p>}
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
                        Выбрать тип работы
                    </button>
                </footer>
            </div>
        </>
    )
}

