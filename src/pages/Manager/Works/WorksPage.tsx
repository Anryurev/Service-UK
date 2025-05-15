import React, {useEffect, useState} from "react";
import {IWork} from "../../../models";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {Navbar} from "../../../components/Navbar";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {SidebarOptions} from "../../../components/SidebarOptions";
import {RoleNote} from "../../../components/Role/RoleNote";
import {WorkNote} from "../../../components/Work/WorkNote";

export function WorksPage() {
    const [works, setWorks] = useState<IWork[]>([])
    const navigate = useNavigate()

    const LoadingWorks = async () => {
        const response = await api.get(`/TypesWork`)
        console.log('Get all typework', response.data)
        setWorks(response.data)
    }

    useEffect(() => {
        LoadingWorks()
    }, [])

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions handleClick={() => navigate('/works/create')}/>
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <h1 className="mb-3">Типы работ</h1>
                {works.map(work => <WorkNote work={work} key={work.id_Work}/>)}
            </div>
        </>
    )
}