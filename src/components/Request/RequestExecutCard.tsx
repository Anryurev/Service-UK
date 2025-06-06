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
    const [object, setObject] = useState<IObject>()
    const [workers, setWorkers] = useState<IWorkers[]>()

    useEffect(() => {
        const loadData = async () => {
            try {
                const responseObject = await api.get(`/Object/${currentRequest.object_Id}`)
                setObject(responseObject.data)

                if(currentRequest.workers_Id){
                    fetchWorkers(request.workers_Id || [])
                }
            } catch (error) {
                console.error('Error loading data:', error)
            }
        };

        loadData()
    }, [currentRequest])

    const fetchWorkers = async (workers_Id: number[]) => {
        console.log('fetchWorkers')
        const results= await Promise.all(
            workers_Id.map(async workerId => {
                const res = await api.get<IWorkers>(`/Worker/${workerId}`)
                return res.data
            })
        )
        setWorkers(results)
    }

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
        switch(currentRequest.status) {
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
                            {currentRequest.type_Work || "Тип работы не указан"}
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
                        {currentRequest.status}
                    </Badge>
                </div>

                {currentRequest.description && (
                    <Card.Text className="mb-3">
                        <strong>Описание:</strong> {currentRequest.description}
                    </Card.Text>
                )}

                {workers && (
                    <div className="mb-3">
                        <span className="text-muted">Исполнитель: </span>
                        <strong>
                            {workers ? workers.map(worker => (`${worker.surname} ${worker.name} ${worker?.fathername || ''}`))  : 'Для всех работников'}
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
                            disabled={!["Назначено", "Создано", "В процессе"].includes(currentRequest.status)}
                        >
                            <i className="bi bi-play-fill me-1"></i> {currentRequest.status === "3"? "Продолжить" : currentRequest.status === "4"? "Завершено" : "Начать"}
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default RequestExecutCard