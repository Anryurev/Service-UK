import React, {useContext, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {IRole} from "../../../models";
import {RoleForm} from "../../../components/Role/RoleForm";

export function CreateRolePage(){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<IRole>({
        role_Id: -1,
        name: "",
        salary: 0,
        add_Parametrs: [{
            id_Parametr: -1,
            role_Id: -1,
            parametr: ""
        }],
        levelImportant: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const handleChangeAddParametrList = (newParametrsList: Array<{
        id_Parametr: number,
        role_Id: number,
        parametr: string
    }>) => {
        setFormData(prev => ({
            ...prev,
            add_Parametrs: newParametrsList
        }))
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
                <RoleForm formData={formData} onChange={handleChange} onChangeParamList={handleChangeAddParametrList} onSubmit={handleSubmit}/>
                {/*<form>*/}
                {/*    <div className="mb-2">*/}
                {/*        <label htmlFor="name" className="form-label mb-0">Название должности:</label>*/}
                {/*        <input*/}
                {/*            type="text"*/}
                {/*            className="form-control"*/}
                {/*            id="name"*/}
                {/*            name="name"*/}
                {/*            value={formData.name}*/}
                {/*            onChange={handleChange}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="mb-2">*/}
                {/*        <label htmlFor="salary" className="form-label mb-0">Оклад:</label>*/}
                {/*        <input*/}
                {/*            type="text"*/}
                {/*            className="form-control"*/}
                {/*            id="salary"*/}
                {/*            name="salary"*/}
                {/*            value={formData.salary}*/}
                {/*            onChange={handleChange}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="mb-2">*/}
                {/*        <h6>Добавьте доплнительные параметры для должности</h6>*/}
                {/*        {addParametrsList.map((param, index) => (*/}
                {/*            <div*/}
                {/*                className="border px-2 py-2 rounded mb-2 d-flex justify-content-between"*/}
                {/*                key={index}*/}
                {/*            >*/}
                {/*                <div className="mb-0 col text-start" style={{display: "inline-block"}}>{param.parametr}</div>*/}
                {/*                <div className="mb-0 col text-end">*/}
                {/*                    <button className="btn-close" onClick={(e) => {*/}
                {/*                        e.preventDefault()*/}
                {/*                        e.stopPropagation()*/}
                {/*                        const newParametrsList = addParametrsList.filter(p => p.parametr !== param.parametr )*/}
                {/*                        setAddParametrsList(newParametrsList)*/}
                {/*                        setFormData(prev => ({*/}
                {/*                            ...prev,*/}
                {/*                            add_Parametrs: newParametrsList*/}
                {/*                        }))*/}
                {/*                        console.log('param', param)*/}
                {/*                        console.log('addParametrsList', addParametrsList)*/}
                {/*                    }}>*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*        <div className="input-group">*/}
                {/*            <input*/}
                {/*                type="text"*/}
                {/*                className="form-control"*/}
                {/*                id="addParam"*/}
                {/*                name="addParam"*/}
                {/*                value={addParametr.parametr}*/}
                {/*                onChange={(e) => setAddParametr(prev => ({*/}
                {/*                    ...prev,*/}
                {/*                    parametr: e.target.value*/}
                {/*                }))}*/}
                {/*            />*/}
                {/*            <button*/}
                {/*                className="btn btn-outline-success"*/}
                {/*                type="button"*/}
                {/*                id="add-button"*/}
                {/*                onClick={handleClickAddParametr}*/}
                {/*            >*/}
                {/*                <i className="bi bi-plus-lg"></i>*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        {isEmptyInput && <small style={{color: "red"}}>Введите значение</small>}*/}
                {/*    </div>*/}
                {/*    <button type="button" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={handleSubmit}>Создать</button>*/}
                {/*</form>*/}
            </div>
        </>
    )
}