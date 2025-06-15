import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IWork} from "../../../models";
import api from "../../../api";
import {Navbar} from "../../../components/Navbar";
import {SidebarMenu} from "../../../components/SidebarMenu";

export function WorkPage(){
    const { workId } = useParams<{ workId: string }>()
    const navigate = useNavigate()

    const edemContext = useContext(EdembackContext)
    const [error, setError] = useState(false)
    const [work, setWork] = useState<IWork>({
        id_Work: 0,
        name: "",
        roles: [],
        roles_Id: [],
    })

    const LoadingData = async () => {
        const response = await api.get(`/TypeWork/${workId}`)
        if(response.data){
            setWork(response.data)
            console.log('work', response.data)
        }
        else{
            setError(true)
        }
    }

    useEffect(() => {
        if(workId) LoadingData()
    }, [workId])

    const removeClick = (workId: number) => {
        // navigate(`/roles`)
        // edemContext.deleteRole(roleId)
    }

    if(error){
        return (<h1>Тип работы не найден</h1>)
    }

    return (
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container" style={{paddingTop: "60px"}}>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card custom-card shadow-lg">
                                <div className="card-header text-white" style={{background: "#a3cef1"}}>
                                    <h3 className="card-title mb-0">Информация о типе работ</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1">
                                                <strong>{work.name}</strong>
                                            </h5>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <h6 className="mb-0">Должности для данного типа работ</h6>
                                        <ul className="list-group list-group-flush">
                                            {work.roles.map((role, index) => (
                                                <li className="list-group-item" key={role.role_Id}>
                                                    <span>{role.name}</span>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                    <div
                                        className="card-footer bg-light d-flex justify-content-between align-items-center">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => navigate(`/work/${workId}`)}
                                        >Редактировать</button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => removeClick(work.id_Work)}
                                        >Удалить
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}