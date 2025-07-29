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
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";

export function OfficesPage() {
    const edemContext = useContext(EdembackContext)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const [offices, setOffices] = useState<IOffice[]>([])
    const [loading, setLoading] = useState(false)
    const {worker, role} = getAuthDataFromLocalStorage()

    const LoadingOffices = async () => {
        try{
            setLoading(true)
            const response = await api.get(`/Offices`)
            setOffices(response.data)
            setLoading(false)
        }catch (e){
            setLoading(true)
            console.error(e)
        }

    }

    useEffect(() => {
        LoadingOffices()
    }, [])

    const filteredOffices = offices.length > 0 && offices.filter((office) =>
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
            {/*<SidebarOptions title="офис" handleClick={() => navigate('/offices/create')}/>*/}
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <div className="d-flex justify-content-between flex-row h-100 p-2 border-start align-items-center">
                    <h1 className="mb-3">Список офисов</h1>
                    {Number(role?.levelImportant) < 3 &&
                        <button
                            className="btn h-75"
                            style={{background: "#6096ba", color: "white"}}
                            onClick={() => navigate('/offices/create')}
                        >
                            Добавить офис
                        </button>}
                </div>
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
                {loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                    </div>
                )}
                {filteredOffices && filteredOffices.map(office => (
                    <OfficeNote office={office} key={office.office_Id} onClick={handleClickOffice}/>
                ))}
                { !filteredOffices && !loading && <div className="alert alert-warning">Офисы отсутствуют!</div> }
            </div>
        </>
    )
}