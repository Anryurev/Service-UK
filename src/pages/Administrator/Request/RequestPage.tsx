import React, { useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {useNavigate} from "react-router-dom";
import {IObject, IRequest, IStatus, IWork, IWorkers} from "../../../models";
import {useParams} from "react-router-dom";
import api from "../../../api";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";
import { Container, Card, Badge, ListGroup, Button, Row, Col} from "react-bootstrap";

export function RequestPage() {
    const { requestId } = useParams<{ requestId: string }>()
    const [request, setRequest] = useState<IRequest>()
    const [typeWork, setTypeWork] = useState<IWork>()
    const [object, setObject] = useState<IObject>()
    const [workerRequest, setWorkerRequest] = useState<IWorkers>()
    const [status, setStatus] = useState<IStatus>()
    const {worker, role} = getAuthDataFromLocalStorage()
    const navigate = useNavigate()

    const LoadingData = async (request: IRequest) => {
        const responseTypeWork = await api.get(`/TypeWork/${request.type_Work}`)
        console.log('typeWork', responseTypeWork.data)
        const responseObject = await api.get(`/Object/${request.object_Id}`)
        if(request.workers_Id?.includes(worker? worker?.id : -1)){
            const responseWorker = await api.get(`/Worker/${request.workers_Id}`)
            setWorkerRequest(responseWorker.data)
        }
        const responseStatuses = await api.get(`/Status_Request/${request.status}`)
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

        fetchResponse()
    }, [])


    const removeClick = async (request_Id: number | undefined) => {
        await api.delete(`/Request/${request_Id}`)
    }

    const updateRequestStatus = async (newStatus: IStatus) => {
        try {
            console.log('newStatus', newStatus)
            await api.patch(`/ChangeStatusRequest/${request?.request_Id}?status=${newStatus.name}`)
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error)
        }
    }

    const getStatusBadge = () => {
        console.log(status)
        switch(status?.name) {
            case "Создано": return "danger"
            case "Назначено": return "primary"
            case "В процессе": return  "warning"
            case "Выполнено": return "success"
            default: return "secondary"
        }
    }

    const statusBadge = getStatusBadge()

    return (
        <>
            <Navbar />
            <Container className="mt-4" style={{ paddingTop: '60px' }}>
                <Card className="shadow-sm">
                    <Card.Header className="bg-white border-bottom-0">
                        <Row className="align-items-center">
                            <Col>
                                <h2 className="mb-0">
                                    <strong>Задание:</strong> {typeWork?.name}
                                </h2>
                            </Col>
                            <Col xs="auto">
                                <Badge
                                    bg={request?.urgency ? "danger" : "secondary"}
                                    className="fs-6"
                                >
                                    {request?.urgency ? "Срочно" : "Не срочно"}
                                </Badge>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush" className="mb-4">
                                    <ListGroup.Item className="d-flex">
                                        <span className="fw-bold me-2" style={{ minWidth: '100px' }}>Объект:</span>
                                        <span>
                                          ул. {object?.street}, д. {object?.house}, кв. {object?.apartment}
                                        </span>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex">
                                        <span className="fw-bold me-2" style={{ minWidth: '100px' }}>Должность:</span>
                                        {typeWork?.roles.map(role => (<span key={role.role_Id}>{role.name} </span>))}
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex">
                                        <span className="fw-bold me-2" style={{ minWidth: '100px' }}>Работник:</span>
                                        <span>
                                          {worker ? `${worker.surname} ${worker.name} ${worker?.fathername || ''}` : 'Для всех работников'}
                                        </span>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex">
                                        <span className="fw-bold me-2" style={{ minWidth: '100px' }}>Статус:</span>
                                        <Badge bg={statusBadge} className="align-self-center">
                                            {status?.name}
                                        </Badge>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <div className="fw-bold mb-2">Описание:</div>
                                        <div className="border rounded p-3 bg-light">
                                            {request?.description || "Описание отсутствует"}
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>

                                {/* Блок для фотографий */}
                                {request?.photos && request.photos.length > 0 && (
                                    <div className="mb-4">
                                        <h5 className="fw-bold mb-3">Фотографии</h5>
                                        <div className="d-flex flex-wrap gap-3">
                                            {request.photos.map((photo, index) => (
                                                <img
                                                    key={index}
                                                    src={`/images/${photo.url}`}
                                                    alt={`Фото задания ${index + 1}`}
                                                    className="img-thumbnail"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>

                        {/* Кнопки действий */}
                        <div className="d-flex justify-content-between mt-4">
                            {role?.levelImportant && role.levelImportant < 4 ? (
                                <>
                                    <Button variant="outline-primary" size="sm">
                                        Редактировать
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => {
                                            request && removeClick(request.request_Id)
                                            navigate(`/request/object`)
                                        }}
                                    >
                                        Отменить задание
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateRequestStatus({ id_status: 3, name: "В процессе" });
                                        navigate(`/execut/report/${requestId}`);
                                    }}
                                >
                                    Перейти к выполнению задания
                                </Button>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}