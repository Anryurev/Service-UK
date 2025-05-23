import React, {useContext, useEffect, useState} from 'react';
import {IBooking, IObject, IStatus} from '../../models';
import '../../Calendar.css';
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import api from "../../api";
import {BookingDatePage} from "../../pages/Operator/BookingDatePage";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";

interface CalendarDay {
    date: Date
    bookings: IBooking[],
    isCurrentMonth: boolean
}

const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null)
    const [selectedObject, setSelectedObject] = useState<IObject | null>(null)
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0)
    const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
    const [statusBooking, setStatusBooking] = useState<Record<string, number>>({})
    const navigate = useNavigate()
    const [objectsAll, setObjectsAll] = useState<IObject[]>([])
    const [bookingsAll, setBookingsAll] = useState<IBooking[]>([])
    const [statuses, setStatuses] = useState<IStatus[]>([])
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const LoadingData = async () => {
        try{
            const {worker, roles} = getAuthDataFromLocalStorage()
            const officeId = worker?.id_Office
            setLoading(true)
            setError(null)
            const responseObj = await api.get(`/Objects`)
            const responseBookings = await api.get(`/Bookings?Office_id=${officeId}`)
            const responseStatuses = await api.get(`/Status`)

            setObjectsAll(responseObj.data)
            setBookingsAll(responseBookings.data)
            setStatuses(responseStatuses.data)
        } catch (err) {
            setError('Не удалось загрузить данные')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        LoadingData()
    }, [selectedBooking])

    // Генерация дней месяца с бронированиями
    useEffect(() => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        // Устанавливаем первый день месяца
        setFirstDayOfMonth(new Date(year, month, 1).getDay())

        // Фильтруем бронирования по статусу, если фильтр активен
        const filteredBookings = statusFilter
            ? bookingsAll.filter(booking => booking.status === statusFilter)
            : bookingsAll;

        // Генерация дней месяца
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const generatedDays = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const date = new Date(year, month, day)
            const isCurrentMonth = true

            const bookings = filteredBookings?.length
                ? filteredBookings.filter(booking =>
                    date >= new Date(booking.date_Start) && date <= new Date(booking.date_End)
                )
                : []

            return { date, bookings, isCurrentMonth }
        })

        setCalendarDays(generatedDays)

        // const countByStatus = bookingsAll.reduce((acc, booking) => {
        //     const status = booking.status
        //     acc[status] = (acc[status] || 0) + 1 // Если статус встречается впервые, инициализируем 0
        //     return acc
        // }, {} as Record<string, number>)
        setStatusBooking(countOfBookingsByStatus(bookingsAll))
    }, [currentMonth, bookingsAll, statusFilter])

    const getWeeksWithPadding = (days: CalendarDay[], firstDayOfWeek: number): CalendarDay[][] => {
        const weeks: CalendarDay[][] = [];
        let firstWeekDays = 0

        // Создаем пустые элементы для первой недели
        const firstWeek: CalendarDay[] = [];
        if (firstDayOfWeek !== 0){
            for (let i = 0; i < firstDayOfWeek - 1; i++) {
                firstWeek.push({ date: new Date(-1), bookings: [], isCurrentMonth: false }); // Пустой элемент
            }
            // Добавляем дни первой недели
            firstWeekDays = 8 - firstDayOfWeek;
            firstWeek.push(...days.slice(0, firstWeekDays));
            weeks.push(firstWeek);
        } else {
            for (let i = 0; i < 6; i++) {
                firstWeek.push({ date: new Date(-1), bookings: [], isCurrentMonth: false }); // Пустой элемент
            }
            // Добавляем дни первой недели
            firstWeekDays = 1;
            firstWeek.push(...days.slice(0, firstWeekDays));
            weeks.push(firstWeek);
        }

        // Обрабатываем остальные недели
        for (let i = firstWeekDays; i < days.length; i += 7) {
            const weekDays = days.slice(i, i + 7);

            // Если последняя неделя содержит меньше 7 дней, дополняем пустыми элементами
            if (weekDays.length < 7) {
                const lastWeek = [...weekDays];
                while (lastWeek.length < 7) {
                    lastWeek.push({ date: new Date(-1), bookings: [], isCurrentMonth: false });
                }
                weeks.push(lastWeek);
            } else {
                weeks.push(weekDays);
            }
        }

        return weeks;
    };

    const weeks = getWeeksWithPadding(calendarDays, firstDayOfMonth);

    // Навигация по месяцам
    const changeMonth = (increment: number) => {
        setCurrentMonth(new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + increment,
            1
        ))
    }

    const countOfBookingsByStatus = (bookings: IBooking[] | undefined | null): Record<string, number> => {
        if (!bookings?.length) return {}

        return bookings.reduce((acc, booking) => {
            const status = booking?.status?.trim() || 'unknown'

            return {
                ...acc,
                [status]: (acc[status] ?? 0) + 1
            }
        }, {} as Record<string, number>)
    }

    const handleAddBooking = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const dateString = `${day}.${month}.${year}`

        navigate(`/booking/create?date=${dateString}`)
    }

    const styleItem = (status: string) => {
        switch (status) {
            case 'Свободна':
                return statusFilter === status
                    ? "btn btn-success active"
                    : "btn btn-outline-success"
            case 'Бронь':
                return statusFilter === status
                    ? "btn btn-warning active"
                    : "btn btn-outline-warning"
            case 'Сдана':
                return statusFilter === status
                    ? "btn btn-danger active"
                    : "btn btn-outline-danger"
            case 'Ремонт/Уборка':
                return statusFilter === status
                    ? "btn btn-primary active"
                    : "btn btn-outline-primary"
        }
    }

    const getBookingItemClass = (status: string) => {
        switch (status) {
            case 'Свободна':
                return "bg-success text-white"
            case 'Бронь':
                return "bg-warning text-dark"
            case 'Сдана':
                return "bg-danger text-white"
            case 'Ремонт/Уборка':
                return "bg-primary text-white"
            default:
                return "bg-secondary text-white"
        }
    }

    const getBookingCountClass = (status: string) => {
        switch (status) {
            case 'Свободна':
                return "day-number text-success"
            case 'Бронь':
                return "day-number text-warning"
            case 'Сдана':
                return "day-number text-danger"
            case 'Ремонт/Уборка':
                return "day-number text-primary"
            default:
                return "day-number text-secondary"
        }
    }

    const handleClickFilter = (status: string) => {
        setStatusFilter(current => current === status ? null : status);
    }

    const handleClickDate = (bookings: IBooking[], date: Date) => {
        if(bookings.length > 0){
            navigate(`/bookings/${date.toDateString()}`)  //YYYY-MM-DD
        }
        else return
    }

    if (error) return <div>{error}</div>

    return (
        <div className="calendar-container" style={{paddingTop: "60px"}}>

            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>Предыдущий месяц</button>
                <h2>
                    {currentMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={() => changeMonth(1)}>Следующий месяц</button>
            </div>
            <div className="btn-group" role="group">
                {Object.entries(statusBooking).map(([status, count]) => (
                    <button type="button" key={status} className={styleItem(status)} onClick={() => handleClickFilter(status)}>{status}: <strong>{count}</strong></button>
                ))}
            </div>

            <table className="calendar-table">
                <thead>
                <tr>
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {weeks.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <td
                                key={dayIndex}
                                className={`calendar-day ${day.bookings.length > 0 ? 'has-bookings' : ''} ${day.isCurrentMonth ? 'has-add-button' : ''}`}
                                onClick={() => handleClickDate(day.bookings, day.date)}
                            >
                                <div className="row align-items-center g-1">
                                    {day.isCurrentMonth && (
                                        <>
                                            <div className="col-auto pe-0">
                                                <div className="day-number col">{day.date.getDate()}</div>
                                            </div>
                                            <div className="col ps-1">
                                                <div className="d-flex flex-wrap gap-1">
                                                    {Object.entries(countOfBookingsByStatus(day.bookings)).map(([status, count]) => (
                                                        <span
                                                            className={getBookingCountClass(status)}
                                                            key={status}
                                                            style={{ fontSize: '0.7rem', padding: '0.1rem 0.3rem' }}
                                                        >
                                                            {count}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </>)}
                                </div>
                                <div className="day-bookings">
                                    {day.bookings.map(booking => {
                                        const object = objectsAll?.find(obj => obj.id === booking.object_id)

                                        return(
                                        <div
                                            key={booking.id_Booking}
                                            className={`booking-item ${getBookingItemClass(booking.status)}`}

                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedBooking(booking)
                                                setSelectedObject(object || null)
                                            }}
                                        >
                                            {object ? `ул. ${object.street} д. ${object.house} кв. ${object.apartment}`
                                            : 'Неизвестный объект'}
                                        </div>
                                    )})}
                                </div>
                                <button
                                    className="add-button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleAddBooking(day.date)
                                    }}
                                >
                                    <i className="bi bi-plus-lg"></i>
                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedBooking && selectedObject && (
                <BookingDetails
                    booking={selectedBooking}
                    object={selectedObject}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    );
};

const BookingDetails: React.FC<{ booking: IBooking, object: IObject, onClose: () => void }> = ({ booking, object,  onClose }) => {
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h3>Детали бронирования</h3>

                <div className="booking-details">
                    <p><strong>Объект:</strong> {'ул. ' + object.street + ' д. ' + object.house + ' кв. ' + object.apartment}</p>
                    <p><strong>Дата начала:</strong> {new Date(booking.date_Start).toLocaleDateString()}</p>
                    <p><strong>Дата окончания:</strong> {new Date(booking.date_End).toLocaleDateString()}</p>
                    <p><strong>Длительность:</strong> {Math.ceil(
                        (new Date(booking.date_End).getTime() - new Date(booking.date_Start).getTime()) / (1000 * 60 * 60 * 24)
                    )} дней</p>
                </div>
                <div className="modal-footer justify-content-between">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/booking/${booking.id_Booking}`)}
                    >
                        Редактировать
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                                edemContext.deleteBooking(booking.id_Booking)
                                onClose()
                            }}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Calendar;