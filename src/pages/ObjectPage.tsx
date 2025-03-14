import React, {useContext} from "react";
import {Navbar} from "../components/Navbar";
import {objects} from "../data/objectsdata";
import {useNavigate, useParams} from "react-router-dom";
import {IObject} from "../models";
import {EdembackContext} from "../context/edemback/EdembackContext";

export function ObjectPage() {
    const { objectId } = useParams<{ objectId: string }>()
    const edemContext = useContext(EdembackContext)
    const object: IObject | undefined = objects.find(object => object.id === Number(objectId));
    const navigate = useNavigate()

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

    return(
        <>
            <Navbar/>
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
                                            <h5 className="mb-1"><strong>Адрес: </strong> {object.street + ' д. ' + object.house + ' кв. ' + object.apartment}</h5>
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
                                        <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                                            <button className="btn btn-sm btn-outline-primary" >Редактировать</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeClick(object.id)}>Удалить</button>
                                        </div>
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