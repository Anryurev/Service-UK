import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import {IObject, IOffice} from "../../../models";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import api from "../../../api";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";

export function ObjectPage() {
    const { objectId } = useParams<{ objectId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [offices, setOffices] = useState<IOffice[]>([])
    const {worker, role} = getAuthDataFromLocalStorage()
    const [object, setObject] = useState<IObject>({
        id: -1,
        office_Id: 0,
        street: "",
        house: "",
        apartment: "",
        rooms: 0,
        status: 'Свободно',
        area: 0,
        kitchen: false,
        balcony: false
    })

    const fetchObject = async (id: number) => {
        try {
            setLoading(true)
            setError(null)

            // Очищаем форму перед загрузкой новых данных
            setObject({
                id: -1,
                office_Id: 0,
                street: "",
                house: "",
                apartment: "",
                rooms: 0,
                status: 'Свободно',
                area: 0,
                kitchen: false,
                balcony: false
            })

            // Загружаем данные
            const response = await api.get(`/Object/${id}`)

            setObject(response.data)

        } catch (err) {
            setError('Не удалось загрузить данные')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const LoadingOffices = async () => {
        const responseOffice = await api.get(`/Offices`)
        setOffices(responseOffice.data)
    }

    useEffect(() => {
        if (objectId) {
            const id = Number(objectId)
            if (!isNaN(id)) {
                fetchObject(id)
                LoadingOffices()
            }
        }
    }, [objectId])

    const getOfficeById = (officeId: number): string => {
        console.log("roles", edemContext.state.roles)
        const office = offices.find((office) => office.office_Id === officeId)
        return office ? `${office.street} ${office.house}` : "Офис не найден"
    }

    if(!object){
        return (
            <div className="container" style={{paddingTop: "60px"}}>
                <h1>Объект не найден</h1>
            </div>
        )
    }

    const removeClick = (objectID: number) => {
        navigate(`/objects`)
        edemContext.deleteObject(objectID)
    }

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container" style={{paddingTop: "60px"}}>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card custom-card shadow-lg">
                                <div className="card-header text-white" style={{background: "#a3cef1"}}>
                                    <h3 className="card-title mb-0">Информация об объекте</h3>
                                </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-4 text-center d-flex align-items-center">
                                                <h5 className="mb-1">
                                                    <strong>Адрес: </strong> {object.street + ' д. ' + object.house + ' кв. ' + object.apartment}
                                                </h5>
                                            </div>

                                            <div className="col-md-8">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <strong>Количество комнат: </strong>{object.rooms}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <strong>Площадь: </strong>{object.area}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <strong>Офис: </strong> {getOfficeById(object.office_Id)}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <strong>Кухня: </strong>{object.kitchen ? "Есть" : "Нет"}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <strong>Балкон: </strong>{object.balcony ? "Есть" : "Нет"}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Статус: {object.status}
                                                    </li>
                                                </ul>
                                            </div>
                                            {role?.levelImportant === 2 && <div
                                                className="card-footer bg-light d-flex justify-content-between align-items-center">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/object/${object.id}`)}
                                                >Редактировать
                                                </button>
                                                <button
                                                    className="btn btn-s30 m btn-outline-danger"
                                                    onClick={() => removeClick(object.id)}
                                                >Удалить
                                                </button>
                                            </div>}
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}