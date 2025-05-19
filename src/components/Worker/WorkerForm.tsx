import React, {ChangeEvent} from "react";
import {IOffice, IRole, IWorkers} from "../../models";

interface WorkerFormProps{
    formData: IWorkers,
    offices: IOffice[],
    roles: IRole[],
    isNotEditMode: boolean
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onSubmit: () => void
}

export const WorkerForm: React.FC<WorkerFormProps> = ({ formData, offices, roles, isNotEditMode, onChange, onSubmit }) => {
    return (
        <form>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">Имя:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="surname" className="form-label mb-0">Фамилия:</label>
                <input
                    type="text"
                    className="form-control"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="fathername" className="form-label mb-0">Отчество:</label>
                <input
                    type="text"
                    className="form-control"
                    id="fathername"
                    name="fathername"
                    value={formData.fathername}
                    onChange={onChange}
                />
            </div>

            <div className="mb-2">
                <label htmlFor="phoneNumber" className="form-label mb-0">Номер телефона:</label>
                <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={onChange}
                />
            </div>

            <div className="mb-2">
                <label htmlFor="email" className="form-label mb-0">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                />
            </div>

            {isNotEditMode && <div className="mb-3">
                <label htmlFor="password" className="form-label mb-0">Пароль</label>
                <input
                    type="text"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                />
            </div>}

            {isNotEditMode && <div className="mb-3">
                <label htmlFor="birthday" className="form-label mb-0">Дата рождения</label>
                <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={onChange}
                />
            </div>}

            <div className="mb-4">
                <label>Выберите должность:</label>
                <select
                    className="form-select"
                    value={formData.id_Role}
                    id="id_Role"
                    name="id_Role"
                    onChange={(e) => onChange(e)}
                >
                    <option value={0}>Выберите роль</option>
                    {roles.map(role => (
                        <option value={role.role_Id} key={role.role_Id}>
                            {role.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label>Выберите офис:</label>
                <select
                    className="form-select"
                    value={formData.id_Office}
                    id='id_Office'
                    name='id_Office'
                    onChange={(e) => onChange(e)}
                >
                    <option value={0}>Выберите офис</option>
                    {offices.map(office => (
                        <option key={office.office_Id} value={office.office_Id}>
                            ул. {office.street} д. {office.house}
                        </option>
                    ))}
                </select>
            </div>

            <button type="button" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={onSubmit}>{isNotEditMode? 'Создать': 'Изменить'}</button>
        </form>
    )
}



