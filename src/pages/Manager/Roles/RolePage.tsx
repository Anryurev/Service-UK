import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IRole} from "../../../models";
import api from "../../../api";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {log} from "util";

export function RolePage(){
    const { roleId } = useParams<{ roleId: string }>()

    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)
    const [error, setError] = useState(false)
    const [role, setRole] = useState<IRole>({
        role_Id: 0,
        name: "",
        salary: 0, // оклад
        add_Parametrs: [],
        levelImportant: 0
    })

    const LoadingData = async () => {
        const response = await api.get(`/Role/${roleId}`)
        if(response.data){
            setRole(response.data)
            console.log('role', response.data)
        }
        else{
            setError(true)
        }
    }

    useEffect(() => {
        if(roleId) LoadingData()
    }, [roleId])

    const removeClick = (roleId: number) => {
        navigate(`/roles`)
        edemContext.deleteRole(roleId)
    }

    if(error){
        return (<h1>Должность не найдена</h1>)
    }

    return (
        <>
            <Navbar/>
            <div className="container" style={{paddingTop: "60px"}}>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card custom-card shadow-lg">
                                <div className="card-header text-white" style={{background: "#a3cef1"}}>
                                    <h3 className="card-title mb-0">Информация о должности</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1">
                                                <strong>{role.name}</strong>
                                            </h5>
                                        </div>

                                        <div className="col-md-8">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <strong>Оплата: </strong>{role.salary}
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mb-2">
                                            {role.add_Parametrs && <h6>Доплнительные параметры для должности</h6>}
                                            {role.add_Parametrs && role.add_Parametrs.map((param, index) => (
                                                <div
                                                    className="border px-2 py-2 rounded mb-2 d-flex justify-content-between"
                                                    key={index}
                                                >
                                                    <div className="mb-0 col text-start" style={{display: "inline-block"}}>{param.parametr}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div
                                            className="card-footer bg-light d-flex justify-content-between align-items-center">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => navigate(`/role/${role.role_Id}`)}
                                            >Редактировать</button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => removeClick(role.role_Id)}
                                            >Удалить
                                            </button>
                                        </div>
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