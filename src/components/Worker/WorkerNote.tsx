import React, {useContext, useEffect, useState} from "react";
import {IWorkers} from "../../models";
import {roles} from "../../data/rolesdata";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {Modal} from "../Modal";
import api from "../../api";

interface WorkerProps{
    worker: IWorkers
    onRemove: (workerId: number) => void
    onClick: (workerId: number) => void
}

export function WorkerNote({worker, onRemove, onClick}: WorkerProps){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [roleName, setRoleName] = useState('Роль не найдена')
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const getRoleNameById = async (roleId: number) => {
        const response = await api.get(`/Role/${roleId}`)
        const role = response.data
        setRoleName(role ? role.name : "Роль не найдена")
    }

    useEffect(() => {
        getRoleNameById(worker.id_Role)
    }, [roleName])

    return(
        <>
            <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between" onClick={() => onClick(worker.id)}>
                <div className="col mb-0 text-start" style={{display: "inline-block"}}>{worker.surname + ' ' + worker.name + ' ' + worker.fathername}</div>
                <div className="col mb-0 text-center" style={{display: "inline-block"}}>{roleName}</div>
                <div className="col mb-0 text-center" style={{display: "inline-block"}}>{worker.phoneNumber}</div>
                <div className="col text-end">
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/worker/${worker.id}`)
                    }}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        className="btn-close"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsModalOpen(true)}
                        }
                    >
                    </button>
                </div>
            </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={"Подтвердить удаление"} footer={(
            <>
                <button
                    type="button"
                    className="btn text-white"
                    style={{ background: "#8b8c89" }}
                    onClick={() => setIsModalOpen(false)}
                >
                    Закрыть
                </button>
                <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => {
                        edemContext.deleteWorker(worker.id)
                    }}
                >
                    Удалить
                </button>
            </>
        )}>
            <div>Удалить данного работника?</div>
        </Modal>
    </>
    )
}