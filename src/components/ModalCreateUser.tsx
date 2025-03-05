import React, {useState} from "react";
import {IUsers} from "../models";
import {UserForm} from "./UserForm";
import {Modal} from "./Modal";
import axios from "axios";

interface ModalCreateUserProps {
    onSubmit: (newUser: IUsers) => void
    onClose: () => void
}

export function ModalCreateUser({ onSubmit, onClose }: ModalCreateUserProps){
    const [formData, setFormData] = useState<IUsers>({
        address: {
            geolocation: {
                lat: "",
                long: ""
            },
            city: "",
            street: "",
            number: 0,
            zipcode: ""
        },
        id: 0,
        email: "",
        username: "",
        password: "",
        name: {
            firstname: "",
            lastname: ""
        },
        phone: "",
        v: 0
    });

    const [isModalOpen, setIsModalOpen] = useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Разделяем имя поля на части (например, "address.city" -> ["address", "city"])
        const keys = name.split(".");

        setFormData((prev) => {
            // Создаем глубокую копию объекта
            const newData = JSON.parse(JSON.stringify(prev));

            // Обновляем вложенные свойства
            let current: any = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            // Устанавливаем значение
            current[keys[keys.length - 1]] = value;

            return newData;
        });
    };

    const handleSubmit = async () => {
        try{
            const response = await axios.post<IUsers>("https://fakestoreapi.com/users", formData)

            const newUser = {
                ...formData,
                id: response.data.id
            }

            onSubmit(newUser)
            onClose()

            setIsModalOpen(false)
        } catch (error) {
            console.error("Ошибка при создании пользователя:", error);
        }
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
