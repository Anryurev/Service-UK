import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate, useSearchParams} from "react-router-dom";
import api from "../../api";
import {IObject, IOffice, IRequest, IRole, IUsers} from "../../models";
import {Form} from "react-bootstrap";
import {RequestContext} from "../../context/requestContext/RequestContext";
import RequestCard from "../../components/Request/RequestCard";

export function RequestObjectPage(){
    const [selectedObject, setSelectedObject] = useState(0)
    const [objectsOffice, setObjectsOffice] = useState<IObject[]>([])
    const [requests, setRequests] = useState<IRequest[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [objectsCard, setObjectsCard] = useState<Record<number, IObject>>({});
    const edemContext = useContext(EdembackContext)
    const requestContext = useContext(RequestContext)
    const navigate = useNavigate()

    const LoadingData = async () => {
        const response = await api.get(`/Objects`)
        await edemContext.getAllRequests()
        console.log('requests', edemContext.state.requests)
        setObjectsOffice(response.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    useEffect(() => {
        if (requestContext?.request) {
            const updatedRequest = { ...requestContext.request, object_Id: selectedObject }
            requestContext.setRequest(updatedRequest)
        }
        console.log('type of requests', typeof edemContext?.state?.requests)

        if (Array.isArray(edemContext?.state?.requests)) {
            const filteredRequests = edemContext.state.requests.filter(r => r.object_Id === selectedObject);
            setRequests(filteredRequests);
        } else {
            setRequests([]);
        }

        console.log('requestContext ', requestContext?.request)
    }, [selectedObject])


    const filteredObjects = objectsOffice.filter((object) =>
        object.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.apartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.status.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const styleItem = (object: IObject) => object.id === objectsOffice.find(obj => obj.id === selectedObject)?.id? "list-group-item border-1 border-success" : "list-group-item border-1"

    const handleClick = () => {
        navigate(`/request/execut`)
    }

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
                            {filteredObjects.map(object => (
                                <li
                                    className={styleItem(object)}
                                    aria-current="true"
                                    key={object.id}
                                    onClick={() => {
                                        // TODO Реализовать изменение цвета li работника при нажатии
                                        setSelectedObject(object.id)
                                    }}
                                >
                                    {'ул. ' + object.street + ' д. ' + object.house + ' кв. ' + object.apartment}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        {requests.length === 0 && <p>Заданий нет</p>}
                        {requests && <div className="container mt-3">
                            {requests.map(request => (
                                <RequestCard
                                    onClick={() => navigate(`/request/${request.request_Id}`)}
                                    request={request}
                                    key={request.request_Id}
                                />
                            ))}
                        </div>}
                    </div>
                </main>
                <footer className="p-3 bg-light fixed-bottom">
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