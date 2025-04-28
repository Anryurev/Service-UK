import React, {useContext, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {IRole} from "../../../models";

export function CreateRolePage(){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<IRole>({
        role_Id: -1,
        name: "",
        salary: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if(name === 'salary'){
            setFormData(prev => ({
                ...prev,
                [name]: Number(value)
            }))
        } else{
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    function onSubmit(formData: IRole) {
        console.log(formData)
        edemContext.createRole(formData)
        navigate('/roles')
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IRole>).forEach(key => {
            const value = formData[key as keyof IRole] // Явное приведение типа ключа
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
                <h1>Создание новой должности</h1>
                <form>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label mb-0">Название должности:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="salary" className="form-label mb-0">Оклад:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="button" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={handleSubmit}>Создать</button>
                </form>
            </div>
        </>
    )
}