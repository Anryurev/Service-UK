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
                {id: "id", placeholder: "Введите id"},
                {id: "office_id", placeholder: "Введите office_id"},
                {id: "street", placeholder: "Введите название улицы...", value: formData.street},
                {id: "house", placeholder: "Введите номер дома...", value: formData.house},
                {id: "apartment", placeholder: "Введите номер квартиры...", value: formData.apartment},
                {id: "rooms", placeholder: "Введите количество комнат..."},
                {id: "area", placeholder: "Введите площадь квартиры..."},
            ].map((field) => (
                <div className="mb-3" key={field.id}>
                    <input
                        type="text"
                        className="form-control"
                        id={field.id}
                        placeholder={field.placeholder}
                        value={field.value || ""}
                        onChange={onChange}
                        name={field.id}
                    />
                </div>
            ))}
            { [
                {id: "kitchen", placeholder: "Введите есть ли кухня", value: formData.office_id},
                {id: "balcony", placeholder: "Введите есть ли балон", value: formData.office_id},
            ].map(field => (
                <div className="mb-3" key={field.id}>
                    <input
                        type="checkbox"
                        className="form-control"
                        id={field.id}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={onChange}
                        name={field.id}
                    />
                </div>
                )
            )}
        </form>
    )
}