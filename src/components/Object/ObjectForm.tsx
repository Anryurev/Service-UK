import React, {ChangeEvent, useState} from "react";
import {IObject, IOffice} from "../../models";

interface ObjectFormProps{
    formData: IObject,
    offices: IOffice[],
    isNotEditMode: boolean
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onSubmit: (e: React.FormEvent) => Promise<void> | void;
}

export const ObjectForm: React.FC<ObjectFormProps> = ({ formData, offices, isNotEditMode, onChange, onSubmit }) => {
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }))
    }

    return (
        <form
            noValidate
            onSubmit={onSubmit}
        >
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">
                    Улица:
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${touched.street && !formData.street ? 'is-invalid' : ''}`}
                    id="street"
                    name="street"
                    value={formData.street}
                    onBlur={() => handleBlur("street")}
                    onChange={onChange}
                />
                {touched.street && !formData.street && (
                    <div className="invalid-feedback">Поле обязательно для заполнения</div>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">
                    Дом:
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${touched.house && !formData.house ? 'is-invalid' : ''}`}
                    id="house"
                    name="house"
                    value={formData.house}
                    onBlur={() => handleBlur("house")}
                    onChange={onChange}
                />
                {touched.house && !formData.house && (
                    <div className="invalid-feedback">Поле обязательно для заполнения</div>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">
                    Квартира:
                </label>
                <input
                    type="text"
                    className={`form-control`}
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">
                    Кличество комнат:
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${touched.rooms && !formData.rooms ? 'is-invalid' : ''}`}
                    id="rooms"
                    name="rooms"
                    value={formData.rooms}
                    onBlur={() => handleBlur("rooms")}
                    onChange={onChange}
                />
                {touched.rooms && !formData.rooms && (
                    <div className="invalid-feedback">Поле обязательно для заполнения</div>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">
                    Площадь:
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${touched.area && !formData.area ? 'is-invalid' : ''}`}
                    id="area"
                    name="area"
                    value={formData.area}
                    onBlur={() => handleBlur("area")}
                    onChange={onChange}
                />
                {touched.area && !formData.area && (
                    <div className="invalid-feedback">Поле обязательно для заполнения</div>
                )}
            </div>
            <div className="mb-4">
                <label>
                    Выберите офис:
                    <span className="text-danger">*</span>
                </label>
                <select
                    className={`form-control ${touched.office_Id && !formData.office_Id ? 'is-invalid' : ''}`}
                    value={formData.office_Id}
                    id='office_Id'
                    name='office_Id'
                    onBlur={() => handleBlur("office_Id")}
                    onChange={(e) => onChange(e)}
                >
                    <option value={0}>Выберите офис</option>
                    {offices.map(office => (
                        <option key={office.office_Id} value={office.office_Id}>
                            ул. {office.street} д. {office.house}
                        </option>
                    ))}
                </select>
                {touched.office_Id && !formData.office_Id && (
                    <div className="invalid-feedback">Выберите офис!</div>
                )}
            </div>
            <div className="mb-2">
                <input
                    type="checkbox"
                    className="form-check-input me-1"
                    id='kitchen'
                    name='kitchen'
                    checked={formData.kitchen || false}
                    onChange={onChange}
                />
                <label htmlFor='kitchen'>Кухня</label>
            </div>
            <div className="mb-2">
                <input
                    type="checkbox"
                    className="form-check-input me-1"
                    id='balcony'
                    name='balcony'
                    checked={formData.balcony || false}
                    onChange={onChange}
                />
                <label htmlFor='balcony'>Балкон</label>
            </div>

            <button type="button" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={onSubmit}>{isNotEditMode? 'Создать': 'Изменить'}</button>
        </form>
    )
}