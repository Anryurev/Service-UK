import React, {useEffect, useState} from "react";
import {Alert, Badge, Card, ListGroup, Spinner, Image} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {IReport} from "../../models";
import {Navbar} from "../../components/Navbar";
import api from "../../api";

const ReportPage: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const [report, setReport] = useState<IReport | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true)
                // Замените на ваш реальный API-запрос
                const response = await api.get(`/Report/${reportId}`)
                console.log('report', response.data)
                setReport(response.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка')
            } finally {
                setLoading(false)
            }
        }

        fetchReport()
    }, [reportId])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Завершено':
                return 'success';
            case 'В работе':
                return 'warning';
            case 'Отклонено':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if (error) {
        return (
            <>
                <Navbar/>
                <div className="container mt-4" style={{paddingTop: '65px'}}>
                    <Alert variant="danger">{error}</Alert>
                </div>
            </>
        )
    }

    if (!report) {
        return (
            <div className="container mt-4">
                <Alert variant="info">Отчет не найден</Alert>
            </div>
        )
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-4" style={{paddingTop: '65px'}}>
                <Card className="mb-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <h2>Отчет #{report.id_Report}</h2>
                        <Badge bg={getStatusBadge(report.status)} pill>
                            {report.status}
                        </Badge>
                    </Card.Header>

                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>ID задания:</strong> {report.request_Id}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>ID исполнителя:</strong> {report.worker_Id}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Дата и время:</strong> {new Date(report.dateTime).toLocaleString()}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Описание:</strong>
                                <div className="mt-2">{report.description || 'Описание отсутствует'}</div>
                            </ListGroup.Item>
                        </ListGroup>

                        {/* Блок с фотографиями */}
                        {report.photos.length > 0 && (
                            <div className="mt-4">
                                <h5>Фотографии</h5>
                                <div className="d-flex flex-wrap gap-3">
                                    {report.photos.map((photo) => (
                                        <div key={photo.id_photo} className="photo-thumbnail">
                                            <Image
                                                src={`/images/${photo.url}`}
                                                alt={`Фото отчета ${report.id_Report}`}
                                                thumbnail
                                                className="report-photo"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Блок с дополнительными параметрами */}
                        {report.add_Parametrs && report.add_Parametrs.length > 0 && (
                            <div className="mt-4">
                                <h5>Дополнительные параметры</h5>
                                <ListGroup>
                                    {report.add_Parametrs.map((param) => (
                                        <ListGroup.Item key={param.id_report_parametr}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Параметр #{param.add_parametr_id}</span>
                                                {param.value ? (
                                                    <Badge bg="success">Выполнено</Badge>
                                                ) : (
                                                    <Badge bg="danger">Не выполнено</Badge>
                                                )}
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default ReportPage