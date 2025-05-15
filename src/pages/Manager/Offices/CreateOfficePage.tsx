import React, {useContext, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IOffice, IWorkers} from "../../../models";
import {useNavigate} from "react-router-dom";

export function CreateOfficePage(){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<IOffice>({
        office_Id: -1,
        street: "",
        house: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function onSubmit(formData: IOffice) {
        console.log(formData)
        edemContext.createOffice(formData)
        navigate('/offices')
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IOffice>).forEach(key => {
            const value = formData[key as keyof IOffice] // Явное приведение типа ключа
            if (String(value).trim().length === 0) {
                isValid = false
            }
        })

        if(isValid) onSubmit(formData)
    }

    return (
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Создание нового офиса</h1>
                <form>
                    <div className="mb-2">
                        <label htmlFor="street" className="form-label mb-0">Улица:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="house" className="form-label mb-0">Дом:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="house"
                            name="house"
                            value={formData.house}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="button" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={handleSubmit}>Создать</button>
                </form>
            </div>
        </>
    )
}