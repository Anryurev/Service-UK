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

export function WorksPage() {
    const [works, setWorks] = useState<IWork[]>([])
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')

    const LoadingWorks = async () => {
        const response = await api.get(`/TypesWork`)
        console.log('Get all typework', response.data)
        setWorks(response.data)
    }

    useEffect(() => {
        LoadingWorks()
    }, [])

    const filteredWorks = works.filter((work) =>
        work.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions handleClick={() => navigate('/works/create')}/>
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <h1 className="mb-3">Типы работ</h1>
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
                {filteredWorks.map(work => <WorkNote work={work} onClick={() => navigate(`/works/${work.id_Work}`)} key={work.id_Work}/>)}
            </div>
        </>
    )
}