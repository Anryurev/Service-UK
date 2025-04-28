import {IBooking} from "../models";

export interface BookingObjectProps {
    date: Date,
    objects: IBooking[]
}

export const bookingObjects: BookingObjectProps[] = [
    {
        date: new Date(2023, 1, 1),
        objects: [
            {id_Booking: 1, object_id: 1, date_Start: new Date(2023, 10, 2), date_End: new Date(2023, 10, 10), status: 'Свободна'},
            {id_Booking: 2, object_id: 2, date_Start: new Date(2023, 11, 4), date_End: new Date(2023, 11, 13), status: 'Бронь'},
            {id_Booking: 3, object_id: 2, date_Start: new Date(2025, 3, 1), date_End: new Date(2025, 3, 13), status: 'Ремонт/Уборка'},
        ]
    }
]