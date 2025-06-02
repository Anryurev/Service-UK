import React, {useContext, useEffect, useState} from 'react';
import {IBooking, IObject} from '../../../models';
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";
import {Badge, Button} from "react-bootstrap";
import {useRequest} from "../../../storage/Request/useRequest";

interface CalendarDay {
    date: Date
    bookings: IBooking[]
}

const CalendarAdminWeek: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null)
    const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
    const [objectsAll, setObjectsAll] = useState<IObject[]>([])
    const [bookingsAll, setBookingsAll] = useState<IBooking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { updateRequestObject } = useRequest()
    const navigate = useNavigate()

    // Загрузка данных
    const LoadingData = async () => {
        try {
            const {worker} = getAuthDataFromLocalStorage()
            const officeId = worker?.id_Office
            setLoading(true)

            const [objectsRes, bookingsRes] = await Promise.all([
                api.get(`/Objects/Worker`),
                api.get(`/Bookings/Worker`)
            ])

            setObjectsAll(objectsRes.data)
            setBookingsAll(bookingsRes.data)
        } catch (err) {
            setError('Не удалось загрузить данные')
            console.error(err)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        LoadingData()
    }, [])

    // Генерация дней недели с бронированиями
    useEffect(() => {
        const generateWeekDays = () => {
            const days: CalendarDay[] = []
            const currentDayOfWeek = currentDate.getDay()
            const startOfWeek = new Date(currentDate)
            startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1))

            for (let i = 0; i < 7; i++) {
                const date = new Date(startOfWeek)
                date.setDate(startOfWeek.getDate() + i)

                const bookings = bookingsAll.filter(booking => {
                    const bookingDate = new Date(booking.date_Start)
                    return (
                        date.getDate() === bookingDate.getDate() &&
                        date.getMonth() === bookingDate.getMonth() &&
                        date.getFullYear() === bookingDate.getFullYear()
                    )
                })

                days.push({ date, bookings })
            }

            return days;
        }

        setCalendarDays(generateWeekDays());
    }, [currentDate, bookingsAll]);

    // Навигация по неделям
    const changeWeek = (increment: number) => {
        const newDate = new Date(currentDate)
        newDate.setDate(currentDate.getDate() + (increment * 7))
        setCurrentDate(newDate)
    }

    const handleClickBooking = (booking: IBooking) => {
        const object = objectsAll?.find(obj => obj.id === booking.object_id)
        if(object){
            console.log("объект выбирается", object)
            updateRequestObject(object?.id)
            navigate(`/request/execut`)
        }else{
            console.error("Ошибка при выборае объекта")
        }
    }

    // Получение цвета по статусу
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Свободна': return 'success'
            case 'Бронь': return 'warning'
            case 'Сдана': return 'danger'
            case 'Ремонт/Уборка': return 'primary'
            default: return 'secondary'
        }
    }

    // Форматирование даты
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        })
    }

    if (loading) return <div className="text-center py-4">Загрузка...</div>
    if (error) return <div className="alert alert-danger">{error}</div>

    return (
        <div className="mobile-calendar-container">
            {/* Шапка календаря */}
            <div className="calendar-header">
                <Button variant="link" onClick={() => changeWeek(-1)} className="nav-button">
                    <i className="bi bi-chevron-left"></i>
                </Button>
                <div className="week-title">
                    {formatDate(calendarDays[0]?.date)} - {formatDate(calendarDays[6]?.date)}
                </div>
                <Button variant="link" onClick={() => changeWeek(1)} className="nav-button">
                    <i className="bi bi-chevron-right"></i>
                </Button>
            </div>

            {/* Горизонтальная прокрутка дней */}
            <div className="days-scroll-container">
                <div className="days-scroll">
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`day-cell ${day.date.toDateString() === new Date().toDateString() ? 'today' : ''}`}
                            autoFocus={day.date.toDateString() === new Date().toDateString()}
                        >
                            <div className="day-header">
                                <div className="weekday">{['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][day.date.getDay()]}</div>
                                <div className="day-number">{day.date.getDate()}</div>
                            </div>

                            <div className="bookings-list">
                                {day.bookings.length > 0 ? (
                                    day.bookings.map(booking => {
                                        const object = objectsAll.find(o => o.id === booking.object_id);
                                        return (
                                            <div
                                                key={booking.id_Booking}
                                                className="booking-item row">
                                                <div
                                                    className="col"
                                                    onClick={() => setSelectedBooking(booking)}
                                                >
                                                    <Badge bg={getStatusColor(booking.status)} className="status-badge">
                                                        {booking.status}
                                                    </Badge>
                                                    <div className="booking-address">
                                                        {object ? `${object.street} ${object.house}${object.apartment ? ` кв.${object.apartment}` : ''}` : 'Адрес не указан'}
                                                    </div>
                                                </div>
                                                <div className="col-auto me-2">
                                                    <i
                                                        className="bi bi-person-plus"
                                                        style={{fontSize: "23px"}}
                                                        onClick={() => handleClickBooking(booking)}
                                                    ></i>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="no-bookings">Нет бронирований</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Модальное окно бронирования */}
            {selectedBooking && (
                <div className="booking-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Детали бронирования</h5>
                            <button className="close-btn" onClick={() => setSelectedBooking(null)}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-item">
                                <span className="detail-label">Адрес:</span>
                                <span className="detail-value">
                                    {(() => {
                                        const object = objectsAll.find(o => o.id === selectedBooking.object_id);
                                        return object ? `${object.street} ${object.house}${object.apartment ? ` кв.${object.apartment}` : ''}` : 'Не указан';
                                    })()}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Заезд:</span>
                                <span className="detail-value">
                                    {new Date(selectedBooking.date_Start).toLocaleDateString('ru-RU')}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Выезд:</span>
                                <span className="detail-value">
                                    {new Date(selectedBooking.date_End).toLocaleDateString('ru-RU')}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Статус:</span>
                                <span className="detail-value">
                                    <Badge bg={getStatusColor(selectedBooking.status)}>
                                        {selectedBooking.status}
                                    </Badge>
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer mb-5">
                            <Button
                                variant="primary"
                                className="w-100"
                                onClick={() => {
                                    handleClickBooking(selectedBooking)
                                }}
                            >
                                Назначить задание
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarAdminWeek;