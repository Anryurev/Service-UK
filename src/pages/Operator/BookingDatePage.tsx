import React, {useEffect, useState} from "react";
import {IBooking, IObject} from "../../models";
import {Navbar} from "../../components/Navbar";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import {Badge, Button, Card, ListGroup} from "react-bootstrap";
import {SidebarMenu} from "../../components/SidebarMenu";

export function BookingDatePage(){
    const [bookings, setBookings] = useState<IBooking[]>([])
    const { date } = useParams<{ date: string }>()
    const [objects, setObjects] = useState<IObject[]>([])
    const [formattedDate, setFormattedDate] = useState(date)
    const navigate = useNavigate()

    const LoadingData = async (date: string) => {
        const responseBookings = await api.get(`/BookingDate/${date}`)
        const responseObject = await api.get(`/Objects/Worker`)
        setBookings(responseBookings.data)
        setObjects(responseObject.data)
        console.log('bookings op date', bookings)
    }

    const FormatdData = (date: Date) => {
        console.log('DATE', date)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    useEffect(() => {
        if(date){
            LoadingData(date)
            const curDate = new Date(date)
            setFormattedDate(FormatdData(curDate))
            console.log(formattedDate)
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
            <SidebarMenu isOpen={true}/>
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <h1>Информация о бронированиях на {formattedDate}</h1>
                {bookings.map(booking => (
                    <ListGroup.Item key={booking.id_Booking} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>ул. {getOneObjectByBooking(booking.object_id)?.street} д. {getOneObjectByBooking(booking.object_id)?.house} кв. {getOneObjectByBooking(booking.object_id)?.apartment}</Card.Title>
                                <Card.Text>Дата заезда: {FormatdData(new Date(booking.date_Start))}</Card.Text>
                                <Card.Text>Дата выезда: {FormatdData(new Date(booking.date_End as Date))}</Card.Text>
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
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => navigate(`/booking/${booking.id_Booking}`)}
                                    >
                                        Редактировать
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