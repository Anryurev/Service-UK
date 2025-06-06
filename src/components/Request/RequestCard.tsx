import React, {useEffect, useState} from "react";
import {IObject, IRequest, IRole, IStatus, IWork, IWorkers, RoleItem} from "../../models";
import api from "../../api";

interface RequestCardProps {
    onClick: () => void
    request: IRequest
    onAssign?: (requestId: number) => void
}

const RequestCard: React.FC<RequestCardProps> = ({onClick, request, onAssign }) => {

    // const [typeWork, setTypeWork] = useState<IWork>()
    const [object, setObject] = useState<IObject>()
    const [worker, setWorker] = useState<IWorkers>()
    const [status, setStatus] = useState<IStatus>()
    const [roles, setRoles] = useState<IRole[]>([])

    const LoadingData = async () => {
        console.log('request in request card', request)
        const responseObject = await api.get(`/Object/${request.object_Id}`)
        fetchRoles(request.roles_Id || [])
        if(request.workers_Id){
            const responseWorker = await api.get(`/Worker/${request.workers_Id}`)
            setWorker(responseWorker.data)
        }
        setObject(responseObject.data)
    }

    const fetchRoles = async (roleItems: RoleItem[]) => {
        const results = await Promise.all(
            roleItems.map(async (item) => {
                const res = await api.get<IRole>(`/Role/${item.role}`)
                return res.data
            })
        )
        setRoles(results)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    // Стили для статуса
    const getStatusClass = () => {
        switch (request.status) {
            case 'Создано':
                return 'bg-danger text-white'
            case 'Назначено':
                return 'bg-primary text-white'
            case 'В процессе':
                return 'bg-warning text-white'
            case 'Выполнено':
                return 'bg-success text-white'
            default:
                return 'bg-secondary text-white'
        }
    }

    return (
        <div
            className={`card mb-3 border-start ${request.urgency ? 'border-start-3 border-danger' : 'border-start-3 border-secondary'}`}
            onClick={onClick}
        >
            <div className="card-body">
                {/* Заголовок карточки */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">Задание: {request.type_Work}</h5>
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
                        <small className="text-muted">Должность:</small> {roles.map(role => (<span key={role.role_Id}>{role.name} </span>))}
                    </p>
                    {request.workers_Id && (
                        <p className="card-text">
                            <small className="text-muted">Исполнитель:</small> {worker?.surname} {worker?.name} {worker?.fathername}
                        </p>
                    )}
                </div>

                {/* Футер карточки */}
                <div className="d-flex justify-content-between align-items-center">
          <span className={`badge ${getStatusClass()} rounded-pill`}>
            {request.status}
          </span>

                    {!request.workers_Id && onAssign && (
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