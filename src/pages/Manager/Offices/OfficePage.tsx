import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IObject, IOffice, IWorkers} from "../../../models";
import {Navbar} from "../../../components/Navbar";
import {WorkerNote} from "../../../components/Worker/WorkerNote";
import {ObjectNote} from "../../../components/Object/ObjectNote";
import api from "../../../api";
import {SidebarMenu} from "../../../components/SidebarMenu";

export function OfficePage(){
    const { officeId } = useParams<{ officeId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    // let workers: IWorkers[] = []
    // let objects: IObject[] = []
    const [workers, setWorkers] = useState<IWorkers[]>([])
    const [objects, setObjects] = useState<IObject[]>([])
    const [office, setOffice] = useState<IOffice | undefined>({
        office_Id: -1,
        street: "",
        house: "",
    })

    const LoadingData = async () => {
        const response = await api.get(`/Office/${officeId}`)
        const responseObjects = await api.get(`/Objects?Office=${officeId}`)
        const responseWorkers = await api.get(`/Workers?Office=${officeId}`)
        setWorkers(responseWorkers.data)
        setObjects(responseObjects.data)
        setOffice(response.data)
        console.log('workers', workers)
        console.log('objects', objects)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    if(!office){
        return (
            <div className="container" style={{paddingTop: "60px"}}>
                <h1>Офис не найден</h1>
            </div>
        )
    }

    const handleRemoveOffice = async (officeId: number) => {
        edemContext.deleteOffice(officeId)
        navigate(`/offices`)
    }

    return (
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container" style={{paddingTop: "60px"}}>
                <div className="container-fluid w-75 border">
                    <h1 className="mb-3">Информация об офисе</h1>
                    <div className="row justify-content-center">
                        <div className="row mb-3">
                            <div className="col-md-6 text-center d-flex">
                                <h5 className="mb-1"><strong>Улица: </strong> {office.street}</h5>
                            </div>
                            <div className="col-md-6 text-center d-flex">
                                <h5 className="mb-1"><strong>Дом: </strong> {office.house}</h5>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <h4>Сотрудники</h4>
                            {workers.length > 0? workers.map(worker => (
                                <WorkerNote worker={worker} onRemove={() => edemContext.deleteWorker} onClick={() => {}} key={worker.id}/>
                            )): <span>В данном офисе нет сотрудников</span>}
                        </div>
                        <div className="row justify-content-center">
                            <h4>Объекты</h4>
                            {objects.length > 0? objects.map(object => (
                                <ObjectNote object={object} onClick={() => {}} key={object.id}/>
                            )):  <span>В данном офисе нет объектов</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}