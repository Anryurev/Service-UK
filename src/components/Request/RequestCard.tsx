import React, {useEffect, useState} from "react";
import {IObject, IRequest, IRole, IStatus, IUsers} from "../../models";
import api from "../../api";

interface RequestCardProps {
    onClick: () => void
    request: IRequest
    onAssign?: (requestId: number) => void
}

const RequestCard: React.FC<RequestCardProps> = ({onClick, request, onAssign }) => {

    const [role, setRole] = useState<IRole>()
    const [object, setObject] = useState<IObject>()
    const [worker, setWorker] = useState<IUsers>()
    const [status, setStatus] = useState<IStatus>()

    const LoadingData = async () => {
        const responseRole = await api.get(`/Role/${request.role_Id}`)
        const responseObject = await api.get(`/Object/${request.object_Id}`)
        const responseWorker = await api.get(`/Worker/${request.worker_Id}`)
        const responseStatuses = await api.get(`/Status/${request.status}`)
        setRole(responseRole.data)
        setObject(responseObject.data)
        setWorker(responseWorker.data)
        setStatus(responseStatuses.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    // Стили для статуса
    const getStatusClass = () => {
        switch (status?.name) {
            case 'Свободна':
                return 'bg-success text-white';
            case 'Бронь':
                return 'bg-warning text-dark';
            case 'Сдана':
                return 'bg-danger text-white';
            case 'Ремонт/Уборка':
                return 'bg-primary text-white';
            default:
                return 'bg-secondary text-white';
        }
    };

    return (
        <div
            className={`card mb-3 border-start ${request.urgency ? 'border-start-3 border-danger' : 'border-start-3 border-secondary'}`}
            onClick={onClick}
        >
            <div className="card-body">
                {/* Заголовок карточки */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">Задание #{request.request_Id}</h5>
                    {request.urgency && (
                        <span className="badge bg-danger">Срочно</span>
                    )}
                </div>

                {/* Основная информация */}
                <div className="mb-3">
                    <p className="card-text mb-1">
                        <small className="text-muted">Объект:</small> ул. {object?.street}  д. {object?.house}  кв. {object?.apartment}
                    </p>
                    <p className="card-text mb-1">
                        <small className="text-muted">Должность:</small> {role?.name}
                    </p>
                    {request.worker_Id && (
                        <p className="card-text">
                            <small className="text-muted">Исполнитель:</small> {worker?.surname} {worker?.name} {worker?.fathername}
                        </p>
                    )}
                </div>

                {/* Футер карточки */}
                <div className="d-flex justify-content-between align-items-center">
          <span className={`badge ${getStatusClass()} rounded-pill`}>
            {status?.name}
          </span>

                    {!request.worker_Id && onAssign && (
                        <button
                            onClick={() => onAssign(request.request_Id)}
                            className="btn btn-sm btn-outline-primary"
                        >
                            Назначить
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RequestCard