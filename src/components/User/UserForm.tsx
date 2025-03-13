import React, {ChangeEvent} from "react";
import {IUsers} from "../../models";

interface UserFormProps{
    formData: IUsers,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const UserForm: React.FC<UserFormProps> = ({ formData, onChange }) => {
    return (
        <form className="form-control">
            {[
                { id: "lat", placeholder: "Введите lat...", value: formData.address.geolocation.lat, name: "address.geolocation.lat" },
                { id: "long", placeholder: "Введите long...", value: formData.address.geolocation.long, name: "address.geolocation.long" },
                { id: "city", placeholder: "Введите city...", value: formData.address.city, name: "address.city" },
                { id: "street", placeholder: "Введите street...", value: formData.address.street, name: "address.street" },
                { id: "number", placeholder: "Введите number...", value: formData.address.number, name: "address.number" },
                { id: "zipcode", placeholder: "Введите zipcode...", value: formData.address.zipcode, name: "address.zipcode" },
                { id: "email", placeholder: "Введите email...", value: formData.email, type: "email", name: "email" },
                { id: "username", placeholder: "Введите имя пользователя...", value: formData.username, name: "username" },
                { id: "password", placeholder: "Введите пароль...", value: formData.password, type: "password", name: "password" },
                { id: "firstname", placeholder: "Введите имя...", value: formData.name.firstname, name: "name.firstname" },
                { id: "lastname", placeholder: "Введите фамилию...", value: formData.name.lastname, name: "name.lastname" },
                { id: "phone", placeholder: "Введите номер телефона...", value: formData.phone, name: "phone" },
                { id: "v", placeholder: "Введите v...", value: formData.v, name: "v" },
            ].map((field) => (
                <div className="mb-3" key={field.id}>
                    <input
                        type={field.type || "text"}
                        className="form-control"
                        id={field.id}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={onChange}
                        name={field.name}
                    />
                </div>
            ))}
        </form>
    )
}



// <select
//     className="form-select mt-3"
//     aria-label="Default select example"
//     value={formData.role}
//     onChange={onChange}
//     name="role"
// >
//     <option value="-1">Выберите роль</option>
//     <option value="1">Администратор</option>
//     <option value="2">Оператор</option>
//     <option value="3">Уборщица</option>
//     <option value="4">Электрик</option>
//     <option value="5">Сантехник</option>
// </select>