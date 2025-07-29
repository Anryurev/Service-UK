import React, {ChangeEvent, useState} from "react";
import { IRole } from "../../models";

interface RoleFormProps{
    formData: IRole,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onChangeParamList: (paramList: Array<{
        id_Parametr: number,
        role_Id: number,
        parametr: string
    }>) => void
    isNotEditMode: boolean
    onSubmit: () => void
}

export const RoleForm: React.FC<RoleFormProps> = ({ formData, onChange, onChangeParamList, isNotEditMode, onSubmit }) => {
    const [isEmptyInput, setIsEmptyInput] = useState(false)
    const [addParametrsList, setAddParametrsList] = useState<
        Array<{
            id_Parametr: number,
            role_Id: number,
            parametr: string
        }>>([])
    const [addParametr, setAddParametr] = useState<{
        id_Parametr: number,
        role_Id: number,
        parametr: string
    }>({
        id_Parametr: -1,
        role_Id: -1,
        parametr: ""
    })
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }))
    }

    const handleClickAddParametr = () => {
        if (addParametr.parametr.trim()) {
            setIsEmptyInput(false)
            const newParametrsList = [...addParametrsList, addParametr]
            setAddParametrsList(newParametrsList)
            onChangeParamList(newParametrsList)
        }
        else{
            setIsEmptyInput(true)
        }
        console.log("add paramerts", formData.add_Parametrs)
        setAddParametr({
            id_Parametr: -1,
            role_Id: -1,
            parametr: ""
        })
    }

    return(
        <form
            noValidate
            onSubmit={onSubmit}
        >
            <div className="mb-2">
                <label htmlFor="name" className="form-label mb-0">
                    Название должности:
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${touched.name && !formData.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onBlur={() => handleBlur('name')}
                    onChange={onChange}
                />
                {touched.name && !formData.name && (
                    <div className="invalid-feedback">Поле обязательно для заполнения</div>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="salary" className="form-label mb-0">
                    Оклад:
                    <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${touched.salary && !formData.salary ? 'is-invalid' : ''}`}
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onBlur={() => handleBlur('salary')}
                    onChange={onChange}
                />
                {touched.salary && !formData.salary && (
                    <div className="invalid-feedback">Поле обязательно для заполнения</div>
                )}
            </div>
            <div className="mb-2">
                <h6>Добавьте доплнительные параметры для должности</h6>
                {addParametrsList.map((param, index) => (
                    <div
                        className="border px-2 py-2 rounded mb-2 d-flex justify-content-between"
                        key={index}
                    >
                        <div className="mb-0 col text-start" style={{display: "inline-block"}}>{param.parametr}</div>
                        <div className="mb-0 col text-end">
                            <button className="btn-close" onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                const newParametrsList = addParametrsList.filter(p => p.parametr !== param.parametr )
                                setAddParametrsList(newParametrsList)
                                onChangeParamList(newParametrsList)

                                console.log('param', param)
                                console.log('addParametrsList', addParametrsList)
                            }}>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="addParam"
                        name="addParam"
                        value={addParametr.parametr}
                        onChange={(e) => setAddParametr(prev => ({
                            ...prev,
                            parametr: e.target.value
                        }))}
                    />
                    <button
                        className="btn btn-outline-success"
                        type="button"
                        id="add-button"
                        onClick={handleClickAddParametr}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                </div>
                {isEmptyInput && <small style={{color: "red"}}>Введите значение</small>}
            </div>
            <button type="button" className="btn mb-4" style={{background: "#6096ba", color: "white"}} onClick={onSubmit}>{isNotEditMode? 'Создать': 'Изменить'}</button>
        </form>
    )
}