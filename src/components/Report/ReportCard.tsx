import React, {useEffect, useState} from "react";
import {IReport, IRequest, IWork, IWorkers} from "../../models";
import api from "../../api";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";

interface ReportCardProps {
    report: IReport
    onClick: (reportId: number) => void,
}

export const ReportCard = ({report, onClick} : ReportCardProps) => {
    const [workerReport, setWorkerReport] = useState<IWorkers | null>(null)
    const [request, setRequest] = useState<IRequest>()
    const {worker, role} = getAuthDataFromLocalStorage()

    const LoadingData = async () => {
        const responseRequest = await api.get(`/Request/${report.request_Id}`)
        console.log('request in report', responseRequest.data)
        setRequest(responseRequest.data)
    }

    useEffect(() => {
        LoadingData()
        console.log('report', report)
    }, [])

    useEffect(() => {
        const fetchWorkers = async () => {
            if(role?.levelImportant === 4){
                setWorkerReport(worker)
            }else{
                const response = await api.get(`/Worker/${report.worker_Id}`)
                setWorkerReport(response.data)
            }
        }
        fetchWorkers()
    }, [request])

    function getStatusBadgeClass(status: string) {
        switch (status) {
            case 'Выполнено':
                return 'bg-success';
            case 'В процессе':
                return 'bg-warning text-dark';
            default:
                return 'bg-secondary';
        }
    }

    return (
        <>
            <div className="card report-card mb-3" key={report.id_Report} onClick={(e) => {
                e.stopPropagation()
                onClick(report.id_Report)
            }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">Отчет #{report.id_Report}</span>
                    <span className={`badge ${getStatusBadgeClass(report.status)}`}>
                        {report.status}
                    </span>
                </div>

                <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                        <div>
                            {workerReport && (
                                <div className="mb-3">
                                    <span className="text-muted">Исполнитель: </span>
                                    <strong>
                                        {workerReport ? `${workerReport.surname} ${workerReport.name} ${workerReport?.fathername}` : 'Работник не найден'}
                                    </strong>
                                </div>
                            )}
                            <h6 className="card-subtitle text-muted">
                                <i className="bi bi-journal-text me-2"></i>
                                Задание: {request?.type_Work}
                            </h6>
                        </div>

                        <div className="text-end">
                            <small className="text-muted">
                                <i className="bi bi-clock me-1"></i>
                                {new Date(report.dateTime).toLocaleString()}
                            </small>
                        </div>
                    </div>

                    <p className="card-text mt-3">
                        <i className="bi bi-card-text me-2"></i>
                        {report.description || "Описание отсутствует"}
                    </p>

                    {report.add_Parametrs && report.add_Parametrs.length > 0 && (
                        <div className="mt-3">
                            <h6 className="fw-bold">
                                <i className="bi bi-list-check me-2"></i>
                                Доп. параметры:
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                                {report.add_Parametrs.map(param => (
                                    <span key={param.id_report_parametr} className="badge bg-light text-dark">
                                      {param.value ? (
                                          <i className="bi bi-check-circle-fill text-success me-1"></i>
                                      ) : (
                                          <i className="bi bi-x-circle-fill text-danger me-1"></i>
                                      )}
                                        {param.add_Parametr_Id}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="card-footer bg-transparent">
                    <button className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-eye"></i>
                        Подробнее
                    </button>
                </div>
            </div>
        </>
    )
}