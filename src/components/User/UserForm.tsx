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
                { id: "id", placeholder: "Введите id...", value: formData.id },
                { id: "name", placeholder: "Введите имя...", value: formData.name },
                { id: "surname", placeholder: "Введите фамилию...", value: formData.surname },
                { id: "fatherName", placeholder: "Введите отчество...", value: formData.fathername },
                { id: "phoneNumber", placeholder: "Введите номер телефона...", value: formData.phoneNumber },
                { id: "email", placeholder: "Введите email...", value: formData.email },
                { id: "birthday", placeholder: "Введите дату рождения...", value: formData.birthday },
                { id: "idRole", placeholder: "Введите id роли...", value: formData.id_Role},
                { id: "idOffice", placeholder: "Введите id офиса...", value: formData.id_Office},
                { id: "password", placeholder: "Введите пароль...", value: formData.password },
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

            <select
                className="form-select mt-3"
                value={formData.id_Role}
                onChange={onChange}
                name="role"
            >
                <option value="-1">Выберите роль</option>
                <option value="1">Оператор</option>
                <option value="2">Администратор</option>
                <option value="3">Менеджер</option>
                <option value="4">Электрик</option>
                <option value="5">Сантехник</option>
                <option value="6">Уборощик</option>
                <option value="7">Завхоз</option>
            </select>
        </form>
    )
}



