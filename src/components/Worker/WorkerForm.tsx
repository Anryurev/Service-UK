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
                <label htmlFor="name" className="form-label mb-0">Имя:</label> <i className="bi bi-asterisk text-danger" style={{fontSize: "10px"}}></i>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-2">
                <label htmlFor="surname" className="form-label mb-0">Фамилия:</label> <i className="bi bi-asterisk text-danger" style={{fontSize: "10px"}}></i>
                <input
                    type="text"
                    className="form-control"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={onChange}
                    required
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
                <label htmlFor="phoneNumber" className="form-label mb-0">Номер телефона:</label> <i className="bi bi-asterisk text-danger" style={{fontSize: "10px"}}></i>
                <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent border-end-0">
                        <i className="bi bi-telephone text-primary"></i>
                    </span>
                    <input
                        type="text"
                        value={formData.phoneNumber}
                        onChange={onChange}
                        className="form-control py-2 border-start-0"
                    />
                </div>
            </div>

            <div className="mb-2">
                <label htmlFor="email" className="form-label mb-0">Email:</label> <i className="bi bi-asterisk text-danger" style={{fontSize: "10px"}}></i>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    required
                />
            </div>

            {isNotEditMode && <div className="mb-3">
                <label htmlFor="password" className="form-label mb-0">Пароль</label> <i className="bi bi-asterisk text-danger" style={{fontSize: "10px"}}></i>
                <input
                    type="text"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    required
                />
            </div>}

            {isNotEditMode && <div className="mb-3">
                <label htmlFor="birthday" className="form-label mb-0">Дата рождения</label> <i className="bi bi-asterisk text-danger" style={{fontSize: "10px"}}></i>
                <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={onChange}
                    required
                />
            </div>}

            <div className="mb-4">
                <label>Выберите должность:</label> <i className="bi bi-asterisk text-danger" style={{fontSize: "10px"}}></i>
                <select
                    className="form-select"
                    value={formData.id_Role}
                    id="id_Role"
                    name="id_Role"
                    onChange={(e) => onChange(e)}
                    required
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
                <label>Выберите офис:</label> <i className="bi bi-asterisk text-danger" style={{fontSize: "10px"}}></i>
                <select
                    className="form-select"
                    value={formData.id_Office}
                    id='id_Office'
                    name='id_Office'
                    onChange={(e) => onChange(e)}
                    required
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



