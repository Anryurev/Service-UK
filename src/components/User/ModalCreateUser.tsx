import React, {useState} from "react";
import {IObject, IUsers} from "../../models";
import {UserForm} from "./UserForm";
import {Modal} from "../Modal";

interface ModalCreateUserProps {
    onSubmit: (newUser: IUsers) => void
    onClose: () => void
}

export function ModalCreateUser({ onSubmit, onClose }: ModalCreateUserProps){
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

    const [isModalOpen, setIsModalOpen] = useState(true)

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

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IUsers>).forEach(key => {
            const value = formData[key as keyof IUsers] // Явное приведение типа ключа
            // console.log(`${key as keyof IUsers} `, String(value).trim().length === 0)
            if (String(value).trim().length === 0) {
                isValid = false
            }
        })

        if(isValid) onSubmit(formData)
        onClose()
    };


    return (
        <div className="container mt-5">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Создание нового пользователя"
                footer={
                    <>
                        <button
                            type="button"
                            className="btn text-white"
                            style={{ background: "#8b8c89" }}
                            onClick={onClose}
                        >
                            Закрыть
                        </button>
                        <button
                            type="submit"
                            className="btn text-white"
                            style={{ background: "#6096ba" }}
                            onClick={handleSubmit}
                        >
                            Создать
                        </button>
                    </>
                }
            >
                <UserForm formData={formData} onChange={handleChange} />
            </Modal>
        </div>
    );
}
