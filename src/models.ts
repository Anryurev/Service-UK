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

export interface IWorkers {
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
    telegram_id_user?: number
}

export interface IRole{
    role_Id: number,
    name: string,
    salary: number
    add_Parametrs?:Array<{
        id_Parametr: number,
        role_Id: number,
        parametr: string
    }>,
    levelImportant: number
}

export interface IRequest {
    request_Id: number,
    type_Work: string,
    description?: string,
    roles_Id: number[] | null
    worker_Id?: number[],
    object_Id: number,
    status: string,
    urgency: boolean,
    admin_Id: number,
    photos: Array<{ id_photo: number; url: string }>
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

export interface IWork{
    id_Work: number,
    name: string,
    roles: IRole[],
    roles_Id: number[]
}

export interface IStatus{
    id_status: number,
    name: string
}

export interface IReport{
    id_Report: number,
    request_Id: number,
    worker_Id: number,
    description: string,
    dateTime: Date,
    status: string,
    photos: Array<{ id_photo: number; url: string }>,
    add_Parametrs?:Array<{
        id_report_parametr: number,
        report_Id: number,
        add_parametr_id: number,
        value: boolean
    }>,
}

export interface IState {
    workers: IWorkers[],
    objects: IObject[],
    roles: IRole[],
    offices: IOffice[],
    requests: IRequest[],
    bookings: IBooking[],
    worker: IWorkers,
    object: IObject,
    role: IRole,
    office: IOffice,
}

export interface IResponseAuth{
    worker: IWorkers,
    role: IRole
}

export type Action = {type: string, payload?: any}