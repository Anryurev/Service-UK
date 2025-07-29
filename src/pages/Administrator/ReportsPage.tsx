import React, {useEffect, useState} from "react";
import {IReport} from "../../models";
import api from "../../api";
import {Navbar} from "../../components/Navbar";
import {SidebarMenu} from "../../components/SidebarMenu";
import {SidebarOptions} from "../../components/SidebarOptions";
import {Form} from "react-bootstrap";
import {ObjectNote} from "../../components/Object/ObjectNote";
import {ReportCard} from "../../components/Report/ReportCard";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";
import {useNavigate} from "react-router-dom";

export function ReportsPage() {
    const [reports, setReports] = useState<IReport[]>([])
    const {worker, role} = getAuthDataFromLocalStorage()
    const navigate = useNavigate()

    const LoadingData = async () => {
        try {
            const response = await api.get(`/Report${role?.levelImportant === 4 ? "/Worker" : ""}`)
            const sortedReports = response.data.sort((a: IReport, b: IReport) => {
                return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
            })

            setReports(sortedReports);
        } catch (error) {
            console.error("Ошибка при загрузке отчетов:", error);
        }
    };

    useEffect(() => {
        LoadingData()
    }, [])

    return (
        <>
            <Navbar/>
            <div className="container-fluid" style={{paddingTop: '65px'}}>
                <h1>Список отчетов</h1>
                { reports.length > 0? reports.map(report =>
                        <ReportCard
                            key={report.id_Report}
                            report={report}
                            onClick={(reportId) => navigate(`/reports/${reportId}`)} />
                ) :
                    <div className="alert alert-danger">Готовые отчеты отсутствуют</div>}
            </div>
        </>
    )
}