import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {SidebarOptions} from "../../../components/SidebarOptions";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {OfficeNote} from "../../../components/Office/OfficeNote";
import {Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../api";
import {IOffice} from "../../../models";

export function OfficesPage() {
    const edemContext = useContext(EdembackContext)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const [offices, setOffices] = useState<IOffice[]>([])

    const LoadingOffices = async () => {
        const response = await api.get(`/Offices`)
        setOffices(response.data)
    }

    useEffect(() => {
        LoadingOffices()
    }, [])

    const filteredOffices = offices.filter((office) =>
            office.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
            office.street.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleClickOffice = (officeId: number) => {
        navigate(`/offices/${officeId}`)
    }

    return (
        <>
            <Navbar/>
            <SidebarMenu isOpen={false}/>
            <SidebarOptions title="офис" handleClick={() => navigate('/offices/create')}/>
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <h1>Список офисов</h1>
                <Form.Group className="mb-4">
                    <Form.Label>Поиск по офисам:</Form.Label>
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
                {filteredOffices.map(office => (
                    <OfficeNote office={office} key={office.office_Id} onClick={handleClickOffice}/>
                ))}
            </div>
        </>
    )
}