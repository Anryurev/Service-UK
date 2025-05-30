import React, {useEffect, useState} from "react";
import {IObject, IRequest, IStatus, IWork, IWorkers} from "../../models";
import {Badge, Button, Card, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {log} from "util";
import api from "../../api";
import RequestCard from "./RequestCard";

interface RequestCardProps {
    onClick: () => void
    request: IRequest
    onAssign?: (requestId: number) => void
}

const         RequestExecutCard: React.FC<RequestCardProps> = ({onClick, request, onAssign }) => {
    const navigate = useNavigate()
    const [currentRequest, setCurrentRequest] = useState<IRequest>(request)
    const [typeWork, setTypeWork] = useState<IWork>()
    const [object, setObject] = useState<IObject>()
    const [worker, setWorker] = useState<IWorkers>()
    const [status, setStatus] = useState<IStatus>()

    useEffect(() => {
        const loadData = async () => {
            try {
                console.log('currentRequest.status', currentRequest.status)
                const [typeWorkRes, objectRes, statusRes] = await Promise.all([
                    api.get(`/TypeWork/${currentRequest.type_Work}`),
                    api.get(`/Object/${currentRequest.object_Id}`),
                    api.get(`/Status_Request/${currentRequest.status}`),
                ]);

                setTypeWork(typeWorkRes.data)
                console.log('asdsd', objectRes.data)
                setObject(objectRes.data)
                setStatus(statusRes.data)

                console.log('status', statusRes.data)

                if (currentRequest.worker_Id) {
                    const workerRes = await api.get(`/Worker/${currentRequest.worker_Id}`)
                    setWorker(workerRes.data)
                }
            } catch (error) {
                console.error('Error loading data:', error)
            }
        };

        loadData()
    }, [currentRequest])

    const updateRequestStatus = async (newStatus: IStatus) => {
        try {
            console.log('newStatus', newStatus)
            await api.patch(`/ChangeStatusRequest/${currentRequest.request_Id}?status=${newStatus.name}`)
            setCurrentRequest(prev => ({
                ...prev,
                status: String(newStatus.id_status)
            }))
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error)
        }
    }

    const getStatusBadge = () => {
        switch(status?.name) {
            case "Создано": return "danger"
            case "Назначено": return "primary"
            case "В процессе": return  "warning"
            case "Выполнено": return "success"
            default: return "secondary"
        }
    }

    const statusBadge = getStatusBadge()

    return(
        <Card className="mb-3 shadow-sm hover-shadow" onClick={onClick} style={{ cursor: 'pointer' }}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <Card.Title className="mb-1">
                            {typeWork?.name || "Тип работы не указан"}
                            {currentRequest.urgency && (
                                <Badge bg="danger" className="ms-2">
                                    Срочно!
                                </Badge>
                            )}
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {object? `Объект: ${object?.street} ${object?.house} кв. ${object?.apartment}` : 'Объект не указан'}
                        </Card.Subtitle>
                    </div>
                    <Badge pill bg={statusBadge} className="align-self-center">
                        {status?.name}
                    </Badge>
                </div>

                {currentRequest.description && (
                    <Card.Text className="mb-3">
                        <strong>Описание:</strong> {currentRequest.description}
                    </Card.Text>
                )}

                {worker && (
                    <div className="mb-3">
                        <span className="text-muted">Исполнитель: </span>
                        <strong>
                            {worker.surname} {worker.name} {worker.fathername}
                        </strong>
                    </div>
                )}

                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                updateRequestStatus({id_status: 3, name: "В процессе"})
                                navigate(`/execut/report/${request.request_Id}`)
                            }}
                            disabled={!["1", "2", "3"].includes(currentRequest.status)}
                        >
                            <i className="bi bi-play-fill me-1"></i> {currentRequest.status === "3"? "Продолжить" : "Начать"}
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default RequestExecutCard