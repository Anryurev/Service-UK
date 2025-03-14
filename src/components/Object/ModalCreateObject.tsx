import React, {ChangeEvent, useState} from "react";
import {Modal} from "../Modal";
import {ObjectForm} from "./ObjectForm";
import {IObject} from "../../models";

interface ModalCreateObjectProps {
    onSubmit: (newObject: IObject) => void
    onClose: () => void
}

export function ModalCreateObject({ onSubmit, onClose }: ModalCreateObjectProps){
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [formData, setFormData] = useState<IObject>({
        id: 0,
        office_id: 0,
        street: "",
        house: "",
        apartment: "",
        rooms: 0,
        status: "Свободно",
        check_in: "01.01.2000",
        leaving: "01.02.2000",
        area: 0,
        kitchen: false,
        balcony: false
    })

    const handleSubmit = () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IObject>).forEach(key => {
            const value = formData[key as keyof IObject] // Явное приведение типа ключа
            console.log(`${key as keyof IObject} `, String(value).trim().length === 0)
            if (String(value).trim().length === 0) {
                isValid = false
            }
        })

        if(isValid) onSubmit(formData)
        onClose()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        const keys = name.split(".")

        setFormData((prev) => {
            const newData = JSON.parse(JSON.stringify(prev)) as IObject

            let current: any = newData
            for (let i = 0; i < keys.length - 1; i++){
                current = current[keys[i]]
            }

            const lastKey = keys[keys.length - 1];
            if (lastKey === "id" || lastKey === "office_id" || lastKey === "rooms" || lastKey === "area") {
                current[lastKey] = Number(value); // Преобразуем в число
            } else if (lastKey === "kitchen" || lastKey === "balcony") {
                current[lastKey] = true // Преобразуем в boolean
            } else {
                current[lastKey] = value; // Оставляем строкой
            }

            return newData
        })

    }

    return(
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Создание нового объекта"
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
            <ObjectForm formData={formData} onChange={handleChange}/>
        </Modal>
    )
}