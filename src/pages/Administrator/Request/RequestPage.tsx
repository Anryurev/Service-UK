import React, { useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {useNavigate} from "react-router-dom";
import {IObject, IRequest, IRole, IStatus, IWorkers, RoleItem} from "../../../models";
import {useParams} from "react-router-dom";
import api from "../../../api";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";
import { Container, Card, Badge, ListGroup, Button, Row, Col} from "react-bootstrap";
import {RequestPagesCard} from "../../../components/Request/RequestPagesCard";

export function RequestPage() {
    const { requestId } = useParams<{ requestId: string }>()
    const [request, setRequest] = useState<IRequest | null>(null)

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await api.get(`/Request/${requestId}`)
            setRequest(response.data)
        }

        fetchResponse()
    }, [])

    return (
        <>
            <Navbar />
            <Container className="mt-4" style={{ paddingTop: '60px' }}>
                {request && <RequestPagesCard request={request} fromReport={false}/>}
            </Container>
        </>
    )
}