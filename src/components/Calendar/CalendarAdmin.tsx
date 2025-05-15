import React, {useContext, useEffect, useState} from 'react';
import {IBooking, IObject} from '../../models';
import '../../CalendarAdmin.css';
import {useNavigate} from "react-router-dom";
import api from "../../api";
import {RequestContext} from "../../context/requestContext/RequestContext";

interface CalendarDay {
    date: Date
    bookings: IBooking[],
    isCurrentMonth: boolean
}

const CalendarAdmin: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null)
    const [selectedObject, setSelectedObject] = useState(0)
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0)
    const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
    const navigate = useNavigate()
    const [objectsAll, setObjectsAll] = useState<IObject[]>([])
    const [bookingsAll, setBookingsAll] = useState<IBooking[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
    const [error, setError] = useState<string | null>(null)
    const requestContext = useContext(RequestContext)

    const LoadingData = async () => {
        try{
            setLoading(true)
            setError(null)
            const responseObj = await api.get(`/Objects`)
            const responseBookings = await api.get(`/Bookings`)

            setObjectsAll(responseObj.data)
            setBookingsAll(responseBookings.data)
        } catch (err) {
            setError('Не удалось загрузить данные')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        LoadingData()
    }, [selectedBooking])

    // Генерация дней месяца с бронированиями
    useEffect(() => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        // Устанавливаем первый день месяца
        setFirstDayOfMonth(new Date(year, month, 1).getDay())

        // Генерация дней месяца
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const generatedDays = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const date = new Date(year, month, day)
            const isCurrentMonth = true

            const bookings = bookingsAll.filter(booking =>
                date >= new Date(booking.date_Start) && date <= new Date(booking.date_End)
            )

            return { date, bookings, isCurrentMonth }
        })

        setCalendarDays(generatedDays)
    }, [currentMonth, bookingsAll])

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


    const handleAddBooking = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const dateString = `${day}.${month}.${year}`

        navigate(`/booking/create?date=${dateString}`)
    }

    const handleClickBooking = (booking: IBooking) => {
        const object = objectsAll?.find(obj => obj.id === booking.object_id)
        console.log('object click', object)
        if (object){
            const selectedObjectId = object?.id
            if (requestContext?.request) {
                console.log('selectesObject', selectedObject)
                const updatedRequest = { ...requestContext.request, object_Id: selectedObjectId }
                requestContext.setRequest(updatedRequest)
            }
        }
        console.log('request click', requestContext.request)
        navigate(`/request/execut`)
    }

    if (error) return <div>{error}</div>

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <h2>
                    {currentMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={() => changeMonth(1)}>
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>

            {/* Добавляем компактный заголовок дней для мобильных */}
            <div className="mobile-days-header">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                    <span key={day}>{day.charAt(0)}</span>
                ))}
            </div>

            <div className="calendar-grid">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="calendar-week">
                        {week.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={`calendar-day-mobile ${day.isCurrentMonth ? '' : 'other-month'} ${day.bookings.length > 0 ? 'has-bookings' : ''}`}
                                onClick={() => day.isCurrentMonth && setSelectedDay(day)}
                            >
                                <div className="day-number">{day.isCurrentMonth ? day.date.getDate() : ''}</div>
                                {day.isCurrentMonth && day.bookings.length > 0 && (
                                    <div className="booking-dot"></div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {selectedDay && (
                <MobileDayModal
                    day={selectedDay}
                    objectsAll={objectsAll}
                    onClose={() => setSelectedDay(null)}
                    onBookingClick={(booking) => handleClickBooking(booking)}
                    onAddClick={() => handleAddBooking(selectedDay.date)}
                />
            )}
        </div>
    )
}

interface MobileDayModalProps {
    day: CalendarDay;
    objectsAll: IObject[];
    onClose: () => void;
    onBookingClick: (booking: IBooking) => void;
    onAddClick: () => void;
}

const MobileDayModal: React.FC<MobileDayModalProps> = ({day, objectsAll, onClose, onBookingClick, onAddClick}) => {
    return (
        <div className="mobile-day-modal">
            <button className="close-btn" onClick={onClose}>×</button>
            <h3>{day.date.getDate()} {day.date.toLocaleString('ru-RU', { month: 'long' })}</h3>

            <div className="bookings-list">
                {day.bookings.length > 0 ? (
                    day.bookings.map(booking => {
                        const object = objectsAll.find(obj => obj.id === booking.object_id);
                        return (
                            <div
                                key={booking.id_Booking}
                                className="mobile-booking-item"
                                onClick={() => onBookingClick(booking)}
                            >
                                {object ? `ул. ${object.street} д. ${object.house}` : 'Неизвестный объект'}
                                <div className="booking-time">
                                    {new Date(booking.date_Start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} -
                                    {new Date(booking.date_End).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Нет бронирований</p>
                )}
            </div>
        </div>
    );
};

export default CalendarAdmin;