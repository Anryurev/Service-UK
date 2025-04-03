import {IBooking} from "../models";

export interface BookingObjectProps {
    date: Date,
    objects: IBooking[]
}

export const bookingObjects: BookingObjectProps[] = [
    {
        date: new Date(2023, 1, 1),
        objects: [
            {id: 1, idObject: 1, dateStart: new Date(2023, 10, 2), dateEnd: new Date(2023, 10, 10)},
            {id: 2, idObject: 2, dateStart: new Date(2023, 11, 4), dateEnd: new Date(2023, 11, 13)},
            {id: 3, idObject: 2, dateStart: new Date(2025, 3, 1), dateEnd: new Date(2025, 3, 13)},
        ]
    }
]