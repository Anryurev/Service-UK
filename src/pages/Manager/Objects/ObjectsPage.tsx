import React, { useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {ObjectNote} from "../../../components/Object/ObjectNote";
import {IObject, IOffice} from "../../../models";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {Form, FormSelect} from "react-bootstrap";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";
import api from "../../../api";

export function ObjectsPage(){
    const [searchQuery, setSearchQuery] = useState('')
    const [objects, setObjects] = useState<IObject[]>([])
    const [allObjects, setAllObjects] = useState<IObject[]>([]) // Сохраняем все объекты для фильтрации
    const {worker, role} = getAuthDataFromLocalStorage()
    const [isOperator, setIsOperator] = useState(false)
    const [offices, setOffices] = useState<IOffice[]>([])
    const [selectedOffice, setSelectedOffice] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)

    const LoadingData = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/Objects${Number(role?.levelImportant) === 1 ? "" : "/Worker"}`)

            if(role?.levelImportant === 1){
                const responseOffices = await api.get(`/Offices`)
                setOffices(responseOffices.data)
            }

            setObjects(response.data)
            setAllObjects(response.data) // Сохраняем все объекты
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
            console.error(e)
        }
    }

    // Фильтрация объектов
    useEffect(() => {
        let filtered = allObjects

        // Фильтр по офису
        if (selectedOffice > 0) {
            filtered = filtered.filter(object => object.office_Id === selectedOffice)
        }

        // Фильтр по поисковому запросу
        if (searchQuery) {
            filtered = filtered.filter((object) =>
                object.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
                object.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
                object.apartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                object.status.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        setObjects(filtered)
    }, [selectedOffice, searchQuery, allObjects])

    useEffect(() => {
        LoadingData()
        if(worker?.id_Role === 4){
            setIsOperator(true)
        }
    }, [edemContext.state.objects])

    const handleCreateObject = async (newObject: IObject) => {
        await edemContext.createObject(newObject)
    }

    const handleClickObject = (objectId: number) => {
        navigate(`/objects/${objectId}`)
    }

    const handleOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOffice(Number(e.target.value))
    }

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <div className="d-flex justify-content-between flex-row h-100 p-2 border-start align-items-center">
                    <h1 className="mb-3">Список объектов</h1>
                    {Number(role?.levelImportant) < 3 &&
                        <button
                            className="btn h-75"
                            style={{background: "#6096ba", color: "white"}}
                            onClick={() => navigate('/objects/create')}
                        >
                            Добавить объект
                        </button>}
                </div>
                <Form.Group className="mb-4">
                    <Form.Label>Поиск по объектам:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        placeholder="Поиск объектов"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/*Фильтрация по офисам*/}
                    {role?.levelImportant === 1 && (
                        <>
                            <Form.Label className="mt-3">Фильтр по офисам:</Form.Label>
                            <FormSelect
                                className="form-control"
                                value={selectedOffice}
                                onChange={handleOfficeChange}
                            >
                                <option value={0}>Все офисы</option>
                                {offices.map(office => (
                                    <option key={office.office_Id} value={office.office_Id}>
                                        ул. {office.street} д. {office.house}
                                    </option>
                                ))}
                            </FormSelect>
                        </>
                    )}
                </Form.Group>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {objects.length > 0 ? (
                            objects.map(object =>
                                <ObjectNote
                                    object={object}
                                    onClick={() => {
                                        if (role?.levelImportant === 2) {
                                            handleClickObject(object.id)
                                        }
                                    }}
                                    key={object.id}
                                />
                            )
                        ) : (
                            <div className="alert alert-warning">Объекты отсутствуют!</div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}