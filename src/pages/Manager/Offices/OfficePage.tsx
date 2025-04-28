import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IOffice, IUsers} from "../../../models";
import {Navbar} from "../../../components/Navbar";
import {WorkerNote} from "../../../components/Worker/WorkerNote";
import {ObjectNote} from "../../../components/Object/ObjectNote";

export function OfficePage(){
    const { officeId } = useParams<{ officeId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [office, setOffice] = useState<IOffice | undefined>({
        office_Id: -1,
        street: "",
        house: "",
    })

    async function findOffice(){
        const office_current: IOffice | undefined = edemContext.state.offices.find(office => office.office_Id === Number(officeId));
        setOffice(office_current)
    }

    useEffect(() => {
        findOffice()
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

    const Users = edemContext.state.users.filter(user => user.id_Office === Number(officeId))
    const objects = edemContext.state.objects.filter(object => object.office_Id === Number(officeId))
    console.log('objects', edemContext.state.objects)


    return (
        <>
            <Navbar/>
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
                            {Users.map(user => (
                                <WorkerNote user={user} onRemove={() => edemContext.deleteUser} onClick={() => {}} key={user.id}/>
                            ))}
                        </div>
                        <div className="row justify-content-center">
                            <h4>Объекты</h4>
                            {objects.map(object => (
                                <ObjectNote object={object} onClick={() => {}} key={object.id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}