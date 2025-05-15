import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {WorkerNote} from "../../../components/Worker/WorkerNote";
import {ModalCreateWorker} from "../../../components/Worker/ModalCreateWorker";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {Form} from "react-bootstrap";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {SidebarOptions} from "../../../components/SidebarOptions";
import api from "../../../api";
import {IWorkers} from "../../../models";

export function WorkersPage(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [workers, setWorkers] = useState<IWorkers[]>([])
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)

    const LoadingData = async () => {
        const response = await api.get(`/Workers`)
        setWorkers(response.data)
    }

    useEffect(() => {
        LoadingData()
        edemContext.getAllWorkers()
        // eslint-disable-next-line
    }, [workers])

    const handleClickWorker = (workerId: number) => {
        navigate(`/workers/${workerId}`)
    }

    const filteredWorkers = workers.filter((worker) =>
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
        // worker.role.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions handleClick={() => navigate('/Workers/create')}/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Список сотрудников</h1>
                <Form.Group className="mb-4">
                    <Form.Label>Поиск по сотрудникам:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        placeholder="Поиск пользователей"
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    >
                    </Form.Control>
                </Form.Group>
                { filteredWorkers.map(worker =>
                    <WorkerNote
                        worker={worker}
                        onRemove={() => edemContext.deleteWorker(worker.id)}
                        onClick={handleClickWorker}
                        key={worker.id}
                    />)
                }
            </div>
        </>
    )
}