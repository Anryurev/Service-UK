import React, { useState } from 'react';
import { IBooking } from '../../models';
import { BookingObjectProps, bookingObjects } from '../../data/bookingdata';
import '../../Calendar.css';
import {objectsData} from "../../data/objectsData";

interface CalendarDay {
    date: Date;
    bookings: IBooking[];
}

const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

    // Генерация дней месяца с бронированиями
    const generateCalendarDays = (): CalendarDay[] => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);

            // Находим бронирования для этой даты
            const bookings = bookingObjects.flatMap(bookingObj =>
                bookingObj.objects.filter(booking =>
                    date >= new Date(booking.dateStart) && date <= new Date(booking.dateEnd)
                )
            );

            return { date, bookings };
        });
    };

    const calendarDays = generateCalendarDays();

    // Разбивка на недели
    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7));
    }

    // Навигация по месяцам
    const changeMonth = (increment: number) => {
        setCurrentMonth(new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + increment,
            1
        ));
    };

    return (
        <div className="calendar-container" style={{paddingTop: "60px"}}>
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>Предыдущий месяц</button>
                <h2>
                    {currentMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={() => changeMonth(1)}>Следующий месяц</button>
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
                                className={`calendar-day ${day.bookings.length > 0 ? 'has-bookings' : ''}`}
                            >
                                <div className="day-number">{day.date.getDate()}</div>
                                <div className="day-bookings">
                                    {day.bookings.map(booking => (
                                        <div
                                            key={booking.id}
                                            className="booking-item"
                                            onClick={() => setSelectedBooking(booking)}
                                        >
                                            Объект #{booking.idObject}
                                        </div>
                                    ))}
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedBooking && (
                <BookingDetails
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    );
};

const BookingDetails: React.FC<{ booking: IBooking, onClose: () => void }> = ({ booking, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h3>Детали бронирования</h3>

                <div className="booking-details">
                    <p><strong>Объект:</strong> {'ул. ' + objectsData[booking.idObject].street + ' д. ' + objectsData[booking.idObject].house + ' кв. ' + objectsData[booking.idObject].apartment}</p>
                    <p><strong>Дата начала:</strong> {booking.dateStart.toLocaleDateString()}</p>
                    <p><strong>Дата окончания:</strong> {booking.dateEnd.toLocaleDateString()}</p>
                    <p><strong>Длительность:</strong> {Math.ceil(
                        (booking.dateEnd.getTime() - booking.dateStart.getTime()) / (1000 * 60 * 60 * 24)
                    )} дней</p>
                </div>
            </div>
        </div>
    );
};

export default Calendar;