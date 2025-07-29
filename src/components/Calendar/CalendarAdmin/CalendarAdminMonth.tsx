import React, {useEffect, useState} from 'react';
import {IBooking, IObject, IRequest} from '../../../models';
import '../../../styles/CalendarAdmin.css';
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";
import {useRequest} from "../../../storage/Request/useRequest";

interface CalendarDay {
    date: Date
    bookings: IBooking[],
    isCurrentMonth: boolean
}

const CalendarAdminMonth: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null)
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0)
    const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
    const navigate = useNavigate()
    const [objectsAll, setObjectsAll] = useState<IObject[]>([])
    const [bookingsAll, setBookingsAll] = useState<IBooking[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { updateRequestObject } = useRequest()

    const LoadingData = async () => {
        try{
            setLoading(true)
            setError(null)
            const responseObj = await api.get(`/Objects/Worker`)
            const responseBookings = await api.get(`/Bookings/Worker`)
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

        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const generatedDays = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const date = new Date(year, month, day)

            const bookings = bookingsAll? bookingsAll.filter(booking => {
                const currentDateStr = formatDateForComparison(date)
                return formatDateForComparison(booking.date_Start) === currentDateStr ||
                    formatDateForComparison(booking.date_End) === currentDateStr
            }) : []

            return { date, bookings, isCurrentMonth: true }
        })

        setCalendarDays(generatedDays)
    }, [currentMonth, bookingsAll])

    const formatDateForComparison = (date: Date | string) => {
        const d = new Date(date)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }

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
            updateRequestObject(object?.id)
            navigate(`/request/execut`)
        } else{
            console.error("Ошибка при выборае объекта")
        }
    }

    const styleDot = (booking: IBooking, day: Date) => {
        if (formatDateForComparison(booking.date_Start) === formatDateForComparison(day))
            return "bg-success"
        if (formatDateForComparison(booking.date_End) === formatDateForComparison(day))
            return "bg-danger"
    }

    if (error) return <div className="alert alert-danger">{error}</div>

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

                                <div className="dots-container">
                                    {day.isCurrentMonth && day.bookings.length > 0 && (
                                        <>
                                            {day.bookings.slice(0, 2).map(booking => (
                                                <div className={`booking-dot ${styleDot(booking, day.date)}`} key={booking.id_Booking}></div>
                                            ))}
                                            {day.bookings.length > 2 && (
                                                <div
                                                    className={`booking-dot-more ${styleDot(day.bookings[2], day.date)}`}
                                                    title={`${day.bookings.length} бронирований`}
                                                >
                                                    +{day.bookings.length - 2}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="row  justify-content-start">
                    <div className="dots-container col-auto">
                        <div className={`booking-dot bg-success`}></div>
                        <span>Заезды</span>
                    </div>
                    <div className="dots-container col-auto">
                        <div className={`booking-dot bg-danger`}></div>
                        <span>Выезды</span>
                    </div>
                </div>
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

interface TaskCount {
    created: number
    assigned: number
    inProgress: number
    completed: number
    other: number
}

const MobileDayModal: React.FC<MobileDayModalProps> = ({day, objectsAll, onClose, onBookingClick, onAddClick}) => {
    const [requests, setRequests] = useState<IRequest[]>([])
    const navigate = useNavigate()
    const LoadingData = async () => {
        const responseRequests = await api.get(`/Requests`)
        setRequests(responseRequests.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])
    const countTasksByStatus = (requests: IRequest[], objectId: number | null): TaskCount => {
        const counts: TaskCount = {
            created: 0,
            assigned: 0,
            inProgress: 0,
            completed: 0,
            other: 0
        }

        if (!objectId) return counts

        requests && requests
            .filter(request => request.object_Id === objectId)
            .forEach(request => {
                switch(request.status) {
                    case 'Создано': counts.created++; break;
                    case 'Назначено': counts.assigned++; break;
                    case 'В процессе': counts.inProgress++; break;
                    case 'Выполнено': counts.completed++; break;
                    default: counts.other++; break;
                }
            })

        return counts
    }

    const formatdData = (date: Date) => {
        console.log('DATE', date)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    const StatusBadges = ({ counts }: { counts: TaskCount }) => (
        <div className="d-flex gap-1 ms-2">
            {counts.created > 0 && (
                <span className={`badge rounded-pill bg-success text-white`}>
        {counts.created}
      </span>
            )}
            {counts.assigned > 0 && (
                <span className={`badge rounded-pill bg-warning text-dark`}>
        {counts.assigned}
      </span>
            )}
            {counts.inProgress > 0 && (
                <span className={`badge rounded-pill bg-danger text-white`}>
        {counts.inProgress}
      </span>
            )}
            {counts.completed > 0 && (
                <span className={`badge rounded-pill bg-primary text-white`}>
        {counts.completed}
      </span>
            )}
            {counts.other > 0 && (
                <span className={`badge rounded-pill bg-secondary text-white`}>
        {counts.other}
      </span>
            )}
        </div>
    )

    return (
        <div className="mobile-day-modal p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">
                    {day.date.getDate()} {day.date.toLocaleString('ru-RU', { month: 'long' })}
                </h3>
                <button
                    className="close-btn btn btn-sm btn-outline-secondary"
                    onClick={onClose}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>

            <div className="bookings-list">
                {day.bookings.length > 0 ? (
                    day.bookings.map(booking => {
                        const object = objectsAll.find(obj => obj.id === booking.object_id) || null;
                        const taskCounts = countTasksByStatus(requests, object?.id ?? null);
                        const totalTasks = Object.values(taskCounts).reduce((a, b) => a + b, 0);

                        return (
                            <div
                                key={booking.id_Booking}
                                className="mobile-booking-item"
                                onClick={() => navigate('/requests', { state: { objectId: booking.object_id } })}
                            >
                                <div className="booking-main-info">
                                    <div className="booking-address">
                                        <i className="bi bi-house-door me-2"></i>
                                        {object ? `ул. ${object.street}, д. ${object.house}` : 'Неизвестный объект'}
                                    </div>
                                    <div className="booking-dates">
                                        <div className="check-in">
                                            <i className="bi bi-box-arrow-in-down me-1"></i>
                                            {formatdData(new Date(booking.date_Start))}
                                        </div>
                                        <span className="check-out">
                                            <i className="bi bi-box-arrow-up me-1"></i>
                                            {formatdData(new Date(booking.date_End))}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onBookingClick(booking)
                                    }}
                                >
                                    <i className="bi bi-person-plus" style={{fontSize: "23px"}}></i>
                                </div>

                                {totalTasks > 0 && (
                                    <div className="booking-tasks">
                                        <StatusBadges counts={taskCounts} />
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="no-bookings text-center py-4">
                        <i className="bi bi-calendar-x fs-1 text-muted"></i>
                        <p className="mt-2">Нет бронирований</p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default CalendarAdminMonth;