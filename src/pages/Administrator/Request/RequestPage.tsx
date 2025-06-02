import React, {useContext, useEffect, useState} from "react";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {Navbar} from "../../../components/Navbar";
import RequestCard from "../../../components/Request/RequestCard";
import {useNavigate, useSearchParams} from "react-router-dom";
import {IObject, IRequest, IRole, IStatus, IWork, IWorkers} from "../../../models";
import {useParams} from "react-router-dom";
import api from "../../../api";

export function RequestPage() {
    const { requestId } = useParams<{ requestId: string }>()
    const [request, setRequest] = useState<IRequest>()
    const [typeWork, setTypeWork] = useState<IWork>()
    const [object, setObject] = useState<IObject>()
    const [worker, setWorker] = useState<IWorkers>()
    const [status, setStatus] = useState<IStatus>()

    const LoadingData = async (request: IRequest) => {
        const responseTypeWork = await api.get(`/TypeWork/${request.type_Work}`)
        const responseObject = await api.get(`/Object/${request.object_Id}`)
        if(request.worker_Id){
            const responseWorker = await api.get(`/Worker/${request.worker_Id}`)
            setWorker(responseWorker.data)
        }
        const responseStatuses = await api.get(`/Status/${request.status}`)
        setTypeWork(responseTypeWork.data)
        setObject(responseObject.data)
        setStatus(responseStatuses.data)
    }

    useEffect(() => {
        if (request) LoadingData(request)
    }, [request])

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await api.get(`/Request/${requestId}`)
            setRequest(response.data)
        }

        fetchResponse();
    }, [])


    const removeClick = async (request_Id: number | undefined) => {
        const response = await api.delete(`/Request/${request_Id}`)
    }

    return (
        <>
            <Navbar/>
            <div className="container" style={{paddingTop: "60px"}}>
                <h3 className="mb-0">Информация о задании</h3>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-sm-8 text-center d-flex align-items-center">
                            <h5 className="mb-1">
                                <strong>Задание: </strong> {typeWork?.name}
                            </h5>
                        </div>

                        <div className="col-sm-8">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Объект: </strong>{'ул. ' + object?.street + ' д. ' + object?.house + ' кв. ' + object?.apartment}
                                </li>
                                <li className="list-group-item">
                                    <strong>Должность: </strong>{typeWork?.name}
                                </li>
                                <li className="list-group-item">
                                    <strong>Работник: </strong>{worker? worker.surname + ' ' + worker.name + ' ' + worker?.fathername : 'Для всех работников'}
                                </li>
                                <li className="list-group-item">
                                    <strong>Срочность: </strong>{request?.urgency ? "Срочно" : "Не срочно"}
                                </li>
                                <li className="list-group-item">
                                    <strong>Статус:</strong> {status?.name}
                                </li>
                                <li className="list-group-item">
                                    <strong>Описание:</strong> {request?.description}
                                </li>
                            </ul>
                            <div>
                                {/*{request?.photos.map(photo)}*/}
                            </div>
                        </div>
                        <div
                            className="d-flex justify-content-between align-items-center mt-3">
                            <button className="btn btn-sm btn-outline-primary">Редактировать</button>
                            <button className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeClick(request?.request_Id)}
                            >Отмеинть задание
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}