// Файл для интерфейсов разных объектов
export interface IObject{
    id: number,
    office_id: number,
    street: string,
    house: string,
    apartment: string,
    rooms: number,
    status: string,
    area: number,
    kitchen: boolean,
    balcony: boolean
    [key: string]: string | number | boolean
}

export interface IUsers{
    id: number,
    name: string,
    surname: string,
    fathername: string,
    phoneNumber: string,
    email: string,
    birthday: string,
    id_Role: number,
    id_Office: number,
    password: string,
}

export interface IRole{
    role_Id: number,
    name: string,
    salary: number // оклад
}

export interface IRequest {
    id: number,
    idRole: number,
    idUser: number,
    idObject: number,
    status: string,
    urgency: boolean // срочность
}

export interface IOffice {
    id: number,
    street: string,
    house: string
}

export interface IState {
    users: IUsers[],
    objects: IObject[],
    roles: IRole[]
}

export interface IDayCard {
    date: Date;
    objects: IObject[];
}

export interface IBooking {
    id: number,
    idObject: number,
    dateStart: Date,
    dateEnd: Date
}

export type Action = {type: string, payload?: any}