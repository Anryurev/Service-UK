import React, {useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {DayCard} from "../../components/Calendar/DayCard";
import {BookingObjectProps, bookingObjects} from "../../data/bookingdata";
import {IBooking} from "../../models";
import Calendar from "../../components/Calendar/Calendar";
import {SidebarMenu} from "../../components/SidebarMenu";


 export  const CalendarPage: React.FC = () => {
        const [dayCards, setDayCards] = useState<{date: string, objects: BookingObjectProps[]}[]>([]);

        useEffect(() => {
            // Группируем объекты по дате заселения
            const groupedByDate: {[key: string]: BookingObjectProps[]} = {};

            bookingObjects.forEach(objs => {
                if (!groupedByDate[objs.date.toLocaleDateString()]) {
                    groupedByDate[objs.date.toLocaleDateString()] = [];
                }
                groupedByDate[objs.date.toLocaleDateString()].push(objs);
            });

            // Преобразуем в массив для рендеринга
            const cards = Object.keys(groupedByDate).map(date => ({
                date,
                objects: groupedByDate[date]
            }));

            // Сортируем по дате
            cards.sort((a, b) => {
                const dateA = a.date.split('.').reverse().join('-');
                const dateB = b.date.split('.').reverse().join('-');
                return new Date(dateA).getTime() - new Date(dateB).getTime();
            });

            setDayCards(cards);
        }, []);


    return (
        <div className="container-fluid">
            <div className="row h-100">
                <div className="col-md-2 p-0">
                    <SidebarMenu isOpen={true}/>
                </div>
                <div className="col-md-10 h-100 overflow-auto">
                    <Calendar/>
                </div>
            </div>
            <Navbar/>

            {/*<div className="calendar-view"  style={{paddingTop: "60px"}}>*/}
            {/*    <h2>Календарь сдачи квартир</h2>*/}
            {/*    <div className="calendar-grid">*/}
            {/*        {dayCards.map((dayCard, index) => (*/}
            {/*            <DayCard*/}
            {/*                key={index}*/}
            {/*                date={dayCard.date}*/}
            {/*                bookingObjects={dayCard.objects}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}