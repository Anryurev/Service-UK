// Файл для интерфейсов разных объектов
export interface IObject{
    id: number,
    office_Id: number,
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
    request_Id: number,
    role_Id: number,
    worker_Id?: number,
    object_Id: number,
    status: string,
    urgency: boolean // срочность
}

export interface IOffice {
    office_Id: number,
    street: string,
    house: string
}

export interface IBooking {
    id_Booking: number,
    object_id: number,
    date_Start: Date | string,
    date_End: Date | string,
    status: string
}

export interface IStatus{
    id_status: number,
    name: string
}

export interface IState {
    users: IUsers[],
    objects: IObject[],
    roles: IRole[],
    offices: IOffice[],
    requests: IRequest[],
    bookings: IBooking[],
    user: IUsers,
    object: IObject,
    role: IRole,
    office: IOffice,
}

export interface IDayCard {
    date: Date;
    objects: IObject[];
}

export type Action = {type: string, payload?: any}