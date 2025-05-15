import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate, useSearchParams} from "react-router-dom";
import api from "../../api";
import {IObject, IOffice, IRequest, IRole, IWorkers} from "../../models";
import {Form} from "react-bootstrap";
import {RequestContext} from "../../context/requestContext/RequestContext";
import RequestCard from "../../components/Request/RequestCard";

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
    // const [objectsCard, setObjectsCard] = useState<Record<number, IObject>>({});
    // const edemContext = useContext(EdembackContext)
    const requestContext = useContext(RequestContext)
    const navigate = useNavigate()

    const LoadingData = async () => {
        const responseObject = await api.get(`/Objects`)
        const responseRequests = await api.get(`/Requests`)
        console.log('requests', requests)
        setRequests(responseRequests.data)
        setObjectsOffice(responseObject.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    useEffect(() => {
        if (requestContext?.request) {
            const updatedRequest = { ...requestContext.request, object_Id: selectedObject }
            requestContext.setRequest(updatedRequest)
        }

        if (Array.isArray(requests)) {
            const filteredRequests = requests.filter(r => r.object_Id === selectedObject);
            setRequestsObject(filteredRequests);
        } else {
            setRequestsObject([]);
        }

        console.log('requestContext ', requestContext?.request)
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
                    case '1': counts.created++; break;
                    case '2': counts.assigned++; break;
                    case '3': counts.inProgress++; break;
                    case '4': counts.completed++; break;
                    default: counts.other++; break;
                }
            })

        return counts
    }

    const styleItem = (object: IObject) => object.id === objectsOffice.find(obj => obj.id === selectedObject)?.id? "list-group-item border-1 border-success" : "list-group-item border-1"

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
    );

    return(
        <>
            <Navbar/>
            <div className="d-flex flex-column min-vh-100 container-sm" style={{paddingTop: '60px'}}>
                <main className="flex-grow-1">

                    {/*Кастомное меню выора*/}
                    {/*<div className="p-3 bg-light fixed-top" style={{marginTop: '56px'}}>*/}
                    {/*    <div className="dropdown mb-2">*/}
                    {/*        <button*/}
                    {/*            className="btn btn-outline-secondary dropdown-toggle w-100 text-start"*/}
                    {/*            type="button"*/}
                    {/*            id="officeDropdown"*/}
                    {/*            data-bs-toggle="dropdown"*/}
                    {/*            aria-expanded="false"*/}
                    {/*        >*/}
                    {/*            {selectedOffice.name}*/}
                    {/*        </button>*/}
                    {/*        <ul className="dropdown-menu w-100" aria-labelledby="officeDropdown">*/}
                    {/*            <li>*/}
                    {/*                <button*/}
                    {/*                    className="dropdown-item"*/}
                    {/*                    type="button"*/}
                    {/*                    onClick={() => setSelectedOffice({id: 0, name: "Выберите офис"})}*/}
                    {/*                >*/}
                    {/*                    Выберите офис*/}
                    {/*                </button>*/}
                    {/*            </li>*/}
                    {/*            {offices.map(office => (*/}
                    {/*                <li key={office.office_Id}>*/}
                    {/*                    <button*/}
                    {/*                        className="dropdown-item"*/}
                    {/*                        type="button"*/}
                    {/*                        onClick={() => setSelectedOffice({id: office.office_Id, name: 'ул.' + office.street + ' д. ' + office.house})}*/}
                    {/*                    >*/}
                    {/*                        { 'ул.' + office.street + ' д. ' + office.house }*/}
                    {/*                    </button>*/}
                    {/*                </li>*/}
                    {/*            ))}*/}
                    {/*        </ul>*/}
                    {/*        <input type="hidden" name="id_Role" value={selectedOffice.id}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

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
                        <ul className="list-group">
                            {filteredObjects.map(object => {
                                const taskCounts = countTasksByStatus(requests, object.id);
                                const totalTasks = Object.values(taskCounts).reduce((a, b) => a + b, 0);

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

