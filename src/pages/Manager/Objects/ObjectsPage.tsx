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
    const [searchQuery, setSearchQuery] = useState('')
    const [objects, setObjects] = useState<IObject[]>([])
    const {worker, role} = getAuthDataFromLocalStorage()
    const [isOperator, setIsOperator] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)

    const LoadingData = async () => {
        const response = await api.get(`/Objects${Number(role?.levelImportant) === 2? "" : "/Worker"}`)
        setObjects(response.data)
    }

    const filteredObjects = objects.filter((object) =>
        object.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.apartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        object.status.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        LoadingData()
        console.log('useEffect')
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

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions title="объект" handleClick={() => navigate('/objects/create')}/>
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