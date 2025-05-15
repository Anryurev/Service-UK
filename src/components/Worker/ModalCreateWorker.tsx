import React, {useState} from "react";
import {IWorkers} from "../../models";
import {WorkerForm} from "./WorkerForm";

interface ModalCreateWorkerProps {
    onSubmit: (newWorker: IWorkers) => void
    onClose: () => void
}

export function ModalCreateWorker({ onSubmit, onClose }: ModalCreateWorkerProps){
    const [formData, setFormData] = useState<IWorkers>({
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
            const newData = JSON.parse(JSON.stringify(prev)) as IWorkers

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
        (Object.keys(formData) as Array<keyof IWorkers>).forEach(key => {
            const value = formData[key as keyof IWorkers] // Явное приведение типа ключа
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
            {/*<WorkerForm formData={formData} onChange={handleChange} />*/}
        </div>
    );
}
