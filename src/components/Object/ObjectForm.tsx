import React, {ChangeEvent} from "react";
import {IObject} from "../../models";

interface ObjectFormProps{
    formData: IObject,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const ObjectForm: React.FC<ObjectFormProps> = ({ formData, onChange }) => {

    return (
        <form className="form-control">
            {[
                {id: "id", placeholder: "Введите id", value: formData.id},
                {id: "office_id", placeholder: "Введите office_id", value: formData.office_id},
                {id: "street", placeholder: "Введите название улицы...", value: formData.street},
                {id: "house", placeholder: "Введите номер дома...", value: formData.house},
                {id: "apartment", placeholder: "Введите номер квартиры...", value: formData.apartment},
                {id: "rooms", placeholder: "Введите количество комнат...", value: formData.rooms},
                {id: "area", placeholder: "Введите площадь квартиры...", value: formData.area},
            ].map((field) => (
                <div className="mb-3" key={field.id}>
                    <input
                        type="text"
                        className="form-control"
                        id={field.id}
                        placeholder={field.placeholder}
                        value={field.value || ''}
                        onChange={onChange}
                        name={field.id}
                    />
                </div>
            ))}
            { [
                {id: "kitchen", placeholder: "Есть ли кухня?", value: formData.kitchen},
                {id: "balcony", placeholder: "Есть ли балкон?", value: formData.balcony},
            ].map(field => (
                <div className="mb-3" key={field.id}>
                    <input
                        type="checkbox"
                        className="me-1"
                        id={field.id}
                        value={String(field.value)}
                        onChange={onChange}
                        name={field.id}
                    />
                    <label htmlFor={field.id}>{field.placeholder}</label>
                </div>
                )
            )}
        </form>
    )
}