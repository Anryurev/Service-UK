import React, {useEffect, useState} from "react";
import {IWork} from "../../../models";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {Navbar} from "../../../components/Navbar";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {SidebarOptions} from "../../../components/SidebarOptions";
import {RoleNote} from "../../../components/Role/RoleNote";
import {WorkNote} from "../../../components/Work/WorkNote";
import {Form} from "react-bootstrap";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";

export function WorksPage() {
    const [works, setWorks] = useState<IWork[]>([])
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const {worker, role} = getAuthDataFromLocalStorage()

    const LoadingWorks = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/TypesWork`)
            setWorks(response.data)
            setLoading(false)
        }catch (e){
            setLoading(true)
            console.error(e)
        }
    }

    useEffect(() => {
        LoadingWorks()
    }, [])

    const filteredWorks = works.length > 0 && works.filter((work) =>
        work.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            {/*<SidebarOptions title="тип работы" handleClick={() => navigate('/works/create')}/>*/}
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <div className="d-flex justify-content-between flex-row h-100 p-2 border-start align-items-center">
                    <h1 className="mb-3">Список типов работ</h1>
                    {Number(role?.levelImportant) < 3 &&
                        <button
                            className="btn h-75"
                            style={{background: "#6096ba", color: "white"}}
                            onClick={() => navigate('/works/create')}
                        >
                            Добавить тип работы
                        </button>}
                </div>
                <Form.Group className="mb-4">
                    <Form.Label>Поиск по типам работ:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        placeholder="Поиск типов работ"
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    >
                    </Form.Control>
                </Form.Group>
                {loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                    </div>
                )}
                {filteredWorks && filteredWorks.map(work => <WorkNote work={work} onClick={() => navigate(`/works/${work.id_Work}`)} key={work.id_Work}/>)}
                {!filteredWorks && !loading && <div className="alert alert-warning">Типы работ отсутствуют!</div> }
            </div>
        </>
    )
}