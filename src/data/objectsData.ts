import {IObject} from "../models";

export const objectsData: IObject[] = [
    {
        id: 1,
        office_id: 1,
        street: 'Ломоносова',
        house: '10',
        apartment: '42',
        rooms: 2,
        status: 'Забронировано',
        area: 52,
        kitchen: true,
        balcony: true
    },
    {
        id: 2,
        office_id: 2,
        street: 'Маерчака',
        house: '5',
        apartment: '124',
        rooms: 4,
        status: 'Свободно', // rent, spare
        area: 89.2,
        kitchen: true,
        balcony: true
    },
    {
        id: 3,
        office_id: 1,
        street: 'Ленина',
        house: '56',
        apartment: '15',
        rooms: 1,
        status: 'Сдается', // rent, spare
        area: 26,
        kitchen: false,
        balcony: false
    }
]