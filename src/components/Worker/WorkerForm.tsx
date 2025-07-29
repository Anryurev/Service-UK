import React, {ChangeEvent, useState} from "react";
import {IOffice, IRole, IWorkers} from "../../models";
import {log} from "util";

interface WorkerFormProps{
    formData: IWorkers,
    offices: IOffice[],
    roles: IRole[],
    isNotEditMode: boolean
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onSubmit: (e: React.FormEvent) => Promise<void> | void;
}

const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '').substring(1)
    let formatted = '+7'

    if (numbers.length > 0) {
        formatted += ` (${numbers.substring(0, 3)}`
    }
    if (numbers.length > 3) {
        formatted += `) ${numbers.substring(3, 6)}`
    }
    if (numbers.length > 6) {
        formatted += `-${numbers.substring(6, 8)}`
    }
    if (numbers.length > 8) {
        formatted += `-${numbers.substring(8, 10)}`
    }

    return formatted
}

export const WorkerForm: React.FC<WorkerFormProps> = ({ formData, offices, roles, isNotEditMode, onChange, onSubmit }) => {
    const [phone, setPhone] = useState(formatPhone(formData.phoneNumber))
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }))
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        if (input.startsWith('+7') || input === '+') {
            setPhone(formatPhone(input))
            onChange(e)
        }
    }

    return (
        <form
            noValidate
            onSubmit={onSubmit}
        >
            {/* Имя */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label mb-0">
                    Имя: <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${touched.name && !formData.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    onBlur={() => handleBlur('name')}
                    required
                />
                {touched.name && !formData.name && (
                    <div className="invalid-feedback">Поле обязательно для заполнения</div>
                )}
            </div>

            {/* Фамилия */}
            <div className="mb-3">
                <label htmlFor="surname" className="form-label mb-0">
                    Фамилия: <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${touched.surname && !formData.surname ? 'is-invalid' : ''}`}
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={onChange}
                    onBlur={() => handleBlur('surname')}
                    required
                />
                {touched.surname && !formData.surname && (
                    <div className="invalid-feedback">Поле обязательно для заполнения</div>
                )}
            </div>

            {/* Отчество (необязательное) */}
            <div className="mb-3">
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

            {/* Телефон */}
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label mb-0">
                    Номер телефона: <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                        <i className="bi bi-telephone text-primary"></i>
                    </span>
                    <input
                        type="tel"
                        className={`form-control py-2 border-start-0 ${touched.phoneNumber && (!formData.phoneNumber || formData.phoneNumber.replace(/\D/g, '').length < 11) ? 'is-invalid' : ''}`}
                        value={phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur('phoneNumber')}
                        name="phoneNumber"
                        placeholder="+7 (123) 456-78-90"
                        required
                    />
                    {touched.phoneNumber && (!formData.phoneNumber || formData.phoneNumber.replace(/\D/g, '').length < 11) && (
                        <div className="invalid-feedback">Введите корректный номер телефона</div>
                    )}
                </div>
            </div>

            {/* Email */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label mb-0">
                    Email: <span className="text-danger">*</span>
                </label>
                <input
                    type="email"
                    className={`form-control ${touched.email && (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    onBlur={() => handleBlur('email')}
                    required
                />
                {touched.email && (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) && (
                    <div className="invalid-feedback">Введите корректный email</div>
                )}
            </div>

            {/* Пароль (только при создании) */}
            {isNotEditMode && (
                <div className="mb-3">
                    <label htmlFor="password" className="form-label mb-0">
                        Пароль: <span className="text-danger">*</span>
                    </label>
                    <input
                        type="password"
                        className={`form-control ${touched.password && !formData.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        onBlur={() => handleBlur('password')}
                        required
                    />
                    {touched.password && !formData.password && (
                        <div className="invalid-feedback">Поле обязательно для заполнения</div>
                    )}
                </div>
            )}

            {/* Дата рождения (только при создании) */}
            {isNotEditMode && (
                <div className="mb-3">
                    <label htmlFor="birthday" className="form-label mb-0">
                        Дата рождения: <span className="text-danger">*</span>
                    </label>
                    <input
                        type="date"
                        className={`form-control ${touched.birthday && !formData.birthday ? 'is-invalid' : ''}`}
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={onChange}
                        onBlur={() => handleBlur('birthday')}
                        required
                    />
                    {touched.birthday && !formData.birthday && (
                        <div className="invalid-feedback">Поле обязательно для заполнения</div>
                    )}
                </div>
            )}

            {/* Роль */}
            <div className="mb-3">
                <label htmlFor="id_Role" className="form-label mb-0">
                    Должность: <span className="text-danger">*</span>
                </label>
                <select
                    className={`form-select ${touched.id_Role && !formData.id_Role ? 'is-invalid' : ''}`}
                    value={formData.id_Role || ''}
                    id="id_Role"
                    name="id_Role"
                    onChange={onChange}
                    onBlur={() => handleBlur('id_Role')}
                    required
                >
                    <option value="">Выберите роль</option>
                    {roles.map(role => (
                        <option value={role.role_Id} key={role.role_Id}>
                            {role.name}
                        </option>
                    ))}
                </select>
                {touched.id_Role && !formData.id_Role && (
                    <div className="invalid-feedback">Выберите роль</div>
                )}
            </div>

            {/* Офис */}
            <div className="mb-4">
                <label htmlFor="id_Office" className="form-label mb-0">
                    Офис: <span className="text-danger">*</span>
                </label>
                <select
                    className={`form-select ${touched.id_Office && !formData.id_Office ? 'is-invalid' : ''}`}
                    value={formData.id_Office || ''}
                    id="id_Office"
                    name="id_Office"
                    onChange={onChange}
                    onBlur={() => handleBlur('id_Office')}
                    required
                >
                    <option value="">Выберите офис</option>
                    {offices.map(office => (
                        <option key={office.office_Id} value={office.office_Id}>
                            ул. {office.street} д. {office.house}
                        </option>
                    ))}
                </select>
                {touched.id_Office && !formData.id_Office && (
                    <div className="invalid-feedback">Выберите офис</div>
                )}
            </div>

            <button type="submit" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={onSubmit}>{isNotEditMode? 'Создать': 'Изменить'}</button>
        </form>
    )
}



