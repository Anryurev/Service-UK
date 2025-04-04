import React, {useContext, useEffect} from "react";
import {IUsers} from "../../models";
import {roles} from "../../data/rolesdata";
import {EdembackContext} from "../../context/edemback/EdembackContext";

interface UserProps{
    user: IUsers
    onRemove: (userId: number) => void
    onClick: (userId: number) => void
}

export function UserNote({user, onRemove, onClick}: UserProps){
    const edemContext = useContext(EdembackContext)
    const getRoleNameById = (roleId: number): string => {
        const role = edemContext.state.roles.find((role) => role.role_Id === roleId)
        return role ? role.name : "Роль не найдена"
    }

    return(
        <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between" onClick={() => onClick(user.id)}>
            <div className="col mb-0 text-start" style={{display: "inline-block"}}>{user.surname + ' ' + user.name + ' ' + user.fathername}</div>
            <div className="col mb-0 text-center" style={{display: "inline-block"}}>{getRoleNameById(user.id_Role)}</div>
            <div className="col mb-0 text-center" style={{display: "inline-block"}}>{user.phoneNumber}</div>
            <div className="col text-end">
                <button
                    className="btn-close"
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove(user.id)}
                    }
                >
                </button>
            </div>
        </div>
    )
}