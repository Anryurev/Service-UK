import React, {useContext} from "react";
import { IRole} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";

interface RoleProps {
    role: IRole
}

export function RoleNote({ role }: RoleProps){
    const edemContext = useContext(EdembackContext)

    return(
        <>
            <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between">
                <div className="mb-0 col text-start" style={{display: "inline-block"}}>{role.name}</div>
                <div className="mb-0 col text-center" style={{display: "inline-block"}}>{role.salary}</div>
                <div className="mb-0 col text-end">
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn-close" onClick={(e) => {
                        e.stopPropagation()
                        edemContext.deleteRole(role.role_Id)
                    }}>
                    </button>
                </div>

            </div>
        </>
    )
}