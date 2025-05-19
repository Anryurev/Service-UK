import React, {useContext, useState} from "react";
import { IRole} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Modal} from "../Modal";
import {useNavigate} from "react-router-dom";

interface RoleProps {
    role: IRole
    onClick: (roleId: number) => void
}

export function RoleNote({ role, onClick }: RoleProps){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return(
        <>
            <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between" onClick={() => onClick(role.role_Id)}>
                <div className="mb-0 col text-start" style={{display: "inline-block"}}>{role.name}</div>
                <div className="mb-0 col text-center" style={{display: "inline-block"}}>{role.salary}</div>
                <div className="mb-0 col text-end">
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/role/${role.role_Id}`)
                    }}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn-close" onClick={(e) => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                    }}>
                    </button>
                </div>

            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={"Подтвердить удаление"} footer={(
                <>
                    <button
                        type="button"
                        className="btn btn-secondary text-white"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Закрыть
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            edemContext.deleteRole(role.role_Id)
                            setIsModalOpen(false)
                        }}
                    >
                        Удалить
                    </button>
                </>
            )}>
                <div>Удалить данную должность?</div>
            </Modal>
        </>
    )
}