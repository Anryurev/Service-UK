import React, {useContext, useState} from "react";
import {UserForm} from "../../components/User/UserForm";
import {IUsers} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Navbar} from "../../components/Navbar";

export function CreateUserPage() {
    const edemContext = useContext(EdembackContext)
    const [formData, setFormData] = useState<IUsers>({
        id: 0,
        name: "",
        surname: "",
        fathername: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        id_Role: 0,
        id_Office: 0,
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        const keys = name.split(".")

        setFormData((prev) => {
            const newData = JSON.parse(JSON.stringify(prev)) as IUsers

            let current: any = newData
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]]
            }

            const lastKey = keys[keys.length - 1];
            if (lastKey === "id" || lastKey === "idOffice" || lastKey === "idRole") {
                current[lastKey] = Number(value); // Преобразуем в число
            } else {
                current[lastKey] = value; // Оставляем строкой
            }
            return newData
        });
    };

    function onSubmit(formData: IUsers) {
        edemContext.createUser(formData)
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IUsers>).forEach(key => {
            const value = formData[key as keyof IUsers] // Явное приведение типа ключа
            if (String(value).trim().length === 0) {
                isValid = false
            }
        })

        if(isValid) onSubmit(formData)
    };

    return (
        <>
            <Navbar/>
                <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                    <form>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label mb-0">Имя:</label>
                            <input type="text" className="form-control" id="name"/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="surname" className="form-label mb-0">Фамилия:</label>
                            <input type="text" className="form-control" id="surname"/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="fathername" className="form-label mb-0">Отчество:</label>
                            <input type="text" className="form-control" id="fathername"/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="phoneNumber" className="form-label mb-0">Номер телефона:</label>
                            <input type="text" className="form-control" id="phoneNumber"/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="form-label mb-0">Email:</label>
                            <input type="email" className="form-control" id="email"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label mb-0">Пароль</label>
                            <input type="password" className="form-control" id="password"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="birthday" className="form-label mb-0">Дата рождения</label>
                            <input type="date" className="form-control" id="birthday"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="role" className="form-label mb-0">Выберите роль:</label>
                            <select
                                className="form-select"
                                value={formData.id_Role}
                                onChange={handleChange}
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
                        </div>

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Создать</button>
                    </form>
                </div>
        </>
    )
}