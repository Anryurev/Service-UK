import React, {ChangeEvent, useEffect, useState} from "react";
import {IRole, IWork} from "../../models";
import api from "../../api";

interface RoleFormProps{
    formData: IWork,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleRoleChange: (roleId: number, isChecked: boolean) => void
    onSubmit: () => void
}

export const WorkForm: React.FC<RoleFormProps> = ({ formData, onChange, handleRoleChange, onSubmit }) => {
    const [roles, setRoles] = useState<IRole[]>([])

    const LoadingData = async () => {
        const responseRoles = await api.get(`/Roles/NoImportant`)
        setRoles(responseRoles.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    return(
        <>
            <form>
                <div className="mb-2">
                    <label htmlFor="name" className="form-label mb-0">Тип работы:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    {roles.map(role => (
                        <div className="mb-2 form-check d-block" key={role.role_Id}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`role-${role.role_Id}`}
                                checked={formData.roles_Id?.includes(role.role_Id) ||  formData.roles.some(roleF => roleF.role_Id === role.role_Id) || false}
                                onChange={(e) => handleRoleChange(role.role_Id, e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor={`role-${role.role_Id}`}>{role.name}</label>
                        </div>
                    ))}
                </div>
                <button type="button" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={onSubmit}>Создать</button>
            </form>
        </>
    )
}
