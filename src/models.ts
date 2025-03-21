// Файл для интерфейсов разных объектов
export interface IObject{
    id: number,
    office_id: number,
    street: string,
    house: string,
    apartment: string,
    rooms: number,
    status: string,
    check_in: string,
    leaving: string,
    area: number,
    kitchen: boolean,
    balcony: boolean
    [key: string]: string | number | boolean
}

export interface IUsers{
    address: {
        geolocation: {
            lat: string,
            long: string
        },
        city: string,
        street: string,
        number: number,
        zipcode: string
    },
    id: number,
    email: string,
    username: string,
    password: string,
    name: {
        firstname: string,
        lastname: string
    },
    phone: string,
    v: number


    // id: number,
    // username: string,
    // surname: string,
    // fatherName: string,
    // phoneNumber: string,
    // email: string,
    // birthday: Date,
    // idRole: number,
    // idOffice: number,
    // login: string,
    // password: string
}

export interface IState {
    users: IUsers[],
    objects: IObject[]
}

export type Action = {type: string, payload?: any}