import React, {useEffect, useState} from "react";
import {IBooking, IObject} from "../../models";
import {Navbar} from "../../components/Navbar";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import {Badge, Button, Card, ListGroup} from "react-bootstrap";

export function BookingDatePage(){
    const [bookings, setBookings] = useState<IBooking[]>([])
    const { date } = useParams<{ date: string }>()
    const [objects, setObjects] = useState<IObject[]>([])
    const navigate = useNavigate()

    const LoadingData = async (date: string) => {
        const responseBookings = await api.get(`/BookingDate/${date}`)
        const responseObject = await api.get(`/Objects`)
        setBookings(responseBookings.data)
        setObjects(responseObject.data)
        console.log('bookings op date', bookings)
    }

    useEffect(() => {
        if(date){
            LoadingData(date)
        }
    }, [])

    if(!bookings) return (<div>Бронировани не найдены</div>)

    const getOneObjectByBooking = (object_id: number) => {
        return objects.find(obj => obj.id === object_id)
    }
    const removeClick = (id_Booking: number) => {
        const response = api.delete(`/Booking/${id_Booking}`)
    }

    const handleClickInformation = (object_id: number) => {
        navigate(`/objects/${object_id}`)
    }

    return (
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <h1>Информация о бронированиях на {date}</h1>
                {bookings.map(booking => (
                    <ListGroup.Item key={booking.id_Booking} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>ул. {getOneObjectByBooking(booking.object_id)?.street} д. {getOneObjectByBooking(booking.object_id)?.house} кв. {getOneObjectByBooking(booking.object_id)?.apartment}</Card.Title>
                                <Card.Text>Дата заезда: {booking.date_Start.toLocaleString()}</Card.Text>
                                <Card.Text>Дата выезда: {booking.date_End.toLocaleString()}</Card.Text>
                                <Badge
                                    bg={
                                        booking.status === "Бронь"
                                            ? "warning"
                                            : booking.status === "Сдана"
                                                ? "danger"
                                                : "primary"
                                    }
                                    className="mb-2 text-lg-center"
                                >
                                    {booking.status}
                                </Badge>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeClick(booking.id_Booking)}
                                    >
                                        Отменить бронь
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => handleClickInformation(booking.object_id)}
                                    >
                                        Информация об объекте
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </div>
        </>
    )
}