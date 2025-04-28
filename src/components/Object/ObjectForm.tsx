import React, {ChangeEvent} from "react";
import {IObject, IOffice} from "../../models";

interface ObjectFormProps{
    formData: IObject,
    offices: IOffice[],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onSubmit: () => void
}

export const ObjectForm: React.FC<ObjectFormProps> = ({ formData, offices, onChange, onSubmit }) => {

    return (
        <form>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">Улица:</label>
                <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">Дом:</label>
                <input
                    type="text"
                    className="form-control"
                    id="house"
                    name="house"
                    value={formData.house}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">Квартира:</label>
                <input
                    type="text"
                    className="form-control"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">Кличество комнат:</label>
                <input
                    type="text"
                    className="form-control"
                    id="rooms"
                    name="rooms"
                    value={formData.rooms}
                    onChange={onChange}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">Площадь:</label>
                <input
                    type="text"
                    className="form-control"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={onChange}
                />
            </div>
            <div className="mb-4">
                <label>Выберите офис:</label>
                <select
                    className="form-select"
                    value={formData.office_Id}
                    id='office_Id'
                    name='office_Id'
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

            <button type="button" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={onSubmit}>Создать</button>
        </form>
    )
}