import React, {ChangeEvent, useState} from "react";
import {Modal} from "./Modal";
import {ObjectForm} from "./ObjectForm";
import {IObject} from "../models";

interface ModalCreateObjectProps {
    onSubmit: (newObject: IObject) => void
    onClose: () => void
}

export function ModalCreateObject({ onSubmit, onClose }: ModalCreateObjectProps){
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [isValid, setIsValid] = useState(true)
    const [formData, setFormData] = useState({
        id: 0,
        office_id: 0,
        street: "",
        house: "",
        apartment: "",
        rooms: 0,
        status: "Свободно",
        area: 0,
        kitchen: false,
        balcony: true
    })

    const handleSubmit = () => {
        (Object.keys(formData) as Array<keyof IObject>).forEach(key => {
            console.log(String(formData[key]).trim().length)
            if(String(formData[key]).trim().length === 0) setIsValid(false)
        });
        console.log(isValid)
        if(isValid) onSubmit(formData)
        onClose()
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        const keys = name.split(".")

        setFormData((prev) => {
            const newData = JSON.parse(JSON.stringify(prev))

            let current: any = newData
            for (let i = 0; i < keys.length - 1; i++){
                current = current[keys[i]]
            }

            current[keys[keys.length - 1]] = value
            return newData
        })

    };

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