import React, {useEffect} from "react";
import {IReport} from "../../models";

interface ReportCardProps {
    report: IReport
}

export const ReportCard = ({report} : ReportCardProps) => {
    useEffect(() => {
        console.log('report in card', report)
    })


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
            <div className="card report-card mb-3" key={report.id_Report}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">Отчет #{report.id_Report}</span>
                    <span className={`badge ${getStatusBadgeClass(report.status)}`}>
                        {report.status}
                    </span>
                </div>

                <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                        <div>
                            <h6 className="card-title mb-1">
                                <i className="bi bi-person-circle me-2"></i>
                                Исполнитель: #{report.worker_Id}
                            </h6>
                            <h6 className="card-subtitle text-muted">
                                <i className="bi bi-journal-text me-2"></i>
                                Задание: #{report.request_Id}
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
                                        Параметр #{param.add_parametr_id}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="card-footer bg-transparent">
                    <button className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-eye"></i> Подробнее
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-download"></i> Скачать
                    </button>
                </div>
            </div>
        </>
    )
}