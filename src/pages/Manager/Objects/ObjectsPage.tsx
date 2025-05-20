import React, { useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {ObjectNote} from "../../../components/Object/ObjectNote";
import {ModalCreateObject} from "../../../components/Object/ModalCreateObject";
import {IObject} from "../../../models";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {Form} from "react-bootstrap";
import {SidebarOptions} from "../../../components/SidebarOptions";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";
import api from "../../../api";

export function ObjectsPage(){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [objects, setObjects] = useState<IObject[]>([])
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)

    const LoadingData = async () => {
        const {worker, roles} = getAuthDataFromLocalStorage()
        const officeId = worker?.id_Office
        const response = await api.get(`/Objects?Office=${officeId}`)
        setObjects(response.data)
    }

    useEffect(() => {
        const {worker, roles} = getAuthDataFromLocalStorage()
        const officeId = worker?.id_Office
        LoadingData()
        console.log('useEffect')
    }, [])

    const handleCreateObject = (newObject: IObject) => {
        edemContext.createObject(newObject)
    }

    const handleClickObject = (objectId: number) => {
        navigate(`/objects/${objectId}`)
    }

    const filteredObjects = objects.filter((object) =>
            object.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
            object.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
            object.apartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            object.status.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <>
            {isOpenModal && <ModalCreateObject onSubmit={handleCreateObject} onClose={() => setIsOpenModal(false)} />}
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions handleClick={() => navigate('/objects/create')}/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Список объектов</h1>
                <Form.Group className="mb-4">
                    <Form.Label>Поиск по объектам:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        placeholder="Поиск объектов"
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    >
                    </Form.Control>
                </Form.Group>
                { filteredObjects.map(object => <ObjectNote object={object}
                                                                      onClick={handleClickObject}
                                                                      key={object.id}
                    />
                ) }
            </div>
        </>
    )
}